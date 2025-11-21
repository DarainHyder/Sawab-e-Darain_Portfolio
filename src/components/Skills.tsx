import { Card, CardContent } from "@/components/ui/card";
import { Brain, Code, Database, BarChart3, Sparkles, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SectionParticles from "./SectionParticles";
import { useState } from "react";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const skillCategories = [
    { id: "all", label: "All Skills", icon: Sparkles, color: "text-primary" },
    { id: "ml", label: "ML & AI", icon: Brain, color: "text-accent" },
    { id: "programming", label: "Programming", icon: Code, color: "text-primary" },
    { id: "data", label: "Data & Analytics", icon: BarChart3, color: "text-accent" },
    { id: "tools", label: "Tools & DevOps", icon: Database, color: "text-primary" },
  ];

  const skills: Skill[] = [
    // ML & AI
    { name: "Machine Learning", level: 90, category: "ml" },
    { name: "Deep Learning", level: 85, category: "ml" },
    { name: "Natural Language Processing", level: 80, category: "ml" },
    { name: "Computer Vision", level: 75, category: "ml" },
    { name: "TensorFlow", level: 85, category: "ml" },
    { name: "PyTorch", level: 82, category: "ml" },
    { name: "Scikit-learn", level: 90, category: "ml" },
    
    // Programming
    { name: "Python", level: 95, category: "programming" },
    { name: "SQL", level: 85, category: "programming" },
    { name: "HTML/CSS", level: 80, category: "programming" },
    { name: "FastAPI", level: 75, category: "programming" },
    
    // Data & Analytics
    { name: "NumPy", level: 90, category: "data" },
    { name: "Pandas", level: 92, category: "data" },
    { name: "Matplotlib", level: 88, category: "data" },
    { name: "Seaborn", level: 85, category: "data" },
    { name: "Power BI", level: 80, category: "data" },
    { name: "Data Visualization", level: 87, category: "data" },
    { name: "Statistical Analysis", level: 85, category: "data" },
    
    // Tools & DevOps
    { name: "Git & GitHub", level: 90, category: "tools" },
    { name: "Docker", level: 75, category: "tools" },
    { name: "AWS", level: 70, category: "tools" },
    { name: "Kaggle", level: 88, category: "tools" },
    { name: "Postman", level: 82, category: "tools" },
    { name: "Jupyter Notebook", level: 95, category: "tools" },
  ];

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

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

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          {skillCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105'
                    : 'bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-background/90'
                }`}
              >
                <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'text-white scale-110' : category.color}`} />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className={`grid md:grid-cols-2 gap-6 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          {filteredSkills.map((skill, index) => (
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