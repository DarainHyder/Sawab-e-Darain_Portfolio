import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
      </div>
      
      {/* Animated ML Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-primary/15 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        {/* Neural network layers */}
        <div className="absolute top-20 left-10 flex flex-col gap-4">
          <div className="w-3 h-3 rounded-full bg-primary/60 animate-pulse shadow-[0_0_15px_rgba(255,69,58,0.6)]"></div>
          <div className="w-3 h-3 rounded-full bg-accent/60 animate-pulse shadow-[0_0_15px_rgba(255,45,85,0.6)]" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 rounded-full bg-primary/60 animate-pulse shadow-[0_0_15px_rgba(255,69,58,0.6)]" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        <div className="absolute top-40 left-32 flex flex-col gap-4">
          <div className="w-3 h-3 rounded-full bg-accent/60 animate-pulse shadow-[0_0_15px_rgba(255,45,85,0.6)]" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-3 h-3 rounded-full bg-primary/60 animate-pulse shadow-[0_0_15px_rgba(255,69,58,0.6)]" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-3 h-3 rounded-full bg-accent/60 animate-pulse shadow-[0_0_15px_rgba(255,45,85,0.6)]" style={{ animationDelay: '0.7s' }}></div>
          <div className="w-3 h-3 rounded-full bg-primary/60 animate-pulse shadow-[0_0_15px_rgba(255,69,58,0.6)]" style={{ animationDelay: '0.9s' }}></div>
        </div>
        
        <div className="absolute bottom-20 right-20 flex flex-col gap-4">
          <div className="w-3 h-3 rounded-full bg-primary/60 animate-pulse shadow-[0_0_15px_rgba(255,69,58,0.6)]" style={{ animationDelay: '0.6s' }}></div>
          <div className="w-3 h-3 rounded-full bg-accent/60 animate-pulse shadow-[0_0_15px_rgba(255,45,85,0.6)]" style={{ animationDelay: '0.8s' }}></div>
          <div className="w-3 h-3 rounded-full bg-primary/60 animate-pulse shadow-[0_0_15px_rgba(255,69,58,0.6)]" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Data flow particles */}
        <div className="absolute top-1/3 left-0 w-2 h-2 rounded-full bg-primary/70 animate-[slide-right_4s_linear_infinite] shadow-[0_0_10px_rgba(255,69,58,0.7)]"></div>
        <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-accent/70 animate-[slide-right_5s_linear_infinite] shadow-[0_0_10px_rgba(255,45,85,0.7)]" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-2/3 left-0 w-2 h-2 rounded-full bg-primary/70 animate-[slide-right_4.5s_linear_infinite] shadow-[0_0_10px_rgba(255,69,58,0.7)]" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent font-light" style={{ 
              letterSpacing: '0.05em'
            }}>
              Darain Hyder
            </span>
          </h1>
          
          {/* Professional Titles */}
          <div className="mb-8 flex flex-wrap justify-center gap-3 text-base md:text-lg">
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-foreground font-medium hover:bg-primary/20 transition-all duration-300">
              Data Scientist
            </span>
            <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-foreground font-medium hover:bg-accent/20 transition-all duration-300">
              ML Tinkerer
            </span>
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-foreground font-medium hover:bg-primary/20 transition-all duration-300">
              NLP Rookie
            </span>
          </div>
          
          {/* Unique Aesthetic Quote */}
          <p className="text-lg md:text-xl text-muted-foreground/80 mb-12 font-light italic max-w-xl mx-auto">
            Where <span className="gradient-text font-medium not-italic">algorithms</span> meet artistry,
            <br />
            <span className="gradient-text font-medium not-italic">patterns</span> become poetry
          </p>
        </div>

        <div className="animate-slide-in-left flex flex-wrap justify-center gap-4 mb-12">
          <Button 
            variant="default" 
            size="lg" 
            className="interactive-hover"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Github className="mr-2 h-5 w-5" />
            View Projects
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="interactive-hover"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Mail className="mr-2 h-5 w-5" />
            Contact Me
          </Button>
        </div>

        <div className="animate-slide-in-right flex justify-center gap-6 mb-12">
          <a 
            href="https://github.com/DarainHyder" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/syed-darain-hyder-kazm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a 
            href="mailto:darainhyder21@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default Hero;