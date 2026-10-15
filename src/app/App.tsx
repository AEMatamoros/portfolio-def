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

export default function App() {
  const timelineRef = useRef<HTMLElement>(null);
  const techsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  useScrollAnimation({
    timelineRef,
    techsRef,
    projectsRef,
  });

  return (
    <div className="w-full min-h-screen animate-clip-expand animate-clip-shrink">
      <Header />
      <section>
        <Hero />
      </section>
      <section ref={timelineRef}>
        <Suspense fallback={<SectionFallback />}>
          <Timeline />
        </Suspense>
      </section>
      <section ref={techsRef}>
        <Suspense fallback={<SectionFallback />}>
          <Techs />
        </Suspense>
      </section>
      <section ref={projectsRef}>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
      </section>
      <section>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </section>
      <Footer />
      <GoTop />
      <ContactOptions />
      <EmailOptions />
    </div>
  );
}
