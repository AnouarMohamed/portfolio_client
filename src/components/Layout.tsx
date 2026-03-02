import { useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useDeclarativeAnalyticsTracking } from '../analytics/useDeclarativeAnalyticsTracking';
import { usePageViewTracking } from '../analytics/usePageViewTracking';
import { isAdminRoutePath } from '../config/admin';
import { CustomCursor } from './CustomCursor';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isAdminRoute = isAdminRoutePath(location.pathname);

  usePageViewTracking(!isAdminRoute);
  useDeclarativeAnalyticsTracking(!isAdminRoute);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname]);

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-brand-cream">
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <CustomCursor />
      <div className="grain" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10 flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
