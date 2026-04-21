import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Paulcodes — Full-Stack Developer",
  description:
    "I build the web apps your business actually needs — fast, clean, and built to last.",
  openGraph: {
    title: "Paulcodes — Full-Stack Developer",
    description:
      "I build the web apps your business actually needs — fast, clean, and built to last.",
    url: "https://paulcodes.pro",
    images: [
      {
        url: "https://paulcodes.pro/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paulcodes — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paulcodes — Full-Stack Developer",
    description:
      "I build the web apps your business actually needs — fast, clean, and built to last.",
    images: ["https://paulcodes.pro/og-image.png"],
  },
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Hero />
      <Work />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
