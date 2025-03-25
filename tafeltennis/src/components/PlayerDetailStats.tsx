import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Game, Player } from '../types';
import { format, parseISO } from 'date-fns';
import { nl } from 'date-fns/locale';

interface PlayerDetailStatsProps {
  games: Game[];
}

interface PlayerGameStats {
  player: Player;
  bestGame: {
    score: number;
    opponentScore: number;
    date: string;
    opponent: Player;
  } | null;
  worstGame: {
    score: number;
    opponentScore: number;
    date: string;
    opponent: Player;
  } | null;
  biggestWin: {
    scoreDifference: number;
    score: number;
    opponentScore: number;
    date: string;
    opponent: Player;
  } | null;
  closestGame: {
    scoreDifference: number;
    score: number;
    opponentScore: number;
    date: string;
    opponent: Player;
    isWin: boolean;
  } | null;
}

export const PlayerDetailStats: React.FC<PlayerDetailStatsProps> = ({ games }) => {
  const [selectedPlayer, setSelectedPlayer] = React.useState<Player>('Frank');

  const calculatePlayerStats = (player: Player): PlayerGameStats => {
    const playerGames = games.filter(game => 
      game.winner === player || game.loser === player
    );

    if (playerGames.length === 0) {
      return {
        player,
        bestGame: null,
        worstGame: null,
        biggestWin: null,
        closestGame: null
      };
    }

    let bestGame = null;
    let worstGame = null;
    let biggestWin = null;
    let closestGame = null;
    let maxScore = -1;
    let minScore = Infinity;
    let maxDifference = -1;
    let minDifference = Infinity;

    // Get lost games only for worst game calculation
    const lostGames = playerGames.filter(game => game.loser === player);

    playerGames.forEach(game => {
      const isWinner = game.winner === player;
      const playerScore = isWinner ? game.winnerScore : game.loserScore;
      const opponentScore = isWinner ? game.loserScore : game.winnerScore;
      const opponent = isWinner ? game.loser : game.winner;
      const scoreDifference = Math.abs(game.winnerScore - game.loserScore);

      // Best game (highest score)
      if (playerScore > maxScore) {
        maxScore = playerScore;
        bestGame = { score: playerScore, opponentScore, date: game.date, opponent };
      }

      // Worst game (lowest score from lost games only)
      if (!isWinner && playerScore < minScore) {
        minScore = playerScore;
        worstGame = { score: playerScore, opponentScore, date: game.date, opponent };
      }

      // Biggest win
      if (isWinner && scoreDifference > maxDifference) {
        maxDifference = scoreDifference;
        biggestWin = {
          scoreDifference,
          score: playerScore,
          opponentScore,
          date: game.date,
          opponent
        };
      }

      // Closest game
      if (scoreDifference < minDifference) {
        minDifference = scoreDifference;
        closestGame = {
          scoreDifference,
          score: playerScore,
          opponentScore,
          date: game.date,
          opponent,
          isWin: isWinner
        };
      }
    });

    // If player has no lost games, set worstGame to null
    if (lostGames.length === 0) {
      worstGame = null;
    }

    return {
      player,
      bestGame,
      worstGame,
      biggestWin,
      closestGame
    };
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'd MMMM yyyy', { locale: nl });
  };

  const stats = calculatePlayerStats(selectedPlayer);

  return (
    <Paper elevation={3} sx={{ p: 3, background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)', color: 'white' }}>
      <Typography variant="h6" gutterBottom align="center">
        Speler Details
      </Typography>
      
      <Tabs
        value={selectedPlayer}
        onChange={(_, newValue) => setSelectedPlayer(newValue)}
        centered
        sx={{
          mb: 3,
          '& .MuiTab-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-selected': {
              color: 'white',
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'white',
          },
        }}
      >
        <Tab label="Frank" value="Frank" />
        <Tab label="Danielle" value="Danielle" />
      </Tabs>

      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Statistiek</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.bestGame && (
              <TableRow>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Beste Game</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  {stats.bestGame.score} punten tegen {stats.bestGame.opponent} ({stats.bestGame.opponentScore})
                  <br />
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {formatDate(stats.bestGame.date)}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {stats.worstGame && (
              <TableRow>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Slechtste Game</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  {stats.worstGame.score} punten tegen {stats.worstGame.opponent} ({stats.worstGame.opponentScore})
                  <br />
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {formatDate(stats.worstGame.date)}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {stats.biggestWin && (
              <TableRow>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Grootste Overwinning</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  Verschil van {stats.biggestWin.scoreDifference} punten ({stats.biggestWin.score}-{stats.biggestWin.opponentScore})
                  <br />
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {formatDate(stats.biggestWin.date)}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {stats.closestGame && (
              <TableRow>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Spannendste Game</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  Verschil van {stats.closestGame.scoreDifference} punten ({stats.closestGame.score}-{stats.closestGame.opponentScore})
                  <br />
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {formatDate(stats.closestGame.date)} - {stats.closestGame.isWin ? 'Gewonnen' : 'Verloren'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PlayerDetailStats; 