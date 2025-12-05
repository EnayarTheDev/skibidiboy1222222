import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import ItemCard from "@/components/ItemCard";
import { games } from "@/data/gameData";

export const FeaturedItems = () => {
  // Get top items from each game
  const featuredItems = games.slice(0, 4).flatMap(game => 
    game.items.slice(0, 2).map(item => ({
      ...item,
      gameName: game.name,
    }))
  );

  return (
    <section className="py-16 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Star className="h-8 w-8 text-primary fill-primary" />
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">Popular Items</h2>
              <p className="text-muted-foreground">Most traded items right now</p>
            </div>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
            <Link to="/values">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {featuredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              showGame
              gameName={item.gameName}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
