import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { games, formatValue } from "@/data/gameData";
import { ShoppingBag, Search, Star, Zap, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ShopItem {
  id: string;
  name: string;
  game: string;
  price: number;
  originalPrice?: number;
  rarity: string;
  inStock: boolean;
  imageUrl: string;
}

const shopItems: ShopItem[] = [
  { id: "s1", name: "Chroma Luger", game: "MM2", price: 14.99, originalPrice: 19.99, rarity: "Chroma", inStock: true, imageUrl: "🔫" },
  { id: "s2", name: "Chroma Fang", game: "MM2", price: 12.99, originalPrice: 17.99, rarity: "Chroma", inStock: true, imageUrl: "🗡️" },
  { id: "s3", name: "Corrupt", game: "MM2", price: 9.99, rarity: "Godly", inStock: true, imageUrl: "🔪" },
  { id: "s4", name: "Torpedo", game: "Jailbreak", price: 29.99, originalPrice: 39.99, rarity: "Legendary", inStock: true, imageUrl: "🚗" },
  { id: "s5", name: "Brulee", game: "Jailbreak", price: 24.99, rarity: "Legendary", inStock: true, imageUrl: "🚙" },
  { id: "s6", name: "Leopard", game: "Blox Fruits", price: 19.99, originalPrice: 24.99, rarity: "Mythical", inStock: true, imageUrl: "🐆" },
  { id: "s7", name: "Dragon", game: "Blox Fruits", price: 15.99, rarity: "Mythical", inStock: true, imageUrl: "🐉" },
  { id: "s8", name: "Shadow Dragon", game: "Adopt Me", price: 49.99, originalPrice: 59.99, rarity: "Legendary", inStock: true, imageUrl: "🐲" },
  { id: "s9", name: "Frost Dragon", game: "Adopt Me", price: 34.99, rarity: "Legendary", inStock: true, imageUrl: "❄️" },
  { id: "s10", name: "Huge Hacked Cat", game: "Pet Sim 99", price: 99.99, rarity: "Huge", inStock: false, imageUrl: "🐱" },
  { id: "s11", name: "Inferno Blade", game: "Blade Ball", price: 8.99, rarity: "Mythic", inStock: true, imageUrl: "🔥" },
  { id: "s12", name: "Rainbow Flower", game: "Grow a Garden", price: 11.99, rarity: "Mythic", inStock: true, imageUrl: "🌈" },
];

const ShopPage = () => {
  const [selectedGame, setSelectedGame] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<ShopItem[]>([]);

  const filteredItems = shopItems.filter(item => {
    if (selectedGame !== "all" && !item.game.toLowerCase().includes(selectedGame.toLowerCase())) return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const addToCart = (item: ShopItem) => {
    setCart([...cart, item]);
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingBag className="h-10 w-10 text-gold" />
            <h1 className="font-display text-4xl font-bold text-foreground">Item Shop</h1>
          </div>
          <p className="text-muted-foreground">Buy items instantly with secure delivery</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
            <Zap className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-display font-bold text-foreground">Instant Delivery</h3>
              <p className="text-sm text-muted-foreground">Items delivered in minutes</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
            <Shield className="h-8 w-8 text-green" />
            <div>
              <h3 className="font-display font-bold text-foreground">100% Secure</h3>
              <p className="text-sm text-muted-foreground">Safe and legit items only</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
            <Star className="h-8 w-8 text-gold" />
            <div>
              <h3 className="font-display font-bold text-foreground">Best Prices</h3>
              <p className="text-sm text-muted-foreground">Competitive market rates</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4 mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={selectedGame === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGame("all")}
            >
              All Games
            </Button>
            <Button
              variant={selectedGame === "mm2" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGame("mm2")}
            >
              🔫 MM2
            </Button>
            <Button
              variant={selectedGame === "jailbreak" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGame("jailbreak")}
            >
              🚗 Jailbreak
            </Button>
            <Button
              variant={selectedGame === "blox" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGame("blox")}
            >
              🐉 Blox Fruits
            </Button>
            <Button
              variant={selectedGame === "adopt" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGame("adopt")}
            >
              🐲 Adopt Me
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="bg-primary/10 rounded-xl border border-primary/20 p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <span className="font-medium">{cart.length} items in cart</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-xl font-bold text-primary">${cartTotal.toFixed(2)}</span>
              <Button>Checkout</Button>
            </div>
          </div>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={cn(
                "group relative bg-card rounded-xl border border-border p-4 card-hover",
                !item.inStock && "opacity-60"
              )}
            >
              {item.originalPrice && (
                <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                  -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                </div>
              )}
              
              <div className="text-center mb-3">
                <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                  {item.game}
                </span>
              </div>

              <div className="w-14 h-14 mx-auto mb-3 rounded-lg bg-secondary flex items-center justify-center text-3xl">
                {item.imageUrl}
              </div>

              <h3 className="font-display font-bold text-foreground text-center text-sm mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-primary text-center mb-3">{item.rarity}</p>

              <div className="text-center mb-4">
                <span className="text-xl font-bold text-foreground">${item.price.toFixed(2)}</span>
                {item.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through ml-2">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <Button
                size="sm"
                className="w-full"
                disabled={!item.inStock}
                onClick={() => addToCart(item)}
              >
                {item.inStock ? (
                  <>
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Add to Cart
                  </>
                ) : (
                  "Out of Stock"
                )}
              </Button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
