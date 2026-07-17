import { ArrowUp } from "lucide-react";
import heroImage from "@/assets/premium-bg.png";
import DataScienceBackground from "./DataScienceBackground";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-primary/20 overflow-hidden font-mono text-xs sm:text-sm py-8 sm:py-12 px-6 sm:px-12 md:px-24">
      
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <DataScienceBackground />
      </div>
      
      {/* Decorative Terminal Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-0"></div>
      
      {/* Subtle glowing orb in the corner */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto flex flex-col gap-4 relative z-10">
        
        {/* Terminal Trace Header */}
        <div className="text-primary/70 mb-2">
          <p className="flex items-center gap-2">
            <span className="text-green-500">root@darain-hyder</span>:<span className="text-blue-400">~</span>$ <span className="text-white">./terminate_session.sh</span>
          </p>
          <p className="text-white/40 mt-1">Executing shutdown sequence...</p>
        </div>

        {/* System Logs */}
        <div className="flex flex-col text-white/50">
          <p>[<span className="text-green-500">OK</span>] Data Models persisted to storage.</p>
          <p>[<span className="text-green-500">OK</span>] Neural pathways decoupled.</p>
          <p className="text-primary animate-pulse">[WARN] Intelligence core entering sleep state...</p>
        </div>

        {/* Quick Links Array (Horizontal format) */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/70 mt-2">
          <span><span className="text-primary">const</span> <span className="text-blue-400">quick_links</span> = [</span>
          <button onClick={() => scrollToSection('about')} className="text-green-400 hover:text-white transition-colors duration-300 group">
            "<span className="group-hover:text-primary transition-colors">ABOUT_ME</span>",
          </button>
          <button onClick={() => scrollToSection('projects')} className="text-green-400 hover:text-white transition-colors duration-300 group">
            "<span className="group-hover:text-primary transition-colors">ARCHITECTURE</span>",
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-green-400 hover:text-white transition-colors duration-300 group">
            "<span className="group-hover:text-primary transition-colors">INITIALIZE_CONTACT</span>"
          </button>
          <span>];</span>
        </div>

        {/* Social Endpoints Object (Horizontal format) */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/70 mt-1">
          <span><span className="text-primary">exports</span>.<span className="text-blue-400">socials</span> = {"{"}</span>
          <a href="https://github.com/DarainHyder" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-white transition-colors duration-300 group">
            <span className="text-white/70">github:</span> "<span className="group-hover:text-primary transition-colors">github.com/DarainHyder</span>",
          </a>
          <a href="https://www.linkedin.com/in/syed-darain-hyder-kazmi" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-white transition-colors duration-300 group">
            <span className="text-white/70">linkedin:</span> "<span className="group-hover:text-primary transition-colors">linkedin.com/in/syed-darain-hyder-kazmi</span>"
          </a>
          <span>{"};"}</span>
        </div>

        {/* Execution Complete & Scroll Top */}
        <div className="mt-6 pt-6 border-t border-primary/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-white/40 text-xs">
            {`// Copyright (c) ${currentYear} Darain Hyder. All rights reserved.`}
          </p>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-primary hover:text-white transition-colors tracking-widest uppercase"
            >
              <span className="text-white/30">{">"}</span> execute_scroll(top)
              <ArrowUp className="h-4 w-4 group-hover:-translate-y-2 transition-transform duration-300" />
            </button>
            <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-2"></span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;