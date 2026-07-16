export type Env = {
  RESEND_API_KEY: string;
  CLINIC_NOTIFY_EMAIL: string;
  RESEND_FROM_EMAIL: string;
};

export function getEnv(rawEnv: Record<string, any>): { ok: true; env: Env } | { ok: false; missing: string[] } {
  const missing: string[] = [];
  const RESEND_API_KEY = rawEnv.RESEND_API_KEY;
  const CLINIC_NOTIFY_EMAIL = rawEnv.CLINIC_NOTIFY_EMAIL;
  if (!RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!CLINIC_NOTIFY_EMAIL) missing.push("CLINIC_NOTIFY_EMAIL");

  if (missing.length > 0) {
    return { ok: false, missing };
  }

  return {
    ok: true,
    env: {
      RESEND_API_KEY: RESEND_API_KEY!,
      CLINIC_NOTIFY_EMAIL: CLINIC_NOTIFY_EMAIL!,
      RESEND_FROM_EMAIL: rawEnv.RESEND_FROM_EMAIL || "Dr. T. Ramkumar Website <onboarding@resend.dev>",
    },
  };
}
