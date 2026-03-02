interface RequestRateState {
  timestamps: number[];
}

interface RequestRateLimiterOptions {
  maxRequests: number;
  windowMs: number;
}

export function createRequestRateLimiter({
  maxRequests,
  windowMs,
}: RequestRateLimiterOptions) {
  const requests = new Map<string, RequestRateState>();

  const prune = () => {
    const currentTime = Date.now();

    for (const [key, state] of requests.entries()) {
      state.timestamps = state.timestamps.filter(
        (timestamp) => currentTime - timestamp < windowMs,
      );

      if (state.timestamps.length === 0) {
        requests.delete(key);
      }
    }
  };

  return {
    consume(key: string) {
      prune();

      const currentTime = Date.now();
      const state = requests.get(key) ?? { timestamps: [] };
      state.timestamps.push(currentTime);
      requests.set(key, state);

      const activeCount = state.timestamps.filter(
        (timestamp) => currentTime - timestamp < windowMs,
      ).length;
      const oldestActiveTimestamp = state.timestamps[0] ?? currentTime;

      return {
        allowed: activeCount <= maxRequests,
        retryAfterMs: Math.max(0, windowMs - (currentTime - oldestActiveTimestamp)),
      };
    },
  };
}
