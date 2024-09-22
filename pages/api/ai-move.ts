import type { NextRequest } from 'next/server';
import { BigfootType, Attack } from '../../utils/bigfootTypes';

export const config = { runtime: 'edge' };

type EnhancedGameState = {
  opponentDeck: Card[];
  opponentWinPile: Card[];
  opponentBigfoot: BigfootType;
  opponentHitPoints: number;
  playerHitPoints: number;
};

type Card = {
  suit: string;
  value: number;
};

export default async function handler(req: NextRequest) {
  const gameState: EnhancedGameState = await req.json();
  
  const aiMove = determineAIMove(gameState);

  return new Response(JSON.stringify({ move: aiMove }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function determineAIMove(gameState: EnhancedGameState): string {
  if (gameState.opponentDeck.length === 0 && gameState.opponentWinPile.length > 0) {
    return 'shuffle';
  }

  // Simple AI logic: if opponent's HP is low, prioritize attacking
  if (gameState.opponentHitPoints < gameState.opponentBigfoot.maxHitPoints * 0.3) {
    return 'attack';
  }

  // If player's HP is low, prioritize collecting cards
  if (gameState.playerHitPoints < gameState.opponentBigfoot.maxHitPoints * 0.3) {
    return 'collect';
  }

  // Default to a random choice between attacking and collecting
  return Math.random() < 0.5 ? 'attack' : 'collect';
}