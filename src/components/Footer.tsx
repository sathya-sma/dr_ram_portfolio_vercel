import { track } from "@vercel/analytics";
import {
  CLINIC_NAME,
  DOCTOR_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
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
    <footer className="bg-navy text-[#c4d6dd] pt-16 pb-[1.5rem] relative isolate">
      {/* Glow background */}
      <div
        className="absolute inset-0 -z-[1]"
        style={{
          background: "radial-gradient(70% 100% at 15% 0%, rgba(31,184,134,.12), transparent 55%)",
        }}
        aria-hidden
      />

      <div className="w-[min(100%-2.4rem,1180px)] mx-auto grid grid-cols-[1.6fr_1fr_1.2fr_1.1fr] gap-8 max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
        {/* Brand */}
        <div>
          <img
            src="/brand/logo-white.png"
            alt={CLINIC_NAME}
            width="493"
            height="138"
            loading="lazy"
            decoding="async"
            className="h-[38px] w-auto block mb-4"
          />
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
        {/* Technology Partner */}
        <div className="flex flex-col items-start">
          <p className={headingClass}>Technology Partner</p>
          <div className="group block cursor-default">
            <div className="flex items-center transition-all duration-300 group-hover:scale-[1.04] group-hover:translate-x-1">
              <img
                src="/brand/axion-logo.png"
                alt="Axion Technologies Private Ltd"
                className="h-[125px] w-auto block object-contain ml-[-24px] mr-[-28px] mt-[-28px] mb-[-28px]"
              />
              <span className="font-sans text-[1.3rem] font-extrabold text-white leading-none">
                Technologies
              </span>
            </div>
            <div className="text-[0.8rem] text-[#8ba4ad] leading-relaxed mt-1 pl-1">
              <span className="block text-[#7fa3b0] text-[0.74rem] uppercase font-semibold tracking-wider">Designed &amp; Developed by</span>
              <span className="block text-[0.68rem] font-extrabold text-white/70 tracking-[0.06em] uppercase mt-1 whitespace-nowrap">
                Axion Technologies Private Ltd
              </span>
            </div>
          </div>
        </div>



      </div>

      {/* Bottom bar */}
      <div className="w-[min(100%-2.4rem,1180px)] mx-auto flex justify-between items-center gap-4 flex-wrap mt-12 pt-[1.4rem] border-t border-white/12 text-[.82rem] text-[#8ba4ad]">
        <div className="flex flex-col gap-2">
          <p className="m-0">
            © {new Date().getFullYear()} {DOCTOR_NAME} · {CLINIC_NAME}. All rights reserved.
          </p>

        </div>
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
