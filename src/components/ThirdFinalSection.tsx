import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ThirdFinalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftContent = leftContentRef.current;
    const rightImage = rightImageRef.current;

    if (!section || !leftContent || !rightImage) return;

    const ctx = gsap.context(() => {
      // Staggered reveal animation for split layout
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      });

      // Animate left content
      tl.fromTo(
        titleRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, ease: "power2.out" }
      )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0 },
        "-=0.3"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, x: -20, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1 },
        "-=0.2"
      )
      // Animate right image
      .fromTo(
        rightImage,
        { opacity: 0, x: 50, scale: 1.1 },
        { opacity: 1, x: 0, scale: 1, ease: "power2.out" },
        "-=0.6"
      );

      // Subtle hover animation for button
      gsap.to(buttonRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        paused: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center"
      style={{ 
        backgroundColor: '#FFFBF7'
      }}
    >
      <div className="w-full flex items-center min-h-screen">
        {/* Left Content - 40% width with proper padding */}
        <div
          ref={leftContentRef}
          className="w-2/5 px-8 lg:px-12 xl:px-16 flex flex-col justify-center"
        >
          <div className="max-w-xl space-y-8 text-left">
            <h2
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight"
            >
              The <em className="italic text-gray-800">duplex</em>
            </h2>
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-gray-600 leading-relaxed"
            >
             Two levels of refinement, one seamless lifestyle. With grand ceilings, flowing staircases, and thoughtfully layered spaces, our duplex residences offer the feel of a private home with the convenience of elevated living — perfect for those who desire space, style, and sophistication in equal measure.
            </p>
            <button
              ref={buttonRef}
              className="inline-flex items-center gap-3 text-orange-600 font-medium text-lg hover:text-orange-700 transition-colors group"
            >
              VIEW LISTINGS
              <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:scale-110 transition-transform"></div>
            </button>
          </div>
        </div>

        {/* Right Image - 60% width, right-aligned to edge */}
        <div ref={rightImageRef} className="w-3/5 relative h-screen">
          <div className="relative w-full h-full">
            <img 
              src="/images/Mask group (8).png" 
              alt="Luxury penthouse with infinity pool and Dubai Marina skyline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
