import { Link } from 'react-router-dom';
import { useCms } from '../../cms/useCms';

export function FinalCtaSection() {
  const {
    content: { home, site },
  } = useCms();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-brand-ink p-10 text-white shadow-2xl shadow-brand-ink/20 md:p-16">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-soft-gold">
          {home.finalCta.eyebrow}
        </p>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h2 className="mb-6 text-5xl font-serif leading-[0.95] md:text-6xl">
              {home.finalCta.title}
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-white/70">
              {home.finalCta.description}
            </p>
          </div>
          <div className="lg:text-right">
            <div className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-brand-soft-gold">
              {site.availability}
            </div>
            <Link
              to={home.finalCta.buttonHref}
              className="inline-flex rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.3em] text-brand-ink transition-all hover:-translate-y-0.5 hover:bg-brand-soft-gold"
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
