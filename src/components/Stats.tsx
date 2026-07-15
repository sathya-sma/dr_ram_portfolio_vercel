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
              <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-[0.72rem] font-bold bg-[#e3fcf3] text-[#0f8b63] border border-[#bef3e1] mt-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1fb886] animate-pulse" />
                99.2% Success Rate
              </span>
            </div>
            
            <div className="w-full md:w-[260px] h-[100px] shrink-0 self-end overflow-visible select-none mt-2 md:mt-0 relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 260 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="spark-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1fb886" />
                    <stop offset="50%" stopColor="#0e7c8b" />
                    <stop offset="100%" stopColor="#1fb886" />
                  </linearGradient>
                  <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1fb886" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#1fb886" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 5,85 Q 40,82 70,68 T 130,62 T 190,38 T 250,15"
                  fill="none"
                  stroke="url(#spark-grad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-500 group-hover:stroke-[4px]"
                />
                <path
                  d="M 5,85 Q 40,82 70,68 T 130,62 T 190,38 T 250,15 L 250,100 L 5,100 Z"
                  fill="url(#spark-fill)"
                />
                <circle cx="250" cy="15" r="5.5" fill="#1fb886" className="animate-ping" />
                <circle cx="250" cy="15" r="4.5" fill="#0e7c8b" className="group-hover:scale-125 transition-transform duration-300" />
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
                <span className="py-0.5 px-2.5 rounded-full text-[0.66rem] font-bold bg-[#edf4fe] text-[#1b5faa] border border-[#d6e6fd]">
                  Since 2002
                </span>
              </div>
              <Counter value={24} suffix="+" />
              <div className="text-[.94rem] font-bold text-navy mt-2 leading-tight">
                Years of Experience
              </div>
              <div className="text-[.82rem] text-muted mt-1 leading-relaxed">
                More than two decades of dedicated expertise in complex surgical gastroenterology.
              </div>
            </div>
            
            <div className="mt-5 pt-4 border-t border-line/60">
              <div className="relative h-1.5 bg-[#eaf3f0] rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[92%] bg-gradient-to-r from-[#1fb886] to-[#0e7c8b] rounded-full transition-all duration-500 group-hover:w-[96%]" />
              </div>
              <div className="flex justify-between text-[0.62rem] font-bold text-muted mt-2 tracking-wide uppercase">
                <span>2002</span>
                <span>2014</span>
                <span className="text-teal font-extrabold">2026 (Present)</span>
              </div>
            </div>
          </div>

          {/* Card 3: Advanced Robotic Surgery (Tech Card) */}
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
                  Pioneer Tech
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

            <div className="mt-5 pt-4 border-t border-[#1b354d] flex justify-between items-center gap-4">
              <div className="text-[0.68rem] text-[#8fa7be] font-medium leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2fd6a0]" />
                  DaVinci System Expert
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2fd6a0]" />
                  Laparoscopic Specialist
                </div>
              </div>
              <div className="w-14 h-14 shrink-0 relative flex items-center justify-center">
                <svg className="absolute w-full h-full text-[#2fd6a0]/20" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="animate-[spin_40s_linear_infinite]" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="3" fill="#2fd6a0" className="animate-ping" />
                  <circle cx="50" cy="50" r="3" fill="#2fd6a0" />
                  <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                </svg>
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
                <span className="py-0.5 px-2.5 rounded-full text-[0.66rem] font-bold bg-[#fff7ed] text-[#c2410c] border border-[#ffedd5]">
                  Indexed
                </span>
              </div>
              <Counter value={20} suffix="+" />
              <div className="text-[.94rem] font-bold text-navy mt-2 leading-tight">
                Research Publications
              </div>
              <div className="text-[.82rem] text-muted mt-1 leading-relaxed">
                Active contributor to medical journals and international surgical conferences.
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-line/60 flex justify-between items-center gap-4">
              <div className="text-[0.68rem] text-muted font-medium leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  Clinical Studies
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1fb886]" />
                  Peer-Reviewed Papers
                </div>
              </div>
              <div className="w-12 h-12 shrink-0 relative flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e3ece9" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="url(#donut-grad)" strokeWidth="3.5"
                          strokeDasharray="80 20" strokeDashoffset="0"
                          className="transition-all duration-1000 ease-out group-hover:stroke-teal" />
                  <defs>
                    <linearGradient id="donut-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0e7c8b" />
                      <stop offset="100%" stopColor="#1fb886" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute text-[0.68rem] font-extrabold text-navy">80%</span>
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
                <span className="py-0.5 px-2.5 rounded-full text-[0.66rem] font-bold bg-[#f0fdf4] text-[#166534] border border-[#dcfce7]">
                  Chennai Network
                </span>
              </div>
              <Counter value={8} />
              <div className="text-[.94rem] font-bold text-navy mt-2 leading-tight">
                Consulting Hospitals
              </div>
              <div className="text-[.82rem] text-muted mt-1 leading-relaxed">
                Consulting across leading multi-speciality tertiary care centers in Chennai.
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-line/60 flex flex-col justify-center">
              <div className="w-full h-12 overflow-visible relative select-none">
                <svg className="w-full h-full text-line group-hover:text-teal/15 transition-colors duration-500" viewBox="0 0 200 60" preserveAspectRatio="none">
                  <line x1="20" y1="30" x2="60" y2="15" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="60" y1="15" x2="100" y2="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="100" y1="40" x2="140" y2="15" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="140" y1="15" x2="180" y2="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="20" y1="30" x2="70" y2="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="70" y1="45" x2="130" y2="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="130" y1="45" x2="180" y2="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  <circle cx="20" cy="30" r="4" fill="#0e7c8b" className="transition-all duration-300 group-hover:scale-125 group-hover:fill-[#1fb886]" />
                  <circle cx="60" cy="15" r="4" fill="#1fb886" className="transition-all duration-300 group-hover:scale-125 group-hover:fill-[#0e7c8b]" />
                  <circle cx="100" cy="40" r="4" fill="#0e7c8b" className="transition-all duration-300 group-hover:scale-125 group-hover:fill-[#1fb886]" />
                  <circle cx="140" cy="15" r="4" fill="#1fb886" className="transition-all duration-300 group-hover:scale-125 group-hover:fill-[#0e7c8b]" />
                  <circle cx="180" cy="35" r="4" fill="#0e7c8b" className="transition-all duration-300 group-hover:scale-125 group-hover:fill-[#1fb886]" />
                  <circle cx="70" cy="45" r="4" fill="#1fb886" className="transition-all duration-300 group-hover:scale-125 group-hover:fill-[#0e7c8b]" />
                  <circle cx="130" cy="45" r="4" fill="#0e7c8b" className="transition-all duration-300 group-hover:scale-125 group-hover:fill-[#1fb886]" />
                  <circle cx="110" cy="10" r="4" fill="#1fb886" className="transition-all duration-300 group-hover:scale-125 group-hover:fill-[#0e7c8b]" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

