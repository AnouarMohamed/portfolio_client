import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

export function createDatabaseConnection(dbPath: string) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  return new Database(dbPath);
}

export type ServerDatabase = ReturnType<typeof createDatabaseConnection>;
