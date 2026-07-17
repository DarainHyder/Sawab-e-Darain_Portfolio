import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Database, Brain, Stethoscope, Activity, Image, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatedSection } from "./AnimatedSection";

import projELearning from "@/assets/projects/proj_elearning.png";
import projBioMed from "@/assets/projects/proj_biomed.png";
import projVision from "@/assets/projects/proj_vision.png";
import projSpace from "@/assets/projects/proj_space.png";
import projHeart from "@/assets/projects/proj_heart.png";
import projPuzzle from "@/assets/projects/proj_puzzle.png";

const ProjectCard = ({ project }: { project: any }) => (
  <div className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer border border-border/20 shadow-2xl bg-[#050000]">
    {/* Background Image */}
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
      style={{ backgroundImage: `url('${project.image}')` }}
    />
    
    {/* Gradient to ensure text is readable, stays mostly transparent at the top */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    {/* Content Container - Pinned to bottom */}
    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
      
      {/* Title - Always visible but moves up slightly on hover */}
      <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
        <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg leading-tight mb-2">{project.title}</h3>
      </div>

      {/* Hidden Content - Expands from height 0 on hover */}
      <div className="overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-[300px] group-hover:opacity-100 group-hover:mt-2">
        <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech: string) => (
            <span key={tech} className="px-2 py-1 bg-primary/40 text-white text-xs rounded border border-primary/50 backdrop-blur-sm">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-black/50 border-primary/50 text-white hover:bg-primary hover:text-white backdrop-blur-md transition-colors"
            onClick={(e) => { e.stopPropagation(); window.open(project.githubUrl, '_blank'); }}
          >
            <Github className="mr-2 h-4 w-4" /> Code
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 shadow-lg hover:shadow-primary/50 transition-shadow"
            onClick={(e) => { e.stopPropagation(); window.open(project.liveUrl || project.githubUrl, '_blank'); }}
          >
            <ExternalLink className="mr-2 h-4 w-4" /> Live
          </Button>
        </div>
      </div>
      
    </div>
  </div>
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
      image: projELearning,
      githubUrl: "https://github.com/DarainHyder",
      liveUrl: "https://adaptive-e-learning-system.vercel.app/"
    },
    {
      title: "BioMed Research Helper",
      description: "Comprehensive biomedical research assistance tool integrating PubMed API mining, semantic search, and LLM-summarization for medical literature.",
      tech: ["Python", "FastAPI", "Streamlit", "LLM", "NLP", "Semantic Search"],
      image: projBioMed,
      githubUrl: "https://github.com/DarainHyder/BioMed_ResearchHelper",
      liveUrl: "https://bio-med-research-helper-yzop.vercel.app/"
    },
    {
      title: "Image Quality Assessment",
      description: "PyTorch deep learning pipeline for blind image quality scoring using CNN-based feature extraction, deployed as a microservice via FastAPI.",
      tech: ["PyTorch", "FastAPI", "Streamlit", "Docker", "CNN", "Computer Vision"],
      image: projVision,
      githubUrl: "https://github.com/DarainHyder/Image_Quality_Assessment",
      liveUrl: "https://lumina-iqa.vercel.app/"
    },
    {
      title: "NASA Space App",
      description: "Innovative space exploration application developed for NASA Space Apps Challenge, featuring advanced data visualization and analysis of space-related datasets.",
      tech: ["Python", "Data Visualization", "Space Tech", "APIs"],
      image: projSpace,
      githubUrl: "https://github.com/DarainHyder/NASA-Space-App",
      liveUrl: "https://nasa-space-app-nine.vercel.app/"
    },
    {
      title: "Heart Attack Risk Analysis & ML Model",
      description: "Applied Probability and Statistics concepts to analyze heart attack risks with data cleaning, hypothesis testing, and model training using classified dataset.",
      tech: ["Python", "Jupyter Notebook", "Statistics", "Machine Learning"],
      image: projHeart,
      githubUrl: "https://github.com/DarainHyder/Heart_Attack_risk-analysis-and-Trainig-Model",
      liveUrl: "https://myocardial-risk-index.vercel.app/"
    },
    {
      title: "Word Puzzle Solver",
      description: "Intelligent algorithm to solve various word puzzles using advanced pattern recognition and optimization techniques for efficient puzzle resolution.",
      tech: ["Python", "Algorithms", "Pattern Recognition", "Optimization"],
      image: projPuzzle,
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
                    <div className="h-[420px] w-full">
                      <ProjectCard project={project} />
                    </div>
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