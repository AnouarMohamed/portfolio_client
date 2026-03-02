import type {
  AnalyticsSnapshot,
  AuthSession,
  CmsContent,
  CmsEnvelope,
} from './schema';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';
let adminCsrfToken: string | null = null;

function syncAuthSession(session: AuthSession) {
  adminCsrfToken = session.authenticated ? session.csrfToken ?? null : null;
  return session;
}

async function readJson<T>(response: Response) {
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      adminCsrfToken = null;
    }

    const payload = await response.json().catch(() => null);
    const message =
      payload && typeof payload === 'object' && 'error' in payload
        ? String(payload.error)
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function fetchPublicContent() {
  const response = await fetch(`${API_BASE}/api/content/public`, {
    credentials: 'include',
  });

  return readJson<CmsEnvelope>(response);
}

export async function fetchAdminContent() {
  const response = await fetch(`${API_BASE}/api/admin/content`, {
    credentials: 'include',
  });

  return readJson<CmsEnvelope>(response);
}

export async function fetchAdminAnalytics() {
  const response = await fetch(`${API_BASE}/api/admin/analytics`, {
    credentials: 'include',
  });

  return readJson<AnalyticsSnapshot>(response);
}

export async function saveAdminContent(content: CmsContent) {
  const response = await fetch(`${API_BASE}/api/admin/content`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(adminCsrfToken ? { 'X-CSRF-Token': adminCsrfToken } : {}),
    },
    body: JSON.stringify({ content }),
  });

  return readJson<CmsEnvelope>(response);
}

export async function fetchAuthSession() {
  const response = await fetch(`${API_BASE}/api/auth/session`, {
    credentials: 'include',
  });

  return syncAuthSession(await readJson<AuthSession>(response));
}

export async function loginAdmin(credentials: {
  username: string;
  password: string;
}) {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return syncAuthSession(await readJson<AuthSession>(response));
}

export async function logoutAdmin() {
  const response = await fetch(`${API_BASE}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: adminCsrfToken ? { 'X-CSRF-Token': adminCsrfToken } : undefined,
  });

  return syncAuthSession(await readJson<AuthSession>(response));
}
