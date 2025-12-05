export interface GameItem {
  id: string;
  name: string;
  value: number;
  demand: number; // 1-10
  rarity: 'chroma' | 'godly' | 'ancient' | 'legendary' | 'epic' | 'rare' | 'uncommon' | 'common';
  trend: 'rising' | 'falling' | 'stable';
  category: string;
  imageUrl: string;
  lastChange?: number;
}

export interface Game {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  color: string;
  items: GameItem[];
  categories: string[];
}

export const games: Game[] = [
  {
    id: "mm2",
    name: "Murder Mystery 2",
    slug: "mm2",
    description: "Trade knives and guns with accurate values",
    imageUrl: "https://tr.rbxcdn.com/180DAY-c5c90b0c3e1c7bc9d2d9e3f8d4e5a6b7/768/432/Image/Webp/noFilter",
    color: "red",
    categories: ["All", "Godlies", "Ancients", "Chromas", "Legendaries", "Rares", "Pets"],
    items: [
      { id: "mm2-1", name: "Chroma Luger", value: 180, demand: 9, rarity: "chroma", trend: "stable", category: "Chromas", imageUrl: "🔫", lastChange: 0 },
      { id: "mm2-2", name: "Chroma Fang", value: 165, demand: 8, rarity: "chroma", trend: "rising", category: "Chromas", imageUrl: "🗡️", lastChange: 5 },
      { id: "mm2-3", name: "Nik's Scythe", value: 1500, demand: 10, rarity: "ancient", trend: "stable", category: "Ancients", imageUrl: "⚔️", lastChange: 0 },
      { id: "mm2-4", name: "Elderwood Scythe", value: 145, demand: 7, rarity: "ancient", trend: "falling", category: "Ancients", imageUrl: "🪓", lastChange: -10 },
      { id: "mm2-5", name: "Corrupt", value: 135, demand: 8, rarity: "godly", trend: "stable", category: "Godlies", imageUrl: "🔪", lastChange: 0 },
      { id: "mm2-6", name: "Eternal IV", value: 125, demand: 7, rarity: "godly", trend: "rising", category: "Godlies", imageUrl: "⚔️", lastChange: 8 },
      { id: "mm2-7", name: "Amerilaser", value: 45, demand: 6, rarity: "legendary", trend: "stable", category: "Legendaries", imageUrl: "🔫", lastChange: 0 },
      { id: "mm2-8", name: "Batwing", value: 95, demand: 8, rarity: "godly", trend: "rising", category: "Godlies", imageUrl: "🦇", lastChange: 5 },
      { id: "mm2-9", name: "Chill", value: 25, demand: 5, rarity: "legendary", trend: "stable", category: "Legendaries", imageUrl: "❄️", lastChange: 0 },
      { id: "mm2-10", name: "Ghostblade", value: 55, demand: 6, rarity: "godly", trend: "falling", category: "Godlies", imageUrl: "👻", lastChange: -3 },
    ]
  },
  {
    id: "jailbreak",
    name: "Jailbreak",
    slug: "jailbreak",
    description: "Vehicle and item trading values",
    imageUrl: "https://tr.rbxcdn.com/180DAY-a1b2c3d4e5f6g7h8i9j0/768/432/Image/Webp/noFilter",
    color: "blue",
    categories: ["All", "Vehicles", "Spoilers", "Rims", "Textures", "Colors", "Hypers"],
    items: [
      { id: "jb-1", name: "HyperDiamond L5", value: 70000000, demand: 10, rarity: "legendary", trend: "stable", category: "Hypers", imageUrl: "💎", lastChange: 0 },
      { id: "jb-2", name: "HyperBlue L5", value: 61000000, demand: 9, rarity: "legendary", trend: "rising", category: "Hypers", imageUrl: "💙", lastChange: 2000000 },
      { id: "jb-3", name: "Torpedo", value: 49000000, demand: 10, rarity: "legendary", trend: "stable", category: "Vehicles", imageUrl: "🚗", lastChange: 0 },
      { id: "jb-4", name: "Javelin", value: 41000000, demand: 9, rarity: "legendary", trend: "rising", category: "Vehicles", imageUrl: "🏎️", lastChange: 1500000 },
      { id: "jb-5", name: "Brulee", value: 38000000, demand: 9, rarity: "legendary", trend: "stable", category: "Vehicles", imageUrl: "🚙", lastChange: 0 },
      { id: "jb-6", name: "Beam Hybrid", value: 25000000, demand: 8, rarity: "epic", trend: "falling", category: "Vehicles", imageUrl: "⚡", lastChange: -500000 },
      { id: "jb-7", name: "Arachnid", value: 18000000, demand: 8, rarity: "epic", trend: "stable", category: "Vehicles", imageUrl: "🕷️", lastChange: 0 },
      { id: "jb-8", name: "Checker", value: 10500000, demand: 7, rarity: "rare", trend: "rising", category: "Textures", imageUrl: "🏁", lastChange: 300000 },
      { id: "jb-9", name: "Void", value: 11000000, demand: 7, rarity: "rare", trend: "stable", category: "Colors", imageUrl: "⬛", lastChange: 0 },
      { id: "jb-10", name: "Pixel", value: 8500000, demand: 6, rarity: "rare", trend: "falling", category: "Textures", imageUrl: "🎮", lastChange: -200000 },
    ]
  },
  {
    id: "bloxfruits",
    name: "Blox Fruits",
    slug: "bloxfruits",
    description: "Fruit and gamepass trading values",
    imageUrl: "https://tr.rbxcdn.com/180DAY-b2c3d4e5f6g7h8i9j0k1/768/432/Image/Webp/noFilter",
    color: "orange",
    categories: ["All", "Mythical", "Legendary", "Rare", "Uncommon", "Common", "Gamepasses"],
    items: [
      { id: "bf-1", name: "Leopard", value: 5000000, demand: 10, rarity: "legendary", trend: "stable", category: "Mythical", imageUrl: "🐆", lastChange: 0 },
      { id: "bf-2", name: "Dragon", value: 3500000, demand: 9, rarity: "legendary", trend: "rising", category: "Mythical", imageUrl: "🐉", lastChange: 200000 },
      { id: "bf-3", name: "Dough", value: 2800000, demand: 9, rarity: "legendary", trend: "stable", category: "Mythical", imageUrl: "🍩", lastChange: 0 },
      { id: "bf-4", name: "Spirit", value: 1500000, demand: 8, rarity: "legendary", trend: "falling", category: "Mythical", imageUrl: "👻", lastChange: -100000 },
      { id: "bf-5", name: "Control", value: 900000, demand: 7, rarity: "epic", trend: "stable", category: "Legendary", imageUrl: "🎮", lastChange: 0 },
      { id: "bf-6", name: "Venom", value: 750000, demand: 8, rarity: "epic", trend: "rising", category: "Legendary", imageUrl: "🐍", lastChange: 50000 },
      { id: "bf-7", name: "Rumble", value: 450000, demand: 6, rarity: "rare", trend: "stable", category: "Legendary", imageUrl: "⚡", lastChange: 0 },
      { id: "bf-8", name: "Buddha", value: 1200000, demand: 9, rarity: "epic", trend: "rising", category: "Legendary", imageUrl: "🧘", lastChange: 100000 },
    ]
  },
  {
    id: "adoptme",
    name: "Adopt Me",
    slug: "adoptme",
    description: "Pet and item trading values",
    imageUrl: "https://tr.rbxcdn.com/180DAY-c3d4e5f6g7h8i9j0k1l2/768/432/Image/Webp/noFilter",
    color: "pink",
    categories: ["All", "Legendary Pets", "Ultra Rare", "Rare", "Uncommon", "Common", "Eggs", "Vehicles"],
    items: [
      { id: "am-1", name: "Shadow Dragon", value: 1000, demand: 10, rarity: "legendary", trend: "stable", category: "Legendary Pets", imageUrl: "🐲", lastChange: 0 },
      { id: "am-2", name: "Bat Dragon", value: 850, demand: 10, rarity: "legendary", trend: "rising", category: "Legendary Pets", imageUrl: "🦇", lastChange: 25 },
      { id: "am-3", name: "Frost Dragon", value: 650, demand: 9, rarity: "legendary", trend: "stable", category: "Legendary Pets", imageUrl: "❄️", lastChange: 0 },
      { id: "am-4", name: "Giraffe", value: 800, demand: 9, rarity: "legendary", trend: "falling", category: "Legendary Pets", imageUrl: "🦒", lastChange: -15 },
      { id: "am-5", name: "Owl", value: 550, demand: 9, rarity: "legendary", trend: "stable", category: "Legendary Pets", imageUrl: "🦉", lastChange: 0 },
      { id: "am-6", name: "Parrot", value: 450, demand: 8, rarity: "legendary", trend: "rising", category: "Legendary Pets", imageUrl: "🦜", lastChange: 20 },
      { id: "am-7", name: "Evil Unicorn", value: 400, demand: 8, rarity: "legendary", trend: "stable", category: "Legendary Pets", imageUrl: "🦄", lastChange: 0 },
      { id: "am-8", name: "Crow", value: 380, demand: 7, rarity: "legendary", trend: "falling", category: "Legendary Pets", imageUrl: "🐦‍⬛", lastChange: -10 },
    ]
  },
  {
    id: "petsim99",
    name: "Pet Simulator 99",
    slug: "petsim99",
    description: "Pet and item trading values",
    imageUrl: "https://tr.rbxcdn.com/180DAY-d4e5f6g7h8i9j0k1l2m3/768/432/Image/Webp/noFilter",
    color: "yellow",
    categories: ["All", "Huge", "Titanic", "Exclusive", "Event", "Basic"],
    items: [
      { id: "ps-1", name: "Huge Hacked Cat", value: 500000000, demand: 10, rarity: "legendary", trend: "stable", category: "Huge", imageUrl: "🐱", lastChange: 0 },
      { id: "ps-2", name: "Titanic Balloon Cat", value: 350000000, demand: 9, rarity: "legendary", trend: "rising", category: "Titanic", imageUrl: "🎈", lastChange: 15000000 },
      { id: "ps-3", name: "Huge Pixel Cat", value: 280000000, demand: 9, rarity: "legendary", trend: "stable", category: "Huge", imageUrl: "🎮", lastChange: 0 },
      { id: "ps-4", name: "Huge Cupcake", value: 150000000, demand: 8, rarity: "epic", trend: "falling", category: "Huge", imageUrl: "🧁", lastChange: -8000000 },
      { id: "ps-5", name: "Titanic Jolly Cat", value: 120000000, demand: 8, rarity: "epic", trend: "stable", category: "Titanic", imageUrl: "🎄", lastChange: 0 },
    ]
  },
  {
    id: "bladeball",
    name: "Blade Ball",
    slug: "bladeball",
    description: "Sword and ability trading values",
    imageUrl: "https://tr.rbxcdn.com/180DAY-e5f6g7h8i9j0k1l2m3n4/768/432/Image/Webp/noFilter",
    color: "cyan",
    categories: ["All", "Mythic", "Legendary", "Epic", "Rare", "Abilities"],
    items: [
      { id: "bb-1", name: "Inferno", value: 85000, demand: 10, rarity: "legendary", trend: "rising", category: "Mythic", imageUrl: "🔥", lastChange: 5000 },
      { id: "bb-2", name: "Titanic", value: 72000, demand: 9, rarity: "legendary", trend: "stable", category: "Mythic", imageUrl: "⚔️", lastChange: 0 },
      { id: "bb-3", name: "Eternal", value: 55000, demand: 8, rarity: "epic", trend: "falling", category: "Legendary", imageUrl: "✨", lastChange: -3000 },
      { id: "bb-4", name: "Phantom", value: 42000, demand: 8, rarity: "epic", trend: "stable", category: "Legendary", imageUrl: "👻", lastChange: 0 },
      { id: "bb-5", name: "Shadow Step", value: 35000, demand: 9, rarity: "rare", trend: "rising", category: "Abilities", imageUrl: "🌑", lastChange: 2000 },
    ]
  },
  {
    id: "growagarden",
    name: "Grow a Garden",
    slug: "growagarden",
    description: "Seeds and plant trading values",
    imageUrl: "https://tr.rbxcdn.com/180DAY-f6g7h8i9j0k1l2m3n4o5/768/432/Image/Webp/noFilter",
    color: "green",
    categories: ["All", "Mythic Seeds", "Legendary Seeds", "Rare Seeds", "Tools", "Decorations"],
    items: [
      { id: "gg-1", name: "Rainbow Flower", value: 25000, demand: 10, rarity: "legendary", trend: "stable", category: "Mythic Seeds", imageUrl: "🌈", lastChange: 0 },
      { id: "gg-2", name: "Crystal Rose", value: 18000, demand: 9, rarity: "legendary", trend: "rising", category: "Mythic Seeds", imageUrl: "💎", lastChange: 1200 },
      { id: "gg-3", name: "Golden Sunflower", value: 12000, demand: 8, rarity: "epic", trend: "stable", category: "Legendary Seeds", imageUrl: "🌻", lastChange: 0 },
      { id: "gg-4", name: "Cosmic Cactus", value: 8500, demand: 7, rarity: "rare", trend: "falling", category: "Legendary Seeds", imageUrl: "🌵", lastChange: -500 },
      { id: "gg-5", name: "Magic Watering Can", value: 15000, demand: 9, rarity: "epic", trend: "rising", category: "Tools", imageUrl: "🚿", lastChange: 800 },
    ]
  }
];

export const getGameBySlug = (slug: string): Game | undefined => {
  return games.find(g => g.slug === slug);
};

export const getAllItems = (): (GameItem & { gameId: string; gameName: string })[] => {
  return games.flatMap(game => 
    game.items.map(item => ({
      ...item,
      gameId: game.id,
      gameName: game.name
    }))
  );
};

export const formatValue = (value: number): string => {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
};
