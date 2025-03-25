export interface Game {
  id: string;
  date: string;
  winner: 'Danielle' | 'Frank';
  score: string;
  loserScore: string;
}

export interface PlayerStats {
  wins: number;
  losses: number;
  totalPoints: number;
  gamesPlayed: number;
} 