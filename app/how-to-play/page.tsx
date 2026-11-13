import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, Trophy, Brain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Play Tic Tac Toe – Rules, Strategies & Unbeatable Tips',
  description:
    'Learn how to play Tic Tac Toe, master winning strategies, avoid common traps, and understand how the Minimax AI works in Neon XO.',
  alternates: {
    canonical: '/how-to-play',
  },
};

export default function HowToPlayPage() {
  return (
    <div className="min-h-screen bg-[#0a0f24] text-slate-200 py-10 px-4 sm:px-6">
      <article className="max-w-3xl mx-auto space-y-8">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Game
        </Link>

        {/* Header */}
        <header className="border-b border-white/10 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How to Play{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
              Tic Tac Toe
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            The definitive masterclass on rules, winning opening combinations, defensive counter-strategies, and artificial intelligence logic.
          </p>
        </header>

        {/* Section 1: Basic Rules */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-cyan-400" /> 1. Basic Rules of Tic Tac Toe
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-300">
            Tic Tac Toe (also known as <em>Noughts and Crosses</em> or <em>Xs and Os</em>) is a two-player game played on a 3×3 square grid.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 pl-2">
            <li><strong>Player X</strong> always makes the opening move of the match.</li>
            <li><strong>Player O</strong> follows with the second move.</li>
            <li>Players take turns placing their designated symbol into any empty cell on the 9-square grid.</li>
            <li>Once placed, a symbol cannot be moved or replaced.</li>
            <li>The first player to align <strong>three consecutive symbols</strong> horizontally, vertically, or diagonally wins immediately.</li>
            <li>If all nine squares are filled without either player achieving three in a row, the game ends in a <strong>Draw</strong> (often called a Cat&apos;s Game).</li>
          </ul>
        </section>

        {/* Section 2: Winning Patterns */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" /> 2. The 8 Winning Combinations
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            There are precisely eight winning alignments on a standard 3×3 Tic Tac Toe board:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-bold text-pink-400 mb-1">3 Horizontal Rows</h3>
              <p className="text-slate-400">Top row (1-2-3), Middle row (4-5-6), Bottom row (7-8-9).</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-bold text-cyan-400 mb-1">3 Vertical Columns</h3>
              <p className="text-slate-400">Left column (1-4-7), Center column (2-5-8), Right column (3-6-9).</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-bold text-yellow-400 mb-1">2 Diagonals</h3>
              <p className="text-slate-400">Top-left to bottom-right (1-5-9), Top-right to bottom-left (3-5-7).</p>
            </div>
          </div>
        </section>

        {/* Section 3: Strategic Play */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-pink-400" /> 3. Advanced Winning Strategies
          </h2>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <h3 className="font-bold text-white">Opening with a Corner (Optimal Move)</h3>
              <p>
                When playing first as X, placing your first mark in any corner square (1, 3, 7, or 9) maximizes your winning opportunities. This move immediately threatens multiple diagonals and edges. If your opponent fails to respond by claiming the center square (5), you can guarantee a winning fork on move 3.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <h3 className="font-bold text-white">Setting up a &quot;Fork&quot;</h3>
              <p>
                A fork is a scenario where a player creates two simultaneous winning threats with a single move. Because an opponent can only block one threat per turn, the other threat guarantees victory on the next round.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <h3 className="font-bold text-white">Defending as Player O (Second Player)</h3>
              <p>
                If the opening player takes a corner, you <strong>must</strong> take the center. If they take the center, you should take a corner. Never take an edge as your opening response to a corner, as it allows X to construct an unstoppable fork.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Minimax AI Logic */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" /> 4. How the AI Opponent Calculates Moves
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            In <strong>Neon XO</strong>, our computer opponent uses different computational models depending on the difficulty you choose:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 pl-2">
            <li><strong>Easy:</strong> Selects primarily random moves with low lookahead, giving casual players a fun, relaxed environment.</li>
            <li><strong>Medium:</strong> Features tactical priority checking. It will seize immediate winning lines and block player winning threats with 85% probability, while mixing in balanced moves.</li>
            <li><strong>Hard:</strong> Powered by the mathematical <strong>Minimax Decision Rule</strong> with depth weighting. It evaluates the entire decision tree down to every possible ending, ensuring it never makes an error. A human playing flawlessly will achieve a draw; any mistake leads to a bot victory followed by the Moye Moye audio reaction!</li>
          </ul>
        </section>

        {/* CTA Banner */}
        <div className="p-6 rounded-2xl glass-panel border border-cyan-400/40 text-center space-y-4 mt-8">
          <h2 className="text-xl font-bold text-white">Ready to Put Strategy into Practice?</h2>
          <p className="text-sm text-slate-300">
            Challenge your friends or battle our unbeatable Hard AI right now in Neon XO.
          </p>
          <Link
            href="/"
            className="inline-block py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-cyan-500 hover:opacity-95 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
          >
            Play Neon XO Now &rarr;
          </Link>
        </div>
      </article>
    </div>
  );
}
