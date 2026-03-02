import type { BlogPost, Project } from '../types';
import type { CmsContent } from './schema';

export function sortProjects(left: Project, right: Project) {
  if (left.sortOrder !== right.sortOrder) {
    return left.sortOrder - right.sortOrder;
  }

  return right.year.localeCompare(left.year);
}

export function sortPosts(left: BlogPost, right: BlogPost) {
  if (left.sortOrder !== right.sortOrder) {
    return left.sortOrder - right.sortOrder;
  }

  return right.date.localeCompare(left.date);
}

export function getPublishedProjects(content: CmsContent) {
  return content.projects
    .filter((project) => project.status === 'published')
    .sort(sortProjects);
}

export function getFeaturedProjects(content: CmsContent) {
  return getPublishedProjects(content).filter((project) => project.featured);
}

export function getProjectBySlug(content: CmsContent, slug: string) {
  return getPublishedProjects(content).find((project) => project.slug === slug) ?? null;
}

export function getPublishedBlogPosts(content: CmsContent) {
  return content.blogPosts
    .filter((post) => post.status === 'published')
    .sort(sortPosts);
}
