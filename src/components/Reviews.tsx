import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, User } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SectionParticles from "./SectionParticles";

const Reviews = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const reviews = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Research Director, BioMed Research Institute",
      project: "BioMed Research Helper",
      rating: 5,
      review: "The BioMed Research Helper has revolutionized our literature analysis workflow. Darain's implementation of NLP techniques is exceptional. Looking forward to collaborating on more medical AI projects!",
      avatar: "SM"
    },
    {
      name: "James Chen",
      role: "Lead Data Scientist, TechVision Analytics",
      project: "Image Quality Assessment",
      rating: 5,
      review: "Outstanding work on the Image Quality Assessment system! The computer vision implementation is highly accurate and efficient. We're impressed with the technical depth and would love to discuss future opportunities.",
      avatar: "JC"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Healthcare Analytics Manager",
      project: "Heart Attack Risk Analysis",
      rating: 5,
      review: "Brilliant statistical analysis and model training! The heart attack risk prediction model demonstrates strong understanding of probability concepts. Interested in collaborating on more healthcare prediction projects.",
      avatar: "ER"
    },
    {
      name: "Michael Thompson",
      role: "CTO, AI Innovations Lab",
      project: "AI Podcast Generator",
      rating: 5,
      review: "The AI Podcast Generator is a game-changer! Seamless integration of LLM and TTS technologies. Darain's ability to combine multiple AI services is remarkable. We're exploring partnership opportunities.",
      avatar: "MT"
    },
    {
      name: "Prof. David Kumar",
      role: "NASA Space Apps Challenge Mentor",
      project: "NASA Space App",
      rating: 5,
      review: "Innovative approach to space data visualization! The NASA Space App project showed excellent problem-solving skills and creativity. Would definitely recommend for any data science challenges.",
      avatar: "DK"
    }
  ];

  return (
    <section id="reviews" ref={ref} className="py-20 px-4 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      <SectionParticles variant="neural" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Client <span className="gradient-text">Reviews</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Testimonials from collaborators and industry professionals who have worked with my projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card 
              key={review.name} 
              className={`glow-card group card-reveal ${isVisible ? 'visible' : ''} stagger-${(index % 6) + 1} hover:scale-105 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,69,58,0.4)] relative overflow-hidden`}
            >
              {/* Decorative Quote */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="h-16 w-16 text-primary" />
              </div>
              
              <CardContent className="p-6 relative">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-4 w-4 fill-primary text-primary" 
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-6">
                  "{review.review}"
                </p>

                {/* Project Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                    {review.project}
                  </span>
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(255,69,58,0.3)]">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{review.name}</h4>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className={`scroll-reveal ${isVisible ? 'visible' : ''} stagger-1`}>
            <div className="text-4xl font-bold gradient-text mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
          <div className={`scroll-reveal ${isVisible ? 'visible' : ''} stagger-2`}>
            <div className="text-4xl font-bold gradient-text mb-2">8+</div>
            <div className="text-sm text-muted-foreground">Projects Completed</div>
          </div>
          <div className={`scroll-reveal ${isVisible ? 'visible' : ''} stagger-3`}>
            <div className="text-4xl font-bold gradient-text mb-2">5★</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className={`scroll-reveal ${isVisible ? 'visible' : ''} stagger-4`}>
            <div className="text-4xl font-bold gradient-text mb-2">3+</div>
            <div className="text-sm text-muted-foreground">Industries Served</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
