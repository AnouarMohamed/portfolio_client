import express, {
  type ErrorRequestHandler,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import path from 'path';
import { createAnalyticsStore } from './analytics-store';
import { createAuthStore, verifyAdminPassword, type AdminSession } from './auth';
import { serverConfig } from './config';
import { createDatabaseConnection } from './database';
import { createContentStore } from './content-store';
import { createLoginRateLimiter } from './login-rate-limit';
import { createRequestRateLimiter } from './request-rate-limit';
import {
  applySecurityHeaders,
  disableSensitiveCaching,
  requireAllowedAdminIp,
  requireTrustedOrigin,
} from './security';

const app = express();
const database = createDatabaseConnection(serverConfig.dbPath);
const contentStore = createContentStore(database);
const analyticsStore = createAnalyticsStore(database);
const authStore = createAuthStore(database, {
  sessionAbsoluteTtlMs: serverConfig.sessionAbsoluteTtlMs,
  sessionIdleTtlMs: serverConfig.sessionIdleTtlMs,
  sessionSecret: serverConfig.sessionSecret,
});
const loginRateLimiter = createLoginRateLimiter({
  blockMs: serverConfig.loginBlockMs,
  maxAttempts: serverConfig.maxLoginAttempts,
  windowMs: serverConfig.loginWindowMs,
});
const analyticsRateLimiter = createRequestRateLimiter({
  maxRequests: 240,
  windowMs: 60 * 1000,
});
const distPath = path.resolve(process.cwd(), 'dist');
const requireSameOrigin = requireTrustedOrigin(serverConfig.allowedOrigins);
const requireAllowedIp = requireAllowedAdminIp(serverConfig.adminAllowedIps);

app.set('trust proxy', serverConfig.trustProxy);
app.disable('x-powered-by');
app.use(applySecurityHeaders);
app.use('/api/auth', requireAllowedIp);
app.use('/api/auth', disableSensitiveCaching);
app.use('/api/auth', express.json({ limit: '16kb' }));
app.use('/api/admin', requireAllowedIp);
app.use('/api/admin', disableSensitiveCaching);
app.use('/api/admin', express.json({ limit: '2mb' }));
app.use('/api/analytics/track', express.json({ limit: '16kb' }));

function getAttemptKeys(request: Request, username: string) {
  const normalizedUsername = username.trim().toLowerCase() || 'unknown';
  return [
    `ip:${request.ip}`,
    `ip:${request.ip}:username:${normalizedUsername}`,
  ];
}

function writeRetryAfter(response: Response, retryAfterMs: number) {
  response.setHeader('Retry-After', Math.ceil(retryAfterMs / 1000));
}

function respondWithAuthSession(response: Response, session: AdminSession | null) {
  response.json({
    authenticated: Boolean(session),
    username: session?.username,
    csrfToken: session?.csrfToken,
  });
}

function trackAdminEvent(
  eventType: 'admin_login' | 'admin_login_failed' | 'admin_logout' | 'admin_content_saved',
  username: string,
  metadata?: Record<string, number>,
) {
  analyticsStore.trackEvent({
    sessionId: `${eventType === 'admin_login_failed' ? 'admin-failed' : 'admin'}:${username || 'unknown'}`,
    eventType,
    path: serverConfig.adminPath,
    label: username || 'unknown',
    metadata,
  });
}

function readAdminSession(request: Request) {
  return authStore.readSessionFromRequest(request);
}

function resolveAdminSession(request: Request, response: Response) {
  const existingSession = response.locals.adminSession as AdminSession | undefined;

  if (existingSession) {
    return existingSession;
  }

  const session = readAdminSession(request);

  if (!session) {
    authStore.clearSessionCookie(response);
    response.status(401).json({ error: 'Authentication required.' });
    return null;
  }

  response.locals.adminSession = session;
  return session;
}

function requireAdmin(request: Request, response: Response, next: NextFunction) {
  if (!resolveAdminSession(request, response)) {
    return;
  }

  next();
}

function requireAdminCsrf(request: Request, response: Response, next: NextFunction) {
  const session = resolveAdminSession(request, response);

  if (!session) {
    return;
  }

  if (!authStore.verifyCsrf(request, session)) {
    response.status(403).json({ error: 'Invalid CSRF token.' });
    return;
  }

  response.locals.adminSession = session;
  next();
}

app.get('/api/auth/session', (request, response) => {
  respondWithAuthSession(response, readAdminSession(request));
});

app.post('/api/auth/login', requireSameOrigin, (request, response) => {
  const username = String(request.body?.username ?? '').trim();
  const password = String(request.body?.password ?? '');
  const attemptKeys = getAttemptKeys(request, username);

  for (const key of attemptKeys) {
    const status = loginRateLimiter.getStatus(key);

    if (status.blocked) {
      writeRetryAfter(response, status.retryAfterMs);
      response.status(429).json({
        error: 'Too many login attempts. Please wait before trying again.',
      });
      return;
    }
  }

  const isValidLogin =
    username === serverConfig.adminUsername
    && verifyAdminPassword(password, serverConfig.adminPasswordHash);

  if (!isValidLogin) {
    for (const key of attemptKeys) {
      loginRateLimiter.consumeFailure(key);
    }

    authStore.clearSessionCookie(response);
    trackAdminEvent('admin_login_failed', username);
    response.status(401).json({ error: 'Invalid credentials.' });
    return;
  }

  for (const key of attemptKeys) {
    loginRateLimiter.reset(key);
  }

  const { session, token } = authStore.createSession(
    request,
    serverConfig.adminUsername,
  );

  trackAdminEvent('admin_login', serverConfig.adminUsername);

  authStore.setSessionCookie(response, token);
  respondWithAuthSession(response, session);
});

app.post(
  '/api/auth/logout',
  requireSameOrigin,
  requireAdmin,
  requireAdminCsrf,
  (request, response) => {
    const session = response.locals.adminSession as AdminSession;

    trackAdminEvent('admin_logout', session.username);

    authStore.destroySession(request);
    authStore.clearSessionCookie(response);
    respondWithAuthSession(response, null);
  },
);

app.get('/api/content/public', (_request, response) => {
  response.json(contentStore.readPublicContent());
});

app.post('/api/analytics/track', requireSameOrigin, (request, response) => {
  const event = request.body;
  const rateLimit = analyticsRateLimiter.consume(`analytics:${request.ip}`);

  if (!rateLimit.allowed) {
    writeRetryAfter(response, rateLimit.retryAfterMs);
    response.status(202).end();
    return;
  }

  if (!event || typeof event !== 'object') {
    response.status(400).json({ error: 'A valid analytics payload is required.' });
    return;
  }

  if (!analyticsStore.trackEvent(event)) {
    response.status(400).json({ error: 'A valid analytics payload is required.' });
    return;
  }

  response.status(204).end();
});

app.get('/api/admin/content', requireAdmin, (_request, response) => {
  response.json(contentStore.readAdminContent());
});

app.get('/api/admin/analytics', requireAdmin, (_request, response) => {
  response.json(analyticsStore.readSnapshot());
});

app.put(
  '/api/admin/content',
  requireSameOrigin,
  requireAdmin,
  requireAdminCsrf,
  (request, response) => {
    const content = request.body?.content;
    const session = response.locals.adminSession as AdminSession;

    if (!content || typeof content !== 'object') {
      response.status(400).json({ error: 'A content payload is required.' });
      return;
    }

    const envelope = contentStore.writeContent(content);

    trackAdminEvent('admin_content_saved', session.username, {
      projects: Array.isArray(content.projects) ? content.projects.length : 0,
      posts: Array.isArray(content.blogPosts) ? content.blogPosts.length : 0,
    });

    response.json(envelope);
  },
);

const handleRequestParsingError: ErrorRequestHandler = (error, _request, response, next) => {
  if (error && typeof error === 'object') {
    const requestError = error as { type?: string };

    if (requestError.type === 'entity.parse.failed') {
      response.status(400).json({ error: 'Invalid JSON payload.' });
      return;
    }

    if (requestError.type === 'entity.too.large') {
      response.status(413).json({ error: 'Payload too large.' });
      return;
    }
  }

  next(error);
};

app.use(handleRequestParsingError);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath));

  app.get('*', (request, response, next) => {
    if (request.path.startsWith('/api/')) {
      next();
      return;
    }

    response.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(serverConfig.port, () => {
  console.log(`Aura CMS server listening on http://localhost:${serverConfig.port}`);
});
