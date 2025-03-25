import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import { Game, Player } from '../types';
import { DatePicker } from '@mui/x-date-pickers';
import { nl } from 'date-fns/locale';

interface GameFormProps {
  onSubmit: (game: Omit<Game, 'id'>) => void;
}

const GameForm: React.FC<GameFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [winner, setWinner] = useState<Player | ''>('');
  const [winnerScore, setWinnerScore] = useState<string>('');
  const [loserScore, setLoserScore] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const loser: Player = winner === 'Frank' ? 'Danielle' : 'Frank';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!winnerScore || !loserScore || !winner || !selectedDate) return;

    onSubmit({
      date: selectedDate.toISOString().split('T')[0],
      winner,
      loser,
      winnerScore: parseInt(winnerScore),
      loserScore: parseInt(loserScore)
    });

    // Reset form
    setWinner('');
    setWinnerScore('');
    setLoserScore('');
  };

  return (
    <Paper elevation={3} sx={{ p: 3, background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)', color: 'white' }}>
      <Typography variant="h6" gutterBottom>
        Nieuwe Game Toevoegen
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DatePicker
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              label="Datum"
              format="dd-MM-yyyy"
              sx={{
                width: '100%',
                mb: 2,
                '& .MuiInputBase-root': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiIconButton-root': {
                  color: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'white' }}>Winnaar</InputLabel>
              <Select
                value={winner}
                label="Winnaar"
                onChange={(e) => setWinner(e.target.value as Player)}
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
                }}
              >
                <MenuItem value="">Kies winnaar</MenuItem>
                <MenuItem value="Frank">Frank</MenuItem>
                <MenuItem value="Danielle">Danielle</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Score winnaar"
              type="number"
              value={winnerScore}
              onChange={(e) => setWinnerScore(e.target.value)}
              fullWidth
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': {
                  color: winner ? 'white' : 'inherit',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: winner ? 'white' : 'inherit',
                  },
                  '&:hover fieldset': {
                    borderColor: winner ? 'white' : 'inherit',
                  },
                  '& input': {
                    color: winner ? 'white' : 'inherit',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Score verliezer"
              type="number"
              value={loserScore}
              onChange={(e) => setLoserScore(e.target.value)}
              fullWidth
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': {
                  color: winner ? 'white' : 'inherit',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: winner ? 'white' : 'inherit',
                  },
                  '&:hover fieldset': {
                    borderColor: winner ? 'white' : 'inherit',
                  },
                  '& input': {
                    color: winner ? 'white' : 'inherit',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              disabled={!winnerScore || !loserScore || !winner}
              sx={{ mt: 2 }}
            >
              Game Toevoegen
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default GameForm; 