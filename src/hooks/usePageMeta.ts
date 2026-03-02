import { useEffect } from 'react';
import { useCms } from '../cms/useCms';

interface PageMeta {
  title: string;
  description?: string;
}

function updateMeta(selector: string, attribute: string, value: string) {
  const tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    return;
  }

  tag.setAttribute(attribute, value);
}

export function usePageMeta({ title, description }: PageMeta) {
  const {
    content: { site },
  } = useCms();

  useEffect(() => {
    const pageDescription = description ?? site.siteDescription;
    const fullTitle = `${title} | ${site.siteName}`;

    document.title = fullTitle;

    updateMeta('meta[name="description"]', 'content', pageDescription);
    updateMeta('meta[property="og:title"]', 'content', fullTitle);
    updateMeta('meta[property="og:description"]', 'content', pageDescription);
    updateMeta('meta[name="twitter:title"]', 'content', fullTitle);
    updateMeta('meta[name="twitter:description"]', 'content', pageDescription);
  }, [description, site.siteDescription, site.siteName, title]);
}
