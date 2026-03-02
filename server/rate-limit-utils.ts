export function pruneExpiredTimestamps(timestamps: number[], cutoff: number) {
  let firstActiveIndex = 0;

  while (firstActiveIndex < timestamps.length && timestamps[firstActiveIndex] <= cutoff) {
    firstActiveIndex += 1;
  }

  if (firstActiveIndex > 0) {
    timestamps.splice(0, firstActiveIndex);
  }
}

export function getWindowRetryAfterMs(
  timestamps: number[],
  currentTime: number,
  windowMs: number,
) {
  const oldestActiveTimestamp = timestamps[0] ?? currentTime;
  return Math.max(0, windowMs - (currentTime - oldestActiveTimestamp));
}
