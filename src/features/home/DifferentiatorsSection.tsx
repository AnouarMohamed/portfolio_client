import { useCms } from '../../cms/useCms';
import { ICONS } from '../../cms/icons';

export function DifferentiatorsSection() {
  const {
    content: { home },
  } = useCms();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">
            {home.differentiatorsIntro.eyebrow}
          </p>
          <h2 className="text-5xl font-serif md:text-6xl">
            {home.differentiatorsIntro.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {home.differentiators.map((item) => {
            const Icon = ICONS[item.icon];

            return (
              <article key={item.id} className="rounded-[2rem] border border-brand-ink/8 bg-brand-paper/65 p-8">
                <div className="mb-6 inline-flex rounded-2xl bg-white p-4 shadow-sm">
                  <Icon className="text-brand-accent" />
                </div>
                <h3 className="mb-4 text-2xl font-serif">{item.title}</h3>
                <p className="leading-relaxed text-brand-muted">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
