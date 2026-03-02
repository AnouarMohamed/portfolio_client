import crypto from 'crypto';
import type { Request, Response } from 'express';

const SESSION_COOKIE_NAME = 'aura_admin_session';
const SESSION_AGE_MS = 1000 * 60 * 60 * 24 * 7;

function toBase64Url(input: string) {
  return Buffer.from(input, 'utf8').toString('base64url');
}

function fromBase64Url(input: string) {
  return Buffer.from(input, 'base64url').toString('utf8');
}

function signPayload(payload: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

function parseCookies(request: Request) {
  const rawCookieHeader = request.headers.cookie;

  if (!rawCookieHeader) {
    return {};
  }

  return rawCookieHeader.split(';').reduce<Record<string, string>>((cookies, pair) => {
    const [rawName, ...rawValueParts] = pair.trim().split('=');

    if (!rawName || rawValueParts.length === 0) {
      return cookies;
    }

    cookies[rawName] = decodeURIComponent(rawValueParts.join('='));
    return cookies;
  }, {});
}

export function createSessionToken(username: string, secret: string) {
  const payload = JSON.stringify({
    username,
    exp: Date.now() + SESSION_AGE_MS,
  });
  const encodedPayload = toBase64Url(payload);
  const signature = signPayload(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export function readSessionFromRequest(request: Request, secret: string) {
  const token = parseCookies(request)[SESSION_COOKIE_NAME];

  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split('.');

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload, secret);

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as {
      exp: number;
      username: string;
    };

    if (payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function setSessionCookie(response: Response, token: string) {
  response.cookie(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_AGE_MS,
    path: '/',
  });
}

export function clearSessionCookie(response: Response) {
  response.clearCookie(SESSION_COOKIE_NAME, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
}
