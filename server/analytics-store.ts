import type {
  AnalyticsEventPayload,
  AnalyticsEventRecord,
  AnalyticsEventType,
  AnalyticsSnapshot,
} from '../src/cms/schema';
import type { ServerDatabase } from './database';

const SNAPSHOT_WINDOW_DAYS = 14;
const RECENT_EVENT_LIMIT = 20;

function getDateKey(value: string) {
  return value.slice(0, 10);
}

function getWindowStart(days: number) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - (days - 1));
  return date;
}

function buildDateSeries(days: number) {
  const dates: string[] = [];
  const start = getWindowStart(days);

  for (let index = 0; index < days; index += 1) {
    const next = new Date(start);
    next.setDate(start.getDate() + index);
    dates.push(next.toISOString().slice(0, 10));
  }

  return dates;
}

function sanitizeString(value: unknown, maxLength: number) {
  return String(value ?? '')
    .trim()
    .slice(0, maxLength);
}

function sanitizeMetadata(
  metadata: AnalyticsEventPayload['metadata'],
): AnalyticsEventPayload['metadata'] {
  if (!metadata || typeof metadata !== 'object') {
    return null;
  }

  const entries = Object.entries(metadata)
    .slice(0, 10)
    .map(([key, value]) => [sanitizeString(key, 40), value] as const)
    .filter(([key]) => Boolean(key));

  if (entries.length === 0) {
    return null;
  }

  return Object.fromEntries(entries);
}

function isAnalyticsEventType(value: string): value is AnalyticsEventType {
  return [
    'page_view',
    'cta_click',
    'project_open',
    'portfolio_filter',
    'journal_filter',
    'journal_page',
    'journal_post_open',
    'contact_method_click',
    'inquiry_submit',
    'admin_login',
    'admin_login_failed',
    'admin_logout',
    'admin_content_saved',
  ].includes(value);
}

interface AnalyticsRow {
  id: number;
  session_id: string;
  event_type: string;
  path: string;
  label: string | null;
  metadata: string | null;
  created_at: string;
}

function toRecord(row: AnalyticsRow): AnalyticsEventRecord | null {
  if (!isAnalyticsEventType(row.event_type)) {
    return null;
  }

  let metadata: AnalyticsEventPayload['metadata'] = null;

  if (row.metadata) {
    try {
      metadata = JSON.parse(row.metadata) as AnalyticsEventPayload['metadata'];
    } catch {
      metadata = null;
    }
  }

  return {
    id: row.id,
    sessionId: row.session_id,
    eventType: row.event_type,
    path: row.path,
    label: row.label,
    metadata,
    createdAt: row.created_at,
  };
}

export function createAnalyticsStore(database: ServerDatabase) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      path TEXT NOT NULL,
      label TEXT,
      metadata TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at
      ON analytics_events(created_at);

    CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type
      ON analytics_events(event_type);

    CREATE INDEX IF NOT EXISTS idx_analytics_events_path
      ON analytics_events(path);
  `);

  const insertEvent = database.prepare(
    `
      INSERT INTO analytics_events (
        session_id,
        event_type,
        path,
        label,
        metadata,
        created_at
      ) VALUES (
        @sessionId,
        @eventType,
        @path,
        @label,
        @metadata,
        @createdAt
      )
    `,
  );

  const selectWindowEvents = database.prepare<[string], AnalyticsRow>(
    `
      SELECT id, session_id, event_type, path, label, metadata, created_at
      FROM analytics_events
      WHERE created_at >= ?
      ORDER BY created_at DESC
    `,
  );

  return {
    trackEvent(input: AnalyticsEventPayload) {
      const eventType = sanitizeString(input.eventType, 40);

      if (!isAnalyticsEventType(eventType)) {
        return;
      }

      const sessionId = sanitizeString(input.sessionId, 120);
      const path = sanitizeString(input.path, 200) || '/';

      if (!sessionId) {
        return;
      }

      insertEvent.run({
        sessionId,
        eventType,
        path,
        label: sanitizeString(input.label, 160) || null,
        metadata: JSON.stringify(sanitizeMetadata(input.metadata)),
        createdAt: new Date().toISOString(),
      });
    },

    readSnapshot(days = SNAPSHOT_WINDOW_DAYS): AnalyticsSnapshot {
      const windowDays = Math.max(1, Math.min(days, 60));
      const rows = selectWindowEvents.all(getWindowStart(windowDays).toISOString());
      const records = rows
        .map(toRecord)
        .filter((record): record is AnalyticsEventRecord => record !== null);

      const visitDays = buildDateSeries(windowDays);
      const visitMap = new Map(
        visitDays.map((date) => [date, { date, pageViews: 0, visitors: new Set<string>() }]),
      );
      const pageCounts = new Map<string, number>();
      const actionCounts = new Map<AnalyticsEventType, number>();

      let totalPageViews = 0;
      let totalActions = 0;
      let totalInquiries = 0;

      for (const record of records) {
        if (record.eventType === 'page_view') {
          totalPageViews += 1;
          pageCounts.set(record.path, (pageCounts.get(record.path) ?? 0) + 1);

          const visitPoint = visitMap.get(getDateKey(record.createdAt));
          if (visitPoint) {
            visitPoint.pageViews += 1;
            visitPoint.visitors.add(record.sessionId);
          }

          continue;
        }

        totalActions += 1;
        actionCounts.set(record.eventType, (actionCounts.get(record.eventType) ?? 0) + 1);

        if (record.eventType === 'inquiry_submit') {
          totalInquiries += 1;
        }
      }

      const visitorIds = new Set(
        records
          .filter((record) => record.eventType === 'page_view')
          .map((record) => record.sessionId),
      );

      return {
        windowDays,
        overview: {
          totalVisitors: visitorIds.size,
          totalPageViews,
          totalActions,
          totalInquiries,
        },
        visitsByDay: visitDays.map((date) => {
          const point = visitMap.get(date);
          return {
            date,
            pageViews: point?.pageViews ?? 0,
            visitors: point?.visitors.size ?? 0,
          };
        }),
        topPages: Array.from(pageCounts.entries())
          .sort((left, right) => right[1] - left[1])
          .slice(0, 6)
          .map(([label, value]) => ({ label, value })),
        actionsByType: Array.from(actionCounts.entries())
          .sort((left, right) => right[1] - left[1])
          .map(([eventType, count]) => ({ eventType, count })),
        recentEvents: records.slice(0, RECENT_EVENT_LIMIT),
      };
    },
  };
}
