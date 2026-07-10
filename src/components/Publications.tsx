import { Doc } from "@/lib/icons";

const PUBLICATIONS = [
  {
    title: "A comparison of POSSUM, P-POSSUM and CR-POSSUM for the prediction of postoperative mortality in patients undergoing colorectal resection",
    authors: "Ramkumar T, Ng V, Fowler L, Farouk R",
    journal: "Diseases of the Colon & Rectum",
    year: "2006",
  },
  {
    title: "Demonstration of functional neuronal β3-adrenoceptors within the enteric nervous system",
    authors: "Cellek S, Thangiah R, Bassil AK, et al.",
    journal: "Gastroenterology",
    year: "2007",
  },
  {
    title: "Activation of prostaglandin EP receptors by lubiprostone in rat and human stomach and colon",
    authors: "Bassil AK, Borman RA, Jarvie EM, Thangiah R, et al.",
    journal: "British Journal of Pharmacology",
    year: "2008",
  },
  {
    title: "5-HT4 receptor agonists enhance both cholinergic and nitrergic activity in human isolated colon circular muscle",
    authors: "Cellek S, John AK, Thangiah R, et al.",
    journal: "Neurogastroenterology & Motility",
    year: "2006",
  },
  {
    title: "Synergy between 5-HT4 receptor activation and acetylcholinesterase inhibition in human colon and rat forestomach",
    authors: "Cellek S, Thangiah R, Jarvie EM, et al.",
    journal: "Neurogastroenterology & Motility",
    year: "2008",
  },
];

export default function Publications() {
  return (
    <section className="py-[clamp(3.2rem,6vw,5.5rem)] relative" id="publications">
      <div className="w-[min(100%-2.4rem,1180px)] mx-auto">
        <div className="reveal max-w-[680px] mx-auto mb-[3.2rem] text-center">
          <p className="inline-flex items-center gap-[.6rem] font-bold text-[.78rem] tracking-[.16em] uppercase text-teal justify-center">
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" />
            Academic work
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" />
          </p>
          <h2 className="font-serif font-semibold leading-[1.1] tracking-tight text-[clamp(1.9rem,4vw,2.9rem)] text-navy mt-[.9rem] text-center">
            Research &amp; Publications
          </h2>
          <p className="mt-4 text-muted text-[1.05rem]">
            Selected peer-reviewed contributions to gastrointestinal surgery and motility research, alongside numerous conference abstracts, presentations and clinical guidelines.
          </p>
        </div>

        <ol className="reveal list-none flex flex-col gap-4 max-w-[920px] mx-auto p-0">
          {PUBLICATIONS.map((pub, i) => (
            <li
              key={i}
              className="
                bg-card border border-line rounded-[18px]
                shadow-[0_4px_18px_rgba(16,56,98,.07)] p-[1.3rem_1.4rem] flex gap-4
                transition-all duration-350 hover:shadow-[0_18px_50px_-20px_rgba(16,56,98,.28)] hover:border-teal/30 hover:-translate-y-1
              "
              style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
              data-reveal-delay={(i % 3) * 60}
            >
              <span className="w-[42px] h-[42px] rounded-[12px] grid place-items-center bg-gradient-to-br from-blue/12 to-teal/12 text-blue shrink-0">
                <Doc className="ico w-5 h-5" />
              </span>
              <div className="flex-1">
                <p className="font-bold text-navy text-[1rem] leading-[1.4]">{pub.title}</p>
                <p className="text-[.86rem] text-muted mt-[.35rem]">
                  {pub.authors} · <em className="text-teal font-semibold not-italic">{pub.journal}</em> · {pub.year}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
