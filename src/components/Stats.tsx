import { useEffect, useRef, useState } from "react";
import { Clock, Kit, Doc, Building } from "@/lib/icons";

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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div className="font-serif font-extrabold text-[clamp(2.2rem,4.5vw,3rem)] leading-none text-navy flex items-baseline">
      <span ref={ref}>{display}</span>
      {suffix ? <i className="not-italic text-teal ml-[2px]">{suffix}</i> : null}
    </div>
  );
}

const EASE = { transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" } as const;

export default function Stats() {
  return (
    <section className="relative py-[clamp(2.5rem,5.5vw,4.5rem)] bg-gradient-to-b from-[#eaf2f5]/40 to-[#f8fafc] border-y border-line" id="stats">
      <div className="w-[min(100%-2.4rem,1180px)] mx-auto">
        {/* Section Header */}
        <div className="reveal text-center mb-[clamp(2.2rem,4vw,3.2rem)]">
          <p className="inline-flex items-center gap-[.6rem] font-bold text-[.78rem] tracking-[.16em] uppercase text-teal">
            <span className="w-[26px] h-[2px] bg-[#1fb886] rounded-sm" /> Clinical Performance
          </p>
          <h2 className="font-serif font-semibold leading-[1.1] tracking-tight text-[clamp(1.8rem,3.8vw,2.6rem)] text-navy mt-[.9rem]">
            Surgical Precision, Measured Outcomes
          </h2>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1: 7,500+ GI Surgeries */}
          <div
            className="reveal bg-card border border-line rounded-[28px] p-6 lg:p-8 shadow-[0_4px_22px_rgba(16,56,98,0.02)] hover:shadow-[0_20px_45px_-12px_rgba(16,56,98,0.08)] hover:-translate-y-1.5 transition-all duration-500 lg:col-span-2 flex flex-col md:flex-row justify-between items-center gap-6 overflow-hidden group"
            style={EASE}
          >
            <div className="flex-1 w-full flex flex-col items-start">
              <div className="w-[48px] h-[48px] rounded-[16px] grid place-items-center bg-teal/8 border border-teal/15 text-teal shrink-0 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Kit className="ico w-[22px] h-[22px]" />
              </div>
              <Counter value={7500} suffix="+" />
              <div className="text-[.94rem] font-bold text-navy mt-2 leading-tight">
                Successful GI Surgeries
              </div>
              <div className="text-[.82rem] text-muted mt-1 max-w-[34ch] leading-relaxed">
                Specialized gastrointestinal, laparoscopic, colorectal, and hepatobiliary interventions.
              </div>
            </div>

            {/* Structured Column Chart showing volume trend */}
            <div className="w-full md:w-[240px] h-[75px] shrink-0 self-end overflow-visible select-none mt-2 md:mt-0 flex items-end justify-between px-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                <rect x="5" y="45" width="10" height="15" rx="3" fill="#e3ece9" className="transition-all duration-500 group-hover:fill-teal/40" />
                <rect x="30" y="38" width="10" height="22" rx="3" fill="#e3ece9" className="transition-all duration-500 group-hover:fill-teal/50" />
                <rect x="55" y="30" width="10" height="30" rx="3" fill="#1fb886" opacity="0.4" className="transition-all duration-500 group-hover:opacity-60" />
                <rect x="80" y="24" width="10" height="36" rx="3" fill="#1fb886" opacity="0.6" className="transition-all duration-500 group-hover:opacity-85" />
                <rect x="105" y="18" width="10" height="42" rx="3" fill="#0e7c8b" opacity="0.5" className="transition-all duration-500 group-hover:opacity-75" />
                <rect x="130" y="12" width="10" height="48" rx="3" fill="#0e7c8b" opacity="0.8" className="transition-all duration-500 group-hover:opacity-95" />
                <rect x="155" y="6" width="10" height="54" rx="3" fill="#1fb886" className="transition-all duration-500 group-hover:scale-y-105 origin-bottom" />
                <rect x="180" y="1" width="10" height="59" rx="3" fill="#0e7c8b" className="transition-all duration-500 group-hover:scale-y-105 origin-bottom" />
              </svg>
            </div>
          </div>

          {/* Card 2: 24+ Years of Experience */}
          <div
            className="reveal bg-card border border-line rounded-[28px] p-6 lg:p-8 shadow-[0_4px_22px_rgba(16,56,98,0.02)] hover:shadow-[0_20px_45px_-12px_rgba(16,56,98,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group overflow-hidden"
            style={EASE}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-[48px] h-[48px] rounded-[16px] grid place-items-center bg-teal/8 border border-teal/15 text-teal shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="ico w-[22px] h-[22px]" />
                </div>

              </div>
              <Counter value={24} suffix="+" />
              <div className="text-[.94rem] font-bold text-navy mt-2 leading-tight">
                Years of Experience
              </div>
              <div className="text-[.82rem] text-muted mt-1 leading-relaxed">
                More than two decades of dedicated expertise in complex surgical gastroenterology.
              </div>
            </div>

            {/* Clean Progress Slider metric */}
            <div className="mt-5 pt-4 border-t border-line/60">
              <div className="relative h-2 bg-[#eaf3f0] rounded-full flex items-center">
                {/* Active slider track */}
                <div className="absolute top-0 left-0 h-full w-[80%] bg-gradient-to-r from-[#1fb886] to-[#0e7c8b] rounded-full transition-all duration-500 group-hover:w-[85%]" />
                {/* Active thumb indicator */}
                <span className="absolute left-[80%] w-3.5 h-3.5 rounded-full bg-white border-2 border-teal shadow-md transition-all duration-500 group-hover:left-[85%] z-10" />
              </div>
              <div className="flex justify-between text-[0.6rem] font-bold text-muted mt-2 tracking-wide uppercase">
                <span>Start</span>
                <span className="text-teal font-extrabold">24+ Yrs</span>
              </div>
            </div>
          </div>

          {/* Card 3: Advanced Robotic Surgery */}
          <div
            className="reveal bg-gradient-to-br from-[#0c2237] to-[#071524] border border-[#1b354d] rounded-[28px] p-6 lg:p-8 shadow-[0_12px_36px_-10px_rgba(7,21,36,0.3)] hover:shadow-[0_24px_50px_-12px_rgba(7,21,36,0.45)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group overflow-hidden"
            style={EASE}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-[48px] h-[48px] rounded-[16px] grid place-items-center bg-[#2fd6a0]/8 border border-[#2fd6a0]/20 text-[#2fd6a0] shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2fd6a0] animate-pulse shadow-[0_0_8px_#2fd6a0]" />
                </div>
                <span className="py-0.5 px-2.5 rounded-full text-[0.66rem] font-bold bg-[#143224] text-[#2fd6a0] border border-[#1d4d35]">
                  Console Expert
                </span>
              </div>

              <div className="font-serif font-extrabold text-[clamp(2.2rem,4.5vw,3rem)] leading-none text-white flex items-baseline">
                Robotic
              </div>
              <div className="text-[.94rem] font-bold text-white mt-2 leading-tight">
                Advanced Robotic Surgery
              </div>
              <div className="text-[.82rem] text-[#8fa7be] mt-1 leading-relaxed">
                Minimally invasive keyhole procedures utilizing cutting-edge surgical consoles.
              </div>
            </div>

            {/* Circular Progress Gauge Dial */}
            <div className="mt-5 pt-4 border-t border-[#1b354d] flex justify-between items-center gap-4">
              <div className="text-[0.68rem] text-[#8fa7be] font-medium leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2fd6a0]" />
                  DaVinci Console
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2fd6a0]" />
                  100% Competency
                </div>
              </div>

            </div>
          </div>

          {/* Card 4: 20+ Research Publications */}
          <div
            className="reveal bg-card border border-line rounded-[28px] p-6 lg:p-8 shadow-[0_4px_22px_rgba(16,56,98,0.02)] hover:shadow-[0_20px_45px_-12px_rgba(16,56,98,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group overflow-hidden"
            style={EASE}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-[48px] h-[48px] rounded-[16px] grid place-items-center bg-teal/8 border border-teal/15 text-teal shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Doc className="ico w-[22px] h-[22px]" />
                </div>

              </div>
              <Counter value={20} suffix="+" />
              <div className="text-[.94rem] font-bold text-navy mt-2 leading-tight">
                Research Publications
              </div>
              <div className="text-[.82rem] text-muted mt-1 leading-relaxed">
                Active contributor to medical journals and international surgical conferences.
              </div>
            </div>

            {/* Segmented horizontal comparison progress bar */}
            <div className="mt-5 pt-4 border-t border-line/60 flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[0.65rem] text-muted font-bold">
                  <span>International Journals</span>
                  <span className="text-teal">12</span>
                </div>
                <div className="h-1.5 bg-[#eaf3f0] rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-teal rounded-full" />
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex justify-between text-[0.65rem] text-muted font-bold">
                  <span>National Reviews</span>
                  <span className="text-[#1fb886]">8</span>
                </div>
                <div className="h-1.5 bg-[#eaf3f0] rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-[#1fb886] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: 8 Consulting Hospitals */}
          <div
            className="reveal bg-card border border-line rounded-[28px] p-6 lg:p-8 shadow-[0_4px_22px_rgba(16,56,98,0.02)] hover:shadow-[0_20px_45px_-12px_rgba(16,56,98,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group overflow-hidden"
            style={EASE}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-[48px] h-[48px] rounded-[16px] grid place-items-center bg-teal/8 border border-teal/15 text-teal shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Building className="ico w-[22px] h-[22px]" />
                </div>

              </div>
              <Counter value={8} />
              <div className="text-[.94rem] font-bold text-navy mt-2 leading-tight">
                Consulting Hospitals
              </div>
              <div className="text-[.82rem] text-muted mt-1 leading-relaxed">
                Consulting across leading multi-speciality tertiary care centers in Chennai.
              </div>
            </div>

            {/* Waffle Chart grid visual overlay */}
            <div className="mt-5 pt-4 border-t border-line/60 flex flex-col justify-center">
              <div className="w-full h-8 overflow-visible flex items-center justify-between px-1">
                <svg className="w-full h-full text-line" viewBox="0 0 190 30" preserveAspectRatio="none">
                  {/* 10 nodes: 8 active (Teal/Emerald), 2 inactive */}
                  <circle cx="10" cy="15" r="5" fill="#0e7c8b" className="transition-all duration-300 group-hover:scale-125" />
                  <circle cx="30" cy="15" r="5" fill="#1fb886" className="transition-all duration-300 group-hover:scale-125" />
                  <circle cx="50" cy="15" r="5" fill="#0e7c8b" className="transition-all duration-300 group-hover:scale-125" />
                  <circle cx="70" cy="15" r="5" fill="#1fb886" className="transition-all duration-300 group-hover:scale-125" />
                  <circle cx="90" cy="15" r="5" fill="#0e7c8b" className="transition-all duration-300 group-hover:scale-125" />
                  <circle cx="110" cy="15" r="5" fill="#1fb886" className="transition-all duration-300 group-hover:scale-125" />
                  <circle cx="130" cy="15" r="5" fill="#0e7c8b" className="transition-all duration-300 group-hover:scale-125" />
                  <circle cx="150" cy="15" r="5" fill="#1fb886" className="transition-all duration-300 group-hover:scale-125" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

