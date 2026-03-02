import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';

interface ProjectSystemSectionProps {
  project: Project;
}

export function ProjectSystemSection({ project }: ProjectSystemSectionProps) {
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent sm:text-xs sm:tracking-[0.35em]">Details</p>
          <h2 className="mb-5 text-3xl font-serif sm:text-4xl md:mb-6 md:text-5xl">The textures, tools, and small details around the experience.</h2>
          <p className="max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
            {project.summary}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            {project.gallery.map((image, index) => (
              <div key={image} className="overflow-hidden rounded-[1.75rem] border border-brand-ink/8">
                <img
                  src={image}
                  alt={`${project.title} detail ${index + 1}`}
                  className="aspect-[4/5] w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-brand-ink/8 bg-white/70 p-6 shadow-xl shadow-brand-ink/5 backdrop-blur-sm sm:p-8">
          <div className="mb-8">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-muted">Themes</div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-brand-paper px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-ink">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-muted">Tools and references</div>
            <ul className="space-y-3">
              {project.stack.map((item) => (
                <li key={item} className="text-brand-muted">{item}</li>
              ))}
            </ul>
          </div>

          <Link
            to={`/contact?project=${encodeURIComponent(project.title)}&service=${encodeURIComponent(project.services[0] ?? 'Say hello')}`}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-ink transition-colors hover:text-brand-accent sm:text-sm sm:tracking-[0.3em]"
          >
            Say hello about this
            <ArrowRight size={16} />
          </Link>
        </aside>
      </div>
    </section>
  );
}
