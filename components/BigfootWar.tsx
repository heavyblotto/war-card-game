import React, { useState, useEffect } from 'react';
import { BigfootType, bigfootTypes } from '../utils/bigfootTypes';
import { GameConfig, defaultGameConfig } from '../utils/gameConfig';

type Card = {
  suit: string;
  value: number;
};

type GameState = {
  playerDeck: Card[];
  opponentDeck: Card[];
  playerWinPile: Card[];
  opponentWinPile: Card[];
  playerCard: Card | null;
  opponentCard: Card | null;
  warPile: Card[];
  warCards: { player: Card[]; opponent: Card[] };
  playerBigfoot: BigfootType;
  opponentBigfoot: BigfootType;
  playerHP: number;
  opponentHP: number;
  gameStatus: string;
  roundsPlayed: number;
  discardPile: Card[];
};

const BigfootWar: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const deck = createDeck();
    const shuffledDeck = fisherYatesShuffle(deck);
    const playerBigfoot = bigfootTypes[0];
    const opponentBigfoot = bigfootTypes[1] || playerBigfoot;

    const newGameState: GameState = {
      playerDeck: shuffledDeck.slice(0, 52),
      opponentDeck: shuffledDeck.slice(52),
      playerWinPile: [],
      opponentWinPile: [],
      playerCard: null,
      opponentCard: null,
      warPile: [],
      warCards: { player: [], opponent: [] },
      playerBigfoot,
      opponentBigfoot,
      playerHP: playerBigfoot.maxHitPoints,
      opponentHP: opponentBigfoot.maxHitPoints,
      gameStatus: 'Game started. Draw a card to begin!',
      roundsPlayed: 0,
      discardPile: [],
    };

    setGameState(newGameState);
  };

  const createDeck = (): Card[] => {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const deck: Card[] = [];
    for (let i = 0; i < 2; i++) { // Create two full decks
      for (const suit of suits) {
        for (const value of values) {
          deck.push({ suit, value });
        }
      }
    }
    return deck;
  };

  const fisherYatesShuffle = (deck: Card[]): Card[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const drawCard = () => {
    if (!gameState) return;

    setGameState(prevState => {
      if (!prevState) return null;

      let newState = { ...prevState, roundsPlayed: prevState.roundsPlayed + 1 };

      // Clear previous cards and war cards at the start of a new round
      newState.playerCard = null;
      newState.opponentCard = null;
      newState.warCards = { player: [], opponent: [] };

      // Function to check and reshuffle if necessary
      const checkAndReshuffle = (deck: Card[], winPile: Card[]): [Card[], Card[]] => {
        if (deck.length === 0 && winPile.length > 0) {
          const shuffledWinPile = fisherYatesShuffle([...winPile]);
          return [shuffledWinPile, []];
        }
        return [deck, winPile];
      };

      // Check and reshuffle for player
      [newState.playerDeck, newState.playerWinPile] = checkAndReshuffle(newState.playerDeck, newState.playerWinPile);

      // Check and reshuffle for opponent
      [newState.opponentDeck, newState.opponentWinPile] = checkAndReshuffle(newState.opponentDeck, newState.opponentWinPile);

      // Check if either player has run out of cards completely
      if (newState.playerDeck.length === 0 && newState.playerWinPile.length === 0) {
        newState.gameStatus = 'Game over! Opponent wins!';
        return newState;
      }

      if (newState.opponentDeck.length === 0 && newState.opponentWinPile.length === 0) {
        newState.gameStatus = 'Game over! Player wins!';
        return newState;
      }

      // Draw cards
      newState.playerCard = newState.playerDeck.pop() || null;
      newState.opponentCard = newState.opponentDeck.pop() || null;

      if (newState.playerCard && newState.opponentCard) {
        if (newState.playerCard.value > newState.opponentCard.value) {
          newState.gameStatus = 'Player wins the round. Choose to attack or collect.';
        } else if (newState.opponentCard.value > newState.playerCard.value) {
          newState = handleRoundWin(newState, 'opponent');
        } else {
          newState = initiateWar(newState);
        }
      } else {
        newState.gameStatus = 'Not enough cards to continue. Game over!';
      }

      return newState;
    });
  };

  const handleRoundWin = (state: GameState, winner: 'player' | 'opponent', playerChoice: 'attack' | 'collect' = 'collect'): GameState => {
    let newState = { ...state };
    const winningCard = winner === 'player' ? newState.playerCard! : newState.opponentCard!;
    const winningBigfoot = winner === 'player' ? newState.playerBigfoot : newState.opponentBigfoot;

    if (winner === 'player') {
      const attack = winningBigfoot.attacks.find(a => a.cardValue === winningCard.value);
      if (playerChoice === 'attack' && attack) {
        newState.opponentHP = Math.max(0, newState.opponentHP - attack.damage);
        newState.gameStatus = `Player used ${attack.name} for ${attack.damage} damage!`;
        if (newState.opponentHP === 0) {
          newState.gameStatus = 'Game over! Player wins by defeating the opponent!';
        }
        newState.discardPile = [...newState.discardPile, newState.playerCard!, newState.opponentCard!];
      } else {
        newState.playerWinPile = [...newState.playerWinPile, newState.playerCard!, newState.opponentCard!];
        newState.gameStatus = playerChoice === 'attack' ? 'No attack available. Player collects the cards.' : 'Player collects the cards.';
      }
      // Clear the cards after player's turn
      newState.playerCard = null;
      newState.opponentCard = null;
    } else {
      // Opponent AI decision
      const attack = winningBigfoot.attacks.find(a => a.cardValue === winningCard.value);
      if (attack && Math.random() < 0.6) { // 60% chance to attack if possible
        newState.playerHP = Math.max(0, newState.playerHP - attack.damage);
        newState.gameStatus = `Opponent used ${attack.name} for ${attack.damage} damage!`;
        if (newState.playerHP === 0) {
          newState.gameStatus = 'Game over! Opponent wins by defeating the player!';
        }
        newState.discardPile = [...newState.discardPile, newState.playerCard!, newState.opponentCard!];
      } else {
        newState.opponentWinPile = [...newState.opponentWinPile, newState.playerCard!, newState.opponentCard!];
        newState.gameStatus = 'Opponent collects the cards.';
      }
      // Don't clear the cards after opponent's turn, so they remain visible
    }

    newState.roundsPlayed += 1;
    newState.warCards = { player: [], opponent: [] };

    return newState;
  };

  const initiateWar = (state: GameState): GameState => {
    let newState = { ...state, gameStatus: "War!" };
    
    // Add the initial tied cards
    newState.warCards.player.push(newState.playerCard!);
    newState.warCards.opponent.push(newState.opponentCard!);
    newState.warPile.push(newState.playerCard!, newState.opponentCard!);
    newState.playerCard = null;
    newState.opponentCard = null;

    for (let i = 0; i < 3; i++) {
      if (newState.playerDeck.length === 0 || newState.opponentDeck.length === 0) {
        newState.gameStatus = `Game over! ${newState.playerDeck.length > 0 ? 'Player' : 'Opponent'} wins the war!`;
        return newState;
      }
      const playerCard = newState.playerDeck.pop()!;
      const opponentCard = newState.opponentDeck.pop()!;
      newState.warCards.player.push(playerCard);
      newState.warCards.opponent.push(opponentCard);
      newState.warPile.push(playerCard, opponentCard);
    }

    newState.playerCard = newState.playerDeck.pop()!;
    newState.opponentCard = newState.opponentDeck.pop()!;
    newState.warCards.player.push(newState.playerCard);
    newState.warCards.opponent.push(newState.opponentCard);
    newState.warPile.push(newState.playerCard, newState.opponentCard);

    if (newState.playerCard.value > newState.opponentCard.value) {
      newState.playerWinPile = [...newState.playerWinPile, ...newState.warPile];
      newState.warPile = [];
      newState.gameStatus = 'Player wins the war!';
    } else if (newState.opponentCard.value > newState.playerCard.value) {
      newState.opponentWinPile = [...newState.opponentWinPile, ...newState.warPile];
      newState.warPile = [];
      newState.gameStatus = 'Opponent wins the war!';
    } else {
      newState.gameStatus = "It's another tie! War continues...";
      return initiateWar(newState);
    }

    return newState;
  };

  const renderCardPlaceholder = (isFaceDown: boolean = false) => (
    <div className="w-24 h-36 bg-gray-200 border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
      {isFaceDown ? '?' : 'No Card'}
    </div>
  );

  const renderCard = (card: Card | null, isPlayer: boolean, isFaceDown: boolean = false) => {
    if (!card) return renderCardPlaceholder(isFaceDown);
    const color = card.suit === '♥' || card.suit === '♦' ? 'text-red-600' : 'text-gray-800';
    const bigfoot = isPlayer ? gameState?.playerBigfoot : gameState?.opponentBigfoot;
    const attack = bigfoot?.attacks.find(a => a.cardValue === card.value);
    
    return (
      <div className={`w-24 h-36 bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center ${color} font-bold relative`}>
        <div className="text-4xl">{card.suit}</div>
        <div className="text-2xl">{card.value}</div>
        {attack && (
          <div className={`absolute -top-2 -right-2 w-6 h-6 ${isPlayer ? 'bg-yellow-400' : 'bg-red-400'} rounded-full flex items-center justify-center text-xs text-black`}>
            ⚡
          </div>
        )}
      </div>
    );
  };

  const renderWarScenario = () => {
    if (!gameState || !gameState.warCards.player.length) return null;

    const warRounds = Math.ceil(gameState.warCards.player.length / 4);

    return (
      <div className="flex flex-col items-center space-y-4">
        {[...Array(warRounds)].map((_, roundIndex) => (
          <div key={roundIndex} className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              {roundIndex < warRounds - 1 && (
                <>
                  {renderCard(null, true, true)}
                  {renderCard(null, true, true)}
                  {renderCard(null, true, true)}
                </>
              )}
              {renderCard(gameState.warCards.player[roundIndex * 4], true)}
            </div>
            <div className="flex items-center">
              {renderCard(gameState.warCards.opponent[roundIndex * 4], false)}
              {roundIndex < warRounds - 1 && (
                <>
                  {renderCard(null, false, true)}
                  {renderCard(null, false, true)}
                  {renderCard(null, false, true)}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderHealthBar = (current: number, max: number, isPlayer: boolean) => {
    const percentage = (current / max) * 100;
    const barColor = isPlayer ? 'bg-blue-500' : 'bg-red-500';
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className={`${barColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    );
  };

  if (!gameState) {
    return <div className="flex justify-center items-center h-screen font-bold text-2xl">Loading...</div>;
  }

  return (
    <div className="bg-green-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-6">Bigfoot War</h1>
        
        <div className="flex justify-between mb-8">
          <div className="w-1/2 pr-2">
            <h2 className="text-2xl font-bold mb-2">Player</h2>
            <p>HP: {gameState.playerHP} / {gameState.playerBigfoot.maxHitPoints}</p>
            {renderHealthBar(gameState.playerHP, gameState.playerBigfoot.maxHitPoints, true)}
            <p>Deck: {gameState.playerDeck.length}</p>
            <p>Win Pile: {gameState.playerWinPile.length}</p>
          </div>
          <div className="w-1/2 pl-2">
            <h2 className="text-2xl font-bold mb-2">Opponent</h2>
            <p>HP: {gameState.opponentHP} / {gameState.opponentBigfoot.maxHitPoints}</p>
            {renderHealthBar(gameState.opponentHP, gameState.opponentBigfoot.maxHitPoints, false)}
            <p>Deck: {gameState.opponentDeck.length}</p>
            <p>Win Pile: {gameState.opponentWinPile.length}</p>
          </div>
        </div>
        
        <div className="flex justify-center mb-8">
          {gameState.warCards.player.length > 0 ? (
            renderWarScenario()
          ) : (
            <div className="flex space-x-8">
              {renderCard(gameState.playerCard, true)}
              {renderCard(gameState.opponentCard, false)}
            </div>
          )}
        </div>
        
        <div className="text-center mb-4">
          <p className="text-xl font-bold">{gameState.gameStatus}</p>
          <p>Round: {gameState.roundsPlayed}</p>
        </div>
        
        <div className="flex justify-center">
          <button
            className={`font-bold py-2 px-4 rounded mr-2 ${
              gameState.gameStatus.includes('Game over') ||
              (gameState.playerCard && gameState.playerCard.value > (gameState.opponentCard?.value ?? 0))
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-700 text-white'
            }`}
            onClick={drawCard}
            disabled={
              gameState.gameStatus.includes('Game over') ||
              Boolean(gameState.playerCard && gameState.playerCard.value > (gameState.opponentCard?.value ?? 0))
            }
          >
            Draw Card
          </button>
          {gameState.playerCard && gameState.opponentCard && gameState.playerCard.value > gameState.opponentCard.value && (
            <>
              <button
                className={`font-bold py-2 px-4 rounded mr-2 ${
                  gameState.playerBigfoot.attacks.find(a => a.cardValue === gameState.playerCard?.value)
                    ? 'bg-green-500 hover:bg-green-700 text-white'
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
                onClick={() => setGameState(prevState => handleRoundWin(prevState!, 'player', 'attack'))}
                disabled={!gameState.playerBigfoot.attacks.find(a => a.cardValue === gameState.playerCard?.value)}
              >
                Attack
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setGameState(prevState => handleRoundWin(prevState!, 'player', 'collect'))}
              >
                Collect
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BigfootWar;