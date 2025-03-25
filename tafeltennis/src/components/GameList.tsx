import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, parseISO } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Game } from '../types';

interface GameListProps {
  games: Game[];
  onDelete: (gameId: string) => void;
}

const GameList: React.FC<GameListProps> = ({ games, onDelete }) => {
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'd MMMM yyyy', { locale: nl });
  };

  if (games.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3, background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)', color: 'white' }}>
        <Typography variant="h6" align="center">
          Geen games gespeeld op deze datum
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)', color: 'white' }}>
      <Typography variant="h6" gutterBottom align="center">
        Gespeelde Games
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Datum</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Winnaar</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Score</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Verliezer</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', width: '48px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game) => (
              <TableRow key={game.id}>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  {formatDate(game.date)}
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: '#4caf50',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {game.winner}
                </TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  {game.winnerScore} - {game.loserScore}
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: '#f44336',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {game.loser}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  <IconButton
                    onClick={() => onDelete(game.id)}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': {
                        color: '#f44336',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default GameList; 