import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useInventory } from "@/hooks/useInventory";
import { games, formatValue } from "@/data/gameData";
import { Package, Trash2, TrendingUp, TrendingDown, Minus, Plus, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const InventoryPage = () => {
  const { inventory, removeItem, clearInventory, getItemDetails, getTotalValue, getItemCount } = useInventory();
  const [selectedGame, setSelectedGame] = useState<string>("all");

  const filteredInventory = selectedGame === "all" 
    ? inventory 
    : inventory.filter(item => item.gameId === selectedGame);

  const totalValue = getTotalValue();
  const itemCount = getItemCount();

  // Calculate value by game
  const valueByGame = games.map(game => {
    const gameItems = inventory.filter(i => i.gameId === game.id);
    const gameValue = gameItems.reduce((total, invItem) => {
      const details = getItemDetails(invItem);
      return total + (details ? details.value * invItem.quantity : 0);
    }, 0);
    return { game, value: gameValue, count: gameItems.reduce((t, i) => t + i.quantity, 0) };
  }).filter(g => g.value > 0);

  const handleClearAll = () => {
    clearInventory();
    toast({
      title: "Inventory Cleared",
      description: "All items have been removed from your inventory.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="h-10 w-10 text-primary" />
            <h1 className="font-display text-4xl font-bold text-foreground">My Inventory</h1>
          </div>
          <p className="text-muted-foreground">Track your items and portfolio value</p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
            <p className="font-display text-4xl font-bold text-primary">{formatValue(totalValue)}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Items</p>
            <p className="font-display text-4xl font-bold text-foreground">{itemCount}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Games</p>
            <p className="font-display text-4xl font-bold text-accent">{valueByGame.length}</p>
          </div>
        </div>

        {/* Value by Game */}
        {valueByGame.length > 0 && (
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">Value by Game</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {valueByGame.map(({ game, value, count }) => (
                <div key={game.id} className="bg-secondary rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{game.name}</p>
                  <p className="font-display font-bold text-primary">{formatValue(value)}</p>
                  <p className="text-xs text-muted-foreground">{count} items</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedGame === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGame("all")}
            >
              All Games
            </Button>
            {games.map((game) => (
              <Button
                key={game.id}
                variant={selectedGame === game.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGame(game.id)}
              >
                {game.name}
              </Button>
            ))}
          </div>
          {inventory.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleClearAll}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Inventory Grid */}
        {filteredInventory.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {filteredInventory.map((invItem) => {
              const details = getItemDetails(invItem);
              if (!details) return null;

              const TrendIcon = details.trend === 'rising' ? TrendingUp : details.trend === 'falling' ? TrendingDown : Minus;
              const trendClass = details.trend === 'rising' ? 'text-green' : details.trend === 'falling' ? 'text-red' : 'text-muted-foreground';

              return (
                <div
                  key={`${invItem.gameId}-${invItem.itemId}`}
                  className="group relative bg-card border border-border rounded-xl p-4 card-hover"
                >
                  {/* Quantity Badge */}
                  {invItem.quantity > 1 && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                      x{invItem.quantity}
                    </div>
                  )}

                  <div className="flex flex-col items-center text-center">
                    {/* Game Badge */}
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded mb-2">
                      {details.gameName}
                    </span>

                    {/* Item Image */}
                    <div className="w-16 h-16 rounded-lg mb-3 bg-secondary/50 flex items-center justify-center overflow-hidden text-2xl">
                      {details.image_url?.startsWith('http') ? (
                        <img 
                          src={details.image_url} 
                          alt={details.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '📦';
                          }}
                        />
                      ) : (
                        <span>{details.image_url || '📦'}</span>
                      )}
                    </div>

                    {/* Item Name */}
                    <h3 className="font-display font-bold text-foreground text-sm mb-1 line-clamp-1">
                      {details.name}
                    </h3>

                    {/* Value */}
                    <p className="font-display text-lg font-bold text-primary mb-1">
                      {formatValue(details.value * invItem.quantity)}
                    </p>

                    {/* Trend */}
                    <div className={cn("flex items-center gap-1 text-xs", trendClass)}>
                      <TrendIcon className="w-3 h-3" />
                      {details.trend}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0"
                        onClick={() => removeItem(invItem.itemId, invItem.gameId, 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 w-7 p-0"
                        onClick={() => removeItem(invItem.itemId, invItem.gameId, invItem.quantity)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Your inventory is empty</h3>
            <p className="text-muted-foreground mb-6">Add items from game pages to track your portfolio</p>
            <Button asChild>
              <a href="/">Browse Games</a>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default InventoryPage;
