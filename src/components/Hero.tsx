import React, { useState, useEffect } from "react";
import heroImage from "@/assets/premium-bg.png";
import DataScienceBackground from "./DataScienceBackground";

const Hero = () => {
  const [isMouseActive, setIsMouseActive] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = () => {
      setIsMouseActive(true);
      clearTimeout(timeoutId);
      
      // Hide the UI elements after 3 seconds of no mouse movement
      timeoutId = setTimeout(() => {
        setIsMouseActive(false);
      }, 3000);
    };

    // Trigger it once on load so the user knows they exist before fading out
    handleMouseMove();

    window.addEventListener('mousemove', handleMouseMove);
    // Also trigger on touch for mobile
    window.addEventListener('touchstart', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layers */}
      <DataScienceBackground />
      
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-primary/70 shadow-[0_0_10px_rgba(255,69,58,0.7)] opacity-60 z-0 animate-pulse-slow"></div>
        <div className="absolute top-[45%] left-[55%] w-3 h-3 rounded-full bg-accent/70 shadow-[0_0_15px_rgba(255,45,85,0.7)] opacity-70 z-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[70%] left-[80%] w-2 h-2 rounded-full bg-primary/70 shadow-[0_0_12px_rgba(255,69,58,0.7)] opacity-60 z-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Centered Content: THE MONOLITH */}
      <div className="relative z-30 w-full flex flex-col items-center justify-center pointer-events-none mt-10 md:mt-0">
        <h1 className="relative text-[4.5rem] sm:text-[7rem] md:text-[10rem] lg:text-[15rem] tracking-normal leading-none w-full flex flex-col md:flex-row justify-center items-center px-4 gap-0 md:gap-6">
          
          {/* First Name */}
          <span className="opacity-0 animate-fade-in-up inline-block" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="font-signature text-white drop-shadow-[0_0_35px_rgba(239,68,68,0.4)] relative z-10 md:pr-4">
              Darain
            </span>
          </span>
          
          {/* Last Name */}
          <span className="opacity-0 animate-fade-in-up inline-block -mt-4 md:mt-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <span className="font-signature bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(239,68,68,0.7)] relative z-10">
              Hyder
            </span>
          </span>
          </h1>

          {/* Clean, elegant subtitle below the name (No box, no overlap) */}
          <div className="mt-2 sm:mt-4 opacity-0 animate-fade-in-up z-20" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <h2 className="text-sm sm:text-base md:text-xl font-light tracking-[0.3em] sm:tracking-[0.6em] uppercase text-white/90 flex items-center gap-4 sm:gap-6 drop-shadow-[0_0_15px_rgba(255,69,58,0.3)]">
              <span className="w-12 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-primary/60"></span>
              <span><span className="text-primary font-medium">AI/ML</span> ENGINEER</span>
              <span className="w-12 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-primary/60"></span>
            </h2>
          </div>
      </div>

      {/* Hidden Interactive UI Layer (Fades in on mouse move) */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out z-40 ${isMouseActive ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Top Left: Raw Status */}
        <div className="absolute top-20 left-4 md:top-40 md:left-12">
           <span className="font-mono text-[0.55rem] md:text-xs text-primary/70 tracking-[0.2em] uppercase flex items-center gap-2 md:gap-3">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(255,69,58,1)] flex-shrink-0"></span>
              SYS.STATUS <span className="text-white/20">|</span> <span className="text-white/90">AVAILABLE_FOR_OPPORTUNITIES</span>
           </span>
        </div>

        {/* Bottom Left: Navigation Links */}
        <div className="absolute bottom-8 left-4 md:bottom-16 md:left-12 flex flex-col gap-4 md:gap-5 pointer-events-auto">
          <button 
            onClick={() => scrollToSection('projects')} 
            className="group font-mono text-[0.65rem] md:text-xs text-white/40 hover:text-white transition-colors tracking-[0.2em] uppercase text-left flex items-center gap-3"
          >
            <span className="text-primary/50 group-hover:text-primary transition-colors">[01]</span> 
            <span className="relative">
              VIEW_ARCHITECTURE
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
            </span>
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="group font-mono text-[0.65rem] md:text-xs text-white/40 hover:text-white transition-colors tracking-[0.2em] uppercase text-left flex items-center gap-3"
          >
            <span className="text-primary/50 group-hover:text-primary transition-colors">[02]</span> 
            <span className="relative">
              INITIALIZE_CONTACT
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
            </span>
          </button>
        </div>

        {/* Bottom Right: Social Links */}
        <div className="absolute bottom-8 right-4 md:bottom-16 md:right-12 flex flex-col gap-4 md:gap-5 text-right pointer-events-auto items-end">
          <a 
            href="https://github.com/DarainHyder" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group font-mono text-[0.65rem] md:text-xs text-white/40 hover:text-white transition-colors tracking-[0.2em] uppercase flex items-center gap-3"
          >
            <span className="relative">
              GITHUB_REPO
              <span className="absolute -bottom-1 right-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
            </span>
            <span className="text-primary/50 group-hover:text-primary transition-colors">[/]</span> 
          </a>
          <a 
            href="https://www.linkedin.com/in/syed-darain-hyder-kazmi" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group font-mono text-[0.65rem] md:text-xs text-white/40 hover:text-white transition-colors tracking-[0.2em] uppercase flex items-center gap-3"
          >
            <span className="relative">
              LINKEDIN_PROFILE
              <span className="absolute -bottom-1 right-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
            </span>
            <span className="text-primary/50 group-hover:text-primary transition-colors">[/]</span> 
          </a>
        </div>
      </div>

    </section>
  );
};

export default Hero;