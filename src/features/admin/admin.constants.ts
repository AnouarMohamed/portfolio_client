export type AdminTab = 'site' | 'home' | 'pages' | 'projects' | 'journal' | 'analytics';
export type AuthState = 'loading' | 'authenticated' | 'unauthenticated';

export const ADMIN_TABS: Array<{ id: AdminTab; label: string }> = [
  { id: 'site', label: 'Site' },
  { id: 'home', label: 'Home' },
  { id: 'pages', label: 'Pages' },
  { id: 'projects', label: 'Projects' },
  { id: 'journal', label: 'Journal' },
  { id: 'analytics', label: 'Analytics' },
];
