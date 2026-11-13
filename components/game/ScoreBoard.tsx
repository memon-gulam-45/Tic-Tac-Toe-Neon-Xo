'use client';

import React from 'react';
import { GameMode, SeriesScore } from '@/types/game';
import { Trophy, Award, Equal, Flame } from 'lucide-react';

interface ScoreBoardProps {
  gameMode: GameMode;
  p1Name: string;
  p2Name: string;
  p1Wins: number;
  p2Wins: number;
  draws: number;
  seriesScore?: SeriesScore | null;
}

export default function ScoreBoard({
  gameMode,
  p1Name,
  p2Name,
  p1Wins,
  p2Wins,
  draws,
  seriesScore,
}: ScoreBoardProps) {
  const totalMatches = p1Wins + p2Wins + draws;
  const p1WinRate = totalMatches > 0 ? Math.round((p1Wins / totalMatches) * 100) : 0;

  return (
    <div className="w-full max-w-md px-4 mt-2">
      <div className="glass-panel rounded-2xl p-3 sm:p-4 border border-white/10 shadow-lg">
        {/* Series Progress if active */}
        {seriesScore && seriesScore.targetWins > 1 && (
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 text-xs">
            <span className="font-semibold text-cyan-300 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-yellow-400" />
              Best of {seriesScore.targetWins * 2 - 1} Series
            </span>
            <div className="flex items-center gap-2">
              <span className="text-pink-400 font-bold">{p1Name}: {seriesScore.p1Wins}</span>
              <span className="text-slate-400 font-light">vs</span>
              <span className="text-cyan-400 font-bold">{p2Name}: {seriesScore.p2Wins}</span>
            </div>
          </div>
        )}

        {/* 3 Main Stat Pillars */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {/* P1 Score */}
          <div className="bg-pink-500/10 dark:bg-pink-950/20 rounded-xl p-2 sm:p-2.5 border border-pink-500/20">
            <p className="text-[11px] sm:text-xs text-pink-300 font-semibold truncate flex items-center justify-center gap-1">
              <Trophy className="w-3 h-3 text-pink-400 hidden sm:inline" />
              {p1Name} (X)
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-pink-400 mt-0.5">
              {p1Wins}
            </p>
            <span className="text-[10px] text-pink-300/70 block mt-0.5">
              {p1WinRate}% Win Rate
            </span>
          </div>

          {/* Draws Score */}
          <div className="bg-white/5 dark:bg-slate-800/40 rounded-xl p-2 sm:p-2.5 border border-white/10 flex flex-col justify-between">
            <p className="text-[11px] sm:text-xs text-slate-300 font-semibold flex items-center justify-center gap-1">
              <Equal className="w-3 h-3 text-yellow-400 hidden sm:inline" />
              Draws
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-yellow-300 mt-0.5">
              {draws}
            </p>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {totalMatches} Played
            </span>
          </div>

          {/* P2 Score */}
          <div className="bg-cyan-500/10 dark:bg-cyan-950/20 rounded-xl p-2 sm:p-2.5 border border-cyan-500/20">
            <p className="text-[11px] sm:text-xs text-cyan-300 font-semibold truncate flex items-center justify-center gap-1">
              <Award className="w-3 h-3 text-cyan-400 hidden sm:inline" />
              {p2Name} (O)
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mt-0.5">
              {p2Wins}
            </p>
            <span className="text-[10px] text-cyan-300/70 block mt-0.5">
              {gameMode === 'vs-computer' ? 'AI Bot' : 'Player 2'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
