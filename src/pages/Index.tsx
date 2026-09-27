import { useEffect } from "react";
import { TransitionProvider } from "@/components/term/Transition";
import { TopBar } from "@/components/term/TopBar";
import { ResumeProvider } from "@/components/term/Resume";
import { Hero } from "@/components/term/Hero";
import { About, Certs, Projects, Reviews, Stack, Work } from "@/components/term/Sections";
import { Contact, Footer } from "@/components/term/Contact";

/** Faint grid that brightens around the cursor. */
function Backdrop() {
  useEffect(() => {
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
        document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="t-backdrop" aria-hidden>
      <div className="t-grid" />
      <div className="t-grid is-lit" />
      <div className="t-vignette" />
    </div>
  );
}

const Index = () => (
  <TransitionProvider>
    <ResumeProvider>
      <div className="t-root">
        <Backdrop />
        <TopBar />
        <main>
          <Hero />
          <About />
          <Stack />
          <Work />
          <Projects />
          <Reviews />
          <Certs />
          <Contact />
        </main>
        <Footer />
      </div>
    </ResumeProvider>
  </TransitionProvider>
);

export default Index;
