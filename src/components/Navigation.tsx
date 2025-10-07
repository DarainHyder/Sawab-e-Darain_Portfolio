import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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
    { label: "Certificates", id: "certificates" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-[0_4px_30px_rgba(255,69,58,0.1)]" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo with glow effect */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`text-xl font-bold hover:scale-105 transition-all duration-300 flex items-center gap-2 group ${
              isScrolled ? 'shadow-[0_0_20px_rgba(255,69,58,0.3)]' : ''
            }`}
          >
            <span className="gradient-text font-extrabold tracking-tight text-2xl group-hover:drop-shadow-[0_0_10px_rgba(255,69,58,0.5)]">DS</span>
            <span className="text-primary/50 font-light">|</span>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Data Science</span>
          </button>

          {/* Desktop Navigation with hover effects */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-muted-foreground hover:text-primary transition-all duration-300 font-medium group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="interactive-hover border-primary/30 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(255,69,58,0.3)] transition-all duration-300" 
              asChild
            >
              <a href="https://drive.google.com/file/d/1sS1wm2hGQmQwDob8GvasqPYFnejf9APv/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                CV
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/20 bg-background/95 backdrop-blur-md">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <a href="https://drive.google.com/file/d/1sS1wm2hGQmQwDob8GvasqPYFnejf9APv/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;