import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const ReviewCard = ({ review }: { review: any }) => (
  <Card className="w-[300px] md:w-[420px] h-full flex-shrink-0 glow-card border border-border/50 bg-background/95 backdrop-blur-md shadow-xl hover:scale-[1.03] hover:border-primary/50 transition-all duration-300 relative overflow-hidden flex flex-col cursor-pointer">
    <CardContent className="p-6 md:p-8 flex flex-col h-full relative">
      <div className="absolute top-4 right-4 opacity-5 transition-all duration-300 pointer-events-none">
        <Quote className="h-16 w-16" />
      </div>
      
      <div className="flex gap-1 mb-6 relative z-10">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>

      <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 relative z-10">
        "{review.review}"
      </p>

      <div className="mt-auto relative z-10">
        <div className="mb-5">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
            {review.project}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg">
            {review.avatar}
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{review.name}</h4>
            <p className="text-xs text-muted-foreground">{review.role}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Reviews = () => {
  const reviews = [
    {
      name: "Dr. Areeba Nadeem",
      role: "Research Director, BioMed Research Institute",
      project: "BioMed Research Helper",
      rating: 5,
      review: "The BioMed Research Helper genuinely streamlined our entire research workflow. The NLP features work flawlessly, and it actually feels built for real medical teams, not just for show. Really solid, thoughtful work.",
      avatar: "AN"
    },
    {
      name: "Hassan Javed",
      role: "Lead Data Scientist, TechVision Analytics",
      project: "Image Quality Assessment",
      rating: 5,
      review: "The Image Quality Assessment tool turned out way better than we expected. It's fast, precise, and technically sound. You can tell a lot of time went into optimizing it for real-world use. Impressive stuff, seriously.",
      avatar: "HJ"
    },
    {
      name: "Uzair Ahmed",
      role: "Healthcare Analytics Manager",
      project: "Heart Attack Risk Analysis",
      rating: 5,
      review: "The statistical modeling behind the heart attack prediction system was just spot on. Everything from data preprocessing to the final probability outputs showed real understanding of the domain. Reliable work and clean implementation.",
      avatar: "UA"
    },
    {
      name: "Mahnoor Khalid",
      role: "CTO, AI Innovations Lab",
      project: "AI Podcast Generator",
      rating: 5,
      review: "The AI Podcast Generator felt like something straight out of a startup pitch deck in the best way. Smooth voice synthesis, great topic flow, and a really natural delivery. It's rare to see such well-integrated AI systems.",
      avatar: "MK"
    },
    {
      name: "Fatima Zahra",
      role: "NASA Space Apps Challenge Mentor",
      project: "NASA Space App",
      rating: 5,
      review: "The space data visualization project was one of the most creative entries we saw. The way complex data was simplified and presented made it stand out instantly. Smart, visually engaging, and full of genuine curiosity.",
      avatar: "FZ"
    }
  ];

  const singleRowBlock = [...reviews, ...reviews, ...reviews]; 

  return (
    <AnimatedSection id="reviews" variant="horizontal-slide" className="py-24 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden flex flex-col justify-center">
      
      <style>{`
        .carousel-container {
          perspective: 1500px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 400px;
          margin-top: 1rem;
        }

        .carousel-track {
          width: 300px;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotate-carousel 45s infinite linear;
        }

        @media (min-width: 768px) {
          .carousel-track {
            width: 420px;
          }
        }

        .carousel-track:hover {
          animation-play-state: paused;
        }

        .carousel-card-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden; /* Optional, but helps performance */
        }

        @keyframes rotate-carousel {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(-360deg); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .carousel-container {
             height: auto;
             perspective: none;
             flex-direction: column;
          }
          .carousel-track {
             animation: none !important;
             transform: none !important;
             position: static;
             width: 100%;
             display: flex;
             flex-direction: column;
             gap: 2rem;
             align-items: center;
          }
          .carousel-card-wrapper {
             position: static !important;
             transform: none !important;
             height: auto;
          }
        }
      `}</style>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.03]">
        <Quote className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] text-primary" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 px-4 mb-12">
        <div className="text-center stagger-child">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Client <span className="gradient-text">Reviews</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Testimonials from collaborators and industry professionals who have experienced the impact of my AI and software solutions.
          </p>
        </div>
      </div>

      <div className="w-full relative z-10 py-10 overflow-visible slide-from-right" style={{ transitionDelay: '0.3s' }}>
        <div className="carousel-container">
          <div className="carousel-track">
            {reviews.map((review, i) => {
              const rotation = i * (360 / reviews.length);
              // Responsive radius: ~300px on mobile, ~450px on desktop
              const tz = 'clamp(280px, 45vw, 480px)';
              
              return (
                <div 
                  key={i} 
                  className="carousel-card-wrapper"
                  style={{ 
                    transform: `rotateY(${rotation}deg) translateZ(${tz})`
                  }}
                >
                  <ReviewCard review={review} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 px-4 mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
          <div className="stagger-child" style={{ transitionDelay: '0.4s' }}>
            <div className="text-4xl md:text-5xl font-black gradient-text mb-2">100%</div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">Client Satisfaction</div>
          </div>
          <div className="stagger-child" style={{ transitionDelay: '0.5s' }}>
            <div className="text-4xl md:text-5xl font-black gradient-text mb-2">8+</div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">Projects Completed</div>
          </div>
          <div className="stagger-child" style={{ transitionDelay: '0.6s' }}>
            <div className="text-4xl md:text-5xl font-black gradient-text mb-2">5<span className="text-3xl text-primary align-top">★</span></div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">Average Rating</div>
          </div>
          <div className="stagger-child" style={{ transitionDelay: '0.7s' }}>
            <div className="text-4xl md:text-5xl font-black gradient-text mb-2">3+</div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">Industries Served</div>
          </div>
        </div>
      </div>

    </AnimatedSection>
  );
};

export default Reviews;
