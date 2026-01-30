import { useState, useEffect } from "react";
import advolcanoLogo from "@/assets/advolcano-logo.png";
import PaymentDialog from "@/components/PaymentDialog";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={advolcanoLogo}
              alt="Advolcano"
              className="h-16 w-auto md:h-20 cursor-pointer logo rounded-2xl"
              style={{
                transition: 'all 0.4s ease',
                mixBlendMode: isScrolled ? 'normal' : 'screen',
                opacity: isScrolled ? 0.9 : 0.85,
                filter: isScrolled 
                  ? 'brightness(0.9) contrast(1.1)'
                  : 'brightness(1.1) contrast(0.95) drop-shadow(0 0 6px rgba(150, 80, 255, 0.35))'
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("ad-formats")}
              className="text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 hover:scale-105"
              style={{
                textShadow: '0 0 8px rgba(139, 92, 246, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            >
              Ad Formats
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 hover:scale-105"
              style={{
                textShadow: '0 0 8px rgba(139, 92, 246, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            >
              Features
            </button>
            <button
              onClick={() => setShowPaymentDialog(true)}
              className="text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 hover:scale-105"
              style={{
                textShadow: '0 0 8px rgba(139, 92, 246, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            >
              Payments
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 hover:scale-105"
              style={{
                textShadow: '0 0 8px rgba(139, 92, 246, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("demo")}
              className="text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 hover:scale-105"
              style={{
                textShadow: '0 0 8px rgba(139, 92, 246, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            >
              Demo
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 hover:scale-105"
              style={{
                textShadow: '0 0 8px rgba(139, 92, 246, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            >
              Contact
            </button>
          </nav>
        </div>
      </div>

      <PaymentDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog} />
    </header>
  );
};

export default Header;
