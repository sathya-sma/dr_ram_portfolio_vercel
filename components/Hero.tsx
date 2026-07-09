import { ArrowRight, Phone, CheckMini } from "@/lib/icons";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__bg" aria-hidden>
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="hero__grid" />
      </div>

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow reveal">
            <span className="dot" /> Consultant Gastrointestinal Surgeon
          </p>
          <h1 className="hero__name reveal" data-reveal-delay="60">
            Dr T Ramkumar
          </h1>
          <p className="hero__role reveal" data-reveal-delay="120">
            Laparoscopic &amp; Robotic Cancer Surgeon
          </p>
          <h2 className="hero__tagline reveal" data-reveal-delay="180">
            Surgical Excellence,
            <br />
            <span className="grad-text">Personalised Care.</span>
          </h2>
          <p className="hero__intro reveal" data-reveal-delay="240">
            Gastrointestinal Surgeon with over <strong>27 years</strong> of expertise in the
            safe management of benign and malignant gastrointestinal conditions. A pioneer in
            minimally invasive — Laparoscopic and Robotic — gastrointestinal surgery in Tamil
            Nadu, trusted by patients across India and internationally.
          </p>
          <div className="hero__cta reveal" data-reveal-delay="300">
            <a href="#contact" className="btn btn--primary">
              Book an Appointment
              <ArrowRight className="btn__icon" />
            </a>
            <a href="tel:04448134300" className="btn btn--ghost">
              <Phone className="btn__icon" />
              Call 044 4813 4300
            </a>
          </div>

          <ul className="hero__chips reveal" data-reveal-delay="360">
            <li>Esophagus &amp; Stomach</li>
            <li>Liver &amp; Pancreas</li>
            <li>Colorectal</li>
            <li>HPB Surgery</li>
          </ul>
        </div>

        <div className="hero__media reveal" data-reveal-delay="200">
          <div className="portrait">
            <div className="portrait__frame">
              <svg
                className="portrait__ph"
                viewBox="0 0 400 480"
                role="img"
                aria-label="Professional portrait placeholder of Dr T Ramkumar"
              >
                <defs>
                  <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#163a5f" />
                    <stop offset="1" stopColor="#0a2342" />
                  </linearGradient>
                </defs>
                <rect width="400" height="480" fill="url(#pg)" />
                <circle cx="200" cy="186" r="74" fill="#28557d" />
                <path d="M86 470c0-72 51-118 114-118s114 46 114 118z" fill="#28557d" />
                <circle
                  cx="200"
                  cy="186"
                  r="74"
                  fill="none"
                  stroke="#2fd6a0"
                  strokeOpacity=".5"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="portrait__badge">
              <span className="portrait__badge-num">
                27<span>+</span>
              </span>
              <span className="portrait__badge-label">
                Years of
                <br />
                Experience
              </span>
            </div>
            <div className="portrait__pill portrait__pill--1">
              <CheckMini /> Robotic Surgery
            </div>
            <div className="portrait__pill portrait__pill--2">
              <CheckMini /> 7,500+ Surgeries
            </div>
          </div>
        </div>
      </div>

      <a href="#stats" className="hero__scroll" aria-label="Scroll down">
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}
