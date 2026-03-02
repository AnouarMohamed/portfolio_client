import { motion } from 'motion/react';
import { useCms } from '../cms/useCms';
import { usePageMeta } from '../hooks/usePageMeta';

export default function About() {
  const {
    content: { home, pages, site },
  } = useCms();

  usePageMeta({
    title: 'About Me | Aya Anouar',
    description: "I'm Aya Anouar, a fifth-year medical student, painter, reflective writer, and curious observer.",
  });

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pb-40 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 sm:gap-16 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-5 block text-[11px] font-bold uppercase tracking-[0.24em] text-brand-accent sm:mb-6 sm:text-xs sm:tracking-[0.35em]"
            >
              {pages.about.eyebrow}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-4xl font-serif leading-[0.95] sm:text-5xl md:mb-10 md:text-8xl"
            >
              {pages.about.titleLeading}
              {' '}
              <span className="italic text-brand-accent">{pages.about.titleHighlight}</span>
              {pages.about.titleTrailing ? ` ${pages.about.titleTrailing}` : ''}
            </motion.h1>
            <div className="space-y-6 text-base leading-relaxed text-brand-muted sm:space-y-7 sm:text-lg">
              {pages.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {home.stats.map((stat) => (
                <article key={stat.id} className="rounded-[1.75rem] border border-brand-ink/8 bg-white/80 p-5 shadow-lg shadow-brand-ink/5 sm:p-6">
                  <div className="mb-2 text-3xl font-serif text-brand-accent">{stat.value}</div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-ink">{stat.label}</div>
                  <p className="text-sm leading-relaxed text-brand-muted">{stat.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="rounded-[2rem] border border-brand-ink/8 bg-white/75 p-5 shadow-2xl shadow-brand-ink/8 backdrop-blur-sm sm:rounded-[2.5rem] sm:p-8"
          >
            <div className="mb-8 overflow-hidden rounded-[2rem]">
              <img
                src={pages.about.image}
                alt={pages.about.imageAlt}
                className="aspect-[4/5] w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-6">
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-muted">Availability</div>
                <div className="text-lg text-brand-ink">{site.availability}</div>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-muted">Response time</div>
                <div className="text-lg text-brand-ink">{site.responseTime}</div>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-muted">Best fit</div>
                <div className="text-lg leading-relaxed text-brand-ink">
                  {pages.about.bestFit}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
