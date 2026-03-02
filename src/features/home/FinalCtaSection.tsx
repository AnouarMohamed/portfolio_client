import { Link } from 'react-router-dom';
import { useCms } from '../../cms/useCms';

export function FinalCtaSection() {
  const {
    content: { home, site },
  } = useCms();

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-brand-ink p-6 text-white shadow-2xl shadow-brand-ink/20 sm:p-10 md:p-16">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-soft-gold sm:text-xs sm:tracking-[0.35em]">
          {home.finalCta.eyebrow}
        </p>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h2 className="mb-6 text-3xl font-serif leading-[0.95] sm:text-4xl md:text-6xl">
              {home.finalCta.title}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {home.finalCta.description}
            </p>
          </div>
          <div className="lg:text-right">
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-soft-gold sm:text-sm sm:tracking-[0.3em]">
              {site.availability}
            </div>
            <Link
              to={home.finalCta.buttonHref}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-ink transition-all hover:-translate-y-0.5 hover:bg-brand-soft-gold sm:w-auto sm:text-sm sm:tracking-[0.3em]"
              data-analytics-event="cta_click"
              data-analytics-label={home.finalCta.buttonLabel}
              data-analytics-path={home.finalCta.buttonHref}
            >
              {home.finalCta.buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
