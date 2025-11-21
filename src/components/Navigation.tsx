import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, Sparkles } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Reviews", id: "reviews" },
    { label: "Certificates", id: "certificates" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <>
      {/* Floating Navigation Bar */}
      <nav 
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
          isScrolled 
            ? "w-[90%] max-w-5xl" 
            : "w-[95%] max-w-6xl"
        }`}
      >
        <div className={`
          relative overflow-hidden rounded-full
          bg-background/40 backdrop-blur-2xl
          border border-primary/20
          shadow-[0_8px_32px_rgba(255,69,58,0.15)]
          hover:shadow-[0_8px_48px_rgba(255,69,58,0.25)]
          transition-all duration-500
          ${isScrolled ? 'py-3 px-6' : 'py-4 px-8'}
        `}>
          {/* Animated gradient border effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow" />
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <Sparkles className="absolute top-2 left-1/4 w-3 h-3 text-primary/30 animate-pulse" />
            <Sparkles className="absolute bottom-2 right-1/4 w-2 h-2 text-accent/30 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-50 group-hover:opacity-75 transition-opacity rounded-full" />
                <span className="relative gradient-text font-black tracking-tighter text-3xl drop-shadow-[0_0_10px_rgba(255,69,58,0.5)]">
                  DH
                </span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
              <span className="hidden sm:block text-xs font-semibold text-muted-foreground/80 group-hover:text-primary transition-colors uppercase tracking-widest">
                Portfolio
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 bg-background/30 rounded-full px-2 py-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group rounded-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                size="sm" 
                className="relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_30px_rgba(255,69,58,0.5)] transition-all duration-300 group border-0"
                asChild
              >
                <a href="https://drive.google.com/file/d/1Vq0NkMac79UhlBOpprnomH355hYK8B2L/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  <span className="font-semibold">Resume</span>
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full hover:bg-primary/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 rounded-3xl bg-background/95 backdrop-blur-2xl border border-primary/20 shadow-[0_8px_32px_rgba(255,69,58,0.15)] overflow-hidden animate-fade-in">
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
                <a href="https://drive.google.com/file/d/1Vq0NkMac79UhlBOpprnomH355hYK8B2L/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center">
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-24" />
    </>
  );
};

export default Navigation;