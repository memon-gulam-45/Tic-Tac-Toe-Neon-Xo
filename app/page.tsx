import React from 'react';
import Link from 'next/link';
import NeonXOApp from '@/components/game/NeonXOApp';
import GameGuide from '@/components/seo/GameGuide';

export default function HomePage() {
  return (
    <main className="w-full flex flex-col items-center justify-between min-h-screen">
      {/* Interactive Main Game Interface */}
      <NeonXOApp />

      {/* Crawlable Content Below Game Interface */}
      <GameGuide />

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-6 text-center text-xs text-slate-400">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            &copy; {new Date().getFullYear()} <strong>Neon XO</strong> &bull; Crafted by{' '}
            <span className="text-cyan-400 font-semibold">Gulam Mohyudin Memon</span>
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/how-to-play"
              className="hover:text-cyan-300 transition-colors underline underline-offset-2"
            >
              How to Play & Rules
            </Link>
            <span>&bull;</span>
            <Link
              href="/privacy-policy"
              className="hover:text-pink-300 transition-colors underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
