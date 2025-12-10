import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { games, formatValue } from "@/data/gameData";
import { Search, Calculator, ExternalLink, TrendingUp, TrendingDown, Minus, Plus, Check, Bell, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useInventory } from "@/hooks/useInventory";
import { toast } from "@/hooks/use-toast";
import PriceAlertModal from "@/components/PriceAlertModal";

interface DBItem {
  id: string;
  game_id: string;
  name: string;
  value: number;
  demand: number;
  rarity: string;
  trend: string;
  category: string;
  image_url: string | null;
  last_change: number | null;
}

const rarityConfig: Record<string, { label: string; className: string }> = {
  chroma: { label: 'Chroma', className: 'badge-chroma' },
  godly: { label: 'Godly', className: 'badge-godly' },
  ancient: { label: 'Ancient', className: 'badge-ancient' },
  legendary: { label: 'Legendary', className: 'badge-legendary' },
  epic: { label: 'Epic', className: 'badge-epic' },
  rare: { label: 'Rare', className: 'badge-rare' },
  uncommon: { label: 'Uncommon', className: 'badge-uncommon' },
  common: { label: 'Common', className: 'badge-common' },
};

const GameDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const game = games.find(g => g.slug === slug);
  
  const [items, setItems] = useState<DBItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"value" | "demand" | "name">("value");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [alertItem, setAlertItem] = useState<DBItem | null>(null);

  const { addItem, isInInventory, getQuantity } = useInventory();

  useEffect(() => {
    if (!game) return;
    
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('game_items')
        .select('*')
        .eq('game_id', game.id);

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        setItems((data as DBItem[]) || []);
      }
      setLoading(false);
    };

    fetchItems();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`game_items_${game.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_items',
          filter: `game_id=eq.${game.id}`,
        },
        () => {
          fetchItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [game]);

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

  const categories = ["All", ...new Set(items.map(i => i.category))];

  const filteredItems = items
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

  const handleAddToInventory = (item: DBItem) => {
    addItem(item.id, item.game_id, 1);
    toast({
      title: "Added to Inventory",
      description: `${item.name} has been added to your inventory.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center text-4xl">
              {items[0]?.image_url || "🎮"}
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
            {categories.map((category) => (
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
          Showing {filteredItems.length} of {items.length} items
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {filteredItems.map((item) => {
                const rarityInfo = rarityConfig[item.rarity] || rarityConfig.common;
                const TrendIcon = item.trend === 'rising' ? TrendingUp : item.trend === 'falling' ? TrendingDown : Minus;
                const trendClass = item.trend === 'rising' ? 'trend-rising' : item.trend === 'falling' ? 'trend-falling' : 'trend-stable';
                const demandColor = item.demand >= 8 ? 'text-green' : item.demand >= 5 ? 'text-gold' : 'text-red';
                const inInventory = isInInventory(item.id, item.game_id);
                const quantity = getQuantity(item.id, item.game_id);

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "group relative bg-card border border-border rounded-xl p-4 card-hover",
                      inInventory && "border-primary/50"
                    )}
                  >
                    {/* Alert Button */}
                    <button
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded"
                      onClick={() => setAlertItem(item)}
                    >
                      <Bell className="h-4 w-4 text-accent" />
                    </button>

                    {/* In Inventory Badge */}
                    {inInventory && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 group-hover:opacity-0">
                        <Check className="w-3 h-3" />
                        {quantity > 1 && `x${quantity}`}
                      </div>
                    )}

                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-lg mb-3 bg-secondary/50 flex items-center justify-center overflow-hidden text-3xl">
                        {item.image_url?.startsWith('http') ? (
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
                        ) : (
                          <span>{item.image_url || '📦'}</span>
                        )}
                      </div>

                      <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-semibold mb-2", rarityInfo.className)}>
                        {rarityInfo.label}
                      </span>

                      <h3 className="font-display font-bold text-foreground text-sm mb-1 line-clamp-1">
                        {item.name}
                      </h3>

                      <p className="font-display text-xl font-bold text-primary mb-2">
                        {formatValue(item.value)}
                      </p>

                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", trendClass)}>
                          <TrendIcon className="w-3 h-3" />
                          {item.trend}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-xs text-muted-foreground">Demand:</span>
                        <span className={cn("text-xs font-bold", demandColor)}>{item.demand}/10</span>
                      </div>

                      {(item.last_change ?? 0) !== 0 && (
                        <div className={cn("text-xs mb-2", (item.last_change ?? 0) > 0 ? "text-green" : "text-red")}>
                          {(item.last_change ?? 0) > 0 ? '+' : ''}{formatValue(item.last_change ?? 0)}
                        </div>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full h-7 text-xs mt-1"
                        onClick={() => handleAddToInventory(item)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                No items found matching your search.
              </div>
            )}
          </>
        )}
      </main>
      <Footer />

      {alertItem && (
        <PriceAlertModal
          item={{
            id: alertItem.id,
            name: alertItem.name,
            value: alertItem.value,
            demand: alertItem.demand,
            rarity: alertItem.rarity as any,
            trend: alertItem.trend as any,
            category: alertItem.category,
            imageUrl: alertItem.image_url || '📦',
          }}
          gameId={alertItem.game_id}
          gameName={game.name}
          open={!!alertItem}
          onClose={() => setAlertItem(null)}
        />
      )}
    </div>
  );
};

export default GameDetailPage;
