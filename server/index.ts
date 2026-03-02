import express, { type NextFunction, type Request, type Response } from 'express';
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
app.use(express.json({ limit: '2mb' }));
app.use('/api/auth', requireAllowedIp);
app.use('/api/auth', disableSensitiveCaching);
app.use('/api/admin', requireAllowedIp);
app.use('/api/admin', disableSensitiveCaching);

function getAttemptKeys(request: Request, username: string) {
  const normalizedUsername = username.trim().toLowerCase() || 'unknown';
  return [
    `ip:${request.ip}`,
    `ip:${request.ip}:username:${normalizedUsername}`,
  ];
}

function trackFailedLogin(username: string) {
  analyticsStore.trackEvent({
    sessionId: `admin-failed:${username || 'unknown'}`,
    eventType: 'admin_login_failed',
    path: serverConfig.adminPath,
    label: username || 'unknown',
  });
}

function readAdminSession(request: Request) {
  return authStore.readSessionFromRequest(request);
}

function requireAdmin(request: Request, response: Response, next: NextFunction) {
  const session = readAdminSession(request);

  if (!session) {
    authStore.clearSessionCookie(response);
    response.status(401).json({ error: 'Authentication required.' });
    return;
  }

  response.locals.adminSession = session;
  next();
}

function requireAdminCsrf(request: Request, response: Response, next: NextFunction) {
  const session = (response.locals.adminSession as AdminSession | undefined)
    ?? readAdminSession(request);

  if (!session) {
    authStore.clearSessionCookie(response);
    response.status(401).json({ error: 'Authentication required.' });
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
  const session = readAdminSession(request);

  response.json({
    authenticated: Boolean(session),
    username: session?.username,
    csrfToken: session?.csrfToken,
  });
});

app.post('/api/auth/login', requireSameOrigin, (request, response) => {
  const username = String(request.body?.username ?? '').trim();
  const password = String(request.body?.password ?? '');
  const attemptKeys = getAttemptKeys(request, username);

  for (const key of attemptKeys) {
    const status = loginRateLimiter.getStatus(key);

    if (status.blocked) {
      response.setHeader('Retry-After', Math.ceil(status.retryAfterMs / 1000));
      response.status(429).json({
        error: 'Too many login attempts. Please wait before trying again.',
      });
      return;
    }
  }

  const isValidLogin =
    username === serverConfig.adminUsername
    && verifyAdminPassword(password, serverConfig);

  if (!isValidLogin) {
    for (const key of attemptKeys) {
      loginRateLimiter.consumeFailure(key);
    }

    authStore.clearSessionCookie(response);
    trackFailedLogin(username);
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

  analyticsStore.trackEvent({
    sessionId: `admin:${serverConfig.adminUsername}`,
    eventType: 'admin_login',
    path: serverConfig.adminPath,
    label: serverConfig.adminUsername,
  });

  authStore.setSessionCookie(response, token);
  response.json({
    authenticated: true,
    username: session.username,
    csrfToken: session.csrfToken,
  });
});

app.post(
  '/api/auth/logout',
  requireSameOrigin,
  requireAdmin,
  requireAdminCsrf,
  (request, response) => {
    const session = response.locals.adminSession as AdminSession;

    analyticsStore.trackEvent({
      sessionId: `admin:${session.username}`,
      eventType: 'admin_logout',
      path: serverConfig.adminPath,
      label: session.username,
    });

    authStore.destroySession(request);
    authStore.clearSessionCookie(response);
    response.json({ authenticated: false });
  },
);

app.get('/api/content/public', (_request, response) => {
  response.json(contentStore.readPublicContent());
});

app.post('/api/analytics/track', requireSameOrigin, (request, response) => {
  const event = request.body;
  const rateLimit = analyticsRateLimiter.consume(`analytics:${request.ip}`);

  if (!rateLimit.allowed) {
    response.setHeader('Retry-After', Math.ceil(rateLimit.retryAfterMs / 1000));
    response.status(202).end();
    return;
  }

  if (!event || typeof event !== 'object') {
    response.status(400).json({ error: 'A valid analytics payload is required.' });
    return;
  }

  analyticsStore.trackEvent(event);
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

    analyticsStore.trackEvent({
      sessionId: `admin:${session.username}`,
      eventType: 'admin_content_saved',
      path: serverConfig.adminPath,
      label: session.username,
      metadata: {
        projects: Array.isArray(content.projects) ? content.projects.length : 0,
        posts: Array.isArray(content.blogPosts) ? content.blogPosts.length : 0,
      },
    });

    response.json(envelope);
  },
);

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
