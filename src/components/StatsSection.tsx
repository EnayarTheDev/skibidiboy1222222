import { Users, Activity, Shield, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "5,000+",
    label: "Daily Active Users",
  },
  {
    icon: Activity,
    value: "15,000+",
    label: "Trades Tracked Daily",
  },
  {
    icon: Shield,
    value: "99.5%",
    label: "Value Accuracy Rate",
  },
  {
    icon: TrendingUp,
    value: "24/7",
    label: "Real-Time Updates",
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 border-y border-border bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Trusted by Thousands of Traders Daily
          </h2>
          <p className="text-muted-foreground">
            Join the largest community of Roblox traders
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center p-6 rounded-xl bg-card border border-border"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
