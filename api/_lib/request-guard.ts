/**
 * Rate limiting + duplicate-submission protection.
 *
 * Honest limitation: this is an in-memory store, scoped to a single warm
 * serverless instance. Vercel can run several instances concurrently and
 * recycles them on cold starts, so this is NOT a globally-consistent limit —
 * a burst of traffic hitting different instances could each get their own
 * quota. For a small clinic site's real traffic volume this is a reasonable,
 * zero-infrastructure approximation; if it ever needs to be exact (e.g.
 * under genuine abuse), swap the two Maps below for Vercel KV / Upstash
 * Redis — every call site here only needs check+record semantics, so the
 * swap is isolated to this file.
 */

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5;
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

const requestsByIp = new Map<string, number[]>();
const recentSubmissions = new Map<string, number>(); // key: `${mobile}|${date}` -> timestamp

function pruneOld(timestamps: number[], windowMs: number, now: number): number[] {
  return timestamps.filter((t) => now - t < windowMs);
}

/** Periodic sweep so the maps don't grow unbounded over a long-lived instance. */
function sweep(now: number) {
  for (const [ip, timestamps] of requestsByIp) {
    const kept = pruneOld(timestamps, RATE_LIMIT_WINDOW_MS, now);
    if (kept.length === 0) requestsByIp.delete(ip);
    else requestsByIp.set(ip, kept);
  }
  for (const [key, at] of recentSubmissions) {
    if (now - at > DUPLICATE_WINDOW_MS) recentSubmissions.delete(key);
  }
}

export function checkRateLimit(ip: string): { allowed: true } | { allowed: false; retryAfterMinutes: number } {
  const now = Date.now();
  sweep(now);

  const existing = pruneOld(requestsByIp.get(ip) ?? [], RATE_LIMIT_WINDOW_MS, now);
  if (existing.length >= RATE_LIMIT_MAX) {
    const oldest = Math.min(...existing);
    const retryAfterMinutes = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldest)) / 60000);
    return { allowed: false, retryAfterMinutes: Math.max(1, retryAfterMinutes) };
  }

  existing.push(now);
  requestsByIp.set(ip, existing);
  return { allowed: true };
}

export function checkDuplicate(mobile: string, date: string): { isDuplicate: boolean } {
  if (!date) return { isDuplicate: false }; // nothing meaningful to dedupe on without a date
  const now = Date.now();
  const key = `${mobile}|${date}`;
  const last = recentSubmissions.get(key);
  if (last && now - last < DUPLICATE_WINDOW_MS) {
    return { isDuplicate: true };
  }
  recentSubmissions.set(key, now);
  return { isDuplicate: false };
}
