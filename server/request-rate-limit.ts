import { getWindowRetryAfterMs, pruneExpiredTimestamps } from './rate-limit-utils';

interface RequestRateLimiterOptions {
  maxRequests: number;
  windowMs: number;
}

interface RequestRateState {
  timestamps: number[];
}

const SWEEP_INTERVAL = 250;

export function createRequestRateLimiter({
  maxRequests,
  windowMs,
}: RequestRateLimiterOptions) {
  const requests = new Map<string, RequestRateState>();
  let operationsSinceSweep = 0;

  const pruneState = (state: RequestRateState, currentTime: number) => {
    pruneExpiredTimestamps(state.timestamps, currentTime - windowMs);
  };

  const sweep = (currentTime: number) => {
    operationsSinceSweep = 0;

    for (const [key, state] of requests.entries()) {
      pruneState(state, currentTime);

      if (state.timestamps.length === 0) {
        requests.delete(key);
      }
    }
  };

  return {
    consume(key: string) {
      const currentTime = Date.now();
      const state = requests.get(key) ?? { timestamps: [] };
      pruneState(state, currentTime);
      state.timestamps.push(currentTime);
      requests.set(key, state);
      operationsSinceSweep += 1;

      if (operationsSinceSweep >= SWEEP_INTERVAL) {
        sweep(currentTime);
      }

      const activeCount = state.timestamps.length;

      return {
        allowed: activeCount <= maxRequests,
        retryAfterMs: getWindowRetryAfterMs(state.timestamps, currentTime, windowMs),
      };
    },
  };
}
