import { Check, Stethoscope, Users, Bolt, Chat, Activity } from "@/lib/icons";

const CARDS = [
  { Icon: Check, title: "Evidence-based decisions", body: "Surgical decision-making grounded in current evidence and the right indication for every patient." },
  { Icon: Stethoscope, title: "Minimally invasive first", body: "Laparoscopic and robotic techniques whenever feasible — less pain, faster recovery." },
  { Icon: Users, title: "Multidisciplinary boards", body: "Complex cases discussed in tumour boards with oncology, radiology and critical care." },
  { Icon: Bolt, title: "Enhanced Recovery (ERAS)", body: "Modern ERAS protocols to shorten hospital stay and restore normal life sooner." },
  { Icon: Chat, title: "Clear communication", body: "Honest, jargon-free conversations with patients and families at every step." },
  { Icon: Activity, title: "Long-term follow-up", body: "Continuous monitoring of outcomes and recovery well beyond the operating theatre." },
];

export default function Approach() {
  return (
    <section className="section approach" id="approach">
      <div className="container">
        <div className="section__head reveal">
          <p className="eyebrow eyebrow--center">
            <span className="eyebrow__line" /> Philosophy <span className="eyebrow__line" />
          </p>
          <h2 className="section__title section__title--center">Approach to Patient Care</h2>
          <p className="section__sub">
            A structured, multidisciplinary pathway built around safety, clarity and recovery.
          </p>
        </div>

        <div className="approach__grid">
          {CARDS.map(({ Icon, title, body }, i) => (
            <article className="acard reveal" key={title} data-reveal-delay={(i % 3) * 60}>
              <div className="acard__icon">
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
