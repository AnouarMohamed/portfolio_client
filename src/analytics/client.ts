import type { AnalyticsEventPayload, AnalyticsEventType } from '../cms/schema';
import { ENABLE_CUSTOM_ANALYTICS } from '../config/runtime';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';
const SESSION_STORAGE_KEY = 'aura_analytics_session';
const ANALYTICS_FINGERPRINT_CACHE_LIMIT = 120;
const EVENT_DEDUPE_WINDOWS: Record<AnalyticsEventType, number> = {
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
const recentEventTimestamps = new Map<string, number>();

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

function createEventFingerprint(payload: AnalyticsEventPayload) {
  return [
    payload.sessionId,
    payload.eventType,
    payload.path,
    payload.label ?? '',
    JSON.stringify(payload.metadata ?? null),
  ].join('::');
}

function shouldSkipDuplicateEvent(payload: AnalyticsEventPayload) {
  const fingerprint = createEventFingerprint(payload);
  const dedupeWindow = EVENT_DEDUPE_WINDOWS[payload.eventType] ?? 1000;
  const currentTime = Date.now();
  const previousTime = recentEventTimestamps.get(fingerprint);

  if (previousTime && currentTime - previousTime < dedupeWindow) {
    return true;
  }

  recentEventTimestamps.set(fingerprint, currentTime);

  if (recentEventTimestamps.size > ANALYTICS_FINGERPRINT_CACHE_LIMIT) {
    const oldestKey = recentEventTimestamps.keys().next().value;

    if (oldestKey) {
      recentEventTimestamps.delete(oldestKey);
    }
  }

  return false;
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
  if (typeof window === 'undefined' || !ENABLE_CUSTOM_ANALYTICS) {
    return;
  }

  const payload = {
    sessionId: getSessionId(),
    eventType: args.eventType,
    path: args.path ?? window.location.pathname,
    label: args.label ?? null,
    metadata: args.metadata ?? null,
  } satisfies AnalyticsEventPayload;

  if (shouldSkipDuplicateEvent(payload)) {
    return;
  }

  sendPayload(payload);
}
