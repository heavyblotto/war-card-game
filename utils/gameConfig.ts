export type GameConfig = {
  deckSizePerPlayer: number;
  cardsPerWar: number;
  winCondition: 'allCards' | 'mostCards' | 'defeat';
  specialAbilitiesEnabled: boolean;
  unlockProgressionEnabled: boolean;
  maxRounds: number | null;
  difficultyLevel: 'easy' | 'medium' | 'hard';
};

export const defaultGameConfig: GameConfig = {
  deckSizePerPlayer: 52,
  cardsPerWar: 3,
  winCondition: 'defeat',
  specialAbilitiesEnabled: true,
  unlockProgressionEnabled: true,
  maxRounds: null,
  difficultyLevel: 'medium',
};

export function updateGameConfig(currentConfig: GameConfig, updates: Partial<GameConfig>): GameConfig {
  return { ...currentConfig, ...updates };
}