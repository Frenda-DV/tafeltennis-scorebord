import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Game } from '../types';

interface GameListProps {
  games: Game[];
  onDelete: (gameId: string) => void;
}

const GameList: React.FC<GameListProps> = ({ games, onDelete }) => {
  if (games.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
        <Typography variant="body1">
          Geen games gespeeld op deze datum
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ bgcolor: 'background.paper' }}>
      <Typography variant="h5" sx={{ p: 2, color: '#1976d2' }}>
        Games
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Datum</TableCell>
              <TableCell>Winnaar</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Acties</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game) => (
              <TableRow key={game.id}>
                <TableCell>
                  {format(new Date(game.date), 'dd MMM yyyy', { locale: nl })}
                </TableCell>
                <TableCell sx={{ 
                  color: game.winner === 'Danielle' ? '#1976d2' : '#9c27b0',
                  fontWeight: 500
                }}>
                  {game.winner}
                </TableCell>
                <TableCell align="right">
                  {game.score} - {game.loserScore}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => onDelete(game.id)}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'error.main'
                      }
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