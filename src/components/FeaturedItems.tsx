import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FeaturedItem {
  id: string;
  name: string;
  game: string;
  price: number;
  originalPrice?: number;
  rarity: string;
  isFeatured: boolean;
}

const featuredItems: FeaturedItem[] = [
  { id: "1", name: "Chroma Luger", game: "MM2", price: 15.99, originalPrice: 19.99, rarity: "Chroma", isFeatured: true },
  { id: "2", name: "Chroma Fang", game: "MM2", price: 22.99, originalPrice: 29.99, rarity: "Chroma", isFeatured: true },
  { id: "4", name: "Dragon Fruit", game: "Blox Fruits", price: 25.00, originalPrice: 35.00, rarity: "Mythical", isFeatured: true },
  { id: "5", name: "Leopard Fruit", game: "Blox Fruits", price: 32.99, originalPrice: 45.00, rarity: "Mythical", isFeatured: true },
  { id: "7", name: "Inferno Blade", game: "Blade Ball", price: 12.99, originalPrice: 18.99, rarity: "Legendary", isFeatured: true },
  { id: "10", name: "Rainbow Flower", game: "Grow a Garden", price: 11.99, originalPrice: 16.99, rarity: "Rare", isFeatured: true },
];

export const FeaturedItems = () => {
  const handleQuickAdd = (item: FeaturedItem) => {
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const discount = (item: FeaturedItem) => {
    if (!item.originalPrice) return 0;
    return Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
  };

  return (
    <section className="py-16 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Star className="h-8 w-8 text-primary fill-primary" />
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">Featured Items</h2>
              <p className="text-muted-foreground">Instant delivery guaranteed</p>
            </div>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
            <Link to="/shop">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              {discount(item) > 0 && (
                <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                  -{discount(item)}%
                </div>
              )}
              
              <div className="text-center mb-3">
                <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                  {item.game}
                </span>
              </div>

              <h3 className="font-display font-bold text-foreground text-center mb-1">
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
                onClick={() => handleQuickAdd(item)}
              >
                <ShoppingBag className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
