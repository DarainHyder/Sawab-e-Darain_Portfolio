const DataScienceBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Neural Network Nodes */}
      <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-primary/30 animate-pulse"></div>
      <div className="absolute top-20 left-32 w-2 h-2 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="absolute top-40 left-20 w-2 h-2 rounded-full bg-data-teal/30 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      <div className="absolute top-60 left-40 w-2 h-2 rounded-full bg-data-cyan/30 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
      
      <div className="absolute bottom-20 right-20 w-2 h-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
      <div className="absolute bottom-40 right-40 w-2 h-2 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-10 right-60 w-2 h-2 rounded-full bg-data-teal/30 animate-pulse" style={{ animationDelay: '1.2s' }}></div>
      
      <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-data-cyan/30 animate-pulse" style={{ animationDelay: '1.4s' }}></div>
      <div className="absolute top-2/3 left-1/3 w-2 h-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '1.6s' }}></div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <line x1="10%" y1="10%" x2="20%" y2="15%" stroke="currentColor" strokeWidth="1" className="text-primary animate-pulse" />
        <line x1="20%" y1="15%" x2="15%" y2="30%" stroke="currentColor" strokeWidth="1" className="text-accent animate-pulse" style={{ animationDelay: '0.2s' }} />
        <line x1="15%" y1="30%" x2="25%" y2="45%" stroke="currentColor" strokeWidth="1" className="text-data-teal animate-pulse" style={{ animationDelay: '0.4s' }} />
        
        <line x1="80%" y1="80%" x2="70%" y2="75%" stroke="currentColor" strokeWidth="1" className="text-primary animate-pulse" style={{ animationDelay: '0.6s' }} />
        <line x1="70%" y1="75%" x2="75%" y2="60%" stroke="currentColor" strokeWidth="1" className="text-accent animate-pulse" style={{ animationDelay: '0.8s' }} />
        
        <line x1="75%" y1="33%" x2="66%" y2="66%" stroke="currentColor" strokeWidth="1" className="text-data-cyan animate-pulse" style={{ animationDelay: '1s' }} />
      </svg>

      {/* Floating Data Particles */}
      <div className="absolute top-1/4 left-1/2 w-1 h-1 rounded-full bg-primary/40 animate-float"></div>
      <div className="absolute top-3/4 left-1/4 w-1 h-1 rounded-full bg-accent/40 animate-float" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-1 h-1 rounded-full bg-data-teal/40 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full bg-data-cyan/40 animate-float" style={{ animationDelay: '1.5s' }}></div>

      {/* Binary Code Rain Effect */}
      <div className="absolute top-0 left-1/4 text-primary/5 font-mono text-xs animate-slide-down" style={{ animationDelay: '0s' }}>
        01010101
      </div>
      <div className="absolute top-0 left-1/2 text-accent/5 font-mono text-xs animate-slide-down" style={{ animationDelay: '0.3s' }}>
        11001100
      </div>
      <div className="absolute top-0 right-1/4 text-data-teal/5 font-mono text-xs animate-slide-down" style={{ animationDelay: '0.6s' }}>
        10101010
      </div>
    </div>
  );
};

export default DataScienceBackground;
