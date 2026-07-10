/**
 * Single source of truth for clinic contact details, URLs and identity.
 * Update values here — never hard-code them inside components.
 */

/** Production origin. Must match the canonical URL in index.html, sitemap.xml and robots.txt. */
export const SITE_URL = "https://dr-ram-portfolio-vercel.vercel.app";

export const DOCTOR_NAME = "Dr. T. Ramkumar";
export const DOCTOR_TITLE = "Consultant Gastrointestinal Surgeon";
export const CLINIC_NAME = "Chennai Speciality Clinic";

export const PHONE_DISPLAY = "044 4813 4300";
export const PHONE_TEL = "+914448134300";

/** WhatsApp number in international format, digits only (no +). */
export const WHATSAPP_NUMBER = "919344903258";
export const WHATSAPP_MESSAGE = "Hello, I would like to book an appointment with Dr. T. Ramkumar.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const ADDRESS_FULL =
  "1, Thiruvalluvarpuram 3rd St, near Thiripurasundari Temple & next to Jothi Medicals, Thiruvalluvar Puram, Choolaimedu, Chennai, Tamil Nadu 600094";

export const REVIEW_URL = "https://share.google/avpJT84DsPSXmc7IG";

export const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent("Chennai Speciality Clinic, 1 Thiruvalluvarpuram 3rd St, Choolaimedu, Chennai 600094") +
  "&t=&z=16&ie=UTF8&iwloc=&output=embed";

export const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("Chennai Speciality Clinic, 1 Thiruvalluvarpuram 3rd St, Choolaimedu, Chennai 600094");

/**
 * Appointment enquiries are delivered by Web3Forms (https://web3forms.com) —
 * a static-site form relay that emails submissions to the address the access
 * key is registered with (currently sathyadharsan93@gmail.com).
 *
 * Web3Forms access keys are public-by-design (they identify the recipient,
 * not authenticate a sender), so the key lives here as the default; the
 * VITE_WEB3FORMS_ACCESS_KEY env var still takes precedence when set, which
 * is how to re-point delivery to a different inbox without a code change.
 */
export const WEB3FORMS_ACCESS_KEY: string =
  (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ??
  "1f7d3462-6c29-436c-9b1e-972469f0f160";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
