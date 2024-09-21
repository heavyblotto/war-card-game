import type { NextRequest } from 'next/server';

export const config = { runtime: 'edge' };

type Card = {
  suit: string;
  value: number;
};

type GameState = {
  playerDeck: Card[];
  computerDeck: Card[];
  playerWinPile: Card[];
  computerWinPile: Card[];
  warPile: Card[];
  gameStatus: string;
  playerCard: Card | null;
  computerCard: Card | null;
};

export default async function handler(req: NextRequest) {
  const gameState: GameState = await req.json();
  
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