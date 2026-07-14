import { Resend } from "resend";
import type { Env } from "./env";
import {
  doctorNotificationHtml,
  doctorNotificationText,
  patientConfirmationHtml,
  patientConfirmationText,
} from "./email-templates";
import type { AppointmentInput } from "./validation";

type Meta = { referenceNumber: string; submittedAtDisplay: string; preferredDateDisplay: string };
type AdminContext = { ip?: string; userAgent?: string };

export type SendResult = { ok: true } | { ok: false; error: unknown };

/**
 * Both emails are sent independently and neither failure blocks the other —
 * the doctor notification is the operationally important one (it's how the
 * clinic learns a patient wants an appointment), so a failed patient
 * confirmation shouldn't be treated as a failed request. The caller decides
 * how to react to each result.
 */
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
    .then((r): SendResult => (r.error ? { ok: false, error: r.error } : { ok: true }))
    .catch((error): SendResult => ({ ok: false, error }));

  const patientSend = resend.emails
    .send({
      from: env.RESEND_FROM_EMAIL,
      to: data.email,
      subject: "Appointment Request Received",
      html: patientConfirmationHtml(data, meta),
      text: patientConfirmationText(data, meta),
    })
    .then((r): SendResult => (r.error ? { ok: false, error: r.error } : { ok: true }))
    .catch((error): SendResult => ({ ok: false, error }));

  const [doctor, patient] = await Promise.all([doctorSend, patientSend]);
  return { doctor, patient };
}
