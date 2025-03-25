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
import { nl } from 'date-fns/locale/nl';
import { Game } from '../types';

interface GameListProps {
  games: Game[];
  onDelete: (id: string) => void;
}

const GameList: React.FC<GameListProps> = ({ games, onDelete }) => {
  if (games.length === 0) {
    return (
      <Typography variant="body1" align="center" sx={{ my: 2 }}>
        Geen games gespeeld op deze datum
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
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
                {format(new Date(game.date), 'dd MMMM yyyy', { locale: nl })}
              </TableCell>
              <TableCell>{game.winner}</TableCell>
              <TableCell align="right">
                {game.score} - {game.loserScore}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => onDelete(game.id)}
                  color="error"
                  sx={{ '&:hover': { color: '#d32f2f' } }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GameList; 