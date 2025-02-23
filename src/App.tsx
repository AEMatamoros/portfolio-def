import Hero from "@Components/Hero";
import Proyects from "@Components/Proyects";
import Timeline from "@Components/Timeline";
import Techs from "@Components/Techs";
import Footer from "@Components/common/Footer";
import Contact from "@Components/Contact";

export default function App() {
  return (
    <div className="bg-gray-100">
      <Hero />
      <Timeline></Timeline>
      <Techs></Techs>
      <Proyects></Proyects>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
}
