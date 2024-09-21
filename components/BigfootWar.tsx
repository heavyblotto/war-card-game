import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BigfootType, bigfootTypes } from '../utils/bigfootTypes';

// Define the structure of a card
type Card = {
  suit: string;
  value: number;
};

// Define the structure of the game state
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

// Initial game state
const initialGameState: GameState = {
  playerDeck: [],
  computerDeck: [],
  playerWinPile: [],
  computerWinPile: [],
  warPile: [],
  gameStatus: 'Game not started',
  playerCard: null,
  computerCard: null,
};

type EnhancedGameState = GameState & {
  playerBigfoot: BigfootType;
  computerBigfoot: BigfootType;
  unlockedBigfoots: string[];
};

export default function BigfootWar() {
  // State to hold the current game state
  const [gameState, setGameState] = useState<EnhancedGameState | null>(null);
  const [availableBigfoots, setAvailableBigfoots] = useState<BigfootType[]>([]);

  // Initialize the game when the component mounts
  useEffect(() => {
    initializeGame();
  }, []);

  // Function to initialize or reset the game
  const initializeGame = () => {
    const deck = createDeck();
    const shuffledDeck = fisherYatesShuffle(deck);
    const unlockedBigfoots = ['Sasquatch']; // Start with Sasquatch unlocked
    const availableBigfoots = bigfootTypes.filter(bf => unlockedBigfoots.includes(bf.name));
    
    const newGameState: EnhancedGameState = {
      playerDeck: shuffledDeck.slice(0, 26),
      computerDeck: shuffledDeck.slice(26),
      playerWinPile: [],
      computerWinPile: [],
      warPile: [],
      gameStatus: 'Choose your Bigfoot!',
      playerCard: null,
      computerCard: null,
      playerBigfoot: availableBigfoots[0],
      computerBigfoot: getRandomBigfoot(bigfootTypes),
      unlockedBigfoots,
    };
    setGameState(newGameState);
    setAvailableBigfoots(availableBigfoots);
    updateGameState(newGameState);
  };

  // Function to create a standard deck of 52 cards
  const createDeck = (): Card[] => {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    return suits.flatMap(suit => values.map(value => ({ suit, value })));
  };

  // Fisher-Yates shuffle algorithm for randomizing the deck
  const fisherYatesShuffle = (deck: Card[]): Card[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Function to update the game state on the server
  const updateGameState = async (state: EnhancedGameState) => {
    try {
      const response = await axios.post('/api/game-state', state);
      if (response.data.error) {
        console.error('Server-side validation failed:', response.data.error);
        initializeGame(); // Reset the game if server detects an invalid state
      }
    } catch (error) {
      console.error('Failed to update game state:', error);
    }
  };

  // Function to handle drawing a card and updating the game state
  const drawCard = () => {
    if (!gameState) return;

    setGameState(prevState => {
      if (!prevState) return prevState;

      let newPlayerDeck = [...prevState.playerDeck];
      let newComputerDeck = [...prevState.computerDeck];
      let newPlayerWinPile = [...prevState.playerWinPile];
      let newComputerWinPile = [...prevState.computerWinPile];
      let newWarPile = [...prevState.warPile];

      // Check if player's deck is empty and shuffle win pile if necessary
      if (newPlayerDeck.length === 0) {
        if (newPlayerWinPile.length === 0) {
          return { ...prevState, gameStatus: 'Game over! Computer wins!', playerCard: null, computerCard: null };
        }
        newPlayerDeck = fisherYatesShuffle(newPlayerWinPile);
        newPlayerWinPile = [];
      }

      // Check if computer's deck is empty and shuffle win pile if necessary
      if (newComputerDeck.length === 0) {
        if (newComputerWinPile.length === 0) {
          return { ...prevState, gameStatus: 'Game over! Player wins!', playerCard: null, computerCard: null };
        }
        newComputerDeck = fisherYatesShuffle(newComputerWinPile);
        newComputerWinPile = [];
      }

      // Draw cards for player and computer
      const newPlayerCard = newPlayerDeck.shift()!;
      const newComputerCard = newComputerDeck.shift()!;
      newWarPile = [newPlayerCard, newComputerCard, ...newWarPile];

      let newState: EnhancedGameState;

      // Compare cards and update game state accordingly
      if (newPlayerCard.value > newComputerCard.value) {
        newState = {
          ...prevState,
          playerDeck: newPlayerDeck,
          computerDeck: newComputerDeck,
          playerWinPile: [...newPlayerWinPile, ...newWarPile],
          warPile: [],
          playerCard: newPlayerCard,
          computerCard: newComputerCard,
          gameStatus: 'Player wins this round!'
        };
      } else if (newComputerCard.value > newPlayerCard.value) {
        newState = {
          ...prevState,
          playerDeck: newPlayerDeck,
          computerDeck: newComputerDeck,
          computerWinPile: [...newComputerWinPile, ...newWarPile],
          warPile: [],
          playerCard: newPlayerCard,
          computerCard: newComputerCard,
          gameStatus: 'Computer wins this round!'
        };
      } else {
        newState = {
          ...prevState,
          playerDeck: newPlayerDeck,
          computerDeck: newComputerDeck,
          warPile: newWarPile,
          playerCard: newPlayerCard,
          computerCard: newComputerCard,
          gameStatus: "It's a tie! War initiated."
        };
      }

      // Verify total card count
      const totalCards = newState.playerDeck.length + newState.computerDeck.length + 
                         newState.playerWinPile.length + newState.computerWinPile.length + 
                         newState.warPile.length;
      
      if (totalCards !== 52) {
        console.error('Card count mismatch:', totalCards);
        return initializeGame(); // Reset the game if card count is incorrect
      }

      updateGameState(newState);
      return newState;
    });
  };

  // Function to render a card
  const renderCard = (card: Card | null, isPlayer: boolean) => {
    if (!card) return null;
    const cardColor = card.suit === '♥' || card.suit === '♦' ? 'text-red-500' : 'text-black';
    return (
      <div className={`w-24 h-36 bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center ${isPlayer ? 'ml-auto' : 'mr-auto'}`}>
        <span className={`text-4xl ${cardColor}`}>{card.suit}</span>
        <span className={`text-2xl ${cardColor}`}>{card.value}</span>
      </div>
    );
  };

  const getRandomBigfoot = (bigfoots: BigfootType[]): BigfootType => {
    return bigfoots[Math.floor(Math.random() * bigfoots.length)];
  };

  const chooseBigfoot = (bigfoot: BigfootType) => {
    if (!gameState) return;
    setGameState(prevState => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        playerBigfoot: bigfoot,
        gameStatus: 'Game started. Click "Draw Card" to play!',
      };
    });
  };

  // Show loading state if game state is not initialized
  if (!gameState) {
    return <div>Loading...</div>;
  }

  // Render the game UI
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Bigfoot War</h1>
      <div className="bg-green-100 rounded-lg p-4 mb-4">
        <p className="text-center font-semibold">{gameState.gameStatus}</p>
      </div>
      {gameState.gameStatus === 'Choose your Bigfoot!' && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Choose your Bigfoot:</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {availableBigfoots.map(bigfoot => (
              <button
                key={bigfoot.name}
                onClick={() => chooseBigfoot(bigfoot)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                {bigfoot.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Player ({gameState.playerBigfoot.name})</h2>
          <div className="flex justify-between items-center">
            <div>
              <p>Deck: {gameState.playerDeck.length} cards</p>
              <p>Win Pile: {gameState.playerWinPile.length} cards</p>
            </div>
            {renderCard(gameState.playerCard, true)}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Computer ({gameState.computerBigfoot.name})</h2>
          <div className="flex justify-between items-center">
            {renderCard(gameState.computerCard, false)}
            <div>
              <p>Deck: {gameState.computerDeck.length} cards</p>
              <p>Win Pile: {gameState.computerWinPile.length} cards</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mb-6">
        <p>War Pile: {gameState.warPile.length} cards</p>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={drawCard}
          disabled={gameState.gameStatus.includes('Game over') || gameState.gameStatus === 'Choose your Bigfoot!'}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Draw Card
        </button>
        <button
          onClick={initializeGame}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}