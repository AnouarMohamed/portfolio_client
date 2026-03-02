interface RateLimitState {
  attempts: number;
  blockedUntil: number;
  windowEndsAt: number;
}

interface LoginRateLimiterOptions {
  blockMs: number;
  maxAttempts: number;
  windowMs: number;
}

export function createLoginRateLimiter({
  blockMs,
  maxAttempts,
  windowMs,
}: LoginRateLimiterOptions) {
  const attempts = new Map<string, RateLimitState>();

  const pruneExpiredEntries = () => {
    const currentTime = Date.now();

    for (const [key, state] of attempts.entries()) {
      if (state.blockedUntil <= currentTime && state.windowEndsAt <= currentTime) {
        attempts.delete(key);
      }
    }
  };

  const readState = (key: string) => {
    pruneExpiredEntries();

    const currentTime = Date.now();
    const currentState = attempts.get(key);

    if (!currentState || currentState.windowEndsAt <= currentTime) {
      const nextState = {
        attempts: 0,
        blockedUntil: 0,
        windowEndsAt: currentTime + windowMs,
      };
      attempts.set(key, nextState);
      return nextState;
    }

    return currentState;
  };

  return {
    consumeFailure(key: string) {
      const state = readState(key);
      const currentTime = Date.now();

      state.attempts += 1;

      if (state.attempts >= maxAttempts) {
        state.blockedUntil = currentTime + blockMs;
      }

      attempts.set(key, state);

      return {
        blockedUntil: state.blockedUntil,
        retryAfterMs: Math.max(0, state.blockedUntil - currentTime),
      };
    },
    getStatus(key: string) {
      const state = readState(key);
      const currentTime = Date.now();
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
