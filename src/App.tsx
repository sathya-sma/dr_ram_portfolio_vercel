import SiteEffects from "./components/SiteEffects";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Approach from "./components/Approach";
import Specialities from "./components/Specialities";
import Conditions from "./components/Conditions";
import Publications from "./components/Publications";
import Gallery from "./components/Gallery";
import Hospitals from "./components/Hospitals";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Floaties from "./components/Floaties";
import Legal from "./components/Legal";

export default function App() {
  return (
    <>
      <SiteEffects />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Approach />
        <Specialities />
        <Conditions />
        <Publications />
        <Gallery />
        <Hospitals />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <Floaties />
      <Legal />
    </>
  );
}
