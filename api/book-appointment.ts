import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getEnv } from "./_lib/env.js";
import { sendAppointmentEmails } from "./_lib/email-service.js";
import { createRequestLogger } from "./_lib/logger.js";
import { generateReferenceNumber } from "./_lib/reference-number.js";
import { checkDuplicate, checkRateLimit } from "./_lib/request-guard.js";
import { formatPreferredDate, formatSubmittedAt, getClientIp, getUserAgent } from "./_lib/utils.js";
import { isHoneypotTripped, validateAppointment } from "./_lib/validation.js";
import type { RawBody } from "./_lib/validation.js";

/**
 * Appointment request handler — thin orchestration only. Each concern
 * (env validation, rate limiting, duplicate detection, field validation,
 * reference numbers, email templates/sending, structured logging) lives in
 * its own module under ./_lib so this file reads as the workflow, not the
 * implementation:
 *
 *   env check → rate limit → honeypot → validate → duplicate check
 *   → generate reference → send emails → respond
 *
 * Every step logs a structured event via `logger` (see ./_lib/logger.ts) —
 * one JSON line per event, all carrying the same internal Request ID, so a
 * single request's full lifecycle can be grepped out of Vercel's log
 * stream. The Request ID is never included in any response body; only the
 * patient-facing reference number is.
 *
 * Required env vars (Vercel → Project → Settings → Environment Variables,
 * and a local .env for `vercel dev`):
 *   RESEND_API_KEY       — from resend.com
 *   CLINIC_NOTIFY_EMAIL  — inbox that should receive appointment requests
 * Optional:
 *   RESEND_FROM_EMAIL    — verified sender; falls back to Resend's shared
 *                          sandbox address otherwise.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  const ip = getClientIp(req);
  const userAgent = getUserAgent(req);
  const logger = createRequestLogger(ip, userAgent);
  logger.log("Request Received");

  const envResult = getEnv();
  if (!envResult.ok) {
    logger.log("Failed", { error: `Missing environment variables: ${envResult.missing.join(", ")}` });
    return res.status(500).json({
      success: false,
      message: "Appointment booking isn't available right now. Please call the clinic directly.",
    });
  }
  const env = envResult.env;

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    logger.log("Rate Limited", { retryAfterMinutes: rateLimit.retryAfterMinutes });
    return res.status(429).json({
      success: false,
      message: `Too many requests from this connection. Please try again in about ${rateLimit.retryAfterMinutes} minute(s), or call the clinic directly.`,
    });
  }

  const body = (typeof req.body === "object" && req.body !== null ? req.body : {}) as RawBody;

  // Honeypot — bots fill every field, including ones hidden from real users.
  // Respond as if it succeeded so the bot doesn't learn to look elsewhere.
  if (isHoneypotTripped(body)) {
    logger.log("Honeypot Tripped");
    return res.status(200).json({ success: true, referenceNumber: generateReferenceNumber() });
  }

  logger.log("Validation Started");
  const validation = validateAppointment(body);
  if (!validation.ok) {
    logger.log("Validation Failed", { error: validation.error });
    return res.status(400).json({ success: false, message: validation.error });
  }
  logger.log("Validation Passed");
  const data = validation.data;

  const dup = checkDuplicate(data.mobileDigits, data.date);
  if (dup.isDuplicate) {
    logger.log("Duplicate Rejected");
    return res.status(409).json({
      success: false,
      message:
        "We already have a recent request from this number for this date — our team will be in touch shortly, no need to submit again.",
    });
  }

  const now = new Date();
  const referenceNumber = generateReferenceNumber("CSC", now);
  logger.setReferenceNumber(referenceNumber);
  const meta = {
    referenceNumber,
    submittedAtDisplay: formatSubmittedAt(now),
    preferredDateDisplay: formatPreferredDate(data.date),
  };

  try {
    const { doctor, patient } = await sendAppointmentEmails(env, data, meta, { ip, userAgent });

    if (!doctor.ok) {
      // The doctor notification is the operationally critical email — if it
      // failed, the clinic doesn't know about this request at all, so this
      // is a real failure from the patient's point of view even though the
      // form data was perfectly valid.
      logger.log("Doctor Email Failed", { error: doctor.error });
      logger.log("Failed", { error: "Doctor notification email could not be sent" });
      return res.status(502).json({
        success: false,
        message: "We couldn't send your request right now. Please try again or call the clinic.",
      });
    }
    logger.log("Doctor Email Sent");

    if (!patient.ok) {
      // Non-fatal: the clinic has the request either way. Logged for
      // visibility (e.g. a bad patient email address) but not surfaced as
      // an error to the patient, who has no way to act on it anyway.
      logger.log("Patient Email Failed", { error: patient.error });
    } else {
      logger.log("Patient Email Sent");
    }

    logger.log("Completed");
    return res.status(200).json({
      success: true,
      referenceNumber,
      preferredDateDisplay: meta.preferredDateDisplay,
      submittedAtDisplay: meta.submittedAtDisplay,
    });
  } catch (err) {
    logger.log("Failed", { error: err });
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again or call the clinic directly.",
    });
  }
}
