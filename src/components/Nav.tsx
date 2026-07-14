import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
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

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrollState, setScrollState] = useState<"hero" | "scrolled" | "floating">("hero");
  const drawerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 1280);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1280);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const prefersReducedMotion = useReducedMotion();

  // Scroll state detection:
  // - "hero" when scroll is near the top (0 - 60px)
  // - "scrolled" when scrolled down slightly, moving the initial navbar up/out of view
  // - "floating" when scrolled past 45% of viewport, bringing in the liquid glass navbar
  useEffect(() => {
    const update = () => {
      const scroll = window.scrollY;
      const threshold = window.innerHeight * 0.45;
      if (scroll > threshold) {
        setScrollState("floating");
      } else if (scroll > 60) {
        setScrollState("scrolled");
      } else {
        setScrollState("hero");
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    // Fallback animation frame loop for systems/browsers with slow/blocked scroll events
    let raf = requestAnimationFrame(function poll() {
      update();
      raf = requestAnimationFrame(poll);
    });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Intersection Observer for scroll spy
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

  // Drawer behavior: lock body scroll, close on Escape, move focus
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
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

  const isFloating = scrollState === "floating";

  // Framer Motion Transition Timing Config
  const navbarTransition = prefersReducedMotion
    ? { duration: 0.05 }
    : {
      type: "tween" as const,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: isFloating ? 0 : 0.1, // Delay container dissolve/exit so CTA can transition out first
    };

  // Main container state variants
  const navbarVariants = {
    hero: {
      y: 0,
      maxWidth: "1380px",
      backgroundColor: "rgba(255, 255, 255, 0)",
      borderWidth: "1px",
      borderColor: "rgba(255, 255, 255, 0)",
      boxShadow: "0 0px 0px rgba(0, 0, 0, 0), inset 0 0px 0px rgba(255, 255, 255, 0)",
      backdropFilter: "blur(0px) saturate(100%)",
      WebkitBackdropFilter: "blur(0px) saturate(100%)",
      paddingTop: "24px",
      paddingBottom: "24px",
      paddingLeft: "100px",
      paddingRight: "100px",
      borderRadius: "0px",
      opacity: 1,
    },
    scrolled: {
      y: -100, // Move upward out of the screen on scroll
      maxWidth: "1200px",
      backgroundColor: "rgba(255, 255, 255, 0)",
      borderWidth: "1px",
      borderColor: "rgba(255, 255, 255, 0)",
      boxShadow: "0 0px 0px rgba(0, 0, 0, 0), inset 0 0px 0px rgba(255, 255, 255, 0)",
      backdropFilter: "blur(0px) saturate(100%)",
      WebkitBackdropFilter: "blur(0px) saturate(100%)",
      paddingTop: "24px",
      paddingBottom: "24px",
      paddingLeft: "24px",
      paddingRight: "24px",
      borderRadius: "0px",
      opacity: 0, // Fade out as it slides up
    },
    floating: {
      y: 16,
      maxWidth: "1240px",
      backgroundColor: "rgba(255, 255, 255, 0.45)",
      borderWidth: "1px",
      borderColor: "rgba(255, 255, 255, 0.6)",
      boxShadow: "0 25px 50px -12px rgba(10, 35, 66, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 2px rgba(10, 35, 66, 0.03), 0 0 1px rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur(20px) saturate(190%)",
      WebkitBackdropFilter: "blur(20px) saturate(190%)",
      paddingTop: "12px",
      paddingBottom: "12px",
      paddingLeft: "32px",
      paddingRight: "32px",
      borderRadius: "24px",
      opacity: 1,
    },
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[900] px-4 pt-3 pointer-events-none"
        id="nav"
      >
        {/* Floating liquid-glass card */}
        <motion.div
          variants={navbarVariants}
          animate={scrollState}
          transition={navbarTransition}
          className="relative w-full mx-auto overflow-hidden pointer-events-auto border"
        >
          {/* Specular highlight (only visible when floating) */}
          <motion.div
            aria-hidden
            className="absolute inset-0 -z-10 pointer-events-none"
            animate={{ opacity: isFloating ? 1 : 0 }}
            transition={navbarTransition}
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,.65) 0%, rgba(255,255,255,.22) 22%, rgba(255,255,255,0) 45%), radial-gradient(120% 180% at 15% -40%, rgba(255,255,255,.5), transparent 60%)",
            }}
          />
          {/* Glass edge lighting (only visible when floating) */}
          <motion.div
            aria-hidden
            className="absolute inset-0 -z-10 pointer-events-none"
            animate={{
              opacity: isFloating ? 1 : 0,
              borderRadius: isFloating ? "24px" : "0px",
            }}
            transition={navbarTransition}
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,.85), inset 0 0 0 1px rgba(255,255,255,.4), inset 0 -1px 1px rgba(10,35,66,.05)",
            }}
          />

          {/* Main nav content layout */}
          <div className="w-full flex xl:grid justify-between xl:justify-normal xl:grid-cols-[1fr_auto_1fr] items-center gap-6">
            {/* Brand / Logo */}
            <a
              href="#home"
              className="flex items-center gap-[0.85rem] transition-transform duration-300 hover:scale-[1.01] xl:justify-self-start"
              aria-label={`${DOCTOR_NAME} — home`}
            >
              <motion.div
                className="relative aspect-[457/128] shrink-0"
                animate={{
                  height: isFloating ? 54 : 92,
                  x: isFloating ? 0 : -100,
                }}
                transition={navbarTransition}
              >
                {/* White Logo (Initial Hero State) */}
                <motion.img
                  src="/brand/logo-white.png"
                  alt={CLINIC_NAME}
                  width="457"
                  height="128"
                  fetchPriority="high"
                  className="absolute inset-0 w-full h-full object-contain"
                  animate={{ opacity: isFloating ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Colored Logo (Floating Liquid Glass State) */}
                <motion.img
                  src="/brand/logo.png"
                  alt={CLINIC_NAME}
                  width="457"
                  height="128"
                  fetchPriority="high"
                  className="absolute inset-0 w-full h-full object-contain"
                  animate={{ opacity: isFloating ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.span
                className="font-serif font-bold tracking-wide whitespace-nowrap max-[480px]:hidden [@media(min-width:1280px)_and_(max-width:1560px)]:hidden text-[1.2rem]"
                animate={{ color: isFloating ? "#0a2342" : "#ffffff" }}
                transition={{ duration: 0.3 }}
              >
                {DOCTOR_NAME}
              </motion.span>
            </a>

            {/* Desktop navbar menu */}
            <motion.nav
              className="flex items-center gap-[.35rem] xl:justify-self-center max-xl:hidden"
              animate={{ x: isFloating ? 0 : 60 }}
              transition={navbarTransition}
              aria-label="Primary"
            >
              {LINKS.map(([label, href]) => {
                const isActive = active === href.slice(1);
                return (
                  <a key={href} href={href} className="relative">
                    <motion.span
                      className={`
                        block font-bold text-[1.06rem] py-2 px-[0.8rem] rounded-lg
                        [@media(min-width:1280px)_and_(max-width:1560px)]:text-[0.98rem]
                        [@media(min-width:1280px)_and_(max-width:1560px)]:px-[0.55rem]
                        cursor-pointer whitespace-nowrap
                      `}
                      animate={{
                        color: isFloating
                          ? (isActive ? "#0a2342" : "#5a6b7b")
                          : (isActive ? "#2fd6a0" : "rgba(255, 255, 255, 0.85)"),
                      }}
                      whileHover={{
                        color: isFloating ? "#0a2342" : "#ffffff",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {label}
                    </motion.span>
                    <motion.span
                      aria-hidden
                      className="absolute left-[0.8rem] right-[0.8rem] bottom-[0.32rem] h-[2px] rounded-sm origin-left"
                      animate={{
                        scaleX: isActive ? 1 : 0,
                        backgroundColor: isFloating ? "#2fd6a0" : "#ffffff",
                      }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  </a>
                );
              })}
            </motion.nav>

            {/* CTA and Burger Trigger */}
            <div className="flex items-center gap-[.8rem] xl:justify-self-end">
              <AnimatePresence>
                {isFloating && (
                  <motion.a
                    key="cta-button"
                    href="#contact"
                    initial={{ opacity: 0, x: 24, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 24, scale: 0.96 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                      delay: isFloating ? 0.15 : 0, // Delay entrance slightly, exit immediately
                    }}
                    className="
                      max-xl:hidden xl:inline-flex items-center gap-[0.55rem] font-sans font-bold text-[0.92rem] shrink-0
                      border border-transparent bg-gradient-to-br from-emerald-2 to-teal text-white
                      whitespace-nowrap leading-none cursor-pointer
                      py-[10px] px-[20px] rounded-full
                      shadow-[0_14px_30px_-12px_rgba(21,151,106,0.5)]
                      hover:-translate-y-[2px] hover:shadow-[0_22px_42px_-14px_rgba(21,151,106,0.65)]
                      transition-[transform,box-shadow] duration-300
                    "
                  >
                    Book Appointment
                  </motion.a>
                )}
              </AnimatePresence>

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
                  animate={{
                    y: open ? 7 : 0,
                    rotate: open ? 45 : 0,
                    backgroundColor: open ? "#ffffff" : (isFloating ? "#0a2342" : "#ffffff"),
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
                <motion.span
                  className="w-6 h-[2px] rounded-sm"
                  animate={{
                    opacity: open ? 0 : 1,
                    backgroundColor: open ? "#ffffff" : (isFloating ? "#0a2342" : "#ffffff"),
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
                <motion.span
                  className="w-6 h-[2px] rounded-sm"
                  animate={{
                    y: open ? -7 : 0,
                    rotate: open ? -45 : 0,
                    backgroundColor: open ? "#ffffff" : (isFloating ? "#0a2342" : "#ffffff"),
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Drawer (Sibling to header to avoid backdrop-filter containers clipping fixed drawers) */}
      <div
        className={`hidden max-xl:block fixed inset-0 z-[940] bg-navy/45 backdrop-blur-[2px] transition-all duration-400 ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

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
