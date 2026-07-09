import React, { useEffect, useRef, useState } from 'react';

type TransitionVariant = 
  | 'wipe-up' 
  | 'fly-in-random' 
  | 'flip-3d' 
  | 'timeline-draw' 
  | 'scale-up-staggered' 
  | 'horizontal-slide' 
  | 'radial-reveal';

interface AnimatedSectionProps {
  children: React.ReactNode;
  variant: TransitionVariant;
  className?: string;
  id?: string;
  threshold?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  variant, 
  className = '', 
  id,
  threshold = 0.2 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    // Modern browsers support addEventListener on MediaQueryList
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger once and stop observing
        }
      },
      {
        threshold, 
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      }
    };
  }, [threshold]);

  // If user prefers reduced motion, we always treat it as visible so animations skip
  const shouldAnimate = isVisible || prefersReducedMotion;
  
  return (
    <section 
      id={id} 
      ref={ref} 
      className={`animated-section ${variant} ${shouldAnimate ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </section>
  );
};
