import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AdFormats from "@/components/AdFormats";
import WhyChoose from "@/components/WhyChoose";
import Features from "@/components/Features";
import PaymentOptions from "@/components/PaymentOptions";
import PlatformMetrics from "@/components/PlatformMetrics";
import HowItWorks from "@/components/HowItWorks";
import DemoRequest from "@/components/DemoRequest";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
  };

  return (
    <div className="min-h-screen">
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <div className={!hasSeenIntro ? "opacity-0" : "animate-fade-in"}>
        <Header />
        <Hero />
        <AdFormats />
        <WhyChoose />
        <Features />
        <PaymentOptions />
        <PlatformMetrics />
        <HowItWorks />
        <DemoRequest />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
