import type { ReactNode } from 'react';
import { ANALYTICS_EVENT_LABELS } from '../../analytics/labels';
import type { AnalyticsSnapshot } from '../../cms/schema';
import { AdminSection } from './AdminSection';

interface AnalyticsDashboardProps {
  analytics: AnalyticsSnapshot | null;
}

function formatDateLabel(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
}

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function OverviewCard(props: { label: string; value: number; detail: string }) {
  return (
    <article className="rounded-[1.75rem] border border-brand-ink/8 bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
        {props.label}
      </div>
      <div className="mt-3 text-4xl font-serif text-brand-ink">{props.value}</div>
      <div className="mt-2 text-sm text-brand-muted">{props.detail}</div>
    </article>
  );
}

function ChartCard(props: { title: string; description?: string; children: ReactNode }) {
  return (
    <article className="rounded-[1.75rem] border border-brand-ink/8 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-2xl font-serif text-brand-ink">{props.title}</h3>
        {props.description ? (
          <p className="mt-2 text-sm text-brand-muted">{props.description}</p>
        ) : null}
      </div>
      {props.children}
    </article>
  );
}

function EmptyChartState() {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-brand-ink/10 bg-brand-paper/40 px-4 py-10 text-center text-sm text-brand-muted">
      No analytics yet. Once visitors start moving through the site, the graphs will populate here.
    </div>
  );
}

function VisitsChart({ analytics }: { analytics: AnalyticsSnapshot }) {
  const points = analytics.visitsByDay;

  if (points.every((point) => point.pageViews === 0 && point.visitors === 0)) {
    return <EmptyChartState />;
  }

  const width = 100;
  const height = 56;
  const padding = 8;
  const maxValue = Math.max(
    1,
    ...points.flatMap((point) => [point.pageViews, point.visitors]),
  );

  const toX = (index: number) => {
    if (points.length === 1) {
      return width / 2;
    }

    return padding + (index / (points.length - 1)) * (width - padding * 2);
  };

  const toY = (value: number) => height - padding - (value / maxValue) * (height - padding * 2);
  const pageViewPath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${toX(index)} ${toY(point.pageViews)}`)
    .join(' ');
  const visitorPath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${toX(index)} ${toY(point.visitors)}`)
    .join(' ');

  return (
    <div className="space-y-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-60 w-full">
        {[0.25, 0.5, 0.75].map((step) => (
          <line
            key={step}
            x1={padding}
            x2={width - padding}
            y1={height - padding - step * (height - padding * 2)}
            y2={height - padding - step * (height - padding * 2)}
            stroke="currentColor"
            className="text-brand-ink/10"
            strokeWidth="0.6"
          />
        ))}
        <path
          d={pageViewPath}
          fill="none"
          stroke="currentColor"
          className="text-brand-ink"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d={visitorPath}
          fill="none"
          stroke="currentColor"
          className="text-brand-accent"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 2"
        />
      </svg>

      <div className="flex flex-wrap items-center gap-5 text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-ink" />
          Page views
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" />
          Unique visitors
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs text-brand-muted">
        <div>{formatDateLabel(points[0]?.date ?? '')}</div>
        <div className="text-center">{formatDateLabel(points[Math.floor(points.length / 2)]?.date ?? '')}</div>
        <div className="text-right">{formatDateLabel(points[points.length - 1]?.date ?? '')}</div>
      </div>
    </div>
  );
}

function HorizontalBars(props: {
  items: Array<{ label: string; value: number }>;
  valueLabel?: (value: number) => string;
  emptyLabel: string;
}) {
  if (props.items.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-brand-ink/10 bg-brand-paper/40 px-4 py-10 text-center text-sm text-brand-muted">
        {props.emptyLabel}
      </div>
    );
  }

  const maxValue = Math.max(...props.items.map((item) => item.value), 1);

  return (
    <div className="space-y-4">
      {props.items.map((item) => (
        <div key={item.label} className="space-y-2">
          <div className="flex items-center justify-between gap-4 text-sm">
            <div className="truncate text-brand-ink">{item.label}</div>
            <div className="font-semibold text-brand-muted">
              {props.valueLabel ? props.valueLabel(item.value) : item.value}
            </div>
          </div>
          <div className="h-2.5 rounded-full bg-brand-paper">
            <div
              className="h-full rounded-full bg-brand-ink"
              style={{
                width:
                  item.value === 0
                    ? '0%'
                    : `${Math.max(8, (item.value / maxValue) * 100)}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function RecentEvents({ analytics }: { analytics: AnalyticsSnapshot }) {
  if (analytics.recentEvents.length === 0) {
    return <EmptyChartState />;
  }

  return (
    <div className="space-y-3">
      {analytics.recentEvents.map((event) => (
        <article
          key={event.id}
          className="rounded-[1.25rem] border border-brand-ink/8 bg-brand-paper/35 px-4 py-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold text-brand-ink">
              {ANALYTICS_EVENT_LABELS[event.eventType]}
            </div>
            <div className="text-xs uppercase tracking-[0.24em] text-brand-muted">
              {formatTimestamp(event.createdAt)}
            </div>
          </div>
          <div className="mt-2 text-sm text-brand-muted">
            {event.label ? `${event.label} ` : ''}
            <span className="font-medium text-brand-ink">{event.path}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

export function AnalyticsDashboard({ analytics }: AnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      <AdminSection
        title="Traffic and activity"
        description="Visitor counts are based on anonymous browser sessions. Action logs track key site interactions plus admin changes."
      >
        {analytics ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <OverviewCard
                label="Visitors"
                value={analytics.overview.totalVisitors}
                detail={`Unique visitors across the last ${analytics.windowDays} days.`}
              />
              <OverviewCard
                label="Page views"
                value={analytics.overview.totalPageViews}
                detail="Every tracked public route visit."
              />
              <OverviewCard
                label="Tracked actions"
                value={analytics.overview.totalActions}
                detail="Project opens, filters, contact clicks, inquiries, and admin activity."
              />
              <OverviewCard
                label="Inquiry drafts"
                value={analytics.overview.totalInquiries}
                detail="Times visitors prepared the contact inquiry flow."
              />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
              <ChartCard
                title="Visits trend"
                description={`Page views vs unique visitors over the last ${analytics.windowDays} days.`}
              >
                <VisitsChart analytics={analytics} />
              </ChartCard>
              <ChartCard
                title="Top pages"
                description="Most visited public routes."
              >
                <HorizontalBars
                  items={analytics.topPages}
                  valueLabel={(value) => `${value} views`}
                  emptyLabel="No page views recorded yet."
                />
              </ChartCard>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <ChartCard
                title="Action breakdown"
                description="Non-page-view events grouped by type."
              >
                <HorizontalBars
                  items={analytics.actionsByType.map((item) => ({
                    label: ANALYTICS_EVENT_LABELS[item.eventType],
                    value: item.count,
                  }))}
                  valueLabel={(value) => `${value} events`}
                  emptyLabel="No tracked actions yet."
                />
              </ChartCard>
              <ChartCard
                title="Recent activity"
                description="Latest visitor and admin events."
              >
                <RecentEvents analytics={analytics} />
              </ChartCard>
            </div>
          </>
        ) : (
          <EmptyChartState />
        )}
      </AdminSection>
    </div>
  );
}
