import { useEffect, useRef, ReactNode, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollSequence } from "@/hooks/useScrollSequence";
import { getOptimalFrameCount } from "@/utils/deviceDetection";
import ParticleLayer from "./ParticleLayer";
import PropertySearch from "./PropertySearch";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  videoSrc: string; // Keep for fallback
  title: string;
  subtitle: string;
  description?: string;
  index: number;
  onScrollProgress?: (progress: number) => void; // Callback for scroll progress
  showSearchInterface?: boolean; // Show search interface based on scroll progress
}

export default function ScrollSection({
  videoSrc,
  title,
  subtitle,
  description,
  index,
  onScrollProgress,
  showSearchInterface = false,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use hero sequence for first section, ortus sequences for others
  const sequenceName = index === 0 ? 'hero' : `ortus${index + 1}`;
  // Set frame count based on sequence - hero has 320 frames, ortus sequences have 162 frames
  const baseFrameCount = index === 0 ? 320 : 162;
  const frameCount = getOptimalFrameCount(baseFrameCount);
  const framePathPattern = `/sequences/${sequenceName}/frame-{index}.webp`;

  // Use scroll sequence hook
  const { isLoading, loadingProgress } = useScrollSequence({
    canvasRef,
    frameCount,
    framePathPattern,
    scrollTriggerRef: sectionRef,
    startFrame: 0,
    endFrame: 100,
    onScrollProgress: index === 0 ? onScrollProgress : undefined
  });

  // Show video fallback when no frames are loaded
  const showVideoFallback = isLoading;

  useEffect(() => {
    const section = sectionRef.current;
    const fallback = fallbackRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;

    if (!section || !content || !overlay) return;

    // Fallback video observer (only if scroll sequence fails to load)
    if (fallback) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && isLoading) {
              fallback.play().catch(() => {});
            } else {
              fallback.pause();
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(section);
      
      return () => observer.disconnect();
    }

    const ctx = gsap.context(() => {
      // Only pin the first section (index 0) for frame scrubbing
      // Other sections will use scroll snap
      if (index === 0) {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      });
      }

      // Animate canvas scale (only for first section with canvas)
      if (index === 0 && canvasRef.current) {
      gsap.fromTo(
        canvasRef.current,
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
      }

      // Animate overlay opacity (only for first section with overlay)
      if (index === 0) {
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
      }

      // Text animations - different behavior for first vs scroll snap sections
      if (index === 0) {
        // First section: Parallax text animations with staggered timing
      // Subtitle appears first
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=40%",
            scrub: 1,
          },
        }
      );

      // Title appears with elastic effect
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=60%",
            scrub: 1,
          },
        }
      );

      // Description fades in last
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
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
      } else {
        // Scroll snap sections: Simple entrance animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        });

        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0 }
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0 },
          "-=0.2"
        )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          "-=0.1"
        );
      }

      // Parallax movement for depth effect (only for first section)
      if (index === 0) {
      gsap.to(subtitleRef.current, {
        y: -20,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          scrub: 1,
        },
      });

      gsap.to(titleRef.current, {
        y: -40,
        scale: 1.05,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          scrub: 1,
        },
      });

        // Track scroll progress for particle layer (only for first section)
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
      } else {
        // For scroll snap sections, just track basic scroll progress
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        });
      }

      // Fade out content at the end (only for first section)
      if (index === 0) {
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
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, [isLoading]);

  return (
    <section
      ref={sectionRef}
      data-index={index}
      className={`relative h-screen w-full overflow-hidden ${
        index > 0 ? 'scroll-snap-align-start scroll-snap-stop-always' : 'scroll-snap-align-none'
      }`}
      style={{
        backgroundColor: index > 0 ? '#FFFBF7' : undefined,
        scrollSnapAlign: index > 0 ? 'start' : 'none',
        scrollSnapStop: index > 0 ? 'always' : undefined
      }}
    >
      {/* Scroll Sequence Canvas - only for first section */}
      {index === 0 && (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          opacity: showVideoFallback ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
      )}

      {/* Fallback Video - only for first section */}
      {index === 0 && (
      <video
        ref={fallbackRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSrc}
        loop
        muted
        playsInline
        preload="auto"
        style={{ 
          opacity: showVideoFallback ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
      )}

      {/* Loading Indicator - only for first section */}
      {index === 0 && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-30 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/90 text-sm font-medium">
              Loading cinematic sequence...
            </p>
            <div className="w-48 h-1 bg-white/20 rounded-full mx-auto mt-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-white/60 text-xs mt-2">
              {Math.round(loadingProgress)}% complete
            </p>
          </div>
        </div>
      )}

      {/* Particle Layer */}
      <ParticleLayer 
        scrollProgress={scrollProgress}
        isVisible={true}
        intensity={index === 1 ? 1 : index === 0 ? 0.6 : 0.8} // Peak particles in middle section
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
        {index === 0 && showSearchInterface ? (
          // First section: Show search interface when scroll progress >= 70%
          <div className="w-full h-full relative">
            <PropertySearch isVisible={true} />
          </div>
        ) : index === 0 ? (
          // First section: Show nothing when scroll progress < 70% (no original content)
          <div></div>
        ) : (
          // Other sections: Show original content
          <div className="max-w-4xl text-center">
            <p 
              ref={subtitleRef}
              className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4 opacity-80"
            >
              {subtitle}
            </p>
            <h2 
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-glow"
            >
              {title}
            </h2>
            {description && (
              <p 
                ref={descriptionRef}
                className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed"
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Scroll Indicator (only on first section when search interface is not visible) */}
      {index === 0 && !showSearchInterface && (
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
