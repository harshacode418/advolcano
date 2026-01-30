import { Target, Settings, DollarSign } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Target,
      title: "Advanced Targeting",
      description: "Precise audience targeting with demographic, behavioral, and contextual options.",
      items: [
        "Geographic Targeting",
        "Device & OS Targeting",
        "Behavioral Targeting",
        "Contextual Targeting"
      ]
    },
    {
      icon: Settings,
      title: "Campaign Management",
      description: "Comprehensive tools for campaign creation, optimization, and performance tracking.",
      items: [
        "Campaign Builder",
        "A/B Testing",
        "Budget Management",
        "Performance Analytics"
      ]
    },
    {
      icon: DollarSign,
      title: "Publisher Tools",
      description: "Everything publishers need to maximize revenue from their digital properties.",
      items: [
        "Revenue Optimization",
        "Ad Quality Control",
        "Real-time Reporting",
        "Multiple Payment Options"
      ]
    }
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for <span className="gradient-text">Success</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Enterprise-grade tools and features designed to maximize your advertising performance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-xl gradient-volcanic flex items-center justify-center mb-6 group-hover:glow-effect transition-all">
                <feature.icon className="w-8 h-8 text-background" />
              </div>
              
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {feature.description}
              </p>

              <ul className="space-y-3">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
