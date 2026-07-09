"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  ["About", "#about"],
  ["Specialities", "#specialities"],
  ["Conditions", "#conditions"],
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
    <header className={`nav${scrolled ? " is-scrolled" : ""}`} id="nav">
      <div className="nav__strip" aria-hidden={scrolled}>
        <div className="nav__strip-inner">
          <span className="nav__strip-item">
            <svg viewBox="0 0 24 24" className="ico" width="14" height="14">
              <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Chennai Speciality Clinic, Choolaimedu
          </span>
          <span className="nav__strip-sep" />
          <a className="nav__strip-item nav__strip-phone" href="tel:04448134300">
            <svg viewBox="0 0 24 24" className="ico" width="14" height="14">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            044 4813 4300
          </a>
        </div>
      </div>
      <div className="nav__inner">
        <a href="#home" className="nav__brand" aria-label="Dr T Ramkumar — home">
          <Image
            src="/brand/logo.png"
            alt="Chennai Speciality Clinic"
            className="nav__logo"
            width={170}
            height={48}
            priority
          />
          <span className="nav__wordmark">Dr. T. Ramkumar</span>
        </a>

        <nav
          className={`nav__links${open ? " is-open" : ""}`}
          id="navLinks"
          aria-label="Primary"
        >
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`nav__link${active === href.slice(1) ? " is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a href="#contact" className="btn btn--primary btn--sm">
            Book Appointment
          </a>
          <button
            className={`nav__toggle${open ? " is-open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
