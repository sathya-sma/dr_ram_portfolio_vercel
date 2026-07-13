import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { track } from "@vercel/analytics";
import { Pin, Phone } from "@/lib/icons";
import {
  ADDRESS_FULL,
  CLINIC_NAME,
  MAP_DIRECTIONS_URL,
  MAP_EMBED_SRC,
  PHONE_DISPLAY,
  PHONE_TEL,
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  WHATSAPP_NUMBER,
} from "@/lib/site";
import { openLegal } from "./Legal";

type Status = "idle" | "sending" | "sent" | "whatsapp" | "error";
type Errors = Partial<Record<"name" | "phone" | "consent", string>>;

const INPUT_CLASS =
  "w-full font-sans text-[.97rem] text-ink py-[clamp(0.6rem,2vw,0.85rem)] px-[clamp(0.8rem,2vw,1.1rem)] border rounded-[12px] bg-[#fbfdfc] transition-all duration-250 focus:outline-none focus:border-emerald-2 focus:shadow-[0_0_0_4px_rgba(31,184,134,.14)]";

function todayISO() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({ name: "", phone: "", date: "", message: "" });
  const [consent, setConsent] = useState(false);

  const update =
    (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      if (errors[k as keyof Errors]) setErrors((er) => ({ ...er, [k]: undefined }));
    };

  const validate = (): Errors => {
    const er: Errors = {};
    if (!form.name.trim()) er.name = "Please enter your name.";
    if (!form.phone.trim()) {
      er.phone = "Please enter your mobile number.";
    } else if (!/^\+?[\d\s()-]{8,16}$/.test(form.phone.trim())) {
      er.phone = "Please enter a valid phone number.";
    }
    if (!consent) er.consent = "Please confirm you agree to be contacted.";
    return er;
  };

  const enquiryText = () =>
    [
      "New appointment request",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.date ? `Preferred date: ${form.date}` : "",
      form.message.trim() ? `Message: ${form.message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length > 0) {
      const first = Object.keys(er)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }

    // Honeypot: silently drop bot submissions.
    const honey = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.value;
    if (honey) {
      setStatus("sent");
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      // Email relay not configured — hand the enquiry to WhatsApp instead so it still reaches the clinic.
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiryText())}`,
        "_blank",
        "noopener,noreferrer"
      );
      setStatus("whatsapp");
      track("appointment_request", { channel: "whatsapp_fallback" });
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Appointment request — ${form.name.trim()}`,
          from_name: `${CLINIC_NAME} website`,
          name: form.name.trim(),
          phone: form.phone.trim(),
          preferred_date: form.date || "Not specified",
          message: form.message.trim() || "No message",
        }),
      });
      const data: { success?: boolean } = await res.json();
      if (!res.ok || !data.success) throw new Error("Submission failed");
      setStatus("sent");
      setForm({ name: "", phone: "", date: "", message: "" });
      setConsent(false);
      track("appointment_request", { channel: "email" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-[2.8rem] relative" id="contact">
      <div className="w-[min(100%-2.4rem,73.75rem)] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-[2.5rem] lg:gap-[3.5rem] items-start">
        {/* Info */}
        <div className="reveal">
          <p className="inline-flex items-center gap-[.6rem] font-bold text-[.78rem] tracking-[.16em] uppercase text-teal">
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" /> Get in touch
          </p>
          <h2 className="font-serif font-semibold leading-[1.1] tracking-tight text-[2.9rem] text-navy mt-[.9rem]">
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
                <strong className="block text-navy mb-[.15rem]">{CLINIC_NAME}</strong>
                <div className="text-muted text-[.95rem] leading-[1.55]">{ADDRESS_FULL}</div>
                <a
                  href={MAP_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-[.35rem] text-[.9rem] font-bold text-teal underline underline-offset-4 transition-colors duration-250 hover:text-navy"
                >
                  Get directions
                </a>
              </div>
            </li>
            <li className="flex gap-[.9rem]">
              <span className="w-[44px] h-[44px] shrink-0 rounded-[12px] grid place-items-center bg-gradient-to-br from-emerald-2/14 to-teal/14 text-teal">
                <Phone className="ico w-5 h-5" />
              </span>
              <div>
                <strong className="block text-navy mb-[.15rem]">Call the clinic</strong>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="font-serif text-[1.4rem] font-semibold text-teal"
                  onClick={() => track("call_click", { source: "contact" })}
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </li>
          </ul>

          <div className="mt-[1.8rem] rounded-[18px] overflow-hidden border border-line shadow-[0_4px_18px_rgba(16,56,98,.07)] h-[clamp(180px,22vw,240px)]">
            <iframe
              title={`${CLINIC_NAME} location on Google Maps`}
              src={MAP_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0 saturate-[.9]"
            />
          </div>
        </div>

        {/* Form */}
        <form
          className="reveal bg-card border border-line rounded-[26px] p-[clamp(1rem,4vw,2rem)] shadow-[0_18px_50px_-20px_rgba(16,56,98,.28)]"
          data-reveal-delay="120"
          onSubmit={onSubmit}
          noValidate
        >
          <h3 className="font-serif text-[1.45rem] text-navy font-semibold mb-[1.2rem]">
            Request an appointment
          </h3>

          {/* Honeypot — invisible to people, tempting to bots */}
          <input
            type="text"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute opacity-0 -z-10 h-0 w-0 pointer-events-none"
          />

          <div className="mb-[1.05rem]">
            <label htmlFor="f-name" className="block font-bold text-[.82rem] text-navy mb-[.4rem] tracking-[.02em]">
              Name
            </label>
            <input
              id="f-name"
              name="name"
              type="text"
              placeholder="Your full name"
              autoComplete="name"
              value={form.name}
              onChange={update("name")}
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "f-name-error" : undefined}
              className={`${INPUT_CLASS} ${errors.name ? "border-[#c0392b]" : "border-line"}`}
            />
            {errors.name ? (
              <p id="f-name-error" className="mt-[.35rem] text-[.82rem] font-semibold text-[#c0392b]">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="mb-[1.05rem]">
            <label htmlFor="f-phone" className="block font-bold text-[.82rem] text-navy mb-[.4rem] tracking-[.02em]">
              Phone
            </label>
            <input
              id="f-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              placeholder="Mobile number"
              autoComplete="tel"
              value={form.phone}
              onChange={update("phone")}
              required
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "f-phone-error" : undefined}
              className={`${INPUT_CLASS} ${errors.phone ? "border-[#c0392b]" : "border-line"}`}
            />
            {errors.phone ? (
              <p id="f-phone-error" className="mt-[.35rem] text-[.82rem] font-semibold text-[#c0392b]">
                {errors.phone}
              </p>
            ) : null}
          </div>

          <div className="mb-[1.05rem]">
            <label htmlFor="f-date" className="block font-bold text-[.82rem] text-navy mb-[.4rem] tracking-[.02em]">
              Preferred date <span className="font-semibold text-muted">(optional)</span>
            </label>
            <input
              id="f-date"
              name="preferred_date"
              type="date"
              min={todayISO()}
              value={form.date}
              onChange={update("date")}
              className={`${INPUT_CLASS} border-line`}
            />
          </div>

          <div className="mb-[1.05rem]">
            <label htmlFor="f-msg" className="block font-bold text-[.82rem] text-navy mb-[.4rem] tracking-[.02em]">
              Message <span className="font-semibold text-muted">(optional)</span>
            </label>
            <textarea
              id="f-msg"
              name="message"
              rows={4}
              placeholder="Briefly describe your concern"
              value={form.message}
              onChange={update("message")}
              className={`${INPUT_CLASS} border-line resize-y`}
            />
          </div>

          <div className="mb-[1.2rem]">
            <label className="flex items-start gap-[.6rem] cursor-pointer text-[.85rem] text-muted leading-[1.5]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (errors.consent) setErrors((er) => ({ ...er, consent: undefined }));
                }}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "f-consent-error" : undefined}
                className="mt-[.2rem] w-4 h-4 shrink-0 accent-[#0e7c8b]"
                id="f-consent"
              />
              <span>
                I agree to be contacted by the clinic about this request, as described in the{" "}
                <button
                  type="button"
                  onClick={() => openLegal()}
                  className="font-bold text-teal underline underline-offset-2 bg-transparent border-0 p-0 cursor-pointer"
                >
                  privacy policy
                </button>
                .
              </span>
            </label>
            {errors.consent ? (
              <p id="f-consent-error" className="mt-[.35rem] text-[.82rem] font-semibold text-[#c0392b]">
                {errors.consent}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="
              w-full justify-center inline-flex items-center gap-[.55rem] font-sans font-bold text-[.98rem]
              py-[.95rem] px-[1.6rem] rounded-full border border-transparent
              bg-gradient-to-br from-emerald-2 to-teal text-white leading-none
              shadow-[0_14px_30px_-12px_rgba(21,151,106,.7)]
              hover:-translate-y-[3px] hover:shadow-[0_22px_42px_-14px_rgba(21,151,106,.85)]
              transition-all duration-350 whitespace-nowrap cursor-pointer
              disabled:opacity-70 disabled:cursor-wait disabled:hover:translate-y-0
            "
            style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
          >
            {status === "sending" ? "Sending…" : "Send Request"}
          </button>

          <div aria-live="polite">
            {status === "sent" ? (
              <p className="mt-4 text-[#0e6f4f] font-semibold text-[.92rem] bg-emerald/10 border border-emerald/25 rounded-[10px] py-[.7rem] px-[.9rem]">
                Thank you — your request has been sent to the clinic. We will call you back to
                confirm your appointment.
              </p>
            ) : null}
            {status === "whatsapp" ? (
              <p className="mt-4 text-[#0e6f4f] font-semibold text-[.92rem] bg-emerald/10 border border-emerald/25 rounded-[10px] py-[.7rem] px-[.9rem]">
                WhatsApp has opened with your request pre-filled — please press send to deliver
                it to the clinic. You can also call us on {PHONE_DISPLAY}.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mt-4 text-[#9c2f21] font-semibold text-[.92rem] bg-[#c0392b]/8 border border-[#c0392b]/25 rounded-[10px] py-[.7rem] px-[.9rem]">
                Sorry — your request could not be sent. Please call us on{" "}
                <a href={`tel:${PHONE_TEL}`} className="underline underline-offset-2">
                  {PHONE_DISPLAY}
                </a>{" "}
                or use the WhatsApp button.
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
