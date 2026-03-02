import type { Project } from '../../types';

interface ProjectResultsSectionProps {
  project: Project;
}

export function ProjectResultsSection({ project }: ProjectResultsSectionProps) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">
            Details
          </p>
          <h2 className="text-4xl font-serif md:text-5xl">A few numbers and notes that capture the shape of this chapter.</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {project.results.map((result) => (
            <article key={result.label} className="rounded-[2rem] border border-brand-ink/8 bg-white/80 p-8 shadow-lg shadow-brand-ink/5">
              <div className="mb-4 text-4xl font-serif text-brand-accent">{result.value}</div>
              <div className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-brand-ink">{result.label}</div>
              <p className="leading-relaxed text-brand-muted">{result.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
