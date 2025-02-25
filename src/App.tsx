import Hero from "@Components/Hero";
import Projects from "@Components/Projects";
import Timeline from "@Components/Timeline";
import Techs from "@Components/Techs";
import Footer from "@Components/common/Footer";
import Contact from "@Components/Contact";
import Header from "@Components/common/Header";
import GoTop from "@Components/ui/GoToTop";
import ContactOptions from "@Components/common/ContactOptions";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <Timeline />
      <Techs />
      <Projects />
      <Contact />
      <Footer />
      <GoTop />
      <ContactOptions />
    </>
  );
}
