import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Game } from '../types';

interface PlayerDetailStatsProps {
  games: Game[];
}

interface DetailedStats {
  bestGame: Game | null;
  worstGame: Game | null;
  biggestWin: Game | null;
  closestGame: Game | null;
}

const PlayerDetailStats: React.FC<PlayerDetailStatsProps> = ({ games }) => {
  const calculatePlayerStats = (playerName: string): DetailedStats => {
    const playerGames = games.filter(game => game.winner === playerName || 
      (game.winner !== playerName && (game.winner === 'Danielle' || game.winner === 'Frank')));
    
    const wonGames = games.filter(game => game.winner === playerName);
    const lostGames = games.filter(game => game.winner !== playerName && 
      (game.winner === 'Danielle' || game.winner === 'Frank'));

    let bestGame: Game | null = null;
    let worstGame: Game | null = null;
    let biggestWin: Game | null = null;
    let closestGame: Game | null = null;
    let smallestPointDiff = Infinity;
    let biggestPointDiff = -1;

    // Best game (highest score)
    if (wonGames.length > 0) {
      bestGame = wonGames.reduce((max, game) => 
        parseInt(game.score) > parseInt(max.score) ? game : max
      , wonGames[0]);
    }

    // Worst game (lowest score when lost)
    if (lostGames.length > 0) {
      worstGame = lostGames.reduce((min, game) => {
        const playerScore = game.loserScore;
        const currentMin = min ? min.loserScore : '999';
        return parseInt(playerScore) < parseInt(currentMin) ? game : min;
      }, lostGames[0]);
    }

    // Biggest win (largest point difference when won)
    if (wonGames.length > 0) {
      biggestWin = wonGames.reduce((max, game) => {
        const diff = parseInt(game.score) - parseInt(game.loserScore);
        if (diff > biggestPointDiff) {
          biggestPointDiff = diff;
          return game;
        }
        return max;
      }, wonGames[0]);
    }

    // Closest game (smallest point difference)
    if (playerGames.length > 0) {
      closestGame = playerGames.reduce((closest, game) => {
        const diff = Math.abs(parseInt(game.score) - parseInt(game.loserScore));
        if (diff < smallestPointDiff) {
          smallestPointDiff = diff;
          return game;
        }
        return closest;
      }, playerGames[0]);
    }

    return {
      bestGame,
      worstGame,
      biggestWin,
      closestGame
    };
  };

  const renderPlayerDetailStats = (playerName: string) => {
    const stats = calculatePlayerStats(playerName);
    
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 2,
          backgroundColor: playerName === 'Danielle' ? '#e3f2fd' : '#f3e5f5'
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: playerName === 'Danielle' ? '#1976d2' : '#9c27b0' }}>
          {playerName} Details
        </Typography>
        
        {stats.bestGame && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="body1">
              Beste game: {stats.bestGame.score} punten
            </Typography>
          </Box>
        )}

        {stats.worstGame && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="body1">
              Slechtste game: {stats.worstGame.loserScore} punten
            </Typography>
          </Box>
        )}

        {stats.biggestWin && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="body1">
              Grootste overwinning: {stats.biggestWin.score} - {stats.biggestWin.loserScore}
            </Typography>
          </Box>
        )}

        {stats.closestGame && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="body1">
              Spannendste game: {stats.closestGame.score} - {stats.closestGame.loserScore}
            </Typography>
          </Box>
        )}
      </Paper>
    );
  };

  return (
    <Box>
      {renderPlayerDetailStats('Danielle')}
      {renderPlayerDetailStats('Frank')}
    </Box>
  );
};

export default PlayerDetailStats; 