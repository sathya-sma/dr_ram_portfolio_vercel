import SiteEffects from "./components/SiteEffects";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Approach from "./components/Approach";
import Specialities from "./components/Specialities";
import Conditions from "./components/Conditions";
import Publications from "./components/Publications";
import Hospitals from "./components/Hospitals";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Floaties from "./components/Floaties";

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
        <Hospitals />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <Floaties />
    </>
  );
}
