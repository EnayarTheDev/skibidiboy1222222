import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GameItem, formatValue } from "@/data/gameData";
import { TrendingUp, TrendingDown, Minus, Calendar, BarChart3 } from "lucide-react";
import ItemPriceChart from "./ItemPriceChart";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface ItemDetailModalProps {
  item: GameItem | null;
  gameName?: string;
  open: boolean;
  onClose: () => void;
}

// Generate mock price history based on current value and trend
const generatePriceHistory = (item: GameItem) => {
  const days = 30;
  const history = [];
  let currentValue = item.value;
  
  // Work backwards from current value
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some variation based on trend
    const variation = item.trend === 'rising' ? -0.02 : item.trend === 'falling' ? 0.02 : 0;
    const randomness = (Math.random() - 0.5) * 0.08;
    const multiplier = 1 + (variation * (i / days)) + randomness;
    
    history.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(currentValue * multiplier),
    });
  }
  
  // Ensure last value matches current
  history[history.length - 1].value = item.value;
  
  return history;
};

const ItemDetailModal = ({ item, gameName, open, onClose }: ItemDetailModalProps) => {
  const priceHistory = useMemo(() => item ? generatePriceHistory(item) : [], [item]);
  
  if (!item) return null;

  const TrendIcon = item.trend === 'rising' ? TrendingUp : item.trend === 'falling' ? TrendingDown : Minus;
  const trendClass = item.trend === 'rising' ? 'text-green' : item.trend === 'falling' ? 'text-red' : 'text-muted-foreground';
  const demandColor = item.demand >= 8 ? 'text-green' : item.demand >= 5 ? 'text-gold' : 'text-red';

  // Calculate stats
  const highValue = Math.max(...priceHistory.map(p => p.value));
  const lowValue = Math.min(...priceHistory.map(p => p.value));
  const avgValue = Math.round(priceHistory.reduce((a, b) => a + b.value, 0) / priceHistory.length);
  const changePercent = ((priceHistory[priceHistory.length - 1].value - priceHistory[0].value) / priceHistory[0].value * 100).toFixed(1);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-4xl">{item.imageUrl}</span>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">{item.name}</h2>
              {gameName && <p className="text-sm text-muted-foreground">{gameName}</p>}
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Current Value */}
        <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
          <div>
            <p className="text-sm text-muted-foreground">Current Value</p>
            <p className="font-display text-3xl font-bold text-primary">{formatValue(item.value)}</p>
          </div>
          <div className={cn("flex items-center gap-1 px-3 py-1 rounded-full", 
            item.trend === 'rising' ? 'bg-green/20' : item.trend === 'falling' ? 'bg-red/20' : 'bg-secondary'
          )}>
            <TrendIcon className={cn("h-4 w-4", trendClass)} />
            <span className={cn("font-medium", trendClass)}>
              {changePercent}%
            </span>
          </div>
        </div>

        {/* Price Chart */}
        <div className="bg-secondary/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">30 Day Price History</span>
          </div>
          <ItemPriceChart data={priceHistory} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-secondary rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">30D High</p>
            <p className="font-display font-bold text-green">{formatValue(highValue)}</p>
          </div>
          <div className="bg-secondary rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">30D Low</p>
            <p className="font-display font-bold text-red">{formatValue(lowValue)}</p>
          </div>
          <div className="bg-secondary rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Average</p>
            <p className="font-display font-bold text-foreground">{formatValue(avgValue)}</p>
          </div>
          <div className="bg-secondary rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Demand</p>
            <p className={cn("font-display font-bold", demandColor)}>{item.demand}/10</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Last updated: Today</span>
          </div>
          <span className="px-2 py-1 bg-secondary rounded text-xs">{item.category}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailModal;
