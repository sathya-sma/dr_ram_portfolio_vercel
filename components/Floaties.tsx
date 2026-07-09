import { WhatsApp, Phone } from "@/lib/icons";

// TODO: replace with the clinic's real WhatsApp number (with country code, no +).
const WHATSAPP_NUMBER = "910000000000";

export default function Floaties() {
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Dr Ramkumar, I'd like to book an appointment"
  )}`;

  return (
    <div className="floaties">
      <a
        href={waHref}
        className="fab fab--wa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <WhatsApp />
      </a>
      <a href="tel:04448134300" className="fab fab--call" aria-label="Call the clinic">
        <Phone />
        <span className="fab__pulse" />
      </a>
    </div>
  );
}
