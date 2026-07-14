import Header from "@/components/header";
import Hero from "@/components/hero";
import LogoMarquee from "@/components/logo-marquee";
import Stats from "@/components/stats";
import CaseStudies from "@/components/case-studies";
import Services from "@/components/services";
import Industries from "@/components/industries";
import Process from "@/components/process";
import Testimonials from "@/components/testimonials";
import Offer from "@/components/offer";
import Why from "@/components/why";
import Faq from "@/components/faq";
import FinalCta from "@/components/final-cta";
import Footer from "@/components/footer";
import MobileBar from "@/components/mobile-bar";
import StructuredData from "@/components/structured-data";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <LogoMarquee />
        <Stats />
        <CaseStudies />
        <Services />
        <Industries />
        <Process />
        <Testimonials />
        <Offer />
        <Why />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
