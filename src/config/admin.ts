function normalizeAdminPath(value: string | undefined) {
  const normalizedValue = `/${String(value ?? '/admin').trim()}`
    .replace(/\/+/g, '/')
    .replace(/\/$/, '');

  return normalizedValue === '' ? '/admin' : normalizedValue;
}

export const ADMIN_PATH = normalizeAdminPath(import.meta.env.VITE_ADMIN_PATH);

export function isAdminRoutePath(pathname: string) {
  return pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`);
}
