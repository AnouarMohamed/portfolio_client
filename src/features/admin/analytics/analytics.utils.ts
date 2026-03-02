import type { AnalyticsEventType } from '../../../cms/schema';

export type AnalyticsTone = 'dark' | 'light';

export interface TrendSeries {
  badgeClass: string;
  dashed?: boolean;
  fill: string;
  label: string;
  stroke: string;
  values: number[];
}

const DATE_LABEL_FORMATTER = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
});

const TIMESTAMP_FORMATTER = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const STANDARD_NUMBER_FORMATTER = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 1,
});

export function formatDateLabel(value: string) {
  return DATE_LABEL_FORMATTER.format(new Date(value));
}

export function formatTimestamp(value: string) {
  return TIMESTAMP_FORMATTER.format(new Date(value));
}

export function formatCompactNumber(value: number) {
  return value >= 1000
    ? COMPACT_NUMBER_FORMATTER.format(value)
    : STANDARD_NUMBER_FORMATTER.format(value);
}

export function formatRatio(value: number) {
  return Number.isFinite(value) ? value.toFixed(value >= 10 ? 0 : 1) : '0';
}

export function getDateTicks(dates: string[]) {
  if (dates.length === 0) {
    return [];
  }

  const desiredTickCount = Math.min(4, dates.length);
  const indices = new Set<number>();

  for (let index = 0; index < desiredTickCount; index += 1) {
    indices.add(Math.round((index * (dates.length - 1)) / Math.max(desiredTickCount - 1, 1)));
  }

  return Array.from(indices)
    .sort((left, right) => left - right)
    .map((index) => ({
      index,
      label: formatDateLabel(dates[index] ?? ''),
    }));
}

export function getEventBadgeClass(eventType: AnalyticsEventType) {
  if (eventType === 'page_view') {
    return 'border-brand-accent/18 bg-brand-paper text-brand-accent';
  }

  if (eventType.startsWith('admin_')) {
    return 'border-brand-ink/12 bg-brand-ink text-white';
  }

  return 'border-brand-soft-gold/30 bg-brand-soft-gold/18 text-brand-ink';
}

export function buildLinePath(
  values: number[],
  toX: (index: number) => number,
  toY: (value: number) => number,
) {
  return values
    .map((value, index) => `${index === 0 ? 'M' : 'L'} ${toX(index)} ${toY(value)}`)
    .join(' ');
}

export function buildAreaPath(
  values: number[],
  baseline: number,
  toX: (index: number) => number,
  toY: (value: number) => number,
) {
  if (values.length === 0) {
    return '';
  }

  return [
    `M ${toX(0)} ${baseline}`,
    ...values.map((value, index) => `L ${toX(index)} ${toY(value)}`),
    `L ${toX(values.length - 1)} ${baseline}`,
    'Z',
  ].join(' ');
}
