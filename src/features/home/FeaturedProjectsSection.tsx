import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectCard } from '../../components/ProjectCard';
import { useCms } from '../../cms/useCms';
import { getFeaturedProjects } from '../../cms/selectors';

export function FeaturedProjectsSection() {
  const { content } = useCms();
  const featuredProjects = getFeaturedProjects(content);

  return (
    <section id="featured-work" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">
              {content.home.featuredIntro.eyebrow}
            </p>
            <h2 className="mb-6 text-5xl font-serif md:text-6xl">
              {content.home.featuredIntro.title}
            </h2>
            <p className="text-lg leading-relaxed text-brand-muted">
              {content.home.featuredIntro.description}
            </p>
          </div>
          <Link
            to={content.home.featuredIntro.ctaHref ?? '/portfolio'}
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-brand-ink"
            data-analytics-event="cta_click"
            data-analytics-label={content.home.featuredIntro.ctaLabel ?? 'View full portfolio'}
            data-analytics-path={content.home.featuredIntro.ctaHref ?? '/portfolio'}
          >
            {content.home.featuredIntro.ctaLabel} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
