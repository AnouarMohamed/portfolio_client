import type { ReactNode } from 'react';
import { ANALYTICS_EVENT_LABELS } from '../../analytics/labels';
import type { AnalyticsSnapshot } from '../../cms/schema';
import { AdminSection } from './AdminSection';

interface AnalyticsDashboardProps {
  analytics: AnalyticsSnapshot | null;
}

interface TrendSeries {
  colorClass: string;
  dashed?: boolean;
  label: string;
  values: number[];
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

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat(undefined, {
    notation: value >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: value >= 100 ? 0 : 1,
  }).format(value);
}

function formatRatio(value: number) {
  return Number.isFinite(value) ? value.toFixed(value >= 10 ? 0 : 1) : '0';
}

function OverviewCard(props: { label: string; value: string | number; detail: string }) {
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

function EmptyChartState({ label }: { label?: string }) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-brand-ink/10 bg-brand-paper/40 px-4 py-10 text-center text-sm text-brand-muted">
      {label ?? 'No analytics yet. Once visitors start moving through the site, the graphs will populate here.'}
    </div>
  );
}

function TrendChart(props: {
  dates: string[];
  emptyLabel: string;
  series: TrendSeries[];
}) {
  const maxValue = Math.max(1, ...props.series.flatMap((item) => item.values));

  if (maxValue === 1 && props.series.every((item) => item.values.every((value) => value === 0))) {
    return <EmptyChartState label={props.emptyLabel} />;
  }

  const width = 100;
  const height = 56;
  const padding = 8;
  const steps = [0, 0.5, 1];
  const toX = (index: number) => (
    props.dates.length === 1
      ? width / 2
      : padding + (index / (props.dates.length - 1)) * (width - padding * 2)
  );
  const toY = (value: number) => height - padding - (value / maxValue) * (height - padding * 2);
  const tickValues = steps.map((step) => Math.round(step * maxValue));

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[56px_1fr] md:items-stretch">
        <div className="hidden justify-between py-2 text-xs text-brand-muted md:flex md:flex-col">
          {tickValues.slice().reverse().map((value) => (
            <span key={value}>{formatCompactNumber(value)}</span>
          ))}
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="h-60 w-full">
          {steps.slice(1).map((step) => (
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
          {props.series.map((item) => {
            const path = item.values
              .map((value, index) => `${index === 0 ? 'M' : 'L'} ${toX(index)} ${toY(value)}`)
              .join(' ');

            return (
              <path
                key={item.label}
                d={path}
                fill="none"
                stroke="currentColor"
                className={item.colorClass}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={item.dashed ? '3 2' : undefined}
              />
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap items-center gap-5 text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">
        {props.series.map((item) => (
          <span key={item.label} className="inline-flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${item.colorClass.replace('text-', 'bg-')}`} />
            {item.label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs text-brand-muted">
        <div>{formatDateLabel(props.dates[0] ?? '')}</div>
        <div className="text-center">{formatDateLabel(props.dates[Math.floor(props.dates.length / 2)] ?? '')}</div>
        <div className="text-right">{formatDateLabel(props.dates[props.dates.length - 1] ?? '')}</div>
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
    return <EmptyChartState label={props.emptyLabel} />;
  }

  const maxValue = Math.max(...props.items.map((item) => item.value), 1);
  const totalValue = props.items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4">
      {props.items.map((item) => {
        const share = totalValue > 0 ? Math.round((item.value / totalValue) * 100) : 0;

        return (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between gap-4 text-sm">
              <div className="truncate text-brand-ink">{item.label}</div>
              <div className="flex items-center gap-3 font-semibold text-brand-muted">
                <span>{share}%</span>
                <span>{props.valueLabel ? props.valueLabel(item.value) : item.value}</span>
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
        );
      })}
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
          {event.metadata ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(event.metadata).slice(0, 4).map(([key, value]) => (
                <span
                  key={`${event.id}-${key}`}
                  className="rounded-full border border-brand-ink/8 bg-white/70 px-2.5 py-1 text-xs text-brand-muted"
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

export function AnalyticsDashboard({ analytics }: AnalyticsDashboardProps) {
  if (!analytics) {
    return (
      <div className="space-y-6">
        <AdminSection
          title="Traffic and activity"
          description="Visitor counts are based on anonymous browser sessions. Action logs track key site interactions plus admin changes."
        >
          <EmptyChartState />
        </AdminSection>
      </div>
    );
  }

  const viewsPerVisitor = analytics.overview.totalVisitors > 0
    ? analytics.overview.totalPageViews / analytics.overview.totalVisitors
    : 0;
  const actionsPerVisitor = analytics.overview.totalVisitors > 0
    ? analytics.overview.totalActions / analytics.overview.totalVisitors
    : 0;

  return (
    <div className="space-y-6">
      <AdminSection
        title="Traffic and activity"
        description="Visitor counts are based on anonymous browser sessions. Action logs track key site interactions plus admin changes."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <OverviewCard
            label="Visitors"
            value={formatCompactNumber(analytics.overview.totalVisitors)}
            detail={`Unique visitors across the last ${analytics.windowDays} days.`}
          />
          <OverviewCard
            label="Page views"
            value={formatCompactNumber(analytics.overview.totalPageViews)}
            detail="Every tracked public route visit."
          />
          <OverviewCard
            label="Tracked actions"
            value={formatCompactNumber(analytics.overview.totalActions)}
            detail="Project opens, filters, contact clicks, inquiries, and admin activity."
          />
          <OverviewCard
            label="Inquiry drafts"
            value={formatCompactNumber(analytics.overview.totalInquiries)}
            detail="Times visitors prepared the contact inquiry flow."
          />
          <OverviewCard
            label="Views / visitor"
            value={formatRatio(viewsPerVisitor)}
            detail="Average page depth per visitor in the snapshot window."
          />
          <OverviewCard
            label="Actions / visitor"
            value={formatRatio(actionsPerVisitor)}
            detail="Average interaction density per visitor."
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <ChartCard
            title="Visits trend"
            description={`Page views vs unique visitors over the last ${analytics.windowDays} days.`}
          >
            <TrendChart
              dates={analytics.visitsByDay.map((point) => point.date)}
              emptyLabel="No page views recorded yet."
              series={[
                {
                  label: 'Page views',
                  colorClass: 'text-brand-ink',
                  values: analytics.visitsByDay.map((point) => point.pageViews),
                },
                {
                  label: 'Unique visitors',
                  colorClass: 'text-brand-accent',
                  dashed: true,
                  values: analytics.visitsByDay.map((point) => point.visitors),
                },
              ]}
            />
          </ChartCard>
          <ChartCard
            title="Action trend"
            description="All tracked actions compared with inquiry drafts across the same window."
          >
            <TrendChart
              dates={analytics.actionsByDay.map((point) => point.date)}
              emptyLabel="No tracked actions yet."
              series={[
                {
                  label: 'Actions',
                  colorClass: 'text-brand-ink',
                  values: analytics.actionsByDay.map((point) => point.actions),
                },
                {
                  label: 'Inquiry drafts',
                  colorClass: 'text-brand-accent',
                  dashed: true,
                  values: analytics.actionsByDay.map((point) => point.inquiries),
                },
              ]}
            />
          </ChartCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
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
        </div>

        <ChartCard
          title="Recent activity"
          description="Latest visitor and admin events, including tracked metadata where available."
        >
          <RecentEvents analytics={analytics} />
        </ChartCard>
      </AdminSection>
    </div>
  );
}
