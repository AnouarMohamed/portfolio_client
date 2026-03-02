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
    <section className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent sm:text-xs sm:tracking-[0.35em]">More to explore</p>
            <h2 className="text-3xl font-serif sm:text-4xl md:text-5xl">Related highlights</h2>
          </div>
          <Link to="/portfolio" className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-ink transition-colors hover:text-brand-accent sm:text-sm sm:tracking-[0.3em]">
            View all highlights
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedProjects.map((item, index) => (
            <ProjectCard key={item.slug} project={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
