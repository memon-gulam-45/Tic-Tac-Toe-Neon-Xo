'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, CheckCircle2, Shield, Brain, Zap, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'How do I win Tic Tac Toe every time?',
    a: 'While you cannot guarantee a win if your opponent plays perfectly (as Tic Tac Toe is a mathematically solved zero-sum game that results in a draw with optimal play), starting in a corner gives you the highest strategic advantage. From a corner opening, you can set up multiple two-way threats (forks) that force an opponent into an unavoidable loss if they fail to seize the center square.',
  },
  {
    q: 'Can the Hard AI in Neon XO ever be beaten?',
    a: 'No. The Hard difficulty uses the Minimax decision algorithm with complete game tree search. Because Tic Tac Toe has only 255,168 unique possible games, the Minimax algorithm calculates every branch down to the terminal outcome. If you play flawlessly, the match will end in a draw; any human misstep will be immediately converted into a bot victory.',
  },
  {
    q: 'Why does the Moye Moye sound effect play?',
    a: 'In 1-Player vs Computer mode, if the human player is defeated by the AI bot, the iconic "Moye Moye" meme sound plays as a humorous consolation! It only triggers on human defeats against the bot, never on draws or in two-player games.',
  },
  {
    q: 'Can I play Neon XO offline without internet?',
    a: 'Yes! Neon XO is engineered as an installable Progressive Web App (PWA). Once loaded in your browser or installed on your Android, iOS, or desktop device, the entire game engine, styles, and audio assets are stored locally in the browser cache, letting you play anywhere without an active connection.',
  },
  {
    q: 'Is Neon XO free to play with two players on one device?',
    a: 'Absolutely. Two-player mode lets you pass and play on the same phone, tablet, or laptop. Both players take turns placing X and O on the shared interactive neon grid with complete score tracking.',
  },
];

export default function GameGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section
      aria-label="Tic Tac Toe Rules, Strategies, and Information"
      className="w-full max-w-4xl px-4 py-12 mt-12 border-t border-white/10 text-slate-300"
    >
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Everything You Need to Know About{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
            Tic Tac Toe (Neon XO)
          </span>
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
          Explore the official rules, mathematical strategies, AI decision algorithms, and frequently asked questions for the ultimate X and O gaming experience.
        </p>
      </div>

      {/* Grid: 3 Informational Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Card 1: Official Rules */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Tic Tac Toe Rules</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tic Tac Toe is played on a 3×3 grid. Player 1 takes <strong>X</strong> and Player 2 (or the AI bot) takes <strong>O</strong>. Players alternate placing their symbols on empty squares. The first player to align 3 consecutive symbols horizontally, vertically, or diagonally wins immediately. If all 9 cells fill without a 3-in-a-row alignment, the match concludes in a draw (cat&apos;s game).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-cyan-400 font-semibold">
            Simple &bull; Fast-Paced &bull; Classic
          </div>
        </div>

        {/* Card 2: Strategic Play */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">How to Win (Strategy)</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To maximize winning opportunities:
            </p>
            <ul className="text-xs sm:text-sm text-slate-300 list-disc list-inside mt-2 space-y-1.5">
              <li><strong>Take Corners First:</strong> Corner openings create diagonal and lateral threats.</li>
              <li><strong>Control the Center:</strong> The center cell intersects 4 winning lines (2 diagonals, 1 row, 1 column).</li>
              <li><strong>Create a Fork:</strong> Place symbols to establish two simultaneous winning paths.</li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-pink-400 font-semibold">
            Tactical &bull; Offensive &bull; Defensive
          </div>
        </div>

        {/* Card 3: Minimax AI */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">How the AI Engine Works</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our bot utilizes the recursive <strong>Minimax Algorithm</strong> with alpha-beta evaluation:
            </p>
            <ul className="text-xs sm:text-sm text-slate-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Easy:</strong> Relaxed play with casual random moves.</li>
              <li><strong>Medium:</strong> Heuristic engine blocking player wins with 85% fidelity.</li>
              <li><strong>Hard:</strong> Zero-mistake Minimax depth search. Unbeatable!</li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-purple-400 font-semibold">
            Intelligent &bull; Adaptive &bull; Unbeatable
          </div>
        </div>
      </div>

      {/* Deep Content Section */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 mb-12 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            Why Neon XO is the Ultimate Tic Tac Toe Experience
          </h3>
          <p className="text-sm leading-relaxed">
            Unlike basic Tic Tac Toe projects, <strong>Neon XO</strong> blends classic strategy with cutting-edge web performance. Built with <strong>Next.js 15</strong>, <strong>React 19</strong>, and <strong>Tailwind CSS</strong>, the platform offers fluid 60fps animations, keyboard numpad accessibility, instant haptic tap response, and hilarious meme audio reactions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-bold text-cyan-400 text-sm mb-1">🎮 Local 2-Player Versus Mode</h4>
            <p className="text-xs text-slate-300">
              Compete side-by-side with friends on any smartphone, iPad, or desktop screen. Set custom player names and battle across Best-of-3 or Best-of-5 tournament series with persistent scoreboard tracking.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-bold text-pink-400 text-sm mb-1">🤖 Progressive AI Bot Opponent</h4>
            <p className="text-xs text-slate-300">
              Practice solo anytime against an opponent tailored to your skill level. From casual warm-up matches on Easy to brain-bending tactical stalemates against the unbeatable Hard bot.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs">
          <span className="text-slate-400">
            Want to study advanced master-level game openings?
          </span>
          <Link
            href="/how-to-play"
            className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4"
          >
            Read the Full Strategy & Opening Guide &rarr;
          </Link>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) with Accordion */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-black/20 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-3.5 px-4 text-left font-semibold text-sm sm:text-base text-white flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
