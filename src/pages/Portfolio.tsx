import { motion } from 'motion/react';
import { useCms } from '../cms/useCms';
import { PortfolioCatalog } from '../features/projects/PortfolioCatalog';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Portfolio() {
  const {
    content: { pages },
  } = useCms();

  usePageMeta({
    title: 'Highlights',
    description: 'Clinical experiences, creative projects, research, and personal reflections that are shaping how I learn and live.',
  });

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pb-40 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent sm:text-xs sm:tracking-[0.35em]"
          >
            {pages.portfolio.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-4xl font-serif leading-[0.95] sm:text-5xl md:mb-8 md:text-8xl"
          >
            {pages.portfolio.title}
          </motion.h1>
          <p className="max-w-3xl text-base leading-relaxed text-brand-muted sm:text-lg md:text-xl">
            {pages.portfolio.description}
          </p>
        </div>

        <PortfolioCatalog />
      </div>
    </div>
  );
}
