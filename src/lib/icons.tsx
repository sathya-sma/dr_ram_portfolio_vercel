import type { SVGProps } from "react";

const base = (p: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24",
  className: "ico",
  ...p,
});

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Phone = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
);
export const Clock = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const Kit = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M8 6V4h8v2M12 11v4M10 13h4" /></svg>
);
export const Doc = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M13 3v6h6M8.5 15l2 2 4-4" /></svg>
);
export const Building = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M3 21h18M5 21V8l4-3 4 3M13 21V11l3-2 3 2v10M9 12v0M9 16v0" /></svg>
);
export const Check = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
);
export const Stethoscope = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
);
export const Users = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><circle cx="9" cy="7" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2 21v-1a6 6 0 0 1 11-3.3M14 21v-1a5 5 0 0 1 8-4" /></svg>
);
export const Bolt = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" /></svg>
);
export const Chat = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" /></svg>
);
export const Activity = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
);
export const Pin = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const Chevron = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>
);
export const CheckMini = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M20 6 9 17l-5-5" /></svg>
);
/* Speciality icons (abstract organ/procedure marks, same stroke style) */
export const Stomach = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M15 2v4c0 3.3-2.7 6-6 6a5 5 0 0 0 0 10h1c5.5 0 10-4.5 10-10V9" /></svg>
);
export const Liver = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M21 7.5c0 6-5 10.5-11 10.5-3.9 0-7-3.1-7-7C3 7.5 6 5 10 5h7a4 4 0 0 1 4 2.5Z" /><path d="M15.5 18c0 1.9-1.6 3.5-3.5 3.5" /></svg>
);
export const Colon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M6.5 21v-9a5.5 5.5 0 0 1 11 0v9" /><path d="M10.5 21v-8a1.5 1.5 0 0 1 3 0v8" /></svg>
);
export const ShieldPlus = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 2l8 3v6c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V5Z" /><path d="M12 8v6M9 11h6" /></svg>
);
export const Scope = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><circle cx="6" cy="5.5" r="3" /><path d="M6 8.5V12a5.5 5.5 0 0 0 5.5 5.5h4a3.5 3.5 0 0 1 3.5 3.5v1" /></svg>
);
export const WhatsApp = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" {...p}>
    <path d="M16 3C9 3 3.5 8.5 3.5 15.5c0 2.3.6 4.5 1.8 6.4L3 29l7.3-2.3c1.8 1 3.8 1.5 5.7 1.5 7 0 12.5-5.5 12.5-12.5S23 3 16 3Zm0 22.7c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.3 1.3 1.4-4.2-.3-.4a10 10 0 0 1-1.5-5.3C5.9 9.8 10.4 5.4 16 5.4S26.1 9.8 26.1 15.5 21.6 25.7 16 25.7Zm5.7-7.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4Z" />
  </svg>
);

