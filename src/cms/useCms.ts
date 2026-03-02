import { useContext } from 'react';
import { CmsContext } from './context';

export function useCms() {
  const context = useContext(CmsContext);

  if (!context) {
    throw new Error('useCms must be used inside CmsProvider');
  }

  return context;
}
