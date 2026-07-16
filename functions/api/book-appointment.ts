import { getEnv } from "./_lib/env.js";
import { sendAppointmentEmails } from "./_lib/email-service.js";
import { createRequestLogger } from "./_lib/logger.js";
import { generateReferenceNumber } from "./_lib/reference-number.js";
import { checkDuplicate, checkRateLimit } from "./_lib/request-guard.js";
import { formatPreferredDate, formatSubmittedAt, getClientIp, getUserAgent } from "./_lib/utils.js";
import { isHoneypotTripped, validateAppointment } from "./_lib/validation.js";
import type { RawBody } from "./_lib/validation.js";

interface EventContext {
  request: Request;
  env: Record<string, any>;
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  const { request, env } = context;

  const ip = getClientIp(request);
  const userAgent = getUserAgent(request);
  const logger = createRequestLogger(ip, userAgent);
  logger.log("Request Received");

  const envResult = getEnv(env);
  if (!envResult.ok) {
    logger.log("Failed", { error: `Missing environment variables: ${envResult.missing.join(", ")}` });
    return new Response(
      JSON.stringify({
        success: false,
        message: "Appointment booking isn't available right now. Please call the clinic directly.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
  const validatedEnv = envResult.env;

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    logger.log("Rate Limited", { retryAfterMinutes: rateLimit.retryAfterMinutes });
    return new Response(
      JSON.stringify({
        success: false,
        message: `Too many requests from this connection. Please try again in about ${rateLimit.retryAfterMinutes} minute(s), or call the clinic directly.`,
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: RawBody = {};
  try {
    body = await request.json();
  } catch (e) {
    logger.log("Validation Failed", { error: "Invalid JSON body" });
    return new Response(
      JSON.stringify({ success: false, message: "Invalid request payload." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (isHoneypotTripped(body)) {
    logger.log("Honeypot Tripped");
    return new Response(
      JSON.stringify({ success: true, referenceNumber: generateReferenceNumber() }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  logger.log("Validation Started");
  const validation = validateAppointment(body);
  if (!validation.ok) {
    logger.log("Validation Failed", { error: validation.error });
    return new Response(
      JSON.stringify({ success: false, message: validation.error }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  logger.log("Validation Passed");
  const data = validation.data;

  const dup = checkDuplicate(data.mobileDigits, data.date);
  if (dup.isDuplicate) {
    logger.log("Duplicate Rejected");
    return new Response(
      JSON.stringify({
        success: false,
        message:
          "We already have a recent request from this number for this date — our team will be in touch shortly, no need to submit again.",
      }),
      { status: 409, headers: { "Content-Type": "application/json" } }
    );
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
    const { doctor, patient } = await sendAppointmentEmails(validatedEnv, data, meta, { ip, userAgent });

    if (!doctor.ok) {
      logger.log("Doctor Email Failed", { error: doctor.error });
      logger.log("Failed", { error: "Doctor notification email could not be sent" });
      return new Response(
        JSON.stringify({
          success: false,
          message: "We couldn't send your request right now. Please try again or call the clinic.",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
    logger.log("Doctor Email Sent");

    if (!patient.ok) {
      logger.log("Patient Email Failed", { error: patient.error });
    } else {
      logger.log("Patient Email Sent");
    }

    logger.log("Completed");
    return new Response(
      JSON.stringify({
        success: true,
        referenceNumber,
        preferredDateDisplay: meta.preferredDateDisplay,
        submittedAtDisplay: meta.submittedAtDisplay,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    logger.log("Failed", { error: err });
    return new Response(
      JSON.stringify({
        success: false,
        message: "Something went wrong. Please try again or call the clinic directly.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
