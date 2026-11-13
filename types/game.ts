export type Player = 'X' | 'O';

export type GameMode = 'two-player' | 'vs-computer';

export type AIDifficulty = 'easy' | 'medium' | 'hard';

export type MatchFormat = 'single' | 'best-of-3' | 'best-of-5';

export type BoardState = (Player | null)[];

export type GameStatus =
  | 'idle'
  | 'playing'
  | 'bot-thinking'
  | 'countdown'
  | 'game-over';

export interface ScoreState {
  twoPlayer: {
    p1Wins: number;
    p2Wins: number;
    draws: number;
    total: number;
  };
  vsBot: {
    playerWins: number;
    botWins: number;
    draws: number;
    total: number;
  };
}

export interface MatchHistoryItem {
  id: string;
  mode: GameMode;
  difficulty?: AIDifficulty;
  result: 'p1-win' | 'p2-win' | 'human-win' | 'bot-win' | 'draw';
  winnerSymbol: Player | 'Draw';
  winnerName: string;
  p1Name: string;
  p2Name: string;
  roundScore?: string;
  timestamp: number;
}

export interface SeriesScore {
  p1Wins: number;
  p2Wins: number;
  targetWins: number;
  isComplete: boolean;
  seriesWinner: Player | null;
}
