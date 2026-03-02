import crypto from 'crypto';
import type { Request, Response } from 'express';
import type { ServerDatabase } from './database';

const DEV_SESSION_COOKIE_NAME = 'aura_admin_session';
const PROD_SESSION_COOKIE_NAME = '__Host-aura_admin_session';
const SESSION_TOUCH_INTERVAL_MS = 1000 * 60 * 5;
const PASSWORD_HASH_PREFIX = 'scrypt';
const PASSWORD_KEY_LENGTH = 64;

interface AuthStoreOptions {
  sessionAbsoluteTtlMs: number;
  sessionIdleTtlMs: number;
  sessionSecret: string;
}

interface AdminSessionRecord {
  id: string;
  username: string;
  csrf_token: string;
  user_agent_hash: string | null;
  created_at: string;
  last_seen_at: string;
  expires_at: string;
}

export interface AdminSession {
  sessionId: string;
  username: string;
  csrfToken: string;
  expiresAt: string;
}

function now() {
  return Date.now();
}

function toIso(timestamp = now()) {
  return new Date(timestamp).toISOString();
}

function createOpaqueToken(size = 32) {
  return crypto.randomBytes(size).toString('base64url');
}

function getCookieName() {
  return process.env.NODE_ENV === 'production'
    ? PROD_SESSION_COOKIE_NAME
    : DEV_SESSION_COOKIE_NAME;
}

