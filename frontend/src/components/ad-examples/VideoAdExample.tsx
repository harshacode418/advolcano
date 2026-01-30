import { Play, Volume2, Maximize, Pause } from "lucide-react";

const VideoAdExample = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Video Ad Examples</h3>
        <p className="text-sm text-muted-foreground">
          High-engagement video formats with VAST/VPAID support
        </p>
      </div>
      
      <div className="space-y-6">
        {/* In-stream Video */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">In-Stream Video Ad</div>
          <div className="w-full aspect-video bg-gradient-to-br from-background to-secondary/20 rounded-lg border border-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center mx-auto">
                  <Play className="w-8 h-8 text-primary fill-primary" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Video Advertisement</div>
                  <div className="text-xs text-muted-foreground">Playing before content</div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Pause className="w-4 h-4" />
                  <span>0:15</span>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  <Maximize className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-primary"></div>
              </div>
            </div>
            <div className="absolute top-4 right-4 px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-xs">
              Ad · 0:05
            </div>
          </div>
        </div>

        {/* Out-stream Video */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Out-Stream Video Ad</div>
          <div className="w-full max-w-md mx-auto">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/30 relative">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center mx-auto">
                    <Play className="w-6 h-6 text-primary fill-primary" />
                  </div>
                  <div className="text-sm font-semibold">Standalone Video Content</div>
                  <div className="text-xs text-muted-foreground">Auto-plays within feed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rewarded Video */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Rewarded Video Ad</div>
          <div className="w-full max-w-sm mx-auto space-y-3">
            <div className="glass-card p-4 rounded-xl text-center">
              <div className="text-sm font-semibold mb-2">Get Free Coins!</div>
              <div className="text-xs text-muted-foreground mb-4">Watch a short video to earn rewards</div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-lg">
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Watch & Earn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAdExample;
