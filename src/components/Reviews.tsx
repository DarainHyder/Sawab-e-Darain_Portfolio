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
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-left {
          animation: marquee-left 50s linear infinite;
        }
        .marquee-mask {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left {
             animation: none !important;
             transform: none !important;
             width: 100% !important;
             flex-wrap: wrap !important;
             justify-content: center !important;
             gap: 1.5rem !important;
          }
          .hide-on-reduce {
             display: none !important;
          }
          .marquee-mask {
             mask-image: none !important;
             -webkit-mask-image: none !important;
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

      <div className="w-full relative z-10 py-4 marquee-mask overflow-hidden slide-from-right" style={{ transitionDelay: '0.3s' }}>
        <div className="flex w-full group/row">
          <div className="flex w-max animate-marquee-left group-hover/row:[animation-play-state:paused]">
            <div className="flex gap-6 pr-6">
              {singleRowBlock.map((review, i) => (
                <ReviewCard key={`b1-${i}`} review={review} />
              ))}
            </div>
            <div className="flex gap-6 pr-6 hide-on-reduce">
              {singleRowBlock.map((review, i) => (
                <ReviewCard key={`b2-${i}`} review={review} />
              ))}
            </div>
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
