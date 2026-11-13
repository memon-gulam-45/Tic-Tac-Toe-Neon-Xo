'use client';

import React from 'react';
import { Player, GameMode, AIDifficulty } from '@/types/game';
import { Bot, User, Cpu, Sparkles } from 'lucide-react';

interface TurnIndicatorProps {
  currentTurn: Player;
  p1Name: string;
  p2Name: string;
  gameMode: GameMode;
  difficulty: AIDifficulty;
  isBotThinking: boolean;
  isGameOver: boolean;
  winner: Player | 'Draw' | null;
}

export default function TurnIndicator({
  currentTurn,
  p1Name,
  p2Name,
  gameMode,
  difficulty,
  isBotThinking,
  isGameOver,
  winner,
}: TurnIndicatorProps) {
  const isXTurn = currentTurn === 'X';
  const currentPlayerName = isXTurn ? p1Name : p2Name;
  const isBotTurn = gameMode === 'vs-computer' && !isXTurn;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center my-3 w-full max-w-md px-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-semibold border border-white/10 flex items-center gap-1.5">
          {gameMode === 'two-player' ? (
            <>
              <User className="w-3.5 h-3.5 text-cyan-400" />
              2-Player Match
            </>
          ) : (
            <>
              <Cpu className="w-3.5 h-3.5 text-pink-400" />
              Vs AI &bull; <span className="capitalize text-pink-300">{difficulty}</span>
            </>
          )}
        </span>
      </div>

      <div
        className={`w-full py-2.5 px-4 rounded-xl glass-panel transition-all duration-300 flex items-center justify-between border ${
          isGameOver
            ? 'border-yellow-400/50 shadow-[0_0_15px_rgba(255,230,109,0.3)]'
            : isXTurn
            ? 'border-pink-500/60 shadow-[0_0_15px_rgba(255,0,127,0.35)]'
            : 'border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.35)]'
        }`}
      >
        {/* Left: Player X Indicator */}
        <div
          className={`flex items-center gap-2 transition-opacity duration-200 ${
            isXTurn && !isGameOver ? 'opacity-100 scale-105' : 'opacity-50 scale-95'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/50 flex items-center justify-center font-extrabold text-pink-400 text-lg shadow-[0_0_10px_rgba(255,0,127,0.4)]">
            X
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-400 font-medium truncate max-w-[80px] sm:max-w-[100px]">
              {p1Name}
            </p>
            <p className="text-xs font-semibold text-pink-400">
              {isXTurn && !isGameOver ? 'Your Turn' : 'Ready'}
            </p>
          </div>
        </div>

        {/* Center: Turn Status Text */}
        <div className="flex flex-col items-center px-2">
          {isGameOver ? (
            <span className="text-sm font-bold text-yellow-300 flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Match Finished
            </span>
          ) : isBotThinking ? (
            <div className="flex items-center gap-1.5 text-cyan-300 text-xs sm:text-sm font-semibold">
              <Bot className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          ) : (
            <div className="text-center">
              <span className="text-xs text-slate-400 block font-light">Turn</span>
              <span
                className={`text-sm sm:text-base font-bold ${
                  isXTurn ? 'text-pink-400' : 'text-cyan-400'
                }`}
              >
                {currentPlayerName}
              </span>
            </div>
          )}
        </div>

        {/* Right: Player O Indicator */}
        <div
          className={`flex items-center gap-2 transition-opacity duration-200 flex-row-reverse text-right ${
            !isXTurn && !isGameOver ? 'opacity-100 scale-105' : 'opacity-50 scale-95'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center font-extrabold text-cyan-400 text-lg shadow-[0_0_10px_rgba(0,240,255,0.4)]">
            O
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 font-medium truncate max-w-[80px] sm:max-w-[100px]">
              {p2Name}
            </p>
            <p className="text-xs font-semibold text-cyan-400">
              {!isXTurn && !isGameOver ? (isBotTurn ? 'Calculating' : 'Your Turn') : 'Ready'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
