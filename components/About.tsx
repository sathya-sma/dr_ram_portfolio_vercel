import Image from "next/image";
import { Stethoscope } from "@/lib/icons";

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <div className="about__media reveal">
          <Image
            src="/brand/or-action.jpeg"
            alt="Dr T Ramkumar performing minimally invasive surgery"
            className="about__img"
            width={900}
            height={760}
          />
          <div className="about__media-tag">
            <Stethoscope />
            Minimally Invasive · Robotic
          </div>
        </div>
        <div className="about__copy">
          <p className="eyebrow reveal">
            <span className="eyebrow__line" /> About the Surgeon
          </p>
          <h2 className="section__title reveal" data-reveal-delay="60">
            A surgeon&apos;s precision, a clinician&apos;s care
          </h2>
          <p className="about__lead reveal" data-reveal-delay="120">
            Dr T Ramkumar is a highly experienced Surgical Gastroenterologist specialising in
            the comprehensive surgical management of diseases of the{" "}
            <strong>
              esophagus, stomach, liver, pancreas, gallbladder, intestines, colon and rectum
            </strong>{" "}
            — with a strong emphasis on evidence-based care and patient safety.
          </p>
          <p className="about__text reveal" data-reveal-delay="160">
            He has extensive expertise in advanced laparoscopic and minimally invasive
            gastrointestinal surgery, enabling faster recovery, reduced pain and shorter hospital
            stays. His practice combines precision surgery, multidisciplinary planning and
            individualised treatment strategies for both benign and complex GI conditions.
          </p>
          <div className="about__signature reveal" data-reveal-delay="200">
            <span className="about__sig-name">Dr T Ramkumar</span>
            <span className="about__sig-role">
              MS · Surgical Gastroenterology &amp; HPB Surgery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
