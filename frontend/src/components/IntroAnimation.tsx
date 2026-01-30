import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AdCreative {
  id: number;
  type: 'banner' | 'social' | 'video' | 'product';
  angle: number;
  distance: number;
  delay: number;
  content: string;
  width: number;
  height: number;
  rotation: number;
}

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'pulse' | 'burst' | 'fade' | 'logo'>('pulse');

  // Generate 60 ad creatives with varying sizes and positions
  const adCreatives: AdCreative[] = Array.from({ length: 60 }, (_, i) => {
    const type = ['banner', 'social', 'video', 'product'][Math.floor(Math.random() * 4)] as AdCreative['type'];
    const baseSize = 80 + Math.random() * 80; // 80-160px
    
    return {
      id: i,
      type,
      angle: (i * 6) + Math.random() * 8, // More spread
      distance: 300 + Math.random() * 500, // 300-800px
      delay: Math.random() * 0.4,
      content: ['Ad Creative', 'Social Post', 'Video Ad', 'Banner', 'Display Ad', 'Sponsored', 'Promo'][Math.floor(Math.random() * 7)],
      width: type === 'banner' ? baseSize * 2 : type === 'video' ? baseSize * 1.5 : baseSize,
      height: type === 'banner' ? baseSize * 0.5 : type === 'video' ? baseSize * 0.75 : baseSize,
      rotation: Math.random() * 360
    };
  });

  useEffect(() => {
    // Pulse phase - 300ms
    const pulseTimer = setTimeout(() => setPhase('burst'), 300);
    
    // Burst phase - 2000ms
    const burstTimer = setTimeout(() => setPhase('fade'), 2300);
    
    // Logo reveal - 500ms
    const logoTimer = setTimeout(() => setPhase('logo'), 2800);
    
    // Complete animation - 1000ms for logo
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(burstTimer);
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-1000",
        "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
        phase === 'logo' && "opacity-0"
      )}
    >
      {/* Center volcanic glow pulse */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-700",
          phase === 'pulse' && "scale-75 opacity-0",
          phase === 'burst' && "scale-100 opacity-100",
          phase === 'fade' && "scale-200 opacity-0",
          phase === 'logo' && "scale-300 opacity-0"
        )}
        style={{
          filter: "blur(60px)",
        }}
      >
        <div className="w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80" />
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-40" />
        <div className="absolute w-48 h-48 rounded-full bg-white opacity-20" />
      </div>

      {/* Ad creatives bursting out with 3D perspective */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {adCreatives.map((ad) => {
          const radians = (ad.angle * Math.PI) / 180;
          const baseDistance = ad.distance;
          const isActive = phase === 'burst' || phase === 'fade';
          
          const translateX = isActive ? Math.cos(radians) * baseDistance : 0;
          const translateY = isActive ? Math.sin(radians) * baseDistance : 0;
          const translateZ = isActive ? Math.random() * 200 - 100 : 0;
          
          // Easing for easeOutExpo effect
          const progress = phase === 'fade' ? 1 : phase === 'burst' ? 0.8 : 0;
          const scale = phase === 'pulse' ? 0.5 : phase === 'burst' ? 0.5 + progress * 0.7 : 1.2;
          
          return (
            <div
              key={ad.id}
              className={cn(
                "absolute rounded-lg shadow-2xl overflow-hidden",
                "border border-white/30",
                phase === 'pulse' && "opacity-0",
                phase === 'burst' && "opacity-100",
                phase === 'fade' && "opacity-0",
                phase === 'logo' && "opacity-0"
              )}
              style={{
                width: `${ad.width}px`,
                height: `${ad.height}px`,
                transform: `
                  translate3d(${translateX}px, ${translateY}px, ${translateZ}px)
                  rotate(${isActive ? ad.rotation : 0}deg)
                  scale(${scale})
                `,
                transition: `all ${2 + ad.delay}s cubic-bezier(0.16, 1, 0.3, 1)`,
                transitionDelay: `${ad.delay}s`,
                filter: `blur(${phase === 'fade' ? '12px' : phase === 'burst' ? '0px' : '8px'})`,
                boxShadow: `0 ${20 + translateZ / 10}px ${40 + translateZ / 5}px rgba(0,0,0,0.3), 0 0 ${30 + translateZ / 5}px rgba(139,92,246,0.2)`,
                ...(ad.type === 'banner' && {
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(139, 92, 246, 0.7))"
                }),
                ...(ad.type === 'social' && {
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.85), rgba(236, 72, 153, 0.65))"
                }),
                ...(ad.type === 'video' && {
                  background: "linear-gradient(135deg, rgba(236, 72, 153, 0.9), rgba(239, 68, 68, 0.7))"
                }),
                ...(ad.type === 'product' && {
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.85), rgba(139, 92, 246, 0.65))"
                })
              }}
            >
              {/* Ad content with icons */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2 bg-black/20">
                <div className="text-white text-[10px] font-bold text-center leading-tight drop-shadow-lg">
                  {ad.content}
                </div>
                {ad.type === 'video' && (
                  <div className="mt-1 w-4 h-4 rounded-full bg-white/90 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-black border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5" />
                  </div>
                )}
              </div>
              
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{
                  animation: "shimmer 2s infinite",
                  animationDelay: `${ad.delay}s`
                }}
              />
              
              {/* Particle trail */}
              {phase === 'burst' && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, rgba(139, 92, 246, 0.4), transparent 70%)`,
                    transform: `scale(1.5)`,
                    opacity: 0.6
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Logo reveal in center */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-1000",
          phase === 'pulse' && "scale-0 opacity-0",
          phase === 'burst' && "scale-0 opacity-0",
          phase === 'fade' && "scale-80 opacity-0",
          phase === 'logo' && "scale-100 opacity-100"
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
      >
        <div className="relative">
          <div className="text-7xl md:text-8xl font-bold text-gradient drop-shadow-2xl">
            AdVolcano
          </div>
          <div className="absolute inset-0 blur-xl opacity-50">
            <div className="text-7xl md:text-8xl font-bold text-gradient">
              AdVolcano
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced particle effects */}
      {(phase === 'burst' || phase === 'fade') && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 80 }).map((_, i) => {
            const angle = (i / 80) * 360;
            const distance = 100 + Math.random() * 100;
            const radians = (angle * Math.PI) / 180;
            const size = Math.random() * 3 + 1;
            
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `radial-gradient(circle, 
                    ${['rgba(59, 130, 246, 1)', 'rgba(139, 92, 246, 1)', 'rgba(236, 72, 153, 1)'][Math.floor(Math.random() * 3)]}, 
                    transparent)`,
                  transform: `translate(-50%, -50%)`,
                  animation: `particle-burst ${1.5 + Math.random()}s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                  animationDelay: `${Math.random() * 0.3}s`,
                  opacity: phase === 'fade' ? 0 : 1,
                  transition: 'opacity 0.5s',
                  '--tx': `${Math.cos(radians) * distance}vw`,
                  '--ty': `${Math.sin(radians) * distance}vh`,
                } as React.CSSProperties}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IntroAnimation;
