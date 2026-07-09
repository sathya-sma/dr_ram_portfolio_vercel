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
    setSent(true);
    setForm({ name: "", phone: "", date: "", message: "" });
  };

  return (
    <section className="py-[clamp(4.5rem,9vw,8rem)] relative" id="contact">
      <div className="w-[min(100%-2.4rem,1180px)] mx-auto grid grid-cols-[1.05fr_.95fr] gap-[clamp(2rem,5vw,3.5rem)] items-start max-[980px]:grid-cols-1">
        {/* Info */}
        <div className="reveal">
          <p className="inline-flex items-center gap-[.6rem] font-bold text-[.78rem] tracking-[.16em] uppercase text-teal">
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" /> Get in touch
          </p>
          <h2 className="font-serif font-semibold leading-[1.1] tracking-tight text-[clamp(1.9rem,4vw,2.9rem)] text-navy mt-[.9rem]">
            Book an Appointment
          </h2>
          <p className="text-muted mt-4 max-w-[46ch]">
            Expert evaluation and surgical care for both routine and complex gastrointestinal
            conditions. Reach the clinic directly or send a request and we&apos;ll call you back.
          </p>

          <ul className="list-none mt-[1.8rem] flex flex-col gap-[1.2rem] p-0">
            <li className="flex gap-[.9rem]">
              <span className="w-[44px] h-[44px] shrink-0 rounded-[12px] grid place-items-center bg-gradient-to-br from-emerald-2/14 to-teal/14 text-teal">
                <Pin className="ico w-5 h-5" />
              </span>
              <div>
                <strong className="block text-navy mb-[.15rem]">Chennai Speciality Clinic</strong>
                <div className="text-muted text-[.95rem] leading-[1.55]">
                  1, Thiruvalluvarpuram 3rd St, near Thiripurasundari Temple &amp; next to Jothi
                  Medicals, Thiruvalluvar Puram, Choolaimedu, Chennai, Tamil Nadu 600094
                </div>
              </div>
            </li>
            <li className="flex gap-[.9rem]">
              <span className="w-[44px] h-[44px] shrink-0 rounded-[12px] grid place-items-center bg-gradient-to-br from-emerald-2/14 to-teal/14 text-teal">
                <Phone className="ico w-5 h-5" />
              </span>
              <div>
                <strong className="block text-navy mb-[.15rem]">Call the clinic</strong>
                <a href="tel:04448134300" className="font-serif text-[1.4rem] font-semibold text-teal">
                  044 4813 4300
                </a>
              </div>
            </li>
          </ul>

          <div className="mt-[1.8rem] rounded-[18px] overflow-hidden border border-line shadow-[0_4px_18px_rgba(16,56,98,.07)] h-[230px]">
            <iframe
              title="Chennai Speciality Clinic location"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0 saturate-[.9]"
            />
          </div>
        </div>

        {/* Form */}
        <form
          className="reveal bg-card border border-line rounded-[26px] p-8 shadow-[0_18px_50px_-20px_rgba(16,56,98,.28)]"
          data-reveal-delay="120"
          onSubmit={onSubmit}
          noValidate
        >
          <h3 className="font-serif text-[1.45rem] text-navy font-semibold mb-[1.2rem]">
            Request an appointment
          </h3>

          <div className="mb-[1.05rem]">
            <label htmlFor="f-name" className="block font-bold text-[.82rem] text-navy mb-[.4rem] tracking-[.02em]">
              Name
            </label>
            <input
              id="f-name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={update("name")}
              required
              className="w-full font-sans text-[.97rem] text-ink py-[.85rem] px-4 border border-line rounded-[12px] bg-[#fbfdfc] transition-all duration-250 focus:outline-none focus:border-emerald-2 focus:shadow-[0_0_0_4px_rgba(31,184,134,.14)]"
            />
          </div>

          <div className="mb-[1.05rem]">
            <label htmlFor="f-phone" className="block font-bold text-[.82rem] text-navy mb-[.4rem] tracking-[.02em]">
              Phone
            </label>
            <input
              id="f-phone"
              type="tel"
              placeholder="Mobile number"
              value={form.phone}
              onChange={update("phone")}
              required
              className="w-full font-sans text-[.97rem] text-ink py-[.85rem] px-4 border border-line rounded-[12px] bg-[#fbfdfc] transition-all duration-250 focus:outline-none focus:border-emerald-2 focus:shadow-[0_0_0_4px_rgba(31,184,134,.14)]"
            />
          </div>

          <div className="mb-[1.05rem]">
            <label htmlFor="f-date" className="block font-bold text-[.82rem] text-navy mb-[.4rem] tracking-[.02em]">
              Preferred date
            </label>
            <input
              id="f-date"
              type="date"
              value={form.date}
              onChange={update("date")}
              className="w-full font-sans text-[.97rem] text-ink py-[.85rem] px-4 border border-line rounded-[12px] bg-[#fbfdfc] transition-all duration-250 focus:outline-none focus:border-emerald-2 focus:shadow-[0_0_0_4px_rgba(31,184,134,.14)]"
            />
          </div>

          <div className="mb-[1.05rem]">
            <label htmlFor="f-msg" className="block font-bold text-[.82rem] text-navy mb-[.4rem] tracking-[.02em]">
              Message
            </label>
            <textarea
              id="f-msg"
              rows={4}
              placeholder="Briefly describe your concern (optional)"
              value={form.message}
              onChange={update("message")}
              className="w-full font-sans text-[.97rem] text-ink py-[.85rem] px-4 border border-line rounded-[12px] bg-[#fbfdfc] transition-all duration-250 resize-y focus:outline-none focus:border-emerald-2 focus:shadow-[0_0_0_4px_rgba(31,184,134,.14)]"
            />
          </div>

          <button
            type="submit"
            className="
              w-full justify-center inline-flex items-center gap-[.55rem] font-sans font-bold text-[.98rem]
              py-[.95rem] px-[1.6rem] rounded-full border border-transparent
              bg-gradient-to-br from-emerald-2 to-teal text-white leading-none
              shadow-[0_14px_30px_-12px_rgba(21,151,106,.7)]
              hover:-translate-y-[3px] hover:shadow-[0_22px_42px_-14px_rgba(21,151,106,.85)]
              transition-all duration-350 whitespace-nowrap cursor-pointer
            "
            style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
          >
            Send Request
          </button>

          {sent ? (
            <p className="mt-4 text-emerald font-semibold text-[.92rem] bg-emerald/10 border border-emerald/25 rounded-[10px] py-[.7rem] px-[.9rem]">
              Thank you — your request has been noted. The clinic will call you back shortly.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
