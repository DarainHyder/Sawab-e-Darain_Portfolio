interface SectionParticlesProps {
  variant?: 'neural' | 'data-flow' | 'matrix' | 'network';
}

const SectionParticles = ({ variant = 'neural' }: SectionParticlesProps) => {
  if (variant === 'neural') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Neural network connections */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(0, 84%, 60%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(348, 91%, 40%)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="url(#neuralGradient)" strokeWidth="1" className="animate-pulse-slow" />
          <line x1="30%" y1="40%" x2="50%" y2="30%" stroke="url(#neuralGradient)" strokeWidth="1" className="animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
          <line x1="50%" y1="30%" x2="70%" y2="50%" stroke="url(#neuralGradient)" strokeWidth="1" className="animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <line x1="70%" y1="50%" x2="90%" y2="35%" stroke="url(#neuralGradient)" strokeWidth="1" className="animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        </svg>
        {/* Nodes */}
        <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-primary/50 animate-pulse-slow shadow-[0_0_10px_rgba(255,69,58,0.5)]"></div>
        <div className="absolute top-[40%] left-[30%] w-2 h-2 rounded-full bg-accent/50 animate-pulse-slow shadow-[0_0_10px_rgba(255,45,85,0.5)]" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-[30%] left-[50%] w-2 h-2 rounded-full bg-primary/50 animate-pulse-slow shadow-[0_0_10px_rgba(255,69,58,0.5)]" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[50%] left-[70%] w-2 h-2 rounded-full bg-accent/50 animate-pulse-slow shadow-[0_0_10px_rgba(255,45,85,0.5)]" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[35%] left-[90%] w-2 h-2 rounded-full bg-primary/50 animate-pulse-slow shadow-[0_0_10px_rgba(255,69,58,0.5)]" style={{ animationDelay: '2s' }}></div>
      </div>
    );
  }

  if (variant === 'data-flow') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {/* Flowing data streams */}
        <div className="absolute top-1/4 left-0 w-1 h-20 bg-gradient-to-b from-transparent via-primary to-transparent animate-flow-right"></div>
        <div className="absolute top-1/2 left-0 w-1 h-16 bg-gradient-to-b from-transparent via-accent to-transparent animate-flow-right" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-0 w-1 h-24 bg-gradient-to-b from-transparent via-primary to-transparent animate-flow-right" style={{ animationDelay: '2s' }}></div>
        
        {/* Binary sequences */}
        <div className="absolute top-[15%] right-[10%] text-primary/30 font-mono text-xs animate-fade-pulse">101010</div>
        <div className="absolute top-[45%] right-[20%] text-accent/30 font-mono text-xs animate-fade-pulse" style={{ animationDelay: '0.5s' }}>110011</div>
        <div className="absolute top-[75%] right-[15%] text-primary/30 font-mono text-xs animate-fade-pulse" style={{ animationDelay: '1s' }}>010101</div>
      </div>
    );
  }

  if (variant === 'matrix') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
        {/* Matrix-style cascading code */}
        <div className="absolute top-0 left-[15%] flex flex-col gap-2 text-primary/40 font-mono text-xs animate-matrix-fall">
          <span>ML</span>
          <span>AI</span>
          <span>NN</span>
        </div>
        <div className="absolute top-0 left-[45%] flex flex-col gap-2 text-accent/40 font-mono text-xs animate-matrix-fall" style={{ animationDelay: '0.8s' }}>
          <span>DS</span>
          <span>DL</span>
          <span>CV</span>
        </div>
        <div className="absolute top-0 left-[75%] flex flex-col gap-2 text-primary/40 font-mono text-xs animate-matrix-fall" style={{ animationDelay: '1.6s' }}>
          <span>NLP</span>
          <span>RF</span>
          <span>SVM</span>
        </div>
      </div>
    );
  }

  if (variant === 'network') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        {/* Network mesh */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="nodeGlow">
              <stop offset="0%" stopColor="hsl(0, 84%, 60%)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(348, 91%, 40%)" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Mesh connections */}
          <path d="M 100 100 Q 250 150, 400 100" stroke="url(#neuralGradient)" strokeWidth="1" fill="none" className="animate-draw-path" />
          <path d="M 400 100 Q 550 50, 700 100" stroke="url(#neuralGradient)" strokeWidth="1" fill="none" className="animate-draw-path" style={{ animationDelay: '0.5s' }} />
          
          <circle cx="100" cy="100" r="4" fill="url(#nodeGlow)" className="animate-pulse-slow" />
          <circle cx="400" cy="100" r="4" fill="url(#nodeGlow)" className="animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
          <circle cx="700" cy="100" r="4" fill="url(#nodeGlow)" className="animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </svg>
      </div>
    );
  }

  return null;
};

export default SectionParticles;