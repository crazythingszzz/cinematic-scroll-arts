import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-background via-accent to-background flex items-center justify-center px-6 md:px-12 py-24"
    >
      <div ref={contentRef} className="max-w-4xl text-center space-y-8">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-glow">
          Your Story Continues
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Experience the power of cinematic storytelling with smooth scroll animations,
          seamless transitions, and immersive visuals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
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
