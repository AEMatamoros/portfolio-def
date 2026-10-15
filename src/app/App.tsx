import { useRef, lazy, Suspense } from "react";
import Hero from "@/features/hero/HeroSection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import GoTop from "@/components/layout/ScrollToTop";
import ContactOptions from "@/components/layout/SocialRail";
import EmailOptions from "@/components/layout/EmailRail";
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
    <div className="w-full min-h-screen">
      <Header />
      <div>
        <Hero />
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
      <Footer />
      <GoTop />
      <ContactOptions />
      <EmailOptions />
    </div>
  );
}
