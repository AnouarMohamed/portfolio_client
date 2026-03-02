import { motion } from 'motion/react';
import { useCms } from '../../cms/useCms';
import { cn } from '../../utils';

export function TestimonialsSection() {
  const {
    content: { home },
  } = useCms();

  return (
    <section className="relative overflow-hidden bg-brand-ink px-6 py-28 text-white">
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-soft-gold">
            {home.testimonialsIntro.eyebrow}
          </p>
          <h2 className="text-5xl font-serif leading-[1.02] md:text-6xl">
            {home.testimonialsIntro.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-20">
          {home.testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'flex flex-col items-start gap-10 md:flex-row',
                index % 2 !== 0 && 'md:flex-row-reverse md:text-right'
              )}
            >
              <div className="rounded-full bg-white/5 p-6">
                <span className="font-serif text-4xl text-brand-soft-gold opacity-50">"</span>
              </div>

              <div className="flex-1">
                <p className="mb-8 text-3xl font-serif leading-tight italic md:text-4xl">
                  {testimonial.quote}
                </p>
                <div>
                  <div className="mb-2 text-lg font-bold uppercase tracking-[0.25em] text-brand-soft-gold">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-white/60">{testimonial.role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
