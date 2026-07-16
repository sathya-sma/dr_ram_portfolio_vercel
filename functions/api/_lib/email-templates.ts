import { CLINIC_NAME, DOCTOR_NAME, PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "../../src/lib/site.js";
import { escapeHtml } from "./utils.js";
import type { AppointmentInput } from "./validation.js";

type Meta = {
  referenceNumber: string;
  submittedAtDisplay: string;
  preferredDateDisplay: string;
};

/** Shared chrome (header/footer/wrapper) so both emails read as one brand. */
function shell(bodyHtml: string, headerEyebrow: string, headerTitle: string) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(headerTitle)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f6faf9;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6faf9;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 18px 50px -20px rgba(16,56,98,.28);">
            <tr>
              <td style="background:linear-gradient(120deg,#0b2a39,#14506b);padding:28px 32px;">
                <div style="font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#7fe3cf;">${escapeHtml(headerEyebrow)}</div>
                <div style="font-size:20px;font-weight:700;color:#ffffff;margin-top:4px;">${escapeHtml(headerTitle)}</div>
              </td>
            </tr>
            ${bodyHtml}
            <tr>
              <td style="padding:20px 32px;background:#f6faf9;border-top:1px solid #e3ece9;">
                <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#0a2342;">${escapeHtml(DOCTOR_NAME)}</p>
                <p style="margin:0 0 10px;font-size:12px;color:#5a6b7b;">${escapeHtml(CLINIC_NAME)} &middot; <a href="tel:${PHONE_TEL}" style="color:#0e7c8b;text-decoration:none;">${escapeHtml(PHONE_DISPLAY)}</a> &middot; <a href="${SITE_URL}" style="color:#0e7c8b;text-decoration:none;">${SITE_URL.replace(/^https?:\/\//, "")}</a></p>
                <p style="margin:0;font-size:11px;color:#8ba4ad;line-height:1.6;">
                  This is an automated message from the official ${escapeHtml(DOCTOR_NAME)} website. Your
                  details are used solely to process this appointment request and are not shared with
                  third parties.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRow(icon: string, label: string, value: string) {
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #e3ece9;">
        <div style="font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#5a6b7b;margin-bottom:4px;">
          ${icon}&nbsp; ${escapeHtml(label)}
        </div>
        <div style="font-size:16px;color:#13283c;font-weight:600;">${escapeHtml(value)}</div>
      </td>
    </tr>`;
}

function referenceBadge(referenceNumber: string) {
  return `
    <div style="display:inline-block;background:#e1f5ee;border:1px solid #9fe1cb;border-radius:999px;padding:8px 18px;font-size:14px;font-weight:700;color:#085041;letter-spacing:.02em;">
      Ref: ${escapeHtml(referenceNumber)}
    </div>`;
}

// ---------------------------------------------------------------------------
// Doctor / clinic admin notification
// ---------------------------------------------------------------------------

export function doctorNotificationHtml(
  d: AppointmentInput,
  meta: Meta,
  admin: { ip?: string; userAgent?: string }
) {
  const body = `
    <tr>
      <td style="padding:24px 32px 4px;">
        <p style="margin:0 0 14px;">${referenceBadge(meta.referenceNumber)}</p>
        <p style="margin:0 0 8px;font-size:15px;color:#13283c;line-height:1.6;">
          A new patient has submitted an appointment request through your website.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${detailRow("👤", "Full Name", d.name)}
          ${detailRow("📧", "Email Address", d.email)}
          ${detailRow("📱", "Mobile Number", d.mobile)}
          ${detailRow("🩺", "Consultation Type", d.type === "online" ? "Online Video Consultation" : "In-Person Clinic Visit")}
          ${detailRow("📅", "Preferred Appointment Date", meta.preferredDateDisplay)}
          ${detailRow("📝", "Message", d.message || "No message provided")}
          ${detailRow("🔖", "Reference Number", meta.referenceNumber)}
          ${detailRow("🕒", "Submitted On", meta.submittedAtDisplay)}
          ${admin.ip ? detailRow("🌐", "IP Address", admin.ip) : ""}
          ${admin.userAgent ? detailRow("💻", "Browser", admin.userAgent) : ""}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 32px 8px;">
        <a href="tel:${d.mobile.replace(/\s/g, "")}" style="display:inline-block;background:linear-gradient(120deg,#1fb886,#0e7c8b);color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:999px;">
          Call ${escapeHtml(d.name.split(" ")[0])} to confirm
        </a>
      </td>
    </tr>`;
  return shell(body, "New Appointment Request", "Dr. T. Ramkumar Website");
}

export function doctorNotificationText(d: AppointmentInput, meta: Meta) {
  return [
    "New Appointment Request",
    "",
    `Full Name: ${d.name}`,
    `Email Address: ${d.email}`,
    `Mobile Number: ${d.mobile}`,
    `Consultation Type: ${d.type === "online" ? "Online Video Consultation" : "In-Person Clinic Visit"}`,
    `Preferred Appointment Date: ${meta.preferredDateDisplay}`,
    `Message: ${d.message || "No message provided"}`,
    `Reference Number: ${meta.referenceNumber}`,
    "",
    `Submitted on: ${meta.submittedAtDisplay}`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Patient confirmation
// ---------------------------------------------------------------------------

export function patientConfirmationHtml(d: AppointmentInput, meta: Meta) {
  const body = `
    <tr>
      <td style="padding:28px 32px 6px;">
        <p style="margin:0 0 14px;font-size:16px;color:#13283c;line-height:1.6;">
          Dear ${escapeHtml(d.name)},
        </p>
        <p style="margin:0 0 18px;font-size:15px;color:#13283c;line-height:1.65;">
          Thank you for reaching out to ${escapeHtml(CLINIC_NAME)}. We've received your appointment
          request and our clinic team is reviewing it now.
        </p>
        ${referenceBadge(meta.referenceNumber)}
      </td>
    </tr>
    <tr>
      <td style="padding:18px 32px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${detailRow("🩺", "Consultation Type", d.type === "online" ? "Online Video Consultation" : "In-Person Clinic Visit")}
          ${detailRow("📅", "Preferred Appointment Date", meta.preferredDateDisplay)}
          ${detailRow("🕒", "Submitted On", meta.submittedAtDisplay)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 32px 8px;">
        <div style="background:#fdf6e8;border:1px solid #f5c451;border-radius:14px;padding:16px 18px;">
          <p style="margin:0;font-size:14px;color:#7a5a06;line-height:1.6;font-weight:600;">
            This is only an appointment request. Our clinic will contact you shortly to confirm
            your appointment.
          </p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 32px 4px;">
        <p style="margin:0;font-size:14px;color:#5a6b7b;line-height:1.6;">
          If anything above looks incorrect, or you need to reach us sooner, call the clinic at
          <a href="tel:${PHONE_TEL}" style="color:#0e7c8b;text-decoration:none;font-weight:700;">${escapeHtml(PHONE_DISPLAY)}</a>.
        </p>
      </td>
    </tr>`;
  return shell(body, "Appointment Request Received", CLINIC_NAME);
}

export function patientConfirmationText(d: AppointmentInput, meta: Meta) {
  return [
    `Dear ${d.name},`,
    "",
    `Thank you for reaching out to ${CLINIC_NAME}. We've received your appointment request and our clinic team is reviewing it now.`,
    "",
    `Reference Number: ${meta.referenceNumber}`,
    `Consultation Type: ${d.type === "online" ? "Online Video Consultation" : "In-Person Clinic Visit"}`,
    `Preferred Appointment Date: ${meta.preferredDateDisplay}`,
    `Submitted On: ${meta.submittedAtDisplay}`,
    "",
    "This is only an appointment request. Our clinic will contact you shortly to confirm your appointment.",
    "",
    `Questions? Call us at ${PHONE_DISPLAY}.`,
  ].join("\n");
}
