import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGameBySlug, formatValue } from "@/data/gameData";
import ItemCard from "@/components/ItemCard";
import { Search, Calculator, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const GameDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const game = getGameBySlug(slug || "");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"value" | "demand" | "name">("value");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  if (!game) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Game Not Found</h1>
          <p className="text-muted-foreground mb-8">The game you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const filteredItems = game.items
    .filter(item => {
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedCategory !== "All" && item.category !== selectedCategory) return false;
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "value") comparison = a.value - b.value;
      else if (sortBy === "demand") comparison = a.demand - b.demand;
      else comparison = a.name.localeCompare(b.name);
      return sortOrder === "desc" ? -comparison : comparison;
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center text-4xl">
              {game.items[0]?.imageUrl || "🎮"}
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">{game.name}</h1>
              <p className="text-muted-foreground">{game.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to={`/calculator?game=${game.slug}`}>
                <Calculator className="h-4 w-4 mr-2" />
                Trade Calculator
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={`https://www.roblox.com/games`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Play Game
              </a>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {game.categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortBy("value")}
                className={cn(sortBy === "value" && "border-primary text-primary")}
              >
                Value
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortBy("demand")}
                className={cn(sortBy === "demand" && "border-primary text-primary")}
              >
                Demand
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortBy("name")}
                className={cn(sortBy === "name" && "border-primary text-primary")}
              >
                Name
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              >
                {sortOrder === "desc" ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredItems.length} of {game.items.length} items
        </p>

        {/* Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No items found matching your search.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GameDetailPage;
