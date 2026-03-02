import type { BlogPost, Project } from '../../types';

interface Identifiable {
  id: string;
}

export function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function toLineList(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function fromLineList(values: string[]) {
  return values.join('\n');
}

export function mapOptions(values: string[]) {
  return values.map((value) => ({ label: value, value }));
}

export function updateById<T extends Identifiable>(
  items: T[],
  id: string,
  updater: (item: T) => T,
) {
  return items.map((item) => (item.id === id ? updater(item) : item));
}

export function patchById<T extends Identifiable>(
  items: T[],
  id: string,
  patch: Partial<T>,
) {
  return updateById(items, id, (item) => ({ ...item, ...patch }));
}

export function removeById<T extends Identifiable>(items: T[], id: string) {
  return items.filter((item) => item.id !== id);
}

export function updateAtIndex<T>(
  items: T[],
  index: number,
  updater: (item: T) => T,
) {
  return items.map((item, itemIndex) => (
    itemIndex === index ? updater(item) : item
  ));
}

export function patchAtIndex<T extends object>(
  items: T[],
  index: number,
  patch: Partial<T>,
) {
  return updateAtIndex(items, index, (item) => ({ ...item, ...patch }));
}

export function removeAtIndex<T>(items: T[], index: number) {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatAdminTimestamp(value: string | null) {
  if (!value) {
    return 'Not saved yet';
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function createEmptyProject(projectCount: number): Project {
  return {
    id: createId('project'),
    slug: '',
    title: 'New project',
    client: '',
    year: String(new Date().getFullYear()),
    category: '',
    duration: '',
    role: '',
    headline: '',
    description: '',
    summary: '',
    image: '',
    tags: [],
    services: [],
    stack: [],
    challenge: '',
    approach: '',
    outcome: '',
    results: [],
    gallery: [],
    featured: false,
    sortOrder: projectCount + 1,
    status: 'draft',
  };
}

export function createEmptyPost(postCount: number): BlogPost {
  return {
    id: createId('post'),
    title: 'New journal post',
    excerpt: '',
    content: '',
    date: new Date().toISOString().slice(0, 10),
    category: 'Design',
    image: '',
    sortOrder: postCount + 1,
    status: 'draft',
  };
}
