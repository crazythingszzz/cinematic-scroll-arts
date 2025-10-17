import PropertyCard from "./PropertyCard";
import AnimatedContent from "./AnimatedContent";

// Property data using the new images - showing only 3 cards
const properties = [
  {
    id: 1,
    image: "/images/Mask group (3).png",
    description: "Lorem Ipsum is simply dummy",
    price: "AED 482,500,000",
    beds: 5,
    baths: 7,
    sqft: "43,830 SQ.FT."
  },
  {
    id: 2,
    image: "/images/Mask group (4).png", 
    description: "Lorem Ipsum is simply dummy",
    price: "AED 482,500,000",
    beds: 5,
    baths: 7,
    sqft: "43,830 SQ.FT."
  },
  {
    id: 3,
    image: "/images/Mask group (5).png",
    description: "Lorem Ipsum is simply dummy",
    price: "AED 482,500,000",
    beds: 5,
    baths: 7,
    sqft: "43,830 SQ.FT."
  }
];

export default function CuratedListings() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] px-6 md:px-12">
        {/* Heading - Positioned above and to the left */}
        <div className="mb-8">
          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={true}
            duration={1.0}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity={true}
            scale={0.9}
            threshold={0.2}
            delay={0.2}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-black leading-tight">
              <span className="block">Currated</span>
              <span className="block">listings</span>
            </h2>
          </AnimatedContent>
        </div>
        
        {/* Main Content Block - Paragraph and Cards */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <AnimatedContent
              distance={80}
              direction="horizontal"
              reverse={true}
              duration={1.2}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity={true}
              scale={0.95}
              threshold={0.15}
              delay={0.4}
            >
              <p className="text-lg text-black leading-relaxed mb-10">
                At the very top, life takes on a different rhythm. Wrapped in glass and kissed by the sky, ORTUS penthouses offer panoramic views, expansive terraces, and bespoke interiors – a rarefied world above it all, designed for those who dwell in distinction.
              </p>
            </AnimatedContent>
            
            <AnimatedContent
              distance={60}
              direction="horizontal"
              reverse={true}
              duration={1.0}
              ease="bounce.out"
              initialOpacity={0}
              animateOpacity={true}
              scale={0.9}
              threshold={0.2}
              delay={0.6}
            >
              <a 
                href="/buy"
                className="inline-flex items-center gap-3 text-black font-medium hover:text-gray-600 transition-colors duration-300 group"
              >
                <span className="uppercase tracking-wide text-sm">VIEW LISTINGS</span>
                <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                  <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </AnimatedContent>
          </div>
          
          {/* Right Column - Property Cards */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property, index) => (
                <AnimatedContent
                  key={property.id}
                  distance={120}
                  direction="horizontal"
                  reverse={false}
                  duration={1.0}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  scale={0.8}
                  threshold={0.1}
                  delay={0.8 + (index * 0.2)}
                >
                  <PropertyCard
                    image={property.image}
                    description={property.description}
                    price={property.price}
                    beds={property.beds}
                    baths={property.baths}
                    sqft={property.sqft}
                  />
                </AnimatedContent>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
