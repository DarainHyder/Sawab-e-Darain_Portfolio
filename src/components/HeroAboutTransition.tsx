import React, { useEffect, useRef, useState } from 'react';

interface HeroAboutTransitionProps {
  hero: React.ReactNode;
  about: React.ReactNode;
}

const HeroAboutTransition: React.FC<HeroAboutTransitionProps> = ({ hero, about }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkMotion = () => setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    
    checkMobile();
    checkMotion();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (aboutRef.current) {
            const windowHeight = window.innerHeight;
            const aboutTop = aboutRef.current.getBoundingClientRect().top;
            
            // progress = 0 when About starts entering viewport
            // progress = 1 when About fully covers the viewport
            let p = 1 - (aboutTop / windowHeight);
            p = Math.max(0, Math.min(1, p));
            setProgress(p);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, prefersReducedMotion]);

  const shouldAnimate = !isMobile && !prefersReducedMotion;

  // Calculate transform values based on progress
  // Scale goes from 1 to 0.9
  const scale = 1 - (progress * 0.1);
  // translateY goes from 0 to -5vh
  const translateY = -(progress * 5);
  // blur goes from 0 to 8px
  const blur = progress * 8;
  // opacity goes from 1 to 0.3 (so it fades nicely into the dark)
  const opacity = 1 - (progress * 0.7);

  return (
    <div ref={containerRef} className="relative bg-background">
      {/* Sticky Hero Container */}
      <div 
        className={shouldAnimate ? "sticky top-0 h-screen w-full overflow-hidden will-change-transform" : ""}
        style={shouldAnimate ? {
          transform: `scale(${scale}) translateY(${translateY}vh)`,
          opacity: opacity,
          filter: `blur(${blur}px)`,
          transformOrigin: 'top center',
          transition: 'none' // Driven completely by scroll
        } : {}}
      >
        {hero}
      </div>
      
      {/* Absolute/Relative About Container */}
      <div 
        ref={aboutRef}
        className="relative z-20 bg-background shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-border/10"
      >
        {about}
      </div>
    </div>
  );
};

export default HeroAboutTransition;
