import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { CLINIC_NAME, DOCTOR_NAME } from "@/lib/site";

const LINKS = [
  ["About", "#about"],
  ["Patient Care", "#patient-care"],
  ["Specialities", "#specialities"],
  ["Conditions", "#conditions"],
  ["Gallery", "#gallery"],
  ["Hospitals", "#hospitals"],
  ["Reviews", "#reviews"],
  ["Contact", "#contact"],
] as const;

/**
 * The whole "compact on scroll" transform is driven by a single continuous
 * scroll-position value mapped across this range — nothing in this file
 * reads a boolean "scrolled" state or swaps Tailwind classes at a
 * threshold, so there is no frame where any property jumps. Every property
 * below is `useTransform`'d from the same spring-smoothed value, which is
 * what gives the whole bar a single, coherent, physically-damped motion
 * instead of a dozen independently-timed CSS transitions.
 */
const RANGE: [number, number] = [0, 90];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [pastHero, setPastHero] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // The drawer's open/closed slide is applied as an inline style (not a
  // Tailwind max-xl:translate-x-* class or an external @media rule) — both
  // were unreliable on at least one rendering surface this shipped to, and
  // an inline transform has no cascade/specificity/media-nesting ambiguity
  // to get wrong. isMobile mirrors the same <1280px breakpoint so the
  // transform is a no-op (`undefined`) on desktop, where the drawer isn't
  // used at all.
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 1280);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1280);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const prefersReducedMotion = useReducedMotion();

  // A hand-rolled scroll MotionValue instead of framer's useScroll(): kept
  // in sync via both the native 'scroll' event (instant in every real
  // browser) AND a rAF poll (belt-and-braces — some embedded/automated
  // viewports don't dispatch scroll events for programmatic scrolling, so
  // relying on the event alone can silently freeze the whole bar mid-state).
  const scrollY = useMotionValue(0);
  useEffect(() => {
    const update = () => scrollY.set(window.scrollY);
    update();
    window.addEventListener("scroll", update, { passive: true });
    let raf = requestAnimationFrame(function poll() {
      update();
      raf = requestAnimationFrame(poll);
    });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(raf);
    };
  }, [scrollY]);

  // Spring-smoothing is what turns "the bar tracks scroll position" into
  // "the bar settles into place like a physical object" — without it, every
  // derived value below would snap exactly to scroll offset, which reads as
  // mechanical even though it's technically continuous. Reduced-motion gets
  // a near-instant spring (still a MotionValue, so the code path is
  // identical) rather than a separate static render.
  const y = useSpring(scrollY, prefersReducedMotion ? { stiffness: 1000, damping: 100 } : { stiffness: 260, damping: 38, mass: 0.5 });

  // --- Floating card bar: compact slightly on scroll -----------------------
  const rowPaddingY = useTransform(y, RANGE, [10, 6]);
  const logoHeight = useTransform(y, RANGE, [48, 40]);
  const barShadow = useTransform(y, RANGE, [
    "0 2px 12px rgba(10,35,66,0.08), 0 1px 3px rgba(10,35,66,0.06)",
    "0 8px 32px rgba(10,35,66,0.16), 0 2px 8px rgba(10,35,66,0.1)",
  ]);

  // --- Liquid glass surface: heavy blur + saturation so whatever scrolls
  // underneath actually reads through the bar (that's the "liquid" part —
  // a flat translucent white is just a dimmer solid bar), gently deepening
  // as more page content passes behind it. -------------------------------
  const glassBlurPx = useTransform(y, RANGE, [18, 26]);
  const glassSaturate = useTransform(y, RANGE, [160, 180]);
  const glassBackdrop = useMotionTemplate`blur(${glassBlurPx}px) saturate(${glassSaturate}%)`;
  const glassBg = useTransform(y, RANGE, ["rgba(255,255,255,0.5)", "rgba(255,255,255,0.68)"]);

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

  // Track when user scrolls past the hero section
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setPastHero(!e.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
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
      <motion.header
        className="fixed inset-x-0 top-0 z-[900] px-4 pt-3"
        id="nav"
      >
        {/* Floating liquid-glass card */}
        <motion.div
          className="relative w-[min(100%,1600px)] mx-auto rounded-2xl overflow-hidden"
          style={{ boxShadow: barShadow }}
        >
          {/* Glass surface — heavy blur/saturate so page content actually
              shows through, tinted rather than a flat translucent white. */}
          <motion.div
            aria-hidden
            className="absolute inset-0 -z-20"
            style={{ backgroundColor: glassBg, backdropFilter: glassBackdrop, WebkitBackdropFilter: glassBackdrop }}
          />
          {/* Specular highlight — a soft diagonal sheen, like light catching
              the top-left of a curved glass surface. Purely decorative,
              never animated (a moving highlight reads as a loading shimmer,
              not glass). */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,.65) 0%, rgba(255,255,255,.22) 22%, rgba(255,255,255,0) 45%), radial-gradient(120% 180% at 15% -40%, rgba(255,255,255,.5), transparent 60%)",
            }}
          />
          {/* Glass edge lighting — bright hairline on top where light would
              catch the rim, soft dark hairline underneath for depth, plus a
              faint outer ring so the card reads as a solid object, not a
              flat cutout. All inset box-shadows: paint-only, no layout. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-2xl pointer-events-none"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,.85), inset 0 0 0 1px rgba(255,255,255,.4), inset 0 -1px 1px rgba(10,35,66,.05)",
            }}
          />

          {/* Main nav */}
          <motion.div
            className="w-full px-6 flex xl:grid justify-between xl:justify-normal xl:grid-cols-[1fr_auto_1fr] items-center gap-6"
            style={{ paddingTop: rowPaddingY, paddingBottom: rowPaddingY }}
          >
          {/* Brand */}
          <a
            href="#home"
            className="flex items-center gap-[0.85rem] transition-transform duration-300 hover:scale-[1.01] xl:justify-self-start"
            aria-label={`${DOCTOR_NAME} — home`}
          >
            <motion.div className="relative aspect-[457/128] shrink-0" style={{ height: logoHeight }}>
              <motion.img
                src="/brand/logo.png"
                alt={CLINIC_NAME}
                width="457"
                height="128"
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </motion.div>
            <span
              className="font-serif font-bold tracking-wide whitespace-nowrap max-[480px]:hidden [@media(min-width:1280px)_and_(max-width:1560px)]:hidden text-[1.2rem] text-[#0a2342]"
            >
              {DOCTOR_NAME}
            </span>
          </a>

          {/* Desktop navbar menu */}
          <nav
            className="flex items-center gap-[.35rem] xl:justify-self-center xl:-translate-x-[20px] max-xl:hidden"
            aria-label="Primary"
          >
            {LINKS.map(([label, href]) => {
              const isActive = active === href.slice(1);
              return (
                <a key={href} href={href} className="relative">
                  <span
                    className={`
                      block font-bold text-[1.06rem] py-2 px-[0.8rem] rounded-lg
                      [@media(min-width:1280px)_and_(max-width:1560px)]:text-[0.98rem]
                      [@media(min-width:1280px)_and_(max-width:1560px)]:px-[0.55rem]
                      cursor-pointer whitespace-nowrap transition-colors duration-200
                      ${isActive ? "text-[#0a2342]" : "text-[#5a6b7b] hover:text-[#0a2342]"}
                    `}
                  >
                    {label}
                  </span>
                  <motion.span
                    aria-hidden
                    className="absolute left-[0.8rem] right-[0.8rem] bottom-[0.32rem] h-[2px] bg-emerald-glow rounded-sm origin-left"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-[.8rem] xl:justify-self-end">
            <motion.a
              href="#contact"
              className="
                max-xl:hidden xl:inline-flex items-center gap-[0.55rem] font-sans font-bold text-[0.92rem]
                border border-transparent bg-gradient-to-br from-emerald-2 to-teal text-white
                whitespace-nowrap leading-none cursor-pointer
                py-[10px] px-[20px] rounded-full
                shadow-[0_14px_30px_-12px_rgba(21,151,106,0.5)]
                hover:-translate-y-[2px] hover:shadow-[0_22px_42px_-14px_rgba(21,151,106,0.65)]
                transition-[transform,box-shadow] duration-300
              "
              initial={false}
              animate={{
                opacity: pastHero ? 1 : 0,
                scale: pastHero ? 1 : 0.85,
                width: pastHero ? "auto" : 0,
                paddingLeft: pastHero ? 20 : 0,
                paddingRight: pastHero ? 20 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{ overflow: "hidden" }}
            >
              Book Appointment
            </motion.a>
            <button
              ref={burgerRef}
              className="max-xl:flex xl:hidden flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-[6px]"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="navLinks"
              onClick={() => setOpen((v) => !v)}
            >
              <motion.span
                className="w-6 h-[2px] rounded-sm"
                style={{ backgroundColor: open ? "#ffffff" : "#0a2342" }}
                animate={{ y: open ? 7 : 0, rotate: open ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
              <motion.span
                className="w-6 h-[2px] rounded-sm bg-[#0a2342]"
                animate={{ opacity: open ? 0 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
              <motion.span
                className="w-6 h-[2px] rounded-sm"
                style={{ backgroundColor: open ? "#ffffff" : "#0a2342" }}
                animate={{ y: open ? -7 : 0, rotate: open ? -45 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            </button>
          </div>
        </motion.div>
        </motion.div>
      </motion.header>

      {/* Mobile Drawer (Sibling to header to avoid backdrop-filter containers clipping fixed drawers) */}
      <div
        className={`hidden max-xl:block fixed inset-0 z-[940] bg-navy/45 backdrop-blur-[2px] transition-all duration-400 ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* `inert` (native attribute, not a Tailwind visibility utility) drops
          the closed drawer from focus/AT and hit-testing without needing a
          separate display/visibility toggle. The slide transform is inline
          (see isMobile above) rather than a Tailwind translate-x-* class or
          an external @media rule — both compile/resolve in ways that didn't
          reliably apply on at least one rendering surface this shipped to;
          an inline style has no cascade/specificity/media-nesting to get
          wrong, at the cost of one extra resize listener. */}
      <nav
        ref={drawerRef}
        inert={!open}
        className="hidden max-xl:flex max-xl:flex-col max-xl:items-center max-xl:justify-start max-xl:fixed max-xl:inset-y-0 max-xl:right-0 max-xl:left-auto max-xl:w-[min(85%,320px)] max-xl:pt-[90px] max-xl:overflow-y-auto max-xl:gap-4 max-xl:bg-navy max-xl:p-8 max-xl:transition-transform max-xl:duration-400 z-[950]"
        style={{
          transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
          transform: isMobile ? (open ? "translateX(0)" : "translateX(100%)") : undefined,
        }}
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
