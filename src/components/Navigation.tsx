import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, User, Briefcase, Code, Mail } from "lucide-react";
import logoImage from "@/assets/image_nobg_white.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Track active section for the liquid bubble indicator
      const sections = ["about", "experience", "projects", "contact"];
      // Add a slight offset so it activates when section is roughly in the middle of screen
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "About", id: "about", icon: User },
    { label: "Experience", id: "experience", icon: Briefcase },
    { label: "Projects", id: "projects", icon: Code },
    { label: "Contact", id: "contact", icon: Mail }
  ];

  return (
    <>
      {/* Top Header Panel */}
      <header 
        className="fixed top-6 left-0 right-0 z-50 pointer-events-none w-full flex flex-col items-center"
      >
        <div className="w-[95%] max-w-7xl flex items-center justify-between">
          
          {/* Left Side: Logo Pill */}
          <div className={`
            pointer-events-auto relative overflow-hidden rounded-full
            bg-background/40 backdrop-blur-2xl border border-primary/20
            shadow-[0_8px_32px_rgba(255,69,58,0.15)] hover:shadow-[0_8px_48px_rgba(255,69,58,0.25)]
            transition-all duration-500
            ${isScrolled ? 'py-2 px-5' : 'py-3 px-6'}
          `}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 hover:opacity-100 transition-opacity duration-500 animate-pulse-slow pointer-events-none" />
            
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 group relative z-10">
              <img src={logoImage} alt="Logo" className="w-8 h-8 object-contain transition-transform duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
              
              {/* Premium Bespoke Signature Logo */}
              <div className="relative flex flex-col items-center justify-center mt-1 px-1">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 scale-150 rounded-full pointer-events-none" />
                <span style={{ fontFamily: "'Alex Brush', cursive" }} className="text-[1.8rem] text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-foreground/70 drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)] transition-all duration-700 relative z-10 font-normal leading-none pr-1">
                  Sawabedarain
                </span>
                <svg className="w-[110%] h-2.5 absolute -bottom-[2px] left-[-5%] z-10 opacity-80 group-hover:opacity-100 group-hover:scale-x-110 transition-all duration-700 text-primary origin-left pointer-events-none" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M5,15 Q35,25 65,10 T95,5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(255,69,58,0.8)]" />
                  <circle cx="95" cy="5" r="2" fill="currentColor" className="drop-shadow-[0_0_8px_rgba(255,69,58,0.8)]" />
                </svg>
              </div>
            </button>
          </div>

          {/* Right Side: Actions Pill */}
          <div className={`
            pointer-events-auto relative overflow-hidden rounded-full flex items-center gap-2
            bg-background/40 backdrop-blur-2xl border border-primary/20
            shadow-[0_8px_32px_rgba(255,69,58,0.15)] hover:shadow-[0_8px_48px_rgba(255,69,58,0.25)]
            transition-all duration-500
            ${isScrolled ? 'p-1.5' : 'p-2'}
          `}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 hover:opacity-100 transition-opacity duration-500 animate-pulse-slow pointer-events-none" />
            
            <div className="hidden md:block relative z-10">
              <Button size="sm" className="relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_30px_rgba(255,69,58,0.5)] transition-all duration-300 group border-0 px-6 py-4" asChild>
                <a href="https://drive.google.com/file/d/129MG1Pxi5QC13KT8osDd6eJAhQuyZtmx/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  <span className="font-semibold text-sm">Resume</span>
                </a>
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="lg:hidden rounded-full hover:bg-primary/10 relative z-10 w-10 h-10" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="pointer-events-auto lg:hidden w-[95%] max-w-7xl mt-4 rounded-3xl bg-background/95 backdrop-blur-2xl border border-primary/20 shadow-[0_8px_32px_rgba(255,69,58,0.15)] overflow-hidden animate-fade-in">
            <div className="p-6 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300 font-medium"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.label}
                </button>
              ))}
              <Button 
                className="w-full mt-4 rounded-2xl bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_30px_rgba(255,69,58,0.5)] border-0" 
                asChild
              >
                <a href="https://drive.google.com/file/d/129MG1Pxi5QC13KT8osDd6eJAhQuyZtmx/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center">
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Option A: The "Active Track" Vertical Nav (Desktop Only) */}
      <nav className="hidden lg:flex fixed top-1/2 -translate-y-1/2 right-8 z-50 flex-col items-center justify-center p-2 gap-4 rounded-full bg-background/20 backdrop-blur-3xl border border-primary/20 shadow-[0_8px_32px_rgba(255,69,58,0.15)] transition-all duration-500 w-14">
        
        {/* The Liquid Sliding Bubble */}
        <div 
          className="absolute w-10 h-10 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-full shadow-[0_0_20px_rgba(255,69,58,0.5)] border border-primary/40 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none"
          style={{
            top: `calc(0.5rem + ${Math.max(0, navItems.findIndex(i => i.id === activeSection))} * 3.5rem)`
          }}
        />

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative w-10 h-10 flex items-center justify-center rounded-full group z-10 transition-colors duration-300 ${
                isActive ? "text-white" : "text-muted-foreground hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 relative z-10 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
              
              {/* Sleek Hover Tooltip */}
              <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-xl border border-primary/20 shadow-lg text-sm font-medium text-white opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
                {item.label}
              </div>
            </button>
          )
        })}
      </nav>

    </>
  );
};

export default Navigation;