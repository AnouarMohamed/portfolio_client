import type { Project } from '../../types';
import { sortProjects } from '../../cms/selectors';
import { AdminAddButton, AdminRemoveButton } from './AdminActions';
import {
  AdminCheckbox,
  AdminInput,
  AdminLineListField,
  AdminSelect,
  AdminTextarea,
} from './AdminField';
import { AdminSection } from './AdminSection';
import {
  createEmptyProject,
  mapOptions,
  patchAtIndex,
  patchById,
  removeAtIndex,
  removeById,
  slugify,
} from './admin.utils';

interface ProjectsEditorProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

const statusOptions = mapOptions(['published', 'draft']);
const projectFields: Array<{
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
const lineListFields: Array<{
  key: 'gallery' | 'services' | 'stack' | 'tags';
  label: string;
  hint: string;
}> = [
  { key: 'tags', label: 'Tags', hint: 'One tag per line.' },
  { key: 'services', label: 'Services', hint: 'One service per line.' },
  { key: 'stack', label: 'Stack', hint: 'One item per line.' },
  { key: 'gallery', label: 'Gallery images', hint: 'One image URL per line.' },
];
const narrativeFields: Array<{
  key: 'approach' | 'challenge' | 'outcome';
  label: string;
}> = [
  { key: 'challenge', label: 'Challenge' },
  { key: 'approach', label: 'Approach' },
  { key: 'outcome', label: 'Outcome' },
];

export function ProjectsEditor({ onChange, projects }: ProjectsEditorProps) {
  const updateProject = (projectId: string, patch: Partial<Project>) => {
    onChange(patchById(projects, projectId, patch));
  };

  return (
    <div className="space-y-6">
      <AdminSection
        title="Projects"
        description="Published projects are visible to visitors. Drafts stay hidden but remain editable here."
      >
        <div className="space-y-6">
          {[...projects].sort(sortProjects).map((project) => (
            <article key={project.id} className="space-y-5 rounded-[1.75rem] border border-brand-ink/8 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-2xl font-serif text-brand-ink">{project.title}</h3>
                <AdminRemoveButton
                  label="Remove"
                  onClick={() => onChange(removeById(projects, project.id))}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <AdminSelect
                  label="Status"
                  value={project.status}
                  options={statusOptions}
                  onChange={(event) => updateProject(project.id, {
                    status: event.target.value as Project['status'],
                  })}
                />
                <AdminInput
                  label="Sort order"
                  type="number"
                  value={String(project.sortOrder)}
                  onChange={(event) => updateProject(project.id, {
                    sortOrder: Number(event.target.value) || 0,
                  })}
                />
                <AdminInput
                  label="Year"
                  value={project.year}
                  onChange={(event) => updateProject(project.id, { year: event.target.value })}
                />
                <div className="pt-7">
                  <AdminCheckbox
                    label="Featured"
                    checked={Boolean(project.featured)}
                    onChange={(featured) => updateProject(project.id, { featured })}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <AdminInput
                  label="Title"
                  value={project.title}
                  onChange={(event) => updateProject(project.id, {
                    title: event.target.value,
                    slug: project.slug || slugify(event.target.value),
                  })}
                />
                <AdminInput
                  label="Slug"
                  value={project.slug}
                  onChange={(event) => updateProject(project.id, {
                    slug: slugify(event.target.value),
                  })}
                />
                {projectFields.map(({ key, label }) => (
                  <AdminInput
                    key={key}
                    label={label}
                    value={project[key]}
                    onChange={(event) => updateProject(project.id, {
                      [key]: event.target.value,
                    } as Partial<Project>)}
                  />
                ))}
              </div>

              <AdminTextarea
                label="Headline"
                rows={2}
                value={project.headline}
                onChange={(event) => updateProject(project.id, { headline: event.target.value })}
              />
              <AdminTextarea
                label="Description"
                rows={3}
                value={project.description}
                onChange={(event) => updateProject(project.id, { description: event.target.value })}
              />
              <AdminTextarea
                label="Summary"
                rows={3}
                value={project.summary}
                onChange={(event) => updateProject(project.id, { summary: event.target.value })}
              />

              <div className="grid gap-4 md:grid-cols-2">
                {lineListFields.map(({ key, hint, label }) => (
                  <AdminLineListField
                    key={key}
                    label={label}
                    hint={hint}
                    rows={4}
                    values={project[key]}
                    onChange={(value) => updateProject(project.id, {
                      [key]: value,
                    } as Partial<Project>)}
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
                    onChange={(event) => updateProject(project.id, {
                      [key]: event.target.value,
                    } as Partial<Project>)}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
                  Results
                </div>
                {project.results.map((result, index) => (
                  <div
                    key={`${project.id}-result-${index}`}
                    className="grid gap-4 rounded-[1.5rem] border border-brand-ink/8 p-4 md:grid-cols-[180px_1fr_1fr_auto]"
                  >
                    {([
                      ['value', 'Value'],
                      ['label', 'Label'],
                      ['detail', 'Detail'],
                    ] as const).map(([key, label]) => (
                      <AdminInput
                        key={key}
                        label={label}
                        value={result[key]}
                        onChange={(event) => updateProject(project.id, {
                          results: patchAtIndex(project.results, index, {
                            [key]: event.target.value,
                          }),
                        })}
                      />
                    ))}
                    <div className="mt-7">
                      <AdminRemoveButton
                        label="Remove"
                        onClick={() => updateProject(project.id, {
                          results: removeAtIndex(project.results, index),
                        })}
                      />
                    </div>
                  </div>
                ))}
                <AdminAddButton
                  label="Add result"
                  onClick={() => updateProject(project.id, {
                    results: [...project.results, { value: '', label: '', detail: '' }],
                  })}
                />
              </div>

              <div className="space-y-4 rounded-[1.5rem] border border-brand-ink/8 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
                    Project testimonial
                  </div>
                  <button
                    type="button"
                    onClick={() => updateProject(project.id, {
                      testimonial: project.testimonial
                        ? undefined
                        : { quote: '', author: '', role: '' },
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
                      onChange={(event) => updateProject(project.id, {
                        testimonial: { ...project.testimonial!, author: event.target.value },
                      })}
                    />
                    <AdminInput
                      label="Role"
                      value={project.testimonial.role}
                      onChange={(event) => updateProject(project.id, {
                        testimonial: { ...project.testimonial!, role: event.target.value },
                      })}
                    />
                    <div className="md:col-span-2">
                      <AdminTextarea
                        label="Quote"
                        rows={3}
                        value={project.testimonial.quote}
                        onChange={(event) => updateProject(project.id, {
                          testimonial: { ...project.testimonial!, quote: event.target.value },
                        })}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <AdminAddButton
          label="Add project"
          onClick={() => onChange([...projects, createEmptyProject(projects.length)])}
        />
      </AdminSection>
    </div>
  );
}
