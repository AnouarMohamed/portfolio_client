import express, { type NextFunction, type Request, type Response } from 'express';
import path from 'path';
import { createAnalyticsStore } from './analytics-store';
import {
  clearSessionCookie,
  createSessionToken,
  readSessionFromRequest,
  setSessionCookie,
} from './auth';
import { serverConfig } from './config';
import { createDatabaseConnection } from './database';
import { createContentStore } from './content-store';

const app = express();
const database = createDatabaseConnection(serverConfig.dbPath);
const contentStore = createContentStore(database);
const analyticsStore = createAnalyticsStore(database);
const distPath = path.resolve(process.cwd(), 'dist');

app.use(express.json({ limit: '2mb' }));

function requireAdmin(request: Request, response: Response, next: NextFunction) {
  const session = readSessionFromRequest(request, serverConfig.sessionSecret);

  if (!session) {
    response.status(401).json({ error: 'Authentication required.' });
    return;
  }

  next();
}

app.get('/api/auth/session', (request, response) => {
  const session = readSessionFromRequest(request, serverConfig.sessionSecret);

  response.json({
    authenticated: Boolean(session),
    username: session?.username,
  });
});

app.post('/api/auth/login', (request, response) => {
  const username = String(request.body?.username ?? '').trim();
  const password = String(request.body?.password ?? '');

  if (
    username !== serverConfig.adminUsername ||
    password !== serverConfig.adminPassword
  ) {
    clearSessionCookie(response);
    analyticsStore.trackEvent({
      sessionId: `admin-failed:${username || 'unknown'}`,
      eventType: 'admin_login_failed',
      path: '/admin',
      label: username || 'unknown',
    });
    response.status(401).json({ error: 'Invalid credentials.' });
    return;
  }

  analyticsStore.trackEvent({
    sessionId: `admin:${serverConfig.adminUsername}`,
    eventType: 'admin_login',
    path: '/admin',
    label: serverConfig.adminUsername,
  });

  setSessionCookie(
    response,
    createSessionToken(serverConfig.adminUsername, serverConfig.sessionSecret),
  );

  response.json({
    authenticated: true,
    username: serverConfig.adminUsername,
  });
});

app.post('/api/auth/logout', (request, response) => {
  const session = readSessionFromRequest(request, serverConfig.sessionSecret);

  if (session) {
    analyticsStore.trackEvent({
      sessionId: `admin:${session.username}`,
      eventType: 'admin_logout',
      path: '/admin',
      label: session.username,
    });
  }

  clearSessionCookie(response);
  response.json({ authenticated: false });
});

app.get('/api/content/public', (_request, response) => {
  response.json(contentStore.readPublicContent());
});

app.post('/api/analytics/track', (request, response) => {
  const event = request.body;

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

app.put('/api/admin/content', requireAdmin, (request, response) => {
  const content = request.body?.content;
  const session = readSessionFromRequest(request, serverConfig.sessionSecret);

  if (!content || typeof content !== 'object') {
    response.status(400).json({ error: 'A content payload is required.' });
    return;
  }

  const envelope = contentStore.writeContent(content);

  analyticsStore.trackEvent({
    sessionId: `admin:${session?.username ?? serverConfig.adminUsername}`,
    eventType: 'admin_content_saved',
    path: '/admin',
    label: session?.username ?? serverConfig.adminUsername,
    metadata: {
      projects: Array.isArray(content.projects) ? content.projects.length : 0,
      posts: Array.isArray(content.blogPosts) ? content.blogPosts.length : 0,
    },
  });

  response.json(envelope);
});

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
