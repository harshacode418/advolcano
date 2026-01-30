import { ExternalLink } from "lucide-react";

const NativeAdExample = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Native Ad Examples</h3>
        <p className="text-sm text-muted-foreground">
          Seamlessly integrated content matching your platform's design
        </p>
      </div>
      
      <div className="space-y-6">
        {/* In-Feed Native Ad */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">In-Feed Native Ad</div>
          <div className="max-w-md mx-auto space-y-3">
            <div className="glass-card p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Brand Name</div>
                  <div className="text-xs text-muted-foreground">Sponsored</div>
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg"></div>
              <div className="space-y-2">
                <div className="text-sm font-semibold">Discover Amazing Products That Transform Your Life</div>
                <div className="text-xs text-muted-foreground">
                  Experience the future of innovation with our latest collection. Limited time offer available now.
                </div>
                <div className="flex items-center gap-2 text-xs text-primary">
                  <span>Learn More</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Recommendation */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Content Native Ad</div>
          <div className="max-w-lg mx-auto">
            <div className="glass-card p-5 rounded-xl">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="text-xs text-primary">Sponsored Content</div>
                  <div className="text-sm font-semibold line-clamp-2">
                    The Ultimate Guide to Boosting Your Business Growth in 2025
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2">
                    Expert insights and strategies that leading companies use to scale their operations effectively.
                  </div>
                  <div className="text-xs text-muted-foreground">Brand Name • 5 min read</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation Widget */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Recommendation Native Ad</div>
          <div className="max-w-lg mx-auto">
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground">You May Also Like</div>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2].map((i) => (
                  <div key={i} className="glass-card p-3 rounded-lg space-y-2">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded"></div>
                    <div className="text-xs font-medium line-clamp-2">
                      Trending Product That Everyone's Talking About
                    </div>
                    <div className="text-[10px] text-muted-foreground">Sponsored</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NativeAdExample;
