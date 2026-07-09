import { useEffect } from "react";

/** Progressive enhancement: scroll-reveal + top progress bar. */
export default function SiteEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (reduce) {
      revealEls.forEach((el) => el.classList.add("is-in"));
    } else {
      const obs = new IntersectionObserver(
        (entries, o) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const d = Number((e.target as HTMLElement).dataset.revealDelay || 0);
            window.setTimeout(() => e.target.classList.add("is-in"), d);
            o.unobserve(e.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach((el) => obs.observe(el));
    }

    const bar = document.getElementById("scrollProgress");
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="scroll-progress" id="scrollProgress" aria-hidden />;
}
