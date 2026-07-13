import { ArrowRight, Phone } from "@/lib/icons";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import HeroScene from "./HeroScene";

const EASE = { transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" } as const;

export default function Hero() {
  return (
    <section
      className="hero-minh relative flex items-center py-28 pb-16 text-[#eaf3f1] overflow-hidden"
      style={{
        background: "radial-gradient(120% 140% at 85% -10%, #103862 0%, #0a2342 55%, #081c38 100%)",
      }}
      id="home"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 z-0" aria-hidden>
        {/* Emerald aurora — single intentional light source, top-right */}
        <span
          className="absolute w-[720px] h-[720px] rounded-full blur-[70px] animate-float -top-[260px] -right-[160px]"
          style={{ background: "radial-gradient(circle, rgba(47,214,160,.16), transparent 65%)" }}
        />
        {/* Faint teal counter-glow anchoring the bottom-left */}
        <span
          className="absolute w-[560px] h-[560px] rounded-full blur-[70px] -bottom-[240px] -left-[180px]"
          style={{ background: "radial-gradient(circle, rgba(20,80,107,.55), transparent 70%)" }}
        />
        {/* Dot grid */}
        <span
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,.06) 1.4px, transparent 1.4px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(120% 80% at 50% 0%, #000 35%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(120% 80% at 50% 0%, #000 35%, transparent 75%)",
          }}
        />
        {/* Flowing liquid-light ribbons (canvas, additive glow) */}
        <HeroScene />
      </div>

      {/* Content */}
      <div className="relative z-[2] w-[min(100%-2.4rem,1180px)] mx-auto grid grid-cols-[1.15fr_.85fr] gap-12 items-center max-[980px]:grid-cols-1 max-[980px]:gap-10 pt-[112px]">
        <div>
          {/* Tagline is the hero statement; the doctor's name follows as the credential line. */}
          <h1 className="reveal font-serif font-semibold leading-[1.06] tracking-tight text-[clamp(2.5rem,5.4vw,4rem)] text-white">
            Surgical Excellence,
            <br />
            <span className="bg-gradient-to-r from-emerald-glow via-[#7fe3c4] to-[#aee9ff] bg-clip-text text-transparent">
              Personalised Care.
            </span>
            <span className="sr-only"> — Dr. T. Ramkumar, Consultant Gastrointestinal Surgeon</span>
          </h1>

          <p className="reveal mt-[1.3rem] flex flex-wrap items-baseline gap-x-[.7rem] gap-y-[.15rem]" data-reveal-delay="80">
            <span className="font-serif font-semibold text-white text-[clamp(1.35rem,2.6vw,1.7rem)] leading-tight">
              Dr. T. Ramkumar
            </span>
            <span className="font-semibold text-[#9fc7d6] text-[clamp(.9rem,1.8vw,1.05rem)]">
              Consultant Gastrointestinal, Laparoscopic &amp; Robotic Surgeon
            </span>
          </p>

          <p className="reveal max-w-[46ch] mt-[1.1rem] text-[#c4d6dd] text-[1.04rem]" data-reveal-delay="160">
            Over <strong className="text-white">24 years</strong> of expertise in laparoscopic,
            robotic and open GI surgery — among Tamil Nadu&apos;s early pioneers of minimally
            invasive surgery, trusted by patients across India and internationally.
          </p>

          <div className="reveal flex flex-wrap items-center gap-[.9rem] mt-8" data-reveal-delay="240">
            <a
              href="#contact"
              className="
                inline-flex items-center gap-[.55rem] font-sans font-bold text-[.98rem]
                py-[.95rem] px-[1.6rem] rounded-full border border-transparent
                bg-gradient-to-br from-emerald-2 to-teal text-white leading-none
                shadow-[0_14px_30px_-12px_rgba(21,151,106,.7)]
                hover:-translate-y-[3px] hover:shadow-[0_22px_42px_-14px_rgba(21,151,106,.85)]
                transition-all duration-350 whitespace-nowrap cursor-pointer
              "
              style={EASE}
            >
              Book an Appointment
              <ArrowRight className="ico w-[18px] h-[18px] shrink-0" />
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="
                inline-flex items-center gap-[.55rem] font-sans font-bold text-[.98rem]
                py-[.95rem] px-[1.6rem] rounded-full
                bg-white/6 text-[#eaf4f1] border border-white/28 backdrop-blur-[6px]
                hover:bg-white/14 hover:-translate-y-[3px]
                transition-all duration-350 whitespace-nowrap leading-none cursor-pointer
              "
              style={EASE}
            >
              <Phone className="ico w-[18px] h-[18px] shrink-0" />
              Call {PHONE_DISPLAY}
            </a>
          </div>

          {/* Trust signal — rating pulled from the Google reviews widget below */}
          <a
            href="#reviews"
            className="reveal inline-flex items-center gap-[.55rem] mt-[1.6rem] py-[.55rem] px-[1rem] rounded-full bg-white/6 border border-white/16 backdrop-blur-[6px] text-[.9rem] font-semibold text-[#dcebe7] hover:bg-white/12 transition-colors duration-250"
            data-reveal-delay="320"
          >
            <span className="text-[#f5c451] tracking-[.1em] leading-none" aria-hidden>
              ★★★★★
            </span>
            5.0 on Google · 21 reviews
          </a>
        </div>

        {/* Portrait */}
        <div className="reveal flex justify-center max-[980px]:max-w-[320px] max-[980px]:mx-auto" data-reveal-delay="200">
          {/* Bottom margin reserves room for the overhanging credential bar */}
          <div className="relative w-[min(100%,380px)] mb-[30px]">
            <div className="relative rounded-[30px] overflow-hidden shadow-[0_40px_80px_-28px_rgba(10,35,66,.45)] border border-white/12 aspect-[5/6]">
              <img
                src="/brand/portrait.jpeg"
                alt="Dr. T. Ramkumar, Consultant Gastrointestinal Surgeon"
                width="960"
                height="1440"
                fetchPriority="high"
                className="object-cover object-[50%_22%] w-full h-full block"
              />
              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 rounded-[30px] shadow-[inset_0_-90px_80px_-50px_rgba(7,30,42,.9)]" />
            </div>

            {/* Credential bar — replaces the floating sticker pills */}
            <div className="absolute inset-x-[16px] -bottom-[30px] z-[3] grid grid-cols-3 bg-white rounded-[18px] py-[.8rem] shadow-[0_18px_50px_-20px_rgba(4,20,30,.55)]">
              {[
                ["24+", "Years exp."],
                ["7,500+", "GI surgeries"],
                ["8", "Hospitals"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  // border-l! (important) — Jotform's unlayered `* { border-width: 0 }` reset beats layered utilities
                  className="flex flex-col items-center gap-[.15rem] px-2 text-center border-l! border-line first:border-l-0!"
                >
                  <span className="font-serif font-bold text-[1.3rem] leading-none text-teal">{value}</span>
                  <span className="text-[.62rem] font-bold uppercase tracking-[.06em] text-muted leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#stats"
        className="absolute bottom-[1.4rem] left-1/2 -translate-x-1/2 z-[3] w-[26px] h-[42px] border-2 border-white/35 rounded-[14px] [@media(min-height:521px)]:flex justify-center pt-[7px] [@media(max-height:520px)]:hidden"
        aria-label="Scroll down to statistics"
      >
        <span className="w-[3px] h-[9px] rounded-[3px] bg-emerald-glow animate-scrolldot" />
      </a>
    </section>
  );
}
