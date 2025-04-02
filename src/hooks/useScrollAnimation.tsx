import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAnimation({
  heroRef,
  timelineRef,
  techsRef,
  projectsRef,
  contactRef,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  useEffect(() => {
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    const sections = [
      { ref: heroRef, delay: 0 },
      { ref: timelineRef, delay: 0.1 },
      { ref: techsRef, delay: 0.2 },
      { ref: projectsRef, delay: 0.3 },
      { ref: contactRef, delay: 0.4 },
    ];

    sections.forEach(({ ref, delay }) => {
      if (ref.current) {
        gsap.from(ref.current, {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none reset",
            markers: false,
          },
          opacity: 0,
          y: 50,
          duration: 0.3,
          delay,
          ease: "power2.out",
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
