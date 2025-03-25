import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  ThemeProvider, 
  createTheme,
  CssBaseline,
  Paper
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { isSameDay, parseISO } from 'date-fns';
import { nl } from 'date-fns/locale';
import GameForm from './components/GameForm';
import GameList from './components/GameList';
import Stats from './components/Stats';
import Calendar from './components/Calendar';
import PlayerDetailStats from './components/PlayerDetailStats';
import { Game, PlayerStats } from './types';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [stats, setStats] = useState<PlayerStats[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const savedGames = localStorage.getItem('games');
    if (savedGames) {
      setGames(JSON.parse(savedGames));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('games', JSON.stringify(games));
    calculateStats();
  }, [games]);

  const calculateStats = () => {
    const playerStats: PlayerStats[] = [
      { player: 'Danielle', wins: 0, losses: 0, totalGames: 0, winPercentage: 0 },
      { player: 'Frank', wins: 0, losses: 0, totalGames: 0, winPercentage: 0 }
    ];

    games.forEach(game => {
      const winnerIndex = playerStats.findIndex(stat => stat.player === game.winner);
      const loserIndex = playerStats.findIndex(stat => stat.player === game.loser);

      playerStats[winnerIndex].wins++;
      playerStats[loserIndex].losses++;
      playerStats[winnerIndex].totalGames++;
      playerStats[loserIndex].totalGames++;
    });

    playerStats.forEach(stat => {
      stat.winPercentage = stat.totalGames > 0 
        ? (stat.wins / stat.totalGames) * 100 
        : 0;
    });

    setStats(playerStats);
  };

  const addGame = (game: Omit<Game, 'id'>) => {
    const newGame: Game = {
      ...game,
      id: Date.now().toString(),
    };
    setGames([...games, newGame]);
  };

  const deleteGame = (gameId: string) => {
    setGames(games.filter(game => game.id !== gameId));
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={nl}>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
          py: 4
        }}>
          <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mb: 4, background: 'rgba(255, 255, 255, 0.9)' }}>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom 
                align="center"
                sx={{ 
                  color: '#1a237e',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                🏓 Tafeltennis Scorebord
              </Typography>
            </Paper>
            
            <Stats stats={stats} />
            
            <Box sx={{ my: 4 }}>
              <GameForm onSubmit={addGame} />
            </Box>

            <Box sx={{ my: 4 }}>
              <Calendar games={games} onDateSelect={setSelectedDate} />
            </Box>
            
            {selectedDate && (
              <Box sx={{ my: 4 }}>
                <GameList 
                  games={games.filter(game => isSameDay(parseISO(game.date), selectedDate))}
                  onDelete={deleteGame}
                />
              </Box>
            )}

            <Box sx={{ my: 4 }}>
              <PlayerDetailStats games={games} />
            </Box>
          </Container>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 