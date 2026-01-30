import { Bell, X, ExternalLink } from "lucide-react";

const PushAdExample = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Push Ad Examples</h3>
        <p className="text-sm text-muted-foreground">
          Browser notifications with high engagement and click-through rates
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Desktop Push Notification */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Desktop Push Notification</div>
          <div className="max-w-sm mx-auto">
            <div className="glass-card p-4 rounded-xl space-y-3 border-2 border-primary/30 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="text-sm font-semibold">Brand Name</div>
                    <button className="w-5 h-5 rounded flex items-center justify-center hover:bg-muted/50">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Flash Sale: 50% Off Everything! Don't miss out on incredible deals ending tonight.
                  </div>
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <span>Shop Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Push Notification */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Mobile Push Notification</div>
          <div className="max-w-xs mx-auto">
            <div className="glass-card p-3 rounded-xl space-y-2 border border-primary/30 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate">Brand App</div>
                  <div className="text-[10px] text-muted-foreground">2 minutes ago</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                ⚡ New arrivals just dropped! Tap to see what's trending.
              </div>
            </div>
          </div>
        </div>

        {/* Web Push Notification */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Web Push Notification</div>
          <div className="max-w-md mx-auto space-y-3">
            <div className="glass-card p-4 rounded-xl border border-primary/30 shadow-lg">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0"></div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <div className="text-sm font-semibold">Special Announcement</div>
                    <div className="text-[10px] text-muted-foreground">now</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    You're invited! Join our exclusive webinar on digital marketing strategies.
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1 bg-primary/20 rounded text-xs font-medium hover:bg-primary/30">
                      Register
                    </button>
                    <button className="px-3 py-1 bg-muted/20 rounded text-xs hover:bg-muted/30">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Permission Request Example */}
            <div className="glass-card p-4 rounded-xl border border-primary/30">
              <div className="flex items-center gap-3">
                <Bell className="w-8 h-8 text-primary" />
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1">Enable Notifications</div>
                  <div className="text-xs text-muted-foreground">Get updates on exclusive offers</div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2 bg-primary/20 rounded text-xs font-medium">
                  Allow
                </button>
                <button className="flex-1 py-2 bg-muted/20 rounded text-xs">
                  Block
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushAdExample;
