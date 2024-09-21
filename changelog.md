# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2023-04-14

### Added
- Initial project setup using Next.js 13 with TypeScript
- Tailwind CSS integration for styling
- ESLint and Prettier configuration for code formatting and linting
- Custom `Layout` component for consistent page structure
- `Header` component with navigation links
- `Footer` component with social media links and copyright information
- Home page (`pages/index.tsx`) with hero section and feature highlights
- About page (`pages/about.tsx`) with company information
- Contact page (`pages/contact.tsx`) with contact form
- API route for handling contact form submissions (`pages/api/contact.ts`)
- Custom 404 error page (`pages/404.tsx`)
- Environment variables configuration (`.env.local` and `.env.example`)
- Custom hooks:
  - `useScrollPosition` for tracking scroll position
  - `useWindowSize` for responsive design
- Utility functions in `utils/helpers.ts`
- Custom `Button` component with various styles
- `SEO` component for managing meta tags
- Responsive design implementation
- Basic accessibility features (ARIA labels, keyboard navigation)
- Initial unit tests setup with Jest and React Testing Library
- `README.md` with project information and setup instructions
- `LICENSE` file with MIT license
- `.gitignore` file for excluding unnecessary files from version control
- Favicon and other necessary assets in the `public` folder

### Changed
- Updated `next.config.js` with custom configuration options
- Modified `tsconfig.json` for stricter TypeScript checks

### Security
- Implemented basic form validation and sanitization for the contact form
- Set up Content Security Policy headers in `next.config.js`

## [0.1.1] - 2023-04-15

### Changed
- Removed conflicting `src/app/page.tsx` file to resolve routing issues
- Confirmed use of Pages Router instead of App Router for current project structure

### Fixed
- Resolved build error caused by conflicting app and page files

## [0.1.2] - 2023-04-15

### Changed
- Updated `next.config.js` to explicitly use Pages Router by removing App Router experimental flag
- Added developer, AI, and layperson notes to `next.config.js` for better understanding of the configuration

### Fixed
- Ensured consistent routing approach across the project by confirming Pages Router usage in configuration

## [0.1.3] - 2023-04-15

### Added
- Created `Header` component with basic navigation
- Created `Footer` component with copyright information
- Updated `Layout` component to use new `Header` and `Footer` components

### Fixed
- Resolved build error caused by missing `Header` and `Footer` components

## [0.1.4] - 2023-04-15

### Added
- Created `Hero` component for the home page
- Created `FeatureHighlights` component to showcase key features
- Added detailed comments and notes to new components

### Fixed
- Resolved build error caused by missing `Hero` and `FeatureHighlights` components

## [0.2.0] - 2023-04-16

### Added
- Created initial version of Bigfoot War card game
- Implemented `BigfootWar` component with game logic
- Updated home page to display the Bigfoot War game
- Added game state management using React hooks
- Implemented card drawing and basic game rules

### Changed
- Refactored `pages/index.tsx` to focus on the Bigfoot War game
- Updated page title and meta description for the game

### Removed
- Removed `Hero` and `FeatureHighlights` components as they're no longer needed for the game

## [0.3.0] - 2023-04-17

### Added
- Implemented war scenarios in the Bigfoot War game
- Added a war pile to keep track of cards during war rounds
- Created `initiateWar` function to handle war logic
- Updated game status messages to reflect war scenarios

### Changed
- Modified `drawCard` function to incorporate war logic
- Updated UI to display the number of cards in the war pile
- Refactored `createDeck` function to use `const` instead of `let` for loop variables

### Fixed
- Resolved linter errors in `BigfootWar` component

## [0.3.1] - 2023-04-17

### Changed
- Updated copyright information in the Footer component to "PspPspPastimes LLC"
- Made the copyright year dynamic in the Footer component

## [0.3.2] - 2023-04-17

### Added
- Created `components/BigfootWar.tsx` file
- Created `components/Header.tsx` file with basic navigation

### Fixed
- Resolved linter errors by creating missing component files

## [0.4.0] - 2023-04-18

### Added
- Integrated Vercel for backend functionality
- Created API route for game state management (`pages/api/game-state.ts`)
- Implemented game state fetching and updating in `BigfootWar` component
- Added axios for API requests

### Changed
- Updated `BigfootWar` component to use the new API for game state management
- Modified `useEffect` in `BigfootWar` to fetch initial game state

### Security
- Implemented basic server-side game state storage

## [0.4.1] - 2023-04-19

### Fixed
- Resolved runtime error in `BigfootWar` component when a player's deck becomes empty
- Improved game end condition handling in `drawCard` function
- Disabled "Draw Card" button when the game is over
- Ensured game state is updated correctly after each move

### Changed
- Refactored `drawCard` function for better readability and error handling
- Updated UI to reflect game end state more accurately

## [0.5.0] - 2023-04-20

### Added
- Implemented Fisher-Yates shuffle algorithm for better card randomization
- Introduced win piles for both player and computer
- Added logic to shuffle and use win pile when a player's deck is empty

