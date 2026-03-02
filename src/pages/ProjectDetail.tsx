import { Link, useParams } from 'react-router-dom';
import { useCms } from '../cms/useCms';
import { getProjectBySlug } from '../cms/selectors';
import { usePageMeta } from '../hooks/usePageMeta';
import { ProjectDetailHero } from '../features/projects/ProjectDetailHero';
import { ProjectNarrativeSection } from '../features/projects/ProjectNarrativeSection';
import { ProjectResultsSection } from '../features/projects/ProjectResultsSection';
import { ProjectSystemSection } from '../features/projects/ProjectSystemSection';
import { ProjectTestimonialSection } from '../features/projects/ProjectTestimonialSection';
import { RelatedProjectsSection } from '../features/projects/RelatedProjectsSection';

export default function ProjectDetail() {
  const { slug = '' } = useParams();
  const { content } = useCms();
  const project = getProjectBySlug(content, slug);

  usePageMeta({
    title: project ? `${project.title} | Aya Anouar` : 'Highlight Not Found | Aya Anouar',
    description: project?.description,
  });

  if (!project) {
    return (
      <div className="px-4 pb-24 pt-28 sm:px-6 sm:pb-40 sm:pt-32">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-brand-ink/8 bg-white/75 p-6 text-center shadow-xl shadow-brand-ink/5 sm:p-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent sm:text-xs sm:tracking-[0.35em]">Highlight not found</p>
          <h1 className="mb-6 text-3xl font-serif sm:text-4xl md:text-5xl">That highlight does not exist anymore.</h1>
          <p className="mb-8 text-base leading-relaxed text-brand-muted sm:text-lg">
            The page you tried to open may have moved or been removed. The rest of my highlights are still here.
          </p>
          <Link
            to="/portfolio"
            className="inline-flex rounded-full bg-brand-ink px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-brand-accent sm:text-sm sm:tracking-[0.3em]"
          >
            Back to highlights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProjectDetailHero project={project} />
      <ProjectResultsSection project={project} />
      <ProjectNarrativeSection project={project} />
      <ProjectSystemSection project={project} />
      <ProjectTestimonialSection project={project} />
      <RelatedProjectsSection project={project} />
    </>
  );
}
