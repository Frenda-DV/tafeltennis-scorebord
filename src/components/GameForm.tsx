import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Game } from '../types';

interface GameFormProps {
  onSubmit: (game: Game) => void;
}

const GameForm: React.FC<GameFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [winner, setWinner] = useState<'Danielle' | 'Frank' | ''>('');
  const [score, setScore] = useState('');
  const [loserScore, setLoserScore] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !winner || !score || !loserScore) return;

    const game: Game = {
      id: Date.now().toString(),
      date: date.toISOString(),
      winner,
      score,
      loserScore
    };

    onSubmit(game);
    setWinner('');
    setScore('');
    setLoserScore('');
  };

  return (
    <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }
        }}
      >
        <DatePicker
          label="Datum"
          value={date}
          onChange={(newDate) => setDate(newDate)}
          sx={{ width: '100%' }}
        />

        <FormControl fullWidth>
          <InputLabel>Winnaar</InputLabel>
          <Select
            value={winner}
            label="Winnaar"
            onChange={(e) => setWinner(e.target.value as 'Danielle' | 'Frank')}
          >
            <MenuItem value="Danielle">Danielle</MenuItem>
            <MenuItem value="Frank">Frank</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Score winnaar"
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          fullWidth
          sx={{ gridColumn: { xs: '1', md: 'auto' } }}
        />

        <TextField
          label="Score verliezer"
          type="number"
          value={loserScore}
          onChange={(e) => setLoserScore(e.target.value)}
          fullWidth
          sx={{ gridColumn: { xs: '1', md: 'auto' } }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!date || !winner || !score || !loserScore}
          sx={{
            gridColumn: { xs: '1', md: '1 / -1' },
            mt: { xs: 1, md: 2 },
            height: 48
          }}
        >
          Game Toevoegen
        </Button>
      </Box>
    </Paper>
  );
};

export default GameForm; 