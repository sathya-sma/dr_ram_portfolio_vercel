/**
 * Generates references like CSC-20260714-000123.
 *
 * Honest limitation: this is a serverless function with no database, so the
 * 6-digit suffix is NOT a true per-day incrementing sequence (that needs a
 * shared counter — Vercel KV/Postgres/etc.) — it's derived from the time of
 * day plus a random component, which is unique enough in practice for a
 * clinic's appointment volume without provisioning a database just for this.
 * If exact sequential numbering ever matters (e.g. for reconciliation
 * against a practice-management system), swap this for a real DB counter —
 * every call site already treats the reference as an opaque string.
 */
export function generateReferenceNumber(prefix = "CSC", when: Date = new Date()): string {
  const y = when.getFullYear();
  const m = String(when.getMonth() + 1).padStart(2, "0");
  const d = String(when.getDate()).padStart(2, "0");

  const secondsSinceMidnight =
    when.getHours() * 3600 + when.getMinutes() * 60 + when.getSeconds();
  const randomNoise = Math.floor(Math.random() * 100);
  const suffix = String((secondsSinceMidnight * 100 + randomNoise) % 1_000_000).padStart(6, "0");

  return `${prefix}-${y}${m}${d}-${suffix}`;
}
