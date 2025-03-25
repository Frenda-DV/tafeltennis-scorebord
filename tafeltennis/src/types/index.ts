export type Player = 'Danielle' | 'Frank';

export interface Game {
  id: string;
  date: string;
  winner: Player;
  loser: Player;
  winnerScore: number;
  loserScore: number;
}

export interface PlayerStats {
  player: Player;
  wins: number;
  losses: number;
  totalGames: number;
  winPercentage: number;
} 