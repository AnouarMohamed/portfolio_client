import { useCms } from '../../cms/useCms';

export function ServicesSection() {
  const {
    content: { home },
  } = useCms();

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent sm:text-xs sm:tracking-[0.35em]">
            {home.servicesIntro.eyebrow}
          </p>
          <h2 className="mb-6 text-3xl font-serif sm:text-4xl md:text-6xl">
            {home.servicesIntro.title}
          </h2>
          <p className="text-base leading-relaxed text-brand-muted sm:text-lg">
            {home.servicesIntro.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {home.services.map((service) => (
            <article key={service.id} className="rounded-[2rem] border border-brand-ink/8 bg-white/75 p-6 shadow-lg shadow-brand-ink/5 sm:p-8">
              <h3 className="mb-4 text-2xl font-serif sm:text-3xl">{service.title}</h3>
              <p className="mb-6 leading-relaxed text-brand-muted">{service.description}</p>
              <ul className="space-y-3">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-ink/75 sm:text-sm sm:tracking-[0.2em]">
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
