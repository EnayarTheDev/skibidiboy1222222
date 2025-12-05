import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedItems } from "@/components/FeaturedItems";
import { GamesSection } from "@/components/GamesSection";
import { ValueChanges } from "@/components/ValueChanges";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedItems />
        <GamesSection />
        <ValueChanges />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
