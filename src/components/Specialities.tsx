import { useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { CheckMini, Chevron, Colon, Liver, Scope, ShieldPlus, Stomach } from "@/lib/icons";

type Item = {
  title: string;
  tags: string[];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  items: { label: string; mode?: string }[];
};

const DATA: Item[] = [
  {
    title: "Upper GI Surgery",
    tags: ["Robotic", "Laparoscopic"],
    icon: Stomach,
    items: [
      { label: "Heller's cardiomyotomy" },
      { label: "Fundoplication" },
      { label: "Oesophageal cancer surgery" },
      { label: "Stomach cancer surgery", mode: "open" },
      { label: "Hiatus hernia repair" },
    ],
  },
  {
    title: "Hepatobiliary & Pancreatic Surgery",
    tags: ["Laparoscopic", "Robotic", "Open"],
    icon: Liver,
    items: [
      { label: "Gallbladder and bile duct surgery" },
      { label: "Pancreatic surgery — Whipple's, Central & Distal Pancreatectomy" },
      { label: "Surgery for pancreatic pseudocyst" },
      { label: "Liver resections", mode: "open" },
    ],
  },
  {
    title: "Colorectal Surgery",
    tags: ["Robotic", "Laparoscopic"],
    icon: Colon,
    items: [
      { label: "Colonic resections" },
      { label: "Low / ultra-low anterior resections with colo-anal anastomosis" },
      { label: "Haemorrhoid surgery (Ligasure / Stapler / Diathermy)" },
      { label: "Fistula surgery (Fistulectomy / Seton insertion)" },
      { label: "Fissure surgery" },
    ],
  },
  {
    title: "General & Emergency Surgery",
    tags: ["Robotic", "Laparoscopic"],
    icon: ShieldPlus,
    items: [
      { label: "Hernia repairs — Inguinal, Incisional, Umbilical, Complex" },
      { label: "Intestinal obstruction" },
      { label: "GI perforation" },
      { label: "Colorectal diseases" },
      { label: "GI bleed" },
      { label: "Appendicectomy" },
      { label: "Laparoscopic splenectomy" },
    ],
  },
  {
    title: "Endoscopy",
    tags: ["Diagnostic", "Therapeutic"],
    icon: Scope,
    items: [
      { label: "Upper GI Endoscopy" },
      { label: "Colonoscopy" },
      { label: "Diagnostic Endoscopy" },
      { label: "Therapeutic Endoscopy" },
    ],
  },
];

const EASE = { transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" } as const;

/** Tag pills + procedure checklist — shared by the mobile drawer and desktop panel. */
function Procedures({ item, dark }: { item: Item; dark: boolean }) {
  return (
    <>
      <div className="flex gap-[.45rem] flex-wrap">
        {item.tags.map((t) => (
          <em
            key={t}
            className={`not-italic text-[.68rem] font-bold tracking-[.04em] uppercase py-[.25rem] px-[.55rem] rounded-full border ${
              dark ? "text-[#7fe3cf] bg-white/8 border-white/18" : "text-teal bg-teal/10 border-teal/20"
            }`}
          >
            {t}
          </em>
        ))}
      </div>
      <ul className="list-none m-0 p-0 mt-[1.05rem] flex flex-col gap-[.7rem]">
        {item.items.map((it) => (
          <li key={it.label} className="flex items-start gap-[.6rem]">
            <span
              className={`mt-[.22rem] w-[18px] h-[18px] shrink-0 rounded-full grid place-items-center ${
                dark ? "bg-emerald-glow/18 text-emerald-glow" : "bg-emerald-2/12 text-emerald"
              }`}
            >
              <CheckMini className="ico w-[11px] h-[11px]" style={{ strokeWidth: 2.4 }} />
            </span>
            <span className={`text-[.96rem] leading-[1.55] ${dark ? "text-[#cfe4df]" : "text-ink"}`}>
              {it.label}
              {it.mode ? (
                <span
                  className={`text-[.68rem] font-bold uppercase tracking-[.05em] rounded-[5px] py-[.05rem] px-[.4rem] ml-[.35rem] align-middle whitespace-nowrap ${
                    dark ? "text-[#f5c451] bg-[rgba(245,196,81,.14)]" : "text-[#8a5300] bg-[rgba(214,140,0,.12)]"
                  }`}
                >
                  {it.mode} surgery
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Specialities() {
  const [openIdx, setOpenIdx] = useState(0);
  /** Last opened item keeps feeding the desktop panel even while everything is collapsed. */
  const [detailIdx, setDetailIdx] = useState(0);

  const toggle = (i: number) => {
    setOpenIdx((prev) => (prev === i ? -1 : i));
    setDetailIdx(i);
  };

  const detail = DATA[detailIdx];
  const DetailIcon = detail.icon;

  return (
    <section className="py-[clamp(1.8rem,3.5vw,2.8rem)] relative" id="specialities">
      <div className="w-[min(100%-2.4rem,1180px)] mx-auto">
        {/* Section head */}
        <div className="reveal max-w-[680px] mx-auto mb-[3.2rem] text-center">
          <p className="inline-flex items-center gap-[.6rem] font-bold text-[.78rem] tracking-[.16em] uppercase text-teal justify-center">
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" />
            What we treat
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" />
          </p>
          <h2 className="font-serif font-semibold leading-[1.1] tracking-tight text-[clamp(1.9rem,4vw,2.9rem)] text-navy mt-[.9rem] text-center">
            Surgical Specialities
          </h2>
          <p className="mt-4 text-muted text-[1.05rem]">
            Every patient is evaluated thoroughly pre-operatively to identify the correct
            diagnosis. The choice between{" "}
            <strong>Laparoscopic, Robotic and Open Surgeries</strong> is guided by the merits of
            the disease and the patient.
          </p>
        </div>

        {/* Split explorer: selector list left, showcase panel right (accordion on mobile) */}
        <div className="reveal grid min-[900px]:grid-cols-[.92fr_1.08fr] gap-6 items-start">
          {/* Selector list */}
          <div className="flex flex-col gap-[.85rem]">
            {DATA.map((item, i) => {
              const isOpen = openIdx === i;
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`
                    relative overflow-hidden rounded-[18px] border bg-card transition-all duration-400
                    ${
                      isOpen
                        ? "border-emerald-2/45 shadow-[0_18px_45px_-20px_rgba(21,151,106,.45)]"
                        : "border-line shadow-[0_4px_18px_rgba(16,56,98,.07)] hover:border-teal/30 hover:-translate-y-[2px] hover:shadow-[0_14px_36px_-18px_rgba(16,56,98,.25)]"
                    }
                  `}
                  style={EASE}
                >
                  {/* Active tint */}
                  <span
                    aria-hidden
                    className={`absolute inset-0 pointer-events-none bg-gradient-to-r from-emerald-2/10 via-teal/6 to-transparent transition-opacity duration-400 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {/* Active edge bar */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-emerald-2 to-teal transition-opacity duration-400 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <button
                    className="relative w-full flex items-center gap-[.9rem] py-[1rem] px-[1.15rem] bg-transparent border-0 cursor-pointer text-left font-sans"
                    aria-expanded={isOpen}
                    onClick={() => toggle(i)}
                  >
                    <span
                      className={`font-serif font-semibold text-[.95rem] transition-colors duration-400 ${
                        isOpen ? "text-emerald" : "text-muted/70"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`w-[44px] h-[44px] shrink-0 rounded-[12px] grid place-items-center transition-all duration-400 ${
                        isOpen
                          ? "bg-gradient-to-br from-emerald-2 to-teal text-white shadow-[0_10px_24px_-10px_rgba(21,151,106,.8)]"
                          : "bg-gradient-to-br from-emerald-2/14 to-teal/14 text-teal"
                      }`}
                      style={EASE}
                    >
                      <Icon className="ico w-[22px] h-[22px]" />
                    </span>
                    <span
                      className={`flex-1 font-bold text-[1.02rem] leading-[1.3] transition-colors duration-400 ${
                        isOpen ? "text-navy" : "text-ink"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`w-[34px] h-[34px] shrink-0 rounded-full grid place-items-center border transition-all duration-400 ${
                        isOpen
                          ? "rotate-180 min-[900px]:-rotate-90 bg-gradient-to-br from-emerald-2 to-teal text-white border-transparent"
                          : "min-[900px]:-rotate-90 text-muted border-line bg-bg"
                      }`}
                      style={EASE}
                    >
                      <Chevron className="ico w-[17px] h-[17px]" />
                    </span>
                  </button>

                  {/* Mobile / tablet drawer — the showcase panel takes over from 900px up */}
                  <div className="min-[900px]:hidden">
                    <div className={`spec-body relative ${isOpen ? "is-open" : ""}`}>
                      <div>
                        <div className="mx-[1.15rem] h-px bg-line" aria-hidden />
                        <div className="py-[1.15rem] px-[1.15rem]">
                          <Procedures item={item} dark={false} />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Showcase panel (desktop) */}
          <aside className="max-[899px]:hidden relative">
            <div
              key={detailIdx}
              className="panel-swap relative overflow-hidden rounded-[26px] border border-line bg-card p-[clamp(1.8rem,3vw,2.6rem)] shadow-[0_18px_45px_-20px_rgba(16,56,98,.12)] min-h-[460px]"
            >
              {/* Soft light glow */}
              <span
                aria-hidden
                className="absolute -top-[80px] -right-[50px] w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(31,184,134,.05), transparent 70%)" }}
              />
              {/* Watermark number */}
              <span
                aria-hidden
                className="absolute -top-4 right-6 font-serif font-bold leading-none text-[6.5rem] text-navy/4 select-none pointer-events-none"
              >
                {String(detailIdx + 1).padStart(2, "0")}
              </span>

              <span className="relative w-[58px] h-[58px] rounded-[16px] grid place-items-center bg-gradient-to-br from-emerald-2/14 to-teal/14 text-teal border border-teal/10">
                <DetailIcon className="ico w-[29px] h-[29px]" />
              </span>

              <h3 className="relative font-serif font-semibold text-[clamp(1.4rem,2.4vw,1.75rem)] leading-[1.2] text-navy mt-[1.15rem]">
                {detail.title}
              </h3>
              <span
                className="relative block w-14 h-[3px] rounded-sm mt-[.75rem] mb-[1.2rem] bg-gradient-to-r from-emerald-2 to-teal"
                aria-hidden
              />

              <div className="relative">
                <Procedures item={detail} dark={false} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
