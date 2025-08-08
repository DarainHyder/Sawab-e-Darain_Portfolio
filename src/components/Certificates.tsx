import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, ExternalLink } from "lucide-react";

const Certificates = () => {
  const certificates = [
    {
      title: "Associate Data Scientist in Python",
      issuer: "DataCamp",
      date: "2025",
      description: "Comprehensive career track covering Python for data science, machine learning, and statistical analysis with real-world projects.",
      skills: ["Python", "Machine Learning", "Statistics", "Data Manipulation", "scikit-learn"],
      level: "Advanced",
      url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/2d7a1c36c792f5ed56094e402144ec75db634915?utm_medium=organic_social&utm_campaign=sharewidget&utm_content=soa&utm_source=copylink"
    },
    {
      title: "Data Analyst with Python",
      issuer: "DataCamp",
      date: "2025",
      description: "Complete data analysis career track covering data manipulation, visualization, and statistical analysis using Python.",
      skills: ["Data Analysis", "pandas", "matplotlib", "seaborn", "Data Visualization", "Statistical Analysis"],
      level: "Advanced",
      url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/60d23c4b115258dd770d8e0ca38bac2cec6b59c0?utm_medium=organic_social&utm_campaign=sharewidget&utm_content=soa&utm_source=copylink"
    },
    {
      title: "Supervised ML Course",
      issuer: "DataCamp",
      date: "2025",
      description: "Comprehensive supervised machine learning course covering advanced algorithms, model training, and evaluation techniques.",
      skills: ["Supervised Learning", "Machine Learning", "Model Training", "Algorithm Optimization", "Model Evaluation"],
      level: "Advanced",
      url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/2d7a1c36c792f5ed56094e402144ec75db634915?utm_medium=organic_social&utm_campaign=sharewidget&utm_content=soa&utm_source=copylink"
    },
    {
      title: "Unsupervised Learning in Python",
      issuer: "DataCamp",
      date: "2025",
      description: "Explore clustering, dimensionality reduction, and pattern discovery techniques for unsupervised machine learning.",
      skills: ["Unsupervised Learning", "Clustering", "PCA", "K-means", "Dimensionality Reduction"],
      level: "Intermediate"
    },
    {
      title: "Machine Learning with Tree-Based Models",
      issuer: "DataCamp",
      date: "2025",
      description: "Learn decision trees, random forests, and gradient boosting methods for powerful predictive modeling.",
      skills: ["Decision Trees", "Random Forest", "Gradient Boosting", "XGBoost", "Ensemble Methods"],
      level: "Advanced"
    },
    {
      title: "Hypothesis Testing in Python",
      issuer: "DataCamp",
      date: "2025",
      description: "Statistical hypothesis testing fundamentals including t-tests, chi-square tests, and ANOVA for data-driven decisions.",
      skills: ["Hypothesis Testing", "Statistical Analysis", "t-tests", "ANOVA", "Statistical Inference"],
      level: "Intermediate"
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
                  <button 
                    className="w-full flex items-center justify-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    onClick={() => cert.url && window.open(cert.url, '_blank')}
                  >
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
            <div className="text-3xl font-bold gradient-text mb-2">1</div>
            <div className="text-sm text-muted-foreground">Platform</div>
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