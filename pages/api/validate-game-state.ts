import type { NextRequest } from 'next/server';
import { BigfootType } from '../../utils/bigfootTypes';
import { GameConfig } from '../../utils/gameConfig';

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

export default async function handler(req: NextRequest) {
  const gameState: EnhancedGameState = await req.json();
  
  const totalCards = gameState.playerDeck.length + gameState.opponentDeck.length + 
                     gameState.playerWinPile.length + gameState.opponentWinPile.length + 
                     gameState.warPile.length;

  if (totalCards !== 2 * gameState.config.deckSizePerPlayer) {
    return new Response(JSON.stringify({ error: `Invalid card count: ${totalCards}` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (gameState.playerHitPoints < 0 || gameState.opponentHitPoints < 0) {
    return new Response(JSON.stringify({ error: 'Invalid hit points' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Add more validation checks as needed

  return new Response(JSON.stringify({ valid: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}