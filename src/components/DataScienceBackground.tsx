const DataScienceBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large Neural Network Nodes */}
      <div className="absolute top-20 left-20 w-4 h-4 rounded-full bg-primary/50 animate-pulse shadow-[0_0_20px_rgba(255,69,58,0.5)]"></div>
      <div className="absolute top-32 left-48 w-3 h-3 rounded-full bg-accent/50 animate-pulse shadow-[0_0_15px_rgba(255,45,85,0.4)]" style={{ animationDelay: '0.3s' }}></div>
      <div className="absolute top-60 left-32 w-4 h-4 rounded-full bg-primary/50 animate-pulse shadow-[0_0_20px_rgba(255,69,58,0.5)]" style={{ animationDelay: '0.6s' }}></div>
      <div className="absolute top-80 left-64 w-3 h-3 rounded-full bg-accent/50 animate-pulse shadow-[0_0_15px_rgba(255,45,85,0.4)]" style={{ animationDelay: '0.9s' }}></div>
      
      <div className="absolute bottom-32 right-32 w-4 h-4 rounded-full bg-primary/50 animate-pulse shadow-[0_0_20px_rgba(255,69,58,0.5)]" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute bottom-48 right-48 w-3 h-3 rounded-full bg-accent/50 animate-pulse shadow-[0_0_15px_rgba(255,45,85,0.4)]" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-20 right-64 w-4 h-4 rounded-full bg-primary/50 animate-pulse shadow-[0_0_20px_rgba(255,69,58,0.5)]" style={{ animationDelay: '1.8s' }}></div>
      
      <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-accent/50 animate-pulse shadow-[0_0_15px_rgba(255,45,85,0.4)]" style={{ animationDelay: '2.1s' }}></div>
      <div className="absolute top-2/3 left-1/3 w-4 h-4 rounded-full bg-primary/50 animate-pulse shadow-[0_0_20px_rgba(255,69,58,0.5)]" style={{ animationDelay: '2.4s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-accent/50 animate-pulse shadow-[0_0_15px_rgba(255,45,85,0.4)]" style={{ animationDelay: '2.7s' }}></div>

      {/* Animated Connection Lines - More Visible */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <line x1="10%" y1="12%" x2="20%" y2="18%" stroke="url(#gradient1)" strokeWidth="2" className="animate-pulse" />
        <line x1="20%" y1="18%" x2="15%" y2="35%" stroke="url(#gradient1)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
        <line x1="15%" y1="35%" x2="25%" y2="50%" stroke="url(#gradient2)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
        
        <line x1="80%" y1="75%" x2="70%" y2="70%" stroke="url(#gradient2)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
        <line x1="70%" y1="70%" x2="75%" y2="55%" stroke="url(#gradient1)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
        
        <line x1="75%" y1="33%" x2="66%" y2="66%" stroke="url(#gradient2)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
        <line x1="25%" y1="50%" x2="50%" y2="50%" stroke="url(#gradient1)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1.8s' }} />
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(0, 84%, 60%)" />
            <stop offset="100%" stopColor="hsl(348, 91%, 40%)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(348, 91%, 40%)" />
            <stop offset="100%" stopColor="hsl(0, 84%, 60%)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Data Particles - More Visible */}
      <div className="absolute top-1/4 left-1/2 w-2 h-2 rounded-full bg-primary/60 animate-float shadow-[0_0_10px_rgba(255,69,58,0.6)]"></div>
      <div className="absolute top-3/4 left-1/4 w-2 h-2 rounded-full bg-accent/60 animate-float shadow-[0_0_10px_rgba(255,45,85,0.6)]" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-primary/60 animate-float shadow-[0_0_10px_rgba(255,69,58,0.6)]" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-accent/60 animate-float shadow-[0_0_10px_rgba(255,45,85,0.6)]" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/3 left-2/3 w-2 h-2 rounded-full bg-primary/60 animate-float shadow-[0_0_10px_rgba(255,69,58,0.6)]" style={{ animationDelay: '2s' }}></div>

      {/* Binary Code Rain Effect - More Visible */}
      <div className="absolute top-0 left-1/4 text-primary/20 font-mono text-sm animate-slide-down font-bold" style={{ animationDelay: '0s' }}>
        01010101
      </div>
      <div className="absolute top-0 left-1/2 text-accent/20 font-mono text-sm animate-slide-down font-bold" style={{ animationDelay: '0.3s' }}>
        11001100
      </div>
      <div className="absolute top-0 right-1/4 text-primary/20 font-mono text-sm animate-slide-down font-bold" style={{ animationDelay: '0.6s' }}>
        10101010
      </div>
      <div className="absolute top-0 left-1/3 text-accent/15 font-mono text-xs animate-slide-down" style={{ animationDelay: '0.9s' }}>
        11110000
      </div>
      <div className="absolute top-0 right-1/3 text-primary/15 font-mono text-xs animate-slide-down" style={{ animationDelay: '1.2s' }}>
        00001111
      </div>

      {/* ML-themed floating text */}
      <div className="absolute top-1/4 right-1/4 text-primary/10 font-mono text-xs animate-float" style={{ animationDelay: '0s' }}>
        ML
      </div>
      <div className="absolute bottom-1/3 left-1/3 text-accent/10 font-mono text-xs animate-float" style={{ animationDelay: '1s' }}>
        AI
      </div>
      <div className="absolute top-2/3 right-1/3 text-primary/10 font-mono text-xs animate-float" style={{ animationDelay: '2s' }}>
        NN
      </div>
    </div>
  );
};

export default DataScienceBackground;
