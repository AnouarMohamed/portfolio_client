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
    <section className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-brand-ink p-6 text-white sm:p-10 md:p-16">
        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-soft-gold sm:text-xs sm:tracking-[0.35em]">Personal note</p>
        <blockquote className="mb-10 text-2xl font-serif leading-tight italic sm:text-3xl md:text-4xl">
          {project.testimonial.quote}
        </blockquote>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-base font-bold uppercase tracking-[0.18em] text-brand-soft-gold sm:text-lg sm:tracking-[0.25em]">{project.testimonial.author}</div>
            <div className="text-sm text-white/65">{project.testimonial.role}</div>
          </div>
          <Link
            to={`/contact?project=${encodeURIComponent(project.title)}&service=${encodeURIComponent(project.services[0] ?? 'Say hello')}`}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:text-brand-soft-gold sm:text-sm sm:tracking-[0.3em]"
          >
            Write to me
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
