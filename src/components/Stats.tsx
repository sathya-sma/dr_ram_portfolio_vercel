import { useEffect, useRef, useState } from "react";
import { Clock, Kit, Doc, Building } from "@/lib/icons";

type Stat = { value: number; suffix?: string; label: string; Icon: typeof Clock };

const STATS: Stat[] = [
  { value: 27, suffix: "+", label: "Years of Experience", Icon: Clock },
  { value: 7500, suffix: "+", label: "GI Surgeries", Icon: Kit },
  { value: 20, suffix: "+", label: "Research Publications", Icon: Doc },
  { value: 8, label: "Consulting Hospitals", Icon: Building },
];

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fmt = (n: number) => n.toLocaleString("en-IN");

    const run = () => {
      if (done.current) return;
      done.current = true;
      if (reduce) return setDisplay(fmt(value));
      const dur = 1800;
      const start = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        setDisplay(fmt(Math.round(ease(p) * value)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            o.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div className="font-serif font-semibold text-[clamp(2.2rem,5vw,3.1rem)] leading-none text-white flex justify-center items-baseline">
      <span ref={ref}>{display}</span>
      {suffix ? <i className="not-italic text-emerald-glow ml-[2px]">{suffix}</i> : null}
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative text-[#eaf3f1] py-[clamp(3rem,6vw,4.5rem)] bg-navy isolate" id="stats">
      {/* Background */}
      <div
        className="absolute inset-0 -z-[1]"
        style={{
          background: `
            radial-gradient(60% 120% at 85% 110%, rgba(31,184,134,.18), transparent 60%),
            radial-gradient(rgba(255,255,255,.05) 1.5px, transparent 1.5px) 0 0/30px 30px,
            linear-gradient(180deg, #0c2c52, #0a2342)
          `,
        }}
        aria-hidden
      />

      <div className="w-[min(100%-2.4rem,1180px)] mx-auto grid grid-cols-4 gap-[1.2rem] text-center max-[980px]:grid-cols-2 max-[980px]:gap-[.6rem]">
        {STATS.map(({ value, suffix, label, Icon }, i) => (
          <div
            className={`reveal py-[1.4rem] px-4 rounded-[18px] relative ${
              i < 3
                ? `after:content-[''] after:absolute after:-right-[.6rem] after:top-[22%] after:bottom-[22%] after:w-px after:bg-white/12 ${
                    i === 1 ? "max-[980px]:after:hidden" : ""
                  }`
                : ""
            }`}
            key={label}
            data-reveal-delay={i * 80}
          >
            <div className="w-[54px] h-[54px] mx-auto mb-4 rounded-[15px] grid place-items-center bg-emerald-glow/12 border border-emerald-glow/25 text-emerald-glow">
              <Icon className="ico w-[26px] h-[26px]" />
            </div>
            <Counter value={value} suffix={suffix} />
            <div className="mt-[.6rem] text-[.85rem] font-semibold tracking-[.04em] uppercase text-[#a7c0c9]">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
