import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCms } from '../../cms/useCms';

function scrollToFeaturedWork() {
  document.getElementById('featured-work')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

export function HeroSection() {
  const {
    content: { home, site },
  } = useCms();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-20">
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top,_rgba(197,179,88,0.18),_transparent_55%)]" />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 sm:gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <span className="mb-6 inline-flex rounded-full border border-brand-accent/20 bg-brand-paper/70 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-accent backdrop-blur-sm sm:mb-8 sm:px-4 sm:text-xs sm:tracking-[0.35em]">
              {home.hero.badge}
            </span>

            <h1 className="mb-6 max-w-5xl text-4xl font-serif leading-[0.95] text-balance sm:text-5xl md:mb-8 md:text-8xl">
              {home.hero.titleLeading}
              {' '}
              <span className="italic text-brand-accent">{home.hero.titleHighlight}</span>
              {' '}
              {home.hero.titleTrailing}
            </h1>

            <p className="mb-8 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg md:mb-10 md:text-xl">
              {home.hero.description}
            </p>

            <div className="mb-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Link
                to={home.hero.primaryCtaHref}
                className="w-full rounded-full bg-brand-ink px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.24em] text-white shadow-xl shadow-brand-ink/15 transition-all hover:-translate-y-0.5 hover:bg-brand-accent sm:w-auto sm:px-8 sm:text-sm sm:tracking-[0.3em]"
                data-analytics-event="cta_click"
                data-analytics-label={home.hero.primaryCtaLabel}
                data-analytics-path={home.hero.primaryCtaHref}
              >
                {home.hero.primaryCtaLabel}
              </Link>
              <Link
                to={home.hero.secondaryCtaHref}
                className="inline-flex items-center border-b border-brand-ink/20 pb-1 text-xs font-semibold uppercase tracking-[0.24em] transition-colors hover:border-brand-ink hover:text-brand-ink sm:text-sm sm:tracking-[0.3em]"
                data-analytics-event="cta_click"
                data-analytics-label={home.hero.secondaryCtaLabel}
                data-analytics-path={home.hero.secondaryCtaHref}
              >
                {home.hero.secondaryCtaLabel}
              </Link>
            </div>

            <div className="mb-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted sm:mb-10 sm:text-sm sm:tracking-[0.28em]">
              {site.availability}
            </div>

            <div className="grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {home.stats.map((stat) => (
                <article key={stat.id} className="rounded-[1.5rem] border border-brand-ink/8 bg-white/75 p-4 shadow-lg shadow-brand-ink/5 backdrop-blur-sm sm:rounded-[1.75rem] sm:p-5">
                  <div className="mb-2 text-2xl font-serif text-brand-accent sm:text-3xl">{stat.value}</div>
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-ink sm:text-xs sm:tracking-[0.28em]">{stat.label}</div>
                  <p className="text-sm leading-relaxed text-brand-muted">{stat.detail}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.15 }}
            className="relative overflow-hidden rounded-[2rem] border border-brand-ink/8 bg-white shadow-2xl shadow-brand-ink/10 sm:rounded-[3rem]"
          >
            <img
              src={home.hero.showcaseImage}
              alt={home.hero.showcaseImageAlt}
              className="aspect-[5/4] w-full object-cover sm:aspect-[4/5]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75 sm:mb-3 sm:text-xs sm:tracking-[0.3em]">{home.hero.showcaseEyebrow}</div>
              <div className="mb-2 text-2xl font-serif sm:text-3xl">{home.hero.showcaseTitle}</div>
              <p className="max-w-md text-sm leading-relaxed text-white/80">
                {home.hero.showcaseDescription}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.button
          type="button"
          onClick={scrollToFeaturedWork}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-brand-muted transition-colors hover:text-brand-ink"
          aria-label="Scroll to featured work"
        >
          <ArrowDown size={24} strokeWidth={1.5} />
        </motion.button>
      </motion.div>
    </section>
  );
}
