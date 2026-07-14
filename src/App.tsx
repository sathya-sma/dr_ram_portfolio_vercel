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
        <div className="snap-section"><Hero /></div>
        <Stats />
        <div className="snap-section"><About /></div>
        <div className="snap-section"><Approach /></div>
        <div className="snap-section"><Specialities /></div>
        <div className="snap-section"><Conditions /></div>
        <div className="snap-section"><Publications /></div>
        <div className="snap-section"><Gallery /></div>
        <div className="snap-section"><Hospitals /></div>
        <div className="snap-section"><Reviews /></div>
        <div className="snap-section"><Contact /></div>
      </main>
      <Footer />
      <Floaties />
      <Legal />
    </>
  );
}
