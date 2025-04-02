import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@Components/Hero";
import Projects from "@Components/Projects";
import Timeline from "@Components/Timeline";
import Techs from "@Components/Techs";
import Footer from "@Components/common/Footer";
import Contact from "@Components/Contact";
import Header from "@Components/common/Header";
import GoTop from "@Components/ui/GoToTop";
import ContactOptions from "@Components/common/ContactOptions";
import EmailOptions from "@Components/common/EmailOptions";
import useScrollAnimation from "@Hooks/useScrollAnimation";

export default function App() {
  // Refs para cada sección
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const techsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useScrollAnimation({
    heroRef,
    timelineRef,
    techsRef,
    projectsRef,
    contactRef,
  });

  return (
    <div className="w-full min-h-screen animate-clip-expand animate-clip-shrink">
      <Header />
      <section ref={heroRef}>
        <Hero />
      </section>
      <section ref={timelineRef}>
        <Timeline />
      </section>
      <section ref={techsRef}>
        <Techs />
      </section>
      <section ref={projectsRef}>
        <Projects />
      </section>
      <section ref={contactRef}>
        <Contact />
      </section>
      <Footer />
      <GoTop />
      <ContactOptions />
      <EmailOptions />
    </div>
  );
}
