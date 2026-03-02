import type { CmsPagesContent } from '../../cms/schema';
import { AdminInput, AdminTextarea } from './AdminField';
import { AdminSection } from './AdminSection';
import { fromLineList, toLineList } from './admin.utils';

interface PagesContentEditorProps {
  pages: CmsPagesContent;
  onChange: (pages: CmsPagesContent) => void;
}

type PageSectionKey = keyof CmsPagesContent;
type PageFieldKind = 'input' | 'textarea' | 'line-list';

interface PageFieldConfig {
  hint?: string;
  key: string;
  kind?: PageFieldKind;
  label: string;
  rows?: number;
}

interface PageSectionConfig {
  fields: PageFieldConfig[];
  gridClassName?: string;
  section: PageSectionKey;
  title: string;
}

const PAGE_SECTIONS: PageSectionConfig[] = [
  {
    title: 'Portfolio page',
    section: 'portfolio',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow' },
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', kind: 'textarea', rows: 3 },
    ],
  },
  {
    title: 'About page',
    section: 'about',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow' },
      { key: 'image', label: 'Image URL' },
      { key: 'titleLeading', label: 'Title lead' },
      { key: 'titleHighlight', label: 'Title highlight' },
      { key: 'titleTrailing', label: 'Title ending' },
      { key: 'imageAlt', label: 'Image alt text' },
      {
        key: 'paragraphs',
        label: 'Paragraphs',
        kind: 'line-list',
        hint: 'One paragraph per line.',
        rows: 6,
      },
      { key: 'bestFit', label: 'Best fit', kind: 'textarea', rows: 2 },
    ],
  },
  {
    title: 'Contact page',
    section: 'contact',
    fields: [
      { key: 'badge', label: 'Badge' },
      { key: 'submitLabel', label: 'Submit button' },
      { key: 'titleLeading', label: 'Title lead' },
      { key: 'titleHighlight', label: 'Title highlight' },
      { key: 'titleTrailing', label: 'Title ending' },
      { key: 'description', label: 'Description', kind: 'textarea', rows: 3 },
      { key: 'formNote', label: 'Form note', kind: 'textarea', rows: 3 },
    ],
  },
  {
    title: 'Journal page',
    section: 'journal',
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', kind: 'textarea', rows: 3 },
    ],
  },
];

function renderField(
  section: PageSectionKey,
  field: PageFieldConfig,
  pages: CmsPagesContent,
  onValueChange: (section: PageSectionKey, key: string, value: string | string[]) => void,
) {
  const page = pages[section] as unknown as Record<string, string | string[]>;
  const value = page[field.key];

  if (field.kind === 'line-list') {
    return (
      <AdminTextarea
        key={`${section}-${field.key}`}
        label={field.label}
        hint={field.hint}
        rows={field.rows ?? 4}
        value={Array.isArray(value) ? fromLineList(value) : ''}
        onChange={(event) => onValueChange(section, field.key, toLineList(event.target.value))}
      />
    );
  }

  if (field.kind === 'textarea') {
    return (
      <AdminTextarea
        key={`${section}-${field.key}`}
        label={field.label}
        hint={field.hint}
        rows={field.rows ?? 3}
        value={typeof value === 'string' ? value : ''}
        onChange={(event) => onValueChange(section, field.key, event.target.value)}
      />
    );
  }

  return (
    <AdminInput
      key={`${section}-${field.key}`}
      label={field.label}
      value={typeof value === 'string' ? value : ''}
      onChange={(event) => onValueChange(section, field.key, event.target.value)}
    />
  );
}

export function PagesContentEditor({ onChange, pages }: PagesContentEditorProps) {
  const updateField = (section: PageSectionKey, key: string, value: string | string[]) => {
    onChange({
      ...pages,
      [section]: {
        ...pages[section],
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      {PAGE_SECTIONS.map(({ fields, gridClassName = 'md:grid-cols-2', section, title }) => {
        const inputFields = fields.filter((field) => (field.kind ?? 'input') === 'input');
        const contentFields = fields.filter((field) => (field.kind ?? 'input') !== 'input');

        return (
          <AdminSection key={section} title={title}>
            {inputFields.length > 0 ? (
              <div className={`grid gap-4 ${gridClassName}`}>
                {inputFields.map((field) => renderField(section, field, pages, updateField))}
              </div>
            ) : null}

            {contentFields.map((field) => renderField(section, field, pages, updateField))}
          </AdminSection>
        );
      })}
    </div>
  );
}
