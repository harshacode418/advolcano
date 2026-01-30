import { Monitor, Video, FileText, Smartphone, ExternalLink, Bell } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DisplayAdExample from "./ad-examples/DisplayAdExample";
import VideoAdExample from "./ad-examples/VideoAdExample";
import NativeAdExample from "./ad-examples/NativeAdExample";
import MobileAdExample from "./ad-examples/MobileAdExample";
import PopAdExample from "./ad-examples/PopAdExample";
import PushAdExample from "./ad-examples/PushAdExample";

const AdFormats = () => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const formatExamples: Record<string, JSX.Element> = {
    "Display Ads": <DisplayAdExample />,
    "Video Ads": <VideoAdExample />,
    "Native Ads": <NativeAdExample />,
    "Mobile Ads": <MobileAdExample />,
    "Pop Ads": <PopAdExample />,
    "Push Ads": <PushAdExample />,
  };

  const formats = [
    {
      icon: Monitor,
      title: "Display Ads",
      description: "Traditional banner advertising with modern targeting and optimization capabilities.",
      formats: ["728x90", "300x250", "160x600"],
      ctr: "2.3%",
      viewability: "89%",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Video,
      title: "Video Ads",
      description: "Engaging video content with VAST/VPAID support for maximum impact and reach.",
      formats: ["In-stream", "Out-stream", "Rewarded"],
      ctr: "8.7%",
      viewability: "94%",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: FileText,
      title: "Native Ads",
      description: "Seamlessly integrated content that matches the look and feel of surrounding content.",
      formats: ["In-feed", "Content", "Recommendation"],
      ctr: "4.2%",
      viewability: "91%",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Ads",
      description: "Optimized for mobile devices with responsive design and touch-friendly interactions.",
      formats: ["Banner", "Interstitial", "Rewarded"],
      ctr: "6.1%",
      viewability: "87%",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: ExternalLink,
      title: "Pop Ads",
      description: "High-impact popup advertising with advanced frequency capping and user experience optimization.",
      formats: ["Popunder", "Popup", "Exit Intent"],
      ctr: "12.5%",
      viewability: "95%",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: Bell,
      title: "Push Ads",
      description: "Direct browser notifications delivering personalized messages with high engagement rates.",
      formats: ["Desktop", "Mobile", "Web Push"],
      ctr: "9.8%",
      viewability: "92%",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section id="ad-formats" className="py-24 relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive <span className="gradient-text">Ad Formats</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Support for all major ad formats with advanced targeting and optimization features 
            designed to maximize your advertising performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {formats.map((format, index) => (
            <div
              key={format.title}
              onClick={() => setSelectedFormat(format.title)}
              className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 group hover:scale-105 cursor-pointer relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${format.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
              
              <div className="relative">
                <div className="w-14 h-14 rounded-xl gradient-volcanic flex items-center justify-center mb-6 group-hover:glow-effect transition-all">
                  <format.icon className="w-7 h-7 text-background" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {format.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {format.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {format.formats.map((fmt) => (
                    <span key={fmt} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {fmt}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div>
                    <div className="text-2xl font-bold text-primary">{format.ctr}</div>
                    <div className="text-xs text-muted-foreground">Avg CTR</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{format.viewability}</div>
                    <div className="text-xs text-muted-foreground">Viewability</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedFormat} onOpenChange={() => setSelectedFormat(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">
              {selectedFormat} Example
            </DialogTitle>
          </DialogHeader>
          {selectedFormat && formatExamples[selectedFormat]}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AdFormats;
