
import About from "@/components/About";
import Hero from "@/components/Hero";
import PartnersCarousel from "@/components/partners-carousel";
import PartnersMarquee from "@/components/partners-marquee";
import ProcessSection from "@/components/ProcessSection";
import ServiceSection from "@/components/Service";
import Team from "@/components/Team";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <ServiceSection />
      <About />
      <ProcessSection />
      <PartnersCarousel />
      <Team/>
    </div>
  );
}
