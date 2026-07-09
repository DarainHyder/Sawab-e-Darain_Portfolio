import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, Terminal as TerminalIcon } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import DataScienceBackground from "./DataScienceBackground";

// --- Custom Hooks ---

const useTypewriter = (words: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setText(words[0]);
      return;
    }

    const i = loopNum % words.length;
    const fullText = words[i];

    const timeout = setTimeout(() => {
      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
};

// --- Components ---

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

const TerminalWindow = () => {
  return (
    <div className="w-full max-w-[500px] rounded-xl overflow-hidden border border-border/50 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(255,69,58,0.15)] group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 border-b border-border/50 bg-black/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm"></div>
        </div>
        <div className="mx-auto text-xs font-mono text-muted-foreground/80 flex items-center gap-2">
          <TerminalIcon className="w-3 h-3" />
          train_model.py
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono text-xs md:text-sm h-[320px] flex flex-col gap-1.5 relative overflow-hidden">
        {/* We use inline styles with CSS variables for stagger delays to keep it clean */}
        <div className="term-line opacity-0" style={{ animationDelay: '0.5s' }}>
          <span className="text-blue-400">import</span> <span className="text-foreground">torch, transformers</span>
        </div>
        <div className="term-line opacity-0 text-muted-foreground mt-2" style={{ animationDelay: '1.0s' }}>
          # Initializing distributed training cluster...
        </div>
        <div className="term-line opacity-0 text-green-400" style={{ animationDelay: '1.5s' }}>
          Loading dataset "medical_nlp_v4"... <span className="text-foreground">100%</span>
        </div>
        <div className="term-line opacity-0 text-green-400" style={{ animationDelay: '2.0s' }}>
          Model architecture: <span className="text-yellow-400">Transformer-XL (1.2B)</span>
        </div>
        <div className="term-line opacity-0 mt-3" style={{ animationDelay: '3.0s' }}>
          Epoch 1/50 <span className="text-foreground">[==========]</span> loss: <span className="text-accent">0.892</span>
        </div>
        <div className="term-line opacity-0" style={{ animationDelay: '3.6s' }}>
          Epoch 2/50 <span className="text-foreground">[==========]</span> loss: <span className="text-accent">0.651</span>
        </div>
        <div className="term-line opacity-0" style={{ animationDelay: '4.2s' }}>
          Epoch 3/50 <span className="text-foreground">[==========]</span> loss: <span className="text-accent">0.402</span>
        </div>
        <div className="term-line opacity-0 mt-3 text-primary font-bold" style={{ animationDelay: '5.2s' }}>
          &gt; Optimal weights achieved. Saving artifacts...
        </div>
        <div className="term-line opacity-0 text-foreground flex items-center gap-1 mt-2" style={{ animationDelay: '6.0s' }}>
          <span className="text-blue-400">darain@dev</span>:<span className="text-blue-400">~</span>$ <span className="w-2 h-4 bg-foreground animate-pulse ml-1" />
        </div>
      </div>
    </div>
  );
};

// --- Main Hero Component ---

const Hero = () => {
  const roles = ["Data Scientist", "AI/ML Engineer", "NLP Engineer"];
  const typingText = useTypewriter(roles, 80, 40, 2500);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* CSS Keyframes for Terminal */}
      <style>{`
        @keyframes terminal-fade-in {
          0% { opacity: 0; transform: translateY(5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .term-line {
          animation: terminal-fade-in 0.4s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .term-line {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* Background Layers */}
      <DataScienceBackground />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
      </div>
      
      {/* Static Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-primary/70 shadow-[0_0_10px_rgba(255,69,58,0.7)] opacity-60"></div>
        <div className="absolute top-1/2 left-2/3 w-2 h-2 rounded-full bg-accent/70 shadow-[0_0_10px_rgba(255,45,85,0.7)] opacity-60"></div>
        <div className="absolute top-2/3 left-1/2 w-2 h-2 rounded-full bg-primary/70 shadow-[0_0_10px_rgba(255,69,58,0.7)] opacity-60"></div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 pt-20 pb-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="animate-fade-in-up w-full">
              
              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-xs font-medium text-primary/90 tracking-wide backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block shadow-[0_0_8px_rgba(255,69,58,0.8)]" />
                Available for new opportunities
              </div>

              {/* Name */}
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold mb-4 tracking-tight leading-none">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent font-light" style={{ letterSpacing: '0.02em' }}>
                  Darain Hyder
                </span>
              </h1>
              
              {/* Kinetic Typography Roles */}
              <div className="h-10 md:h-12 mb-6 flex items-center">
                <p className="text-2xl md:text-3xl font-semibold text-accent flex items-center">
                  <span className="text-muted-foreground mr-3 font-light">I am a</span>
                  {typingText}
                  <span className="w-[3px] h-8 bg-accent ml-1 animate-pulse" />
                </p>
              </div>
              
              {/* Tagline */}
              <p className="text-lg md:text-xl text-muted-foreground/80 mb-10 font-light max-w-xl leading-relaxed">
                I build things with data. <span className="text-foreground font-medium">Models, pipelines, insights</span> — the kind that actually ship to production and solve real problems.
              </p>
            </div>

            {/* CTAs */}
            <div className="animate-slide-in-left flex flex-wrap gap-4 mb-12">
              <MagneticWrapper>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="interactive-hover h-14 px-8 text-base shadow-[0_0_20px_rgba(255,69,58,0.2)] hover:shadow-[0_0_30px_rgba(255,69,58,0.4)] transition-all duration-300"
                  onClick={() => scrollToSection('projects')}
                >
                  <Github className="mr-2 h-5 w-5" />
                  View Projects
                </Button>
              </MagneticWrapper>
              
              <MagneticWrapper>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="interactive-hover h-14 px-8 text-base bg-background/50 backdrop-blur-sm border-border/50 hover:bg-muted/50 transition-all duration-300"
                  onClick={() => scrollToSection('contact')}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
              </MagneticWrapper>
            </div>

            {/* Social Links */}
            <div className="animate-slide-in-left flex gap-6">
              <a href="https://github.com/DarainHyder" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 duration-300">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/syed-darain-hyder-kazm" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 duration-300">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="mailto:darainhyder21@gmail.com" className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 duration-300">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Right Column: Terminal Visual */}
          <div className="hidden lg:flex lg:col-span-5 justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <TerminalWindow />
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce p-2"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default Hero;