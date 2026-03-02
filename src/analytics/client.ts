import type { AnalyticsEventPayload, AnalyticsEventType } from '../cms/schema';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';
const SESSION_STORAGE_KEY = 'aura_analytics_session';

function createSessionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getSessionId() {
  if (typeof window === 'undefined') {
    return '';
  }

  const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);

  if (existing) {
    return existing;
  }

  const next = createSessionId();
  window.localStorage.setItem(SESSION_STORAGE_KEY, next);
  return next;
}

function sendPayload(payload: AnalyticsEventPayload) {
  const body = JSON.stringify(payload);

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(`${API_BASE}/api/analytics/track`, blob);
    return;
  }

  void fetch(`${API_BASE}/api/analytics/track`, {
    method: 'POST',
    keepalive: true,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  }).catch(() => {});
}

export function trackAnalyticsEvent(args: {
  eventType: AnalyticsEventType;
  path?: string;
  label?: string | null;
  metadata?: Record<string, boolean | number | string | null> | null;
}) {
  if (typeof window === 'undefined') {
    return;
  }

  sendPayload({
    sessionId: getSessionId(),
    eventType: args.eventType,
    path: args.path ?? window.location.pathname,
    label: args.label ?? null,
    metadata: args.metadata ?? null,
  });
}
