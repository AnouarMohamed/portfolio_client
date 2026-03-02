import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { AnalyticsTone } from './analytics.utils';

interface OverviewCardProps {
  detail: string;
  icon: LucideIcon;
  label: string;
  value: string | number;
}

interface ChartCardProps {
  children: ReactNode;
  description?: string;
  title: string;
  tone?: AnalyticsTone;
}

interface EmptyChartStateProps {
  label?: string;
  tone?: AnalyticsTone;
}

export function OverviewCard({ detail, icon: Icon, label, value }: OverviewCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[1.8rem] border border-brand-ink/8 bg-white/92 p-5 shadow-[0_18px_40px_rgb(26_26_26_/_0.05)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-soft-gold/80 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-brand-muted">
            {label}
          </div>
          <div className="mt-4 text-4xl font-serif text-brand-ink">{value}</div>
        </div>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-brand-paper text-brand-accent">
          <Icon size={18} />
        </div>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-brand-muted">{detail}</div>
    </article>
  );
}

export function ChartCard({
  children,
  description,
  title,
  tone = 'light',
}: ChartCardProps) {
  const containerClassName = tone === 'dark'
    ? 'border-white/8 bg-[linear-gradient(155deg,_#161616_0%,_#1d1c19_52%,_#28261f_100%)] text-white shadow-[0_25px_60px_rgb(26_26_26_/_0.18)]'
    : 'border-brand-ink/8 bg-white/92 text-brand-ink shadow-[0_18px_40px_rgb(26_26_26_/_0.05)]';
  const descriptionClassName = tone === 'dark' ? 'text-white/64' : 'text-brand-muted';

  return (
    <article className={`rounded-[2rem] border p-5 ${containerClassName}`}>
      <div className="mb-5">
        <h3 className="text-[2rem] leading-none">{title}</h3>
        {description ? (
          <p className={`mt-3 max-w-2xl text-sm leading-relaxed ${descriptionClassName}`}>
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </article>
  );
}

export function EmptyChartState({
  label,
  tone = 'light',
}: EmptyChartStateProps) {
  const className = tone === 'dark'
    ? 'border-white/10 bg-white/6 text-white/62'
    : 'border-brand-ink/10 bg-brand-paper/45 text-brand-muted';

  return (
    <div
      className={`rounded-[1.6rem] border border-dashed px-4 py-10 text-center text-sm ${className}`}
    >
      {label ?? 'No analytics yet. Once visitors start moving through the site, the graphs will populate here.'}
    </div>
  );
}
