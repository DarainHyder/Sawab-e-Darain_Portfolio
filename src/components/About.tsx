import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Brain, Code, Database, Sparkles, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SectionParticles from "./SectionParticles";
import { useState } from "react";
import profileImage from "@/assets/darain-profile.jpg";

const About = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  return (
    <section id="about" ref={ref} className="py-20 px-4 relative overflow-hidden">
      <SectionParticles variant="neural" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with Quote */}
        <div className={`text-center mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">The Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="relative max-w-3xl mx-auto">
            <Quote className="absolute -top-4 -left-4 h-8 w-8 text-primary/20" />
            <p className="text-xl text-muted-foreground italic">
              Transforming raw data into <span className="gradient-text font-semibold">digital symphonies</span> — 
              where numbers whisper stories and algorithms paint futures.
            </p>
            <Quote className="absolute -bottom-4 -right-4 h-8 w-8 text-primary/20 rotate-180" />
          </div>
        </div>

        {/* Main Content Grid - Philosophy and Profile Picture */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-stretch">
          {/* Philosophy Card */}
          <div className={`scroll-reveal-left ${isVisible ? 'visible' : ''}`}>
            <div className="relative group h-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="glow-card relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                <CardContent className="p-8 relative">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Brain className="h-6 w-6 text-primary" />
                    My <span className="gradient-text">Philosophy</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    BSCS student entering 5th semester, fueled by an <span className="text-primary font-medium">insatiable curiosity</span> for 
                    data science. Every dataset is a puzzle, every model a masterpiece waiting to emerge.
                  </p>
                  <div className="pl-4 border-l-2 border-primary/50">
                    <p className="text-sm italic text-muted-foreground">
                      "In the intersection of mathematics and creativity, I found my calling — 
                      crafting intelligent systems that don't just compute, but <span className="text-primary">comprehend</span>."
                    </p>
                  </div>

                  {/* Vision Section */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      The <span className="gradient-text">Vision</span>
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      To architect AI solutions that transcend code — bridging human intuition with machine precision, 
                      each project is a step toward <span className="text-accent font-medium">data-driven enlightenment</span>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Profile Picture Card */}
          <div className={`scroll-reveal-right ${isVisible ? 'visible' : ''}`}>
            <Card className="glow-card group hover:scale-[1.02] transition-all duration-500 overflow-hidden h-full">
              <CardContent className="p-8 flex flex-col items-center justify-center h-full relative">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Profile Image */}
                <div className="relative z-10">
                  <div className="relative w-64 h-64 mx-auto">
                    {/* Animated border rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-ping" style={{ animationDuration: '3s' }}></div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                    
                    {/* Image container */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/50 group-hover:border-primary transition-all duration-300 shadow-2xl shadow-primary/20">
                      <img 
                        src={profileImage} 
                        alt="Darain Hyder - Data Scientist" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Sparkle effects */}
                    <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-primary animate-pulse" />
                    <Sparkles className="absolute -bottom-2 -left-2 h-6 w-6 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <Card className="glow-card interactive-hover animate-bounce-in stagger-1 group">
            <CardContent className="p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold mb-2">Education</h4>
              <p className="text-sm text-muted-foreground">BSCS</p>
              <p className="text-sm text-primary font-medium">5th Sem</p>
            </CardContent>
          </Card>

          <Card className="glow-card interactive-hover animate-bounce-in stagger-2 group">
            <CardContent className="p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Brain className="h-12 w-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold mb-2">Passion</h4>
              <p className="text-sm text-muted-foreground">Data Science</p>
              <p className="text-sm text-accent font-medium">AI & ML</p>
            </CardContent>
          </Card>

          <Card className="glow-card interactive-hover animate-bounce-in stagger-3 group">
            <CardContent className="p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Code className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold mb-2">Projects</h4>
              <p className="text-sm text-muted-foreground">Multiple</p>
              <p className="text-sm text-primary font-medium">Delivered</p>
            </CardContent>
          </Card>

          <Card className="glow-card interactive-hover animate-bounce-in stagger-4 group">
            <CardContent className="p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Database className="h-12 w-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold mb-2">Growth</h4>
              <p className="text-sm text-muted-foreground">Continuous</p>
              <p className="text-sm text-accent font-medium">Learning</p>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack */}
        <div className={`scroll-reveal ${isVisible ? 'visible' : ''} stagger-4`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Tech <span className="gradient-text">Stack</span>
            </h3>
            <p className="text-sm text-muted-foreground italic">
              "Tools that transform imagination into innovation"
            </p>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {[
              { name: "Python", icon: "🐍" },
              { name: "NumPy", icon: "🔢" },
              { name: "Pandas", icon: "🐼" },
              { name: "Scikit-learn", icon: "🤖" },
              { name: "TensorFlow", icon: "🧠" },
              { name: "PyTorch", icon: "🔥" },
              { name: "NLP", icon: "💬" },
              { name: "Computer Vision", icon: "👁️" },
              { name: "Kaggle", icon: "🏆" },
              { name: "Matplotlib", icon: "📊" },
              { name: "Seaborn", icon: "🎨" },
              { name: "Power BI", icon: "📈" },
              { name: "HTML", icon: "🌐" },
              { name: "CSS", icon: "🎨" },
              { name: "JavaScript", icon: "⚡" },
              { name: "React", icon: "⚛️" },
              { name: "SQL", icon: "🗄️" },
              { name: "FastAPI", icon: "⚡" },
              { name: "Flask", icon: "🌶️" },
              { name: "Docker", icon: "🐳" },
              { name: "Git", icon: "📝" },
              { name: "GitHub", icon: "🐙" },
              { name: "Postman", icon: "📮" },
              { name: "AWS", icon: "☁️" },
              { name: "Heroku", icon: "💜" },
              { name: "Netlify", icon: "🌊" },
              { name: "Streamlit", icon: "🎈" },
              { name: "Figma", icon: "🎯" },
              { name: "Canva", icon: "🎨" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="group relative"
                onMouseEnter={() => setHoveredSkill(tech.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-2 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur opacity-0 group-hover:opacity-75 transition-all duration-500 ${hoveredSkill === tech.name ? 'opacity-75' : ''}`}></div>
                
                <Card className={`relative glow-card group-hover:scale-110 transition-all duration-300 cursor-pointer ${hoveredSkill === tech.name ? 'border-primary/50' : ''}`}>
                  <CardContent className="p-3 flex flex-col items-center justify-center gap-1.5 h-20">
                    <div className="text-3xl group-hover:scale-125 transition-transform duration-300">
                      {tech.icon}
                    </div>
                    <p className="text-[10px] font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                      {tech.name}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
