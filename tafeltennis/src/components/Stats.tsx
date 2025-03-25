import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress
} from '@mui/material';
import { PlayerStats } from '../types';

interface StatsProps {
  stats: PlayerStats[];
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  const sortedStats = [...stats].sort((a, b) => b.winPercentage - a.winPercentage);

  return (
    <Paper elevation={3} sx={{ p: 3, background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)', color: 'white' }}>
      <Typography variant="h6" gutterBottom align="center">
        Statistieken
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Speler</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Winst</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Verlies</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Totaal</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Win %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStats.map((stat) => (
              <TableRow key={stat.player}>
                <TableCell sx={{ color: 'white' }}>{stat.player}</TableCell>
                <TableCell sx={{ color: '#4caf50' }} align="center">{stat.wins}</TableCell>
                <TableCell sx={{ color: '#f44336' }} align="center">{stat.losses}</TableCell>
                <TableCell sx={{ color: 'white' }} align="center">{stat.totalGames}</TableCell>
                <TableCell sx={{ color: 'white' }} align="center">{stat.winPercentage.toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2 }}>
        {sortedStats.map((stat) => (
          <Box key={stat.player} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ color: 'white' }}>
                {stat.player}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'white' }}>
                {stat.wins}W - {stat.losses}V ({stat.winPercentage.toFixed(1)}%)
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={stat.winPercentage}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: stat.winPercentage >= 50 ? '#4caf50' : '#f44336',
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default Stats; 