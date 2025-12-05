import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skull, AlertTriangle, Shield, DollarSign, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const BlackMarketPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Skull className="h-12 w-12 text-destructive" />
            <h1 className="font-display text-5xl font-bold text-foreground">Black Market</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Underground trading for rare and exclusive items
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0" />
            <div>
              <h2 className="font-display text-xl font-bold text-destructive mb-2">Trading Advisory</h2>
              <p className="text-foreground/80">
                The Black Market features items that may be extremely rare, limited edition, or no longer obtainable through normal gameplay. 
                Always verify the legitimacy of items and traders before completing any transaction. 
                Use our escrow service for maximum protection.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
              <Eye className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Exclusive Access</h3>
            <p className="text-muted-foreground">
              Access rare items not found anywhere else. Limited editions and discontinued items.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green/20 flex items-center justify-center">
              <Shield className="h-8 w-8 text-green" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Escrow Protection</h3>
            <p className="text-muted-foreground">
              All high-value trades go through our secure escrow system for buyer and seller protection.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-gold" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Fair Pricing</h3>
            <p className="text-muted-foreground">
              Our value experts ensure all listings are priced fairly based on market demand.
            </p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-gradient-to-br from-destructive/10 via-card to-accent/10 rounded-xl border border-border p-12 text-center">
          <Skull className="h-20 w-20 text-destructive mx-auto mb-6 animate-pulse" />
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Coming Soon</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            The Black Market is currently under development. Sign up to be notified when we launch and get early access to exclusive deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-destructive hover:bg-destructive/90" asChild>
              <Link to="/login">
                Get Early Access
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/values">
                Browse Regular Values
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlackMarketPage;
