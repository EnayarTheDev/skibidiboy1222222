import { Link } from "react-router-dom";

interface GameCardProps {
  name: string;
  slug: string;
  image: string;
  itemCount?: number;
}

export const GameCard = ({ name, slug, image, itemCount }: GameCardProps) => {
  return (
    <Link
      to={`/game/${slug}`}
      className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-display text-lg font-bold text-foreground">{name}</h3>
        {itemCount && (
          <p className="text-sm text-muted-foreground">{itemCount} items</p>
        )}
      </div>
      <div className="absolute top-2 right-2 rounded-full bg-primary/90 px-2 py-1 text-xs font-semibold text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
        View
      </div>
    </Link>
  );
};

export default GameCard;
