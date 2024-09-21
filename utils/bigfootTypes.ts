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
};

export const bigfootTypes: BigfootType[] = [
  {
    name: "Agogwe",
    category: "Dwarf",
    location: "Tanzania, East Africa, Zimbabwe, Zaire, and Congo",
    habitat: "Forests and jungle",
    specialAbility: "Jungle Camouflage",
    strength: 5,
    agility: 8,
    intelligence: 6,
    unlockCondition: "Win 5 games"
  },
  {
    name: "Sasquatch",
    category: "Squatch",
    location: "Pacific Northwest",
    habitat: "Creek bed",
    specialAbility: "Rock Throwing",
    strength: 9,
    agility: 7,
    intelligence: 7,
    unlockCondition: "Starter Bigfoot"
  },
  {
    name: "Yeti",
    category: "Giant",
    location: "Himalayas",
    habitat: "Snowy mountain",
    specialAbility: "Blizzard Summoning",
    strength: 10,
    agility: 6,
    intelligence: 6,
    unlockCondition: "Win 20 games"
  },
  {
    name: "Orang Pendek",
    category: "Dwarf",
    location: "Sumatra",
    habitat: "Jungle mountains",
    specialAbility: "Tree Climbing",
    strength: 6,
    agility: 9,
    intelligence: 8,
    unlockCondition: "Win 10 games"
  },
  {
    name: "Skunk Ape",
    category: "Squatch",
    location: "US Florida",
    habitat: "Swamp",
    specialAbility: "Noxious Odor",
    strength: 7,
    agility: 6,
    intelligence: 5,
    unlockCondition: "Win 15 games"
  },
  {
    name: "Genoskwa",
    category: "Giant",
    location: "North America",
    habitat: "Valley",
    specialAbility: "Stone Skin",
    strength: 10,
    agility: 4,
    intelligence: 5,
    unlockCondition: "Win 25 games"
  },
  {
    name: "Yowie",
    category: "Squatch",
    location: "Australia",
    habitat: "Underground riverside",
    specialAbility: "Burrowing",
    strength: 8,
    agility: 7,
    intelligence: 6,
    unlockCondition: "Win 30 games"
  },
  {
    name: "Momo",
    category: "Squatch",
    location: "Eastern US",
    habitat: "Abandoned shack",
    specialAbility: "Intimidating Roar",
    strength: 8,
    agility: 6,
    intelligence: 5,
    unlockCondition: "Win 35 games"
  },
  {
    name: "Kapre",
    category: "Squatch",
    location: "Philippines",
    habitat: "Banyan tree",
    specialAbility: "Smoke Screen",
    strength: 7,
    agility: 8,
    intelligence: 8,
    unlockCondition: "Win 40 games"
  },
  {
    name: "Dzu-Teh",
    category: "Giant",
    location: "Himalayas",
    habitat: "Snowy mountain",
    specialAbility: "Avalanche Trigger",
    strength: 9,
    agility: 5,
    intelligence: 7,
    unlockCondition: "Win 45 games"
  }
];