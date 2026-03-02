import { useCms } from '../../cms/useCms';
import { ICONS } from '../../cms/icons';

export function DifferentiatorsSection() {
  const {
    content: { home },
  } = useCms();

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent sm:text-xs sm:tracking-[0.35em]">
            {home.differentiatorsIntro.eyebrow}
          </p>
          <h2 className="text-3xl font-serif sm:text-4xl md:text-6xl">
            {home.differentiatorsIntro.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {home.differentiators.map((item) => {
            const Icon = ICONS[item.icon];

            return (
              <article key={item.id} className="rounded-[2rem] border border-brand-ink/8 bg-brand-paper/65 p-6 sm:p-8">
                <div className="mb-5 inline-flex rounded-2xl bg-white p-3.5 shadow-sm sm:mb-6 sm:p-4">
                  <Icon className="text-brand-accent" />
                </div>
                <h3 className="mb-4 text-xl font-serif sm:text-2xl">{item.title}</h3>
                <p className="leading-relaxed text-brand-muted">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
