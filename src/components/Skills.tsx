import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SectionParticles from "./SectionParticles";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();
  const skills: Skill[] = [
    { name: "Python", level: 88, category: "programming" },
    { name: "Machine Learning", level: 85, category: "ml" },
    { name: "Deep Learning", level: 78, category: "ml" },
    { name: "TensorFlow", level: 80, category: "ml" },
    { name: "PyTorch", level: 75, category: "ml" },
    { name: "SQL", level: 82, category: "programming" },
    { name: "Pandas", level: 86, category: "data" },
    { name: "NumPy", level: 84, category: "data" },
    { name: "Scikit-learn", level: 83, category: "ml" },
  ];

  const getSkillColor = (level: number) => {
    if (level >= 85) return "bg-primary";
    if (level >= 70) return "bg-accent";
    return "bg-muted-foreground/50";
  };

  const getSkillGradient = (level: number) => {
    if (level >= 85) return "from-primary/20 to-primary";
    if (level >= 70) return "from-accent/20 to-accent";
    return "from-muted-foreground/10 to-muted-foreground/50";
  };

  return (
    <section id="skills" ref={ref} className="py-20 px-4 relative overflow-hidden">
      <SectionParticles variant="network" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Skill <span className="gradient-text">Set</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive arsenal of technologies and methodologies mastered through continuous learning and real-world application
          </p>
        </div>

        {/* Skills Grid */}
        <div className={`grid md:grid-cols-3 gap-6 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          {skills.map((skill, index) => (
            <Card 
              key={skill.name}
              className="glow-card group hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-sm font-bold text-primary">
                    {skill.level}%
                  </span>
                </div>
                
                {/* Progress Bar Background */}
                <div className="relative h-3 bg-muted/30 rounded-full overflow-hidden">
                  {/* Animated Progress Bar */}
                  <div
                    className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${getSkillGradient(skill.level)} transition-all duration-1000 ease-out ${
                      isVisible ? 'animate-fill' : 'w-0'
                    }`}
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      animationDelay: `${index * 0.05}s`
                    }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                  
                  {/* Glow effect */}
                  <div
                    className={`absolute top-0 left-0 h-full ${getSkillColor(skill.level)} opacity-50 blur-sm transition-all duration-1000`}
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      animationDelay: `${index * 0.05}s`
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skill Level Legend */}
        <div className={`mt-12 flex flex-wrap justify-center gap-6 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Expert (85%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground">Advanced (70-84%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-muted-foreground/50" />
            <span className="text-sm text-muted-foreground">Proficient (&lt;70%)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;