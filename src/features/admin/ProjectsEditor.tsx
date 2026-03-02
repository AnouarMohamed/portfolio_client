import type { Project } from '../../types';
import { sortProjects } from '../../cms/selectors';
import { AdminAddButton } from './AdminActions';
import { AdminSection } from './AdminSection';
import { createEmptyProject, patchById, removeById } from './admin.utils';
import { ProjectCardEditor } from './projects/ProjectCardEditor';

interface ProjectsEditorProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

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
            <ProjectCardEditor
              key={project.id}
              project={project}
              onChange={(patch) => updateProject(project.id, patch)}
              onRemove={() => onChange(removeById(projects, project.id))}
            />
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
