import { Link } from 'react-router-dom';
import { useCms } from '../cms/useCms';
import { ICONS } from '../cms/icons';

export function Footer() {
  const year = new Date().getFullYear();
  const {
    content: { site },
  } = useCms();

  return (
    <footer className="relative z-10 border-t border-brand-ink/5 bg-brand-paper/80 px-6 py-16 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h2 className="mb-4 text-3xl font-serif">{site.siteName}</h2>
            <p className="max-w-md leading-relaxed text-brand-muted">
              {site.footerDescription}
            </p>
            <div className="mt-6 space-y-2 text-sm text-brand-muted">
              <div>{site.availability}</div>
              <div>{site.responseTime}</div>
              <div>{site.contactEmail}</div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              {site.navItems.map((item) => (
                <li key={item.id}>
                  <Link to={item.href} className="text-brand-muted transition-colors hover:text-brand-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <div className="flex space-x-4">
              {site.socialLinks.map((link) => {
                const Icon = ICONS[link.icon];
                const isExternal = link.href.startsWith('http');

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                    aria-label={link.label}
                    className="rounded-full bg-brand-cream p-2 text-brand-muted shadow-sm transition-all hover:-translate-y-0.5 hover:text-brand-ink hover:shadow-md"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
            <Link
              to="/contact"
              className="mt-6 inline-flex rounded-full bg-brand-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-accent"
              data-analytics-event="cta_click"
              data-analytics-label="Footer get in touch"
              data-analytics-path="/contact"
            >
              Get in touch
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-brand-ink/5 pt-8 text-sm text-brand-muted md:flex-row">
          <p>&copy; {year} {site.siteName}. All rights reserved.</p>
          <p className="mt-4 font-serif italic md:mt-0">{site.footerTagline}</p>
        </div>
      </div>
    </footer>
  );
}
