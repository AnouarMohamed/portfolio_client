import { createContext } from 'react';
import type { CmsContent } from './schema';

export interface CmsContextValue {
  content: CmsContent;
  isReady: boolean;
  updatedAt: string | null;
  refresh: () => Promise<void>;
  replaceContent: (nextContent: CmsContent, updatedAt?: string | null) => void;
}

export const CmsContext = createContext<CmsContextValue | null>(null);
