import { CreditCard, Building, Wallet, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentOptions = () => {
  const payments = [
    {
      icon: Wallet,
      title: "PayPal",
      description: "Quick and secure online payments"
    },
    {
      icon: Building,
      title: "Wire Transfer",
      description: "Traditional bank wire transfers"
    },
    {
      icon: DollarSign,
      title: "Capitalist",
      description: "E-wallet payment solution"
    },
    {
      icon: CreditCard,
      title: "Credit / Debit Card",
      description: "Visa, MasterCard, American Express"
    }
  ];

  return (
    <section id="payment" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            💳 Convenient <span className="gradient-text">Payment Options</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose from multiple secure payment methods for your advertising campaigns
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {payments.map((payment, index) => (
            <div
              key={payment.title}
              className="glass-card p-6 rounded-2xl text-center hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-volcanic flex items-center justify-center mb-4 mx-auto group-hover:glow-effect transition-all">
                <payment.icon className="w-7 h-7 text-background" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{payment.title}</h3>
              <p className="text-sm text-muted-foreground">{payment.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            All payments are processed securely with 256-bit SSL encryption
          </p>
          <Button 
            size="lg"
            className="gradient-volcanic text-primary-foreground hover:opacity-90 transition-opacity"
            asChild
          >
            <a href="https://ui.advolcano.io/registration">Get Started Today</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PaymentOptions;
