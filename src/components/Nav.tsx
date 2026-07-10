import { useEffect, useRef, useState } from "react";
import { Pin, Phone } from "@/lib/icons";
import { CLINIC_NAME, DOCTOR_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const LINKS = [
  ["About", "#about"],
  ["Patient Care", "#patient-care"],
  ["Specialities", "#specialities"],
  ["Conditions", "#conditions"],
  ["Hospitals", "#hospitals"],
  ["Reviews", "#reviews"],
  ["Contact", "#contact"],
] as const;

/** Below this width the inline links collapse into the drawer menu. */
const EASE = { transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" } as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const drawerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Removed IntersectionObserver for showBrand as logo is now always visible and shrinks dynamically

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

  /* Drawer behaviour: lock body scroll, close on Escape, move focus in/out. */
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Wait for the drawer's visibility to flip before moving focus into it.
    const focusTimer = window.setTimeout(() => {
      drawerRef.current?.querySelector<HTMLElement>("a")?.focus();
    }, 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[900] transition-all duration-400 ${
          scrolled
            ? "bg-white/90 backdrop-blur-[16px] backdrop-saturate-[150%] shadow-[0_10px_35px_-15px_rgba(10,35,66,0.12)] border-b border-navy/5"
            : ""
        }`}
        style={EASE}
        id="nav"
      >
        {/* Top strip */}
        <div
          className={`overflow-hidden transition-all duration-400 ${
            scrolled ? "max-h-0 opacity-0 -mt-2" : "max-h-[42px] opacity-100"
          }`}
          style={EASE}
          aria-hidden={scrolled}
          // Keep the collapsed strip out of the tab order for keyboard/AT users.
          inert={scrolled}
        >
          <div className="w-[min(100%-2.4rem,1380px)] mx-auto flex items-center gap-[.9rem] justify-end py-[.35rem] text-white text-[0.88rem] font-bold">
            {/* NOTE: the Jotform widget injects unlayered CSS with Tailwind-colliding class
                names (.hidden/.flex/.inline-flex) that beats our layered utilities, so
                display toggles here must use media-variant classes on BOTH sides. */}
            <span className="max-[420px]:hidden min-[421px]:inline-flex items-center gap-[.4rem]">
              <Pin className="ico text-emerald-glow w-[14px] h-[14px]" />
              {CLINIC_NAME}, Choolaimedu
            </span>
            <span className="max-[420px]:hidden w-px h-[14px] bg-white/22" />
            <a
              className="inline-flex items-center gap-[.4rem] transition-colors duration-250 hover:text-white"
              href={`tel:${PHONE_TEL}`}
            >
              <Phone className="ico text-emerald-glow w-[14px] h-[14px]" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        {/* Main nav */}
        <div
          className={`w-[min(100%-2.4rem,1600px)] mx-auto flex xl:grid justify-between xl:justify-normal xl:grid-cols-[1fr_auto_1fr] items-center gap-6 transition-all duration-400 ${
            scrolled ? "py-[10px]" : "py-[16px]"
          }`}
          style={EASE}
        >
          {/* Brand — visible with dynamic scaling and theme transition on scroll */}
          <a
            href="#home"
            className="flex items-center gap-[0.85rem] transition-all duration-400 hover:scale-[1.01] xl:justify-self-start"
            style={EASE}
            aria-label={`${DOCTOR_NAME} — home`}
          >
            <div
              className={`relative aspect-[457/128] shrink-0 transition-all duration-400 ${
                scrolled ? "h-[46px] sm:h-[54px] xl:h-[65px]" : "h-[54px] sm:h-[72px] xl:h-[98px]"
              }`}
              style={EASE}
            >
              {/* Transparent white logo over the dark hero (using CSS filter); colored logo once the bar turns white on scroll */}
              <img
                src="/brand/logo.png"
                alt={CLINIC_NAME}
                width="457"
                height="128"
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-400 ${
                  scrolled ? "brightness-100 invert-0" : "brightness-0 invert"
                }`}
              />
            </div>
            <span
              className={`font-serif font-bold tracking-wide whitespace-nowrap transition-all duration-400 max-[480px]:hidden ${
                scrolled
                  ? "text-navy text-[1.15rem] opacity-100 translate-x-0"
                  : "text-white text-[1.35rem] opacity-0 -translate-x-2 pointer-events-none"
              }`}
              style={EASE}
            >
              {DOCTOR_NAME}
            </span>
          </a>

          {/* Desktop navbar menu */}
          <nav
            className="hidden xl:flex items-center gap-[.35rem] xl:justify-self-center xl:-translate-x-[60px]"
            aria-label="Primary"
          >
            {LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className={`
                  relative font-bold text-[1.06rem] py-2 px-[0.8rem] rounded-lg
                  transition-colors duration-250 cursor-pointer whitespace-nowrap
                  ${scrolled ? "text-muted hover:text-navy" : "text-white/90 hover:text-white"}
                  ${active === href.slice(1) ? (scrolled ? "!text-navy" : "!text-white") : ""}
                  after:content-[''] after:absolute after:left-[0.8rem] after:right-[0.8rem]
                  after:bottom-[0.32rem] after:h-[2px] after:bg-emerald-glow after:rounded-sm
                  after:origin-left after:transition-transform after:duration-300
                  ${active === href.slice(1) ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}
                `}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-[.8rem] xl:justify-self-end">
            <a
              href="#contact"
              className="
                max-xl:hidden xl:inline-flex items-center gap-[0.55rem] font-sans font-bold text-[0.92rem]
                py-[0.75rem] px-[1.3rem] rounded-full border border-transparent
                bg-gradient-to-br from-emerald-2 to-teal text-white
                shadow-[0_14px_30px_-12px_rgba(21,151,106,0.5)]
                hover:-translate-y-[3px] hover:shadow-[0_22px_42px_-14px_rgba(21,151,106,0.65)]
                transition-all duration-350 whitespace-nowrap leading-none cursor-pointer
              "
              style={EASE}
            >
              Book Appointment
            </a>
            <button
              ref={burgerRef}
              className="max-xl:flex xl:hidden flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-[6px]"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="navLinks"
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`w-6 h-[2px] rounded-sm transition-all duration-300 ${
                  scrolled || open ? "bg-navy" : "bg-white"
                } ${open ? "translate-y-[7px] rotate-45 !bg-white" : ""}`}
                style={EASE}
              />
              <span
                className={`w-6 h-[2px] rounded-sm transition-all duration-300 ${
                  scrolled ? "bg-navy" : "bg-white"
                } ${open ? "opacity-0" : ""}`}
                style={EASE}
              />
              <span
                className={`w-6 h-[2px] rounded-sm transition-all duration-300 ${
                  scrolled || open ? "bg-navy" : "bg-white"
                } ${open ? "-translate-y-[7px] -rotate-45 !bg-white" : ""}`}
                style={EASE}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Sibling to header to avoid backdrop-filter containers clipping fixed drawers) */}
      <div
        className={`hidden max-xl:block fixed inset-0 z-[940] bg-navy/45 backdrop-blur-[2px] transition-all duration-400 ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <nav
        ref={drawerRef}
        className={`hidden max-xl:flex max-xl:flex-col max-xl:items-center max-xl:justify-start max-xl:fixed max-xl:inset-y-0 max-xl:right-0 max-xl:left-auto max-xl:w-[min(85%,320px)] max-xl:pt-[90px] max-xl:overflow-y-auto max-xl:gap-4 max-xl:bg-navy max-xl:p-8 max-xl:transition-[transform,visibility] max-xl:duration-400 z-[950] ${
          open ? "max-xl:translate-x-0 max-xl:visible" : "max-xl:translate-x-full max-xl:invisible"
        }`}
        style={EASE}
        id="navLinks"
        aria-label="Mobile Navigation"
      >
        {LINKS.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className={`
              relative font-bold text-[1.15rem] py-2 px-[0.8rem] rounded-lg
              transition-colors duration-250 cursor-pointer whitespace-nowrap
              text-[#eaf3f1]/90 hover:text-white
              ${active === href.slice(1) ? "!text-emerald-glow" : ""}
            `}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}

        {/* Booking CTA inside the drawer (phones/tablets only) */}
        <a
          href="#contact"
          className="
            max-xl:inline-flex xl:hidden items-center justify-center gap-[.55rem]
            font-sans font-bold text-[1rem] mt-4 w-full
            py-[.85rem] px-[1.3rem] rounded-full border border-transparent
            bg-gradient-to-br from-emerald-2 to-teal text-white text-center
            shadow-[0_14px_30px_-12px_rgba(21,151,106,.7)] leading-none cursor-pointer
          "
          onClick={() => setOpen(false)}
        >
          Book Appointment
        </a>
      </nav>
    </>
  );
}
