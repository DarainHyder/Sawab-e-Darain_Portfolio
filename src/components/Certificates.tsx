import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, ExternalLink } from "lucide-react";

const Certificates = () => {
  const certificates = [
    {
      title: "Python for Data Science",
      issuer: "Coursera",
      date: "2024",
      description: "Comprehensive course covering Python programming fundamentals for data analysis and visualization.",
      skills: ["Python", "Pandas", "NumPy", "Matplotlib"],
      level: "Intermediate"
    },
    {
      title: "Machine Learning Fundamentals",
      issuer: "edX",
      date: "2024",
      description: "Introduction to machine learning algorithms, supervised and unsupervised learning techniques.",
      skills: ["ML Algorithms", "Scikit-learn", "Statistics", "Data Mining"],
      level: "Beginner"
    },
    {
      title: "SQL for Data Analysis",
      issuer: "Udemy",
      date: "2023",
      description: "Advanced SQL techniques for data manipulation, querying, and database management.",
      skills: ["SQL", "Database Design", "Query Optimization", "Data Modeling"],
      level: "Advanced"
    },
    {
      title: "Data Visualization with Tableau",
      issuer: "Tableau",
      date: "2024",
      description: "Creating interactive dashboards and compelling data visualizations using Tableau.",
      skills: ["Tableau", "Dashboard Design", "Data Storytelling", "Business Intelligence"],
      level: "Intermediate"
    },
    {
      title: "Statistical Analysis",
      issuer: "Khan Academy",
      date: "2023",
      description: "Fundamentals of statistics including probability, hypothesis testing, and regression analysis.",
      skills: ["Statistics", "Probability", "Hypothesis Testing", "Regression"],
      level: "Intermediate"
    },
    {
      title: "Deep Learning Basics",
      issuer: "DeepLearning.AI",
      date: "2024",
      description: "Introduction to neural networks, deep learning frameworks, and practical applications.",
      skills: ["Neural Networks", "TensorFlow", "Deep Learning", "AI"],
      level: "Beginner"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-500/20 text-green-400";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400";
      case "Advanced": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <section id="certificates" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Certificates & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Continuous learning through certified courses and professional development programs 
            to stay current with industry trends and best practices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <Card key={cert.title} className="glow-card interactive-hover group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Award className="h-6 w-6 text-primary" />
                  <Badge className={getLevelColor(cert.level)} variant="secondary">
                    {cert.level}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{cert.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-accent">{cert.issuer}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {cert.date}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-foreground">Skills Gained:</p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                    <ExternalLink className="h-3 w-3" />
                    View Certificate
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">{certificates.length}</div>
            <div className="text-sm text-muted-foreground">Certificates Earned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">4</div>
            <div className="text-sm text-muted-foreground">Platforms</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">20+</div>
            <div className="text-sm text-muted-foreground">Skills Acquired</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Study Hours</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;