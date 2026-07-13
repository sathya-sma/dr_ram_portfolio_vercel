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
    <div className="font-serif font-bold text-[2.8rem] leading-none text-navy flex justify-center items-baseline">
      <span ref={ref}>{display}</span>
      {suffix ? <i className="not-italic text-teal ml-[2px]">{suffix}</i> : null}
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-[3rem] bg-bg-2 isolate" id="stats">
      <div className="w-[min(100%-2.4rem,73.75rem)] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-[1.2rem] md:gap-[1.5rem] text-center">
        {STATS.map(({ value, suffix, label, Icon }, i) => (
          <div
            className="reveal py-[1.8rem] px-5 rounded-[22px] bg-card border border-line shadow-[0_10px_35px_-15px_rgba(16,56,98,.12)] relative hover:shadow-[0_18px_45px_-18px_rgba(16,56,98,.18)] transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center"
            key={label}
            data-reveal-delay={i * 80}
          >
            <div className="w-[54px] h-[54px] mb-4 rounded-[15px] grid place-items-center bg-teal/8 border border-teal/15 text-teal">
              <Icon className="ico w-[26px] h-[26px]" />
            </div>
            <Counter value={value} suffix={suffix} />
            <div className="mt-[.6rem] text-[.8rem] font-bold tracking-[.06em] uppercase text-muted leading-tight">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
