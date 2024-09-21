import { EdgeFunction, EdgeContext } from '@vercel/edge';

export const config = { runtime: 'edge' };

export default async function handler(req: Request, context: EdgeContext) {
  const gameState = await req.json();
  
  const totalCards = gameState.playerDeck.length + gameState.computerDeck.length + 
                     gameState.playerWinPile.length + gameState.computerWinPile.length + 
                     gameState.warPile.length;

  if (totalCards !== 52) {
    return new Response(JSON.stringify({ error: `Invalid card count: ${totalCards}` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ valid: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}