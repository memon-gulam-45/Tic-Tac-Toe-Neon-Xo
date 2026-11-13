'use client';

import React from 'react';
import Modal from '@/components/ui/Modal';
import { Trophy, Bot, Volume2, Smartphone } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RulesModal({ isOpen, onClose }: RulesModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="How to Play Neon XO" maxWidth="max-w-lg">
      <div className="space-y-4 text-xs sm:text-sm text-slate-300">
        <div className="flex gap-3 items-start p-2.5 rounded-xl bg-white/5 border border-white/10">
          <Trophy className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white text-sm">Objective</h4>
            <p className="text-slate-300 text-xs mt-0.5">
              Be the first player to form an unbroken horizontal, vertical, or diagonal line of 3 matching symbols (X or O).
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start p-2.5 rounded-xl bg-white/5 border border-white/10">
          <Bot className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white text-sm">AI Bot Difficulties</h4>
            <p className="text-slate-300 text-xs mt-0.5">
              <strong>Easy:</strong> Casual fun with occasional blunders.<br />
              <strong>Medium:</strong> Strategic play with tactical blocks.<br />
              <strong>Hard:</strong> Powered by the optimal Minimax algorithm. Unbeatable!
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start p-2.5 rounded-xl bg-white/5 border border-white/10">
          <Volume2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white text-sm">Meme Sound Effects</h4>
            <p className="text-slate-300 text-xs mt-0.5">
              Enjoy custom audio on every move! When you defeat the bot you hear victory music, but if you lose to the bot in 1-player mode... prepare for the famous <strong>Moye Moye</strong> sound effect!
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start p-2.5 rounded-xl bg-white/5 border border-white/10">
          <Smartphone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white text-sm">Offline PWA Installation</h4>
            <p className="text-slate-300 text-xs mt-0.5">
              Install Neon XO to your home screen or desktop directly from your browser. Enjoy lightning-fast gameplay with 100% offline capability.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
