import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import DataScienceBackground from "./DataScienceBackground";

// --- Components ---

const FlipText = ({ words, interval = 3000 }: { words: string[], interval?: number }) => {
  const [index, setIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const id = setInterval(() => {
      if (prefersReducedMotion) {
        setIndex((i) => (i + 1) % words.length);
      } else {
        setIsFlipping(true);
        setTimeout(() => {
          setIndex((i) => (i + 1) % words.length);
          setIsFlipping(false);
        }, 400); // Wait for half flip
      }
    }, interval);
    
    return () => clearInterval(id);
  }, [words, interval]);

  return (
    <span 
      className={`inline-block transition-all duration-400 ease-in-out ${
        isFlipping ? 'opacity-0 rotate-x-90 scale-90' : 'opacity-100 rotate-x-0 scale-100'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {words[index]}
    </span>
  );
};

const MagneticWrapper = ({ children }: { children: React.ReactElement }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.15;
    const y = (clientY - (top + height / 2)) * 0.15;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className="transition-transform duration-100 ease-out inline-block"
    >
      {children}
    </div>
  );
};



// --- Main Hero Component ---

const Hero = () => {
  const roles = ["Data Models", "Intelligent Systems", "NLP Architectures"];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Layers */}
      <DataScienceBackground />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
      </div>
      
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-primary/70 shadow-[0_0_10px_rgba(255,69,58,0.7)] opacity-60 z-0 animate-pulse-slow"></div>
        <div className="absolute top-[45%] left-[55%] w-3 h-3 rounded-full bg-accent/70 shadow-[0_0_15px_rgba(255,45,85,0.7)] opacity-70 z-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[70%] left-[80%] w-2 h-2 rounded-full bg-primary/70 shadow-[0_0_12px_rgba(255,69,58,0.7)] opacity-60 z-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 left-1/4 w-2 h-2 rounded-full bg-primary/70 shadow-[0_0_10px_rgba(255,69,58,0.7)] opacity-60 z-0 animate-float"></div>
      </div>



      {/* Main Centered Content */}
      <div className="relative z-30 w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center mt-[-5vh]">
        <div className="animate-fade-in-up w-full flex flex-col items-center">
          
          {/* Availability Badge */}
          <div className="relative inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full group overflow-hidden shadow-[0_0_20px_rgba(255,69,58,0.15)]">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/50 to-primary/30 bg-[length:200%_200%] animate-[gradient-shift_3s_linear_infinite] group-hover:from-primary/50 group-hover:via-accent/70 group-hover:to-primary/50 transition-colors duration-500 rounded-full p-[1px]">
              <div className="w-full h-full bg-[#0a0505]/70 backdrop-blur-md rounded-full"></div>
            </div>
            
            {/* Radar ping dot */}
            <div className="relative flex items-center justify-center w-2 h-2 z-10">
              <span className="absolute inline-flex h-4 w-4 rounded-full bg-primary opacity-50 motion-safe:animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_8px_rgba(255,69,58,1)]"></span>
            </div>
            
            <span className="relative z-10 text-xs font-medium text-white/90 tracking-wide">Available for new opportunities</span>
          </div>

          {/* Focal Name */}
          <h1 className="relative text-[5.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11.5rem] mb-2 tracking-normal leading-none w-full flex flex-wrap justify-center gap-x-2 sm:gap-x-4 lg:gap-x-6">
            <span className="opacity-0 animate-fade-in-up inline-block" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <span 
                className="font-signature text-white drop-shadow-[0_0_25px_rgba(239,68,68,0.7)] inline-block transition-transform duration-500 hover:scale-105" 
              >
                Darain
              </span>
            </span>
            <span className="opacity-0 animate-fade-in-up inline-block" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <span 
                className="font-signature bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(239,68,68,0.9)] inline-block transition-transform duration-500 hover:scale-105" 
              >
                Hyder
              </span>
            </span>

            {/* Signature Flourish / Swash */}
            <svg 
              className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 w-3/4 max-w-[350px] md:max-w-[500px] h-auto text-primary opacity-60 signature-swash pointer-events-none" 
              viewBox="0 0 400 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M 20 20 Q 100 -5, 200 20 T 380 15" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </h1>
          
          {/* Kinetic Typography Roles - 3D Flip */}
          <div className="h-12 md:h-16 mb-8 flex items-center justify-center overflow-visible" style={{ perspective: '1000px' }}>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-accent flex items-center gap-2 sm:gap-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] flex-wrap justify-center">
              <span className="text-muted-foreground font-light whitespace-nowrap">I engineer</span>
              <FlipText words={roles} interval={3500} />
            </p>
          </div>
          
          {/* Tagline */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground/90 mb-10 font-light max-w-2xl leading-relaxed px-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Bridging the gap between raw data and <span className="text-foreground font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">production-ready AI</span>. Specialized in building intelligent architectures that actually solve real problems.
          </p>
        </div>

        {/* CTAs */}
        <div className="animate-fade-in-up flex flex-wrap justify-center gap-4 relative z-30" style={{ animationDelay: '0.4s' }}>
          <MagneticWrapper>
            <Button 
              variant="default" 
              size="lg" 
              className="interactive-hover h-12 md:h-14 px-6 md:px-8 text-sm md:text-base shadow-[0_0_20px_rgba(255,69,58,0.2)] hover:shadow-[0_0_30px_rgba(255,69,58,0.4)] transition-all duration-300 rounded-full"
              onClick={() => scrollToSection('projects')}
            >
              <Github className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              View Architecture
            </Button>
          </MagneticWrapper>
          
          <MagneticWrapper>
            <Button 
              variant="outline" 
              size="lg" 
              className="interactive-hover h-12 md:h-14 px-6 md:px-8 text-sm md:text-base bg-[#0a0505]/40 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 rounded-full text-white/90"
              onClick={() => scrollToSection('contact')}
            >
              <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Initialize Contact
            </Button>
          </MagneticWrapper>
        </div>
        

        {/* Social Links */}
        <div className="animate-fade-in-up flex gap-8 mt-10 md:mt-12 relative z-30" style={{ animationDelay: '0.6s' }}>
          <a href="https://github.com/DarainHyder" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors hover:-translate-y-1 duration-300">
            <Github className="h-6 w-6" />
          </a>
          <a href="https://www.linkedin.com/in/syed-darain-hyder-kazmi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors hover:-translate-y-1 duration-300">
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-white transition-colors animate-bounce p-2 z-30"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default Hero;