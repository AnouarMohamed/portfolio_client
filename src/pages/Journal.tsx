import { AnimatePresence } from 'motion/react';
import { useCms } from '../cms/useCms';
import { BlogPostDetail } from '../components/BlogPostDetail';
import { JournalGrid } from '../features/journal/JournalGrid';
import { JournalHeader } from '../features/journal/JournalHeader';
import { JournalPagination } from '../features/journal/JournalPagination';
import { useJournal } from '../features/journal/useJournal';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Journal() {
  const {
    content: { pages },
  } = useCms();

  usePageMeta({
    title: pages.journal.title,
    description: pages.journal.description,
  });

  const {
    activeCategory,
    blogSectionRef,
    categories,
    closePost,
    currentPage,
    currentPosts,
    handleCategoryChange,
    handlePageChange,
    openPost,
    selectedPost,
    totalPages,
  } = useJournal();

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pb-40 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <JournalHeader
          activeCategory={activeCategory}
          categories={categories}
          onCategoryChange={handleCategoryChange}
          title={pages.journal.title}
          description={pages.journal.description}
        />

        <div ref={blogSectionRef} className="min-h-[600px]">
          <JournalGrid
            activeCategory={activeCategory}
            currentPage={currentPage}
            posts={currentPosts}
            onOpenPost={openPost}
          />
        </div>

        <JournalPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <AnimatePresence>
        {selectedPost && (
          <BlogPostDetail post={selectedPost} onClose={closePost} />
        )}
      </AnimatePresence>
    </div>
  );
}
