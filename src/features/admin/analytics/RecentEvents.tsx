import { ANALYTICS_EVENT_LABELS } from '../../../analytics/labels';
import type { AnalyticsSnapshot } from '../../../cms/schema';
import { EmptyChartState } from './AnalyticsPrimitives';
import { formatTimestamp, getEventBadgeClass } from './analytics.utils';

interface RecentEventsProps {
  analytics: AnalyticsSnapshot;
}

export function RecentEvents({ analytics }: RecentEventsProps) {
  if (analytics.recentEvents.length === 0) {
    return <EmptyChartState />;
  }

  return (
    <div className="space-y-3">
      {analytics.recentEvents.map((event) => (
        <article
          key={event.id}
          className="rounded-[1.55rem] border border-brand-ink/8 bg-brand-paper/38 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${getEventBadgeClass(event.eventType)}`}
              >
                {ANALYTICS_EVENT_LABELS[event.eventType]}
              </span>
              <span className="truncate rounded-full bg-white px-3 py-1 text-sm text-brand-ink">
                {event.path}
              </span>
            </div>

            <div className="text-xs uppercase tracking-[0.24em] text-brand-muted">
              {formatTimestamp(event.createdAt)}
            </div>
          </div>

          {event.label ? (
            <div className="mt-3 text-sm text-brand-muted">
              Context: <span className="font-medium text-brand-ink">{event.label}</span>
            </div>
          ) : null}

          {event.metadata ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(event.metadata).slice(0, 4).map(([key, value]) => (
                <span
                  key={`${event.id}-${key}`}
                  className="rounded-full border border-brand-ink/8 bg-white/75 px-2.5 py-1 text-xs text-brand-muted"
                >
                  <span className="uppercase tracking-[0.18em]">{key}</span>
                  {' '}
                  <span className="text-brand-ink">{String(value)}</span>
                </span>
              ))}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
