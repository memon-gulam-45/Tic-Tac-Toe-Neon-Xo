'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { GameMode, AIDifficulty, MatchFormat } from '@/types/game';
import { Users, Bot, Play, Sparkles } from 'lucide-react';
import { soundManager } from '@/lib/soundController';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: (config: {
    mode: GameMode;
    p1Name: string;
    p2Name: string;
    difficulty: AIDifficulty;
    matchFormat: MatchFormat;
    useCountdown: boolean;
  }) => void;
  initialMode?: GameMode;
  initialP1Name?: string;
  initialP2Name?: string;
  initialDifficulty?: AIDifficulty;
  initialFormat?: MatchFormat;
}

export default function SetupModal({
  isOpen,
  onClose,
  onStartGame,
  initialMode = 'two-player',
  initialP1Name = 'Player 1',
  initialP2Name = 'Player 2',
  initialDifficulty = 'medium',
  initialFormat = 'single',
}: SetupModalProps) {
  const [mode, setMode] = useState<GameMode>(initialMode);
  const [p1Name, setP1Name] = useState(initialP1Name);
  const [p2Name, setP2Name] = useState(
    initialMode === 'vs-computer' ? 'NeonBot' : initialP2Name
  );
  const [difficulty, setDifficulty] = useState<AIDifficulty>(initialDifficulty);
  const [matchFormat, setMatchFormat] = useState<MatchFormat>(initialFormat);
  const [useCountdown, setUseCountdown] = useState<boolean>(true);

  const handleModeChange = (newMode: GameMode) => {
    soundManager.playClick();
    setMode(newMode);
    if (newMode === 'vs-computer') {
      if (p1Name === 'Player 1') setP1Name('Human');
      setP2Name('NeonBot');
    } else {
      if (p1Name === 'Human') setP1Name('Player 1');
      if (p2Name === 'NeonBot') setP2Name('Player 2');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    onStartGame({
      mode,
      p1Name: p1Name.trim() || (mode === 'vs-computer' ? 'Human' : 'Player 1'),
      p2Name: p2Name.trim() || (mode === 'vs-computer' ? 'NeonBot' : 'Player 2'),
      difficulty,
      matchFormat,
      useCountdown,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Start New Match" maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Game Mode Selection */}
        <div>
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
            Select Game Mode
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleModeChange('two-player')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                mode === 'two-player'
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
              Two Players
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('vs-computer')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                mode === 'vs-computer'
                  ? 'border-pink-500 bg-pink-500/20 text-pink-300 shadow-[0_0_15px_rgba(255,0,127,0.3)]'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-5 h-5" />
              Vs AI Bot
            </button>
          </div>
        </div>

        {/* Player Names Input */}
        <div className="space-y-2.5">
          <div>
            <label
              htmlFor="setup-p1"
              className="text-xs font-semibold text-pink-400 flex items-center justify-between mb-1"
            >
              <span>Player X Name</span>
              <span className="text-[10px] text-slate-400 font-normal">Plays First</span>
            </label>
            <input
              id="setup-p1"
              type="text"
              value={p1Name}
              onChange={(e) => setP1Name(e.target.value)}
              placeholder="Player 1"
              maxLength={15}
              required
              className="w-full py-2 px-3 rounded-lg bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="setup-p2"
              className="text-xs font-semibold text-cyan-400 flex items-center justify-between mb-1"
            >
              <span>{mode === 'vs-computer' ? 'Bot Name (O)' : 'Player O Name'}</span>
              <span className="text-[10px] text-slate-400 font-normal">Plays Second</span>
            </label>
            <input
              id="setup-p2"
              type="text"
              value={p2Name}
              onChange={(e) => setP2Name(e.target.value)}
              disabled={mode === 'vs-computer'}
              placeholder={mode === 'vs-computer' ? 'NeonBot' : 'Player 2'}
              maxLength={15}
              required
              className="w-full py-2 px-3 rounded-lg bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm disabled:opacity-60"
            />
          </div>
        </div>

        {/* AI Difficulty Selector (if Vs Bot) */}
        {mode === 'vs-computer' && (
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
              AI Difficulty
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['easy', 'medium', 'hard'] as AIDifficulty[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setDifficulty(level);
                  }}
                  className={`py-2 px-2 rounded-lg text-xs font-bold capitalize transition-all border ${
                    difficulty === level
                      ? level === 'hard'
                        ? 'border-red-500 bg-red-500/20 text-red-300'
                        : level === 'medium'
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                        : 'border-emerald-400 bg-emerald-400/20 text-emerald-300'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {difficulty === 'hard'
                ? '⚡ Unbeatable Minimax AI. Plays mathematically optimal moves.'
                : difficulty === 'medium'
                ? '🧠 Balanced AI. Blocks immediate threats with occasional slips.'
                : '🌱 Relaxed AI. Casual play with random opportunities.'}
            </p>
          </div>
        )}

        {/* Match Format */}
        <div>
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
            Match Format
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'single', label: 'Single Round' },
              { id: 'best-of-3', label: 'Best of 3' },
              { id: 'best-of-5', label: 'Best of 5' },
            ].map((fmt) => (
              <button
                key={fmt.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setMatchFormat(fmt.id as MatchFormat);
                }}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all border ${
                  matchFormat === fmt.id
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Countdown Checkbox */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="countdown-toggle"
            checked={useCountdown}
            onChange={(e) => setUseCountdown(e.target.checked)}
            className="w-4 h-4 rounded text-cyan-500 bg-black/40 border-white/20 focus:ring-cyan-400 focus:ring-offset-slate-900"
          />
          <label htmlFor="countdown-toggle" className="text-xs text-slate-300 select-none cursor-pointer">
            Enable 3-second countdown before round start
          </label>
        </div>

        {/* Start Button */}
        <button
          type="submit"
          className="w-full mt-4 py-3 px-4 rounded-xl font-extrabold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:opacity-95 active:scale-95 shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 transition-all tracking-wide"
        >
          <Play className="w-4 h-4 fill-white" />
          Start Match
        </button>
      </form>
    </Modal>
  );
}
