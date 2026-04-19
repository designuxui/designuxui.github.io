import About from "@/app/components/sections/About";
import Cases from "@/app/components/sections/Cases";
import Contact from "@/app/components/sections/Contact";
import Hero from "@/app/components/sections/Hero";
import MarketplacePreview from "@/app/components/sections/MarketplacePreview";
import Results from "@/app/components/sections/Results";
import Services from "@/app/components/sections/Services";
import Ticker from "@/app/components/sections/Ticker";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Results />
      <Services />
      <Cases />
      <MarketplacePreview />
      <About />
      <Contact />
    </main>
  );
}