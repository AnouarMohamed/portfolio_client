import { pruneExpiredTimestamps } from './rate-limit-utils';

interface RateLimitState {
  attemptTimestamps: number[];
  blockedUntil: number;
}

interface LoginRateLimiterOptions {
  blockMs: number;
  maxAttempts: number;
  windowMs: number;
}

const SWEEP_INTERVAL = 100;

export function createLoginRateLimiter({
  blockMs,
  maxAttempts,
  windowMs,
}: LoginRateLimiterOptions) {
  const attempts = new Map<string, RateLimitState>();
  let operationsSinceSweep = 0;

  const pruneState = (state: RateLimitState, currentTime: number) => {
    pruneExpiredTimestamps(state.attemptTimestamps, currentTime - windowMs);

    if (state.blockedUntil <= currentTime) {
      state.blockedUntil = 0;
    }
  };

  const sweep = (currentTime: number) => {
    operationsSinceSweep = 0;

    for (const [key, state] of attempts.entries()) {
      pruneState(state, currentTime);

      if (state.blockedUntil === 0 && state.attemptTimestamps.length === 0) {
        attempts.delete(key);
      }
    }
  };

  const readState = (key: string, currentTime: number) => {
    const currentState = attempts.get(key) ?? {
      attemptTimestamps: [],
      blockedUntil: 0,
    };
    pruneState(currentState, currentTime);
    attempts.set(key, currentState);
    return currentState;
  };

  return {
    consumeFailure(key: string) {
      const currentTime = Date.now();
      const state = readState(key, currentTime);

      state.attemptTimestamps.push(currentTime);

      if (state.attemptTimestamps.length >= maxAttempts) {
        state.blockedUntil = currentTime + blockMs;
      }

      attempts.set(key, state);
      operationsSinceSweep += 1;

      if (operationsSinceSweep >= SWEEP_INTERVAL) {
        sweep(currentTime);
      }

      return {
        blockedUntil: state.blockedUntil,
        retryAfterMs: Math.max(0, state.blockedUntil - currentTime),
      };
    },
    getStatus(key: string) {
      const currentTime = Date.now();
      const state = readState(key, currentTime);
      return {
        blocked: state.blockedUntil > currentTime,
        retryAfterMs: Math.max(0, state.blockedUntil - currentTime),
      };
    },
    reset(key: string) {
      attempts.delete(key);
    },
  };
}
