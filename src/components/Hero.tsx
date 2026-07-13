import { useEffect, useRef } from "react";
import { ArrowRight, Phone } from "@/lib/icons";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import HeroScene from "./HeroScene";

const EASE = { transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" } as const;

export default function Hero() {
  const portraitBoxRef = useRef<HTMLDivElement>(null);

  /* Pin the portrait window so the head starts exactly at the headline and the
     waist crop meets the section bottom — measured, so it holds on any
     viewport size or browser zoom (the svh class is just the pre-JS guess). */
  useEffect(() => {
    const align = () => {
      const box = portraitBoxRef.current;
      const title = document.getElementById("hero-title");
      if (!box || !title) return;
      if (window.innerWidth <= 980) {
        box.style.height = "";
        return;
      }
      // The box is bottom-anchored (self-end), so its bottom edge stays put while
      // the height changes — head top lands exactly on the headline.
      const boxBottom = box.getBoundingClientRect().bottom;
      const titleTop = title.getBoundingClientRect().top;
      box.style.height = `${Math.max(380, Math.round(boxBottom - titleTop))}px`;
    };
    align();

    // The headline and the portrait wrapper both use the .reveal fade-in
    // (translateY, on independent timers — the portrait has an extra 200ms
    // delay), so a measurement taken mid-animation can be wrong. Re-align
    // whenever either element's transform transition finishes; a timeout
    // covers browsers/paths where the event doesn't fire.
    const hero = document.getElementById("home");
    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === "transform") align();
    };
    hero?.addEventListener("transitionend", onTransitionEnd);
    const settleTimer = window.setTimeout(align, 1100);

    window.addEventListener("resize", align);
    // Fraunces loading shifts the headline's position; re-align once fonts settle.
    document.fonts?.ready.then(align);

    return () => {
      window.removeEventListener("resize", align);
      hero?.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(settleTimer);
    };
  }, []);

  return (
    <section
      className="hero-minh relative flex items-center pt-28 pb-0 text-[#eaf3f1] overflow-hidden"
      style={{
        background: "radial-gradient(120% 140% at 85% -10%, #14506b 0%, #0b2a39 55%, #071e2a 100%)",
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
      {/* min-h stretches the grid to the section bottom so the cropped portrait can anchor there */}
      <div className="relative z-[2] w-[min(100%-2.4rem,1180px)] mx-auto grid grid-cols-[1.02fr_.98fr] gap-12 items-center max-[980px]:grid-cols-1 max-[980px]:gap-10 pt-4 min-[981px]:min-h-[calc(100svh-8.5rem)]">
        {/* self-start keeps the heading near the nav instead of centering in the
            taller row (which the portrait crop needs) and opening a dead gap above it */}
        <div className="min-[981px]:self-start min-[981px]:pt-8">
          {/* Tagline is the hero statement; the doctor's name follows as the credential line. */}
          <h1 id="hero-title" className="reveal font-serif font-semibold leading-[1.06] tracking-tight text-[clamp(2.5rem,5.4vw,4rem)] text-white">
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

        {/* Transparent Doctor Portrait Cutout — waist-up crop, anchored to the hero's bottom edge */}
        {/* Desktop: the box is absolutely positioned so its height never feeds back
            into the grid's height — align() can then pin the head to the headline
            in a single measured pass. */}
        <div
          className="reveal relative w-full min-[981px]:self-stretch max-[980px]:max-w-[440px] max-[980px]:mx-auto max-[980px]:flex max-[980px]:justify-center"
          data-reveal-delay="200"
        >
          {/* Height is measured in Hero's align() so the head lines up with the headline */}
          <div
            ref={portraitBoxRef}
            className="max-[980px]:relative min-[981px]:absolute min-[981px]:bottom-0 min-[981px]:right-0 w-full max-w-[560px] min-[1200px]:max-w-[640px] h-[min(66.5svh,675px)] max-[980px]:h-[min(58svh,520px)] overflow-hidden"
          >
            {/* Emerald rim glow behind the figure — hero background stays visible through the cutout */}
            <span
              aria-hidden
              className="absolute left-1/2 top-[12%] -translate-x-1/2 w-[120%] aspect-square rounded-full blur-[80px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(47,214,160,.16), transparent 65%)" }}
            />
            {/* The crop is already tight to the figure (sharp .trim()), so keep
                width at 100% — anything over that hard-clips the sleeves against
                the box's overflow-hidden edge, which reads as an ugly cut. */}
            <img
              src="/brand/portrait-cutout.webp"
              alt="Dr. T. Ramkumar, Consultant Gastrointestinal Surgeon"
              width="376"
              height="1122"
              fetchPriority="high"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-none h-auto filter drop-shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
            />
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
