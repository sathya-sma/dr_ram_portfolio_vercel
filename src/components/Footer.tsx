import { track } from "@vercel/analytics";
import {
  CLINIC_NAME,
  DOCTOR_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
  REVIEW_URL,
} from "@/lib/site";
import { openLegal } from "./Legal";

const EXPLORE: [string, string][] = [
  ["About", "#about"],
  ["Patient Care", "#patient-care"],
  ["Specialities", "#specialities"],
  ["Conditions", "#conditions"],
  ["Publications", "#publications"],
  ["Hospitals", "#hospitals"],
  ["Reviews", "#reviews"],
];

const headingClass = "text-white text-[.95rem] font-bold mb-4 tracking-[.03em]";

export default function Footer() {
  return (
    <footer className="bg-navy text-[#c4d6dd] pt-[clamp(3rem,6vw,4rem)] pb-[1.5rem] relative isolate">
      {/* Glow background */}
      <div
        className="absolute inset-0 -z-[1]"
        style={{
          background: "radial-gradient(70% 100% at 15% 0%, rgba(31,184,134,.12), transparent 55%)",
        }}
        aria-hidden
      />

      <div className="w-[min(100%-2.4rem,73.75rem)] mx-auto grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1.2fr_1.1fr] gap-8">
        {/* Brand */}
        <div>
          <span className="inline-block bg-white rounded-[12px] p-[6px] mb-4">
            <img
              src="/brand/logo.png"
              alt={CLINIC_NAME}
              width="493"
              height="138"
              loading="lazy"
              decoding="async"
              className="h-[2.375rem] w-auto block"
            />
          </span>
          <p className="font-serif text-[1.4rem] text-white font-semibold">{DOCTOR_NAME}</p>
          <p className="text-[.9rem] mt-[.3rem] text-[#9fb6bf]">
            Consultant Gastrointestinal Surgeon
            <br />
            Laparoscopic &amp; Robotic Cancer Surgeon
          </p>
        </div>

        {/* Explore */}
        <div>
          <p className={headingClass}>Explore</p>
          {EXPLORE.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="block text-[#a9c0c8] text-[.93rem] mb-[.55rem] w-fit transition-all duration-250 hover:text-emerald-glow hover:pl-1"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Visit */}
        <div>
          <p className={headingClass}>Visit</p>
          <p className="text-[.9rem] text-[#a9c0c8] mb-[.7rem] leading-[1.6]">
            {CLINIC_NAME}
            <br />
            Thiruvalluvar Puram, Choolaimedu,
            <br />
            Chennai 600094
          </p>
          <a
            href={`tel:${PHONE_TEL}`}
            className="font-serif text-[1.2rem] text-white!"
            onClick={() => track("call_click", { source: "footer" })}
          >
            {PHONE_DISPLAY}
          </a>
        </div>

        {/* Appointments */}
        <div>
          <p className={headingClass}>Appointments</p>
          <a
            href="#contact"
            className="
              inline-flex items-center gap-[.55rem] font-sans font-bold text-[.9rem]
              py-[clamp(0.6rem,2vw,0.7rem)] px-[clamp(0.9rem,3vw,1.15rem)] rounded-full border border-transparent
              bg-gradient-to-br from-emerald-2 to-teal text-white
              shadow-[0_14px_30px_-12px_rgba(21,151,106,.7)]
              hover:-translate-y-[3px] hover:shadow-[0_22px_42px_-14px_rgba(21,151,106,.85)]
              transition-all duration-350 whitespace-nowrap leading-none cursor-pointer mb-[.9rem]
            "
            style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
          >
            Book Appointment
          </a>
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[#f5c451]! font-semibold text-[.93rem] w-fit transition-all duration-250 hover:text-emerald-glow hover:pl-1"
          >
            ★ Leave a Google review
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-[min(100%-2.4rem,73.75rem)] mx-auto flex justify-between items-center gap-4 flex-wrap mt-12 pt-[1.4rem] border-t border-white/12 text-[.82rem] text-[#8ba4ad]">
        <p className="m-0">
          © {new Date().getFullYear()} {DOCTOR_NAME} · {CLINIC_NAME}. All rights reserved.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => openLegal()}
            className="bg-transparent border-0 p-0 cursor-pointer text-[#8ba4ad] text-[.82rem] underline underline-offset-4 transition-colors duration-250 hover:text-emerald-glow"
          >
            Privacy Policy &amp; Disclaimer
          </button>
          <p className="m-0">For medical emergencies, please visit your nearest hospital.</p>
        </div>
      </div>
    </footer>
  );
}
