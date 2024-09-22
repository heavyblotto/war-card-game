import type { NextRequest } from 'next/server';

export const config = { runtime: 'edge' };

type EnhancedGameState = {
  playerDeck: any[];
  opponentDeck: any[];
  playerWinPile: any[];
  opponentWinPile: any[];
  warPile: any[];
  warCount: number;
  roundsPlayed: number;
  playerHitPoints: number;
  opponentHitPoints: number;
  playerBigfoot: { maxHitPoints: number };
  opponentBigfoot: { maxHitPoints: number };
};

export default async function handler(req: NextRequest) {
  const gameState: EnhancedGameState = await req.json();
  
  const stats = {
    playerCardCount: gameState.playerDeck.length + gameState.playerWinPile.length,
    opponentCardCount: gameState.opponentDeck.length + gameState.opponentWinPile.length,
    warCount: gameState.warCount || 0,
    roundsPlayed: gameState.roundsPlayed || 0,
    warPileSize: gameState.warPile.length,
    playerHitPointsPercentage: (gameState.playerHitPoints / gameState.playerBigfoot.maxHitPoints) * 100,
    opponentHitPointsPercentage: (gameState.opponentHitPoints / gameState.opponentBigfoot.maxHitPoints) * 100,
  };

  return new Response(JSON.stringify(stats), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}