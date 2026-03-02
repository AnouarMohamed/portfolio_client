import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';

interface ProjectTestimonialSectionProps {
  project: Project;
}

export function ProjectTestimonialSection({ project }: ProjectTestimonialSectionProps) {
  if (!project.testimonial) {
    return null;
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-brand-ink p-10 text-white md:p-16">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-brand-soft-gold">Personal note</p>
        <blockquote className="mb-10 text-3xl font-serif leading-tight italic md:text-4xl">
          {project.testimonial.quote}
        </blockquote>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-lg font-bold uppercase tracking-[0.25em] text-brand-soft-gold">{project.testimonial.author}</div>
            <div className="text-sm text-white/65">{project.testimonial.role}</div>
          </div>
          <Link
            to={`/contact?project=${encodeURIComponent(project.title)}&service=${encodeURIComponent(project.services[0] ?? 'Say hello')}`}
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-white transition-colors hover:text-brand-soft-gold"
          >
            Write to me
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
