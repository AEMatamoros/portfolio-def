import { useRef, lazy, Suspense } from "react";
import { HeroSection } from "@/features/hero/HeroSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SideRails } from "@/components/layout/SideRails";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const Timeline = lazy(() => import("@/features/experience/ExperienceSection"));
const Techs = lazy(() => import("@/features/techs/TechsSection"));
const Projects = lazy(() => import("@/features/projects/ProjectsSection"));
const Contact = lazy(() => import("@/features/contact/ContactSection"));

function SectionFallback() {
  return <div className="min-h-[24vh] w-full" aria-hidden />;
}

export function App() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const techsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useScrollAnimation({
    timelineRef,
    techsRef,
    projectsRef,
  });

  return (
    <>
      <SkipLink targetId="main" />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <div>
          <HeroSection />
        </div>
        <div ref={timelineRef}>
          <Suspense fallback={<SectionFallback />}>
            <Timeline />
          </Suspense>
        </div>
        <div ref={techsRef}>
          <Suspense fallback={<SectionFallback />}>
            <Techs />
          </Suspense>
        </div>
        <div ref={projectsRef}>
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </div>
      </main>
      <Footer />
      <SideRails />
      <ScrollToTop />
    </>
  );
}
