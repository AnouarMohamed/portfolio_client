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
    <div className="px-6 pb-40 pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent"
          >
            {pages.portfolio.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-6xl font-serif leading-[0.95] md:text-8xl"
          >
            {pages.portfolio.title}
          </motion.h1>
          <p className="max-w-3xl text-xl leading-relaxed text-brand-muted">
            {pages.portfolio.description}
          </p>
        </div>

        <PortfolioCatalog />
      </div>
    </div>
  );
}
