'use client';

import React, { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { soundManager } from '@/lib/soundController';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstall = async () => {
    soundManager.playClick();
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    soundManager.playClick();
    setShowBanner(false);
  };

  if (!showBanner || !deferredPrompt) return null;

  return (
    <aside
      aria-label="Install App Banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-40 max-w-sm glass-panel rounded-2xl p-3 border border-cyan-400/40 shadow-[0_0_25px_rgba(0,240,255,0.3)] animate-fade-in flex items-center justify-between gap-3"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-pink-500 flex items-center justify-center p-1.5 shadow-md flex-shrink-0">
          <Download className="w-5 h-5 text-white" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-white">Install Neon XO</p>
          <p className="text-[11px] text-slate-300">Play full-screen & offline anytime</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={handleInstall}
          className="py-1.5 px-3 rounded-lg text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 active:scale-95 transition-all shadow-md"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss install banner"
          className="p-1 rounded-lg text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
