import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Neon XO Tic Tac Toe online game.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0f24] text-slate-200 py-10 px-4 sm:px-6">
      <article className="max-w-3xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Game
        </Link>

        <header className="border-b border-white/10 pb-4">
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-cyan-400" /> Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-1">Last updated: November 2026</p>
        </header>

        <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-white">1. Information We Collect & Store</h2>
          <p>
            Neon XO is designed to be lightweight, privacy-focused, and accessible without requiring user accounts or registrations.
          </p>
          <p>
            We store game preferences locally on your device via <strong>HTML5 LocalStorage</strong>. This includes your sound mute preferences, theme settings (dark/light), custom player names, and recent match scoreboard statistics. This data never leaves your browser and is not transmitted to external servers.
          </p>
        </section>

        <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-white">2. Offline PWA & Service Workers</h2>
          <p>
            Our Progressive Web App (PWA) uses standard browser Service Workers to cache game assets (scripts, styles, audio files, and icons) locally so that the game functions reliably even when offline.
          </p>
        </section>

        <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-white">3. Third-Party Services (Analytics & Ads)</h2>
          <p>
            We may use Google Tag Manager and Google AdSense to serve non-invasive advertisements and measure aggregate website traffic. Third-party vendors, including Google, use cookies to serve ads based on prior visits to this website. Users may opt out of personalized advertising by visiting Google Ads Settings.
          </p>
        </section>

        <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-white">4. Contact Us</h2>
          <p>
            If you have questions regarding this privacy policy or our gaming platform, you can reach out via{' '}
            <a
              href="https://tictactoe-neonxo.site"
              className="text-cyan-400 underline underline-offset-2"
            >
              https://tictactoe-neonxo.site
            </a>
            .
          </p>
        </section>

        <div className="pt-6 border-t border-white/10">
          <Link
            href="/"
            className="text-xs font-semibold text-cyan-400 hover:underline"
          >
            &larr; Return to Neon XO Tic Tac Toe
          </Link>
        </div>
      </article>
    </div>
  );
}
