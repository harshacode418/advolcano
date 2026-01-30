import { Shield, Globe, Sparkles, BarChart3, Headphones, Zap } from "lucide-react";

const WhyChoose = () => {
  const reasons = [
    {
      icon: Shield,
      title: "Fraud-Free Traffic",
      description: "Advanced anti-fraud technology ensures 99.9% clean traffic with real-time monitoring and verification."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access premium inventory across 200+ countries with localized targeting and optimization."
    },
    {
      icon: Sparkles,
      title: "AI-Powered Optimization",
      description: "Machine learning algorithms automatically optimize campaigns for maximum performance and ROI."
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Comprehensive dashboards with instant reporting and actionable insights for data-driven decisions."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated account managers and technical support team available around the clock."
    },
    {
      icon: Zap,
      title: "Fast Integration",
      description: "Quick setup with comprehensive APIs, SDKs, and detailed documentation for seamless integration."
    }
  ];

  return (
    <section id="why-choose" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">AdVolcano</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Built on cutting-edge technology with enterprise-grade security and performance at scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 group hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-volcanic flex items-center justify-center mb-6 group-hover:glow-effect transition-all">
                <reason.icon className="w-7 h-7 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
