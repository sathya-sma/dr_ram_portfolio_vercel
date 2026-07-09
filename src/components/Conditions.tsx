const CONDITIONS = [
  "GI cancers — stomach, colon, pancreas, liver, esophagus",
  "Gallstones & bile duct stones",
  "Pancreatitis (acute & chronic)",
  "Liver tumours & cysts",
  "Hernias — inguinal, incisional, complex",
  "Intestinal obstruction",
  "Colorectal diseases",
  "GERD & hiatal hernia",
  "GI perforations",
  "Abdominal infections & abscess",
];

export default function Conditions() {
  return (
    <section className="py-[clamp(4.5rem,9vw,8rem)] relative" id="conditions">
      <div className="w-[min(100%-2.4rem,1180px)] mx-auto">
        <div className="reveal max-w-[680px] mx-auto mb-[3.2rem] text-center">
          <p className="inline-flex items-center gap-[.6rem] font-bold text-[.78rem] tracking-[.16em] uppercase text-teal justify-center">
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" />
            Conditions
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" />
          </p>
          <h2 className="font-serif font-semibold leading-[1.1] tracking-tight text-[clamp(1.9rem,4vw,2.9rem)] text-navy mt-[.9rem] text-center">
            Conditions Treated
          </h2>
          <p className="mt-4 text-muted text-[1.05rem]">
            Expert surgical care across the full spectrum of gastrointestinal disease.
          </p>
        </div>

        <ul className="reveal list-none flex flex-wrap gap-[.85rem] justify-center max-w-[900px] mx-auto p-0">
          {CONDITIONS.map((c) => (
            <li
              key={c}
              className="
                font-semibold text-[.98rem] text-navy bg-card border border-line
                rounded-full py-[.7rem] px-[1.25rem]
                shadow-[0_4px_18px_rgba(16,56,98,.07)]
                transition-all duration-300 cursor-default
                hover:-translate-y-1 hover:bg-gradient-to-br hover:from-emerald-2 hover:to-teal
                hover:text-white hover:shadow-[0_16px_30px_-16px_rgba(14,124,139,.7)] hover:border-transparent
              "
              style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
