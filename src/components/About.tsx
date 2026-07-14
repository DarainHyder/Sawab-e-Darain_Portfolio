import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Brain, Code, Database, Sparkles, Quote, FileText, BarChart, PieChart } from "lucide-react";
import SectionParticles from "./SectionParticles";
import { useState } from "react";
import profileImage from "@/assets/sawabedararin.jpg";
import { AnimatedSection } from "./AnimatedSection";

const techCategories = [
  {
    title: "Core & Backend",
    icon: <Code className="w-5 h-5 text-primary" />,
    skills: [
      { name: "Python", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "hover:bg-[#3776AB] hover:border-[#3776AB]", isCore: true },
      { name: "FastAPI", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", color: "hover:bg-[#009688] hover:border-[#009688]", isCore: false },
      { name: "SQL", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "hover:bg-[#00758F] hover:border-[#00758F]", isCore: false },
    ]
  },
  {
    title: "ML/DL Frameworks",
    icon: <Brain className="w-5 h-5 text-primary" />,
    skills: [
      { name: "PyTorch", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", color: "hover:bg-[#EE4C2C] hover:border-[#EE4C2C]", isCore: true },

      { name: "Scikit-learn", logoUrl: "https://cdn.simpleicons.org/scikitlearn/white", color: "hover:bg-[#F7931E] hover:border-[#F7931E]", isCore: false },
      { name: "Hugging Face", logoUrl: "https://cdn.simpleicons.org/huggingface/white", color: "hover:bg-[#FFD21E] hover:border-[#FFD21E]", isCore: false },
      { name: "Computer Vision", logoUrl: "https://cdn.simpleicons.org/opencv/white", color: "hover:bg-[#5C3EE8] hover:border-[#5C3EE8]", isCore: false },
      { name: "NLTK", iconComponent: <FileText className="w-6 h-6 text-white" />, color: "hover:bg-[#154F7D] hover:border-[#154F7D]", isCore: false },
    ]
  },
  {
    title: "Data & Viz",
    icon: <Database className="w-5 h-5 text-primary" />,
    skills: [
      { name: "Pandas", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", color: "hover:bg-[#150458] hover:border-[#150458]", isCore: true },
      { name: "NumPy", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", color: "hover:bg-[#013243] hover:border-[#013243]", isCore: false },
      { name: "Matplotlib", iconComponent: <BarChart className="w-6 h-6 text-white" />, color: "hover:bg-[#11557C] hover:border-[#11557C]", isCore: false },
      { name: "Power BI", logoUrl: "https://cdn.simpleicons.org/powerbi/white", color: "hover:bg-[#F2C811] hover:border-[#F2C811]", isCore: false },
    ]
  },
  {
    title: "MLOps & Infra",
    icon: <Sparkles className="w-5 h-5 text-primary" />,
    skills: [
      { name: "Docker", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "hover:bg-[#2496ED] hover:border-[#2496ED]", isCore: true },
      { name: "AWS", logoUrl: "https://cdn.simpleicons.org/amazonaws/white", color: "hover:bg-[#232F3E] hover:border-[#232F3E]", isCore: false },
      { name: "Git", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "hover:bg-[#F05032] hover:border-[#F05032]", isCore: false },
    ]
  }
];

const About = () => {
  return (
    <>
      <AnimatedSection id="about" variant="wipe-up" className="py-24 px-4 overflow-hidden relative">
        {/* Giant Background Typography */}
        <div className="absolute top-10 right-[-5%] text-[12rem] md:text-[20rem] font-black text-primary/5 select-none -z-10 leading-none tracking-tighter mix-blend-overlay">
          AI/ML
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Asymmetric Grid: Intro & Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-24">
            
            {/* Left Column: Profile Text */}
            <div className="lg:col-span-5">
              <div className="stagger-child inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs text-primary font-medium tracking-wider uppercase">The Journey</span>
              </div>
              
              <h2 className="stagger-child text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight">
                About <br className="hidden lg:block"/><span className="text-primary">Me.</span>
              </h2>
              
              <p className="stagger-child text-xl text-muted-foreground font-light leading-relaxed">
                I'm an AI Engineer and Python developer focused on designing and deploying production ML systems. I specialize in training deep learning models and writing robust backend code to turn complex datasets into practical software applications.
              </p>
            </div>
            
            {/* Right Column: Profile Picture */}
            <div className="lg:col-span-7 w-full flex-shrink-0 stagger-child">
              <div className="relative group">
                {/* Angular masked container */}
                <div 
                  className="relative w-full h-[400px] lg:h-[600px] bg-muted/20 border-r-2 border-b-2 border-primary/20 overflow-hidden transition-transform duration-700 group-hover:-translate-y-2"
                  style={{ clipPath: 'polygon(10% 0, 100% 0%, 90% 100%, 0% 100%)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                  <img
                    src={profileImage}
                    alt="Darain Hyder - AI/ML Engineer"
                    className="absolute inset-0 w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Oversized Statement Quote */}
          <div className="w-full py-16 lg:py-24 my-12 stagger-child">
            <div className="relative max-w-4xl mx-auto">
              <Quote className="absolute -top-12 -left-6 md:-left-12 h-24 w-24 text-primary/10 rotate-180 -z-10" />
              <p className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight border-l-4 border-primary pl-6 md:pl-10 text-foreground">
                "The hardest part of machine learning isn't the math, it's <span className="text-primary">writing the infrastructure</span> to serve those models reliably to real users."
              </p>
            </div>
          </div>

          {/* Staggered Timeline Cards */}
          <div className="relative py-12 lg:py-24 mb-24">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent transform -translate-x-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
              <div className="bg-muted/5 border border-border/50 p-8 lg:p-12 backdrop-blur-sm relative stagger-child lg:-mt-16">
                <div className="hidden lg:block absolute right-0 top-12 w-3 h-3 bg-background border-2 border-primary rounded-full transform translate-x-[calc(50%+3rem)]"></div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-foreground">
                  <Brain className="h-6 w-6 text-primary" />
                  My Philosophy
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  My work as a Machine Learning Engineer is rooted in strong software engineering principles. Instead of just training models in Jupyter notebooks, I use frameworks like PyTorch and TensorFlow to build end-to-end pipelines. A successful model isn't just accurate—it needs to be cleanly integrated, optimized, and maintainable.
                </p>
              </div>

              <div className="bg-muted/5 border border-border/50 p-8 lg:p-12 backdrop-blur-sm relative stagger-child lg:mt-32">
                <div className="hidden lg:block absolute left-0 top-12 w-3 h-3 bg-background border-2 border-primary rounded-full transform -translate-x-[calc(50%+3rem)]"></div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-foreground">
                  <Code className="h-6 w-6 text-accent" />
                  The Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  I want to continue building my data science portfolio by developing AI tools that solve concrete engineering problems. Whether it's setting up computer vision pipelines or deploying NLP models via FastAPI and Docker, my goal is to build intelligent software that actually ships.
                </p>
              </div>
            </div>
          </div>

          {/* Minimalist Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 stagger-child">
            <div className="flex items-center gap-4 p-4 border-l border-primary/20">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">BSCS</p>
                <p className="text-sm text-muted-foreground">Final Year</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border-l border-primary/20">
              <Brain className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">AI & ML</p>
                <p className="text-sm text-muted-foreground">Specialization</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border-l border-primary/20">
              <Database className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">Data</p>
                <p className="text-sm text-muted-foreground">Engineering</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border-l border-primary/20">
              <Code className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">Systems</p>
                <p className="text-sm text-muted-foreground">Architecture</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="skills" variant="fly-in-random" className="py-24 px-4 overflow-hidden relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12 border-b border-border/40 pb-4 stagger-child dir-1">
            <h3 className="text-3xl font-extrabold flex items-center gap-3 tracking-tight">
              Technical Arsenal
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 group/arsenal">
            {techCategories.map((category, catIndex) => (
              <div key={category.title} className="bg-muted/5 border border-border/50 rounded-2xl p-6 flex flex-col backdrop-blur-sm transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  {category.icon}
                  <h4 className="text-lg font-bold text-foreground">{category.title}</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  {category.skills.map((tech, i) => (
                    <div
                      key={tech.name}
                      className={`
                        stagger-child dir-${(i % 4) + 1}
                        flex items-center justify-center p-3 rounded-xl border border-border/60 bg-muted/10 
                        transition-all duration-300 cursor-default
                        ${tech.isCore ? 'col-span-2 gap-3 flex-row' : 'col-span-1 flex-col text-center gap-2'}
                        ${tech.color}
                        group/skill
                        group-hover/arsenal:opacity-40 group-hover/arsenal:scale-[0.98]
                        hover:!opacity-100 hover:!scale-105 hover:z-10 hover:shadow-xl
                      `}
                    >
                      {tech.iconComponent ? (
                        <div className={`flex items-center justify-center transition-all duration-300 filter grayscale brightness-200 group-hover/skill:grayscale-0 group-hover/skill:brightness-100 ${tech.isCore ? 'w-6 h-6' : 'w-8 h-8'}`}>
                          {tech.iconComponent}
                        </div>
                      ) : (
                        <img
                          src={tech.logoUrl}
                          alt={tech.name}
                          className={`
                            filter grayscale brightness-200 transition-all duration-300
                            group-hover/skill:grayscale-0 group-hover/skill:brightness-100
                            ${tech.isCore ? 'w-6 h-6' : 'w-8 h-8'}
                          `}
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.triedFallback) {
                              target.dataset.triedFallback = "true";
                              target.style.display = "none";
                            }
                          }}
                        />
                      )}
                      <span className={`font-medium text-muted-foreground group-hover/skill:text-white transition-colors ${tech.isCore ? 'text-base' : 'text-xs'}`}>
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
};

export default About;