### Changed
- Updated `initializeGame` function to use the new shuffling algorithm
- Modified `drawCard` function to handle win piles and reshuffle when necessary
- Updated game state to include win piles for both players
- Improved game over conditions to consider both deck and win pile

### Fixed
- Ensured true randomization of cards at the start of each game
- Prevented game from ending prematurely when a player's deck is empty but they have cards in their win pile

### UI
- Added display of win pile card counts for both players

## [0.5.1] - 2023-04-21

### Fixed
- Corrected card tracking logic in the `drawCard` function to prevent card duplication
- Ensured cards are properly moved between decks, win piles, and the war pile
- Fixed game-ending conditions to accurately determine when a player has no cards left

### Changed
- Updated `drawCard` function to handle card movement more accurately
- Modified how cards are added to and removed from the war pile

### Added
- Improved logging of card counts for each pile to help track game progress

## [0.5.2] - 2023-04-22

### Fixed
- Corrected card tracking logic in the `drawCard` function to prevent card duplication
- Added sanity check to ensure the total number of cards remains constant throughout the game

### Changed
- Modified how cards are added to the war pile to maintain correct order
- Improved error logging for unexpected game states

### Added
- Implemented a card count verification step after each round to catch potential issues early

## [0.5.3] - 2023-04-23

### Fixed
- Implemented robust error checking in `BigfootWar` component to prevent card duplication
- Added automatic game reset when an invalid game state is detected
- Implemented server-side validation of game state in `game-state.ts` API route

### Changed
- Modified `updateGameState` function to handle server-side validation errors
- Updated `drawCard` function to reset the game if card count becomes incorrect

### Added
- Server-side `validateGameState` function to ensure game state integrity

## [0.5.4] - 2023-04-24

### Fixed
- Resolved runtime error caused by uninitialized game state in `BigfootWar` component
- Added null checks and default values in the component's render method to handle potential undefined states

### Changed
- Updated `BigfootWar` component to initialize game state immediately upon mounting
- Improved error handling and display of game state when data is loading or undefined

### Added
- Introduced `initialGameState` constant to provide a default state for the game

## [0.6.0] - 2023-04-25

### Added
- Implemented a new user interface for the Bigfoot War game
- Created a responsive layout with player on the left and computer on the right
- Added visual representation of cards using CSS
- Implemented color-coding for card suits (red for hearts and diamonds, black for spades and clubs)

### Changed
- Reorganized the game information display for better readability
- Improved button styling and layout
- Optimized the layout for mobile displays using Tailwind CSS flexbox and responsive classes

### UI
- Added a green background for the game status message
- Implemented a card-like design for displaying the current cards in play
- Improved overall spacing and alignment of game elements

## [0.6.1] - 2023-04-26

### Fixed
- Resolved runtime error caused by accessing properties of undefined gameState
- Added null check for gameState in the BigfootWar component

### Changed
- Updated BigfootWar component to handle null gameState
- Improved error handling in drawCard function

### Added
- Loading state display when gameState is null

## [0.6.2] - 2023-04-27

### Added
- Comprehensive comments to the `BigfootWar` component explaining the logic and functionality of each part

### Changed
- Improved code readability in the `BigfootWar` component

### Documentation
- Enhanced in-code documentation for easier maintenance and onboarding of new developers

## [0.7.0] - 2023-04-28

### Added
- Created a `docs` directory for project documentation
- Added comprehensive `project_documentation.md` file explaining various aspects of the project
- Included sections on tech stack, architecture, game logic, state management, API reference, integration, deployment, data dictionary, and glossary in the documentation

### Documentation
- Improved project documentation for easier onboarding and maintenance

## [0.8.0] - 2023-04-29

### Added
- Integrated Vercel v0 (Edge Functions) for improved performance
- Implemented game state validation using Edge Function
- Added AI opponent decision-making Edge Function (placeholder)
- Created leaderboard Edge Function for future multiplayer support
- Implemented game statistics Edge Function

### Changed
- Updated `next.config.js` to enable Edge Runtime

### Documentation
- Updated project documentation with information about Vercel v0 integration

## [0.9.0] - 2023-05-01

### Added
- Introduced Bigfoot types with unique attributes and abilities
- Created a database of different Bigfoot types in `utils/bigfootTypes.ts`
- Implemented Bigfoot selection feature for the player
- Added random Bigfoot selection for the computer opponent
- Introduced unlock conditions for different Bigfoot types

### Changed
- Updated `BigfootWar` component to incorporate Bigfoot types
- Modified game state to include player and computer Bigfoot types
- Updated UI to display chosen Bigfoot types and selection interface

### Game Mechanics
- Added progression system to unlock new Bigfoot types as the player wins games
- Integrated Bigfoot abilities to influence card values during gameplay

### UI
- Added Bigfoot selection interface before game start
- Updated player and computer sections to display chosen Bigfoot types

## [1.0.0] - 2023-05-02

### Added
- Initial release of Bigfoot War Game
- Created GitHub repository for the project
- Added README.md with project description and setup instructions

### Changed
- Prepared project structure for public release

### Documentation
- Updated project documentation for open-source release