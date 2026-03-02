import { AnimatePresence, motion } from 'motion/react';
import { BlogPostCard } from '../../components/BlogPostCard';
import type { BlogPost } from '../../types';

interface JournalGridProps {
  activeCategory: string;
  currentPage: number;
  posts: BlogPost[];
  onOpenPost: (postId: string) => void;
}

export function JournalGrid({
  activeCategory,
  currentPage,
  posts,
  onOpenPost,
}: JournalGridProps) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={`${activeCategory}-${currentPage}`}
        layout
        className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3"
      >
        {posts.map((post, index) => (
          <motion.div
            key={`${post.id}-${activeCategory}`}
            layout
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.7,
              delay: (index % 3) * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={() => onOpenPost(post.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onOpenPost(post.id);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Read ${post.title}`}
            className="cursor-pointer rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream"
          >
            <BlogPostCard post={post} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
