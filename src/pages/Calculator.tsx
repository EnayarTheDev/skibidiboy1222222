import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { games, GameItem, formatValue, getGameBySlug } from "@/data/gameData";
import { Calculator as CalcIcon, Plus, Trash2, ArrowLeftRight, Check, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CalculatorPage = () => {
  const [selectedGame, setSelectedGame] = useState(games[0].slug);
  const [yourItems, setYourItems] = useState<GameItem[]>([]);
  const [theirItems, setTheirItems] = useState<GameItem[]>([]);
  const [searchYour, setSearchYour] = useState("");
  const [searchTheir, setSearchTheir] = useState("");

  const game = getGameBySlug(selectedGame);
  const gameItems = game?.items || [];

  const yourTotal = yourItems.reduce((sum, item) => sum + item.value, 0);
  const theirTotal = theirItems.reduce((sum, item) => sum + item.value, 0);
  const difference = yourTotal - theirTotal;
  
  const getTradeResult = () => {
    if (yourItems.length === 0 || theirItems.length === 0) return { label: "Add Items", color: "text-muted-foreground", bg: "bg-secondary" };
    const ratio = yourTotal / theirTotal;
    if (ratio < 0.85) return { label: "BIG WIN", color: "text-green", bg: "bg-green/20" };
    if (ratio < 0.95) return { label: "WIN", color: "text-green", bg: "bg-green/20" };
    if (ratio <= 1.05) return { label: "FAIR", color: "text-gold", bg: "bg-gold/20" };
    if (ratio <= 1.15) return { label: "LOSS", color: "text-red", bg: "bg-red/20" };
    return { label: "BIG LOSS", color: "text-red", bg: "bg-red/20" };
  };

  const tradeResult = getTradeResult();

  const addItem = (item: GameItem, side: 'your' | 'their') => {
    if (side === 'your') {
      setYourItems([...yourItems, item]);
      setSearchYour("");
    } else {
      setTheirItems([...theirItems, item]);
      setSearchTheir("");
    }
  };

  const removeItem = (index: number, side: 'your' | 'their') => {
    if (side === 'your') {
      setYourItems(yourItems.filter((_, i) => i !== index));
    } else {
      setTheirItems(theirItems.filter((_, i) => i !== index));
    }
  };

  const clearAll = () => {
    setYourItems([]);
    setTheirItems([]);
  };

  const filteredYourItems = gameItems.filter(item => 
    item.name.toLowerCase().includes(searchYour.toLowerCase())
  );

  const filteredTheirItems = gameItems.filter(item => 
    item.name.toLowerCase().includes(searchTheir.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CalcIcon className="h-10 w-10 text-primary" />
            <h1 className="font-display text-4xl font-bold text-foreground">Trade Calculator</h1>
          </div>
          <p className="text-muted-foreground">Check if your trades are fair</p>
        </div>

        {/* Game Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {games.map((g) => (
            <Button
              key={g.slug}
              variant={selectedGame === g.slug ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedGame(g.slug);
                setYourItems([]);
                setTheirItems([]);
              }}
              className="gap-2"
            >
              <span>{g.items[0]?.imageUrl}</span>
              {g.name}
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Button>
          ))}
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Your Trade */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-green">Your Trade</span>
              <span className="ml-auto text-2xl font-bold text-primary">{formatValue(yourTotal)}</span>
            </h2>

            {/* Search */}
            <div className="relative mb-4">
              <Input
                placeholder="Search items..."
                value={searchYour}
                onChange={(e) => setSearchYour(e.target.value)}
                className="bg-secondary border-border"
              />
              {searchYour && (
                <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
                  {filteredYourItems.slice(0, 10).map((item) => (
                    <button
                      key={item.id}
                      className="w-full px-4 py-2 text-left hover:bg-secondary flex items-center gap-2"
                      onClick={() => addItem(item, 'your')}
                    >
                      <span className="text-xl">{item.imageUrl}</span>
                      <span className="flex-1">{item.name}</span>
                      <span className="text-primary font-medium">{formatValue(item.value)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Items */}
            <div className="space-y-2 min-h-[200px]">
              {yourItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
                  <span className="text-xl">{item.imageUrl}</span>
                  <span className="flex-1 text-sm font-medium">{item.name}</span>
                  <span className="text-primary text-sm">{formatValue(item.value)}</span>
                  <button onClick={() => removeItem(index, 'your')} className="text-destructive hover:text-destructive/80">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {yourItems.length === 0 && (
                <div className="text-center text-muted-foreground py-10">
                  Search and add items above
                </div>
              )}
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col items-center justify-center">
            <div className={cn("w-full max-w-xs p-6 rounded-xl text-center mb-4", tradeResult.bg)}>
              <p className="text-sm text-muted-foreground mb-2">Trade Result</p>
              <p className={cn("font-display text-4xl font-bold", tradeResult.color)}>
                {tradeResult.label}
              </p>
              {yourItems.length > 0 && theirItems.length > 0 && (
                <p className={cn("text-sm mt-2", difference > 0 ? "text-red" : difference < 0 ? "text-green" : "text-muted-foreground")}>
                  {difference > 0 ? `You're overpaying by ${formatValue(difference)}` : 
                   difference < 0 ? `You're getting ${formatValue(Math.abs(difference))} profit` : 
                   "Equal value"}
                </p>
              )}
            </div>
            
            <ArrowLeftRight className="h-8 w-8 text-muted-foreground mb-4" />
            
            <Button variant="outline" onClick={clearAll}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>

          {/* Their Trade */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-accent">Their Trade</span>
              <span className="ml-auto text-2xl font-bold text-primary">{formatValue(theirTotal)}</span>
            </h2>

            {/* Search */}
            <div className="relative mb-4">
              <Input
                placeholder="Search items..."
                value={searchTheir}
                onChange={(e) => setSearchTheir(e.target.value)}
                className="bg-secondary border-border"
              />
              {searchTheir && (
                <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
                  {filteredTheirItems.slice(0, 10).map((item) => (
                    <button
                      key={item.id}
                      className="w-full px-4 py-2 text-left hover:bg-secondary flex items-center gap-2"
                      onClick={() => addItem(item, 'their')}
                    >
                      <span className="text-xl">{item.imageUrl}</span>
                      <span className="flex-1">{item.name}</span>
                      <span className="text-primary font-medium">{formatValue(item.value)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Items */}
            <div className="space-y-2 min-h-[200px]">
              {theirItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
                  <span className="text-xl">{item.imageUrl}</span>
                  <span className="flex-1 text-sm font-medium">{item.name}</span>
                  <span className="text-primary text-sm">{formatValue(item.value)}</span>
                  <button onClick={() => removeItem(index, 'their')} className="text-destructive hover:text-destructive/80">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {theirItems.length === 0 && (
                <div className="text-center text-muted-foreground py-10">
                  Search and add items above
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CalculatorPage;
