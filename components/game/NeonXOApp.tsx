'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Player,
  GameMode,
  AIDifficulty,
  MatchFormat,
  BoardState,
  ScoreState,
  MatchHistoryItem,
  SeriesScore,
} from '@/types/game';
import { checkWinnerInfo, isBoardFull, computeAIMove } from '@/lib/ai/minimax';
import { soundManager } from '@/lib/soundController';
import GameHeader from './GameHeader';
import TurnIndicator from './TurnIndicator';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import GameControls from './GameControls';
import ResultModal from './ResultModal';
import SetupModal from './SetupModal';
import HistoryModal from './HistoryModal';
import RulesModal from './RulesModal';
import CountdownOverlay from './CountdownOverlay';
import PWAInstallBanner from './PWAInstallBanner';

const INITIAL_BOARD: BoardState = Array(9).fill(null);

const DEFAULT_SCORES: ScoreState = {
  twoPlayer: { p1Wins: 0, p2Wins: 0, draws: 0, total: 0 },
  vsBot: { playerWins: 0, botWins: 0, draws: 0, total: 0 },
};

export default function NeonXOApp() {
  const [mounted, setMounted] = useState(false);

  // Core Game Config
  const [gameMode, setGameMode] = useState<GameMode>('two-player');
  const [difficulty, setDifficulty] = useState<AIDifficulty>('medium');
  const [matchFormat, setMatchFormat] = useState<MatchFormat>('single');
  const [p1Name, setP1Name] = useState<string>('Player 1');
  const [p2Name, setP2Name] = useState<string>('Player 2');

  // Board & Turn State
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [currentTurn, setCurrentTurn] = useState<Player>('X');
  const [winningLine, setWinningLine] = useState<[number, number, number] | null>(null);
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
  const [isBotThinking, setIsBotThinking] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Settings & Storage
  const [scores, setScores] = useState<ScoreState>(DEFAULT_SCORES);
  const [history, setHistory] = useState<MatchHistoryItem[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Series Tournament Tracking
  const [seriesScore, setSeriesScore] = useState<SeriesScore>({
    p1Wins: 0,
    p2Wins: 0,
    targetWins: 1,
    isComplete: false,
    seriesWinner: null,
  });

  // Modals & Overlays
  const [isSetupOpen, setIsSetupOpen] = useState<boolean>(false);
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isCountdownActive, setIsCountdownActive] = useState<boolean>(false);

  // Target wins helper based on format
  const getTargetWins = (format: MatchFormat): number => {
    if (format === 'best-of-5') return 3;
    if (format === 'best-of-3') return 2;
    return 1;
  };

  // Mount initialization: Load persistent state safely
  useEffect(() => {
    setMounted(true);

    try {
      const storedMuted = localStorage.getItem('neon_xo_muted');
      const mutedVal = storedMuted === 'true';
      setIsMuted(mutedVal);
      soundManager.init(mutedVal);

      const storedTheme = localStorage.getItem('neon_xo_theme');
      if (storedTheme === 'light') {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }

      const storedScores = localStorage.getItem('neon_xo_scores');
      if (storedScores) {
        setScores(JSON.parse(storedScores));
      }

      const storedHistory = localStorage.getItem('neon_xo_history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }

      const storedP1 = localStorage.getItem('neon_xo_p1');
      if (storedP1) setP1Name(storedP1);

      const storedP2 = localStorage.getItem('neon_xo_p2');
      if (storedP2) setP2Name(storedP2);
    } catch {
      // LocalStorage access restricted
    }
  }, []);

  // Save scores to localStorage
  const updateScores = useCallback((updater: (prev: ScoreState) => ScoreState) => {
    setScores((prev) => {
      const updated = updater(prev);
      try {
        localStorage.setItem('neon_xo_scores', JSON.stringify(updated));
      } catch {
        // Ignored
      }
      return updated;
    });
  }, []);

  // Save history to localStorage
  const addHistoryItem = useCallback((item: MatchHistoryItem) => {
    setHistory((prev) => {
      const updated = [item, ...prev].slice(0, 25);
      try {
        localStorage.setItem('neon_xo_history', JSON.stringify(updated));
      } catch {
        // Ignored
      }
      return updated;
    });
  }, []);

  // Theme Toggle
  const toggleTheme = () => {
    soundManager.playClick();
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('neon_xo_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('neon_xo_theme', 'light');
    }
  };

  // Sound Toggle
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
    try {
      localStorage.setItem('neon_xo_muted', String(nextMuted));
    } catch {
      // Ignored
    }
  };

  // Trigger celebration particles
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#ff007f', '#ffe66d', '#ffffff'],
      });
    } catch {
      // Confetti not supported
    }
  };

  // Handle Game Over: Win or Draw
  const handleGameOver = useCallback(
    (winningSymbol: Player | 'Draw', winLine: [number, number, number] | null) => {
      setIsGameOver(true);
      setWinner(winningSymbol);
      if (winLine) setWinningLine(winLine);

      const winningPlayerName =
        winningSymbol === 'Draw'
          ? 'Draw'
          : winningSymbol === 'X'
          ? p1Name
          : p2Name;

      // Update scores & series
      let newSeries = { ...seriesScore };
      if (winningSymbol === 'X') {
        const nextWins = seriesScore.p1Wins + 1;
        const complete = nextWins >= seriesScore.targetWins;
        newSeries = {
          ...newSeries,
          p1Wins: nextWins,
          isComplete: complete,
          seriesWinner: complete ? 'X' : null,
        };
      } else if (winningSymbol === 'O') {
        const nextWins = seriesScore.p2Wins + 1;
        const complete = nextWins >= seriesScore.targetWins;
        newSeries = {
          ...newSeries,
          p2Wins: nextWins,
          isComplete: complete,
          seriesWinner: complete ? 'O' : null,
        };
      }
      setSeriesScore(newSeries);

      // Score counter tracking
      if (gameMode === 'two-player') {
        updateScores((prev) => ({
          ...prev,
          twoPlayer: {
            p1Wins: winningSymbol === 'X' ? prev.twoPlayer.p1Wins + 1 : prev.twoPlayer.p1Wins,
            p2Wins: winningSymbol === 'O' ? prev.twoPlayer.p2Wins + 1 : prev.twoPlayer.p2Wins,
            draws: winningSymbol === 'Draw' ? prev.twoPlayer.draws + 1 : prev.twoPlayer.draws,
            total: prev.twoPlayer.total + 1,
          },
        }));
      } else {
        updateScores((prev) => ({
          ...prev,
          vsBot: {
            playerWins: winningSymbol === 'X' ? prev.vsBot.playerWins + 1 : prev.vsBot.playerWins,
            botWins: winningSymbol === 'O' ? prev.vsBot.botWins + 1 : prev.vsBot.botWins,
            draws: winningSymbol === 'Draw' ? prev.vsBot.draws + 1 : prev.vsBot.draws,
            total: prev.vsBot.total + 1,
          },
        }));
      }

      // Add to match history
      addHistoryItem({
        id: Date.now().toString(),
        mode: gameMode,
        difficulty: gameMode === 'vs-computer' ? difficulty : undefined,
        result:
          winningSymbol === 'Draw'
            ? 'draw'
            : gameMode === 'vs-computer'
            ? winningSymbol === 'X'
              ? 'human-win'
              : 'bot-win'
            : winningSymbol === 'X'
            ? 'p1-win'
            : 'p2-win',
        winnerSymbol: winningSymbol,
        winnerName: winningPlayerName,
        p1Name,
        p2Name,
        timestamp: Date.now(),
      });

      // ==========================================
      // AUDIO PLAYBACK: CRITICAL REQUIREMENTS
      // ==========================================
      if (gameMode === 'vs-computer') {
        if (winningSymbol === 'O') {
          // HUMAN LOST AGAINST THE BOT:
          // CRITICAL: Play moye-moye.mp3 automatically!
          soundManager.playMoyeMoye();
        } else if (winningSymbol === 'X') {
          // Human won!
          soundManager.playWin();
          triggerConfetti();
        } else {
          // Draw
          soundManager.playDraw();
        }
      } else {
        // 2-Player mode:
        if (winningSymbol === 'Draw') {
          soundManager.playDraw();
        } else {
          soundManager.playWin();
          triggerConfetti();
        }
      }

      // Show result modal after a brief moment to admire the winning line
      setTimeout(() => {
        setIsResultOpen(true);
      }, 1000);
    },
    [gameMode, difficulty, p1Name, p2Name, seriesScore, updateScores, addHistoryItem]
  );

  // Bot Turn Effect
  useEffect(() => {
    if (
      gameMode !== 'vs-computer' ||
      currentTurn !== 'O' ||
      isGameOver ||
      isCountdownActive
    ) {
      return;
    }

    setIsBotThinking(true);

    const botTimer = setTimeout(() => {
      // Find move
      const botMove = computeAIMove(board, difficulty, 'O', 'X');
      if (botMove !== -1 && board[botMove] === null && !isGameOver) {
        soundManager.playTurn('O');

        const newBoard = [...board];
        newBoard[botMove] = 'O';
        setBoard(newBoard);

        // Haptic feedback
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate?.(15);
        }

        // Check if bot won or drew
        const winInfo = checkWinnerInfo(newBoard);
        if (winInfo) {
          handleGameOver('O', winInfo.pattern);
        } else if (isBoardFull(newBoard)) {
          handleGameOver('Draw', null);
        } else {
          setCurrentTurn('X');
        }
      }
      setIsBotThinking(false);
    }, 550);

    return () => clearTimeout(botTimer);
  }, [board, currentTurn, gameMode, difficulty, isGameOver, isCountdownActive, handleGameOver]);

  // Handle Human Cell Click
  const handleCellClick = (index: number) => {
    if (board[index] !== null || isGameOver || isBotThinking || isCountdownActive) {
      return;
    }

    const playerSymbol = currentTurn;
    soundManager.playTurn(playerSymbol);

    // Haptic feedback
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(15);
    }

    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);

    // Check win or draw
    const winInfo = checkWinnerInfo(newBoard);
    if (winInfo) {
      handleGameOver(playerSymbol, winInfo.pattern);
      return;
    }

    if (isBoardFull(newBoard)) {
      handleGameOver('Draw', null);
      return;
    }

    // Switch turns
    setCurrentTurn(playerSymbol === 'X' ? 'O' : 'X');
  };

  // Restart Round (Same players & scores, clears board)
  const handleRestartRound = (withCountdown = false) => {
    soundManager.stopAll();
    setBoard(INITIAL_BOARD);
    setWinningLine(null);
    setWinner(null);
    setIsGameOver(false);
    setIsBotThinking(false);
    setCurrentTurn('X');
    setIsResultOpen(false);

    if (withCountdown) {
      setIsCountdownActive(true);
    }
  };

  // Start Completely New Game (Opens Setup Modal)
  const handleOpenNewGame = () => {
    soundManager.stopAll();
    setIsSetupOpen(true);
  };

  // Apply new setup configuration
  const handleApplySetup = (config: {
    mode: GameMode;
    p1Name: string;
    p2Name: string;
    difficulty: AIDifficulty;
    matchFormat: MatchFormat;
    useCountdown: boolean;
  }) => {
    setGameMode(config.mode);
    setP1Name(config.p1Name);
    setP2Name(config.p2Name);
    setDifficulty(config.difficulty);
    setMatchFormat(config.matchFormat);

    const targetWins = getTargetWins(config.matchFormat);
    setSeriesScore({
      p1Wins: 0,
      p2Wins: 0,
      targetWins,
      isComplete: false,
      seriesWinner: null,
    });

    try {
      localStorage.setItem('neon_xo_p1', config.p1Name);
      localStorage.setItem('neon_xo_p2', config.p2Name);
    } catch {
      // Ignored
    }

    setIsSetupOpen(false);
    handleRestartRound(config.useCountdown);
  };

  // Quick mode toggle from controls
  const handleQuickModeChange = (newMode: GameMode) => {
    if (newMode === gameMode) return;
    setGameMode(newMode);
    if (newMode === 'vs-computer') {
      if (p1Name === 'Player 1') setP1Name('Human');
      setP2Name('NeonBot');
    } else {
      if (p1Name === 'Human') setP1Name('Player 1');
      if (p2Name === 'NeonBot') setP2Name('Player 2');
    }
    handleRestartRound(false);
  };

  // Clear history
  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('neon_xo_history');
    } catch {
      // Ignored
    }
  };

  const currentStats = gameMode === 'two-player' ? scores.twoPlayer : scores.vsBot;

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f24] text-white">
        <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-between transition-colors duration-300 ${
      isDarkMode ? 'neon-bg-dark text-white' : 'neon-bg-light text-slate-900'
    }`}>
      {/* 3-2-1 Countdown Overlay */}
      <CountdownOverlay
        isActive={isCountdownActive}
        onComplete={() => setIsCountdownActive(false)}
        seconds={3}
      />

      {/* Main Game Interface Container */}
      <div className="w-full max-w-xl flex flex-col items-center flex-grow">
        {/* Game Header */}
        <GameHeader onOpenRules={() => setIsRulesOpen(true)} />

        {/* Turn Indicator */}
        <TurnIndicator
          currentTurn={currentTurn}
          p1Name={p1Name}
          p2Name={p2Name}
          gameMode={gameMode}
          difficulty={difficulty}
          isBotThinking={isBotThinking}
          isGameOver={isGameOver}
          winner={winner}
        />

        {/* Interactive 3x3 Game Board */}
        <GameBoard
          board={board}
          onCellClick={handleCellClick}
          winningLine={winningLine}
          disabled={isGameOver || isBotThinking || isCountdownActive}
          currentTurn={currentTurn}
        />

        {/* Score Board */}
        <ScoreBoard
          gameMode={gameMode}
          p1Name={p1Name}
          p2Name={p2Name}
          p1Wins={gameMode === 'two-player' ? scores.twoPlayer.p1Wins : scores.vsBot.playerWins}
          p2Wins={gameMode === 'two-player' ? scores.twoPlayer.p2Wins : scores.vsBot.botWins}
          draws={currentStats.draws}
          seriesScore={seriesScore}
        />

        {/* Controls: Restart, New Game, Sound, Theme */}
        <GameControls
          onRestartRound={() => handleRestartRound(false)}
          onOpenNewGame={handleOpenNewGame}
          onOpenHistory={() => setIsHistoryOpen(true)}
          gameMode={gameMode}
          onModeChange={handleQuickModeChange}
          difficulty={difficulty}
          onDifficultyChange={(newDiff) => setDifficulty(newDiff)}
          matchFormat={matchFormat}
          onFormatChange={(fmt) => setMatchFormat(fmt)}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          disabled={isBotThinking || isCountdownActive}
        />
      </div>

      {/* PWA Install Banner */}
      <PWAInstallBanner />

      {/* Result Celebration / Moye Moye Modal */}
      <ResultModal
        isOpen={isResultOpen}
        onClose={() => setIsResultOpen(false)}
        winner={winner}
        winnerName={winner === 'Draw' ? 'Draw' : winner === 'X' ? p1Name : p2Name}
        gameMode={gameMode}
        p1Name={p1Name}
        p2Name={p2Name}
        p1Wins={gameMode === 'two-player' ? scores.twoPlayer.p1Wins : scores.vsBot.playerWins}
        p2Wins={gameMode === 'two-player' ? scores.twoPlayer.p2Wins : scores.vsBot.botWins}
        draws={currentStats.draws}
        seriesScore={seriesScore}
        onPlayAgain={() => handleRestartRound(false)}
        onNewGame={handleOpenNewGame}
      />

      {/* Setup / New Game Modal */}
      <SetupModal
        isOpen={isSetupOpen}
        onClose={() => setIsSetupOpen(false)}
        onStartGame={handleApplySetup}
        initialMode={gameMode}
        initialP1Name={p1Name}
        initialP2Name={p2Name}
        initialDifficulty={difficulty}
        initialFormat={matchFormat}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
      />

      {/* Rules Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />
    </div>
  );
}
