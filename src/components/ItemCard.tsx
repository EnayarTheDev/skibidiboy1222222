import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type Rarity = 'legendary' | 'epic' | 'rare' | 'common';
type Trend = 'rising' | 'falling' | 'stable';

interface ItemCardProps {
  name: string;
  valueRange: string;
  rarity: Rarity;
  trend: Trend;
  description: string;
  imageUrl?: string;
}

const rarityConfig = {
  legendary: { label: 'Legendary', className: 'badge-legendary' },
  epic: { label: 'Epic', className: 'badge-epic' },
  rare: { label: 'Rare', className: 'badge-rare' },
  common: { label: 'Common', className: 'badge-common' },
};

const trendConfig = {
  rising: { label: 'Rising', className: 'trend-rising', icon: TrendingUp },
  falling: { label: 'Falling', className: 'trend-falling', icon: TrendingDown },
  stable: { label: 'Stable', className: 'trend-stable', icon: Minus },
};

const ItemCard = ({ name, valueRange, rarity, trend, description, imageUrl }: ItemCardProps) => {
  const rarityInfo = rarityConfig[rarity];
  const trendInfo = trendConfig[trend];
  const TrendIcon = trendInfo.icon;

  return (
    <div className="group relative bg-card border border-border rounded-xl p-6 card-hover cursor-pointer">
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Item Image Placeholder */}
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-20 h-20 rounded-lg mb-4 object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-lg mb-4 bg-secondary flex items-center justify-center">
            <span className="text-3xl">🚗</span>
          </div>
        )}

        {/* Rarity Badge */}
        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-3 ${rarityInfo.className}`}>
          {rarityInfo.label}
        </span>

        {/* Item Name */}
        <h3 className="font-display font-semibold text-primary text-lg mb-2">
          {name}
        </h3>

        {/* Value Range */}
        <p className="font-display text-2xl font-bold text-foreground mb-3">
          {valueRange}
        </p>

        {/* Trend Badge */}
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ${trendInfo.className}`}>
          <TrendIcon className="w-3.5 h-3.5" />
          {trendInfo.label}
        </span>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
