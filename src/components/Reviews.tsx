import { useEffect } from "react";

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
            <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-6">
              <div className="max-w-[800px]">
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
