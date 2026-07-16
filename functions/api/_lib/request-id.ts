import { randomBytes } from "crypto";

/**
 * Internal trace ID for log correlation — REQ-20260714-AB12CD34. Distinct
 * from the reference-number.ts appointment reference: this one is never
 * shown to the patient, exists purely so a support engineer can grep one
 * request's full lifecycle out of Vercel's log stream.
 */
export function generateRequestId(when: Date = new Date()): string {
  const y = when.getFullYear();
  const m = String(when.getMonth() + 1).padStart(2, "0");
  const d = String(when.getDate()).padStart(2, "0");
  const suffix = randomBytes(4).toString("hex").toUpperCase();
  return `REQ-${y}${m}${d}-${suffix}`;
}
