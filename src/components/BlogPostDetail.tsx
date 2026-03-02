import { motion } from 'motion/react';
import { format } from 'date-fns';
import { Calendar, Tag, X } from 'lucide-react';
import Markdown from 'react-markdown';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { PostShareActions } from '../features/journal/PostShareActions';
import type { BlogPost } from '../types';

interface BlogPostDetailProps {
  post: BlogPost;
  onClose: () => void;
}

export function BlogPostDetail({ post, onClose }: BlogPostDetailProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this post: ${post.title}`;

  useBodyScrollLock(true);
  useEscapeKey(onClose);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`blog-post-title-${post.id}`}
    >
      <div className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] bg-brand-cream shadow-2xl sm:max-h-[90vh] sm:rounded-[32px]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/85 p-2 text-brand-ink backdrop-blur-sm transition-colors hover:bg-white sm:right-6 sm:top-6"
          aria-label="Close article"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto">
          <div className="aspect-[5/4] w-full overflow-hidden sm:aspect-[21/9]">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="p-5 sm:p-8 md:p-16">
            <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6">
              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-brand-muted">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {format(new Date(post.date), 'MMMM d, yyyy')}
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={16} />
                  {post.category}
                </div>
              </div>

              <PostShareActions shareText={shareText} shareUrl={shareUrl} />
            </div>

            <h1 id={`blog-post-title-${post.id}`} className="mb-8 text-3xl font-serif leading-tight sm:text-4xl md:mb-10 md:text-6xl">
              {post.title}
            </h1>

            <div className="markdown-body">
              <Markdown>{post.content}</Markdown>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
