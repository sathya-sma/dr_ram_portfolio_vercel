"use client";
import { useState } from "react";
import { Pin, Phone } from "@/lib/icons";

const MAP_SRC =
  "https://maps.google.com/maps?q=Thiruvalluvar%20Puram%2C%20Choolaimedu%2C%20Chennai%20600094&t=&z=15&ie=UTF8&iwloc=&output=embed";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", message: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    // Front-end only: in production wire this to an API route / email service.
    setSent(true);
    setForm({ name: "", phone: "", date: "", message: "" });
  };

  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <div className="contact__info reveal">
          <p className="eyebrow">
            <span className="eyebrow__line" /> Get in touch
          </p>
          <h2 className="section__title">Book an Appointment</h2>
          <p className="contact__lead">
            Expert evaluation and surgical care for both routine and complex gastrointestinal
            conditions. Reach the clinic directly or send a request and we&apos;ll call you back.
          </p>

          <ul className="contact__list">
            <li>
              <span className="contact__ico">
                <Pin />
              </span>
              <div>
                <strong>Chennai Speciality Clinic</strong>
                1, Thiruvalluvarpuram 3rd St, near Thiripurasundari Temple &amp; next to Jothi
                Medicals, Thiruvalluvar Puram, Choolaimedu, Chennai, Tamil Nadu 600094
              </div>
            </li>
            <li>
              <span className="contact__ico">
                <Phone />
              </span>
              <div>
                <strong>Call the clinic</strong>
                <a href="tel:04448134300" className="contact__phone">
                  044 4813 4300
                </a>
              </div>
            </li>
          </ul>

          <div className="contact__map">
            <iframe
              title="Chennai Speciality Clinic location"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form className="contact__form reveal" data-reveal-delay="120" onSubmit={onSubmit} noValidate>
          <h3>Request an appointment</h3>
          <div className="field">
            <label htmlFor="f-name">Name</label>
            <input id="f-name" type="text" placeholder="Your full name" value={form.name} onChange={update("name")} required />
          </div>
          <div className="field">
            <label htmlFor="f-phone">Phone</label>
            <input id="f-phone" type="tel" placeholder="Mobile number" value={form.phone} onChange={update("phone")} required />
          </div>
          <div className="field">
            <label htmlFor="f-date">Preferred date</label>
            <input id="f-date" type="date" value={form.date} onChange={update("date")} />
          </div>
          <div className="field">
            <label htmlFor="f-msg">Message</label>
            <textarea id="f-msg" rows={4} placeholder="Briefly describe your concern (optional)" value={form.message} onChange={update("message")} />
          </div>
          <button type="submit" className="btn btn--primary btn--block">
            Send Request
          </button>
          {sent ? (
            <p className="contact__note">
              Thank you — your request has been noted. The clinic will call you back shortly.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
