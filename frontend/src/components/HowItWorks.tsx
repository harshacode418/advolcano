import { Users, Laptop, Zap, Globe } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      icon: Users,
      title: "User Visits",
      description: "Publisher website/app"
    },
    {
      number: "2",
      icon: Globe,
      title: "Bid Request",
      description: "SSP sends to DSPs"
    },
    {
      number: "3",
      icon: Laptop,
      title: "DSP Bids",
      description: "AdVolcano analyzes & bids"
    },
    {
      number: "4",
      icon: Zap,
      title: "Ad Served",
      description: "Winning ad displays"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How AdVolcano.io Connects <span className="gradient-text">the Ad Ecosystem</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Understanding the relationship between Demand-Side Platforms (DSP), 
            Supply-Side Platforms (SSP), and Real-Time Bidding (RTB)
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="glass-card p-8 md:p-12 rounded-2xl">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl gradient-volcanic flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-background" />
                </div>
                <h3 className="font-semibold mb-2">Advertisers</h3>
                <p className="text-sm text-muted-foreground">Brands, Agencies, Affiliates</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                  <Laptop className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">DSP (AdVolcano.io)</h3>
                <p className="text-sm text-muted-foreground mb-2">Demand-Side Platform</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Campaign Management</li>
                  <li>• Audience Targeting</li>
                  <li>• Bid Optimization</li>
                </ul>
                <div className="mt-4 inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  RTB ~100ms
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-xl gradient-volcanic flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-background" />
                </div>
                <h3 className="font-semibold mb-2">SSP</h3>
                <p className="text-sm text-muted-foreground mb-2">Supply-Side Platform</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Inventory Management</li>
                  <li>• Yield Optimization</li>
                </ul>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-xl gradient-volcanic flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-background" />
              </div>
              <h3 className="font-semibold mb-2">Publishers</h3>
              <p className="text-sm text-muted-foreground">Websites, Apps, Media</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">How It Works in Real-Time</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="glass-card p-6 rounded-2xl text-center hover:border-primary/50 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 rounded-full gradient-volcanic flex items-center justify-center text-xl font-bold text-background mx-auto mb-4">
                    {step.number}
                  </div>
                  <step.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
