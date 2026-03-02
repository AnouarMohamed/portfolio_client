import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';

interface ProjectDetailHeroProps {
  project: Project;
}

export function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  return (
    <section className="px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-brand-muted sm:mb-10 sm:text-sm sm:tracking-[0.25em]">
          <Link to="/portfolio" className="inline-flex items-center gap-2 transition-colors hover:text-brand-ink">
            <ArrowLeft size={16} />
            Back to Highlights
          </Link>
          <span>{project.category}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent sm:mb-6 sm:text-sm sm:tracking-[0.35em]">
              {project.client} / {project.year}
            </p>
            <h1 className="mb-6 max-w-4xl text-4xl font-serif leading-[0.95] sm:text-5xl md:mb-8 md:text-7xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-brand-muted sm:text-xl md:text-2xl">
              {project.headline}
            </p>
          </div>

          <div className="rounded-[2rem] border border-brand-ink/8 bg-white/70 p-6 shadow-xl shadow-brand-ink/5 backdrop-blur-sm sm:p-8">
            <div className="space-y-6">
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">Role</div>
                <div className="text-lg text-brand-ink">{project.role}</div>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">Length</div>
                <div className="text-lg text-brand-ink">{project.duration}</div>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">Focus areas</div>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span key={service} className="rounded-full bg-brand-paper px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-ink">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={`/contact?project=${encodeURIComponent(project.title)}&service=${encodeURIComponent(project.services[0] ?? 'Say hello')}`}
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-ink transition-colors hover:text-brand-accent sm:text-sm sm:tracking-[0.3em]"
              >
                Ask me about this
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-brand-ink/8 shadow-2xl shadow-brand-ink/10 sm:mt-12 sm:rounded-[2.5rem]">
          <img
            src={project.image}
            alt={project.title}
            className="aspect-[5/4] w-full object-cover sm:aspect-[16/9]"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
}
