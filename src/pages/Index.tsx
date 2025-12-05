import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PopularItems from "@/components/PopularItems";
import StatsSection from "@/components/StatsSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PopularItems />
        <StatsSection />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
