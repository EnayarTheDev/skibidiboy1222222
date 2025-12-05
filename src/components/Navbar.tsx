import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogIn, Menu, X, DollarSign, ShoppingBag } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const games = [
  { name: "Murder Mystery 2", slug: "mm2" },
  { name: "Blade Ball", slug: "bladeball" },
  { name: "Blox Fruits", slug: "bloxfruits" },
  { name: "Grow a Garden", slug: "growagarden" },
  { name: "Pet Simulator 99", slug: "petsim99" },
  { name: "Adopt Me", slug: "adoptme" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold">
              <span className="text-foreground">ROBLOX</span>
              <span className="text-primary">VALUES</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors">
                Games <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border">
                {games.map((game) => (
                  <DropdownMenuItem key={game.slug} asChild>
                    <Link to={`/game/${game.slug}`} className="cursor-pointer">
                      {game.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/shop" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
              <ShoppingBag className="h-4 w-4 text-primary" />
              Shop
            </Link>

            <Link to="/calculator" className="text-foreground/80 hover:text-foreground transition-colors">
              Calculator
            </Link>

            <Link to="/trades" className="text-foreground/80 hover:text-foreground transition-colors">
              Trades
            </Link>

            <Link to="/blackmarket" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-destructive" />
              Black Market
            </Link>

            <Link to="/values" className="text-foreground/80 hover:text-foreground transition-colors">
              Value Changes
            </Link>
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Log In
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-foreground/80 hover:text-foreground">Home</Link>
              <div className="text-foreground/80">Games:</div>
              {games.map((game) => (
                <Link
                  key={game.slug}
                  to={`/game/${game.slug}`}
                  className="pl-4 text-foreground/60 hover:text-foreground"
                >
                  {game.name}
                </Link>
              ))}
              <Link to="/shop" className="text-foreground/80 hover:text-foreground flex items-center gap-1">
                <ShoppingBag className="h-4 w-4 text-primary" />
                Shop
              </Link>
              <Link to="/calculator" className="text-foreground/80 hover:text-foreground">Calculator</Link>
              <Link to="/trades" className="text-foreground/80 hover:text-foreground">Trades</Link>
              <Link to="/blackmarket" className="text-foreground/80 hover:text-foreground flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-destructive" />
                Black Market
              </Link>
              <Link to="/values" className="text-foreground/80 hover:text-foreground">Value Changes</Link>
              <Button variant="outline" size="sm" className="w-fit border-primary text-primary" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Log In
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
