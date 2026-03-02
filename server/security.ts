import type { NextFunction, Request, Response } from 'express';

const LOCAL_DEV_ORIGINS = new Set([
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:4000',
  'http://127.0.0.1:4000',
]);
const SAFE_FETCH_SITES = new Set(['same-origin', 'same-site', 'none']);

function getRequestOrigin(request: Request) {
  const protocol = String(
    request.headers['x-forwarded-proto'] ?? request.protocol ?? 'http',
  )
    .split(',')[0]
    .trim();
  const host = String(request.headers['x-forwarded-host'] ?? request.get('host') ?? '')
    .split(',')[0]
    .trim();

  return host ? `${protocol}://${host}` : null;
}

function getAllowedOrigins(request: Request, configuredOrigins: string[]) {
  const allowedOrigins = new Set(configuredOrigins);
  const requestOrigin = getRequestOrigin(request);

  if (requestOrigin) {
    allowedOrigins.add(requestOrigin);
  }

  if (process.env.NODE_ENV !== 'production') {
    for (const origin of LOCAL_DEV_ORIGINS) {
      allowedOrigins.add(origin);
    }
  }

  return allowedOrigins;
}

export function applySecurityHeaders(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  response.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  response.setHeader('Origin-Agent-Cluster', '?1');
  response.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  );
  response.setHeader(
    'Content-Security-Policy',
    "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self' mailto:",
  );

  const forwardedProto = String(request.headers['x-forwarded-proto'] ?? '');
  const isHttps =
    request.secure ||
    forwardedProto.split(',')[0].trim().toLowerCase() === 'https';

  if (process.env.NODE_ENV === 'production' && isHttps) {
    response.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload',
    );
  }

  next();
}

export function disableSensitiveCaching(
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  response.setHeader('Pragma', 'no-cache');
  response.setHeader('Expires', '0');
  next();
}

export function requireTrustedOrigin(configuredOrigins: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    const fetchSite = String(request.headers['sec-fetch-site'] ?? '').toLowerCase();

    if (fetchSite && !SAFE_FETCH_SITES.has(fetchSite)) {
      response.status(403).json({ error: 'Cross-site requests are not allowed.' });
      return;
    }

    const origin = String(request.headers.origin ?? '').trim();

    if (!origin) {
      next();
      return;
    }

    if (!getAllowedOrigins(request, configuredOrigins).has(origin)) {
      response.status(403).json({ error: 'Untrusted request origin.' });
      return;
    }

    next();
  };
}
