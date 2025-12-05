import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { games, getAllItems, formatValue } from "@/data/gameData";
import ItemCard from "@/components/ItemCard";
import { Search, Filter, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const ValuesPage = () => {
  const [selectedGame, setSelectedGame] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"value" | "demand" | "name">("value");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const allItems = getAllItems();
  
  const filteredItems = allItems
    .filter(item => {
      if (selectedGame !== "all" && item.gameId !== selectedGame) return false;
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

  const currentGame = games.find(g => g.id === selectedGame);
  const categories = selectedGame === "all" 
    ? ["All"] 
    : ["All", ...(currentGame?.categories.filter(c => c !== "All") || [])];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">Value List</h1>
          <p className="text-muted-foreground">Browse and search all item values</p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4 mb-8">
          {/* Game Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={selectedGame === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedGame("all");
                setSelectedCategory("All");
              }}
            >
              All Games
            </Button>
            {games.map((game) => (
              <Button
                key={game.id}
                variant={selectedGame === game.id ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedGame(game.id);
                  setSelectedCategory("All");
                }}
                className="gap-1"
              >
                <span>{game.items[0]?.imageUrl}</span>
                {game.name}
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

          {/* Categories */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredItems.length} items
        </p>

        {/* Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              showGame={selectedGame === "all"}
              gameName={item.gameName}
            />
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

export default ValuesPage;
