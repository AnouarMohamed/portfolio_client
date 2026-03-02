import {
  Activity,
  BarChart3,
  Eye,
  MousePointerClick,
  Send,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { ANALYTICS_EVENT_LABELS } from '../../analytics/labels';
import type { AnalyticsSnapshot } from '../../cms/schema';
import { AdminSection } from './AdminSection';
import { HorizontalBars } from './analytics/HorizontalBars';
import { ChartCard, EmptyChartState, OverviewCard } from './analytics/AnalyticsPrimitives';
import { SummaryPanel } from './analytics/SummaryPanel';
import { TrendChart } from './analytics/TrendChart';
import { formatCompactNumber, formatRatio, type TrendSeries } from './analytics/analytics.utils';
import { RecentEvents } from './analytics/RecentEvents';

interface AnalyticsDashboardProps {
  analytics: AnalyticsSnapshot | null;
}

interface OverviewMetric {
  detail: (analytics: AnalyticsSnapshot) => string;
  icon: LucideIcon;
  label: string;
  value: (analytics: AnalyticsSnapshot) => string;
}

const OVERVIEW_METRICS: OverviewMetric[] = [
  {
    label: 'Visitors',
    icon: Users,
    detail: (analytics) => `Unique visitors across the last ${analytics.windowDays} days.`,
    value: (analytics) => formatCompactNumber(analytics.overview.totalVisitors),
  },
  {
    label: 'Page views',
    icon: Eye,
    detail: () => 'Every tracked public route visit.',
    value: (analytics) => formatCompactNumber(analytics.overview.totalPageViews),
  },
  {
    label: 'Tracked actions',
    icon: MousePointerClick,
    detail: () => 'Project opens, filters, contact clicks, inquiries, and admin activity.',
    value: (analytics) => formatCompactNumber(analytics.overview.totalActions),
  },
  {
    label: 'Inquiry drafts',
    icon: Send,
    detail: () => 'Times visitors prepared the contact inquiry flow.',
    value: (analytics) => formatCompactNumber(analytics.overview.totalInquiries),
  },
  {
    label: 'Views / visitor',
    icon: BarChart3,
    detail: () => 'Average page depth per visitor in the snapshot window.',
    value: (analytics) => formatRatio(
      analytics.overview.totalVisitors > 0
        ? analytics.overview.totalPageViews / analytics.overview.totalVisitors
        : 0,
    ),
  },
  {
    label: 'Actions / visitor',
    icon: Activity,
    detail: () => 'Average interaction density per visitor.',
    value: (analytics) => formatRatio(
      analytics.overview.totalVisitors > 0
        ? analytics.overview.totalActions / analytics.overview.totalVisitors
        : 0,
    ),
  },
];

function buildTrendSeries(analytics: AnalyticsSnapshot, key: 'visits' | 'actions'): TrendSeries[] {
  if (key === 'visits') {
    return [
      {
        badgeClass: 'bg-white',
        fill: '#ffffff',
        label: 'Page views',
        stroke: '#ffffff',
        values: analytics.visitsByDay.map((point) => point.pageViews),
      },
      {
        badgeClass: 'bg-brand-soft-gold',
        dashed: true,
        fill: '#c5b358',
        label: 'Unique visitors',
        stroke: '#c5b358',
        values: analytics.visitsByDay.map((point) => point.visitors),
      },
    ];
  }

  return [
    {
      badgeClass: 'bg-white',
      fill: '#ffffff',
      label: 'Actions',
      stroke: '#ffffff',
      values: analytics.actionsByDay.map((point) => point.actions),
    },
    {
      badgeClass: 'bg-brand-soft-gold',
      dashed: true,
      fill: '#c5b358',
      label: 'Inquiry drafts',
      stroke: '#c5b358',
      values: analytics.actionsByDay.map((point) => point.inquiries),
    },
  ];
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

  return (
    <div className="space-y-6">
      <AdminSection
        title="Traffic and activity"
        description="Visitor counts are based on anonymous browser sessions. Action logs track key site interactions plus admin changes."
      >
        <SummaryPanel analytics={analytics} />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {OVERVIEW_METRICS.map((metric) => (
            <OverviewCard
              key={metric.label}
              detail={metric.detail(analytics)}
              icon={metric.icon}
              label={metric.label}
              value={metric.value(analytics)}
            />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <ChartCard
            title="Visits trend"
            description={`Page views against unique visitors across the last ${analytics.windowDays} days.`}
            tone="dark"
          >
            <TrendChart
              dates={analytics.visitsByDay.map((point) => point.date)}
              emptyLabel="No page views recorded yet."
              id="visits-trend"
              series={buildTrendSeries(analytics, 'visits')}
            />
          </ChartCard>

          <ChartCard
            title="Action trend"
            description="Tracked actions compared with inquiry drafts in the same window."
            tone="dark"
          >
            <TrendChart
              dates={analytics.actionsByDay.map((point) => point.date)}
              emptyLabel="No tracked actions yet."
              id="actions-trend"
              series={buildTrendSeries(analytics, 'actions')}
            />
          </ChartCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <ChartCard title="Top pages" description="The routes drawing the most attention.">
            <HorizontalBars
              items={analytics.topPages}
              valueLabel={(value) => `${value} views`}
              emptyLabel="No page views recorded yet."
            />
          </ChartCard>

          <ChartCard title="Action breakdown" description="Which interactions are happening most often.">
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
