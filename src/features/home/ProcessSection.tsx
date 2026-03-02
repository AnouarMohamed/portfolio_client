import { motion } from 'motion/react';
import { useCms } from '../../cms/useCms';
import { ICONS } from '../../cms/icons';

export function ProcessSection() {
  const {
    content: { home },
  } = useCms();

  return (
    <section className="relative overflow-hidden bg-brand-paper/45 px-6 py-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">
            {home.processIntro.eyebrow}
          </p>
          <h2 className="mb-6 text-5xl font-serif md:text-6xl">
            {home.processIntro.title}
          </h2>
          <p className="text-lg text-brand-muted">
            {home.processIntro.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {home.process.map((step, index) => {
            const Icon = ICONS[step.icon];

            return (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group rounded-[2rem] border border-brand-ink/8 bg-white/85 p-8 shadow-lg shadow-brand-ink/5"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-brand-paper p-4 transition-all group-hover:-translate-y-1">
                  <Icon className="text-brand-soft-gold" />
                </div>
                <h3 className="mb-4 text-2xl font-serif">{step.title}</h3>
                <p className="leading-relaxed text-brand-muted">{step.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
