import { ExternalLink, X } from "lucide-react";

const PopAdExample = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Pop Ad Examples</h3>
        <p className="text-sm text-muted-foreground">
          High-impact popup advertising with smart frequency capping
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Popunder Preview */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Popunder Ad (Opens in Background)</div>
          <div className="relative max-w-lg mx-auto">
            <div className="glass-card p-6 rounded-xl space-y-4 opacity-50 blur-[1px]">
              <div className="text-sm text-muted-foreground">Main Content Page</div>
              <div className="h-32 bg-muted/20 rounded-lg"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-card p-6 rounded-xl max-w-sm space-y-4 shadow-2xl border-2 border-primary/50 transform rotate-[-2deg]">
                <div className="flex justify-between items-start">
                  <div className="text-sm font-semibold">Opens in New Tab</div>
                  <div className="w-5 h-5 rounded-full bg-muted/30 flex items-center justify-center">
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Popunder ads open behind the current window, visible when user closes or minimizes their browser
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popup Preview */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Popup Ad (Overlay)</div>
          <div className="relative max-w-lg mx-auto">
            <div className="glass-card p-6 rounded-xl space-y-4 opacity-30 blur-[2px]">
              <div className="text-sm text-muted-foreground">Main Content</div>
              <div className="space-y-2">
                <div className="h-20 bg-muted/20 rounded"></div>
                <div className="h-20 bg-muted/20 rounded"></div>
              </div>
            </div>
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="glass-card p-8 rounded-2xl max-w-md space-y-4 shadow-2xl border-2 border-primary/50 relative">
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 mx-auto"></div>
                <div className="text-center space-y-2">
                  <div className="font-bold text-lg">Special Offer!</div>
                  <div className="text-sm text-muted-foreground">
                    Don't miss out on this exclusive opportunity. Limited time only.
                  </div>
                </div>
                <button className="w-full py-3 bg-primary/20 rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors">
                  Claim Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Exit Intent */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Exit Intent Popup</div>
          <div className="relative max-w-lg mx-auto">
            <div className="glass-card p-6 rounded-xl border-2 border-primary/50 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="font-semibold">Wait! Don't Leave Yet</div>
                  <div className="text-xs text-muted-foreground">Triggers when user is about to exit</div>
                </div>
                <button className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center">
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="text-sm text-muted-foreground">
                Get 20% off your first purchase! Subscribe now and never miss a deal.
              </div>
              <div className="space-y-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg text-sm"
                  disabled
                />
                <button className="w-full py-2 bg-primary/20 rounded-lg text-sm font-medium">
                  Get My Discount
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopAdExample;
