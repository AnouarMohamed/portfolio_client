import { ANALYTICS_EVENT_LABELS } from '../../../analytics/labels';
import type { AnalyticsSnapshot } from '../../../cms/schema';

interface SummaryPanelProps {
  analytics: AnalyticsSnapshot;
}

export function SummaryPanel({ analytics }: SummaryPanelProps) {
  const topPage = analytics.topPages[0]?.label ?? 'Waiting for visits';
  const topAction = analytics.actionsByType[0]
    ? ANALYTICS_EVENT_LABELS[analytics.actionsByType[0].eventType]
    : 'Waiting for actions';

  return (
    <article className="relative overflow-hidden rounded-[2.15rem] bg-[linear-gradient(145deg,_#181818_0%,_#1e1d1a_52%,_#2a281f_100%)] p-6 text-white shadow-[0_25px_60px_rgb(26_26_26_/_0.16)]">
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-brand-soft-gold">
            Analytics overview
          </div>
          <h3 className="mt-4 max-w-2xl text-4xl leading-[0.95]">
            A sharper read on what visitors notice, open, and act on.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/68">
            Traffic shows where attention lands. Action events show whether the portfolio is
            actually guiding people toward projects, inquiry flows, and deeper reading.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/7 px-4 py-4">
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/52">
              Tracking window
            </div>
            <div className="mt-2 text-2xl font-serif text-white">{analytics.windowDays} days</div>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/7 px-4 py-4">
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/52">
              Top page
            </div>
            <div className="mt-2 text-lg font-semibold text-white">{topPage}</div>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/7 px-4 py-4">
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/52">
              Strongest signal
            </div>
            <div className="mt-2 text-lg font-semibold text-white">{topAction}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
