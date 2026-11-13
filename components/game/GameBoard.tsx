'use client';

import React, { useRef } from 'react';
import { Player, BoardState } from '@/types/game';

interface GameBoardProps {
  board: BoardState;
  onCellClick: (index: number) => void;
  winningLine: [number, number, number] | null;
  disabled: boolean;
  currentTurn: Player;
}

export default function GameBoard({
  board,
  onCellClick,
  winningLine,
  disabled,
  currentTurn,
}: GameBoardProps) {
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    const row = Math.floor(index / 3);
    const col = index % 3;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (row > 0) nextIndex = index - 3;
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (row < 2) nextIndex = index + 3;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (col > 0) nextIndex = index - 1;
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (col < 2) nextIndex = index + 1;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = 8;
        break;
      default:
        // Direct number keys 1-9
        if (/^[1-9]$/.test(e.key)) {
          e.preventDefault();
          const targetIndex = parseInt(e.key, 10) - 1;
          if (board[targetIndex] === null && !disabled) {
            onCellClick(targetIndex);
          }
        }
        break;
    }

    if (nextIndex !== null && cellRefs.current[nextIndex]) {
      cellRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="relative flex justify-center items-center p-3 select-none">
      {/* Board glow halo */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl pointer-events-none" />

      {/* Main 3x3 Grid */}
      <div
        role="grid"
        aria-label="Tic Tac Toe 3 by 3 board"
        className="relative grid grid-cols-3 gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-2xl glass-panel border border-white/15 dark:border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)] w-[min(90vw,360px)] sm:w-[390px] h-[min(90vw,360px)] sm:h-[390px]"
      >
        {board.map((cellValue, idx) => {
          const isWinningCell = winningLine ? winningLine.includes(idx) : false;
          const isFaded = winningLine && !isWinningCell;
          const isOccupied = cellValue !== null;
          const row = Math.floor(idx / 3) + 1;
          const col = (idx % 3) + 1;

          return (
            <button
              key={idx}
              ref={(el) => {
                cellRefs.current[idx] = el;
              }}
              role="gridcell"
              aria-label={`Row ${row}, Column ${col}: ${
                cellValue ? `marked with ${cellValue}` : 'empty'
              }`}
              disabled={disabled || isOccupied}
              onClick={() => onCellClick(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              tabIndex={0}
              className={`group relative flex items-center justify-center rounded-xl font-extrabold text-4xl sm:text-5xl transition-all duration-200 outline-none select-none
                ${
                  isWinningCell
                    ? 'win-cell-highlight'
                    : isFaded
                    ? 'opacity-30 scale-95'
                    : 'bg-white/5 dark:bg-white/5 hover:bg-white/15 active:scale-95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10'
                }
                ${
                  !isOccupied && !disabled
                    ? 'cursor-pointer hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'cursor-default'
                }
                focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
              `}
            >
              {cellValue === 'X' && (
                <span className="cell-glow-x animate-zoom-in drop-shadow-[0_0_10px_rgba(255,0,127,0.8)]">
                  X
                </span>
              )}
              {cellValue === 'O' && (
                <span className="cell-glow-o animate-zoom-in drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
                  O
                </span>
              )}

              {/* Ghost preview of next move on hover (if empty and active) */}
              {!cellValue && !disabled && (
                <span
                  aria-hidden="true"
                  className={`opacity-0 group-hover:opacity-25 transition-opacity text-3xl sm:text-4xl pointer-events-none ${
                    currentTurn === 'X' ? 'text-pink-400' : 'text-cyan-400'
                  }`}
                >
                  {currentTurn}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
