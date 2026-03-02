import type { Project } from '../../../types';
import { AdminAddButton, AdminRemoveButton } from '../AdminActions';
import {
  AdminCheckbox,
  AdminInput,
  AdminLineListField,
  AdminSelect,
  AdminTextarea,
} from '../AdminField';
import { patchAtIndex, removeAtIndex, slugify } from '../admin.utils';
import {
  lineListFields,
  narrativeFields,
  projectFields,
  resultFields,
  statusOptions,
} from './projectEditor.config';

const summaryFields: Array<{
  key: 'description' | 'headline' | 'summary';
  label: string;
  rows: number;
}> = [
  { key: 'headline', label: 'Headline', rows: 2 },
  { key: 'description', label: 'Description', rows: 3 },
  { key: 'summary', label: 'Summary', rows: 3 },
];

interface ProjectCardEditorProps {
  onChange: (patch: Partial<Project>) => void;
  onRemove: () => void;
  project: Project;
}

function ResultsEditor({
  project,
  onChange,
}: Pick<ProjectCardEditorProps, 'onChange' | 'project'>) {
  return (
    <div className="space-y-4">
      <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
        Results
      </div>
      {project.results.map((result, index) => (
        <div
          key={`${project.id}-result-${index}`}
          className="grid gap-4 rounded-[1.5rem] border border-brand-ink/8 p-4 md:grid-cols-[180px_1fr_1fr_auto]"
        >
          {resultFields.map(({ key, label }) => (
            <AdminInput
              key={key}
              label={label}
              value={result[key]}
              onChange={(event) => onChange({
                results: patchAtIndex(project.results, index, { [key]: event.target.value }),
              })}
            />
          ))}
          <div className="mt-7">
            <AdminRemoveButton
              label="Remove"
              onClick={() => onChange({ results: removeAtIndex(project.results, index) })}
            />
          </div>
        </div>
      ))}
      <AdminAddButton
        label="Add result"
        onClick={() => onChange({
          results: [...project.results, { value: '', label: '', detail: '' }],
        })}
      />
    </div>
  );
}

function TestimonialEditor({
  project,
  onChange,
}: Pick<ProjectCardEditorProps, 'onChange' | 'project'>) {
  return (
    <div className="space-y-4 rounded-[1.5rem] border border-brand-ink/8 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
          Project testimonial
        </div>
        <button
          type="button"
          onClick={() => onChange({
            testimonial: project.testimonial ? undefined : { quote: '', author: '', role: '' },
          })}
          className="text-sm font-semibold text-brand-accent"
        >
          {project.testimonial ? 'Remove testimonial' : 'Add testimonial'}
        </button>
      </div>

      {project.testimonial ? (
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput
            label="Author"
            value={project.testimonial.author}
            onChange={(event) => onChange({
              testimonial: { ...project.testimonial!, author: event.target.value },
            })}
          />
          <AdminInput
            label="Role"
            value={project.testimonial.role}
            onChange={(event) => onChange({
              testimonial: { ...project.testimonial!, role: event.target.value },
            })}
          />
          <div className="md:col-span-2">
            <AdminTextarea
              label="Quote"
              rows={3}
              value={project.testimonial.quote}
              onChange={(event) => onChange({
                testimonial: { ...project.testimonial!, quote: event.target.value },
              })}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ProjectCardEditor({ onChange, onRemove, project }: ProjectCardEditorProps) {
  const updateTitle = (title: string) => {
    onChange({
      title,
      slug: project.slug || slugify(title),
    });
  };

  return (
    <article className="space-y-5 rounded-[1.75rem] border border-brand-ink/8 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-serif text-brand-ink">{project.title}</h3>
        <AdminRemoveButton label="Remove" onClick={onRemove} />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <AdminSelect
          label="Status"
          value={project.status}
          options={statusOptions}
          onChange={(event) => onChange({ status: event.target.value as Project['status'] })}
        />
        <AdminInput
          label="Sort order"
          type="number"
          value={String(project.sortOrder)}
          onChange={(event) => onChange({ sortOrder: Number(event.target.value) || 0 })}
        />
        <AdminInput
          label="Year"
          value={project.year}
          onChange={(event) => onChange({ year: event.target.value })}
        />
        <div className="pt-7">
          <AdminCheckbox
            label="Featured"
            checked={Boolean(project.featured)}
            onChange={(featured) => onChange({ featured })}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AdminInput label="Title" value={project.title} onChange={(event) => updateTitle(event.target.value)} />
        <AdminInput
          label="Slug"
          value={project.slug}
          onChange={(event) => onChange({ slug: slugify(event.target.value) })}
        />
        {projectFields.map(({ key, label }) => (
          <AdminInput
            key={key}
            label={label}
            value={project[key]}
            onChange={(event) => onChange({ [key]: event.target.value } as Partial<Project>)}
          />
        ))}
      </div>

      {summaryFields.map(({ key, label, rows }) => (
        <AdminTextarea
          key={key}
          label={label}
          rows={rows}
          value={project[key]}
          onChange={(event) => onChange({ [key]: event.target.value } as Partial<Project>)}
        />
      ))}

      <div className="grid gap-4 md:grid-cols-2">
        {lineListFields.map(({ key, hint, label }) => (
          <AdminLineListField
            key={key}
            label={label}
            hint={hint}
            rows={4}
            values={project[key]}
            onChange={(value) => onChange({ [key]: value } as Partial<Project>)}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {narrativeFields.map(({ key, label }) => (
          <AdminTextarea
            key={key}
            label={label}
            rows={5}
            value={project[key]}
            onChange={(event) => onChange({ [key]: event.target.value } as Partial<Project>)}
          />
        ))}
      </div>

      <ResultsEditor project={project} onChange={onChange} />
      <TestimonialEditor project={project} onChange={onChange} />
    </article>
  );
}
