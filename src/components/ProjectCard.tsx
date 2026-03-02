import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackAnalyticsEvent } from '../analytics/client';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const projectPath = `/portfolio/${project.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-brand-paper shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-ink/10 sm:aspect-square sm:rounded-3xl"
    >
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-brand-ink/90 via-brand-ink/55 to-transparent p-5 opacity-100 transition-opacity duration-500 sm:p-8 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
        <div className="translate-y-0 transition-transform duration-500 sm:translate-y-4 sm:group-hover:translate-y-0 sm:group-focus-within:translate-y-0">
          <h3 className="mb-2 text-xl font-serif text-white sm:text-2xl">{project.title}</h3>
          <p className="mb-4 max-w-xs text-sm leading-relaxed text-white/80 line-clamp-3 sm:line-clamp-none">
            {project.description}
          </p>
          <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65 sm:text-[11px] sm:tracking-[0.3em]">
            {project.client} / {project.year}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/30 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white sm:mt-6 sm:text-xs sm:tracking-[0.3em]">
            View Highlight
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>

      <Link
        to={projectPath}
        aria-label={`View ${project.title} highlight`}
        className="absolute inset-0 z-10 rounded-[2rem] sm:rounded-3xl"
        onClick={() => {
          trackAnalyticsEvent({
            eventType: 'project_open',
            path: projectPath,
            label: project.title,
            metadata: {
              category: project.category,
              client: project.client,
            },
          });
        }}
      />
    </motion.article>
  );
}
