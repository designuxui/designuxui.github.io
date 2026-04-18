import Hero from "@/app/components/sections/Hero";
import Results from "@/app/components/sections/Results";
import Ticker from "@/app/components/sections/Ticker";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Results />
    </main>
  );
}