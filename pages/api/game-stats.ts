import { EdgeFunction, EdgeContext } from '@vercel/edge';

export const config = { runtime: 'edge' };

type GameState = {
  playerDeck: any[];
  computerDeck: any[];
  playerWinPile: any[];
  computerWinPile: any[];
  warPile: any[];
  warCount: number;
  roundsPlayed: number;
};

export default async function handler(req: Request, context: EdgeContext) {
  const gameState: GameState = await req.json();
  
  const stats = {
    playerCardCount: gameState.playerDeck.length + gameState.playerWinPile.length,
    computerCardCount: gameState.computerDeck.length + gameState.computerWinPile.length,
    warCount: gameState.warCount || 0,
    roundsPlayed: gameState.roundsPlayed || 0,
    warPileSize: gameState.warPile.length,
  };

  return new Response(JSON.stringify(stats), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}