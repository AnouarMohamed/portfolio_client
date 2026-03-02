import { Link } from 'react-router-dom';
import { ProjectCard } from '../../components/ProjectCard';
import { useCms } from '../../cms/useCms';
import { getPublishedProjects } from '../../cms/selectors';
import type { Project } from '../../types';

interface RelatedProjectsSectionProps {
  project: Project;
}

export function RelatedProjectsSection({ project }: RelatedProjectsSectionProps) {
  const { content } = useCms();
  const relatedProjects = getPublishedProjects(content).filter(
    (candidate) =>
      candidate.slug !== project.slug &&
      (candidate.category === project.category ||
        candidate.services.some((service) => project.services.includes(service))),
  ).slice(0, 3);

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">More work</p>
            <h2 className="text-4xl font-serif md:text-5xl">Related case studies</h2>
          </div>
          <Link to="/portfolio" className="text-sm font-bold uppercase tracking-[0.3em] text-brand-ink transition-colors hover:text-brand-accent">
            View full portfolio
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {relatedProjects.map((item, index) => (
            <ProjectCard key={item.slug} project={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
