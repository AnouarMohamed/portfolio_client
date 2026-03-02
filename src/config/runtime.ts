function normalizeMode(value: string | undefined) {
  return String(value ?? 'static').trim().toLowerCase();
}

export const APP_MODE = normalizeMode(import.meta.env.VITE_APP_MODE);
export const IS_STATIC_CMS_MODE = APP_MODE !== 'fullstack';
export const ENABLE_CUSTOM_ANALYTICS = !IS_STATIC_CMS_MODE;
