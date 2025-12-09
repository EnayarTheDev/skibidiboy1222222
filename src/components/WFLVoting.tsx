import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { games, GameItem, formatValue, getGameBySlug } from "@/data/gameData";
import { ThumbsUp, ThumbsDown, Minus, Plus, Trash2, Send, Trophy, TrendingDown, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface WFLTrade {
  id: string;
  user: string;
  game: string;
  yourItems: GameItem[];
  theirItems: GameItem[];
  votes: { win: number; fair: number; loss: number };
  userVote?: 'win' | 'fair' | 'loss';
  timestamp: string;
}

const mockTrades: WFLTrade[] = [
  {
    id: "wfl1",
    user: "TraderPro",
    game: "mm2",
    yourItems: [games[0].items[0], games[0].items[4]],
    theirItems: [games[0].items[2]],
    votes: { win: 45, fair: 12, loss: 3 },
    timestamp: "10 min ago"
  },
  {
    id: "wfl2",
    user: "JailbreakKing",
    game: "jailbreak",
    yourItems: [games[1].items[2]],
    theirItems: [games[1].items[3], games[1].items[5]],
    votes: { win: 8, fair: 34, loss: 18 },
    timestamp: "25 min ago"
  },
  {
    id: "wfl3",
    user: "FruitMaster",
    game: "bloxfruits",
    yourItems: [games[2].items[0]],
    theirItems: [games[2].items[1], games[2].items[2]],
    votes: { win: 5, fair: 8, loss: 47 },
    timestamp: "1 hour ago"
  },
];

const WFLVoting = () => {
  const [trades, setTrades] = useState<WFLTrade[]>(mockTrades);
  const [showSubmit, setShowSubmit] = useState(false);
  const [selectedGame, setSelectedGame] = useState(games[0].slug);
  const [yourItems, setYourItems] = useState<GameItem[]>([]);
  const [theirItems, setTheirItems] = useState<GameItem[]>([]);
  const [searchYour, setSearchYour] = useState("");
  const [searchTheir, setSearchTheir] = useState("");

  const game = getGameBySlug(selectedGame);
  const gameItems = game?.items || [];

  const vote = (tradeId: string, voteType: 'win' | 'fair' | 'loss') => {
    setTrades(trades.map(trade => {
      if (trade.id === tradeId) {
        const oldVote = trade.userVote;
        const newVotes = { ...trade.votes };
        
        if (oldVote) {
          newVotes[oldVote]--;
        }
        newVotes[voteType]++;
        
        return { ...trade, votes: newVotes, userVote: voteType };
      }
      return trade;
    }));
  };

  const getVotePercentage = (trade: WFLTrade, type: 'win' | 'fair' | 'loss') => {
    const total = trade.votes.win + trade.votes.fair + trade.votes.loss;
    if (total === 0) return 0;
    return Math.round((trade.votes[type] / total) * 100);
  };

  const getWinningVote = (trade: WFLTrade) => {
    const { win, fair, loss } = trade.votes;
    if (win >= fair && win >= loss) return 'win';
    if (fair >= win && fair >= loss) return 'fair';
    return 'loss';
  };

  const addItem = (item: GameItem, side: 'your' | 'their') => {
    if (side === 'your') {
      setYourItems([...yourItems, item]);
      setSearchYour("");
    } else {
      setTheirItems([...theirItems, item]);
      setSearchTheir("");
    }
  };

  const submitTrade = () => {
    if (yourItems.length === 0 || theirItems.length === 0) {
      toast({ title: "Error", description: "Add items to both sides", variant: "destructive" });
      return;
    }

    const newTrade: WFLTrade = {
      id: `wfl-${Date.now()}`,
      user: "You",
      game: selectedGame,
      yourItems: [...yourItems],
      theirItems: [...theirItems],
      votes: { win: 0, fair: 0, loss: 0 },
      timestamp: "Just now"
    };

    setTrades([newTrade, ...trades]);
    setYourItems([]);
    setTheirItems([]);
    setShowSubmit(false);
    toast({ title: "Trade Submitted!", description: "Wait for the community to vote" });
  };

  const filteredYour = gameItems.filter(i => i.name.toLowerCase().includes(searchYour.toLowerCase()));
  const filteredTheir = gameItems.filter(i => i.name.toLowerCase().includes(searchTheir.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Submit New Trade */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-bold text-foreground">Submit a Trade for Voting</h3>
          <Button 
            variant={showSubmit ? "secondary" : "default"} 
            size="sm"
            onClick={() => setShowSubmit(!showSubmit)}
          >
            {showSubmit ? "Cancel" : <><Plus className="h-4 w-4 mr-1" /> New Trade</>}
          </Button>
        </div>

        {showSubmit && (
          <div className="space-y-4">
            {/* Game Selector */}
            <div className="flex flex-wrap gap-2">
              {games.map(g => (
                <Button
                  key={g.slug}
                  variant={selectedGame === g.slug ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setSelectedGame(g.slug); setYourItems([]); setTheirItems([]); }}
                >
                  {g.items[0]?.imageUrl} {g.name}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Your Side */}
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-sm font-medium text-green mb-2">Your Items</p>
                <div className="relative mb-2">
                  <Input
                    placeholder="Search..."
                    value={searchYour}
                    onChange={e => setSearchYour(e.target.value)}
                    className="bg-secondary border-border h-8 text-sm"
                  />
                  {searchYour && (
                    <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-40 overflow-auto">
                      {filteredYour.slice(0, 5).map(item => (
                        <button
                          key={item.id}
                          className="w-full px-3 py-1.5 text-left hover:bg-secondary flex items-center gap-2 text-sm"
                          onClick={() => addItem(item, 'your')}
                        >
                          <span>{item.imageUrl}</span>
                          <span className="flex-1">{item.name}</span>
                          <span className="text-primary text-xs">{formatValue(item.value)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-1 min-h-[60px]">
                  {yourItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm bg-secondary rounded px-2 py-1">
                      <span>{item.imageUrl}</span>
                      <span className="flex-1 truncate">{item.name}</span>
                      <button onClick={() => setYourItems(yourItems.filter((_, idx) => idx !== i))} className="text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Their Side */}
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-sm font-medium text-accent mb-2">Their Items</p>
                <div className="relative mb-2">
                  <Input
                    placeholder="Search..."
                    value={searchTheir}
                    onChange={e => setSearchTheir(e.target.value)}
                    className="bg-secondary border-border h-8 text-sm"
                  />
                  {searchTheir && (
                    <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-40 overflow-auto">
                      {filteredTheir.slice(0, 5).map(item => (
                        <button
                          key={item.id}
                          className="w-full px-3 py-1.5 text-left hover:bg-secondary flex items-center gap-2 text-sm"
                          onClick={() => addItem(item, 'their')}
                        >
                          <span>{item.imageUrl}</span>
                          <span className="flex-1">{item.name}</span>
                          <span className="text-primary text-xs">{formatValue(item.value)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-1 min-h-[60px]">
                  {theirItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm bg-secondary rounded px-2 py-1">
                      <span>{item.imageUrl}</span>
                      <span className="flex-1 truncate">{item.name}</span>
                      <button onClick={() => setTheirItems(theirItems.filter((_, idx) => idx !== i))} className="text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button onClick={submitTrade} className="w-full">
              <Send className="h-4 w-4 mr-2" /> Submit for W/F/L
            </Button>
          </div>
        )}
      </div>

      {/* Trades List */}
      <div className="space-y-4">
        {trades.map(trade => {
          const winPercent = getVotePercentage(trade, 'win');
          const fairPercent = getVotePercentage(trade, 'fair');
          const lossPercent = getVotePercentage(trade, 'loss');
          const winner = getWinningVote(trade);

          return (
            <div key={trade.id} className="bg-card rounded-xl border border-border p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{trade.user}</span>
                  <span className="text-xs text-muted-foreground">• {trade.timestamp}</span>
                </div>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-bold",
                  winner === 'win' ? "bg-green/20 text-green" :
                  winner === 'fair' ? "bg-gold/20 text-gold" :
                  "bg-red/20 text-red"
                )}>
                  {winner.toUpperCase()}
                </span>
              </div>

              {/* Trade Items */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 flex flex-wrap gap-1">
                  {trade.yourItems.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-green/10 border border-green/30 rounded text-xs">
                      {item.imageUrl} {item.name}
                    </span>
                  ))}
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="flex-1 flex flex-wrap gap-1">
                  {trade.theirItems.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 border border-accent/30 rounded text-xs">
                      {item.imageUrl} {item.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vote Bars */}
              <div className="h-2 rounded-full overflow-hidden flex mb-3 bg-secondary">
                <div className="bg-green h-full transition-all" style={{ width: `${winPercent}%` }} />
                <div className="bg-gold h-full transition-all" style={{ width: `${fairPercent}%` }} />
                <div className="bg-red h-full transition-all" style={{ width: `${lossPercent}%` }} />
              </div>

              {/* Vote Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn("flex-1", trade.userVote === 'win' && "border-green text-green bg-green/10")}
                  onClick={() => vote(trade.id, 'win')}
                >
                  <Trophy className="h-4 w-4 mr-1" />
                  Win {winPercent}%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn("flex-1", trade.userVote === 'fair' && "border-gold text-gold bg-gold/10")}
                  onClick={() => vote(trade.id, 'fair')}
                >
                  <Scale className="h-4 w-4 mr-1" />
                  Fair {fairPercent}%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn("flex-1", trade.userVote === 'loss' && "border-red text-red bg-red/10")}
                  onClick={() => vote(trade.id, 'loss')}
                >
                  <TrendingDown className="h-4 w-4 mr-1" />
                  Loss {lossPercent}%
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WFLVoting;
