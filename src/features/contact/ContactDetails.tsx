import { trackAnalyticsEvent } from '../../analytics/client';
import { useCms } from '../../cms/useCms';
import { ICONS } from '../../cms/icons';

interface ContactDetailsProps {
  selectedProject: string;
  selectedService: string;
}

export function ContactDetails({ selectedProject, selectedService }: ContactDetailsProps) {
  const {
    content: { pages, site },
  } = useCms();

  return (
    <div>
      <div className="mb-6 inline-flex rounded-full border border-brand-accent/20 bg-brand-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">
        {pages.contact.badge}
      </div>
      <h1 className="mb-10 text-6xl font-serif leading-[0.95] md:text-8xl">
        {pages.contact.titleLeading}
        {' '}
        <span className="italic text-brand-accent">{pages.contact.titleHighlight}</span>
        {pages.contact.titleTrailing ? ` ${pages.contact.titleTrailing}` : ''}
      </h1>
      <p className="mb-12 max-w-md text-xl leading-relaxed text-brand-muted">
        {pages.contact.description}
      </p>

      {(selectedProject || selectedService) && (
        <div className="mb-8 flex flex-wrap gap-3">
          {selectedProject && (
            <div className="inline-flex rounded-full border border-brand-accent/20 bg-brand-paper px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent">
              Project: {selectedProject}
            </div>
          )}
          {selectedService && (
            <div className="inline-flex rounded-full border border-brand-ink/10 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-ink">
              Service: {selectedService}
            </div>
          )}
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <article className="rounded-[1.75rem] border border-brand-ink/8 bg-white/80 p-6 shadow-lg shadow-brand-ink/5">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">Availability</div>
          <div className="text-lg text-brand-ink">{site.availability}</div>
        </article>
        <article className="rounded-[1.75rem] border border-brand-ink/8 bg-white/80 p-6 shadow-lg shadow-brand-ink/5">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">Response time</div>
          <div className="text-lg text-brand-ink">{site.responseTime}</div>
        </article>
      </div>

      <div className="space-y-8">
        {site.contactMethods.map((method) => {
          const Icon = ICONS[method.icon];

          return (
            <a
              key={method.id}
              href={method.href}
              target={method.external ? '_blank' : undefined}
              rel={method.external ? 'noreferrer' : undefined}
              className="group flex items-center gap-6"
              onClick={() => {
                trackAnalyticsEvent({
                  eventType: 'contact_method_click',
                  path: '/contact',
                  label: method.label,
                  metadata: {
                    external: Boolean(method.external),
                    href: method.href,
                  },
                });
              }}
            >
              <div className="rounded-2xl bg-brand-paper p-4 transition-colors group-hover:bg-brand-accent/10">
                <Icon className="text-brand-ink" size={24} />
              </div>
              <div>
                <div className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-muted">{method.label}</div>
                <div className="text-xl font-serif">{method.value}</div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
