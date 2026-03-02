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
    <div className="mx-auto mb-20 max-w-3xl text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-6xl font-serif md:text-8xl"
      >
        {title}
      </motion.h1>
      <p className="mb-12 text-xl text-brand-muted">
        {description}
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={cn(
              'rounded-full border px-6 py-2 text-xs font-semibold uppercase tracking-widest transition-all',
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
