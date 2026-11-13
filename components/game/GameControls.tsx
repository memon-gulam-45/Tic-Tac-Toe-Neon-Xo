'use client';

import React from 'react';
import { GameMode, AIDifficulty, MatchFormat } from '@/types/game';
import { RotateCcw, PlusCircle, Users, Bot, History, Volume2, VolumeX, Moon, Sun, Settings } from 'lucide-react';
import { soundManager } from '@/lib/soundController';

interface GameControlsProps {
  onRestartRound: () => void;
  onOpenNewGame: () => void;
  onOpenHistory: () => void;
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  difficulty: AIDifficulty;
  onDifficultyChange: (diff: AIDifficulty) => void;
  matchFormat: MatchFormat;
  onFormatChange: (format: MatchFormat) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  disabled?: boolean;
}

export default function GameControls({
  onRestartRound,
  onOpenNewGame,
  onOpenHistory,
  gameMode,
  onModeChange,
  difficulty,
  onDifficultyChange,
  matchFormat,
  onFormatChange,
  isMuted,
  onToggleMute,
  isDarkMode,
  onToggleTheme,
  disabled = false,
}: GameControlsProps) {
  const handleAction = (cb: () => void) => {
    soundManager.playClick();
    cb();
  };

  return (
    <div className="w-full max-w-md px-4 mt-4 space-y-3">
      {/* Primary Game Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleAction(onRestartRound)}
          disabled={disabled}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 active:scale-95 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          Restart Round
        </button>

        <button
          onClick={() => handleAction(onOpenNewGame)}
          disabled={disabled}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 active:scale-95 shadow-[0_0_20px_rgba(255,0,127,0.4)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          New Game
        </button>
      </div>

      {/* Mode & Difficulty Quick Selector */}
      <div className="glass-panel rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 border border-white/10">
        <div className="flex items-center gap-1.5 bg-black/20 p-1 rounded-lg">
          <button
            onClick={() => handleAction(() => onModeChange('two-player'))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              gameMode === 'two-player'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            2 Players
          </button>
          <button
            onClick={() => handleAction(() => onModeChange('vs-computer'))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              gameMode === 'vs-computer'
                ? 'bg-pink-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            Vs AI
          </button>
        </div>

        {/* Difficulty pills (only visible when in AI mode) */}
        {gameMode === 'vs-computer' && (
          <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg">
            {(['easy', 'medium', 'hard'] as AIDifficulty[]).map((level) => (
              <button
                key={level}
                onClick={() => handleAction(() => onDifficultyChange(level))}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold capitalize transition-all ${
                  difficulty === level
                    ? level === 'hard'
                      ? 'bg-red-500 text-white'
                      : level === 'medium'
                      ? 'bg-amber-400 text-black'
                      : 'bg-emerald-400 text-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        )}

        {/* Secondary Utility Controls */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => handleAction(onOpenHistory)}
            title="Match History"
            aria-label="View match history"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <History className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            className={`p-2 rounded-lg transition-colors ${
              isMuted
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                : 'bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-cyan-200'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onToggleTheme}
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-yellow-300 hover:text-yellow-200 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
