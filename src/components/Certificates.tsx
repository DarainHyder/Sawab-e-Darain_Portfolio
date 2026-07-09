import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner": return "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]";
    case "Intermediate": return "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]";
    case "Advanced": return "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]";
    default: return "bg-gray-500";
  }
};

const getLevelTextColor = (level: string) => {
  switch (level) {
    case "Beginner": return "text-green-500";
    case "Intermediate": return "text-yellow-500";
    case "Advanced": return "text-red-500";
    default: return "text-gray-500";
  }
};

const CertCard = ({ cert }: { cert: any }) => (
  <Card className="relative glow-card w-full h-full border border-border/50 bg-background/95 backdrop-blur-md shadow-xl transition-all duration-500 group-hover:border-primary/50 overflow-hidden">
    <div className="absolute -top-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rotate-12">
      <Award className="w-40 h-40 text-primary" />
    </div>

    <CardHeader className="relative z-10 pb-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${getLevelColor(cert.level)} animate-pulse`} />
          <span className={`text-xs font-bold uppercase tracking-wider ${getLevelTextColor(cert.level)}`}>{cert.level}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
          <Calendar className="h-3 w-3" />
          {cert.date}
        </div>
      </div>
      <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors pr-8">{cert.title}</CardTitle>
      <CardDescription className="font-semibold text-accent mt-1">
        {cert.issuer}
      </CardDescription>
    </CardHeader>

    <CardContent className="relative z-10 pt-4 flex flex-col h-[calc(100%-8rem)]">
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        {cert.description}
      </p>
      
      <div className="space-y-3 mb-6 flex-1">
        <p className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">Skills Gained</p>
        <div className="flex flex-wrap gap-2">
          {cert.skills.map((skill: string) => (
            <span key={skill} className="px-2 py-1 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded border border-border/50">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <a 
        href={cert.url || "#"} 
        target="_blank" 
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors w-full justify-center py-2.5 bg-primary/10 rounded-md hover:bg-primary/20 mt-auto"
      >
        <ExternalLink className="h-4 w-4" />
        View Credential
      </a>
    </CardContent>
  </Card>
);

const Certificates = () => {
  const certificates = [
    {
      title: "Associate Data Scientist in Python",
      issuer: "DataCamp",
      date: "2025",
      description: "Comprehensive career track covering Python for data science, machine learning, and statistical analysis with real-world projects.",
      skills: ["Python", "Machine Learning", "Statistics", "Data Manipulation", "scikit-learn"],
      level: "Advanced",
      url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/2d7a1c36c792f5ed56094e402144ec75db634915"
    },
    {
      title: "Data Analyst with Python",
      issuer: "DataCamp",
      date: "2025",
      description: "Complete data analysis career track covering data manipulation, visualization, and statistical analysis using Python.",
      skills: ["Data Analysis", "pandas", "matplotlib", "seaborn", "Data Visualization", "Statistical Analysis"],
      level: "Advanced",
      url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/60d23c4b115258dd770d8e0ca38bac2cec6b59c0"
    },
    {
      title: "Supervised ML Course",
      issuer: "DataCamp",
      date: "2025",
      description: "Comprehensive supervised machine learning course covering advanced algorithms, model training, and evaluation techniques.",
      skills: ["Supervised Learning", "Machine Learning", "Model Training", "Algorithm Optimization", "Model Evaluation"],
      level: "Advanced",
      url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/2d7a1c36c792f5ed56094e402144ec75db634915"
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

  return (
    <AnimatedSection id="certificates" variant="flip-3d" className="py-24 px-4 relative overflow-hidden bg-muted/5">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight stagger-child" style={{ transitionDelay: '0.1s' }}>
            Certificates & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light stagger-child" style={{ transitionDelay: '0.2s' }}>
            My continuous learning journey through certified courses and professional development programs.
          </p>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden relative py-8 px-2">
          <div className="absolute top-8 bottom-8 left-6 w-px bg-border/80 z-0 timeline-line" />
          <div className="flex flex-col gap-12 relative z-10">
            {certificates.map((cert, index) => (
              <div key={index} className="relative pl-14 group stagger-child" style={{ transitionDelay: `${0.2 + (index * 0.1)}s` }}>
                <div className="absolute top-8 left-6 w-4 h-4 rounded-full bg-background border-[3px] border-primary -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_10px_rgba(255,69,58,0.5)] transition-all duration-300 group-hover:scale-150 group-hover:bg-primary" />
                <div className="absolute top-8 left-6 w-8 h-px bg-border group-hover:bg-primary/50 transition-colors duration-300 -translate-y-1/2 z-10" />
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <CertCard cert={cert} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Horizontal Roadmap */}
        <div className="hidden md:flex flex-col relative w-full mt-12 mb-16">
          <div className="text-center text-sm text-muted-foreground font-medium mb-4 animate-pulse tracking-wide uppercase stagger-child" style={{ transitionDelay: '0.3s' }}>
            Shift + Scroll to explore the journey ⭢
          </div>
          
          <div className="relative w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory pt-12 pb-16 px-[10vw]">
            <div className="absolute top-1/2 left-0 w-[4000px] h-[2px] bg-border/50 -translate-y-1/2 z-0 timeline-line" />
            
            <div 
              className="grid w-max relative z-10" 
              style={{ 
                gridTemplateRows: '1fr 1fr',
                gridTemplateColumns: `repeat(${certificates.length}, 220px)` 
              }}
            >
              {certificates.map((cert, index) => {
                const isTop = index % 2 === 0;
                return (
                  <div 
                    key={index} 
                    className="relative w-[360px] snap-center group flex flex-col stagger-child"
                    style={{ 
                      gridColumn: index + 1, 
                      gridRow: isTop ? 1 : 2,
                      justifyContent: isTop ? 'flex-end' : 'flex-start',
                      paddingBottom: isTop ? '50px' : '0',
                      paddingTop: isTop ? '0' : '50px',
                      transitionDelay: `${0.3 + (index * 0.1)}s`
                    }}
                  >
                    <div className={`absolute left-[180px] w-5 h-5 rounded-full bg-background border-[3px] border-primary -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(255,69,58,0.5)] transition-all duration-300 group-hover:scale-150 group-hover:bg-primary group-hover:shadow-[0_0_30px_rgba(255,69,58,1)] ${isTop ? 'bottom-0 translate-y-1/2' : 'top-0 -translate-y-1/2'}`} />
                    <div className={`absolute left-[180px] w-px bg-border group-hover:bg-primary/60 transition-colors duration-300 -translate-x-1/2 ${isTop ? 'bottom-0 h-[50px]' : 'top-0 h-[50px]'}`} />
                    <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2 w-full h-full">
                      <CertCard cert={cert} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 border-t border-border/50 pt-12">
          <div className="text-center stagger-child" style={{ transitionDelay: '0.6s' }}>
            <div className="text-3xl md:text-4xl font-black gradient-text mb-2">{certificates.length}</div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">Certificates Earned</div>
          </div>
          <div className="text-center stagger-child" style={{ transitionDelay: '0.7s' }}>
            <div className="text-3xl md:text-4xl font-black gradient-text mb-2">1</div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">Platform</div>
          </div>
          <div className="text-center stagger-child" style={{ transitionDelay: '0.8s' }}>
            <div className="text-3xl md:text-4xl font-black gradient-text mb-2">20+</div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">Skills Acquired</div>
          </div>
          <div className="text-center stagger-child" style={{ transitionDelay: '0.9s' }}>
            <div className="text-3xl md:text-4xl font-black gradient-text mb-2">100+</div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">Study Hours</div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Certificates;