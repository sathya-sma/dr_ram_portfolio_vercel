export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("CF-Connecting-IP") || req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return "unknown";
}

export function getUserAgent(req: Request): string {
  return req.headers.get("user-agent") || "unknown";
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
