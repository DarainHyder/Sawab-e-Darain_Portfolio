import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SectionParticles from "./SectionParticles";
import { useState } from "react";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  // Core Programming
  { name: "Python",           level: 92, category: "programming" },
  { name: "SQL",              level: 82, category: "programming" },
  { name: "OOP & DSA",        level: 88, category: "programming" },
  // AI & Machine Learning
  { name: "Machine Learning", level: 90, category: "ml" },
  { name: "Deep Learning",    level: 85, category: "ml" },
  { name: "Computer Vision",  level: 30, category: "ml" },
  { name: "NLP",              level: 86, category: "ml" },
  // Frameworks
  { name: "PyTorch",          level: 70, category: "ml" },
  { name: "TensorFlow",       level: 80, category: "ml" },
  { name: "Scikit-learn",     level: 86, category: "ml" },
  { name: "Hugging Face",     level: 85, category: "ml" },
  // Data Engineering
  { name: "Pandas & NumPy",   level: 90, category: "data" },
  { name: "Feature Eng.",     level: 88, category: "data" },
  { name: "Visualization",    level: 85, category: "data" },
  // Deployment & Tools
  { name: "FastAPI",          level: 86, category: "deployment" },
  { name: "Streamlit",        level: 88, category: "deployment" },
  { name: "Git & GitHub",     level: 88, category: "tools" },
  { name: "Linux",            level: 80, category: "tools" },
];

const domains = [
  {
    label: "Programming",
    key: "programming",
    accent: "hsl(var(--primary))",
    description: "Core language foundations that power everything I build.",
  },
  {
    label: "AI / ML",
    key: "ml",
    accent: "hsl(var(--accent))",
    description: "Models, frameworks, and end-to-end ML pipelines.",
  },
  {
    label: "Data Engineering",
    key: "data",
    accent: "hsl(0,70%,55%)",
    description: "Processing, wrangling, and storytelling with data.",
  },
  {
    label: "Deployment & Tools",
    key: "deployment",
    accent: "hsl(0,50%,65%)",
    description: "Shipping models to production and managing workflows.",
  },
];

// SVG radial progress ring
function RingMeter({ level, color }: { level: number; color: string }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = (level / 100) * circ;
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" className="flex-shrink-0 -rotate-90">
      {/* Track */}
      <circle cx="24" cy="24" r={r} fill="none" stroke="hsl(0,0%,14%)" strokeWidth="4" />
      {/* Fill */}
      <circle
        cx="24" cy="24" r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ - dash}`}
        style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </svg>
  );
}

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeDomain, setActiveDomain] = useState<string>("ml");

  const activeSkills = skills.filter(
    (s) =>
      activeDomain === "deployment"
        ? s.category === "deployment" || s.category === "tools"
        : s.category === activeDomain
  );

  const activeMeta = domains.find((d) => d.key === activeDomain)!;

  return (
    <section id="skills" ref={ref} className="py-20 px-4 relative overflow-hidden">


      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-14 scroll-reveal ${isVisible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-primary" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <polyline points="1,12 4.5,7 7.5,10 11,4 15,4" />
              <circle cx="7.5" cy="10" r="1.2" fill="currentColor" stroke="none" />
            </svg>
            <span className="text-sm text-primary font-medium">Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skill <span className="gradient-text">Set</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Built through shipping real projects, not just tutorials.
          </p>
        </div>

        {/* Domain tabs */}
        <div className={`scroll-reveal ${isVisible ? "visible" : ""}`}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {domains.map((d) => (
              <button
                key={d.key}
                onClick={() => setActiveDomain(d.key)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeDomain === d.key
                    ? "border-primary/60 text-primary bg-primary/10 shadow-[0_0_18px_hsl(0_84%_60%/0.15)]"
                    : "border-border/30 text-muted-foreground hover:border-primary/30 hover:text-foreground bg-card/30"
                }`}
              >
                {activeDomain === d.key && (
                  <span className="absolute inset-0 rounded-full bg-primary/5 animate-pulse" />
                )}
                <span className="relative">{d.label}</span>
              </button>
            ))}
          </div>

          {/* Active domain description */}
          <p className="text-center text-sm text-muted-foreground/70 mb-10 italic transition-all duration-300">
            {activeMeta.description}
          </p>

          {/* Skills grid — ring meter + bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {activeSkills.map((skill, i) => (
              <div
                key={skill.name}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-border/25 bg-card/30 backdrop-blur-sm hover:border-primary/35 hover:bg-primary/5 transition-all duration-300 group"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {/* Ring */}
                <div className="relative">
                  {isVisible ? (
                    <RingMeter level={skill.level} color={activeMeta.accent} />
                  ) : (
                    <RingMeter level={0} color={activeMeta.accent} />
                  )}
                  {/* Level number inside ring */}
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[10px] font-bold rotate-90"
                    style={{ color: activeMeta.accent }}
                  >
                    {skill.level}%
                  </span>
                </div>

                {/* Name + linear bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60 ml-2 flex-shrink-0">
                      {skill.level >= 88 ? "Expert" : skill.level >= 80 ? "Advanced" : "Proficient"}
                    </span>
                  </div>
                  {/* Segmented track */}
                  <div className="flex gap-0.5 h-1.5">
                    {Array.from({ length: 10 }).map((_, seg) => {
                      const filled = (skill.level / 10) > seg;
                      const partial = !filled && (skill.level / 10) > seg - 1 + ((skill.level % 10) / 10);
                      return (
                        <div
                          key={seg}
                          className="flex-1 rounded-full transition-all duration-700"
                          style={{
                            backgroundColor: filled || partial
                              ? activeMeta.accent
                              : "hsl(0,0%,14%)",
                            opacity: filled ? 1 : partial ? 0.5 : 1,
                            transitionDelay: isVisible ? `${seg * 80}ms` : "0ms",
                            transform: isVisible ? "scaleX(1)" : "scaleX(0)",
                            transformOrigin: "left",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground/40 mt-10 tracking-wide">
            Proficiency self-assessed based on real project delivery
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;