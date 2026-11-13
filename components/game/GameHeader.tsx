'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, Sparkles } from 'lucide-react';
import { soundManager } from '@/lib/soundController';

interface GameHeaderProps {
  onOpenRules: () => void;
}

export default function GameHeader({ onOpenRules }: GameHeaderProps) {
  return (
    <header className="w-full max-w-2xl px-4 pt-4 sm:pt-6 pb-2 text-center select-none flex flex-col items-center">
      {/* Top Branding Pill */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-cyan-300 tracking-wider uppercase mb-2 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
        Neon Cyber Edition &bull; PWA Enabled
      </div>

      {/* Main H1 Title */}
      <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
        Tic Tac Toe{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 drop-shadow-[0_0_25px_rgba(255,0,127,0.5)]">
          Neon XO
        </span>
      </h1>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-1.5 mb-2 font-normal leading-relaxed">
        Challenge your friends in 2-player mode or battle an intelligent AI bot across easy, medium, and hard levels.
      </p>

      {/* Quick Links / Navigation Header */}
      <div className="flex items-center gap-3 text-xs">
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenRules();
          }}
          className="text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1 font-medium underline underline-offset-4 decoration-cyan-500/40"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          Game Rules
        </button>

        <span className="text-slate-600">&bull;</span>

        <Link
          href="/how-to-play"
          className="text-slate-300 hover:text-pink-300 transition-colors font-medium underline underline-offset-4 decoration-pink-500/40"
        >
          Strategy Guide
        </Link>
      </div>
    </header>
  );
}
