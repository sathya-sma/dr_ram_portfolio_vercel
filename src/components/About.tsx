import { Stethoscope } from "@/lib/icons";

export default function About() {
  return (
    <section className="py-[clamp(4.5rem,9vw,8rem)] relative" id="about">
      <div className="w-[min(100%-2.4rem,1180px)] mx-auto grid grid-cols-[.9fr_1.1fr] gap-[clamp(2rem,5vw,4rem)] items-center max-[980px]:grid-cols-1">
        {/* Image */}
        <div className="reveal relative">
          {/* Decorative corner */}
          <div className="absolute -inset-x-0 -top-[14px] -left-[14px] w-[120px] h-[120px] rounded-[20px] bg-gradient-to-br from-emerald-2 to-teal opacity-18 -z-[1]" />
          <img
            src="/brand/or-action.jpeg"
            alt="Dr T Ramkumar performing laparoscopic surgery"
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
            className="rounded-[26px] shadow-[0_18px_50px_-20px_rgba(16,56,98,.28)] w-full aspect-[4/3.4] object-cover"
          />
          <div className="absolute left-[1.1rem] bottom-[1.1rem] flex items-center gap-2 bg-navy/82 backdrop-blur-[6px] text-[#eaf3f1] font-semibold text-[.82rem] py-[.55rem] px-[.9rem] rounded-full">
            <Stethoscope className="ico w-4 h-4 text-emerald-glow" />
            Laparoscopic Surgery
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="reveal inline-flex items-center gap-[.6rem] font-bold text-[.78rem] tracking-[.16em] uppercase text-teal">
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" /> About the Surgeon
          </p>
          <h2 className="reveal font-serif font-semibold leading-[1.1] tracking-tight text-[clamp(1.9rem,4vw,2.9rem)] text-navy mt-[.9rem]" data-reveal-delay="60">
            A surgeon&apos;s precision, a clinician&apos;s care
          </h2>
          <p className="reveal text-[1.15rem] text-ink mt-[1.3rem] font-medium" data-reveal-delay="120">
            Dr T Ramkumar is a highly experienced Surgical Gastroenterologist specialising in
            the comprehensive surgical management of diseases of the{" "}
            <strong className="text-teal">
              oesophagus, stomach, liver, pancreas, gallbladder, intestines, colon and rectum
            </strong>{" "}
            — with a strong emphasis on evidence-based care and patient safety.
          </p>
          <p className="reveal mt-4 text-muted" data-reveal-delay="160">
            He has extensive expertise in advanced laparoscopic and minimally invasive
            gastrointestinal surgery, enabling faster recovery, reduced pain and shorter hospital
            stays. His practice combines precision surgery, multidisciplinary planning and
            individualised treatment strategies for both benign and complex GI conditions.
          </p>
          <div className="reveal mt-[1.6rem] pt-[1.3rem] border-t border-line" data-reveal-delay="200">
            <span className="block font-serif text-[1.45rem] text-navy font-semibold">Dr T Ramkumar</span>
            <span className="text-[.9rem] text-muted font-semibold">
              Gastrointestinal Surgery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
