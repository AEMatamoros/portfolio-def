import { useRef, lazy, Suspense } from "react";
import Hero from "@Components/Hero";
import Footer from "@Components/common/Footer";
import Header from "@Components/common/Header";
import GoTop from "@Components/ui/GoToTop";
import ContactOptions from "@Components/common/ContactOptions";
import EmailOptions from "@Components/common/EmailOptions";
import useScrollAnimation from "@Hooks/useScrollAnimation";

const Timeline = lazy(() => import("@Components/Timeline"));
const Techs = lazy(() => import("@Components/Techs"));
const Projects = lazy(() => import("@Components/Projects"));
const Contact = lazy(() => import("@Components/Contact"));

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
