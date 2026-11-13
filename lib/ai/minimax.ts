export type Player = 'X' | 'O';
export type BoardState = (Player | null)[];

export const WIN_PATTERNS: readonly [number, number, number][] = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Col 1
  [1, 4, 7], // Col 2
  [2, 5, 8], // Col 3
  [0, 4, 8], // Diagonal \
  [2, 4, 6], // Diagonal /
];

/**
 * Checks if there's a winner on the board.
 * Returns the winning player and the winning line indices, or null.
 */
export function checkWinnerInfo(board: BoardState): { winner: Player; pattern: [number, number, number] } | null {
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, pattern };
    }
  }
  return null;
}

/**
 * Checks if the board is completely filled.
 */
export function isBoardFull(board: BoardState): boolean {
  return board.every((cell) => cell !== null);
}

/**
 * Evaluates terminal state for minimax.
 * Returns score relative to the bot (maximizer = 'O', minimizer = 'X').
 */
function evaluate(board: BoardState, depth: number, botSymbol: Player, humanSymbol: Player): number {
  const winInfo = checkWinnerInfo(board);
  if (winInfo) {
    if (winInfo.winner === botSymbol) {
      return 10 - depth;
    }
    if (winInfo.winner === humanSymbol) {
      return depth - 10;
    }
  }
  return 0;
}

/**
 * Minimax recursive search for Tic Tac Toe.
 */
function minimax(
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
  botSymbol: Player,
  humanSymbol: Player,
  alpha = -Infinity,
  beta = Infinity
): number {
  const winInfo = checkWinnerInfo(board);
  if (winInfo) {
    return evaluate(board, depth, botSymbol, humanSymbol);
  }
  if (isBoardFull(board)) {
    return 0;
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = botSymbol;
        const evaluation = minimax(board, depth + 1, false, botSymbol, humanSymbol, alpha, beta);
        board[i] = null;
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = humanSymbol;
        const evaluation = minimax(board, depth + 1, true, botSymbol, humanSymbol, alpha, beta);
        board[i] = null;
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break;
      }
    }
    return minEval;
  }
}

/**
 * Finds the optimal move using Minimax (Hard mode).
 */
export function getBestMoveMinimax(
  board: BoardState,
  botSymbol: Player = 'O',
  humanSymbol: Player = 'X'
): number {
  // If board is empty, picking center or a corner provides variety
  const emptyCount = board.filter((c) => c === null).length;
  if (emptyCount === 9) {
    // Center or random corner
    const openers = [0, 2, 4, 6, 8];
    return openers[Math.floor(Math.random() * openers.length)];
  }

  // If player played first and center is empty, taking center is always optimal
  if (emptyCount === 8 && board[4] === null) {
    return 4;
  }

  let bestVal = -Infinity;
  let bestMoves: number[] = [];

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = botSymbol;
      const moveVal = minimax(board, 0, false, botSymbol, humanSymbol);
      board[i] = null;

      if (moveVal > bestVal) {
        bestVal = moveVal;
        bestMoves = [i];
      } else if (moveVal === bestVal) {
        bestMoves.push(i);
      }
    }
  }

  // When multiple moves have equal optimal value, pick randomly among them for dynamic play
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}

/**
 * Finds immediate winning move for the given symbol if available.
 */
function findImmediateWinningMove(board: BoardState, symbol: Player): number | null {
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = symbol;
      const win = checkWinnerInfo(board);
      board[i] = null;
      if (win && win.winner === symbol) {
        return i;
      }
    }
  }
  return null;
}

/**
 * Gets all empty cell indices.
 */
export function getAvailableMoves(board: BoardState): number[] {
  const moves: number[] = [];
  board.forEach((cell, idx) => {
    if (cell === null) moves.push(idx);
  });
  return moves;
}

export type AIDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Returns the computer's move based on the selected difficulty.
 */
export function computeAIMove(
  board: BoardState,
  difficulty: AIDifficulty,
  botSymbol: Player = 'O',
  humanSymbol: Player = 'X'
): number {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) return -1;

  if (difficulty === 'hard') {
    return getBestMoveMinimax(board, botSymbol, humanSymbol);
  }

  if (difficulty === 'medium') {
    // 1. Can bot win right now? Take it!
    const winMove = findImmediateWinningMove(board, botSymbol);
    if (winMove !== null) return winMove;

    // 2. Can human win right now? Block it! (85% consistency)
    const blockMove = findImmediateWinningMove(board, humanSymbol);
    if (blockMove !== null && Math.random() < 0.85) {
      return blockMove;
    }

    // 3. Take center if open (60% chance)
    if (board[4] === null && Math.random() < 0.6) {
      return 4;
    }

    // 4. 50% optimal minimax, 50% random
    if (Math.random() < 0.5) {
      return getBestMoveMinimax(board, botSymbol, humanSymbol);
    }
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  // Easy difficulty:
  // 1. 25% chance to notice a winning move
  const easyWinMove = findImmediateWinningMove(board, botSymbol);
  if (easyWinMove !== null && Math.random() < 0.25) {
    return easyWinMove;
  }

  // 2. 20% chance to block player's winning move
  const easyBlockMove = findImmediateWinningMove(board, humanSymbol);
  if (easyBlockMove !== null && Math.random() < 0.2) {
    return easyBlockMove;
  }

  // 3. Otherwise make a relaxed random move
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}
