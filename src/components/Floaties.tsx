import { track } from "@vercel/analytics";
import { WhatsApp, Phone } from "@/lib/icons";
import { PHONE_TEL, WHATSAPP_URL } from "@/lib/site";

export default function Floaties() {
  return (
    <div className="fixed right-[1.1rem] bottom-[1.1rem] z-[950] flex flex-col gap-[.8rem]">
      <a
        href={WHATSAPP_URL}
        className="
          relative w-14 h-14 rounded-full grid place-items-center text-white
          bg-[#25d366] shadow-[0_14px_30px_-10px_rgba(0,0,0,.45)]
          hover:scale-108 transition-transform duration-300
        "
        style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => track("whatsapp_click", { source: "floaties" })}
      >
        <WhatsApp className="w-7 h-7 fill-current stroke-none" />
      </a>
      <a
        href={`tel:${PHONE_TEL}`}
        className="
          relative w-14 h-14 rounded-full grid place-items-center text-white
          bg-gradient-to-br from-emerald-2 to-teal
          shadow-[0_14px_30px_-10px_rgba(0,0,0,.45)]
          hover:scale-108 transition-transform duration-300
        "
        style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
        aria-label="Call the clinic"
        onClick={() => track("call_click", { source: "floaties" })}
      >
        <Phone className="ico w-6 h-6 !fill-none !stroke-white" style={{ strokeWidth: 1.7 }} />
        <span className="absolute inset-0 rounded-full border-2 border-emerald-2 animate-pulse-ring" />
      </a>
    </div>
  );
}
