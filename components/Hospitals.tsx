import { Pin } from "@/lib/icons";

const HOSPITALS = [
  ["Apollo Speciality Hospital", "Teynampet"],
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
    <section className="section hospitals" id="hospitals">
      <div className="container">
        <div className="section__head reveal">
          <p className="eyebrow eyebrow--center">
            <span className="eyebrow__line" /> Where to consult <span className="eyebrow__line" />
          </p>
          <h2 className="section__title section__title--center">Consulting Hospitals</h2>
          <p className="section__sub">
            Senior consultant across eight of Chennai&apos;s most reputed institutions.
          </p>
        </div>
        <div className="hgrid">
          {HOSPITALS.map(([name, loc], i) => (
            <a className="hcard reveal" href="#contact" key={name} data-reveal-delay={(i % 4) * 50}>
              <span className="hcard__pin">
                <Pin />
              </span>
              <span className="hcard__name">{name}</span>
              <span className="hcard__loc">{loc}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
