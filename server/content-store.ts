import { DEFAULT_CMS_CONTENT } from '../src/cms/defaultContent';
import { getPublishedBlogPosts, getPublishedProjects } from '../src/cms/selectors';
import type { CmsContent, CmsEnvelope } from '../src/cms/schema';
import type { ServerDatabase } from './database';

function cloneDefaultContent() {
  return structuredClone(DEFAULT_CMS_CONTENT);
}

function isCmsContentLike(value: unknown): value is CmsContent {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<CmsContent>;

  return (
    typeof candidate.site === 'object' &&
    typeof candidate.home === 'object' &&
    typeof candidate.pages === 'object' &&
    Array.isArray(candidate.projects) &&
    Array.isArray(candidate.blogPosts)
  );
}

export function createContentStore(database: ServerDatabase) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS content_store (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  const selectContent = database.prepare<[string], { updated_at: string; value: string }>(
    'SELECT value, updated_at FROM content_store WHERE key = ?',
  );
  const upsertContent = database.prepare(
    `
      INSERT INTO content_store (key, value, updated_at)
      VALUES (@key, @value, @updatedAt)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updated_at = excluded.updated_at
    `,
  );

  const seedContent = () => {
    const existing = selectContent.get('content');

    if (existing) {
      return;
    }

    const updatedAt = new Date().toISOString();
    upsertContent.run({
      key: 'content',
      value: JSON.stringify(cloneDefaultContent()),
      updatedAt,
    });
  };

  const readRawEnvelope = (): CmsEnvelope => {
    const row = selectContent.get('content');

    if (!row) {
      seedContent();
      return readRawEnvelope();
    }

    const parsed = JSON.parse(row.value) as unknown;
    const content = isCmsContentLike(parsed) ? parsed : cloneDefaultContent();

    return {
      content,
      updatedAt: row.updated_at,
    };
  };

  seedContent();

  return {
    readAdminContent() {
      return readRawEnvelope();
    },
    readPublicContent(): CmsEnvelope {
      const envelope = readRawEnvelope();

      return {
        updatedAt: envelope.updatedAt,
        content: {
          ...envelope.content,
          projects: getPublishedProjects(envelope.content),
          blogPosts: getPublishedBlogPosts(envelope.content),
        },
      };
    },
    writeContent(content: CmsContent) {
      const updatedAt = new Date().toISOString();
      const nextContent = isCmsContentLike(content) ? content : cloneDefaultContent();

      upsertContent.run({
        key: 'content',
        value: JSON.stringify(nextContent),
        updatedAt,
      });

      return {
        content: nextContent,
        updatedAt,
      };
    },
  };
}
