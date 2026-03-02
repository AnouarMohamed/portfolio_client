import type { Project } from '../../types';

interface ProjectNarrativeSectionProps {
  project: Project;
}

export function ProjectNarrativeSection({ project }: ProjectNarrativeSectionProps) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
        <article className="rounded-[2rem] border border-brand-ink/8 bg-brand-paper/70 p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">Context</p>
          <h2 className="mb-4 text-3xl font-serif">Why this chapter mattered</h2>
          <p className="leading-relaxed text-brand-muted">{project.challenge}</p>
        </article>
        <article className="rounded-[2rem] border border-brand-ink/8 bg-white/80 p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">Practice</p>
          <h2 className="mb-4 text-3xl font-serif">How I moved through it</h2>
          <p className="leading-relaxed text-brand-muted">{project.approach}</p>
        </article>
        <article className="rounded-[2rem] border border-brand-ink/8 bg-brand-ink p-8 text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-soft-gold">Takeaway</p>
          <h2 className="mb-4 text-3xl font-serif">What stayed with me</h2>
          <p className="leading-relaxed text-white/75">{project.outcome}</p>
        </article>
      </div>
    </section>
  );
}
