import { useState } from "react";
import { Chevron } from "@/lib/icons";

type Item = {
  title: string;
  tags: string[];
  items: { label: string; mode?: string }[];
};

const DATA: Item[] = [
  {
    title: "Upper GI Surgery",
    tags: ["Robotic", "Laparoscopic"],
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
    items: [
      { label: "Upper GI Endoscopy" },
      { label: "Colonoscopy" },
      { label: "Diagnostic Endoscopy" },
      { label: "Therapeutic Endoscopy" },
    ],
  },
];

export default function Specialities() {
  const [openIdx, setOpenIdx] = useState(0);

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

        {/* Accordion */}
        <div className="reveal max-w-[880px] mx-auto flex flex-col gap-4">
          {DATA.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <article
                className={`
                  bg-card border rounded-[18px] overflow-hidden
                  shadow-[0_4px_18px_rgba(16,56,98,.07)] transition-all duration-350
                  ${isOpen ? "shadow-[0_18px_50px_-20px_rgba(16,56,98,.28)] border-teal/30" : "border-line"}
                `}
                key={item.title}
              >
                <button
                  className="w-full flex items-center gap-[1.1rem] py-[1.35rem] px-[1.6rem] bg-transparent border-0 cursor-pointer text-left font-sans"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                >
                  <span className="font-serif font-semibold text-[1.05rem] text-teal min-w-[1.8rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-bold text-[1.12rem] text-navy">{item.title}</span>
                  <span className="min-[561px]:flex gap-[.4rem] flex-wrap max-[560px]:hidden">
                    {item.tags.map((t) => (
                      <em
                        key={t}
                        className="not-italic text-[.7rem] font-bold tracking-[.04em] uppercase text-teal bg-teal/10 border border-teal/20 py-[.25rem] px-[.55rem] rounded-full"
                      >
                        {t}
                      </em>
                    ))}
                  </span>
                  <Chevron
                    className={`ico w-[22px] h-[22px] shrink-0 transition-transform duration-350 ${
                      isOpen ? "rotate-180 text-teal" : "text-muted"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
                  />
                </button>
                <div className={`spec-body ${isOpen ? "is-open" : ""}`}>
                  <div>
                    <ul className="list-none pt-0 pr-[1.6rem] pb-[1.5rem] pl-[4.9rem] grid grid-cols-2 gap-x-[1.4rem] gap-y-[.6rem] m-0 max-[560px]:grid-cols-1 max-[560px]:pl-[1.6rem]">
                      {item.items.map((it) => (
                        <li
                          key={it.label}
                          className="relative pl-[1.4rem] text-ink text-[.97rem] before:content-[''] before:absolute before:left-0 before:top-[.55em] before:w-2 before:h-2 before:rounded-full before:bg-emerald-2 before:shadow-[0_0_0_3px_rgba(31,184,134,.15)]"
                        >
                          {it.label}
                          {it.mode ? (
                            <span className="text-[.7rem] font-bold uppercase tracking-[.05em] text-[#8a5300] bg-[rgba(214,140,0,.12)] rounded-[5px] py-[.05rem] px-[.4rem] ml-[.3rem] align-middle">
                              {it.mode} surgery
                            </span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
