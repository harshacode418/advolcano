const DisplayAdExample = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Display Ad Examples</h3>
        <p className="text-sm text-muted-foreground">
          Traditional banner formats optimized for visibility and engagement
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Leaderboard 728x90 */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">728x90 Leaderboard</div>
          <div className="w-full h-[90px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg border border-primary/30 flex items-center justify-center p-4">
            <div className="text-center">
              <div className="text-sm font-bold mb-1">Your Brand Here</div>
              <div className="text-xs text-muted-foreground">Premium Display Advertising</div>
            </div>
          </div>
        </div>

        {/* Medium Rectangle 300x250 */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">300x250 Medium Rectangle</div>
          <div className="w-[300px] h-[250px] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg border border-primary/30 flex flex-col items-center justify-center p-6 mx-auto">
            <div className="w-12 h-12 rounded-full bg-primary/30 mb-3"></div>
            <div className="text-center">
              <div className="font-bold mb-2">Engaging Content</div>
              <div className="text-xs text-muted-foreground mb-3">Reach your target audience effectively</div>
              <div className="px-4 py-1.5 bg-primary/20 rounded text-xs">Learn More</div>
            </div>
          </div>
        </div>

        {/* Wide Skyscraper 160x600 */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">160x600 Wide Skyscraper</div>
          <div className="w-[160px] h-[400px] bg-gradient-to-b from-primary/20 via-secondary/20 to-primary/20 rounded-lg border border-primary/30 flex flex-col items-center justify-between p-4 mx-auto">
            <div className="text-center">
              <div className="w-10 h-10 rounded bg-primary/30 mb-2 mx-auto"></div>
              <div className="text-xs font-bold">Brand</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-xs font-semibold">Vertical Ad Space</div>
              <div className="text-[10px] text-muted-foreground">High visibility placement</div>
            </div>
            <div className="px-3 py-1 bg-primary/20 rounded text-[10px]">Click Here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayAdExample;
