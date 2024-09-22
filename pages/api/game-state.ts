import type { NextRequest } from 'next/server';
import { BigfootType, Attack, bigfootTypes } from '../../utils/bigfootTypes';
import { GameConfig, defaultGameConfig } from '../../utils/gameConfig';

export const config = { runtime: 'edge' };

type Card = {
  suit: string;
  value: number;
};

type EnhancedGameState = {
  playerDeck: Card[];
  opponentDeck: Card[];
  playerWinPile: Card[];
  opponentWinPile: Card[];
  warPile: Card[];
  gameStatus: string;
  playerCard: Card | null;
  opponentCard: Card | null;
  playerBigfoot: BigfootType;
  opponentBigfoot: BigfootType;
  playerHitPoints: number;
  opponentHitPoints: number;
  unlockedBigfoots: string[];
  config: GameConfig;
  roundsPlayed: number;
};

function validateGameState(state: EnhancedGameState): string | null {
  const totalCards = state.playerDeck.length + state.opponentDeck.length + 
                     state.playerWinPile.length + state.opponentWinPile.length + 
                     state.warPile.length;
  
  if (totalCards !== 2 * state.config.deckSizePerPlayer) {
    return `Invalid card count: ${totalCards}`;
  }

  if (state.playerHitPoints < 0 || state.opponentHitPoints < 0) {
    return 'Invalid hit points';
  }

  // Add more validation checks as needed

  return null;
}

export default async function handler(req: NextRequest) {
  if (req.method === 'GET') {
    // In a real scenario, you'd fetch the game state from a database
    const gameState: EnhancedGameState = {
      playerDeck: [],
      opponentDeck: [],
      playerWinPile: [],
      opponentWinPile: [],
      warPile: [],
      gameStatus: 'Game not started',
      playerCard: null,
      opponentCard: null,
      playerBigfoot: bigfootTypes[0], // Use the first Bigfoot type as default
      opponentBigfoot: bigfootTypes[1], // Use the second Bigfoot type as default
      playerHitPoints: bigfootTypes[0].maxHitPoints,
      opponentHitPoints: bigfootTypes[1].maxHitPoints,
      unlockedBigfoots: ['Sasquatch'],
      config: defaultGameConfig,
      roundsPlayed: 0,
    };
    return new Response(JSON.stringify(gameState), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else if (req.method === 'POST') {
    const newState: EnhancedGameState = await req.json();
    const validationError = validateGameState(newState);
    if (validationError) {
      return new Response(JSON.stringify({ message: 'Invalid game state', error: validationError }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // In a real scenario, you'd save the game state to a database here
      return new Response(JSON.stringify({ message: 'Game state updated successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { 'Allow': 'GET, POST' },
    });
  }
}