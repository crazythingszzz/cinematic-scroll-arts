import { useState } from "react";
import Header from '@/components/Header';
import FinalSection from "@/components/FinalSection";
import SecondFinalSection from "@/components/SecondFinalSection";
import ThirdFinalSection from "@/components/ThirdFinalSection";

const AboutOrtus = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  return (
    <>
      <Header isVisible={isHeaderVisible} />
      <div className="scroll-snap-container" style={{ scrollBehavior: 'smooth' }}>
        <FinalSection />
        <SecondFinalSection />
        <ThirdFinalSection />
      </div>
    </>
  );
};

export default AboutOrtus;
