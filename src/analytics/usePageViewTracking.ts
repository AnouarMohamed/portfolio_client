import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackAnalyticsEvent } from './client';

const PAGE_VIEW_STORAGE_KEY = 'aura_last_page_view';

export function usePageViewTracking(enabled = true) {
  const location = useLocation();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (typeof window !== 'undefined') {
      const previous = window.sessionStorage.getItem(PAGE_VIEW_STORAGE_KEY);

      if (previous) {
        try {
          const parsed = JSON.parse(previous) as { path: string; timestamp: number };

          if (
            parsed.path === location.pathname &&
            Date.now() - parsed.timestamp < 1000
          ) {
            return;
          }
        } catch {
          // Ignore malformed storage and continue tracking.
        }
      }

      window.sessionStorage.setItem(
        PAGE_VIEW_STORAGE_KEY,
        JSON.stringify({
          path: location.pathname,
          timestamp: Date.now(),
        }),
      );
    }

    trackAnalyticsEvent({
      eventType: 'page_view',
      path: location.pathname,
    });
  }, [enabled, location.pathname]);
}
