import { useCms } from '../../cms/useCms';

export function ServicesSection() {
  const {
    content: { home },
  } = useCms();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">
            {home.servicesIntro.eyebrow}
          </p>
          <h2 className="mb-6 text-5xl font-serif md:text-6xl">
            {home.servicesIntro.title}
          </h2>
          <p className="text-lg leading-relaxed text-brand-muted">
            {home.servicesIntro.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {home.services.map((service) => (
            <article key={service.id} className="rounded-[2rem] border border-brand-ink/8 bg-white/75 p-8 shadow-lg shadow-brand-ink/5">
              <h3 className="mb-4 text-3xl font-serif">{service.title}</h3>
              <p className="mb-6 leading-relaxed text-brand-muted">{service.description}</p>
              <ul className="space-y-3">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-ink/75">
                    {deliverable}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
