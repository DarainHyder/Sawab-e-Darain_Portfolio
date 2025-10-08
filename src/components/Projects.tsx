import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Database, BarChart3, Brain, TrendingUp, Stethoscope, Activity, Image, Gamepad2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();
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
    <section id="projects" ref={ref} className="py-20 px-4 bg-muted/5">
      <div className="max-w-6xl mx-auto">
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
            <Card key={project.title} className={`glow-card interactive-hover group scroll-reveal ${isVisible ? 'visible' : ''} stagger-${(index % 6) + 1}`}>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg bg-muted/20 ${project.color}`}>
                    <project.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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