import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Database, BarChart3, Brain, TrendingUp } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Sales Prediction ML Model",
      description: "Built a machine learning model to predict sales trends using historical data and multiple regression techniques.",
      tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      title: "Customer Segmentation Analysis",
      description: "Performed customer segmentation using K-means clustering to identify target demographics for marketing campaigns.",
      tech: ["Python", "K-means", "Data Visualization", "NumPy"],
      icon: BarChart3,
      color: "text-accent"
    },
    {
      title: "Data Visualization Dashboard",
      description: "Created an interactive dashboard for visualizing complex datasets with real-time filtering and analysis capabilities.",
      tech: ["React", "D3.js", "JavaScript", "CSS"],
      icon: Database,
      color: "text-data-teal"
    },
    {
      title: "Sentiment Analysis Tool",
      description: "Developed a natural language processing tool to analyze sentiment in social media posts and customer reviews.",
      tech: ["Python", "NLTK", "Machine Learning", "Flask"],
      icon: Brain,
      color: "text-data-cyan"
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
                    <Button variant="outline" size="sm" className="flex-1">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                    <Button variant="default" size="sm" className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="interactive-hover">
            <Github className="mr-2 h-5 w-5" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;