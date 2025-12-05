import { GameCard } from "./GameCard";

const games = [
  {
    name: "Murder Mystery 2",
    slug: "mm2",
    image: "https://tr.rbxcdn.com/180DAY-2fc5e2f4c01bd51d56f9fa1a789455f6/768/432/Image/Png/noFilter",
    itemCount: 850,
  },
  {
    name: "Blade Ball",
    slug: "bladeball",
    image: "https://tr.rbxcdn.com/180DAY-d39c3bf64a0d11e86f74a98da396f4cf/768/432/Image/Png/noFilter",
    itemCount: 420,
  },
  {
    name: "Blox Fruits",
    slug: "bloxfruits",
    image: "https://tr.rbxcdn.com/180DAY-c16d60dbfd5def8c3c32bf40cfb1fe51/768/432/Image/Png/noFilter",
    itemCount: 650,
  },
  {
    name: "Grow a Garden",
    slug: "growagarden",
    image: "https://tr.rbxcdn.com/180DAY-a5b69f52bf6c11f6c3bfe70b97c4fc2a/768/432/Image/Png/noFilter",
    itemCount: 280,
  },
  {
    name: "Pet Simulator 99",
    slug: "petsim99",
    image: "https://tr.rbxcdn.com/180DAY-5c7a0bab17c20aede56a1bdf7e1b8c8e/768/432/Image/Png/noFilter",
    itemCount: 1200,
  },
  {
    name: "Adopt Me",
    slug: "adoptme",
    image: "https://tr.rbxcdn.com/180DAY-63cbdd0e3c64ecec8b03e5c59a4c5ad3/768/432/Image/Png/noFilter",
    itemCount: 980,
  },
];

export const GamesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Games</h2>
            <p className="text-muted-foreground">Select a game to view item values</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {games.map((game) => (
            <GameCard key={game.slug} {...game} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
