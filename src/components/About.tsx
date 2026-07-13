import { useState, useEffect } from "react";
import { Stethoscope } from "@/lib/icons";

const ArrowLeft = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="ico" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" {...p}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ArrowRight = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="ico" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" {...p}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const SLIDES = [
  {
    src: "/brand/or-action.jpeg",
    alt: "Dr. T. Ramkumar performing laparoscopic surgery",
    label: "Laparoscopic Surgery",
  },
  {
    src: "/gallery/robotic-surgery-console.jpg",
    alt: "Dr. T. Ramkumar at the controls of the DaVinci robotic console",
    label: "Robotic Surgery Console",
  },
];

const EASE = { transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" } as const;

export default function About() {
  const [current, setCurrent] = useState(0);

  // Auto-slide effect every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-[clamp(1.8rem,3.5vw,2.8rem)] relative" id="about">
      <div className="w-[min(100%-2.4rem,1180px)] mx-auto grid grid-cols-[.9fr_1.1fr] gap-[clamp(2rem,5vw,4rem)] items-center max-[980px]:grid-cols-1">
        {/* Image Slider Container */}
        <div className="reveal relative group aspect-[4/3.4] w-full rounded-[26px] overflow-hidden shadow-[0_18px_50px_-20px_rgba(16,56,98,.28)]">
          {/* Decorative corner */}
          <div className="absolute -inset-x-0 -top-[14px] -left-[14px] w-[120px] h-[120px] rounded-[20px] bg-gradient-to-br from-emerald-2 to-teal opacity-18 -z-[1]" />
          
          {/* Slides */}
          <div className="w-full h-full relative">
            {SLIDES.map((slide, i) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === current ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
                }`}
              />
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border-0 p-0 cursor-pointer ${
                  i === current ? "bg-white w-6" : "bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrow Buttons (Visible on hover on desktop) */}
          <button
            onClick={() => setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-navy/60 hover:bg-navy/80 text-white flex items-center justify-center cursor-pointer transition-all duration-300 border-0 shadow-md md:opacity-0 md:group-hover:opacity-100"
            aria-label="Previous slide"
            style={EASE}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-navy/60 hover:bg-navy/80 text-white flex items-center justify-center cursor-pointer transition-all duration-300 border-0 shadow-md md:opacity-0 md:group-hover:opacity-100"
            aria-label="Next slide"
            style={EASE}
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Active Label Badge (Fades per slide) */}
          {SLIDES.map((slide, i) => (
            <div
              key={slide.label}
              className={`absolute left-[1.1rem] bottom-[1.1rem] flex items-center gap-2 bg-navy/82 backdrop-blur-[6px] text-[#eaf3f1] font-semibold text-[.82rem] py-[.55rem] px-[.9rem] rounded-full transition-all duration-500 ${
                i === current ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-2 pointer-events-none"
              }`}
              style={EASE}
            >
              <Stethoscope className="ico w-4 h-4 text-emerald-glow" />
              {slide.label}
            </div>
          ))}
        </div>

        {/* Copy */}
        <div>
          <p className="reveal inline-flex items-center gap-[.6rem] font-bold text-[.78rem] tracking-[.16em] uppercase text-teal">
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" /> About the Surgeon
          </p>
          <h2 className="reveal font-serif font-semibold leading-[1.1] tracking-tight text-[clamp(1.9rem,4vw,2.9rem)] text-navy mt-[.9rem]" data-reveal-delay="60">
            A surgeon&apos;s precision, a clinician&apos;s care
          </h2>
          <p className="reveal text-[1.15rem] text-ink mt-[1.3rem] font-medium" data-reveal-delay="120">
            Dr. T. Ramkumar is a highly experienced Surgical Gastroenterologist specialising in
            the comprehensive surgical management of diseases of the{" "}
            <strong className="text-teal">
              oesophagus, stomach, liver, pancreas, gallbladder, intestines, colon and rectum
            </strong>{" "}
            — with a strong emphasis on evidence-based care and patient safety.
          </p>
          <p className="reveal mt-4 text-muted" data-reveal-delay="160">
            He has extensive expertise in advanced laparoscopic and minimally invasive
            gastrointestinal surgery, enabling faster recovery, reduced pain and shorter hospital
            stays. His practice combines precision surgery, multidisciplinary planning and
            individualised treatment strategies for both benign and complex GI conditions.
          </p>
          <div className="reveal mt-[1.6rem] pt-[1.3rem] border-t border-line" data-reveal-delay="200">
            <span className="block font-serif text-[1.45rem] text-navy font-semibold">Dr. T. Ramkumar</span>
            <span className="text-[.9rem] text-muted font-semibold">
              Gastrointestinal Surgery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
