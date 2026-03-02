import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectCard } from '../../components/ProjectCard';
import { useCms } from '../../cms/useCms';
import { getFeaturedProjects } from '../../cms/selectors';

export function FeaturedProjectsSection() {
  const { content } = useCms();
  const featuredProjects = getFeaturedProjects(content);

  return (
    <section id="featured-work" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent sm:text-xs sm:tracking-[0.35em]">
              {content.home.featuredIntro.eyebrow}
            </p>
            <h2 className="mb-5 text-3xl font-serif sm:text-4xl md:mb-6 md:text-6xl">
              {content.home.featuredIntro.title}
            </h2>
            <p className="text-base leading-relaxed text-brand-muted sm:text-lg">
              {content.home.featuredIntro.description}
            </p>
          </div>
          <Link
            to={content.home.featuredIntro.ctaHref ?? '/portfolio'}
            className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-ink sm:text-sm sm:tracking-[0.3em]"
            data-analytics-event="cta_click"
            data-analytics-label={content.home.featuredIntro.ctaLabel ?? 'View full portfolio'}
            data-analytics-path={content.home.featuredIntro.ctaHref ?? '/portfolio'}
          >
            {content.home.featuredIntro.ctaLabel} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
