import { useEffect, useRef, useState } from "react";
import { Clock, Kit, Doc, Building } from "@/lib/icons";

type Stat = { value: number; suffix?: string; label: string; Icon: typeof Clock };

const STATS: Stat[] = [
  { value: 24, suffix: "+", label: "Years of Experience", Icon: Clock },
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
    <div className="font-serif font-semibold text-[clamp(2.1rem,4vw,2.7rem)] leading-none text-navy flex justify-center items-baseline">
      <span ref={ref}>{display}</span>
      {suffix ? <i className="not-italic text-teal ml-[3px]">{suffix}</i> : null}
    </div>
  );
}

const EASE = { transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" } as const;

export default function Stats() {
  return (
    <section className="relative py-[clamp(2.2rem,4.5vw,3.5rem)] bg-gradient-to-b from-[#eaf2f5] to-[#f8fafc] border-y border-line" id="stats">
      <div className="w-[min(100%-2.4rem,1180px)] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {STATS.map(({ value, suffix, label, Icon }, i) => (
          <div
            className="reveal bg-card border border-line rounded-[24px] py-8 px-6 shadow-[0_4px_22px_rgba(16,56,98,0.03)] hover:shadow-[0_16px_36px_-10px_rgba(16,56,98,0.11)] hover:-translate-y-1 transition-all duration-400 flex flex-col items-center justify-between"
            key={label}
            data-reveal-delay={i * 80}
            style={EASE}
          >
            <div className="w-[56px] h-[56px] mb-5 rounded-[18px] grid place-items-center bg-teal/10 border border-teal/20 text-teal">
              <Icon className="ico w-[26px] h-[26px]" />
            </div>
            
            <div className="flex-1 flex flex-col justify-center gap-[.45rem]">
              <Counter value={value} suffix={suffix} />
              <div className="text-[.82rem] font-bold tracking-[.06em] uppercase text-muted leading-tight">
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
