import { ArrowDown, ArrowUp, Clock, Flame } from "lucide-react";

interface ValueChange {
  id: string;
  itemName: string;
  game: string;
  oldValue: number;
  newValue: number;
  change: number;
  timestamp: string;
}

const recentChanges: ValueChange[] = [
  { id: "1", itemName: "Chroma Luger", game: "MM2", oldValue: 180, newValue: 210, change: 16.67, timestamp: "2h ago" },
  { id: "2", itemName: "Dragon Fruit", game: "Blox Fruits", oldValue: 2500, newValue: 2200, change: -12, timestamp: "3h ago" },
  { id: "3", itemName: "Inferno Blade", game: "Blade Ball", oldValue: 450, newValue: 520, change: 15.56, timestamp: "5h ago" },
  { id: "4", itemName: "Huge Cat", game: "Pet Sim 99", oldValue: 8500, newValue: 9200, change: 8.24, timestamp: "6h ago" },
  { id: "5", itemName: "Godly Seed", game: "Grow a Garden", oldValue: 150, newValue: 125, change: -16.67, timestamp: "8h ago" },
  { id: "6", itemName: "Chroma Fang", game: "MM2", oldValue: 220, newValue: 245, change: 11.36, timestamp: "10h ago" },
];

export const ValueChanges = () => {
  return (
    <section className="py-16 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Flame className="h-8 w-8 text-primary" />
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">Recent Value Changes</h2>
            <p className="text-muted-foreground">Stay updated with the latest market movements</p>
          </div>
        </div>

        <div className="grid gap-3">
          {recentChanges.map((change) => (
            <div
              key={change.id}
              className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${change.change >= 0 ? 'bg-accent/20' : 'bg-destructive/20'}`}>
                  {change.change >= 0 ? (
                    <ArrowUp className="h-5 w-5 text-accent" />
                  ) : (
                    <ArrowDown className="h-5 w-5 text-destructive" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{change.itemName}</h3>
                  <p className="text-sm text-muted-foreground">{change.game}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {change.oldValue} → {change.newValue}
                  </p>
                  <p className={`font-semibold ${change.change >= 0 ? 'text-accent' : 'text-destructive'}`}>
                    {change.change >= 0 ? '+' : ''}{change.change.toFixed(2)}%
                  </p>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{change.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueChanges;
