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
      className="group relative aspect-square overflow-hidden rounded-3xl bg-brand-paper shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-ink/10"
    >
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-brand-ink/85 via-brand-ink/45 to-transparent p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
        <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0 group-focus-within:translate-y-0">
          <h3 className="mb-2 text-2xl font-serif text-white">{project.title}</h3>
          <p className="mb-4 max-w-xs text-sm leading-relaxed text-white/80">
            {project.description}
          </p>
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/65">
            {project.client} / {project.year}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/30 px-2 py-1 text-[10px] font-medium uppercase tracking-widest text-white/80">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            View Case Study
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>

      <Link
        to={projectPath}
        aria-label={`View ${project.title} case study`}
        className="absolute inset-0 z-10 rounded-3xl"
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
