import type { CmsPagesContent } from '../../cms/schema';
import { AdminInput, AdminTextarea } from './AdminField';
import { AdminSection } from './AdminSection';
import { fromLineList, toLineList } from './admin.utils';

interface PagesContentEditorProps {
  pages: CmsPagesContent;
  onChange: (pages: CmsPagesContent) => void;
}

export function PagesContentEditor({ onChange, pages }: PagesContentEditorProps) {
  return (
    <div className="space-y-6">
      <AdminSection title="Portfolio page">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput
            label="Eyebrow"
            value={pages.portfolio.eyebrow}
            onChange={(event) => onChange({
              ...pages,
              portfolio: { ...pages.portfolio, eyebrow: event.target.value },
            })}
          />
          <AdminInput
            label="Title"
            value={pages.portfolio.title}
            onChange={(event) => onChange({
              ...pages,
              portfolio: { ...pages.portfolio, title: event.target.value },
            })}
          />
        </div>
        <AdminTextarea
          label="Description"
          rows={3}
          value={pages.portfolio.description}
          onChange={(event) => onChange({
            ...pages,
            portfolio: { ...pages.portfolio, description: event.target.value },
          })}
        />
      </AdminSection>

      <AdminSection title="About page">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput
            label="Eyebrow"
            value={pages.about.eyebrow}
            onChange={(event) => onChange({
              ...pages,
              about: { ...pages.about, eyebrow: event.target.value },
            })}
          />
          <AdminInput
            label="Image URL"
            value={pages.about.image}
            onChange={(event) => onChange({
              ...pages,
              about: { ...pages.about, image: event.target.value },
            })}
          />
          <AdminInput
            label="Title lead"
            value={pages.about.titleLeading}
            onChange={(event) => onChange({
              ...pages,
              about: { ...pages.about, titleLeading: event.target.value },
            })}
          />
          <AdminInput
            label="Title highlight"
            value={pages.about.titleHighlight}
            onChange={(event) => onChange({
              ...pages,
              about: { ...pages.about, titleHighlight: event.target.value },
            })}
          />
          <AdminInput
            label="Title ending"
            value={pages.about.titleTrailing}
            onChange={(event) => onChange({
              ...pages,
              about: { ...pages.about, titleTrailing: event.target.value },
            })}
          />
          <AdminInput
            label="Image alt text"
            value={pages.about.imageAlt}
            onChange={(event) => onChange({
              ...pages,
              about: { ...pages.about, imageAlt: event.target.value },
            })}
          />
        </div>
        <AdminTextarea
          label="Paragraphs"
          hint="One paragraph per line."
          rows={6}
          value={fromLineList(pages.about.paragraphs)}
          onChange={(event) => onChange({
            ...pages,
            about: { ...pages.about, paragraphs: toLineList(event.target.value) },
          })}
        />
        <AdminTextarea
          label="Best fit"
          rows={2}
          value={pages.about.bestFit}
          onChange={(event) => onChange({
            ...pages,
            about: { ...pages.about, bestFit: event.target.value },
          })}
        />
      </AdminSection>

      <AdminSection title="Contact page">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput
            label="Badge"
            value={pages.contact.badge}
            onChange={(event) => onChange({
              ...pages,
              contact: { ...pages.contact, badge: event.target.value },
            })}
          />
          <AdminInput
            label="Submit button"
            value={pages.contact.submitLabel}
            onChange={(event) => onChange({
              ...pages,
              contact: { ...pages.contact, submitLabel: event.target.value },
            })}
          />
          <AdminInput
            label="Title lead"
            value={pages.contact.titleLeading}
            onChange={(event) => onChange({
              ...pages,
              contact: { ...pages.contact, titleLeading: event.target.value },
            })}
          />
          <AdminInput
            label="Title highlight"
            value={pages.contact.titleHighlight}
            onChange={(event) => onChange({
              ...pages,
              contact: { ...pages.contact, titleHighlight: event.target.value },
            })}
          />
          <AdminInput
            label="Title ending"
            value={pages.contact.titleTrailing}
            onChange={(event) => onChange({
              ...pages,
              contact: { ...pages.contact, titleTrailing: event.target.value },
            })}
          />
        </div>
        <AdminTextarea
          label="Description"
          rows={3}
          value={pages.contact.description}
          onChange={(event) => onChange({
            ...pages,
            contact: { ...pages.contact, description: event.target.value },
          })}
        />
        <AdminTextarea
          label="Form note"
          rows={3}
          value={pages.contact.formNote}
          onChange={(event) => onChange({
            ...pages,
            contact: { ...pages.contact, formNote: event.target.value },
          })}
        />
      </AdminSection>

      <AdminSection title="Journal page">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput
            label="Title"
            value={pages.journal.title}
            onChange={(event) => onChange({
              ...pages,
              journal: { ...pages.journal, title: event.target.value },
            })}
          />
        </div>
        <AdminTextarea
          label="Description"
          rows={3}
          value={pages.journal.description}
          onChange={(event) => onChange({
            ...pages,
            journal: { ...pages.journal, description: event.target.value },
          })}
        />
      </AdminSection>
    </div>
  );
}
