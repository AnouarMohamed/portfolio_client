import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { IS_STATIC_CMS_MODE } from '../config/runtime';
import { fetchPublicContent } from './api';
import { CmsContext } from './context';
import { DEFAULT_CMS_CONTENT } from './defaultContent';
import type { CmsContent } from './schema';

interface CmsProviderProps {
  children: ReactNode;
}

export function CmsProvider({ children }: CmsProviderProps) {
  const [content, setContent] = useState(DEFAULT_CMS_CONTENT);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const refresh = async () => {
    try {
      const response = await fetchPublicContent();
      setContent(response.content);
      setUpdatedAt(response.updatedAt);
    } catch {
      setContent(DEFAULT_CMS_CONTENT);
      setUpdatedAt(null);
    } finally {
      setIsReady(true);
    }
  };

  const replaceContent = (nextContent: CmsContent, nextUpdatedAt: string | null = null) => {
    setContent(nextContent);
    setUpdatedAt(nextUpdatedAt);
  };

  useEffect(() => {
    if (IS_STATIC_CMS_MODE) {
      setIsReady(true);
      return;
    }

    void refresh();
  }, []);

  const value = useMemo(
    () => ({
      content,
      isReady,
      updatedAt,
      refresh,
      replaceContent,
    }),
    [content, isReady, updatedAt],
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}
