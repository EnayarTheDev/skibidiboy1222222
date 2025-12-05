import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogIn, Menu, X, Calculator, ShoppingBag, Repeat, Skull, TrendingUp, Gamepad2 } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { games } from "@/data/gameData";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">
              <span className="text-foreground">ROBLOX</span>
              <span className="text-primary">VALUES</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/" className="px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors">
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors">
                <Gamepad2 className="h-4 w-4" />
                Games <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border w-56">
                {games.map((game) => (
                  <DropdownMenuItem key={game.slug} asChild>
                    <Link to={`/game/${game.slug}`} className="cursor-pointer flex items-center gap-2">
                      <span className="text-lg">{game.items[0]?.imageUrl}</span>
                      {game.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/calculator" className="px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors flex items-center gap-2">
              <Calculator className="h-4 w-4 text-primary" />
              Calculator
            </Link>

            <Link to="/values" className="px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green" />
              Values
            </Link>

            <Link to="/trades" className="px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors flex items-center gap-2">
              <Repeat className="h-4 w-4 text-accent" />
              Trades
            </Link>

            <Link to="/shop" className="px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-gold" />
              Shop
            </Link>

            <Link to="/blackmarket" className="px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors flex items-center gap-2">
              <Skull className="h-4 w-4 text-destructive" />
              Black Market
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Sign Up
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border space-y-2">
            <Link to="/" className="block px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg">
              Home
            </Link>
            
            <div className="px-4 py-2 text-sm font-medium text-muted-foreground">Games</div>
            {games.map((game) => (
              <Link
                key={game.slug}
                to={`/game/${game.slug}`}
                className="block px-6 py-2 text-foreground/60 hover:text-foreground hover:bg-secondary/50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {game.name}
              </Link>
            ))}
            
            <div className="border-t border-border my-2" />
            
            <Link to="/calculator" className="flex items-center gap-2 px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              <Calculator className="h-4 w-4 text-primary" /> Calculator
            </Link>
            <Link to="/values" className="flex items-center gap-2 px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              <TrendingUp className="h-4 w-4 text-green" /> Values
            </Link>
            <Link to="/trades" className="flex items-center gap-2 px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              <Repeat className="h-4 w-4 text-accent" /> Trades
            </Link>
            <Link to="/shop" className="flex items-center gap-2 px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              <ShoppingBag className="h-4 w-4 text-gold" /> Shop
            </Link>
            <Link to="/blackmarket" className="flex items-center gap-2 px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              <Skull className="h-4 w-4 text-destructive" /> Black Market
            </Link>
            
            <div className="border-t border-border my-2" />
            
            <div className="flex gap-2 px-4">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Log In</Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
