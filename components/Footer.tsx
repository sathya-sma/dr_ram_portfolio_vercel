import Image from "next/image";

const REVIEW_URL = "https://share.google/avpJT84DsPSXmc7IG";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Image
            src="/brand/logo-white.png"
            alt="Chennai Speciality Clinic"
            className="footer__logo"
            width={200}
            height={56}
          />
          <p className="footer__name">Dr T Ramkumar</p>
          <p className="footer__cred">
            MS · Consultant Gastrointestinal Surgeon
            <br />
            Laparoscopic &amp; Robotic Cancer Surgeon
          </p>
        </div>
        <div className="footer__col">
          <h4>Explore</h4>
          <a href="#about">About</a>
          <a href="#specialities">Specialities</a>
          <a href="#conditions">Conditions</a>
          <a href="#hospitals">Hospitals</a>
          <a href="#reviews">Reviews</a>
        </div>
        <div className="footer__col">
          <h4>Visit</h4>
          <p>
            Chennai Speciality Clinic
            <br />
            Thiruvalluvar Puram, Choolaimedu,
            <br />
            Chennai 600094
          </p>
          <a href="tel:04448134300" className="footer__phone">
            044 4813 4300
          </a>
        </div>
        <div className="footer__col">
          <h4>Appointments</h4>
          <a href="#contact" className="btn btn--primary btn--sm">
            Book Appointment
          </a>
          <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer" className="footer__review">
            ★ Leave a Google review
          </a>
        </div>
      </div>
      <div className="footer__base container">
        <p>
          © {new Date().getFullYear()} Dr T Ramkumar · Chennai Speciality Clinic. All rights
          reserved.
        </p>
        <p className="footer__disc">For medical emergencies, please visit your nearest hospital.</p>
      </div>
    </footer>
  );
}
