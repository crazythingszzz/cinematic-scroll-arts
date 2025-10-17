import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleLayer from "./ParticleLayer";

gsap.registerPlugin(ScrollTrigger);

export default function FinalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Staggered reveal animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: "elastic.out(1, 0.5)" }
      )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 },
        "-=0.3"
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1 },
        "-=0.2"
      );

      // Track scroll progress for particles
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // Pulse animation for buttons
      gsap.to(buttonsRef.current?.children, {
        scale: 1.05,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 py-24 scroll-snap-align-start scroll-snap-stop-always"
      style={{ 
        backgroundColor: '#FFFBF7',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always'
      }}
    >
      {/* Particle Layer for Final Section */}
      <ParticleLayer 
        scrollProgress={scrollProgress}
        isVisible={true}
        intensity={1.2} // More intense for finale
      />

      <div ref={contentRef} className="max-w-4xl text-center space-y-8 relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-glow"
        >
          Your Story Continues
        </h2>
        <p 
          ref={descriptionRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Experience the power of cinematic storytelling with smooth scroll animations,
          seamless transitions, and immersive visuals.
        </p>
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
          <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:scale-105 transition-transform">
            Get Started
          </button>
          <button className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold text-lg hover:scale-105 transition-transform">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
