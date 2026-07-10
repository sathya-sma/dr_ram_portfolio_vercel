import { REVIEW_URL } from "@/lib/site";

function GoogleG({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{ flex: "none" }}>
      <path fill="#4285F4" d="M22.5 12.2c0-.7-.06-1.4-.18-2.06H12v3.9h5.9a5.04 5.04 0 0 1-2.18 3.3v2.74h3.52c2.06-1.9 3.26-4.7 3.26-7.88Z" />
      <path fill="#34A853" d="M12 23c2.94 0 5.4-.97 7.2-2.63l-3.52-2.73c-.97.65-2.22 1.04-3.68 1.04-2.83 0-5.23-1.9-6.08-4.48H2.28v2.82A10.86 10.86 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.92 14.2a6.5 6.5 0 0 1 0-4.18V7.2H2.28a10.86 10.86 0 0 0 0 9.82l3.64-2.82Z" />
      <path fill="#EA4335" d="M12 5.34c1.6 0 3.03.55 4.16 1.62l3.1-3.1A10.45 10.45 0 0 0 12 1 10.86 10.86 0 0 0 2.28 7.2l3.64 2.82C6.77 7.44 9.17 5.34 12 5.34Z" />
    </svg>
  );
}

const TESTIMONIALS = [
  {
    initial: "S",
    name: "Sathya",
    quote:
      "Underwent a laparoscopic gallbladder surgery. Clear explanation, painless recovery and I was home in two days. Deeply grateful to Dr Ramkumar and team.",
  },
  {
    initial: "P",
    name: "Priya",
    quote:
      "My father had complex pancreatic surgery. Dr Ramkumar's calm confidence and the multidisciplinary planning gave our family real peace of mind.",
  },
  {
    initial: "S",
    name: "Suresh",
    quote:
      "Robotic hernia repair with minimal pain and a tiny scar. Honest advice, no unnecessary procedures, and wonderful follow-up care. Highly recommend.",
  },
];

export default function Reviews() {
  return (
    <section className="py-[clamp(3.2rem,6vw,5.5rem)] relative" id="reviews">
      <div className="w-[min(100%-2.4rem,1180px)] mx-auto">
        <div
          className="reveal relative overflow-hidden rounded-[28px] p-[clamp(2.2rem,5vw,4rem)] text-[#eaf4f2]"
          style={{
            background: "radial-gradient(120% 140% at 90% -20%, #13485f, #0b2a39)",
          }}
        >
          {/* Glow */}
          <span
            className="absolute -top-[80px] -right-[40px] w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(54,214,180,.22), transparent 70%)" }}
            aria-hidden
          />

          <div className="relative grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[clamp(2rem,4vw,3.5rem)] items-center">
            {/* Left column */}
            <div>
              <p className="text-[.78rem] font-bold tracking-[.16em] uppercase text-[#7fe3cf] mb-[.9rem]">
                Patient Reviews
              </p>
              <h2 className="font-serif font-medium text-[clamp(1.7rem,3.4vw,2.6rem)] text-white m-0 mb-[1.1rem] leading-[1.12] tracking-tight">
                Your experience helps others heal
              </h2>
              <p className="text-[1rem] text-[#bcd4cf] m-0 mb-[1.7rem] max-w-[460px]">
                If you have consulted Dr. T. Ramkumar, we kindly request you to share your
                valuable feedback. Your review will greatly help others seeking quality medical
                care.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-[.7rem] bg-white text-[#0c2a37]
                    text-[.97rem] font-bold py-[.9rem] px-[1.6rem] rounded-[13px]
                    shadow-[0_16px_34px_-16px_rgba(0,0,0,.5)]
                    hover:-translate-y-[3px] hover:shadow-[0_22px_40px_-16px_rgba(0,0,0,.6)]
                    transition-all duration-250 no-underline
                  "
                  style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
                >
                  <GoogleG />
                  Leave a Google Review
                </a>
                <a
                  href={REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[.92rem] font-semibold text-[#bcd4cf] underline underline-offset-4 transition-colors duration-250 hover:text-white"
                >
                </a>
              </div>
            </div>

            {/* Review cards */}
            <div className="flex flex-col gap-4">
              <p className="m-0 text-[.78rem] font-bold tracking-[.1em] uppercase text-[#7fe3cf]/80">
                From patients on Google
              </p>
              {TESTIMONIALS.map((t, i) => (
                <figure
                  className="
                    reveal m-0 bg-white/7 border border-white/12 rounded-[18px]
                    py-[1.35rem] px-[1.5rem] backdrop-blur-[4px]
                    transition-all duration-350
                    hover:translate-x-[6px] hover:bg-white/11 hover:border-[rgba(54,214,180,.35)]
                  "
                  style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
                  key={t.name}
                  data-reveal-delay={i * 90}
                >
                  <div className="text-[#ffc857] tracking-[2px] text-[.95rem] mb-[.6rem]" aria-label="5 out of 5 stars">
                    ★★★★★
                  </div>
                  <blockquote className="m-0 mb-[.9rem] text-[.95rem] leading-[1.6] text-[#e3efec]">
                    {t.quote}
                  </blockquote>
                  <figcaption className="flex items-center gap-[.7rem]">
                    <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-[#1aa48d] text-white font-bold text-[.85rem]">
                      {t.initial}
                    </span>
                    <span className="text-[.9rem] font-bold text-white flex-1">{t.name}</span>
                    <GoogleG size={14} />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
