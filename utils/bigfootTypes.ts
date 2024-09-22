export type Attack = {
  name: string;
  damage: number;
  cardValue: number;
};

export type BigfootType = {
  name: string;
  category: 'Dwarf' | 'Giant' | 'Squatch';
  location: string;
  habitat: string;
  specialAbility: string;
  strength: number;
  agility: number;
  intelligence: number;
  unlockCondition: string;
  maxHitPoints: number;
  attacks: Attack[];
};

export const bigfootTypes: BigfootType[] = [
  {
    name: "Sasquatch",
    category: "Squatch",
    location: "Pacific Northwest",
    habitat: "Creek bed",
    specialAbility: "Rock Throwing",
    strength: 9,
    agility: 7,
    intelligence: 7,
    unlockCondition: "Starter Bigfoot",
    maxHitPoints: 100,
    attacks: [
      { name: "Mighty Swing", damage: 20, cardValue: 14 },
      { name: "Tree Throw", damage: 15, cardValue: 13 },
      { name: "Ground Pound", damage: 10, cardValue: 12 },
      { name: "Intimidating Roar", damage: 5, cardValue: 11 },
    ]
  },
  // Add more Bigfoot types with their attacks...
];