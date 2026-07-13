import { Pin } from "@/lib/icons";

const HOSPITALS = [
  ["Apollo Speciality Hospital", "Mount Road"],
  ["Apollo Spectra Hospital", "MRC Nagar"],
  ["Aakash Hospital Endosurg", "Mylapore"],
  ["BSS Hospital", "Mandaveli"],
  ["Kumaran Hospital", "Kilpauk"],
  ["KHM Hospital", "Anna Nagar"],
  ["The Brain & Spine Hospital", "T Nagar"],
  ["MGM Cancer Institute", "Mehta Nagar"],
];

export default function Hospitals() {
  return (
    <section className="py-[clamp(1.8rem,3.5vw,2.8rem)] relative" id="hospitals">
      <div className="w-[min(100%-2.4rem,73.75rem)] mx-auto">
        <div className="reveal max-w-[680px] mx-auto mb-[3.2rem] text-center">
          <p className="inline-flex items-center gap-[.6rem] font-bold text-[.78rem] tracking-[.16em] uppercase text-teal justify-center">
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" />
            Where to consult
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" />
          </p>
          <h2 className="font-serif font-semibold leading-[1.1] tracking-tight text-[2.9rem] text-navy mt-[.9rem] text-center">
            Consulting Hospitals
          </h2>
          <p className="mt-4 text-muted text-[1.05rem]">
            Senior consultant across eight of Chennai&apos;s most reputed institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.2rem]">
          {HOSPITALS.map(([name, loc], i) => (
            <a
              href="#contact"
              className="
                reveal group flex flex-col gap-[.35rem] bg-card border border-line rounded-[18px]
                p-[clamp(1.1rem,2.5vw,1.5rem)] shadow-[0_4px_18px_rgba(16,56,98,.07)] relative overflow-hidden
                transition-all duration-400 cursor-pointer
                hover:-translate-y-[6px] hover:shadow-[0_18px_50px_-20px_rgba(16,56,98,.28)] hover:border-teal/30
                after:content-[''] after:absolute after:-right-[30px] after:-bottom-[30px]
                after:w-[clamp(70px,10vw,90px)] after:h-[clamp(70px,10vw,90px)] after:rounded-full
                after:bg-[radial-gradient(circle,rgba(31,184,134,.14),transparent_70%)]
                after:transition-transform after:duration-500
                hover:after:scale-[1.6]
              "
              style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
              key={name}
              data-reveal-delay={(i % 4) * 50}
            >
              <span className="w-[clamp(36px,5vw,42px)] h-[clamp(36px,5vw,42px)] rounded-[12px] grid place-items-center bg-gradient-to-br from-blue/12 to-teal/12 text-blue mb-[.4rem]">
                <Pin className="ico w-5 h-5" />
              </span>
              <span className="font-bold text-navy text-[1.02rem] leading-[1.25]">{name}</span>
              <span className="text-[.85rem] text-muted font-semibold">{loc}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
