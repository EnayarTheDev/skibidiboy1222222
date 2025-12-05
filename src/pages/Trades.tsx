import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { games } from "@/data/gameData";
import { Repeat, Search, Plus, Clock, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Trade {
  id: string;
  user: string;
  game: string;
  offering: string[];
  wanting: string[];
  timestamp: string;
}

const mockTrades: Trade[] = [
  { id: "1", user: "xXDragonSlayerXx", game: "MM2", offering: ["Chroma Luger", "Batwing"], wanting: ["Nik's Scythe"], timestamp: "2 min ago" },
  { id: "2", user: "ProTrader99", game: "Jailbreak", offering: ["Torpedo"], wanting: ["Brulee", "Javelin"], timestamp: "5 min ago" },
  { id: "3", user: "FruitMaster", game: "Blox Fruits", offering: ["Leopard"], wanting: ["Dragon", "Dough"], timestamp: "8 min ago" },
  { id: "4", user: "PetCollector", game: "Adopt Me", offering: ["Shadow Dragon"], wanting: ["Bat Dragon", "Owl"], timestamp: "12 min ago" },
  { id: "5", user: "BladeKing", game: "Blade Ball", offering: ["Inferno", "Titanic"], wanting: ["Shadow Step"], timestamp: "15 min ago" },
  { id: "6", user: "MM2Legend", game: "MM2", offering: ["Corrupt", "Eternal IV"], wanting: ["Chroma Fang"], timestamp: "20 min ago" },
  { id: "7", user: "JailbreakPro", game: "Jailbreak", offering: ["HyperBlue L5"], wanting: ["HyperDiamond L5"], timestamp: "25 min ago" },
  { id: "8", user: "GardenGuru", game: "Grow a Garden", offering: ["Rainbow Flower", "Crystal Rose"], wanting: ["Magic Watering Can"], timestamp: "30 min ago" },
];

const TradesPage = () => {
  const [selectedGame, setSelectedGame] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrades = mockTrades.filter(trade => {
    if (selectedGame !== "all" && trade.game.toLowerCase() !== selectedGame.toLowerCase()) return false;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        trade.user.toLowerCase().includes(searchLower) ||
        trade.offering.some(item => item.toLowerCase().includes(searchLower)) ||
        trade.wanting.some(item => item.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Repeat className="h-10 w-10 text-accent" />
            <h1 className="font-display text-4xl font-bold text-foreground">Trade Finder</h1>
          </div>
          <p className="text-muted-foreground">Find and post trades with other players</p>
        </div>

        {/* Post Trade Button */}
        <div className="flex justify-center mb-8">
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            <Plus className="h-5 w-5 mr-2" />
            Post a Trade
          </Button>
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
              variant={selectedGame === "blox fruits" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGame("blox fruits")}
            >
              🐉 Blox Fruits
            </Button>
            <Button
              variant={selectedGame === "adopt me" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGame("adopt me")}
            >
              🐲 Adopt Me
            </Button>
            <Button
              variant={selectedGame === "blade ball" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGame("blade ball")}
            >
              ⚔️ Blade Ball
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by user or items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
        </div>

        {/* Trades List */}
        <div className="space-y-4">
          {filteredTrades.map((trade) => (
            <div
              key={trade.id}
              className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* User Info */}
                <div className="flex items-center gap-3 md:w-48">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{trade.user}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {trade.timestamp}
                    </div>
                  </div>
                </div>

                {/* Trade Details */}
                <div className="flex-1 flex flex-col md:flex-row items-center gap-4">
                  {/* Offering */}
                  <div className="flex-1 w-full">
                    <p className="text-xs text-muted-foreground mb-2">OFFERING</p>
                    <div className="flex flex-wrap gap-2">
                      {trade.offering.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-green/20 text-green rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />

                  {/* Wanting */}
                  <div className="flex-1 w-full">
                    <p className="text-xs text-muted-foreground mb-2">WANTING</p>
                    <div className="flex flex-wrap gap-2">
                      {trade.wanting.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Game Badge & Action */}
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-secondary text-muted-foreground rounded-full text-sm">
                    {trade.game}
                  </span>
                  <Button size="sm">Message</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTrades.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No trades found matching your search.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TradesPage;
