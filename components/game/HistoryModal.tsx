'use client';

import React from 'react';
import Modal from '@/components/ui/Modal';
import { MatchHistoryItem } from '@/types/game';
import { History, Trash2, Trophy, Equal, Bot, User } from 'lucide-react';
import { soundManager } from '@/lib/soundController';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: MatchHistoryItem[];
  onClearHistory: () => void;
}

export default function HistoryModal({
  isOpen,
  onClose,
  history,
  onClearHistory,
}: HistoryModalProps) {
  const formatDate = (timestamp: number) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
        ', ' +
        date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return 'Recent';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Match History" maxWidth="max-w-md">
      <div className="space-y-3">
        {history.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <History className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No matches recorded yet.</p>
            <p className="text-xs text-slate-500 mt-1">Play a match to see your game logs here!</p>
          </div>
        ) : (
          <>
            <div className="max-h-[340px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    {item.winnerSymbol === 'Draw' ? (
                      <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-300 flex items-center justify-center font-bold">
                        <Equal className="w-4 h-4" />
                      </div>
                    ) : item.winnerSymbol === 'X' ? (
                      <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
                        X
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                        O
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-white">
                        <span>{item.winnerName}</span>
                        {item.winnerSymbol !== 'Draw' && (
                          <span className="text-[10px] text-yellow-400 flex items-center">
                            <Trophy className="w-3 h-3 ml-0.5 inline" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        {item.mode === 'vs-computer' ? (
                          <span className="flex items-center gap-1 text-pink-300">
                            <Bot className="w-3 h-3" /> Vs AI ({item.difficulty})
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-cyan-300">
                            <User className="w-3 h-3" /> 2 Players
                          </span>
                        )}
                        <span>&bull;</span>
                        <span>{item.p1Name} vs {item.p2Name}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {formatDate(item.timestamp)}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                if (confirm('Clear all recorded match history?')) {
                  onClearHistory();
                }
              }}
              className="w-full mt-2 py-2 px-3 rounded-lg text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear History
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
