import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";

export default function useLenisScroll() {
  useEffect(() => {
    // TEMPORARILY DISABLE LENIS TO TEST SCROLL SNAP
    // const lenis = new Lenis({
    //   duration: 1.2,
    //   easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    //   orientation: "vertical",
    //   gestureOrientation: "vertical",
    //   smoothWheel: true,
    //   wheelMultiplier: 1,
    //   touchMultiplier: 2,
    //   infinite: false,
    // });

    // // Integrate with GSAP ScrollTrigger
    // lenis.on("scroll", () => {
    //   // ScrollTrigger will be updated automatically
    // });

    // function raf(time: number) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }

    // requestAnimationFrame(raf);

    // return () => {
    //   lenis.destroy();
    // };
  }, []);
}
