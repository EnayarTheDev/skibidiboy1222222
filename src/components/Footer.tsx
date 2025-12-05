import { Twitter, MessageCircle, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center font-display font-bold text-primary-foreground">
                R
              </div>
              <span className="font-display font-semibold text-lg text-foreground">
                Roblox Values
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The most trusted platform for Roblox item trading values and market analytics.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Items</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Calculator</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Recent Updates</a></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Tools</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Trade Calculator</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Value History</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Server Finder</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dupe Checker</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Roblox Values. Not affiliated with Roblox Corporation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
