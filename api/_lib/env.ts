/**
 * Environment validation, checked once per cold start (module load) and
 * cheaply re-checked per request. Serverless functions have no long-running
 * "startup" phase to hook into — module-load time is the closest equivalent,
 * since it runs exactly once before the first request a given instance
 * serves. Failing fast here means a misconfigured deployment surfaces as a
 * clear, logged, friendly 500 on every request instead of a confusing crash
 * deep inside the email-sending code path.
 */

export type Env = {
  RESEND_API_KEY: string;
  CLINIC_NOTIFY_EMAIL: string;
  RESEND_FROM_EMAIL: string;
};

let cached: { ok: true; env: Env } | { ok: false; missing: string[] } | null = null;

export function getEnv(): { ok: true; env: Env } | { ok: false; missing: string[] } {
  if (cached) return cached;

  const missing: string[] = [];
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CLINIC_NOTIFY_EMAIL = process.env.CLINIC_NOTIFY_EMAIL;
  if (!RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!CLINIC_NOTIFY_EMAIL) missing.push("CLINIC_NOTIFY_EMAIL");

  if (missing.length > 0) {
    cached = { ok: false, missing };
    return cached;
  }

  cached = {
    ok: true,
    env: {
      RESEND_API_KEY: RESEND_API_KEY!,
      CLINIC_NOTIFY_EMAIL: CLINIC_NOTIFY_EMAIL!,
      RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || "Dr. T. Ramkumar Website <onboarding@resend.dev>",
    },
  };
  return cached;
}
