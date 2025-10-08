import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Brain, Code, Database } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SectionParticles from "./SectionParticles";

const About = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section id="about" ref={ref} className="py-20 px-4 relative overflow-hidden">
      <SectionParticles variant="neural" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate Computer Science student on a journey to master the art and science of data, 
            transforming complex information into actionable insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div className={`space-y-6 scroll-reveal-left ${isVisible ? 'visible' : ''}`}>
            <h3 className="text-3xl font-bold">My Journey</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently pursuing my Bachelor's in Computer Science (BSCS), I'm entering my 5th semester 
              in September 2025. My academic journey has been driven by a deep fascination with data science 
              and its potential to solve real-world problems.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Through countless hours of coding, learning, and building projects, I've developed a strong 
              foundation in programming, mathematics, and statistical analysis. My goal is to become a 
              skilled data scientist who can bridge the gap between raw data and meaningful business insights.
            </p>
          </div>

          <div className={`grid grid-cols-2 gap-4 scroll-reveal-right ${isVisible ? 'visible' : ''}`}>
            <Card className="glow-card interactive-hover animate-bounce-in stagger-1">
              <CardContent className="p-6 text-center">
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Education</h4>
                <p className="text-sm text-muted-foreground">BSCS Student</p>
                <p className="text-sm text-muted-foreground">5th Semester</p>
              </CardContent>
            </Card>

            <Card className="glow-card interactive-hover animate-bounce-in stagger-2">
              <CardContent className="p-6 text-center">
                <Brain className="h-12 w-12 text-accent mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Passion</h4>
                <p className="text-sm text-muted-foreground">Data Science</p>
                <p className="text-sm text-muted-foreground">& Analytics</p>
              </CardContent>
            </Card>

            <Card className="glow-card interactive-hover animate-bounce-in stagger-3">
              <CardContent className="p-6 text-center">
                <Code className="h-12 w-12 text-data-teal mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Projects</h4>
                <p className="text-sm text-muted-foreground">Multiple</p>
                <p className="text-sm text-muted-foreground">Built</p>
              </CardContent>
            </Card>

            <Card className="glow-card interactive-hover animate-bounce-in stagger-4">
              <CardContent className="p-6 text-center">
                <Database className="h-12 w-12 text-data-cyan mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Skills</h4>
                <p className="text-sm text-muted-foreground">Certified</p>
                <p className="text-sm text-muted-foreground">& Growing</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-8">Core <span className="gradient-text">Competencies</span></h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Python", level: 85 },
              { name: "Machine Learning", level: 75 },
              { name: "Data Analysis", level: 80 },
              { name: "NLP", level: 70 },
              { name: "Computer Vision", level: 65 },
              { name: "SQL", level: 70 }
            ].map((skill, index) => (
              <div key={skill.name} className="text-center">
                <div className="mb-4">
                  <div className="relative w-20 h-20 mx-auto">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        className="text-muted/30"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 30}`}
                        strokeDashoffset={`${2 * Math.PI * 30 * (1 - skill.level / 100)}`}
                        className="text-primary transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-semibold">{skill.level}%</span>
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold">{skill.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;