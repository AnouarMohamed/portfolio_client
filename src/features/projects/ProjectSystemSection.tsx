import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';

interface ProjectSystemSectionProps {
  project: Project;
}

export function ProjectSystemSection({ project }: ProjectSystemSectionProps) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">Details</p>
          <h2 className="mb-6 text-4xl font-serif md:text-5xl">The textures, tools, and small details around the experience.</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-brand-muted">
            {project.summary}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
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

        <aside className="rounded-[2rem] border border-brand-ink/8 bg-white/70 p-8 shadow-xl shadow-brand-ink/5 backdrop-blur-sm">
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
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-brand-ink transition-colors hover:text-brand-accent"
          >
            Say hello about this
            <ArrowRight size={16} />
          </Link>
        </aside>
      </div>
    </section>
  );
}
