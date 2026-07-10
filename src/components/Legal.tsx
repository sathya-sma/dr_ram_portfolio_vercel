import { useEffect, useRef } from "react";
import { CLINIC_NAME, DOCTOR_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const OPEN_EVENT = "open-legal-dialog";

/** Open the privacy policy & medical disclaimer dialog from anywhere. */
export function openLegal() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

/**
 * Privacy policy + medical disclaimer, rendered once (in App) as a native
 * <dialog>, which provides focus containment and Escape handling for free.
 */
export default function Legal() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => ref.current?.showModal();
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="legal-title"
      className="
        m-auto w-[min(92vw,680px)] max-h-[85vh] overflow-y-auto
        bg-card text-ink rounded-[26px] border border-line p-0
        shadow-[0_40px_80px_-28px_rgba(10,35,66,.45)]
        backdrop:bg-navy/55 backdrop:backdrop-blur-[3px]
      "
      onClick={(e) => {
        // Close when the backdrop (the dialog element itself) is clicked.
        if (e.target === ref.current) close();
      }}
    >
      <div className="p-[clamp(1.6rem,4vw,2.6rem)]">
        <div className="flex items-start justify-between gap-4">
          <h2 id="legal-title" className="font-serif font-semibold text-[1.6rem] text-navy m-0">
            Privacy Policy &amp; Disclaimer
          </h2>
          <button
            onClick={close}
            aria-label="Close dialog"
            className="shrink-0 w-11 h-11 grid place-items-center rounded-full border border-line bg-bg text-muted text-[1.2rem] leading-none cursor-pointer transition-colors duration-250 hover:text-navy hover:border-teal/40"
          >
            ×
          </button>
        </div>

        <div className="mt-4 text-[.95rem] leading-[1.7] text-muted [&_h3]:font-bold [&_h3]:text-navy [&_h3]:text-[1.02rem] [&_h3]:mt-5 [&_h3]:mb-1">
          <p className="m-0">
            This notice explains how {CLINIC_NAME} (&ldquo;the clinic&rdquo;) handles the
            personal information you share through this website.
          </p>

          <h3>Information we collect</h3>
          <p className="m-0">
            When you submit the appointment form we collect your name, phone number, preferred
            appointment date and any message you choose to include. We do not use cookies for
            tracking, and we do not collect any information from you automatically beyond
            anonymous, aggregate visit statistics.
          </p>

          <h3>How we use it</h3>
          <p className="m-0">
            Your details are used solely to contact you about your appointment request. They are
            delivered securely to the clinic&rsquo;s email and are not shared with, or sold to,
            any third party. You may ask the clinic to correct or delete your information at any
            time by calling{" "}
            <a href={`tel:${PHONE_TEL}`} className="font-semibold text-teal">
              {PHONE_DISPLAY}
            </a>
            .
          </p>

          <h3>Third-party services</h3>
          <p className="m-0">
            This site embeds Google Maps to show the clinic&rsquo;s location and links to Google
            Reviews; those services are governed by Google&rsquo;s own privacy policy. Form
            submissions are relayed by a secure form-delivery service for the sole purpose of
            reaching the clinic&rsquo;s inbox.
          </p>

          <h3>Medical disclaimer</h3>
          <p className="m-0">
            The information on this website is provided for general awareness and is not a
            substitute for professional medical advice, diagnosis or treatment. Always consult{" "}
            {DOCTOR_NAME} or another qualified clinician about your individual condition. In a
            medical emergency, please go to your nearest hospital immediately.
          </p>
        </div>

        <button
          onClick={close}
          className="
            mt-6 inline-flex items-center gap-[.55rem] font-sans font-bold text-[.9rem]
            py-[clamp(0.6rem,2vw,0.7rem)] px-[clamp(0.9rem,3vw,1.15rem)] rounded-full border border-transparent
            bg-gradient-to-br from-emerald-2 to-teal text-white
            shadow-[0_14px_30px_-12px_rgba(21,151,106,.7)] leading-none cursor-pointer
          "
        >
          Close
        </button>
      </div>
    </dialog>
  );
}
