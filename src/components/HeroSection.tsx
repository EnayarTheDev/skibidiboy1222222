import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, Sparkles, Shield, DollarSign, ShoppingBag, Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-36">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 px-5 py-2.5 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              #1 Trusted Trading Platform
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="text-foreground">Your Ultimate</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              Roblox Values
            </span>
            <br />
            <span className="text-foreground">Hub</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Accurate item values for MM2, Blade Ball, Blox Fruits & more. 
            Trade calculator, middleman support, and black market for real money trades.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button size="lg" className="glow-gold text-lg h-14 px-8" asChild>
              <Link to="/shop">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Instant Shop
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-border hover:bg-secondary" asChild>
              <Link to="/calculator">
                <Calculator className="h-5 w-5 mr-2" />
                Trade Calculator
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-destructive/50 text-destructive hover:bg-destructive/10" asChild>
              <Link to="/blackmarket">
                <DollarSign className="h-5 w-5 mr-2" />
                Black Market
              </Link>
            </Button>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="h-5 w-5 text-primary" />
              <span>Instant Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-5 w-5 text-accent" />
              <span>Verified Middlemen</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Real-Time Values</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
