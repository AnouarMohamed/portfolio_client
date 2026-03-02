import type { NextFunction, Request, Response } from 'express';

const LOCAL_DEV_ORIGINS = new Set([
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:4000',
  'http://127.0.0.1:4000',
]);
const SAFE_FETCH_SITES = new Set(['same-origin', 'same-site', 'none']);
const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Origin-Agent-Cluster': '?1',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  'Content-Security-Policy':
    "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self' mailto:",
} as const;

type IpMatcher = (ip: string) => boolean;

function readForwardedHeader(value: string | string[] | undefined) {
  return String(value ?? '')
    .split(',')[0]
    .trim();
}

function reject(response: Response, statusCode: number, error: string) {
  response.status(statusCode).json({ error });
}

function normalizeIp(value: string) {
  const normalizedValue = value.trim();

  if (normalizedValue === '::1') {
    return '127.0.0.1';
  }

  if (normalizedValue.startsWith('::ffff:')) {
    return normalizedValue.slice(7);
  }

  return normalizedValue.split('%')[0];
}

function isIpv4(value: string) {
  const segments = value.split('.');

  return (
    segments.length === 4 &&
    segments.every((segment) => {
      if (!/^\d+$/.test(segment)) {
        return false;
      }

      const numericSegment = Number(segment);
      return numericSegment >= 0 && numericSegment <= 255;
    })
  );
}

function ipv4ToNumber(value: string) {
  return value
    .split('.')
    .reduce((result, segment) => (result << 8) + Number(segment), 0) >>> 0;
}

function parseIpv4Number(value: string) {
  const normalizedValue = normalizeIp(value);
  return isIpv4(normalizedValue) ? ipv4ToNumber(normalizedValue) : null;
}

function createIpMatcher(rule: string): IpMatcher | null {
  const normalizedRule = normalizeIp(rule);

  if (!normalizedRule) {
    return null;
  }

  if (normalizedRule.includes('/')) {
    const [baseIp, prefixLengthValue] = normalizedRule.split('/');
    const prefixLength = Number.parseInt(prefixLengthValue ?? '', 10);
    const baseIpNumber = parseIpv4Number(baseIp);

    if (baseIpNumber === null || prefixLength < 0 || prefixLength > 32) {
      return null;
    }

    const mask = prefixLength === 0 ? 0 : (0xffffffff << (32 - prefixLength)) >>> 0;

    return (ip) => {
      const ipNumber = parseIpv4Number(ip);
      return ipNumber !== null && (mask === 0 || (ipNumber & mask) === (baseIpNumber & mask));
    };
  }

  return (ip) => normalizeIp(ip) === normalizedRule;
}

function getRequestOrigin(request: Request) {
  const protocol = readForwardedHeader(
    String(request.headers['x-forwarded-proto'] ?? request.protocol ?? 'http'),
  );
  const host = readForwardedHeader(
    String(request.headers['x-forwarded-host'] ?? request.get('host') ?? ''),
  );

  return host ? `${protocol}://${host}` : null;
}

export function applySecurityHeaders(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
    response.setHeader(header, value);
  }

  const isHttps = request.secure || readForwardedHeader(
    request.headers['x-forwarded-proto'] as string | string[] | undefined,
  ).toLowerCase() === 'https';

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
  const allowedOrigins = new Set(configuredOrigins);

  if (process.env.NODE_ENV !== 'production') {
    for (const origin of LOCAL_DEV_ORIGINS) {
      allowedOrigins.add(origin);
    }
  }

  return (request: Request, response: Response, next: NextFunction) => {
    const fetchSite = String(request.headers['sec-fetch-site'] ?? '').toLowerCase();

    if (fetchSite && !SAFE_FETCH_SITES.has(fetchSite)) {
      reject(response, 403, 'Cross-site requests are not allowed.');
      return;
    }

    const origin = String(request.headers.origin ?? '').trim();

    if (!origin) {
      next();
      return;
    }

    const requestOrigin = getRequestOrigin(request);

    if (!allowedOrigins.has(origin) && origin !== requestOrigin) {
      reject(response, 403, 'Untrusted request origin.');
      return;
    }

    next();
  };
}

export function requireAllowedAdminIp(configuredIps: string[]) {
  const allowedMatchers = configuredIps
    .map(createIpMatcher)
    .filter((matcher): matcher is IpMatcher => matcher !== null);

  if (allowedMatchers.length === 0) {
    return (_request: Request, _response: Response, next: NextFunction) => next();
  }

  return (request: Request, response: Response, next: NextFunction) => {
    const requestIp = normalizeIp(request.ip || request.socket.remoteAddress || '');

    if (allowedMatchers.some((matches) => matches(requestIp))) {
      next();
      return;
    }

    reject(response, 403, 'Admin access is not allowed from this IP address.');
  };
}
