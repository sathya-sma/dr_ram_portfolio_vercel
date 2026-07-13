import { useEffect, useRef } from "react";

/**
 * Hero background "3D video" — layered silk ribbons of light, drawn as
 * smooth filled sine bands with soft vertical gradient falloff and additive
 * ("lighter") compositing, so overlaps bloom like out-of-focus renders of
 * flowing liquid. No points, no wireframes — continuous surfaces only.
 *
 * Each ribbon has its own wavelength, drift speed, thickness breathing and
 * depth factor (depth drives mouse-parallax strength), which together read
 * as a slow cinematic 3D loop.
 *
 * Plain canvas 2D — no WebGL, no library. Battery/perf guards: skipped for
 * prefers-reduced-motion, paused off-screen or on hidden tabs, DPR capped
 * at 2.
 */

type Ribbon = {
  /** Baseline as a fraction of canvas height. */
  yBase: number;
  /** Vertical tilt across the width (fraction of height, +ve = lower on the right). */
  slope: number;
  /** Wave amplitude (fraction of height). */
  amp: number;
  /** Band thickness (fraction of height). */
  thick: number;
  /** Wavelengths across the width. */
  k: number;
  /** Phase drift speed, radians/second (sign = direction). */
  speed: number;
  phase: number;
  /** Parallax depth 0..1. */
  depth: number;
  /** "r,g,b" */
  tint: string;
  alpha: number;
};

const RIBBONS: Ribbon[] = [
  // Broad emerald current along the bottom.
  { yBase: 0.8, slope: 0.02, amp: 0.05, thick: 0.13, k: 1.15, speed: 0.3, phase: 0.0, depth: 0.9, tint: "31,184,134", alpha: 0.16 },
  // Deep blue undercurrent, drifting the other way.
  { yBase: 0.9, slope: -0.03, amp: 0.045, thick: 0.11, k: 1.55, speed: -0.22, phase: 2.1, depth: 0.55, tint: "27,95,170", alpha: 0.14 },
  // Bright aqua filament riding the crest.
  { yBase: 0.73, slope: 0.01, amp: 0.055, thick: 0.028, k: 1.9, speed: 0.42, phase: 4.2, depth: 1, tint: "127,227,207", alpha: 0.2 },
  // Wide teal sweep diving diagonally from behind the portrait toward the CTAs.
  { yBase: 0.62, slope: -0.16, amp: 0.04, thick: 0.09, k: 1.3, speed: 0.26, phase: 1.2, depth: 0.35, tint: "14,124,139", alpha: 0.12 },
];

const SEGMENTS = 72;

export default function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let inView = true;
    // Mouse parallax target/current, -0.5..0.5 around centre.
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawRibbon = (rb: Ribbon, t: number) => {
      const parX = px * 50 * rb.depth;
      const parY = py * 34 * rb.depth;
      const omega = (Math.PI * 2 * rb.k) / w;
      const breathe = 1 + 0.25 * Math.sin(t * 0.45 + rb.phase);

      const topY: number[] = new Array(SEGMENTS + 1);
      const botY: number[] = new Array(SEGMENTS + 1);
      let minY = Infinity;
      let maxY = -Infinity;

      for (let i = 0; i <= SEGMENTS; i++) {
        const x = (i / SEGMENTS) * w;
        const ph = (x + parX) * omega + t * rb.speed + rb.phase;
        const yc =
          rb.yBase * h +
          rb.slope * (x - w / 2) +
          (Math.sin(ph) * 0.7 + Math.sin(ph * 0.53 + t * 0.2) * 0.3) * rb.amp * h * breathe +
          parY;
        const half = (rb.thick * h * (1 + 0.2 * Math.sin(ph * 0.8 + 1.7))) / 2;
        topY[i] = yc - half;
        botY[i] = yc + half;
        if (topY[i] < minY) minY = topY[i];
        if (botY[i] > maxY) maxY = botY[i];
      }

      // Soft falloff across the band: transparent edges, luminous core.
      const grad = ctx.createLinearGradient(0, minY, 0, maxY);
      grad.addColorStop(0, `rgba(${rb.tint},0)`);
      grad.addColorStop(0.5, `rgba(${rb.tint},${rb.alpha})`);
      grad.addColorStop(1, `rgba(${rb.tint},0)`);
      ctx.fillStyle = grad;

      ctx.beginPath();
      for (let i = 0; i <= SEGMENTS; i++) {
        const x = (i / SEGMENTS) * w;
        if (i === 0) ctx.moveTo(x, topY[i]);
        else ctx.lineTo(x, topY[i]);
      }
      for (let i = SEGMENTS; i >= 0; i--) {
        ctx.lineTo((i / SEGMENTS) * w, botY[i]);
      }
      ctx.closePath();
      ctx.fill();
    };

    const frame = (nowMs: number) => {
      if (!running) return;
      const t = nowMs / 1000;
      px += (tx - px) * 0.04;
      py += (ty - py) * 0.04;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const rb of RIBBONS) drawRibbon(rb, t);
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(frame);
    };

    // Always re-arm on a state flip: a rAF scheduled while the tab was hidden
    // may never fire, so an early-return "already running" guard can deadlock.
    const setRunning = (on: boolean) => {
      running = on;
      cancelAnimationFrame(raf);
      if (on) raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => setRunning(inView && !document.hidden);
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        onVisibility();
      },
      { threshold: 0 }
    );

    const onMouse = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("mousemove", onMouse, { passive: true });
    setRunning(true);

    return () => {
      setRunning(false);
      io.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden />;
}
