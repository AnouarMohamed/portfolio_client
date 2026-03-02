import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

function parseInteger(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseList(value: string | undefined) {
  return String(value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function isWeakSecret(secret: string) {
  return (
    secret.length < 32 ||
    secret.includes('replace-this') ||
    secret.includes('change-me-now')
  );
}

const isProduction = process.env.NODE_ENV === 'production';
const sessionSecret =
  process.env.SESSION_SECRET ?? 'replace-this-session-secret-before-production';
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim() || null;
const adminPassword = process.env.ADMIN_PASSWORD ?? 'change-me-now';
const allowedOrigins = Array.from(
  new Set([
    ...parseList(process.env.APP_ORIGIN),
    ...parseList(process.env.ALLOWED_ORIGINS),
  ]),
);

if (isProduction && !adminPasswordHash) {
  throw new Error('ADMIN_PASSWORD_HASH is required in production.');
}

if (isProduction && isWeakSecret(sessionSecret)) {
  throw new Error('SESSION_SECRET must be long, unique, and not use the default placeholder.');
}

export const serverConfig = {
  port: Number(process.env.PORT ?? 4000),
  adminUsername: process.env.ADMIN_USERNAME ?? 'client',
  adminPassword,
  adminPasswordHash,
  sessionSecret,
  dbPath:
    process.env.CMS_DB_PATH ??
    path.resolve(process.cwd(), 'data', 'cms.sqlite'),
  allowedOrigins,
  loginWindowMs: parseInteger(process.env.ADMIN_LOGIN_WINDOW_MINUTES, 15) * 60 * 1000,
  loginBlockMs: parseInteger(process.env.ADMIN_LOGIN_BLOCK_MINUTES, 30) * 60 * 1000,
  maxLoginAttempts: parseInteger(process.env.ADMIN_LOGIN_MAX_ATTEMPTS, 5),
  sessionAbsoluteTtlMs: parseInteger(process.env.ADMIN_SESSION_DAYS, 7) * 24 * 60 * 60 * 1000,
  sessionIdleTtlMs: parseInteger(process.env.ADMIN_SESSION_IDLE_HOURS, 12) * 60 * 60 * 1000,
};
