const REVIEW_URL = "https://share.google/avpJT84DsPSXmc7IG";

export default function Footer() {
  return (
    <footer className="bg-navy text-[#c4d6dd] pt-16 pb-[1.5rem] relative isolate">
      {/* Glow background */}
      <div
        className="absolute inset-0 -z-[1]"
        style={{
          background: "radial-gradient(70% 100% at 15% 0%, rgba(31,184,134,.12), transparent 55%)",
        }}
      />

      <div className="w-[min(100%-2.4rem,1180px)] mx-auto grid grid-cols-[1.6fr_1fr_1.2fr_1.1fr] gap-8 max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
        {/* Brand */}
        <div>
          <img
            src="/brand/logo-white.png"
            alt="Chennai Speciality Clinic"
            className="h-[46px] w-auto mb-4"
          />
          <p className="font-serif text-[1.4rem] text-white font-semibold">Dr T Ramkumar</p>
          <p className="text-[.9rem] mt-[.3rem] text-[#9fb6bf]">
            MS · Consultant Gastrointestinal Surgeon
            <br />
            Laparoscopic &amp; Robotic Cancer Surgeon
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-white text-[.95rem] mb-4 tracking-[.03em]">Explore</h4>
          {["about", "specialities", "conditions", "hospitals", "reviews"].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="block text-[#a9c0c8] text-[.93rem] mb-[.55rem] w-fit transition-all duration-250 hover:text-emerald-glow hover:pl-1"
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
        </div>

        {/* Visit */}
        <div>
          <h4 className="text-white text-[.95rem] mb-4 tracking-[.03em]">Visit</h4>
          <p className="text-[.9rem] text-[#a9c0c8] mb-[.7rem] leading-[1.6]">
            Chennai Speciality Clinic
            <br />
            Thiruvalluvar Puram, Choolaimedu,
            <br />
            Chennai 600094
          </p>
          <a href="tel:04448134300" className="font-serif text-[1.2rem] text-white!">
            044 4813 4300
          </a>
        </div>

        {/* Appointments */}
        <div>
          <h4 className="text-white text-[.95rem] mb-4 tracking-[.03em]">Appointments</h4>
          <a
            href="#contact"
            className="
              inline-flex items-center gap-[.55rem] font-sans font-bold text-[.9rem]
              py-[.7rem] px-[1.15rem] rounded-full border border-transparent
              bg-gradient-to-br from-emerald-2 to-teal text-white
              shadow-[0_14px_30px_-12px_rgba(21,151,106,.7)]
              hover:-translate-y-[3px] hover:shadow-[0_22px_42px_-14px_rgba(21,151,106,.85)]
              transition-all duration-350 whitespace-nowrap leading-none cursor-pointer mb-[.9rem]
            "
            style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
          >
            Book Appointment
          </a>
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[#f5c451]! font-semibold text-[.93rem] w-fit transition-all duration-250 hover:text-emerald-glow hover:pl-1"
          >
            ★ Leave a Google review
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-[min(100%-2.4rem,1180px)] mx-auto flex justify-between gap-4 flex-wrap mt-12 pt-[1.4rem] border-t border-white/12 text-[.82rem] text-[#8ba4ad]">
        <p>
          © {new Date().getFullYear()} Dr T Ramkumar · Chennai Speciality Clinic. All rights reserved.
        </p>
        <p>For medical emergencies, please visit your nearest hospital.</p>
      </div>
    </footer>
  );
}
