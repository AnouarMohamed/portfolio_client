import { motion } from 'motion/react';
import { useCms } from '../../cms/useCms';
import { cn } from '../../utils';

export function TestimonialsSection() {
  const {
    content: { home },
  } = useCms();

  return (
    <section className="relative overflow-hidden bg-brand-ink px-4 py-20 text-white sm:px-6 sm:py-28">
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-soft-gold sm:text-xs sm:tracking-[0.35em]">
            {home.testimonialsIntro.eyebrow}
          </p>
          <h2 className="text-3xl font-serif leading-[1.06] sm:text-4xl md:text-6xl">
            {home.testimonialsIntro.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:gap-16 md:gap-20">
          {home.testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'flex flex-col items-start gap-5 sm:gap-8 md:flex-row md:gap-10',
                index % 2 !== 0 && 'md:flex-row-reverse md:text-right'
              )}
            >
              <div className="rounded-full bg-white/5 p-3.5 sm:p-6">
                <span className="font-serif text-3xl text-brand-soft-gold opacity-50 sm:text-4xl">"</span>
              </div>

              <div className="flex-1">
                <p className="mb-5 text-xl font-serif leading-tight italic sm:mb-6 sm:text-3xl md:mb-8 md:text-4xl">
                  {testimonial.quote}
                </p>
                <div>
                  <div className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-soft-gold sm:text-lg sm:tracking-[0.25em]">
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
