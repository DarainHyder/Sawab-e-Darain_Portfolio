import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Database, BarChart3, Brain, TrendingUp, Stethoscope, Activity } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Heart Attack Risk Analysis & ML Model",
      description: "Applied Probability and Statistics concepts to analyze heart attack risks with data cleaning, hypothesis testing, and model training using classified dataset.",
      tech: ["Python", "Jupyter Notebook", "Statistics", "Machine Learning"],
      icon: Brain,
      color: "text-primary",
      githubUrl: "https://github.com/DarainHyder/Heart_Attack_risk-analysis-and-Trainig-Model"
    },
    {
      title: "AI Podcast Generator",
      description: "AI-powered podcast generator that combines LLM script creation with premium text-to-speech synthesis to produce ready-to-publish audio content from simple text prompts.",
      tech: ["Python", "LLM", "Text-to-Speech", "AI"],
      icon: BarChart3,
      color: "text-accent",
      githubUrl: "https://github.com/DarainHyder/podcast_generator"
    },
    {
      title: "Word Puzzle Solver",
      description: "Intelligent algorithm to solve various word puzzles using advanced pattern recognition and optimization techniques for efficient puzzle resolution.",
      tech: ["Python", "Algorithms", "Pattern Recognition", "Optimization"],
      icon: Database,
      color: "text-data-teal",
      githubUrl: "https://github.com/DarainHyder/Word_Puzzle_Solver"
    },
    {
      title: "Data Analysis Projects",
      description: "Collection of data analysis projects showcasing various statistical methods and visualization techniques for real-world datasets.",
      tech: ["Python", "Jupyter Notebook", "Data Visualization", "Statistics"],
      icon: TrendingUp,
      color: "text-data-cyan",
      githubUrl: "https://github.com/DarainHyder/Data-Analysis-Projects"
    },
    {
      title: "Pneumonia Prediction Model",
      description: "Machine learning model for pneumonia detection and prediction using medical imaging data and advanced deep learning techniques for accurate diagnosis.",
      tech: ["Python", "Deep Learning", "Medical Imaging", "TensorFlow"],
      icon: Stethoscope,
      color: "text-red-400",
      githubUrl: "https://github.com/DarainHyder"
    },
    {
      title: "Osteoporosis Prediction Model",
      description: "Advanced predictive model for osteoporosis risk assessment using patient data, statistical analysis, and machine learning algorithms.",
      tech: ["Python", "Machine Learning", "Medical Analytics", "Scikit-learn"],
      icon: Activity,
      color: "text-accent",
      githubUrl: "https://github.com/DarainHyder"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-muted/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
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
            <Card key={project.title} className="glow-card interactive-hover group">
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