import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCms } from '../cms/useCms';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useScrollThreshold } from '../hooks/useScrollThreshold';
import { cn } from '../utils';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isScrolled = useScrollThreshold();
  const {
    content: { site },
  } = useCms();

  useBodyScrollLock(isMobileMenuOpen);
  useEscapeKey(() => setIsMobileMenuOpen(false), isMobileMenuOpen);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const isActiveLink = (href: string) => (
    href === '/'
      ? location.pathname === href
      : location.pathname === href || location.pathname.startsWith(`${href}/`)
  );

  return (
    <nav
      className={cn(
        'fixed left-0 right-0 top-0 z-50 px-6 py-4 transition-all duration-500',
        isScrolled
          ? 'border-b border-brand-ink/5 bg-brand-cream/85 py-3 shadow-sm backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-serif font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          {site.siteName}
        </Link>

        <div className="hidden items-center space-x-8 md:flex">
          {site.navItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                'text-sm font-medium transition-colors',
                isActiveLink(item.href)
                  ? 'border-b border-brand-ink/20 pb-1 text-brand-ink'
                  : 'text-brand-muted hover:text-brand-ink'
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="rounded-full bg-brand-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-accent"
            data-analytics-event="cta_click"
            data-analytics-label="Navbar say hello"
            data-analytics-path="/contact"
          >
            Say hello
          </Link>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-brand-ink transition-colors hover:bg-white/70 md:hidden"
          onClick={() => setIsMobileMenuOpen((currentState) => !currentState)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-x-4 top-full mt-3 rounded-3xl border border-brand-paper bg-brand-cream/95 p-6 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {site.navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={cn(
                    'rounded-2xl px-4 py-3 text-lg font-serif transition-colors',
                    isActiveLink(item.href)
                      ? 'bg-brand-paper text-brand-accent'
                      : 'text-brand-ink hover:bg-white'
                  )}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-brand-ink/8 pt-4">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">
                  {site.availability}
                </div>
                <Link
                  to="/contact"
                  className="inline-flex rounded-full bg-brand-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-accent"
                  onClick={closeMobileMenu}
                  data-analytics-event="cta_click"
                  data-analytics-label="Mobile say hello"
                  data-analytics-path="/contact"
                >
                  Say hello
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
