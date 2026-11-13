# 🎮 NEON XO — Modern Next.js Tic Tac Toe Platform (PWA & Minimax AI)

**NEON XO** is a modernized, feature-rich **Progressive Web App (PWA)** Tic Tac Toe gaming platform built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. It combines glowing neon aesthetics and glassmorphism with an intelligent, unbeatable **Minimax AI** opponent, meme sound effects, match tournaments, and offline support.

---

## 🔗 Live Game & PWA Installation

- **Live URL:** [https://tictactoe-neonxo.site/](https://tictactoe-neonxo.site/)
- **Install as App:**
  - **Android (Chrome):** Tap "Install App" or "Add to Home screen"
  - **Desktop (Chrome/Edge/Brave):** Click the install icon in the address bar or the in-game install prompt
  - **iOS (Safari):** Tap Share &rarr; "Add to Home Screen"
- **Offline Capable:** Full offline gameplay cached via Progressive Web App Service Worker.

---

## 🕹️ Game Modes

### 1. Two Players (Local Pass & Play)
- Custom names for Player X and Player O
- Turn indicator with glowing visual focus
- Instant win detection (rows, columns, diagonals)
- Persistent scoreboard and win percentage tracking
- Draw detection

### 2. One Player vs Computer (AI Opponent)
- **Player:** X &bull; **Computer (NeonBot):** O
- 3 Distinct Difficulty Levels:
  1. **Easy:** Casual play with occasional blunders.
  2. **Medium:** Balanced heuristic strategy with 85% tactical block rate.
  3. **Hard:** Powered by the mathematical **Minimax Algorithm**. Evaluates the complete game tree and plays flawlessly. Unbeatable!
- Natural bot thinking animation with board locking during computation.

---

## 🔊 Sound Effects & Meme Audio

All original audio assets are preserved and enhanced:
- **Button Clicks:** `sounds/click.mp3`
- **Player Moves:** `sounds/turnX.mp3` (Player X) and `sounds/turnO.mp3` (Player O)
- **Match Countdown:** `sounds/count.mp3` (3-2-1 countdown transition)
- **Victory:** `sounds/win.mp3` (with celebratory confetti particles)
- **Draw:** `sounds/draw.mp3`
- **Special Moye Moye Meme Sound:** `sounds/moye-moye.mp3`
  - *Trigger Condition:* Automatically plays **only** when the human player is defeated by the computer bot in Single-Player mode.
  - Never plays on draws, in two-player games, or on restarts.
  - Fully respects the global mute/unmute toggle.

---

## ⚡ Key Features

- **Neon Cyber Aesthetic:** Glassmorphic UI with glowing cyan and magenta visual hierarchy.
- **Tournament Series:** Best-of-1, Best-of-3, and Best-of-5 tournament series modes.
- **Match History:** Persistent match logs tracking mode, winner, result, and timestamp.
- **Dark & Light Mode:** Neon Dark mode & clean Cyber Light mode toggle with persistent state.
- **Full Keyboard Accessibility:**
  - Arrow keys: Navigate cells
  - Digits 1–9: Instant cell placement
  - Enter / Space: Select focused cell
  - Escape: Close any open modal
  - ARIA Live regions for screen-reader friendly status announcements
- **Mobile First & Haptic Feedback:** Fluid touch interactions with device vibration feedback on supported mobile devices.
- **SEO & Structured Data:** Next.js Metadata API, dynamic `sitemap.xml`, `robots.txt`, and Google JSON-LD `VideoGame` / `WebApplication` schemas.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom neon & glass design system)
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti
- **PWA:** Web App Manifest & Custom Service Worker (`public/sw.js`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node.js 24)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Gulam-Mohyudin/Neon-XO.git
cd "Neon XO - Updated"

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Compile and optimize for production
npm run build

# Start production server
npm run start
```

---

## 👤 Author

**Gulam Mohyudin Memon**  
_Full Stack Web Developer & Software Engineer_  
Website: [https://tictactoe-neonxo.site/](https://tictactoe-neonxo.site/)
