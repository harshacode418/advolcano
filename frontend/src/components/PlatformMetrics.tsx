import { TrendingUp, Target, Users, DollarSign } from "lucide-react";

const PlatformMetrics = () => {
  const metrics = [
    {
      icon: TrendingUp,
      value: "10.2B+",
      label: "Monthly Impressions",
      growth: "+24%"
    },
    {
      icon: Target,
      value: "12.5K+",
      label: "Active Campaigns",
      growth: "+18%"
    },
    {
      icon: Users,
      value: "8.7K+",
      label: "Publishers",
      growth: "+32%"
    },
    {
      icon: DollarSign,
      value: "$24.8M+",
      label: "Revenue Generated",
      growth: "+41%"
    }
  ];

  return (
    <section id="metrics" className="py-24 relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Platform Performance <span className="gradient-text">Metrics</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-time insights into our platform's growth and performance across all markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="glass-card p-8 rounded-2xl text-center hover:border-primary/50 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
              
              <div className="relative">
                <div className="w-12 h-12 rounded-xl gradient-volcanic flex items-center justify-center mb-4 mx-auto group-hover:glow-effect transition-all">
                  <metric.icon className="w-6 h-6 text-background" />
                </div>
                
                <div className="text-4xl font-bold gradient-text mb-2">{metric.value}</div>
                <div className="text-muted-foreground mb-3">{metric.label}</div>
                <div className="inline-flex items-center gap-1 text-sm text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  {metric.growth}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformMetrics;
