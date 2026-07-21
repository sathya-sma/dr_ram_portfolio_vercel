import { Resend } from "resend";
import type { Env } from "./env.js";
import {
  doctorNotificationHtml,
  doctorNotificationText,
  patientConfirmationHtml,
  patientConfirmationText,
} from "./email-templates.js";
import type { AppointmentInput } from "./validation.js";

type Meta = { referenceNumber: string; submittedAtDisplay: string; preferredDateDisplay: string };
type AdminContext = { ip?: string; userAgent?: string };

export type SendResult = { ok: true } | { ok: false; error: unknown };

function isDevOrInvalidKey(error: any): boolean {
  const isDev = typeof process !== "undefined" && process.env?.NODE_ENV !== "production";
  const statusCode = error?.statusCode || error?.status;
  const isApiKeyError = statusCode === 401 || String(error?.message || "").includes("API key");
  return isDev && isApiKeyError;
}

export async function sendAppointmentEmails(
  env: Env,
  data: AppointmentInput,
  meta: Meta,
  admin: AdminContext
): Promise<{ doctor: SendResult; patient: SendResult }> {
  const resend = new Resend(env.RESEND_API_KEY);

  const doctorSend = resend.emails
    .send({
      from: env.RESEND_FROM_EMAIL,
      to: env.CLINIC_NOTIFY_EMAIL,
      replyTo: data.email,
      subject: `🔔 New Appointment Request – Dr. T. Ramkumar Website (${meta.referenceNumber})`,
      html: doctorNotificationHtml(data, meta, admin),
      text: doctorNotificationText(data, meta),
    })
    .then((r): SendResult => {
      if (r.error) {
        if (isDevOrInvalidKey(r.error)) {
          console.warn("[Dev Mode] Resend API key is invalid/expired. Simulating successful email send for local testing.");
          return { ok: true };
        }
        return { ok: false, error: r.error };
      }
      return { ok: true };
    })
    .catch((error): SendResult => {
      if (isDevOrInvalidKey(error)) {
        console.warn("[Dev Mode] Resend API key is invalid/expired. Simulating successful email send for local testing.");
        return { ok: true };
      }
      return { ok: false, error };
    });

  const patientSend = resend.emails
    .send({
      from: env.RESEND_FROM_EMAIL,
      to: data.email,
      subject: "Appointment Request Received",
      html: patientConfirmationHtml(data, meta),
      text: patientConfirmationText(data, meta),
    })
    .then((r): SendResult => {
      if (r.error) {
        if (isDevOrInvalidKey(r.error)) {
          return { ok: true };
        }
        return { ok: false, error: r.error };
      }
      return { ok: true };
    })
    .catch((error): SendResult => {
      if (isDevOrInvalidKey(error)) {
        return { ok: true };
      }
      return { ok: false, error };
    });

  const [doctor, patient] = await Promise.all([doctorSend, patientSend]);
  return { doctor, patient };
}
