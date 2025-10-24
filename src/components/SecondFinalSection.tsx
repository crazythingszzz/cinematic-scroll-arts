import { useEffect, useRef, useState } from 'react';

export default function SecondFinalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            section.classList.remove('entering', 'exiting');
            section.classList.add('active');
            content.classList.add('animate-in');
            content.classList.remove('animate-out');
            image.classList.add('animate-in');
            image.classList.remove('animate-out');
          } else {
            setIsVisible(false);
            section.classList.remove('active');
            section.classList.add('exiting');
            content.classList.add('animate-out');
            content.classList.remove('animate-in');
            image.classList.add('animate-out');
            image.classList.remove('animate-in');
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full flex items-center scroll-snap-section bg-[#F0F8FF] entering"
    >
      <div className="w-full flex items-center h-full">
        {/* Left Content - 40% width with proper padding */}
        <div 
          ref={contentRef}
          className="w-2/5 px-8 lg:px-12 xl:px-16 flex flex-col justify-center section-content animate-out"
        >
          <div className="max-w-xl space-y-8 text-left">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight">
              The <em className="italic text-gray-800">villa</em>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              A world of your own — surrounded by space, serenity, and stature. Villa living at ORTUS is where architecture meets privacy, and every corner is a celebration of timeless luxury and effortless elegance. A true sanctuary crafted for those who lead life on their own terms.
            </p>
            <button className="inline-flex items-center gap-3 text-orange-600 font-medium text-lg hover:text-orange-700 transition-colors group">
              VIEW LISTINGS
              <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:scale-110 transition-transform"></div>
            </button>
          </div>
        </div>

        {/* Right Image - 60% width, right-aligned to edge */}
        <div 
          ref={imageRef}
          className="w-3/5 relative h-screen section-image animate-out"
        >
          <div className="relative w-full h-full">
            <img 
              src="/images/Mask group (7).png" 
              alt="Luxury villa with private garden and pool"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
