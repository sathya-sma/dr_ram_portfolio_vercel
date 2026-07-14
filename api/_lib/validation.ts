/**
 * Server-side validation — the actual security gate. The frontend's copy of
 * these rules (src/components/Contact.tsx) is UX only; a request that
 * skips the browser entirely still has to pass these checks.
 */

// Allows periods too, not just letters/spaces/apostrophes/hyphens — Indian
// names routinely carry a title or initial ("Dr. Raj Kumar", "T. Ramkumar"),
// and rejecting them would be a false negative on real input.
const NAME_RE = /^[A-Za-z][A-Za-z\s'.-]{1,78}[A-Za-z.]$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^(?:\+?91)?[6-9]\d{9}$/;
const MESSAGE_MAX = 500;

export type RawBody = {
  name?: unknown;
  email?: unknown;
  mobile?: unknown;
  date?: unknown;
  message?: unknown;
  botcheck?: unknown;
};

export type AppointmentInput = {
  name: string;
  email: string;
  /** As typed by the patient, e.g. "+91 98765 43210" — kept for display/reply. */
  mobile: string;
  /** Digits-only, validated form — used as the dedup key. */
  mobileDigits: string;
  date: string;
  message: string;
};

export type ValidationResult = { ok: true; data: AppointmentInput } | { ok: false; error: string };

export function isHoneypotTripped(body: RawBody): boolean {
  return !!String(body.botcheck ?? "").trim();
}

export function validateAppointment(body: RawBody): ValidationResult {
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const mobile = String(body.mobile ?? "").trim();
  const mobileDigits = mobile.replace(/[\s-]/g, "");
  const date = String(body.date ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length < 3 || name.length > 80 || !NAME_RE.test(name)) {
    return { ok: false, error: "Please enter a valid full name (3–80 letters)." };
  }
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!mobileDigits || !MOBILE_RE.test(mobileDigits)) {
    return { ok: false, error: "Please enter a valid 10-digit Indian mobile number." };
  }
  if (date) {
    const picked = new Date(`${date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(picked.getTime()) || picked < today) {
      return { ok: false, error: "Preferred date cannot be in the past." };
    }
  }
  if (message.length > MESSAGE_MAX) {
    return { ok: false, error: `Message must be ${MESSAGE_MAX} characters or fewer.` };
  }

  return { ok: true, data: { name, email, mobile, mobileDigits, date, message } };
}
