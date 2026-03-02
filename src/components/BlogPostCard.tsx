import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import type { BlogPost } from '../types';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <motion.article
      className="group relative -m-4 rounded-3xl p-4 transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-brand-ink/5"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest shadow-sm backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-muted">
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </p>
        <h3 className="text-2xl font-serif transition-colors duration-300 group-hover:text-brand-accent">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-brand-muted">
          {post.excerpt}
        </p>
        <div className="flex items-center pt-2 text-sm font-semibold text-brand-ink transition-transform duration-300 group-hover:translate-x-2">
          Read More <ArrowRight size={16} className="ml-2" />
        </div>
      </div>
    </motion.article>
  );
}
