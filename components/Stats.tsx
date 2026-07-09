"use client";
import { useEffect, useRef, useState } from "react";
import { Clock, Kit, Doc, Building } from "@/lib/icons";

type Stat = { value: number; suffix?: string; label: string; Icon: typeof Clock };

const STATS: Stat[] = [
  { value: 27, suffix: "+", label: "Years of Experience", Icon: Clock },
  { value: 7500, suffix: "+", label: "Gastrointestinal Surgeries", Icon: Kit },
  { value: 20, suffix: "+", label: "Research Publications", Icon: Doc },
  { value: 5, label: "Senior Consultant Roles", Icon: Building },
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
    <div className="stat__num">
      <span ref={ref}>{display}</span>
      {suffix ? <i>{suffix}</i> : null}
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats" id="stats">
      <div className="stats__bg" aria-hidden />
      <div className="stats__inner">
        {STATS.map(({ value, suffix, label, Icon }, i) => (
          <div className="stat reveal" key={label} data-reveal-delay={i * 80}>
            <div className="stat__icon">
              <Icon />
            </div>
            <Counter value={value} suffix={suffix} />
            <div className="stat__label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
