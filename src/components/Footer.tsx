import { Github, Linkedin, Mail, Heart, ArrowUp, Code, Database, Brain } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-background via-background/95 to-primary/5 border-t border-primary/20 overflow-hidden">
      {/* Giant Background Text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.03] pointer-events-none select-none">
        <div className="text-[20vw] font-extrabold whitespace-nowrap animate-pulse-slow">
          DATA SCIENCE
        </div>
      </div>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/30 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-accent/30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-primary/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Floating binary code */}
          <div className="absolute top-1/4 left-1/3 text-primary/30 font-mono text-sm animate-float">01001101 01001100</div>
          <div className="absolute bottom-1/3 right-1/4 text-accent/30 font-mono text-sm animate-float" style={{ animationDelay: '2s' }}>01000001 01001001</div>
          <div className="absolute top-1/2 left-1/4 text-primary/30 font-mono text-sm animate-float" style={{ animationDelay: '1s' }}>01000100 01010011</div>
          <div className="absolute top-3/4 right-1/3 text-accent/30 font-mono text-sm animate-float" style={{ animationDelay: '3s' }}>01010000 01011001</div>
          
          {/* Moving particles */}
          <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-primary/40 animate-flow-right"></div>
          <div className="absolute top-1/3 left-1/2 w-2 h-2 rounded-full bg-accent/40 animate-flow-right" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-primary/40 animate-flow-right" style={{ animationDelay: '2.5s' }}></div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section with Interactive Elements */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,69,58,0.5)] animate-pulse-slow">
                <Brain className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-extrabold gradient-text tracking-tight">DS</span>
                  <span className="text-primary/50">|</span>
                  <span className="text-sm font-medium text-muted-foreground">Data Science</span>
                </div>
                <p className="text-xs text-muted-foreground">Transforming Data into Insights</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A passionate BSCS student on a mission to transform data into insights and make a positive impact through technology. Specializing in Machine Learning, AI, and Data Analytics.
            </p>
            
            {/* Tech Stack Icons */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/20 border border-primary/10">
                <Code className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Python</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/20 border border-primary/10">
                <Database className="h-4 w-4 text-accent" />
                <span className="text-xs text-muted-foreground">ML/AI</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/20 border border-primary/10">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Analytics</span>
              </div>
            </div>
          </div>

          {/* Quick Links with Hover Effects */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              Quick Links
            </h4>
            <div className="space-y-3">
              {[
                { label: "About", id: "about" },
                { label: "Projects", id: "projects" },
                { label: "Reviews", id: "reviews" },
                { label: "Certificates", id: "certificates" },
                { label: "Contact", id: "contact" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })}
                  className="group block text-muted-foreground hover:text-primary transition-all duration-300"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Connect Section with Animated Icons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              Let's Connect
            </h4>
            <div className="flex gap-3">
              <a 
                href="https://github.com/DarainHyder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-3 rounded-lg bg-muted/20 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,69,58,0.3)]"
              >
                <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="https://www.linkedin.com/in/syed-darain-hyder-kazm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-3 rounded-lg bg-muted/20 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,69,58,0.3)]"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group p-3 rounded-lg bg-muted/20 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,69,58,0.3)]"
              >
                <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Available for internships and collaborative projects
            </p>
          </div>
        </div>

        {/* Bottom Bar with Creative Layout */}
        <div className="pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © {currentYear} DarainHyder Portfolio
              </p>
              <div className="hidden md:block h-4 w-px bg-primary/20"></div>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                Made with <Heart className="h-4 w-4 text-primary animate-pulse" /> using React & Tailwind
              </p>
            </div>
            
            {/* Scroll to Top Button */}
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="group border-primary/30 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(255,69,58,0.3)] transition-all duration-300"
            >
              <ArrowUp className="h-4 w-4 mr-2 group-hover:animate-bounce" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;