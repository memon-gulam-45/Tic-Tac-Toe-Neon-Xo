'use client';

import React, { useEffect, useState } from 'react';
import { soundManager } from '@/lib/soundController';

interface CountdownOverlayProps {
  isActive: boolean;
  onComplete: () => void;
  seconds?: number;
}

export default function CountdownOverlay({
  isActive,
  onComplete,
  seconds = 3,
}: CountdownOverlayProps) {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    if (!isActive) {
      setCount(seconds);
      return;
    }

    setCount(seconds);
    soundManager.playCount();

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 300);
          return 0;
        }
        soundManager.playCount();
        return prev - 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [isActive, onComplete, seconds]);

  if (!isActive || count === 0) return null;

  return (
    <div
      aria-live="assertive"
      aria-label={`Match starts in ${count}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md animate-fade-in"
    >
      <div className="flex flex-col items-center">
        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-cyan-400/80 bg-slate-900/80 shadow-[0_0_50px_rgba(0,240,255,0.6)] flex items-center justify-center backdrop-blur-xl animate-zoom-in">
          <span
            key={count}
            className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-white to-pink-400 drop-shadow-[0_0_20px_rgba(0,240,255,0.9)] animate-ping-once"
          >
            {count}
          </span>
        </div>
        <p className="mt-6 text-lg sm:text-xl font-semibold tracking-widest uppercase text-cyan-300 drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">
          Get Ready!
        </p>
      </div>
    </div>
  );
}
