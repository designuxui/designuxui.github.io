import Hero from "./components/sections/Hero";
import AboutStrip from "./components/sections/AboutStrip";
import Services from "./components/sections/Services";
import Cases from "./components/sections/Cases";
import Clients from "./components/sections/Clients";
import Results from "./components/sections/Results";
import Contact from "./components/sections/Contact";
import Ticker from "./components/sections/Ticker";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <AboutStrip />
      <Services />
      <Cases />
      <Clients />
      <Results />
      <Contact />
    </main>
  );
}