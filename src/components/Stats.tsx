import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { PlayerStats } from '../types';

interface StatsProps {
  stats: {
    [key: string]: PlayerStats;
  };
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  const renderPlayerStats = (player: string) => {
    const playerStats = stats[player];
    const winPercentage = playerStats.gamesPlayed > 0
      ? ((playerStats.wins / playerStats.gamesPlayed) * 100).toFixed(1)
      : '0.0';
    const avgPoints = playerStats.gamesPlayed > 0
      ? (playerStats.totalPoints / playerStats.gamesPlayed).toFixed(1)
      : '0.0';

    return (
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            textAlign: 'center',
            backgroundColor: player === 'Danielle' ? '#e3f2fd' : '#f3e5f5',
            borderRadius: 2
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: player === 'Danielle' ? '#1976d2' : '#9c27b0' }}>
            {player}
          </Typography>
          <Typography variant="body1">
            Gewonnen: {playerStats.wins}
          </Typography>
          <Typography variant="body1">
            Verloren: {playerStats.losses}
          </Typography>
          <Typography variant="body1">
            Winstpercentage: {winPercentage}%
          </Typography>
          <Typography variant="body1">
            Gemiddelde Score: {avgPoints}
          </Typography>
        </Paper>
      </Grid>
    );
  };

  return (
    <Grid container spacing={3}>
      {renderPlayerStats('Danielle')}
      {renderPlayerStats('Frank')}
    </Grid>
  );
};

export default Stats; 