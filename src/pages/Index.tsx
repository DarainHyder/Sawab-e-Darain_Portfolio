import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Reviews from "@/components/Reviews";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Reviews />
      <Certificates />
      <Contact />
      <Footer />
      
      {/* Fixed Watermark */}
      <div className="fixed bottom-4 right-4 z-[9999] pointer-events-none select-none">
        <span className="text-[10px] font-mono text-primary/20 tracking-[0.2em] uppercase vertical-text">
          sawabedarain
        </span>
      </div>
    </div>
  );
};

export default Index;
