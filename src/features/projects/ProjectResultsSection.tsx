import type { Project } from '../../types';

interface ProjectResultsSectionProps {
  project: Project;
}

export function ProjectResultsSection({ project }: ProjectResultsSectionProps) {
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent sm:text-xs sm:tracking-[0.35em]">
            Details
          </p>
          <h2 className="text-3xl font-serif sm:text-4xl md:text-5xl">A few numbers and notes that capture the shape of this chapter.</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {project.results.map((result) => (
            <article key={result.label} className="rounded-[2rem] border border-brand-ink/8 bg-white/80 p-6 shadow-lg shadow-brand-ink/5 sm:p-8">
              <div className="mb-4 text-3xl font-serif text-brand-accent sm:text-4xl">{result.value}</div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-ink sm:text-sm sm:tracking-[0.3em]">{result.label}</div>
              <p className="leading-relaxed text-brand-muted">{result.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
