import { EmptyChartState } from './AnalyticsPrimitives';

interface HorizontalBarsProps {
  emptyLabel: string;
  items: Array<{ label: string; value: number }>;
  valueLabel?: (value: number) => string;
}

export function HorizontalBars({ emptyLabel, items, valueLabel }: HorizontalBarsProps) {
  if (items.length === 0) {
    return <EmptyChartState label={emptyLabel} />;
  }

  const maxValue = Math.max(...items.map((item) => item.value), 1);
  const totalValue = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const share = totalValue > 0 ? Math.round((item.value / totalValue) * 100) : 0;

        return (
          <article
            key={item.label}
            className="rounded-[1.55rem] border border-brand-ink/8 bg-brand-paper/52 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-brand-ink">
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-brand-ink">{item.label}</div>
                  <div className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand-muted">
                    {share}% of tracked total
                  </div>
                </div>
              </div>
              <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand-ink">
                {valueLabel ? valueLabel(item.value) : item.value}
              </div>
            </div>

            <div className="mt-4 h-2.5 rounded-full bg-white">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-ink via-brand-accent to-brand-soft-gold"
                style={{
                  width: item.value === 0 ? '0%' : `${Math.max(10, (item.value / maxValue) * 100)}%`,
                }}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
