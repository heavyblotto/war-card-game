# Bigfoot War Game Documentation

## Table of Contents
- [Bigfoot War Game Documentation](#bigfoot-war-game-documentation)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Tech Stack](#tech-stack)
  - [Architecture](#architecture)
  - [Game Logic](#game-logic)
  - [State Management](#state-management)
  - [UI Components](#ui-components)
  - [API Reference](#api-reference)
  - [Bigfoot Types](#bigfoot-types)
  - [Deployment](#deployment)
  - [Data Dictionary](#data-dictionary)
  - [Glossary](#glossary)

## Introduction
Bigfoot War is a digital adaptation of the classic card game War, implemented as a web application using Next.js and TypeScript. The game features various Bigfoot types with unique abilities, adding an extra layer of strategy to the traditional War game.

## Tech Stack
- Frontend: Next.js 14, React 18, TypeScript
- Styling: Tailwind CSS
- State Management: React Hooks (useState, useEffect)
- API Requests: Axios (if used for backend communication)
- Backend: Next.js API Routes with Edge Runtime (if implemented)
- Deployment: Vercel (recommended)

## Architecture
The application follows a client-side architecture:
- Client: React components rendered by Next.js
- State Management: Local state using React hooks
- Styling: Tailwind CSS for responsive design

## Game Logic
The game follows these main steps:
1. Deck initialization and shuffling
2. Bigfoot type assignment
3. Card drawing and comparison
4. Handling war scenarios
5. Managing win piles and discard piles
6. Implementing attack mechanics
7. Determining game end conditions

Key functions:
- `initializeGame()`: Sets up the initial game state
- `drawCard()`: Handles the main game logic for drawing and comparing cards
- `handleRoundWin()`: Manages the outcome of each round
- `initiateWar()`: Handles the war scenario when cards tie
- `fisherYatesShuffle()`: Implements the Fisher-Yates shuffle algorithm for deck randomization

## State Management
The game state is managed using React's useState hook. The main state object (`gameState`) includes:
- Player and opponent decks
- Player and opponent win piles
- Current player and opponent cards
- War pile and war cards
- Player and opponent Bigfoot types and HP
- Game status and round count
- Discard pile

## UI Components
The game interface includes the following key components:
- Player and opponent information displays (HP, deck size, win pile size)
- Card rendering for both players
- War scenario visualization:
  - Tied cards displayed face up in the usual card spot
  - Face-down cards displayed to the left of the player (right for opponent)
  - Visual stacking effect for multiple war rounds, with previous rounds visible behind new ones
- Game status and round information
- Action buttons (Draw Card, Attack, Collect)

Notable UI features:
- Health bars for visual HP representation
- Card placeholders to maintain layout consistency
- Responsive design using Tailwind CSS

## API Reference
(This section would be populated if backend API routes are implemented)

## Bigfoot Types
The game features various Bigfoot types with unique attributes and abilities. Each Bigfoot type has:
- Name
- Maximum hit points
- Special attacks tied to specific card values

## Deployment
The application can be deployed on Vercel or any other platform that supports Next.js applications.

## Data Dictionary
- `Card`: { suit: string, value: number }
- `GameState`: {
    playerDeck: Card[],
    opponentDeck: Card[],
    playerWinPile: Card[],
    opponentWinPile: Card[],
    playerCard: Card | null,
    opponentCard: Card | null,
    warPile: Card[],
    warCards: { player: Card[], opponent: Card[] },
    playerBigfoot: BigfootType,
    opponentBigfoot: BigfootType,
    playerHP: number,
    opponentHP: number,
    gameStatus: string,
    roundsPlayed: number,
    discardPile: Card[]
  }
- `BigfootType`: {
    name: string,
    maxHitPoints: number,
    attacks: { cardValue: number, name: string, damage: number }[]
  }

## Glossary
- Deck: The set of cards a player currently holds
- Win Pile: The set of cards a player has won
- War Pile: The set of cards placed during a "war" scenario
- War: When both players draw cards of equal value
- Fisher-Yates Shuffle: An algorithm for generating a random permutation of a finite sequence
- Bigfoot Type: A specific kind of Bigfoot with unique attributes and abilities
- HP (Hit Points): A measure of a Bigfoot's health in the game