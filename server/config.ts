import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const serverConfig = {
  port: Number(process.env.PORT ?? 4000),
  adminUsername: process.env.ADMIN_USERNAME ?? 'client',
  adminPassword: process.env.ADMIN_PASSWORD ?? 'change-me-now',
  sessionSecret:
    process.env.SESSION_SECRET ?? 'replace-this-session-secret-before-production',
  dbPath:
    process.env.CMS_DB_PATH ??
    path.resolve(process.cwd(), 'data', 'cms.sqlite'),
};
