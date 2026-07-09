import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Database, Brain, Stethoscope, Activity, Image, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatedSection } from "./AnimatedSection";

const ProjectCard = ({ project }: { project: any }) => (
  <Card className="relative glow-card w-full h-full border border-border bg-background shadow-2xl shadow-black/80 overflow-hidden group hover:border-primary/50 transition-colors duration-500">
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    <CardHeader className="relative z-10 pb-4 md:p-8 md:pb-6 bg-background">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-2">
        <div className={`relative p-4 rounded-xl bg-muted/20 ${project.color} transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 w-fit`}>
          <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-500 ${project.color}`} 
               style={{ backgroundColor: 'currentColor' }} />
          <project.icon className="h-8 w-8 relative z-10 group-hover:animate-pulse" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
        </div>
      </div>
      <CardDescription className="text-base md:text-lg leading-relaxed group-hover:text-foreground/90 transition-colors duration-300 mt-4 md:mt-2">
        {project.description}
      </CardDescription>
    </CardHeader>
    <CardContent className="relative z-10 md:px-8 md:pb-8 pt-0">
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech: string) => (
            <Badge 
              key={tech} 
              variant="secondary" 
              className="text-xs md:text-sm px-3 py-1 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground cursor-default"
            >
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
          <Button 
            variant="outline" 
            size="lg" 
            className="group/btn hover:border-primary hover:text-primary transition-all duration-300 sm:flex-1"
            onClick={() => window.open(project.githubUrl, '_blank')}
          >
            <Github className="mr-2 h-5 w-5 group-hover/btn:rotate-12 transition-transform duration-300" />
            Source Code
          </Button>
          <Button 
            variant="default" 
            size="lg" 
            className="group/btn hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 sm:flex-1"
            onClick={() => window.open(project.liveUrl || project.githubUrl, '_blank')}
          >
            <ExternalLink className="mr-2 h-5 w-5 group-hover/btn:-rotate-12 transition-transform duration-300" />
            Live Preview
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const cardOffsets = [
    { r: 0, x: 0, y: 0 },
    { r: 4, x: 15, y: -18 },
    { r: -5, x: -20, y: -25 },
    { r: 3, x: 25, y: -10 },
    { r: -6, x: -15, y: -30 },
    { r: 5, x: 20, y: -20 }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const maxScroll = rect.height - windowHeight;
      const scrolled = -rect.top;
      
      if (maxScroll > 0) {
        const currentProgress = Math.max(0, Math.min(1, scrolled / maxScroll));
        setProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "Adaptive Multi-Agent E-Learning System",
      description: "Built a multi-agent AI system with reinforcement-based feedback loops that personalizes learning paths and adjusts content difficulty dynamically.",
      tech: ["Multi-Agent AI", "Reinforcement Learning", "NLP", "ML Classification"],
      icon: Sparkles,
      color: "text-primary",
      githubUrl: "https://github.com/DarainHyder",
      liveUrl: "https://adaptive-e-learning-system.vercel.app/"
    },
    {
      title: "BioMed Research Helper",
      description: "Comprehensive biomedical research assistance tool integrating PubMed API mining, semantic search, and LLM-summarization for medical literature.",
      tech: ["Python", "FastAPI", "Streamlit", "LLM", "NLP", "Semantic Search"],
      icon: Stethoscope,
      color: "text-accent",
      githubUrl: "https://github.com/DarainHyder/BioMed_ResearchHelper",
      liveUrl: "https://bio-med-research-helper-yzop.vercel.app/"
    },
    {
      title: "Image Quality Assessment",
      description: "PyTorch deep learning pipeline for blind image quality scoring using CNN-based feature extraction, deployed as a microservice via FastAPI.",
      tech: ["PyTorch", "FastAPI", "Streamlit", "Docker", "CNN", "Computer Vision"],
      icon: Image,
      color: "text-data-teal",
      githubUrl: "https://github.com/DarainHyder/Image_Quality_Assessment",
      liveUrl: "https://lumina-iqa.vercel.app/"
    },
    {
      title: "NASA Space App",
      description: "Innovative space exploration application developed for NASA Space Apps Challenge, featuring advanced data visualization and analysis of space-related datasets.",
      tech: ["Python", "Data Visualization", "Space Tech", "APIs"],
      icon: Brain,
      color: "text-primary",
      githubUrl: "https://github.com/DarainHyder/NASA-Space-App",
      liveUrl: "https://nasa-space-app-nine.vercel.app/"
    },
    {
      title: "Heart Attack Risk Analysis & ML Model",
      description: "Applied Probability and Statistics concepts to analyze heart attack risks with data cleaning, hypothesis testing, and model training using classified dataset.",
      tech: ["Python", "Jupyter Notebook", "Statistics", "Machine Learning"],
      icon: Activity,
      color: "text-data-cyan",
      githubUrl: "https://github.com/DarainHyder/Heart_Attack_risk-analysis-and-Trainig-Model",
      liveUrl: "https://myocardial-risk-index.vercel.app/"
    },
    {
      title: "Word Puzzle Solver",
      description: "Intelligent algorithm to solve various word puzzles using advanced pattern recognition and optimization techniques for efficient puzzle resolution.",
      tech: ["Python", "Algorithms", "Pattern Recognition", "Optimization"],
      icon: Database,
      color: "text-accent",
      githubUrl: "https://github.com/DarainHyder/Word_Puzzles_Solver",
      liveUrl: "https://word-puzzles-solver.vercel.app/"
    }
  ];

  return (
    <AnimatedSection id="projects" variant="scale-up-staggered" className="bg-muted/5 relative md:h-[400vh]">
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />
      
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden py-20 px-4 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full relative z-10">
          
          <div className="text-center mb-8 md:mb-12 stagger-child">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of my data science projects demonstrating practical applications of 
              machine learning, data analysis, and software engineering.
            </p>
          </div>

          {/* Mobile Swipe Container */}
          <div className="block md:hidden mt-8">
            <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 gap-4 hide-scrollbar -mx-4 px-4">
              {projects.map((project, index) => (
                 <div key={index} className="w-[85vw] flex-shrink-0 snap-center stagger-child" style={{ transitionDelay: `${0.2 + index * 0.1}s` }}>
                    <ProjectCard project={project} />
                 </div>
              ))}
            </div>
            
            <div className="text-center mt-4 stagger-child" style={{ transitionDelay: '0.8s' }}>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={() => window.open('https://github.com/DarainHyder', '_blank')}
              >
                <Github className="mr-2 h-5 w-5" />
                View All on GitHub
              </Button>
            </div>
          </div>

          {/* Desktop Stacked Deck */}
          <div className="hidden md:block relative w-full max-w-4xl mx-auto h-[450px] lg:h-[480px]">
            {/* Progress Indicator */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-50 stagger-child" style={{ transitionDelay: '0.2s' }}>
               <div className="text-sm font-bold text-primary">0{Math.min(projects.length, Math.floor(progress * projects.length) + 1)}</div>
               <div className="w-1 h-32 bg-border/50 rounded-full overflow-hidden relative">
                 <div className="absolute top-0 left-0 w-full bg-primary transition-all duration-100" style={{ height: `${progress * 100}%` }}></div>
               </div>
               <div className="text-sm font-bold text-muted-foreground">0{projects.length}</div>
            </div>

            {/* Deck of Cards */}
            {projects.map((project, i) => {
              const totalCards = projects.length;
              const currentIndex = progress * (totalCards - 1);
              const relativeIndex = i - currentIndex;
              
              let translateY = 0;
              let translateX = 0;
              let rotate = 0;
              let opacity = 1;
              
              if (relativeIndex < 0) {
                translateY = relativeIndex * 250; 
                opacity = Math.max(0, 1 + relativeIndex * 2.5); 
              } else {
                const mix = Math.min(1, relativeIndex); 
                const offset = cardOffsets[i % cardOffsets.length];
                
                rotate = offset.r * mix;
                translateX = offset.x * mix;
                translateY = offset.y * mix;
                opacity = 1; 
              }
              
              if (opacity <= 0.01) return null;

              return (
                <div 
                  key={i}
                  className="absolute top-0 left-0 w-full h-full stagger-child"
                  style={{ zIndex: 100 - i, transitionDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div
                    className="w-full h-full will-change-transform origin-center"
                    style={{
                      transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
                      opacity: opacity,
                      transition: 'transform 0.1s ease-out, opacity 0.1s linear'
                    }}
                  >
                    <ProjectCard project={project} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden md:flex justify-center mt-12 z-50 stagger-child" style={{ transitionDelay: '0.9s' }}>
            <Button 
              variant="link" 
              className="text-muted-foreground hover:text-foreground opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => window.open('https://github.com/DarainHyder', '_blank')}
            >
              View All Projects on GitHub <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Projects;