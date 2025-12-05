import { Database, LineChart, Zap } from "lucide-react";

const steps = [
  {
    icon: Database,
    number: "1",
    title: "Data Collection",
    description: "We monitor thousands of trades across multiple servers and trading communities. Our automated systems capture real-time pricing data 24/7.",
  },
  {
    icon: LineChart,
    number: "2",
    title: "Value Analysis",
    description: "Our algorithms analyze trade patterns, demand trends, and historical data to calculate accurate item values and predict market movements.",
  },
  {
    icon: Zap,
    number: "3",
    title: "Real-Time Updates",
    description: "Values are updated continuously throughout the day, ensuring you always have the most current market information for your trades.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How Roblox Values Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform provides the most accurate item values through a transparent, data-driven methodology
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                {/* Connector line (hidden on mobile and last item) */}
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-border -z-10 last:hidden" />
                
                <div className="flex flex-col items-center text-center">
                  {/* Step number */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground font-display font-bold flex items-center justify-center text-sm">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
