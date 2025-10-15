import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  videoSrc: string;
  title: string;
  subtitle: string;
  description?: string;
  index: number;
}

export default function ScrollSection({
  videoSrc,
  title,
  subtitle,
  description,
  index,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;

    if (!section || !video || !content || !overlay) return;

    // Play video when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(section);

    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      });

      // Animate video scale
      gsap.fromTo(
        video,
        { scale: 1.2 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            scrub: 1,
          },
        }
      );

      // Animate overlay opacity
      gsap.fromTo(
        overlay,
        { opacity: 0.7 },
        {
          opacity: 0.3,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            scrub: 1,
          },
        }
      );

      // Animate content
      gsap.fromTo(
        content,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=80%",
            scrub: 1,
          },
        }
      );

      // Fade out content at the end
      gsap.to(content, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: section,
          start: "+=120%",
          end: "+=200%",
          scrub: 1,
        },
      });
    }, section);

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSrc}
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/70 cinematic-overlay"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-center justify-center px-6 md:px-12"
      >
        <div className="max-w-4xl text-center">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4 opacity-80">
            {subtitle}
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-glow">
            {title}
          </h2>
          {description && (
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Scroll Indicator (only on first section) */}
      {index === 0 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-float">
          <div className="flex flex-col items-center gap-2 text-foreground/60">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
