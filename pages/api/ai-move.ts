import { EdgeFunction, EdgeContext } from '@vercel/edge';

export const config = { runtime: 'edge' };

type GameState = {
  computerDeck: any[];
  computerWinPile: any[];
};

export default async function handler(req: Request, context: EdgeContext) {
  const gameState: GameState = await req.json();
  
  const aiMove = determineAIMove(gameState);

  return new Response(JSON.stringify({ move: aiMove }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function determineAIMove(gameState: GameState): string {
  if (gameState.computerDeck.length === 0 && gameState.computerWinPile.length > 0) {
    return 'shuffle';
  }
  return 'draw';
}