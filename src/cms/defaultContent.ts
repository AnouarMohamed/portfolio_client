import type { CmsContent } from './schema';
import { DEFAULT_BLOG_POSTS } from './defaultBlogPosts';
import { DEFAULT_HOME_CONTENT } from './defaultHomeContent';
import { DEFAULT_PAGES_CONTENT } from './defaultPagesContent';
import { DEFAULT_PROJECTS } from './defaultProjects';
import { DEFAULT_SITE_CONTENT } from './defaultSiteContent';

export const DEFAULT_CMS_CONTENT: CmsContent = {
  site: DEFAULT_SITE_CONTENT,
  home: DEFAULT_HOME_CONTENT,
  pages: DEFAULT_PAGES_CONTENT,
  projects: DEFAULT_PROJECTS,
  blogPosts: DEFAULT_BLOG_POSTS,
};
