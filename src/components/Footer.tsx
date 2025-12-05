import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="font-display text-2xl font-bold">
              <span className="text-foreground">ROBLOX</span>
              <span className="text-primary">VALUES</span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm">
              The most trusted source for Roblox item values, instant item delivery, and secure trading.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Games</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/game/mm2" className="text-muted-foreground hover:text-foreground transition-colors">Murder Mystery 2</Link></li>
              <li><Link to="/game/bladeball" className="text-muted-foreground hover:text-foreground transition-colors">Blade Ball</Link></li>
              <li><Link to="/game/bloxfruits" className="text-muted-foreground hover:text-foreground transition-colors">Blox Fruits</Link></li>
              <li><Link to="/game/growagarden" className="text-muted-foreground hover:text-foreground transition-colors">Grow a Garden</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">Instant Shop</Link></li>
              <li><Link to="/calculator" className="text-muted-foreground hover:text-foreground transition-colors">Trade Calculator</Link></li>
              <li><Link to="/trades" className="text-muted-foreground hover:text-foreground transition-colors">Recent Trades</Link></li>
              <li><Link to="/blackmarket" className="text-muted-foreground hover:text-foreground transition-colors">Black Market</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">Login</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Discord</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Roblox Values. Not affiliated with Roblox Corporation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
