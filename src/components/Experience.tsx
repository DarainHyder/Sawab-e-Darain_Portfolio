import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import SectionParticles from "./SectionParticles";

const experiences = [
  {
    role: "AI Engineer Intern",
    company: "Data Pilot",
    location: "Islamabad / Remote",
    period: "7 April 2026 - Present",
    duration: "Ongoing",
    description: "Building scalable AI/ML data pipelines for social media management dashboards. Implementing ETL/ELT workflows and managing data quality assurance and schema validation for production-ready components.",
    current: true,
  },
  {
    role: "ML Trainee (Contract)",
    company: "Syvyo",
    location: "Remote",
    period: "Sep 2025 - Feb 2026",
    duration: "6 months",
    description: "Selected for contract-based position following successful internship. Implemented machine learning solutions and contributed to production-grade AI models.",
    current: false,
  },
  {
    role: "ML/AI Intern",
    company: "Syvyo",
    location: "Remote",
    period: "Jun 2025 - Sep 2025",
    duration: "4 months",
    description: "Developed computer vision models and predictive ML pipelines using PyTorch. Integrated models into FastAPI REST APIs and optimized performance through feature engineering and hyperparameter tuning.",
    current: false,
  },
  {
    role: "Data Science Fellow",
    company: "Buildables",
    location: "Remote",
    period: "Sep 2025 - Nov 2025",
    duration: "3 months",
    description: "Participated in intensive fellowship program focusing on end-to-end data science workflows, model development, and deployment strategies.",
    current: false,
  },
];

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-20 px-4 overflow-hidden"
    >
      <SectionParticles variant="neural" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-muted-foreground text-lg">
            My journey in data science and machine learning
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-glow to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 delay-${index * 200} ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : `opacity-0 ${index % 2 === 0 ? "-translate-x-10" : "translate-x-10"}`
                }`}
              >
                <div className={`md:grid md:grid-cols-2 md:gap-8 ${index % 2 === 0 ? "" : "md:grid-flow-dense"}`}>
                  <div className={`${index % 2 === 0 ? "" : "md:col-start-2"}`}>
                    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                      {exp.current && (
                        <div className="inline-block px-3 py-1 mb-3 text-xs font-medium bg-primary/20 text-primary rounded-full">
                          Current Position
                        </div>
                      )}
                      
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {exp.role}
                          </h3>
                          <p className="text-lg font-semibold text-primary">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-accent/20 text-accent rounded">
                          {exp.duration}
                        </span>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
