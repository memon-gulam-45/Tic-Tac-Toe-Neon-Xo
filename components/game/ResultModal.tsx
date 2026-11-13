'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Player, GameMode, SeriesScore } from '@/types/game';
import { Trophy, Frown, Equal, RotateCcw, PlusCircle, Share2, Check } from 'lucide-react';
import { soundManager } from '@/lib/soundController';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner: Player | 'Draw' | null;
  winnerName: string;
  gameMode: GameMode;
  p1Name: string;
  p2Name: string;
  p1Wins: number;
  p2Wins: number;
  draws: number;
  seriesScore?: SeriesScore | null;
  onPlayAgain: () => void;
  onNewGame: () => void;
}

export default function ResultModal({
  isOpen,
  onClose,
  winner,
  winnerName,
  gameMode,
  p1Name,
  p2Name,
  p1Wins,
  p2Wins,
  draws,
  seriesScore,
  onPlayAgain,
  onNewGame,
}: ResultModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !winner) return null;

  const isHumanLoss = gameMode === 'vs-computer' && winner === 'O';
  const isHumanWin = gameMode === 'vs-computer' && winner === 'X';
  const isDraw = winner === 'Draw';

  const handleShare = async () => {
    soundManager.playClick();
    const shareText = isHumanWin
      ? `🏆 I just defeated NeonBot in Neon XO Tic Tac Toe! Can you beat it? Play free at https://tictactoe-neonxo.site/`
      : isHumanLoss
      ? `😅 NeonBot just outsmarted me with Moye Moye in Neon XO Tic Tac Toe! Challenge it at https://tictactoe-neonxo.site/`
      : `🎮 Great match in Neon XO Tic Tac Toe! Play online free at https://tictactoe-neonxo.site/`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Neon XO Tic Tac Toe',
          text: shareText,
          url: 'https://tictactoe-neonxo.site/',
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignored
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center p-2">
        {/* Outcome Graphic / Icon */}
        <div className="mb-4">
          {isDraw ? (
            <div className="w-20 h-20 rounded-full bg-yellow-500/20 border-2 border-yellow-400 flex items-center justify-center text-yellow-300 shadow-[0_0_30px_rgba(255,230,109,0.5)]">
              <Equal className="w-10 h-10" />
            </div>
          ) : isHumanLoss ? (
            <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-400 shadow-[0_0_30px_rgba(255,0,0,0.5)] animate-bounce">
              <Frown className="w-10 h-10" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500/30 to-pink-500/30 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(0,240,255,0.6)] animate-pulse">
              <Trophy className="w-10 h-10 text-yellow-300" />
            </div>
          )}
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide mb-2 text-white">
          {isDraw ? (
            <span className="text-yellow-300">It&apos;s a Draw!</span>
          ) : isHumanLoss ? (
            <span className="text-red-400">Moye Moye! Bot Won!</span>
          ) : (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-white to-cyan-300">
              {winnerName} Wins!
            </span>
          )}
        </h2>

        {/* Sub-message */}
        <p className="text-slate-300 text-sm mb-6 max-w-xs">
          {isDraw
            ? 'A hard-fought battle! Neither side yielded any ground.'
            : isHumanLoss
            ? 'NeonBot calculated every move to victory! Better luck next round!'
            : gameMode === 'vs-computer'
            ? 'Brilliant tactical play! You defeated the AI opponent!'
            : `Sensational performance by ${winnerName} for aligning three in a row!`}
        </p>

        {/* Series Alert if completed */}
        {seriesScore?.isComplete && (
          <div className="w-full mb-4 py-2 px-3 rounded-lg bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold">
            👑 Series Winner: {seriesScore.seriesWinner === 'X' ? p1Name : p2Name}!
          </div>
        )}

        {/* Scoreboard Summary Card */}
        <div className="w-full bg-black/40 rounded-xl p-3 mb-6 border border-white/10">
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-2 font-semibold">
            Current Match Scores
          </p>
          <div className="flex items-center justify-around text-sm font-bold">
            <span className="text-pink-400">
              {p1Name}: {p1Wins}
            </span>
            <span className="text-yellow-400">Draws: {draws}</span>
            <span className="text-cyan-400">
              {p2Name}: {p2Wins}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-2.5">
          <button
            onClick={() => {
              soundManager.playClick();
              onPlayAgain();
            }}
            className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-95 shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>

          <div className="grid grid-cols-2 gap-2 w-full">
            <button
              onClick={() => {
                soundManager.playClick();
                onNewGame();
              }}
              className="py-2.5 px-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 flex items-center justify-center gap-1.5 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              New Match
            </button>

            <button
              onClick={handleShare}
              className="py-2.5 px-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 flex items-center justify-center gap-1.5 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Share Score
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
