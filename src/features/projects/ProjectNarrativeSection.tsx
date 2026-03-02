import type { Project } from '../../types';

interface ProjectNarrativeSectionProps {
  project: Project;
}

export function ProjectNarrativeSection({ project }: ProjectNarrativeSectionProps) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
        <article className="rounded-[2rem] border border-brand-ink/8 bg-brand-paper/70 p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">Challenge</p>
          <h2 className="mb-4 text-3xl font-serif">What was not working</h2>
          <p className="leading-relaxed text-brand-muted">{project.challenge}</p>
        </article>
        <article className="rounded-[2rem] border border-brand-ink/8 bg-white/80 p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">Approach</p>
          <h2 className="mb-4 text-3xl font-serif">How the system changed</h2>
          <p className="leading-relaxed text-brand-muted">{project.approach}</p>
        </article>
        <article className="rounded-[2rem] border border-brand-ink/8 bg-brand-ink p-8 text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-soft-gold">Outcome</p>
          <h2 className="mb-4 text-3xl font-serif">What shifted after launch</h2>
          <p className="leading-relaxed text-white/75">{project.outcome}</p>
        </article>
      </div>
    </section>
  );
}
