import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Brain, Code, Database, Sparkles, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SectionParticles from "./SectionParticles";
import { useState } from "react";

const About = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  return (
    <section id="about" ref={ref} className="py-20 px-4 relative overflow-hidden">
      <SectionParticles variant="neural" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with Quote */}
        <div className={`text-center mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">The Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="relative max-w-3xl mx-auto">
            <Quote className="absolute -top-4 -left-4 h-8 w-8 text-primary/20" />
            <p className="text-xl text-muted-foreground italic">
              Transforming raw data into <span className="gradient-text font-semibold">digital symphonies</span> — 
              where numbers whisper stories and algorithms paint futures.
            </p>
            <Quote className="absolute -bottom-4 -right-4 h-8 w-8 text-primary/20 rotate-180" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8 items-start mb-16">
          {/* Journey Text - Takes 3 columns */}
          <div className={`lg:col-span-3 space-y-6 scroll-reveal-left ${isVisible ? 'visible' : ''}`}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="glow-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                <CardContent className="p-8 relative">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Brain className="h-6 w-6 text-primary" />
                    My <span className="gradient-text">Philosophy</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    BSCS student entering 5th semester, fueled by an <span className="text-primary font-medium">insatiable curiosity</span> for 
                    data science. Every dataset is a puzzle, every model a masterpiece waiting to emerge.
                  </p>
                  <div className="pl-4 border-l-2 border-primary/50">
                    <p className="text-sm italic text-muted-foreground">
                      "In the intersection of mathematics and creativity, I found my calling — 
                      crafting intelligent systems that don't just compute, but <span className="text-primary">comprehend</span>."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vision Card */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="glow-card relative">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-accent" />
                    The <span className="gradient-text">Vision</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Bridging the chasm between raw data and revelatory insights. From neural networks to NLP, 
                    each project is a step toward <span className="text-accent font-medium">data-driven enlightenment</span>.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats Cards - Takes 2 columns */}
          <div className={`lg:col-span-2 grid grid-cols-2 gap-4 scroll-reveal-right ${isVisible ? 'visible' : ''}`}>
            <Card className="glow-card interactive-hover animate-bounce-in stagger-1 group">
              <CardContent className="p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-2">Education</h4>
                <p className="text-sm text-muted-foreground">BSCS</p>
                <p className="text-sm text-primary font-medium">5th Sem</p>
              </CardContent>
            </Card>

            <Card className="glow-card interactive-hover animate-bounce-in stagger-2 group">
              <CardContent className="p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Brain className="h-12 w-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-2">Passion</h4>
                <p className="text-sm text-muted-foreground">Data Science</p>
                <p className="text-sm text-accent font-medium">AI & ML</p>
              </CardContent>
            </Card>

            <Card className="glow-card interactive-hover animate-bounce-in stagger-3 group">
              <CardContent className="p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Code className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-2">Projects</h4>
                <p className="text-sm text-muted-foreground">Multiple</p>
                <p className="text-sm text-primary font-medium">Delivered</p>
              </CardContent>
            </Card>

            <Card className="glow-card interactive-hover animate-bounce-in stagger-4 group">
              <CardContent className="p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Database className="h-12 w-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-2">Growth</h4>
                <p className="text-sm text-muted-foreground">Continuous</p>
                <p className="text-sm text-accent font-medium">Learning</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Skills Overview with Enhanced Interactivity */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">
            Core <span className="gradient-text">Competencies</span>
          </h3>
          <p className="text-sm text-muted-foreground mb-12 italic">
            "Mastery is a journey, not a destination" — Hover to explore
          </p>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Python", level: 85, icon: "🐍" },
              { name: "Machine Learning", level: 75, icon: "🤖" },
              { name: "Data Analysis", level: 80, icon: "📊" },
              { name: "NLP", level: 70, icon: "💬" },
              { name: "Computer Vision", level: 65, icon: "👁️" },
              { name: "SQL", level: 70, icon: "🗄️" }
            ].map((skill, index) => (
              <div 
                key={skill.name} 
                className="text-center group cursor-pointer"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="mb-4 relative">
                  <div className="relative w-24 h-24 mx-auto">
                    {/* Background glow effect */}
                    <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                      hoveredSkill === skill.name 
                        ? 'bg-primary/20 blur-xl scale-150' 
                        : 'bg-transparent'
                    }`} />
                    
                    {/* Skill Circle */}
                    <svg className="w-24 h-24 transform -rotate-90 relative z-10">
                      <circle
                        cx="48"
                        cy="48"
                        r="38"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="38"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 38}`}
                        strokeDashoffset={`${2 * Math.PI * 38 * (1 - skill.level / 100)}`}
                        className={`transition-all duration-1000 ease-out ${
                          hoveredSkill === skill.name ? 'text-primary' : 'text-accent'
                        }`}
                        style={{ 
                          filter: hoveredSkill === skill.name ? 'drop-shadow(0 0 8px hsl(var(--primary)))' : 'none'
                        }}
                      />
                    </svg>
                    
                    {/* Center Content */}
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className={`text-2xl mb-1 transition-transform duration-300 ${
                        hoveredSkill === skill.name ? 'scale-125' : ''
                      }`}>
                        {skill.icon}
                      </span>
                      <span className={`text-xs font-bold transition-colors duration-300 ${
                        hoveredSkill === skill.name ? 'text-primary' : 'text-foreground'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                </div>
                <h4 className={`font-semibold text-sm transition-all duration-300 ${
                  hoveredSkill === skill.name 
                    ? 'text-primary scale-105' 
                    : 'text-foreground'
                }`}>
                  {skill.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;