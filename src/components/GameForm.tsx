import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Game } from '../types';

const GameForm: React.FC<{ onSubmit: (game: Game) => void }> = ({ onSubmit }) => {
  const [winner, setWinner] = useState<'Danielle' | 'Frank' | ''>('');
  const [score, setScore] = useState('');
  const [loserScore, setLoserScore] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!winner || !score || !loserScore || !date) return;

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
    setDate(new Date());
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#1976d2' }}>
        Nieuwe Game
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <DatePicker
          label="Datum"
          value={date}
          onChange={(newDate) => setDate(newDate)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Winnaar</InputLabel>
        <Select
          value={winner}
          label="Winnaar"
          onChange={(e) => setWinner(e.target.value as 'Danielle' | 'Frank')}
        >
          <MenuItem value="">Kies winnaar</MenuItem>
          <MenuItem value="Danielle">Danielle</MenuItem>
          <MenuItem value="Frank">Frank</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Score winnaar"
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Score verliezer"
          type="number"
          value={loserScore}
          onChange={(e) => setLoserScore(e.target.value)}
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!winner || !score || !loserScore || !date}
      >
        Game Toevoegen
      </Button>
    </Box>
  );
};

export default GameForm; 