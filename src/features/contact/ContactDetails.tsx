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
      <div className="mb-5 inline-flex rounded-full border border-brand-accent/20 bg-brand-paper px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-accent sm:mb-6 sm:px-4 sm:text-xs sm:tracking-[0.35em]">
        {pages.contact.badge}
      </div>
      <h1 className="mb-8 text-4xl font-serif leading-[0.95] sm:text-5xl md:mb-10 md:text-8xl">
        {pages.contact.titleLeading}
        {' '}
        <span className="italic text-brand-accent">{pages.contact.titleHighlight}</span>
        {pages.contact.titleTrailing ? ` ${pages.contact.titleTrailing}` : ''}
      </h1>
      <p className="mb-10 max-w-md text-base leading-relaxed text-brand-muted sm:text-lg md:mb-12 md:text-xl">
        {pages.contact.description}
      </p>

      {(selectedProject || selectedService) && (
        <div className="mb-8 flex flex-wrap gap-3">
          {selectedProject && (
            <div className="inline-flex max-w-full rounded-full border border-brand-accent/20 bg-brand-paper px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-accent sm:px-5 sm:text-xs sm:tracking-[0.3em]">
              Highlight: {selectedProject}
            </div>
          )}
          {selectedService && (
            <div className="inline-flex max-w-full rounded-full border border-brand-ink/10 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-ink sm:px-5 sm:text-xs sm:tracking-[0.3em]">
              Reason: {selectedService}
            </div>
          )}
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <article className="rounded-[1.75rem] border border-brand-ink/8 bg-white/80 p-5 shadow-lg shadow-brand-ink/5 sm:p-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">Availability</div>
          <div className="text-base text-brand-ink sm:text-lg">{site.availability}</div>
        </article>
        <article className="rounded-[1.75rem] border border-brand-ink/8 bg-white/80 p-5 shadow-lg shadow-brand-ink/5 sm:p-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">Response time</div>
          <div className="text-base text-brand-ink sm:text-lg">{site.responseTime}</div>
        </article>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {site.contactMethods.map((method) => {
          const Icon = ICONS[method.icon];

          return (
            <a
              key={method.id}
              href={method.href}
              target={method.external ? '_blank' : undefined}
              rel={method.external ? 'noreferrer' : undefined}
              className="group flex items-start gap-4 sm:items-center sm:gap-6"
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
              <div className="rounded-2xl bg-brand-paper p-3 transition-colors group-hover:bg-brand-accent/10 sm:p-4">
                <Icon className="text-brand-ink" size={22} />
              </div>
              <div className="min-w-0">
                <div className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-muted">{method.label}</div>
                <div className="text-base font-serif leading-snug break-words sm:text-xl">{method.value}</div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
