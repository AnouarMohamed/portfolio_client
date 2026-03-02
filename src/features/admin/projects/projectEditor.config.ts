import type { Project } from '../../../types';
import { mapOptions } from '../admin.utils';

export const statusOptions = mapOptions(['published', 'draft']);

export const projectFields: Array<{
  key: 'category' | 'client' | 'duration' | 'image' | 'role' | 'year';
  label: string;
}> = [
  { key: 'client', label: 'Client' },
  { key: 'category', label: 'Category' },
  { key: 'duration', label: 'Duration' },
  { key: 'role', label: 'Role' },
  { key: 'image', label: 'Image URL' },
  { key: 'year', label: 'Year' },
];

export const lineListFields: Array<{
  key: 'gallery' | 'services' | 'stack' | 'tags';
  label: string;
  hint: string;
}> = [
  { key: 'tags', label: 'Tags', hint: 'One tag per line.' },
  { key: 'services', label: 'Services', hint: 'One service per line.' },
  { key: 'stack', label: 'Stack', hint: 'One item per line.' },
  { key: 'gallery', label: 'Gallery images', hint: 'One image URL per line.' },
];

export const narrativeFields: Array<{
  key: 'approach' | 'challenge' | 'outcome';
  label: string;
}> = [
  { key: 'challenge', label: 'Challenge' },
  { key: 'approach', label: 'Approach' },
  { key: 'outcome', label: 'Outcome' },
];

export const resultFields: Array<{ key: keyof Project['results'][number]; label: string }> = [
  { key: 'value', label: 'Value' },
  { key: 'label', label: 'Label' },
  { key: 'detail', label: 'Detail' },
];
