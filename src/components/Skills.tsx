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
    // Core Programming
    { name: "Python", level: 92, category: "programming" },
    { name: "SQL", level: 82, category: "programming" },
    { name: "OOP & DSA", level: 88, category: "programming" },
    
    // AI & Machine Learning
    { name: "Machine Learning", level: 90, category: "ml" },
    { name: "Deep Learning", level: 85, category: "ml" },
    { name: "Computer Vision", level: 88, category: "ml" },
    { name: "NLP", level: 86, category: "ml" },
    
    // Frameworks & Libraries
    { name: "PyTorch", level: 88, category: "ml" },
    { name: "TensorFlow", level: 80, category: "ml" },
    { name: "Scikit-learn", level: 86, category: "ml" },
    { name: "Hugging Face", level: 85, category: "ml" },
    
    // Data Science & Engineering
    { name: "Pandas & NumPy", level: 90, category: "data" },
    { name: "Feature Engineering", level: 88, category: "data" },
    { name: "Visualization", level: 85, category: "data" },
    
    // MLOps & Deployment
    { name: "FastAPI", level: 86, category: "deployment" },
    { name: "Streamlit", level: 88, category: "deployment" },
    { name: "Git & GitHub", level: 88, category: "tools" },
    { name: "Linux", level: 80, category: "tools" },
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
            A high-impact arsenal of technologies mastered through continuous learning and engineering.
          </p>
        </div>

        {/* Skills Grid - Updated to 4-5 per row */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          {skills.map((skill, index) => (
            <Card 
              key={skill.name}
              className="glow-card group hover:scale-[1.05] transition-all duration-300 border-none bg-card/30 backdrop-blur-md"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-sm group-hover:text-primary transition-colors truncate pr-1">
                    {skill.name}
                  </h4>
                  <span className="text-[10px] font-bold text-primary">
                    {skill.level}%
                  </span>
                </div>
                
                <div className="relative h-1.5 bg-muted/20 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${getSkillGradient(skill.level)} transition-all duration-1000 ease-out ${
                      isVisible ? 'animate-fill' : 'w-0'
                    }`}
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      animationDelay: `${index * 0.05}s`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  </div>
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