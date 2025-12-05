import ItemCard from "./ItemCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const items = [
  {
    name: "Volt Bike",
    valueRange: "2.5M - 3M",
    rarity: "legendary" as const,
    trend: "rising" as const,
    description: "High-speed limited vehicle with strong trading demand",
  },
  {
    name: "Torpedo",
    valueRange: "1.8M - 2.2M",
    rarity: "legendary" as const,
    trend: "stable" as const,
    description: "Retired vehicle with consistent market value",
  },
  {
    name: "Beam Hybrid",
    valueRange: "800K - 1M",
    rarity: "epic" as const,
    trend: "rising" as const,
    description: "Eco-friendly performance vehicle gaining popularity",
  },
  {
    name: "Brulee",
    valueRange: "1.2M - 1.5M",
    rarity: "legendary" as const,
    trend: "falling" as const,
    description: "Classic luxury vehicle with declining interest",
  },
  {
    name: "Arachnid",
    valueRange: "600K - 750K",
    rarity: "epic" as const,
    trend: "rising" as const,
    description: "Spider-themed vehicle with growing collector appeal",
  },
  {
    name: "Roadster",
    valueRange: "350K - 450K",
    rarity: "rare" as const,
    trend: "stable" as const,
    description: "Reliable sports car with steady demand",
  },
];

const PopularItems = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Popular Items
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track the hottest items in the market with real-time value updates
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {items.map((item) => (
            <ItemCard key={item.name} {...item} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="border-border hover:bg-secondary group">
            View All Items
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularItems;
