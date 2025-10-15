import useLenisScroll from "@/hooks/useLenisScroll";
import ScrollSection from "@/components/ScrollSection";
import FinalSection from "@/components/FinalSection";

const Index = () => {
  useLenisScroll();

  const sections = [
    {
      videoSrc: "/videos/ortus1.mp4",
      title: "Enter the Vision",
      subtitle: "Chapter One",
      description: "A journey through light and motion, where every frame tells a story.",
    },
    {
      videoSrc: "/videos/ortus3.mp4",
      title: "Discover the Moment",
      subtitle: "Chapter Two",
      description: "Immerse yourself in the cinematic experience of seamless transitions.",
    },
    {
      videoSrc: "/videos/ortus4.mp4",
      title: "Embrace the Future",
      subtitle: "Chapter Three",
      description: "Where innovation meets artistry in perfect harmony.",
    },
  ];

  return (
    <main className="relative w-full">
      {sections.map((section, index) => (
        <ScrollSection
          key={index}
          videoSrc={section.videoSrc}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          index={index}
        />
      ))}
      <FinalSection />
    </main>
  );
};

export default Index;
