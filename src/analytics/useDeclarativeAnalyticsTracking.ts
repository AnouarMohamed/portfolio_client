import { useEffect } from 'react';
import { trackAnalyticsEvent } from './client';

export function useDeclarativeAnalyticsTracking(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const trackedElement = target.closest<HTMLElement>('[data-analytics-event]');

      if (!trackedElement) {
        return;
      }

      const eventType = trackedElement.dataset.analyticsEvent;

      if (!eventType) {
        return;
      }

      trackAnalyticsEvent({
        eventType: eventType as Parameters<typeof trackAnalyticsEvent>[0]['eventType'],
        label: trackedElement.dataset.analyticsLabel ?? null,
        path: trackedElement.dataset.analyticsPath ?? window.location.pathname,
      });
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [enabled]);
}
