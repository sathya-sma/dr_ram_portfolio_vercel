import { ArrowRight, Phone, CheckMini } from "@/lib/icons";

export default function Hero() {
  return (
    <section
      className="relative min-h-[100svh] flex items-center py-28 pb-16 text-[#eaf3f1] overflow-hidden"
      style={{
        background: "radial-gradient(120% 120% at 80% 0%, #103862 0%, #0a2342 55%, #081c38 100%)",
      }}
      id="home"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 z-0" aria-hidden>
        {/* Blob 1 */}
        <span
          className="absolute w-[460px] h-[460px] rounded-full blur-[60px] opacity-55 animate-float -top-[120px] -right-[80px]"
          style={{ background: "radial-gradient(circle, #1fb886, transparent 70%)" }}
        />
        {/* Blob 2 */}
        <span
          className="absolute w-[520px] h-[520px] rounded-full blur-[60px] opacity-55 animate-float -bottom-[180px] -left-[120px]"
          style={{
            background: "radial-gradient(circle, #1b5faa, transparent 70%)",
            animationDelay: "-6s",
          }}
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
      </div>

      {/* Content */}
      <div className="relative z-[2] w-[min(100%-2.4rem,1180px)] mx-auto grid grid-cols-[1.15fr_.85fr] gap-12 items-center max-[980px]:grid-cols-1 max-[980px]:gap-10">
        <div>
          <p className="reveal inline-flex items-center gap-[.55rem] font-bold text-[.82rem] tracking-[.14em] uppercase text-emerald-glow bg-emerald-glow/10 border border-emerald-glow/25 py-[.45rem] px-[.9rem] rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-glow shadow-[0_0_0_4px_rgba(47,214,160,.2)]" />
            Consultant Gastrointestinal Surgeon
          </p>

          <h1 className="reveal font-serif font-semibold leading-[1.02] tracking-tight text-[clamp(2.6rem,6vw,4.5rem)] mt-[1.1rem] text-white" data-reveal-delay="60">
            Dr T Ramkumar
          </h1>

          <p className="reveal font-semibold text-[#9fc7d6] mt-[.4rem] text-[clamp(.95rem,2vw,1.15rem)]" data-reveal-delay="120">
            Laparoscopic &amp; Robotic Cancer Surgeon
          </p>

          <h2 className="reveal font-serif font-medium text-[clamp(1.6rem,3.6vw,2.6rem)] leading-[1.12] mt-[1.4rem] text-[#eef6f4]" data-reveal-delay="180">
            Surgical Excellence,
            <br />
            <span className="bg-gradient-to-r from-emerald-glow via-[#7fe3c4] to-[#aee9ff] bg-clip-text text-transparent">
              Personalised Care.
            </span>
          </h2>

          <p className="reveal max-w-[46ch] mt-[1.4rem] text-[#c4d6dd] text-[1.04rem]" data-reveal-delay="240">
            Gastrointestinal Surgeon with over <strong className="text-white">27 years</strong> of expertise in the
            safe management of benign and malignant gastrointestinal conditions. A pioneer in
            minimally invasive — Laparoscopic and Robotic — gastrointestinal surgery in Tamil
            Nadu, trusted by patients across India and internationally.
          </p>

          <div className="reveal flex flex-wrap gap-[.9rem] mt-8" data-reveal-delay="300">
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
              style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
            >
              Book an Appointment
              <ArrowRight className="ico w-[18px] h-[18px] shrink-0" />
            </a>
            <a
              href="tel:04448134300"
              className="
                inline-flex items-center gap-[.55rem] font-sans font-bold text-[.98rem]
                py-[.95rem] px-[1.6rem] rounded-full
                bg-white/6 text-[#eaf4f1] border border-white/28 backdrop-blur-[6px]
                hover:bg-white/14 hover:-translate-y-[3px]
                transition-all duration-350 whitespace-nowrap leading-none cursor-pointer
              "
              style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
            >
              <Phone className="ico w-[18px] h-[18px] shrink-0" />
              Call 044 4813 4300
            </a>
          </div>

          <ul className="reveal list-none flex flex-wrap gap-2 mt-[2.2rem] p-0" data-reveal-delay="360">
            {["Esophagus & Stomach", "Liver & Pancreas", "Colorectal", "HPB Surgery"].map((c) => (
              <li
                key={c}
                className="text-[.82rem] font-semibold text-[#bcd3da] border border-white/16 rounded-full py-[.35rem] px-[.85rem] bg-white/4"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Portrait */}
        <div className="reveal flex justify-center max-[980px]:order-first max-[980px]:max-w-[320px] max-[980px]:mx-auto" data-reveal-delay="200">
          <div className="relative w-[min(100%,380px)]">
            <div className="relative rounded-[30px] overflow-hidden shadow-[0_40px_80px_-28px_rgba(10,35,66,.45)] border border-white/12 aspect-[5/6]">
              <svg
                className="w-full h-full block"
                viewBox="0 0 400 480"
                role="img"
                aria-label="Professional portrait placeholder of Dr T Ramkumar"
              >
                <defs>
                  <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#163a5f" />
                    <stop offset="1" stopColor="#0a2342" />
                  </linearGradient>
                </defs>
                <rect width="400" height="480" fill="url(#pg)" />
                <circle cx="200" cy="186" r="74" fill="#28557d" />
                <path d="M86 470c0-72 51-118 114-118s114 46 114 118z" fill="#28557d" />
                <circle cx="200" cy="186" r="74" fill="none" stroke="#2fd6a0" strokeOpacity=".5" strokeWidth="2" />
              </svg>
              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 rounded-[30px] shadow-[inset_0_-90px_80px_-50px_rgba(8,28,56,.9)]" />
            </div>

            {/* Experience badge */}
            <div className="absolute -left-[22px] bottom-[42px] z-[3] bg-white text-navy rounded-[18px] py-[.85rem] px-[1.1rem] flex items-center gap-[.7rem] shadow-[0_18px_50px_-20px_rgba(16,56,98,.28)] animate-float-y">
              <span className="font-serif font-bold text-[2.1rem] leading-none text-teal">
                27<span className="text-emerald-2">+</span>
              </span>
              <span className="text-[.72rem] font-bold uppercase tracking-[.06em] text-muted leading-[1.2]">
                Years of<br />Experience
              </span>
            </div>

            {/* Floating pills */}
            <div
              className="absolute -right-[14px] top-[34px] z-[3] flex items-center gap-[.4rem] bg-white/95 text-navy font-bold text-[.8rem] py-[.45rem] px-[.8rem] rounded-full shadow-[0_4px_18px_rgba(16,56,98,.07)] animate-float-y-slow"
              style={{ animationDelay: "-1.5s" }}
            >
              <CheckMini className="ico w-[15px] h-[15px] text-emerald" style={{ strokeWidth: 2.2 }} />
              Robotic Surgery
            </div>
            <div
              className="absolute -right-[26px] top-[96px] z-[3] flex items-center gap-[.4rem] bg-white/95 text-navy font-bold text-[.8rem] py-[.45rem] px-[.8rem] rounded-full shadow-[0_4px_18px_rgba(16,56,98,.07)] animate-float-y-slow"
              style={{ animationDelay: "-3.5s" }}
            >
              <CheckMini className="ico w-[15px] h-[15px] text-emerald" style={{ strokeWidth: 2.2 }} />
              7,500+ Surgeries
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#stats"
        className="absolute bottom-[1.4rem] left-1/2 -translate-x-1/2 z-[3] w-[26px] h-[42px] border-2 border-white/35 rounded-[14px] flex justify-center pt-[7px]"
        aria-label="Scroll down"
      >
        <span className="w-[3px] h-[9px] rounded-[3px] bg-emerald-glow animate-scrolldot" />
      </a>
    </section>
  );
}
