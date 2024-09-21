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

function validateGameState(state: GameState): string | null {
  const totalCards = state.playerDeck.length + state.computerDeck.length + 
                     state.playerWinPile.length + state.computerWinPile.length + 
                     state.warPile.length;
  
  if (totalCards !== 52) {
    return `Invalid card count: ${totalCards}`;
  }

  // Add more validation checks as needed

  return null;
}

export default async function handler(req: NextRequest) {
  if (req.method === 'GET') {
    // In a real scenario, you'd fetch the game state from a database
    const gameState: GameState = {
      playerDeck: [],
      computerDeck: [],
      playerWinPile: [],
      computerWinPile: [],
      warPile: [],
      gameStatus: 'Game not started',
      playerCard: null,
      computerCard: null,
    };
    return new Response(JSON.stringify(gameState), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else if (req.method === 'POST') {
    const newState: GameState = await req.json();
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