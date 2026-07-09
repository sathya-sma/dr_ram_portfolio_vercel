import { useEffect, useState } from "react";

const LINKS = [
  ["About", "#about"],
  ["Specialities", "#specialities"],
  ["Conditions", "#conditions"],
  ["Publications", "#publications"],
  ["Hospitals", "#hospitals"],
  ["Reviews", "#reviews"],
  ["Contact", "#contact"],
] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = LINKS.map(([, h]) => h.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e);
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((e) => spy.observe(e));
    return () => spy.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[900] transition-all duration-400 ${
        scrolled
          ? "bg-white/86 backdrop-blur-[14px] backdrop-saturate-[140%] shadow-[0_8px_30px_-18px_rgba(10,35,66,.5)] py-[.35rem]"
          : "py-2"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
      id="nav"
    >
      {/* Top strip */}
      <div
        className={`overflow-hidden transition-all duration-400 ${
          scrolled ? "max-h-0 opacity-0 -mt-2" : "max-h-[42px] opacity-100"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
        aria-hidden={scrolled}
      >
        <div className="w-[min(100%-2.4rem,1280px)] mx-auto flex items-center gap-[.9rem] justify-end py-[.35rem] text-white/82 text-[.8rem] font-semibold">
          <span className="inline-flex items-center gap-[.4rem]">
            <svg viewBox="0 0 24 24" className="ico text-emerald-glow" width="14" height="14">
              <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Chennai Speciality Clinic, Choolaimedu
          </span>
          <span className="w-px h-[14px] bg-white/22" />
          <a
            className="inline-flex items-center gap-[.4rem] transition-colors duration-250 hover:text-white"
            href="tel:04448134300"
          >
            <svg viewBox="0 0 24 24" className="ico text-emerald-glow" width="14" height="14">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            044 4813 4300
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="w-[min(100%-2.4rem,1280px)] mx-auto flex items-center justify-between gap-6">
        <a href="#home" className="flex items-center gap-[.7rem]" aria-label="Dr T Ramkumar — home">
          <img
            src="/brand/logo.png"
            alt="Chennai Speciality Clinic"
            className={`w-auto transition-all duration-400 ${scrolled ? "h-[34px]" : "h-[38px]"}`}
            style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
          />
          <span
            className={`font-serif font-semibold text-[1.15rem] tracking-wide whitespace-nowrap transition-colors duration-400 ${
              scrolled ? "text-navy" : "text-white"
            }`}
          >
            Dr. T. Ramkumar
          </span>
        </a>

        <nav
          className={`
            flex gap-[.35rem]
            max-[720px]:fixed max-[720px]:inset-y-0 max-[720px]:right-0 max-[720px]:left-auto
            max-[720px]:w-[min(78%,320px)] max-[720px]:flex-col max-[720px]:justify-center
            max-[720px]:gap-4 max-[720px]:bg-navy/97 max-[720px]:backdrop-blur-[10px]
            max-[720px]:p-8 max-[720px]:transition-transform max-[720px]:duration-400
            ${open ? "max-[720px]:translate-x-0" : "max-[720px]:translate-x-full"}
          `}
          style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
          id="navLinks"
          aria-label="Primary"
        >
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`
                relative font-semibold text-[.95rem] py-2 px-[.85rem] rounded-lg
                transition-colors duration-250 cursor-pointer
                max-[720px]:text-[#eaf3f1] max-[720px]:text-[1.1rem]
                ${scrolled ? "text-muted hover:text-navy" : "text-white/82 hover:text-white"}
                ${active === href.slice(1) ? (scrolled ? "!text-navy" : "!text-white") : ""}
                after:content-[''] after:absolute after:left-[.85rem] after:right-[.85rem]
                after:bottom-[.32rem] after:h-[2px] after:bg-emerald-glow after:rounded-sm
                after:origin-left after:transition-transform after:duration-300
                ${active === href.slice(1) ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}
              `}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-[.8rem]">
          <a
            href="#contact"
            className="
              max-[720px]:hidden
              inline-flex items-center gap-[.55rem] font-sans font-bold text-[.9rem]
              py-[.7rem] px-[1.15rem] rounded-full border border-transparent
              bg-gradient-to-br from-emerald-2 to-teal text-white
              shadow-[0_14px_30px_-12px_rgba(21,151,106,.7)]
              hover:-translate-y-[3px] hover:shadow-[0_22px_42px_-14px_rgba(21,151,106,.85)]
              transition-all duration-350 whitespace-nowrap leading-none cursor-pointer
            "
            style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
          >
            Book Appointment
          </a>
          <button
            className={`hidden max-[720px]:flex flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-[6px]`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`w-6 h-[2px] rounded-sm transition-all duration-300 ${
                scrolled ? "bg-navy" : "bg-white"
              } ${open ? "translate-y-[7px] rotate-45" : ""}`}
              style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
            />
            <span
              className={`w-6 h-[2px] rounded-sm transition-all duration-300 ${
                scrolled ? "bg-navy" : "bg-white"
              } ${open ? "opacity-0" : ""}`}
              style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
            />
            <span
              className={`w-6 h-[2px] rounded-sm transition-all duration-300 ${
                scrolled ? "bg-navy" : "bg-white"
              } ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
              style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
