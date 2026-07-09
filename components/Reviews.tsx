const REVIEW_URL = "https://share.google/avpJT84DsPSXmc7IG";

function GoogleG({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{ flex: "none" }}>
      <path fill="#4285F4" d="M22.5 12.2c0-.7-.06-1.4-.18-2.06H12v3.9h5.9a5.04 5.04 0 0 1-2.18 3.3v2.74h3.52c2.06-1.9 3.26-4.7 3.26-7.88Z" />
      <path fill="#34A853" d="M12 23c2.94 0 5.4-.97 7.2-2.63l-3.52-2.73c-.97.65-2.22 1.04-3.68 1.04-2.83 0-5.23-1.9-6.08-4.48H2.28v2.82A10.86 10.86 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.92 14.2a6.5 6.5 0 0 1 0-4.18V7.2H2.28a10.86 10.86 0 0 0 0 9.82l3.64-2.82Z" />
      <path fill="#EA4335" d="M12 5.34c1.6 0 3.03.55 4.16 1.62l3.1-3.1A10.45 10.45 0 0 0 12 1 10.86 10.86 0 0 0 2.28 7.2l3.64 2.82C6.77 7.44 9.17 5.34 12 5.34Z" />
    </svg>
  );
}

const TESTIMONIALS = [
  {
    initial: "R",
    name: "Ravi",
    quote:
      "Underwent a laparoscopic gallbladder surgery. Clear explanation, painless recovery and I was home in two days. Deeply grateful to Dr Ramkumar and team.",
  },
  {
    initial: "P",
    name: "Priya",
    quote:
      "My father had complex pancreatic surgery. Dr Ramkumar's calm confidence and the multidisciplinary planning gave our family real peace of mind.",
  },
  {
    initial: "S",
    name: "Suresh",
    quote:
      "Robotic hernia repair with minimal pain and a tiny scar. Honest advice, no unnecessary procedures, and wonderful follow-up care. Highly recommend.",
  },
];

export default function Reviews() {
  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <div className="reviews__panel reveal">
          <span className="reviews__glow" aria-hidden />
          <div className="reviews__grid">
            <div className="reviews__intro">
              <p className="reviews__eyebrow">Patient Reviews</p>
              <h2 className="reviews__title">Your experience helps others heal</h2>
              <p className="reviews__text">
                If you have consulted Dr. T. Ramkumar, we kindly request you to share your
                valuable feedback. Your review will greatly help others seeking quality medical
                care.
              </p>
              <a
                href={REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="reviews__google"
              >
                <GoogleG />
                Leave a Google Review
              </a>
            </div>

            <div className="reviews__stack">
              {TESTIMONIALS.map((t, i) => (
                <figure className="rcard reveal" key={t.name} data-reveal-delay={i * 90}>
                  <div className="rcard__stars" aria-label="5 out of 5 stars">
                    ★★★★★
                  </div>
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>
                    <span className="rcard__av">{t.initial}</span>
                    <span className="rcard__name">{t.name}</span>
                    <GoogleG size={14} />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
