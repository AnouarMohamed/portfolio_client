import { EmptyChartState } from './AnalyticsPrimitives';
import {
  buildAreaPath,
  buildLinePath,
  formatCompactNumber,
  getDateTicks,
  type TrendSeries,
} from './analytics.utils';

interface TrendChartProps {
  dates: string[];
  emptyLabel: string;
  id: string;
  series: TrendSeries[];
}

export function TrendChart({ dates, emptyLabel, id, series }: TrendChartProps) {
  const maxValue = Math.max(1, ...series.flatMap((item) => item.values));
  const hasData = series.some((item) => item.values.some((value) => value > 0));

  if (!hasData || dates.length === 0) {
    return <EmptyChartState label={emptyLabel} tone="dark" />;
  }

  const width = 100;
  const height = 62;
  const paddingX = 8;
  const paddingY = 7;
  const baseline = height - paddingY;
  const tickSteps = [0, 0.33, 0.66, 1];
  const tickValues = tickSteps.map((step) => Math.round(step * maxValue)).reverse();
  const dateTicks = getDateTicks(dates);
  const toX = (index: number) => (
    dates.length === 1
      ? width / 2
      : paddingX + (index / (dates.length - 1)) * (width - paddingX * 2)
  );
  const toY = (value: number) => baseline - (value / maxValue) * (height - paddingY * 2);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {series.map((item) => {
          const latestValue = item.values[item.values.length - 1] ?? 0;

          return (
            <div
              key={item.label}
              className="rounded-[1.45rem] border border-white/10 bg-white/6 px-4 py-3"
            >
              <div className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/60">
                <span className={`h-2.5 w-2.5 rounded-full ${item.badgeClass}`} />
                {item.label}
              </div>
              <div className="mt-3 text-3xl font-serif text-white">
                {formatCompactNumber(latestValue)}
              </div>
              <div className="mt-1 text-xs text-white/50">Most recent day</div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-[48px_1fr] md:items-stretch">
        <div className="hidden justify-between py-3 text-xs text-white/44 md:flex md:flex-col">
          {tickValues.map((value, index) => (
            <span key={`${id}-tick-${index}`}>{formatCompactNumber(value)}</span>
          ))}
        </div>

        <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.04] p-3">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-64 w-full">
            <defs>
              {series.map((item) => {
                const gradientId = `${id}-${item.label.replace(/\s+/g, '-').toLowerCase()}`;

                return (
                  <linearGradient key={gradientId} id={gradientId} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={item.fill} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={item.fill} stopOpacity="0" />
                  </linearGradient>
                );
              })}
            </defs>

            {tickSteps.map((step) => {
              const y = baseline - step * (height - paddingY * 2);

              return (
                <line
                  key={step}
                  x1={paddingX}
                  x2={width - paddingX}
                  y1={y}
                  y2={y}
                  stroke="rgb(255 255 255 / 0.12)"
                  strokeWidth="0.5"
                />
              );
            })}

            {dateTicks.map((tick) => (
              <line
                key={tick.index}
                x1={toX(tick.index)}
                x2={toX(tick.index)}
                y1={paddingY}
                y2={baseline}
                stroke="rgb(255 255 255 / 0.08)"
                strokeWidth="0.45"
              />
            ))}

            {series.map((item) => {
              const gradientId = `${id}-${item.label.replace(/\s+/g, '-').toLowerCase()}`;

              return (
                <path
                  key={`${item.label}-area`}
                  d={buildAreaPath(item.values, baseline, toX, toY)}
                  fill={`url(#${gradientId})`}
                />
              );
            })}

            {series.map((item) => {
              if (item.values.length === 0) {
                return null;
              }

              const lastIndex = item.values.length - 1;

              return (
                <g key={item.label}>
                  <path
                    d={buildLinePath(item.values, toX, toY)}
                    fill="none"
                    stroke={item.stroke}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={item.dashed ? '4 2.5' : undefined}
                  />
                  <circle
                    cx={toX(lastIndex)}
                    cy={toY(item.values[lastIndex] ?? 0)}
                    r="1.55"
                    fill={item.stroke}
                    stroke="rgb(255 255 255 / 0.7)"
                    strokeWidth="0.7"
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-3 text-xs text-white/50">
        {dateTicks.map((tick) => (
          <span key={`${id}-${tick.index}`}>{tick.label}</span>
        ))}
      </div>
    </div>
  );
}
