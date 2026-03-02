import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';

interface ProjectDetailHeroProps {
  project: Project;
}

export function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  return (
    <section className="px-6 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 text-sm uppercase tracking-[0.25em] text-brand-muted">
          <Link to="/portfolio" className="inline-flex items-center gap-2 transition-colors hover:text-brand-ink">
            <ArrowLeft size={16} />
            Back to Highlights
          </Link>
          <span>{project.category}</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-brand-accent">
              {project.client} / {project.year}
            </p>
            <h1 className="mb-8 max-w-4xl text-5xl font-serif leading-[0.95] md:text-7xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-2xl leading-relaxed text-brand-muted">
              {project.headline}
            </p>
          </div>

          <div className="rounded-[2rem] border border-brand-ink/8 bg-white/70 p-8 shadow-xl shadow-brand-ink/5 backdrop-blur-sm">
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
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-brand-ink transition-colors hover:text-brand-accent"
              >
                Ask me about this
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2.5rem] border border-brand-ink/8 shadow-2xl shadow-brand-ink/10">
          <img
            src={project.image}
            alt={project.title}
            className="aspect-[16/9] w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
}
