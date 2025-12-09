import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Plus, Check, BarChart3 } from "lucide-react";
import { GameItem, formatValue } from "@/data/gameData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useInventory } from "@/hooks/useInventory";
import { toast } from "@/hooks/use-toast";
import ItemDetailModal from "./ItemDetailModal";

interface ItemCardProps {
  item: GameItem;
  showGame?: boolean;
  gameName?: string;
  gameId?: string;
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
  vintage: { label: 'Vintage', className: 'badge-legendary' },
};

const ItemCard = ({ item, showGame, gameName, gameId }: ItemCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const { addItem, isInInventory, getQuantity } = useInventory();
  const rarityInfo = rarityConfig[item.rarity] || rarityConfig.common;
  
  const TrendIcon = item.trend === 'rising' ? TrendingUp : item.trend === 'falling' ? TrendingDown : Minus;
  const trendClass = item.trend === 'rising' ? 'trend-rising' : item.trend === 'falling' ? 'trend-falling' : 'trend-stable';

  const demandColor = item.demand >= 8 ? 'text-green' : item.demand >= 5 ? 'text-gold' : 'text-red';

  const inInventory = gameId ? isInInventory(item.id, gameId) : false;
  const quantity = gameId ? getQuantity(item.id, gameId) : 0;

  const handleAddToInventory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (gameId) {
      addItem(item.id, gameId, 1);
      toast({
        title: "Added to Inventory",
        description: `${item.name} has been added to your inventory.`,
      });
    }
  };

  const isEmoji = !item.imageUrl.startsWith('http');

  return (
    <>
      <div 
        className={cn(
          "group relative bg-card border border-border rounded-xl p-4 card-hover cursor-pointer",
          inInventory && "border-primary/50"
        )}
        onClick={() => setShowModal(true)}
      >
        {/* Chart Icon */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <BarChart3 className="h-4 w-4 text-primary" />
        </div>

        {/* In Inventory Badge */}
        {inInventory && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Check className="w-3 h-3" />
            {quantity > 1 && `x${quantity}`}
          </div>
        )}

        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          {showGame && gameName && (
            <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded mb-2">
              {gameName}
            </span>
          )}

          <div className="w-16 h-16 rounded-lg mb-3 bg-secondary/50 flex items-center justify-center overflow-hidden">
            <span className="text-4xl">{isEmoji ? item.imageUrl : '📦'}</span>
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

          {item.lastChange !== 0 && item.lastChange !== undefined && (
            <div className={cn("text-xs mb-2", item.lastChange > 0 ? "text-green" : "text-red")}>
              {item.lastChange > 0 ? '+' : ''}{formatValue(item.lastChange)}
            </div>
          )}

          {gameId && (
            <Button
              size="sm"
              variant="outline"
              className="w-full h-7 text-xs mt-1"
              onClick={handleAddToInventory}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add to Inventory
            </Button>
          )}
        </div>
      </div>

      <ItemDetailModal
        item={item}
        gameName={gameName}
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default ItemCard;
