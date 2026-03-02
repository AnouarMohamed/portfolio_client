import type {
  AnalyticsActionPoint,
  AnalyticsEventPayload,
  AnalyticsEventRecord,
  AnalyticsEventType,
  AnalyticsSnapshot,
} from '../src/cms/schema';
import type { ServerDatabase } from './database';

const SNAPSHOT_WINDOW_DAYS = 14;
const RECENT_EVENT_LIMIT = 20;
const MAX_EVENT_AGE_DAYS = 180;
const MAX_EVENT_ROWS = 50000;
const SESSION_EVENT_WINDOW_MS = 60 * 1000;
const SESSION_EVENT_LIMIT = 180;
const SESSION_FINGERPRINT_LIMIT = 12;
const DEDUPE_WINDOWS: Record<AnalyticsEventType, number> = {
  page_view: 3000,
  cta_click: 1200,
  project_open: 2000,
  portfolio_filter: 750,
  journal_filter: 750,
  journal_page: 750,
  journal_post_open: 1500,
  contact_method_click: 1500,
  inquiry_submit: 5000,
  admin_login: 5000,
  admin_login_failed: 5000,
  admin_logout: 5000,
  admin_content_saved: 5000,
};

interface SessionRateState {
  fingerprints: Map<string, number[]>;
  timestamps: number[];
}

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

function getRetentionCutoffIso() {
  const retentionDate = new Date();
  retentionDate.setDate(retentionDate.getDate() - MAX_EVENT_AGE_DAYS);
  return retentionDate.toISOString();
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
  const deleteExpiredEvents = database.prepare<[string]>(
    'DELETE FROM analytics_events WHERE created_at < ?',
  );
  const pruneOverflowEvents = database.prepare<[number]>(
    `
      DELETE FROM analytics_events
      WHERE id IN (
        SELECT id
        FROM analytics_events
        ORDER BY created_at DESC, id DESC
        LIMIT -1 OFFSET ?
      )
    `,
  );
  const countEvents = database.prepare<[], { count: number }>(
    'SELECT COUNT(*) AS count FROM analytics_events',
  );
  const sessionRateState = new Map<string, SessionRateState>();

  const pruneSessionRateState = () => {
    const currentTime = Date.now();

    for (const [sessionId, state] of sessionRateState.entries()) {
      state.timestamps = state.timestamps.filter(
        (timestamp) => currentTime - timestamp < SESSION_EVENT_WINDOW_MS,
      );

      for (const [fingerprint, timestamps] of state.fingerprints.entries()) {
        const nextTimestamps = timestamps.filter(
          (timestamp) => currentTime - timestamp < SESSION_EVENT_WINDOW_MS,
        );

        if (nextTimestamps.length === 0) {
          state.fingerprints.delete(fingerprint);
          continue;
        }

        state.fingerprints.set(fingerprint, nextTimestamps);
      }

      if (state.timestamps.length === 0 && state.fingerprints.size === 0) {
        sessionRateState.delete(sessionId);
      }
    }
  };

  const isRateLimited = (payload: AnalyticsEventPayload) => {
    pruneSessionRateState();

    const currentTime = Date.now();
    const fingerprint = [
      payload.eventType,
      payload.path,
      payload.label ?? '',
      JSON.stringify(payload.metadata ?? null),
    ].join('::');
    const dedupeWindow = DEDUPE_WINDOWS[payload.eventType] ?? 1000;
    const state = sessionRateState.get(payload.sessionId) ?? {
      timestamps: [],
      fingerprints: new Map<string, number[]>(),
    };
    const recentFingerprintHits = state.fingerprints.get(fingerprint) ?? [];
    const activeFingerprintHits = recentFingerprintHits.filter(
      (timestamp) => currentTime - timestamp < dedupeWindow,
    );

    if (state.timestamps.length >= SESSION_EVENT_LIMIT) {
      sessionRateState.set(payload.sessionId, state);
      return true;
    }

    if (activeFingerprintHits.length >= SESSION_FINGERPRINT_LIMIT) {
      state.timestamps.push(currentTime);
      state.fingerprints.set(fingerprint, [...recentFingerprintHits, currentTime]);
      sessionRateState.set(payload.sessionId, state);
      return true;
    }

    state.timestamps.push(currentTime);
    state.fingerprints.set(fingerprint, [...recentFingerprintHits, currentTime]);
    sessionRateState.set(payload.sessionId, state);
    return false;
  };

  let writesSincePrune = 0;

  const pruneStoredEvents = () => {
    deleteExpiredEvents.run(getRetentionCutoffIso());

    const count = countEvents.get()?.count ?? 0;

    if (count > MAX_EVENT_ROWS) {
      pruneOverflowEvents.run(MAX_EVENT_ROWS);
    }
  };

  pruneStoredEvents();

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

      const payload = {
        sessionId,
        eventType,
        path,
        label: sanitizeString(input.label, 160) || null,
        metadata: sanitizeMetadata(input.metadata),
      } satisfies AnalyticsEventPayload;

      if (isRateLimited(payload)) {
        return;
      }

      insertEvent.run({
        sessionId: payload.sessionId,
        eventType: payload.eventType,
        path: payload.path,
        label: payload.label,
        metadata: JSON.stringify(payload.metadata),
        createdAt: new Date().toISOString(),
      });

      writesSincePrune += 1;

      if (writesSincePrune >= 200) {
        pruneStoredEvents();
        writesSincePrune = 0;
      }
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
      const actionMap = new Map<string, AnalyticsActionPoint>(
        visitDays.map((date) => [date, { date, actions: 0, inquiries: 0 }]),
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

        const actionPoint = actionMap.get(getDateKey(record.createdAt));

        if (actionPoint) {
          actionPoint.actions += 1;
        }

        if (record.eventType === 'inquiry_submit') {
          totalInquiries += 1;

          if (actionPoint) {
            actionPoint.inquiries += 1;
          }
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
        actionsByDay: visitDays.map((date) => actionMap.get(date) ?? {
          date,
          actions: 0,
          inquiries: 0,
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
