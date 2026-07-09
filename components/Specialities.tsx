"use client";
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
      { label: "Fundoplication (360° / 270°)" },
      { label: "Esophageal cancer surgery" },
      { label: "Stomach cancer surgery", mode: "open" },
      { label: "Hiatus hernia repair" },
    ],
  },
  {
    title: "Hepatobiliary & Pancreatic Surgery",
    tags: ["Lap", "Robotic", "Open"],
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
    tags: ["Diagnostic"],
    items: [{ label: "Colonoscopy" }],
  },
];

export default function Specialities() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="section specialities" id="specialities">
      <div className="container">
        <div className="section__head reveal">
          <p className="eyebrow eyebrow--center">
            <span className="eyebrow__line" /> What we treat <span className="eyebrow__line" />
          </p>
          <h2 className="section__title section__title--center">Surgical Specialities</h2>
          <p className="section__sub">
            Each patient is evaluated pre-operatively for the correct indication. The choice of{" "}
            <strong>Robotic, Laparoscopic or Open</strong> surgery is guided by the merits of the
            disease and the patient.
          </p>
        </div>

        <div className="spec reveal">
          {DATA.map((item, i) => {
            const open = openIdx === i;
            return (
              <article className={`spec__item${open ? " is-open" : ""}`} key={item.title}>
                <button
                  className="spec__head"
                  aria-expanded={open}
                  onClick={() => setOpenIdx(open ? -1 : i)}
                >
                  <span className="spec__idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="spec__title">{item.title}</span>
                  <span className="spec__tags">
                    {item.tags.map((t) => (
                      <em key={t}>{t}</em>
                    ))}
                  </span>
                  <Chevron className="spec__chev" />
                </button>
                <div className="spec__body">
                  <div>
                    <ul className="spec__list">
                      {item.items.map((it) => (
                        <li key={it.label}>
                          {it.label}
                          {it.mode ? <span className="tagm">{it.mode}</span> : null}
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
