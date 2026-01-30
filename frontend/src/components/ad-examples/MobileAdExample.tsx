import { Smartphone, X } from "lucide-react";

const MobileAdExample = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Mobile Ad Examples</h3>
        <p className="text-sm text-muted-foreground">
          Touch-optimized formats designed for mobile devices
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Mobile Banner */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Mobile Banner (320x50)</div>
          <div className="max-w-xs mx-auto">
            <div className="w-full h-[50px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg border border-primary/30 flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary/30"></div>
                <div>
                  <div className="text-xs font-bold">Your App Here</div>
                  <div className="text-[10px] text-muted-foreground">Install Now</div>
                </div>
              </div>
              <div className="px-3 py-1 bg-primary/20 rounded text-[10px] font-medium">GET</div>
            </div>
          </div>
        </div>

        {/* Mobile Interstitial */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Mobile Interstitial (Full Screen)</div>
          <div className="max-w-xs mx-auto">
            <div className="relative">
              <div className="w-full aspect-[9/16] bg-gradient-to-br from-background to-secondary/20 rounded-2xl border border-primary/30 p-4 flex flex-col">
                <button className="self-end w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <X className="w-4 h-4" />
                </button>
                <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30"></div>
                  <div className="text-center space-y-2">
                    <div className="font-bold">Amazing App Experience</div>
                    <div className="text-xs text-muted-foreground">Get the best features and exclusive content</div>
                  </div>
                  <div className="space-y-2 w-full">
                    <button className="w-full py-3 bg-primary/20 rounded-lg text-sm font-medium">
                      Install Now
                    </button>
                    <button className="w-full py-2 text-xs text-muted-foreground">
                      Maybe Later
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-20">
                <Smartphone className="w-full h-full text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Rewarded */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Mobile Rewarded Ad</div>
          <div className="max-w-xs mx-auto">
            <div className="glass-card p-6 rounded-2xl text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center mx-auto">
                <div className="text-2xl">🎁</div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">Watch & Win!</div>
                <div className="text-xs text-muted-foreground">
                  Watch a 30-second video to get 100 free coins
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full py-3 bg-primary/20 rounded-lg text-sm font-medium">
                  Watch Ad (30s)
                </button>
                <button className="text-xs text-muted-foreground">No Thanks</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAdExample;
