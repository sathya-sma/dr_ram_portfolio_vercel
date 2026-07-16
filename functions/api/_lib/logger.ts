import { generateRequestId } from "./request-id.js";

/**
 * Structured, one-JSON-object-per-line logging for the appointment
 * pipeline. Every important lifecycle event is logged with the same shape
 * (request ID, reference number, timestamp, execution time, IP, user
 * agent, status, error) so a support engineer can `grep` one request's
 * full lifecycle out of Vercel's log stream by its Request ID, or search
 * across all requests for a given event/status.
 *
 * The Request ID is strictly internal — it's generated here, logged here,
 * and never placed in an API response. Only the patient-facing reference
 * number (generated mid-flow, once validation passes) is ever returned to
 * the browser; see book-appointment.ts.
 */

export type LogEvent =
  | "Request Received"
  | "Validation Started"
  | "Validation Passed"
  | "Validation Failed"
  | "Rate Limited"
  | "Duplicate Rejected"
  | "Honeypot Tripped"
  | "Doctor Email Sent"
  | "Doctor Email Failed"
  | "Patient Email Sent"
  | "Patient Email Failed"
  | "Completed"
  | "Failed";

type LogExtra = Record<string, unknown> & { error?: unknown };

export type RequestLogger = {
  /** Internal trace ID — never send this to the client. */
  requestId: string;
  /** Attaches the reference number once it's generated, so every log line from that point on carries it. */
  setReferenceNumber: (referenceNumber: string) => void;
  log: (event: LogEvent, extra?: LogExtra) => void;
};

function serializeError(err: unknown): Record<string, unknown> {
  if (err instanceof Error) return { name: err.name, message: err.message };
  if (err && typeof err === "object") return err as Record<string, unknown>;
  return { message: String(err) };
}

export function createRequestLogger(ip: string, userAgent: string): RequestLogger {
  const requestId = generateRequestId();
  const startedAt = Date.now();
  let referenceNumber: string | null = null;

  const log: RequestLogger["log"] = (event, extra) => {
    const { error, ...rest } = extra ?? {};
    const entry = {
      requestId,
      referenceNumber,
      event,
      status: error ? "error" : "info",
      timestamp: new Date().toISOString(),
      executionTimeMs: Date.now() - startedAt,
      ip,
      userAgent,
      ...rest,
      ...(error !== undefined ? { error: serializeError(error) } : {}),
    };
    const line = JSON.stringify(entry);
    if (error) console.error(line);
    else console.log(line);
  };

  return {
    requestId,
    setReferenceNumber: (ref) => {
      referenceNumber = ref;
    },
    log,
  };
}
