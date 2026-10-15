import type { RefObject } from "react";
import { useEffect } from "react";

type SectionRef = RefObject<HTMLElement | null>;

export default function useScrollAnimation({
  timelineRef,
  techsRef,
  projectsRef,
}: {
  timelineRef: SectionRef;
  techsRef: SectionRef;
  projectsRef: SectionRef;
}) {
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });

      const sections = [
        { ref: timelineRef, delay: 0.1 },
        { ref: techsRef, delay: 0.2 },
        { ref: projectsRef, delay: 0.3 },
      ];

      sections.forEach(({ ref, delay }) => {
        if (ref.current) {
          gsap.from(ref.current, {
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
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
    })();

    return () => {
      cancelled = true;
      void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      });
    };
  }, []);
}
