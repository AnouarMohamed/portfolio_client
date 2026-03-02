import { motion } from 'motion/react';
import { cn } from '../../utils';

interface JournalHeaderProps {
  activeCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  title: string;
  description: string;
}

export function JournalHeader({
  activeCategory,
  categories,
  description,
  onCategoryChange,
  title,
}: JournalHeaderProps) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-4xl font-serif sm:text-5xl md:mb-10 md:text-8xl"
      >
        {title}
      </motion.h1>
      <p className="mb-8 text-base leading-relaxed text-brand-muted sm:mb-12 sm:text-xl">
        {description}
      </p>

      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={cn(
              'shrink-0 rounded-full border px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all sm:px-6 sm:text-xs sm:tracking-widest',
              activeCategory === category
                ? 'border-brand-ink bg-brand-ink text-white'
                : 'border-brand-paper bg-white text-brand-muted hover:border-brand-accent'
            )}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
