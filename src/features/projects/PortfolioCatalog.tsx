import { useMemo, useState } from 'react';
import { trackAnalyticsEvent } from '../../analytics/client';
import { ProjectCard } from '../../components/ProjectCard';
import { useCms } from '../../cms/useCms';
import { getPublishedProjects } from '../../cms/selectors';
import { cn } from '../../utils';

const ALL_FILTER = 'All';

export function PortfolioCatalog() {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);
  const { content } = useCms();
  const projects = getPublishedProjects(content);

  const filters = useMemo(() => {
    const categories = new Set(projects.map((project) => project.category));
    return [ALL_FILTER, ...Array.from(categories)];
  }, [projects]);

  const visibleProjects = useMemo(() => {
    if (activeFilter === ALL_FILTER) {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => {
              if (filter === activeFilter) {
                return;
              }

              setActiveFilter(filter);
              trackAnalyticsEvent({
                eventType: 'portfolio_filter',
                path: '/portfolio',
                label: filter,
              });
            }}
            className={cn(
              'rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] transition-all',
              activeFilter === filter
                ? 'border-brand-ink bg-brand-ink text-white'
                : 'border-brand-ink/10 bg-white/70 text-brand-muted hover:border-brand-accent hover:text-brand-ink'
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </>
  );
}
