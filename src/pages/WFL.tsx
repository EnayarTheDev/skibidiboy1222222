import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import WFLVoting from "@/components/WFLVoting";
import { Scale } from "lucide-react";

const WFLPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scale className="h-10 w-10 text-gold" />
            <h1 className="font-display text-4xl font-bold text-foreground">W/F/L Voting</h1>
          </div>
          <p className="text-muted-foreground">Submit trades and let the community decide: Win, Fair, or Loss?</p>
        </div>

        <WFLVoting />
      </main>
      <Footer />
    </div>
  );
};

export default WFLPage;
