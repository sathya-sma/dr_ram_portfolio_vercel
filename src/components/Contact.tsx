import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { track } from "@vercel/analytics";
import { Pin, Phone } from "@/lib/icons";
import {
  ADDRESS_FULL,
  BOOK_APPOINTMENT_ENDPOINT,
  CLINIC_NAME,
  MAP_DIRECTIONS_URL,
  MAP_EMBED_SRC,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/site";
import { openLegal } from "./Legal";

type FieldKey = "name" | "email" | "mobile" | "date" | "message" | "type";
type FormState = Record<FieldKey, string>;
type Errors = Partial<Record<FieldKey, string>>;
type Status = "idle" | "submitting" | "sent" | "error";

const EASE = [0.22, 1, 0.36, 1] as const;

// Kept in sync with api/book-appointment.ts's server-side copies — the
// server re-validates everything regardless, these are purely for instant
// feedback. Name intentionally allows periods too (not just letters/spaces/
// apostrophes/hyphens): Indian names routinely carry a title or initial —
// "Dr. Raj Kumar", "T. Ramkumar" — and rejecting them would be a false
// negative on real input, not a meaningful validation win.
const NAME_RE = /^[A-Za-z][A-Za-z\s'.-]{1,78}[A-Za-z.]$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^(?:\+?91)?[6-9]\d{9}$/;
const MESSAGE_MAX = 500;

function todayISO() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function validateField(key: FieldKey, value: string): string | undefined {
  const v = value.trim();
  switch (key) {
    case "name":
      if (!v) return "Please enter your full name.";
      if (v.length < 3) return "Name must be at least 3 characters.";
      if (v.length > 80) return "Name must be 80 characters or fewer.";
      if (!NAME_RE.test(v)) return "Only letters, spaces, apostrophes and hyphens are allowed.";
      return undefined;
    case "email":
      if (!v) return "Please enter your email address.";
      if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
      return undefined;
    case "mobile": {
      if (!v) return "Please enter your mobile number.";
      const digits = v.replace(/[\s-]/g, "");
      if (!MOBILE_RE.test(digits)) return "Please enter a valid 10-digit Indian mobile number.";
      return undefined;
    }
    case "date": {
      if (!v) return undefined; // optional
      const picked = new Date(`${v}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (picked < today) return "Preferred date cannot be in the past.";
      return undefined;
    }
    case "message":
      if (v.length > MESSAGE_MAX) return `Message must be ${MESSAGE_MAX} characters or fewer.`;
      return undefined;
    case "type":
      return undefined;
  }
}

const FIELD_ORDER: FieldKey[] = ["name", "email", "mobile", "date", "message"];

const inputClass = (hasError: boolean) =>
  `w-full font-sans text-[1rem] text-ink py-[1rem] px-[1.1rem] rounded-[16px] border-[1.5px] bg-[#fbfdfc]
   transition-all duration-250 focus:outline-none
   ${
     hasError
       ? "border-[#c0392b] focus:border-[#c0392b] focus:shadow-[0_0_0_4px_rgba(192,57,43,.12)]"
       : "border-line focus:border-emerald-2 focus:shadow-[0_0_0_4px_rgba(31,184,134,.14)]"
   }`;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", mobile: "", date: "", message: "", type: "clinic" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const resetTimer = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const update = (key: FieldKey) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    // Real-time correction: once a field has been visited, re-validate on
    // every keystroke so a fixed error clears immediately instead of
    // waiting for the next blur or a full resubmit.
    if (touched[key]) {
      setErrors((er) => ({ ...er, [key]: validateField(key, value) }));
    }
  };

  const onBlur = (key: FieldKey) => (_e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((er) => ({ ...er, [key]: validateField(key, form[key]) }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const nextErrors: Errors = {};
    for (const key of FIELD_ORDER) nextErrors[key] = validateField(key, form[key]);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, mobile: true, date: true, message: true });

    const firstInvalid = FIELD_ORDER.find((k) => nextErrors[k]);
    if (firstInvalid) {
      document.getElementById(`f-${firstInvalid}`)?.focus();
      return;
    }

    // Honeypot — invisible to people, tempting to bots.
    const honey = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.value;

    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch(BOOK_APPOINTMENT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, botcheck: honey }),
      });
      const data: { success?: boolean; message?: string; referenceNumber?: string } = await res
        .json()
        .catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Your request could not be sent.");
      }

      setReferenceNumber(data.referenceNumber ?? null);
      setStatus("sent");
      track("appointment_request", { channel: "email" });
      resetTimer.current = window.setTimeout(() => {
        setForm({ name: "", email: "", mobile: "", date: "", message: "", type: "clinic" });
        setErrors({});
        setTouched({});
        setReferenceNumber(null);
        setStatus("idle");
      }, 6000);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="py-[clamp(1.8rem,3.5vw,2.8rem)] relative" id="contact">
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
          <div className="mt-5 inline-flex items-center gap-[.5rem] bg-emerald-2/8 border border-emerald-2/20 text-[#0e7c8b] rounded-full py-[.35rem] px-[.85rem] text-[.82rem] font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-2 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-2"></span>
            </span>
            Online &amp; Video Consultations Available
          </div>

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

          <div className="mt-[1.8rem] rounded-[18px] overflow-hidden border border-line shadow-[0_4px_18px_rgba(16,56,98,.07)] h-[230px]">
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
        <div
          className="reveal relative bg-card border border-line rounded-[26px] p-8 shadow-[0_18px_50px_-20px_rgba(16,56,98,.28)] overflow-hidden"
          data-reveal-delay="120"
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col items-center text-center py-[2.4rem] px-[.5rem]"
              >
                <motion.svg
                  viewBox="0 0 52 52"
                  className="w-16 h-16 mb-[1.4rem]"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="24"
                    fill="none"
                    stroke="#1fb886"
                    strokeWidth="2.5"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } },
                    }}
                  />
                  <motion.path
                    d="M15 27l7 7 15-15"
                    fill="none"
                    stroke="#1fb886"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: { duration: 0.4, ease: EASE, delay: 0.35 },
                      },
                    }}
                  />
                </motion.svg>
                <h3 className="font-serif text-[1.4rem] text-navy font-semibold mb-[.7rem]">
                  Appointment Request Received
                </h3>
                {referenceNumber ? (
                  <span className="inline-flex items-center gap-[.4rem] font-mono text-[.85rem] font-bold tracking-[.02em] text-[#0e6f4f] bg-emerald/10 border border-emerald/25 rounded-full py-[.4rem] px-[1rem] mb-[.9rem]">
                    Ref: {referenceNumber}
                  </span>
                ) : null}
                <p className="text-muted max-w-[36ch] leading-[1.6]">
                  A confirmation email has been sent to your registered email address. Our clinic
                  team will contact you shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onSubmit={onSubmit}
                noValidate
              >
                <h3 className="font-serif text-[1.45rem] text-navy font-semibold mb-[1.3rem]">
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

                <Field
                  id="f-name"
                  label="Full Name"
                  required
                  error={errors.name}
                >
                  <input
                    id="f-name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    maxLength={80}
                    value={form.name}
                    onChange={update("name")}
                    onBlur={onBlur("name")}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "f-name-error" : undefined}
                    className={inputClass(!!errors.name)}
                  />
                </Field>

                <Field id="f-email" label="Email Address" required error={errors.email}>
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    placeholder="Enter your email address"
                    autoComplete="email"
                    value={form.email}
                    onChange={update("email")}
                    onBlur={onBlur("email")}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "f-email-error" : undefined}
                    className={inputClass(!!errors.email)}
                  />
                </Field>

                <Field id="f-mobile" label="Mobile Number" required error={errors.mobile}>
                  <input
                    id="f-mobile"
                    name="mobile"
                    type="tel"
                    inputMode="tel"
                    placeholder="Enter your mobile number"
                    autoComplete="tel"
                    maxLength={16}
                    value={form.mobile}
                    onChange={update("mobile")}
                    onBlur={onBlur("mobile")}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.mobile}
                    aria-describedby={errors.mobile ? "f-mobile-error" : undefined}
                    className={inputClass(!!errors.mobile)}
                  />
                </Field>

                <Field id="f-type-clinic" label="Consultation Type" required>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`flex flex-col p-[1rem] rounded-[16px] border-[1.5px] cursor-pointer transition-all duration-250 select-none
                        ${
                          form.type === "clinic"
                            ? "border-emerald-2 bg-emerald-2/5 shadow-[0_0_0_4px_rgba(31,184,134,.1)]"
                            : "border-line bg-[#fbfdfc] hover:border-emerald-2/40"
                        }
                      `}
                    >
                      <input
                        id="f-type-clinic"
                        type="radio"
                        name="type"
                        value="clinic"
                        checked={form.type === "clinic"}
                        onChange={() => setForm((f) => ({ ...f, type: "clinic" }))}
                        className="sr-only"
                      />
                      <span className="font-bold text-[0.92rem] text-navy">Clinic Visit</span>
                      <span className="text-[0.76rem] text-muted mt-[0.15rem]">Choolaimedu Clinic</span>
                    </label>
                    <label
                      className={`flex flex-col p-[1rem] rounded-[16px] border-[1.5px] cursor-pointer transition-all duration-250 select-none
                        ${
                          form.type === "online"
                            ? "border-emerald-2 bg-emerald-2/5 shadow-[0_0_0_4px_rgba(31,184,134,.1)]"
                            : "border-line bg-[#fbfdfc] hover:border-emerald-2/40"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="type"
                        value="online"
                        checked={form.type === "online"}
                        onChange={() => setForm((f) => ({ ...f, type: "online" }))}
                        className="sr-only"
                      />
                      <span className="font-bold text-[0.92rem] text-navy">Online Consult</span>
                      <span className="text-[0.76rem] text-muted mt-[0.15rem]">Video Checkup</span>
                    </label>
                  </div>
                </Field>

                <Field id="f-date" label="Preferred Appointment Date" error={errors.date}>
                  <input
                    id="f-date"
                    name="date"
                    type="date"
                    min={todayISO()}
                    value={form.date}
                    onChange={update("date")}
                    onBlur={onBlur("date")}
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? "f-date-error" : undefined}
                    className={`${inputClass(!!errors.date)} [color-scheme:light]`}
                  />
                </Field>

                <Field
                  id="f-message"
                  label="Message"
                  error={errors.message}
                  hint={`${form.message.length}/${MESSAGE_MAX}`}
                >
                  <textarea
                    id="f-message"
                    name="message"
                    rows={4}
                    placeholder="Briefly describe your health concern (optional)"
                    maxLength={MESSAGE_MAX}
                    value={form.message}
                    onChange={update("message")}
                    onBlur={onBlur("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "f-message-error" : undefined}
                    className={`${inputClass(!!errors.message)} resize-y`}
                  />
                </Field>

                <p className="text-[.82rem] text-muted leading-[1.6] mb-[1.3rem]">
                  By submitting, you agree to be contacted by the clinic about this request, as
                  described in our{" "}
                  <button
                    type="button"
                    onClick={() => openLegal()}
                    className="font-bold text-teal underline underline-offset-2 bg-transparent border-0 p-0 cursor-pointer"
                  >
                    privacy policy
                  </button>
                  .
                </p>

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={status === "submitting" ? undefined : { y: -3 }}
                  whileTap={status === "submitting" ? undefined : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  className="
                    w-full justify-center inline-flex items-center gap-[.55rem] font-sans font-bold text-[1rem]
                    py-[1.05rem] px-[1.6rem] rounded-full border border-transparent
                    bg-gradient-to-br from-emerald-2 to-teal text-white leading-none
                    shadow-[0_14px_30px_-12px_rgba(21,151,106,.7)]
                    hover:shadow-[0_22px_42px_-14px_rgba(21,151,106,.85)]
                    disabled:opacity-70 disabled:cursor-wait
                  "
                >
                  {status === "submitting" ? (
                    <>
                      <span className="w-[18px] h-[18px] rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Booking…
                    </>
                  ) : (
                    "Book Appointment"
                  )}
                </motion.button>

                <AnimatePresence>
                  {status === "error" && serverError ? (
                    <motion.p
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.25 }}
                      role="alert"
                      className="overflow-hidden text-[#9c2f21] font-semibold text-[.92rem] bg-[#c0392b]/8 border border-[#c0392b]/25 rounded-[14px] py-[.7rem] px-[.9rem]"
                    >
                      {serverError} Please try again or call us on{" "}
                      <a href={`tel:${PHONE_TEL}`} className="underline underline-offset-2">
                        {PHONE_DISPLAY}
                      </a>
                      .
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-[1.15rem]">
      <div className="flex items-baseline justify-between mb-[.45rem]">
        <label htmlFor={id} className="font-bold text-[.85rem] text-navy tracking-[.02em]">
          {label} {required ? <span className="text-[#c0392b]">*</span> : null}
        </label>
        {hint ? <span className="text-[.76rem] text-muted font-semibold">{hint}</span> : null}
      </div>
      {children}
      <AnimatePresence>
        {error ? (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="mt-[.4rem] text-[.82rem] font-semibold text-[#c0392b]"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