function parseCookies(request: Request) {
  const rawCookieHeader = request.headers.cookie;

  if (!rawCookieHeader) {
    return {};
  }

  return rawCookieHeader.split(';').reduce<Record<string, string>>((cookies, pair) => {
    const [rawName, ...rawValueParts] = pair.trim().split('=');

    if (!rawName || rawValueParts.length === 0) {
      return cookies;
    }

    cookies[rawName] = decodeURIComponent(rawValueParts.join('='));
    return cookies;
  }, {});
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function hashWithSecret(value: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

function getUserAgentHash(request: Request, secret: string) {
  const userAgent = String(request.headers['user-agent'] ?? '').trim();
  return userAgent ? hashWithSecret(userAgent, secret) : null;
}

function createPasswordHashInternal(password: string, salt = crypto.randomBytes(16).toString('hex')) {
  const derivedKey = crypto.scryptSync(password, salt, PASSWORD_KEY_LENGTH).toString('hex');
  return `${PASSWORD_HASH_PREFIX}$${salt}$${derivedKey}`;
}

function verifyPasswordHash(password: string, storedHash: string) {
  const [algorithm, salt, expectedHash] = storedHash.split('$');

  if (algorithm !== PASSWORD_HASH_PREFIX || !salt || !expectedHash) {
    return false;
  }

  const actualHash = crypto.scryptSync(password, salt, PASSWORD_KEY_LENGTH).toString('hex');
  return safeCompare(actualHash, expectedHash);
}

function toAdminSession(record: AdminSessionRecord): AdminSession {
  return {
    sessionId: record.id,
    username: record.username,
    csrfToken: record.csrf_token,
    expiresAt: record.expires_at,
  };
}

export function createPasswordHash(password: string) {
  const normalizedPassword = password.normalize('NFKC').trim();

  if (!normalizedPassword) {
    throw new Error('A non-empty password is required.');
  }

  return createPasswordHashInternal(normalizedPassword);
}

export function verifyAdminPassword(
  inputPassword: string,
  config: {
    adminPassword: string;
    adminPasswordHash: string | null;
  },
) {
  const normalizedInput = inputPassword.normalize('NFKC');

  if (config.adminPasswordHash) {
    return verifyPasswordHash(normalizedInput, config.adminPasswordHash);
  }

  const fallbackHash = crypto.createHash('sha256').update(normalizedInput).digest('hex');
  const storedHash = crypto.createHash('sha256').update(config.adminPassword).digest('hex');
  return safeCompare(fallbackHash, storedHash);
}

export function createAuthStore(database: ServerDatabase, options: AuthStoreOptions) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      token_hash TEXT NOT NULL UNIQUE,
      csrf_token TEXT NOT NULL,
      user_agent_hash TEXT,
      created_at TEXT NOT NULL,
      last_seen_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at
      ON admin_sessions(expires_at);

    CREATE INDEX IF NOT EXISTS idx_admin_sessions_username
      ON admin_sessions(username);
  `);

  const insertSession = database.prepare(
    `
      INSERT INTO admin_sessions (
        id,
        username,
        token_hash,
        csrf_token,
        user_agent_hash,
        created_at,
        last_seen_at,
        expires_at
      ) VALUES (
        @id,
        @username,
        @tokenHash,
        @csrfToken,
        @userAgentHash,
        @createdAt,
        @lastSeenAt,
        @expiresAt
      )
    `,
  );
  const selectSessionByTokenHash = database.prepare<[string], AdminSessionRecord>(
    `
      SELECT id, username, csrf_token, user_agent_hash, created_at, last_seen_at, expires_at
      FROM admin_sessions
      WHERE token_hash = ?
    `,
  );
  const deleteSessionByTokenHash = database.prepare<[string]>(
    'DELETE FROM admin_sessions WHERE token_hash = ?',
  );
  const deleteExpiredSessions = database.prepare<[string, string]>(
    `
      DELETE FROM admin_sessions
      WHERE expires_at <= ? OR last_seen_at <= ?
    `,
  );
  const touchSession = database.prepare(
    `
      UPDATE admin_sessions
      SET last_seen_at = @lastSeenAt
      WHERE id = @id
    `,
  );

  const pruneSessions = () => {
    deleteExpiredSessions.run(
      toIso(),
      toIso(now() - options.sessionIdleTtlMs),
    );
  };

  const readTokenFromRequest = (request: Request) => {
    const token = parseCookies(request)[getCookieName()];
    return token ? token.trim() : '';
  };

  const setSessionCookie = (response: Response, token: string) => {
    response.cookie(getCookieName(), token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: options.sessionAbsoluteTtlMs,
      path: '/',
    });
  };

  const clearSessionCookie = (response: Response) => {
    response.clearCookie(getCookieName(), {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
  };

  pruneSessions();

  return {
    clearSessionCookie,
    createSession(request: Request, username: string) {
      pruneSessions();

      const token = createOpaqueToken();
      const sessionRecord = {
        id: crypto.randomUUID(),
        username,
        tokenHash: hashWithSecret(token, options.sessionSecret),
        csrfToken: createOpaqueToken(24),
        userAgentHash: getUserAgentHash(request, options.sessionSecret),
        createdAt: toIso(),
        lastSeenAt: toIso(),
        expiresAt: toIso(now() + options.sessionAbsoluteTtlMs),
      };

      insertSession.run(sessionRecord);

      return {
        token,
        session: {
          sessionId: sessionRecord.id,
          username: sessionRecord.username,
          csrfToken: sessionRecord.csrfToken,
          expiresAt: sessionRecord.expiresAt,
        },
      };
    },
    destroySession(request: Request) {
      const token = readTokenFromRequest(request);

      if (!token) {
        return;
      }

      deleteSessionByTokenHash.run(hashWithSecret(token, options.sessionSecret));
    },
    readSessionFromRequest(request: Request) {
      pruneSessions();

      const token = readTokenFromRequest(request);

      if (!token) {
        return null;
      }

      const tokenHash = hashWithSecret(token, options.sessionSecret);
      const session = selectSessionByTokenHash.get(tokenHash);

      if (!session) {
        return null;
      }

      const userAgentHash = getUserAgentHash(request, options.sessionSecret);

      if (session.user_agent_hash && userAgentHash !== session.user_agent_hash) {
        deleteSessionByTokenHash.run(tokenHash);
        return null;
      }

      if (Date.parse(session.last_seen_at) + options.sessionIdleTtlMs <= now()) {
        deleteSessionByTokenHash.run(tokenHash);
        return null;
      }

      if (Date.parse(session.last_seen_at) + SESSION_TOUCH_INTERVAL_MS <= now()) {
        touchSession.run({
          id: session.id,
          lastSeenAt: toIso(),
        });
      }

      return toAdminSession(session);
    },
    setSessionCookie,
    verifyCsrf(request: Request, session: AdminSession) {
      const csrfHeader = String(request.headers['x-csrf-token'] ?? '');
      return Boolean(csrfHeader) && safeCompare(csrfHeader, session.csrfToken);
    },
  };
}
