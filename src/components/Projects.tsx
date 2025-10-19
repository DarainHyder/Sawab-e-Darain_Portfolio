import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Database, BarChart3, Brain, TrendingUp, Stethoscope, Activity, Image, Gamepad2, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SectionParticles from "./SectionParticles";
import { useState } from "react";

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const projects = [
    {
      title: "NASA Space App",
      description: "Innovative space exploration application developed for NASA Space Apps Challenge, featuring advanced data visualization and analysis of space-related datasets.",
      tech: ["Python", "Data Visualization", "Space Tech", "APIs"],
      icon: Brain,
      color: "text-primary",
      githubUrl: "https://github.com/DarainHyder/NASA-Space-App"
    },
    {
      title: "BioMed Research Helper",
      description: "Comprehensive biomedical research assistance tool that leverages AI and data analysis to support medical research workflows and literature analysis.",
      tech: ["Python", "AI", "Medical Research", "NLP"],
      icon: Stethoscope,
      color: "text-accent",
      githubUrl: "https://github.com/DarainHyder/BioMed_ResearchHelper"
    },
    {
      title: "Image Quality Assessment",
      description: "Advanced image quality assessment system using computer vision and machine learning techniques to evaluate and measure image quality parameters with high accuracy.",
      tech: ["Python", "Computer Vision", "Machine Learning", "OpenCV"],
      icon: Image,
      color: "text-data-teal",
      githubUrl: "https://github.com/DarainHyder/Image_Quality_Assessment"
    },
    {
      title: "Heart Attack Risk Analysis & ML Model",
      description: "Applied Probability and Statistics concepts to analyze heart attack risks with data cleaning, hypothesis testing, and model training using classified dataset.",
      tech: ["Python", "Jupyter Notebook", "Statistics", "Machine Learning"],
      icon: Activity,
      color: "text-data-cyan",
      githubUrl: "https://github.com/DarainHyder/Heart_Attack_risk-analysis-and-Trainig-Model"
    },
    {
      title: "AI Podcast Generator",
      description: "AI-powered podcast generator that combines LLM script creation with premium text-to-speech synthesis to produce ready-to-publish audio content from simple text prompts.",
      tech: ["Python", "LLM", "Text-to-Speech", "AI"],
      icon: BarChart3,
      color: "text-primary",
      githubUrl: "https://github.com/DarainHyder/podcast_generator"
    },
    {
      title: "Word Puzzle Solver",
      description: "Intelligent algorithm to solve various word puzzles using advanced pattern recognition and optimization techniques for efficient puzzle resolution.",
      tech: ["Python", "Algorithms", "Pattern Recognition", "Optimization"],
      icon: Database,
      color: "text-accent",
      githubUrl: "https://github.com/DarainHyder/Word_Puzzle_Solver"
    },
    {
      title: "Osteoporosis Prediction Model",
      description: "Advanced predictive model for osteoporosis risk assessment using patient data, statistical analysis, and machine learning algorithms.",
      tech: ["Python", "Machine Learning", "Medical Analytics", "Scikit-learn"],
      icon: TrendingUp,
      color: "text-data-teal",
      githubUrl: "https://github.com/DarainHyder"
    },
    {
      title: "Checkers Game",
      description: "Interactive checkers game implementation with AI opponent, featuring strategic gameplay mechanics and user-friendly interface for an engaging gaming experience.",
      tech: ["Python", "Game Development", "AI", "GUI"],
      icon: Gamepad2,
      color: "text-data-cyan",
      githubUrl: "https://github.com/DarainHyder/Checker-Game"
    }
  ];

  return (
    <section id="projects" ref={ref} className="py-20 px-4 bg-muted/5 relative overflow-hidden">
      <SectionParticles variant="data-flow" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my data science projects that demonstrate practical application of 
            machine learning, data analysis, and visualization techniques.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title} 
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated gradient background */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur opacity-0 group-hover:opacity-75 transition-all duration-1000 animate-gradient ${hoveredIndex === index ? 'opacity-75' : ''}`} 
                   style={{ backgroundSize: '200% 200%' }} />
              
              {/* Sparkle particles on hover */}
              {hoveredIndex === index && (
                <>
                  <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-primary animate-pulse z-20" />
                  <Sparkles className="absolute -bottom-2 -left-2 h-5 w-5 text-accent animate-pulse z-20" style={{ animationDelay: '0.5s' }} />
                </>
              )}
              
              <Card className={`relative glow-card card-reveal ${isVisible ? 'visible' : ''} stagger-${(index % 8) + 1} transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 border-2 ${hoveredIndex === index ? 'border-primary/50' : 'border-transparent'}`}>
                {/* Inner glow effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`relative p-3 rounded-lg bg-muted/20 ${project.color} transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                      {/* Icon glow */}
                      <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-500 ${project.color}`} 
                           style={{ backgroundColor: 'currentColor' }} />
                      <project.icon className="h-6 w-6 relative z-10 group-hover:animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className={`text-xs transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground cursor-default`}
                          style={{ transitionDelay: `${techIndex * 50}ms` }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 group/btn hover:border-primary hover:text-primary transition-all duration-300"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <Github className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                        Code
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1 group/btn hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:-rotate-12 transition-transform duration-300" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="interactive-hover"
            onClick={() => window.open('https://github.com/DarainHyder', '_blank')}
          >
            <Github className="mr-2 h-5 w-5" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;