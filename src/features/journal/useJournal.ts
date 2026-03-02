import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { trackAnalyticsEvent } from '../../analytics/client';
import { useCms } from '../../cms/useCms';
import { getPublishedBlogPosts } from '../../cms/selectors';

const POSTS_PER_PAGE = 6;

export function useJournal() {
  const { content } = useCms();
  const posts = getPublishedBlogPosts(content);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const blogSectionRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const postIdFromUrl = searchParams.get('post');

  const categories = useMemo(() => {
    const uniqueCategories = new Set(posts.map((post) => post.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') {
      return posts;
    }

    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [currentPage, filteredPosts]);

  const selectedPost = useMemo(
    () => posts.find((post) => post.id === postIdFromUrl) ?? null,
    [postIdFromUrl, posts],
  );

  const updateSearchParams = (updater: (params: URLSearchParams) => void) => {
    const nextParams = new URLSearchParams(searchParams);
    updater(nextParams);
    setSearchParams(nextParams, { replace: true });
  };

  const scrollToBlogSection = () => {
    if (!blogSectionRef.current) {
      return;
    }

    window.scrollTo({
      top: blogSectionRef.current.offsetTop - 100,
      behavior: 'smooth',
    });
  };

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) {
      return;
    }

    setActiveCategory(category);
    setCurrentPage(1);
    trackAnalyticsEvent({
      eventType: 'journal_filter',
      path: '/journal',
      label: category,
    });
    scrollToBlogSection();
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) {
      return;
    }

    setCurrentPage(page);
    trackAnalyticsEvent({
      eventType: 'journal_page',
      path: '/journal',
      label: `Page ${page}`,
      metadata: {
        page,
      },
    });
    scrollToBlogSection();
  };

  const openPost = (postId: string) => {
    const post = posts.find((candidate) => candidate.id === postId);
    updateSearchParams((params) => {
      params.set('post', postId);
    });
    trackAnalyticsEvent({
      eventType: 'journal_post_open',
      path: '/journal',
      label: post?.title ?? postId,
      metadata: {
        category: post?.category ?? null,
      },
    });
  };

  const closePost = () => {
    updateSearchParams((params) => {
      params.delete('post');
    });
  };

  return {
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
  };
}
