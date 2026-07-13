import { useEffect } from "react";
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

export default function Reviews() {
  useEffect(() => {
    // Check if script is already present to prevent duplicate injections
    const existingScript = document.querySelector(
      'script[src="https://www.jotform.com/website-widgets/embed/019f4ac884b870008e8cc5bebea7c963548d"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.jotform.com/website-widgets/embed/019f4ac884b870008e8cc5bebea7c963548d";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-[clamp(1.8rem,3.5vw,2.8rem)] relative" id="reviews">
      <div className="w-[min(100%-2.4rem,1180px)] mx-auto">
        <div
          className="reveal relative overflow-hidden rounded-[28px] pt-[clamp(2.2rem,5vw,4rem)] px-[clamp(2.2rem,5vw,4rem)] pb-4 text-[#eaf4f2]"
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

          <div className="relative flex flex-col gap-8">
            {/* Header / Intro info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div className="max-w-[620px]">
                <p className="text-[.78rem] font-bold tracking-[.16em] uppercase text-[#7fe3cf] mb-[.9rem]">
                  Patient Reviews
                </p>
                <h2 className="font-serif font-medium text-[clamp(1.7rem,3.4vw,2.6rem)] text-white m-0 mb-[1.1rem] leading-[1.12] tracking-tight">
                  Your experience helps others heal
                </h2>
                <p className="text-[1.05rem] text-[#bcd4cf] m-0">
                  If you have consulted Dr. T. Ramkumar, we kindly request you to share your
                  valuable feedback. Your review will greatly help others seeking quality medical
                  care.
                </p>
              </div>
              <div className="flex items-center">
                <a
                  href={REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-[.7rem] bg-white text-[#0c2a37]
                    text-[.97rem] font-bold py-[.9rem] px-[1.6rem] rounded-[13px]
                    shadow-[0_16px_34px_-16px_rgba(0,0,0,.5)]
                    hover:-translate-y-[3px] hover:shadow-[0_22px_40px_-16px_rgba(0,0,0,.6)]
                    transition-all duration-250 no-underline whitespace-nowrap
                  "
                  style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
                >
                  <GoogleG />
                  Leave a Google Review
                </a>
              </div>
            </div>

            {/* Jotform Widget */}
            <div className="w-full min-h-0 [&_iframe]:!mb-0 [&_iframe]:!pb-0">
              <div id="JFWebsiteWidget-019f4ac884b870008e8cc5bebea7c963548d" className="w-full">
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-8 h-8 border-2 border-[#7fe3cf] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-[#bcd4cf]">Loading reviews from Google...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
