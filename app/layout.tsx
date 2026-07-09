import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drramkumar.example"),
  title:
    "Dr T Ramkumar — Consultant Gastrointestinal Surgeon | Laparoscopic & Robotic Cancer Surgeon, Chennai",
  description:
    "Dr T Ramkumar — Consultant Gastrointestinal Surgeon with 27+ years' expertise in laparoscopic & robotic GI cancer surgery. Chennai Speciality Clinic, Choolaimedu. Book an appointment: 044 4813 4300.",
  keywords: [
    "gastrointestinal surgeon Chennai",
    "laparoscopic surgeon Chennai",
    "robotic GI surgery",
    "Whipple surgery Chennai",
    "colorectal surgeon",
    "Dr T Ramkumar",
  ],
  openGraph: {
    title: "Dr T Ramkumar — Consultant Gastrointestinal Surgeon, Chennai",
    description:
      "27+ years of expertise in laparoscopic & robotic gastrointestinal surgery. Surgical Excellence, Personalised Care.",
    type: "website",
  },
  icons: { icon: "/brand/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
