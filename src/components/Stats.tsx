import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { PlayerStats } from '../types';

interface StatsProps {
  stats: {
    [key: string]: PlayerStats;
  };
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  const calculateWinPercentage = (player: PlayerStats): string => {
    if (player.gamesPlayed === 0) return '0.0';
    return ((player.wins / player.gamesPlayed) * 100).toFixed(1);
  };

  const calculateAverageScore = (player: PlayerStats): string => {
    if (player.gamesPlayed === 0) return '0.0';
    return (player.totalPoints / player.gamesPlayed).toFixed(1);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3,
            bgcolor: '#e3f2fd',
            height: '100%'
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: '#1976d2' }}>
            Danielle
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Gewonnen: {stats.Danielle.wins}
            </Typography>
            <Typography variant="body1">
              Verloren: {stats.Danielle.losses}
            </Typography>
            <Typography variant="body1">
              Winstpercentage: {calculateWinPercentage(stats.Danielle)}%
            </Typography>
            <Typography variant="body1">
              Gemiddelde Score: {calculateAverageScore(stats.Danielle)}
            </Typography>
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3,
            bgcolor: '#f3e5f5',
            height: '100%'
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: '#9c27b0' }}>
            Frank
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Gewonnen: {stats.Frank.wins}
            </Typography>
            <Typography variant="body1">
              Verloren: {stats.Frank.losses}
            </Typography>
            <Typography variant="body1">
              Winstpercentage: {calculateWinPercentage(stats.Frank)}%
            </Typography>
            <Typography variant="body1">
              Gemiddelde Score: {calculateAverageScore(stats.Frank)}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Stats; 