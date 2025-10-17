import { useState, useEffect } from "react";
import useLenisScroll from "@/hooks/useLenisScroll";
import ScrollSection from "@/components/ScrollSection";
import FinalSection from "@/components/FinalSection";
import SecondFinalSection from "@/components/SecondFinalSection";
import ThirdFinalSection from "@/components/ThirdFinalSection";
import Header from "@/components/Header";
import PropertySearch from "@/components/PropertySearch";

const Index = () => {
  useLenisScroll();
  const [firstSectionProgress, setFirstSectionProgress] = useState(0);
  const [isInFirstSection, setIsInFirstSection] = useState(true);

  // Calculate header visibility: visible when frame 200 out of 320 is reached (62.5%)
  // Frame 200/320 = 0.625, so we trigger at 62.5% progress
  const isHeaderVisible = firstSectionProgress >= 0.625 && isInFirstSection;
  
  // Calculate search interface visibility: visible when first section reaches 70% progress
  const isSearchInterfaceVisible = firstSectionProgress >= 0.7 && isInFirstSection;

  const handleFirstSectionProgress = (progress: number) => {
    setFirstSectionProgress(progress);
    // We're in the first section if progress is less than 1 (not fully scrolled past)
    // or if we're at the very end of the first section (progress = 1)
    setIsInFirstSection(progress <= 1);
  };

  const sections = [
    {
      videoSrc: "/videos/ortus1.mp4",
      title: "Enter the Vision",
      subtitle: "Chapter One",
      description: "A journey through light and motion, where every frame tells a story.",
    },
    {
      videoSrc: "/videos/ortus3.mp4",
      title: "Your Bespoke Living",
      subtitle: "Chapter Two",
      description: "A journey through light and motion, where every frame tells a story.",
    },
    {
      videoSrc: "/videos/ortus4.mp4",
      title: "Embrace the Future",
      subtitle: "Chapter Three",
      description: "Where innovation meets artistry in perfect harmony.",
    },
  ];

  return (
    <>
      <Header isVisible={isHeaderVisible} />
      <main className="relative w-full">
        {/* First section - no scroll snap */}
        <ScrollSection
          key={0}
          videoSrc={sections[0].videoSrc}
          title={sections[0].title}
          subtitle={sections[0].subtitle}
          description={sections[0].description}
          index={0}
          onScrollProgress={handleFirstSectionProgress}
          showSearchInterface={isSearchInterfaceVisible}
        />
        
        {/* Sections 2-4 + Final section - with scroll snap */}
        {sections.slice(1).map((section, index) => (
          <ScrollSection
            key={index + 1}
            videoSrc={section.videoSrc}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            index={index + 1}
            onScrollProgress={undefined}
            showSearchInterface={false}
          />
        ))}
        <FinalSection />
        <SecondFinalSection />
        <ThirdFinalSection />
      </main>
    </>
  );
};

export default Index;
