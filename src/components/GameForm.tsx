import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Typography
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
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        bgcolor: '#1a237e',
        color: 'white'
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
        Nieuwe Game Toevoegen
      </Typography>
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
          sx={{
            width: '100%',
            '& .MuiInputLabel-root': {
              color: 'white'
            },
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.23)'
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.87)'
              }
            },
            '& .MuiIconButton-root': {
              color: 'white'
            }
          }}
        />

        <FormControl fullWidth>
          <InputLabel sx={{ color: 'white' }}>Winnaar</InputLabel>
          <Select
            value={winner}
            label="Winnaar"
            onChange={(e) => setWinner(e.target.value as 'Danielle' | 'Frank')}
            sx={{
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.23)'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.87)'
              },
              '& .MuiSvgIcon-root': {
                color: 'white'
              }
            }}
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
          sx={{
            gridColumn: { xs: '1', md: 'auto' },
            '& .MuiInputLabel-root': {
              color: 'white'
            },
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.23)'
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.87)'
              }
            }
          }}
        />

        <TextField
          label="Score verliezer"
          type="number"
          value={loserScore}
          onChange={(e) => setLoserScore(e.target.value)}
          fullWidth
          sx={{
            gridColumn: { xs: '1', md: 'auto' },
            '& .MuiInputLabel-root': {
              color: 'white'
            },
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.23)'
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.87)'
              }
            }
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!date || !winner || !score || !loserScore}
          sx={{
            gridColumn: { xs: '1', md: '1 / -1' },
            mt: { xs: 1, md: 2 },
            height: 48,
            bgcolor: '#3f51b5',
            '&:hover': {
              bgcolor: '#3949ab'
            }
          }}
        >
          Game Toevoegen
        </Button>
      </Box>
    </Paper>
  );
};

export default GameForm; 