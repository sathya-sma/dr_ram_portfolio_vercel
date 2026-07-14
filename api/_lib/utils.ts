import type { VercelRequest } from "@vercel/node";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** First hop of x-forwarded-for is the original client on Vercel's edge network. */
export function getClientIp(req: VercelRequest): string {
  const fwd = req.headers["x-forwarded-for"];
  const first = Array.isArray(fwd) ? fwd[0] : fwd;
  if (first) return first.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

export function getUserAgent(req: VercelRequest): string {
  const ua = req.headers["user-agent"];
  return Array.isArray(ua) ? ua[0] : ua || "unknown";
}

export function formatSubmittedAt(date: Date = new Date()): string {
  return date.toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

export function formatPreferredDate(iso: string): string {
  if (!iso) return "Not specified";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { dateStyle: "full", timeZone: "Asia/Kolkata" });
}
