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
    <section className="section conditions" id="conditions">
      <div className="container">
        <div className="section__head reveal">
          <p className="eyebrow eyebrow--center">
            <span className="eyebrow__line" /> Conditions <span className="eyebrow__line" />
          </p>
          <h2 className="section__title section__title--center">Conditions Treated</h2>
          <p className="section__sub">
            Expert surgical care across the full spectrum of gastrointestinal disease.
          </p>
        </div>
        <ul className="chips reveal">
          {CONDITIONS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
