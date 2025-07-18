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
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/10 animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-data-teal/10 animate-pulse-slow"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Data</span>{" "}
            <span className="text-foreground">Enthusiast</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            BSCS Student | Aspiring Data Scientist
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Starting my 5th semester in September 2025, passionate about transforming raw data into meaningful insights through cutting-edge technologies and innovative solutions.
          </p>
        </div>

        <div className="animate-slide-in-left flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="default" size="lg" className="interactive-hover">
            <Github className="mr-2 h-5 w-5" />
            View Projects
          </Button>
          <Button variant="outline" size="lg" className="interactive-hover">
            <Mail className="mr-2 h-5 w-5" />
            Contact Me
          </Button>
        </div>

        <div className="animate-slide-in-right flex justify-center gap-6 mb-12">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
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