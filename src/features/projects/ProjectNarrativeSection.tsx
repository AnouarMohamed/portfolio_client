import type { Project } from '../../types';

interface ProjectNarrativeSectionProps {
  project: Project;
}

export function ProjectNarrativeSection({ project }: ProjectNarrativeSectionProps) {
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:gap-8 lg:grid-cols-3">
        <article className="rounded-[2rem] border border-brand-ink/8 bg-brand-paper/70 p-6 sm:p-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent sm:text-xs sm:tracking-[0.35em]">Context</p>
          <h2 className="mb-4 text-2xl font-serif sm:text-3xl">Why this chapter mattered</h2>
          <p className="leading-relaxed text-brand-muted">{project.challenge}</p>
        </article>
        <article className="rounded-[2rem] border border-brand-ink/8 bg-white/80 p-6 sm:p-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent sm:text-xs sm:tracking-[0.35em]">Practice</p>
          <h2 className="mb-4 text-2xl font-serif sm:text-3xl">How I moved through it</h2>
          <p className="leading-relaxed text-brand-muted">{project.approach}</p>
        </article>
        <article className="rounded-[2rem] border border-brand-ink/8 bg-brand-ink p-6 text-white sm:p-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-soft-gold sm:text-xs sm:tracking-[0.35em]">Takeaway</p>
          <h2 className="mb-4 text-2xl font-serif sm:text-3xl">What stayed with me</h2>
          <p className="leading-relaxed text-white/75">{project.outcome}</p>
        </article>
      </div>
    </section>
  );
}
