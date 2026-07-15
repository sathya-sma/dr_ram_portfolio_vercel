import { ArrowRight, CheckMini, Phone } from "@/lib/icons";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import HeroScene from "./HeroScene";
import { motion } from "framer-motion";

const EASE = { transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" } as const;

export default function Hero() {
  return (
    <section
      className="hero-minh relative flex items-center pt-28 pb-0 text-[#eaf3f1] overflow-hidden"
      style={{
        background: "radial-gradient(120% 140% at 85% -10%, #14506b 0%, #0b2a39 55%, #071e2a 100%)",
      }}
      id="home"
    >
      {/* Background decorations — decorative overlay only, not part of the
          content layout. Absolute positioning here is fine: it fills the
          section behind the grid and never participates in sizing it. */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <span
          className="absolute w-[720px] h-[720px] rounded-full blur-[70px] animate-float -top-[260px] -right-[160px]"
          style={{ background: "radial-gradient(circle, rgba(47,214,160,.16), transparent 65%)" }}
        />
        <span
          className="absolute w-[560px] h-[560px] rounded-full blur-[70px] -bottom-[240px] -left-[180px]"
          style={{ background: "radial-gradient(circle, rgba(20,80,107,.55), transparent 70%)" }}
        />
        <span
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,.06) 1.4px, transparent 1.4px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(120% 80% at 50% 0%, #000 35%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(120% 80% at 50% 0%, #000 35%, transparent 75%)",
          }}
        />
        <HeroScene />
      </div>

      {/*
        Content — pure CSS grid. This is the entire layout algorithm: two
        equal columns, both vertically centered on the row by the browser's
        own layout engine. No JavaScript measures or positions anything
        below this point, so there is nothing that can desync from a zoom
        or resize event — the grid recomputes for free on every reflow,
        exactly like every other section on this page.
      */}
      <div className="relative z-[2] w-[min(100%-2.4rem,1180px)] mx-auto grid grid-cols-1 min-[981px]:grid-cols-2 gap-10 min-[981px]:gap-16 items-center justify-items-center">
        <div className="w-full max-[980px]:text-center">
          {/* Tagline is the hero statement; the doctor's name follows as the credential line. */}
          <h1 id="hero-title" className="reveal font-serif font-semibold leading-[1.06] tracking-tight text-[clamp(2.5rem,5.4vw,4rem)] text-white">
            Surgical Excellence,
            <br />
            <span className="bg-gradient-to-r from-emerald-glow via-[#7fe3c4] to-[#aee9ff] bg-clip-text text-transparent">
              Personalised Care.
            </span>
            <span className="sr-only"> — Dr. T. Ramkumar, Consultant Gastrointestinal Surgeon</span>
          </h1>

          <p
            className="reveal mt-[1.3rem] flex flex-wrap items-baseline gap-x-[.7rem] gap-y-[.15rem] max-[980px]:justify-center"
            data-reveal-delay="80"
          >
            <span className="font-serif font-semibold text-white text-[clamp(1.35rem,2.6vw,1.7rem)] leading-tight">
              Dr. T. Ramkumar
            </span>
            <span className="font-semibold text-[#9fc7d6] text-[clamp(.9rem,1.8vw,1.05rem)]">
              Consultant Gastrointestinal, Laparoscopic &amp; Robotic Surgeon
            </span>
          </p>

          <p className="reveal max-w-[46ch] mt-[1.1rem] text-[#c4d6dd] text-[1.04rem] max-[980px]:mx-auto" data-reveal-delay="160">
            Over <strong className="text-white">24 years</strong> of expertise in laparoscopic,
            robotic and open GI surgery — among Tamil Nadu&apos;s early pioneers of minimally
            invasive surgery, trusted by patients across India and internationally.
          </p>

          <div className="reveal flex flex-wrap items-center gap-[.9rem] mt-8 max-[980px]:justify-center" data-reveal-delay="240">
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

        {/*
          Portrait — pure CSS, zero layout JavaScript.
          - The wrapper is an ordinary grid item (static flow, no absolute
            positioning, no transform, no inline styles for size/position).
          - align-items:center on the grid above vertically centers this
            column against the text column at all times.
          - The image itself caps at max-h-[90vh] with object-contain, so
            the full figure is always visible and never overflows the
            viewport, at any zoom level or window size — the browser's
            layout engine handles it on every reflow, the same way it
            already handles text reflow.
        */}
        <div className="reveal relative w-full self-end pr-2 pl-2" data-reveal-delay="200">
          {/* Decorative glow behind the figure — a background-gradient fill,
              not a positioned/transformed element, so it can't affect layout. */}
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 42%, rgba(47,214,160,.16), transparent 65%)" }}
          />

          {/* Floating badge 1: Robotic Surgery (Mid Right - Shoulder/Chest Level) */}
          <motion.div
            className="absolute top-[34%] right-[-2%] min-[1200px]:-right-[6%] z-10 select-none max-[480px]:scale-[0.85] max-[480px]:origin-right"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2.5 bg-white/92 backdrop-blur-[8px] py-2.5 px-[1.2rem] rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_32px_-6px_rgba(10,35,66,0.18)] border border-white/40">
              <span className="w-5 h-5 rounded-full bg-emerald-500/12 text-emerald border border-emerald-500/15 flex items-center justify-center shrink-0 shadow-sm">
                <CheckMini className="ico w-[10px] h-[10px]" style={{ strokeWidth: 3.2 }} />
              </span>
              <span className="font-sans font-extrabold text-[0.86rem] tracking-tight leading-none text-navy">
                Robotic Surgery
              </span>
            </div>
          </motion.div>

          {/* Floating badge 2: 7,500+ GI Surgeries (Lower Right - Elbow Level) */}
          <motion.div
            className="absolute bottom-[28%] right-[-4%] min-[1200px]:-right-[8%] z-10 select-none max-[480px]:scale-[0.85] max-[480px]:origin-right"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="flex items-center gap-2.5 bg-white/92 backdrop-blur-[8px] py-2.5 px-[1.2rem] rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_32px_-6px_rgba(10,35,66,0.18)] border border-white/40">
              <span className="w-5 h-5 rounded-full bg-emerald-500/12 text-emerald border border-emerald-500/15 flex items-center justify-center shrink-0 shadow-sm">
                <CheckMini className="ico w-[10px] h-[10px]" style={{ strokeWidth: 3.2 }} />
              </span>
              <span className="font-sans font-extrabold text-[0.86rem] tracking-tight leading-none text-navy">
                7,500+ GI Surgeries
              </span>
            </div>
          </motion.div>

          {/* Floating badge 3: 24+ Years of Experience (Bottom Left - Waist Level) */}
          <motion.div
            className="absolute bottom-[18%] left-[-4%] min-[1200px]:-left-[8%] z-10 select-none max-[480px]:scale-[0.85] max-[480px]:origin-left"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 1.0 }}
          >
            <div className="flex items-center gap-3.5 bg-white/92 backdrop-blur-[8px] p-3 px-4.5 rounded-[20px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_16px_36px_-8px_rgba(10,35,66,0.2)] border border-white/45">
              <span className="font-serif font-extrabold text-[2.1rem] text-teal leading-none tracking-tight bg-gradient-to-r from-teal to-emerald-2 bg-clip-text text-transparent">24+</span>
              <div className="w-[1px] h-7 bg-line/80 self-center" />
              <div className="flex flex-col text-left leading-[1.1] uppercase tracking-[0.05em] shrink-0">
                <span className="text-[0.6rem] font-bold text-muted/80">Years of</span>
                <span className="text-[0.72rem] font-extrabold text-navy">Experience</span>
              </div>
            </div>
          </motion.div>

          <img
            src="/brand/dr-ram-portrait-v2.webp"
            alt="Dr. T. Ramkumar, Consultant Gastrointestinal Surgeon"
            width="689"
            height="1029"
            fetchPriority="high"
            className="relative block w-full h-auto object-contain max-h-[90vh] mx-auto filter drop-shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
          />
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
