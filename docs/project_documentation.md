# Bigfoot War Game Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Game Logic](#game-logic)
5. [State Management](#state-management)
6. [API Reference](#api-reference)
7. [Integration](#integration)
8. [Deployment](#deployment)
9. [Data Dictionary](#data-dictionary)
10. [Glossary](#glossary)

## Introduction
Bigfoot War is a digital adaptation of the classic card game War, implemented as a web application using Next.js and TypeScript.

## Tech Stack
- Frontend: Next.js, React, TypeScript
- Styling: Tailwind CSS
- State Management: React Hooks (useState, useEffect)
- API Requests: Axios
- Backend: Next.js API Routes
- Deployment: Vercel

## Architecture
The application follows a client-server architecture:
- Client: React components rendered by Next.js
- Server: Next.js API routes for game state management
- Deployment: Vercel for both frontend and backend

## Game Logic
The game follows these main steps:
1. Deck initialization and shuffling
2. Card drawing and comparison
3. Handling war scenarios
4. Managing win piles
5. Determining game end conditions

Key functions:
- `initializeGame()`: Sets up the initial game state
- `drawCard()`: Handles the main game logic for drawing and comparing cards
- `fisherYatesShuffle()`: Implements the Fisher-Yates shuffle algorithm for deck randomization

## State Management
The game state is managed using React's useState hook. The main state object (`gameState`) includes:
- Player and computer decks
- Player and computer win piles
- War pile
- Current player and computer cards
- Game status

The state is updated after each move and synchronized with the server using the `updateGameState()` function.

## API Reference
The game uses a single API endpoint:

- `POST /api/game-state`
  - Purpose: Update and validate the game state
  - Request body: GameState object
  - Response: 
    - Success: `{ message: 'Game state updated successfully' }`
    - Error: `{ message: 'Invalid game state', error: string }`

## Integration
The game is integrated into the main application as a React component (`BigfootWar`). It's rendered on the home page (`pages/index.tsx`) within the main layout.

## Deployment
The application is deployed on Vercel. To deploy:
1. Ensure you have a Vercel account and the Vercel CLI installed
2. Run `vercel` in the project root to deploy
3. For production deployment, use `vercel --prod`

## Data Dictionary
- `Card`: { suit: string, value: number }
- `GameState`: {
    playerDeck: Card[],
    computerDeck: Card[],
    playerWinPile: Card[],
    computerWinPile: Card[],
    warPile: Card[],
    gameStatus: string,
    playerCard: Card | null,
    computerCard: Card | null
  }

## Glossary
- Deck: The set of cards a player currently holds
- Win Pile: The set of cards a player has won
- War Pile: The set of cards placed during a "war" scenario
- War: When both players draw cards of equal value
- Fisher-Yates Shuffle: An algorithm for generating a random permutation of a finite sequence