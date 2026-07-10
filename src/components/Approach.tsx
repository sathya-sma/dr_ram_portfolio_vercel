import { Check, Stethoscope, Users, Bolt, Chat, Activity } from "@/lib/icons";
import type { JSX, SVGProps } from "react";

const CARDS: { Icon: (p: SVGProps<SVGSVGElement>) => JSX.Element; title: string; body: string }[] = [
  { Icon: Check, title: "Evidence-based decisions", body: "Surgical decision-making grounded in current evidence and the right indication for every patient." },
  { Icon: Stethoscope, title: "Minimally invasive first", body: "Laparoscopic and robotic techniques whenever feasible — less pain, faster recovery." },
  { Icon: Users, title: "Multidisciplinary boards", body: "Complex cases discussed in tumour boards with oncology, radiology and critical care." },
  { Icon: Bolt, title: "Enhanced Recovery (ERAS)", body: "Modern ERAS protocols to shorten hospital stay and restore normal life sooner." },
  { Icon: Chat, title: "Clear communication", body: "Honest, jargon-free conversations with patients and families at every step." },
  { Icon: Activity, title: "Long-term follow-up", body: "Continuous monitoring of outcomes and recovery well beyond the operating theatre." },
];

export default function Approach() {
  return (
    <section className="py-[clamp(3.2rem,6vw,5.5rem)] relative" id="patient-care">
      <div className="w-[min(100%-2.4rem,1180px)] mx-auto">
        {/* Section head */}
        <div className="reveal max-w-[680px] mx-auto mb-[3.2rem] text-center">
          <p className="inline-flex items-center gap-[.6rem] font-bold text-[.78rem] tracking-[.16em] uppercase text-teal justify-center">
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" />
            Patient Care
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" />
          </p>
          <h2 className="font-serif font-semibold leading-[1.1] tracking-tight text-[clamp(1.9rem,4vw,2.9rem)] text-navy mt-[.9rem] text-center">
            Approach to Patient Care
          </h2>
          <p className="mt-4 text-muted text-[1.05rem]">
            A structured, multidisciplinary pathway built around safety, clarity and recovery.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-3 gap-[1.3rem] max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
          {CARDS.map(({ Icon, title, body }, i) => (
            <article
              className="
                reveal group bg-card border border-line rounded-[18px] p-[1.8rem]
                shadow-[0_4px_18px_rgba(16,56,98,.07)] relative overflow-hidden
                transition-all duration-400 cursor-default
                hover:-translate-y-[7px] hover:shadow-[0_18px_50px_-20px_rgba(16,56,98,.28)] hover:border-transparent
                before:content-[''] before:absolute before:left-0 before:top-0 before:h-[3px] before:w-full
                before:bg-gradient-to-r before:from-emerald-2 before:to-teal
                before:scale-x-0 before:origin-left before:transition-transform before:duration-400
                hover:before:scale-x-100
              "
              style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
              key={title}
              data-reveal-delay={(i % 3) * 60}
            >
              <div
                className="
                  w-[50px] h-[50px] rounded-[14px] grid place-items-center
                  bg-gradient-to-br from-emerald-2/14 to-teal/14 text-teal
                  mb-[1.1rem] transition-transform duration-400
                  group-hover:scale-108 group-hover:-rotate-[4deg]
                "
                style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
              >
                <Icon className="ico w-6 h-6" />
              </div>
              <h3 className="text-[1.12rem] text-navy font-bold">{title}</h3>
              <p className="mt-2 text-muted text-[.95rem]">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
