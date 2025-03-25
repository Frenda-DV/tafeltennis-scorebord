import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import GameForm from './components/GameForm';
import GameList from './components/GameList';
import Stats from './components/Stats';
import Calendar from './components/Calendar';
import PlayerDetailStats from './components/PlayerDetailStats';
import { Game, PlayerStats } from './types';

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>(() => {
    const savedGames = localStorage.getItem('games');
    return savedGames ? JSON.parse(savedGames) : [];
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [stats, setStats] = useState<{ [key: string]: PlayerStats }>({
    Danielle: { wins: 0, losses: 0, totalPoints: 0, gamesPlayed: 0 },
    Frank: { wins: 0, losses: 0, totalPoints: 0, gamesPlayed: 0 }
  });

  useEffect(() => {
    localStorage.setItem('games', JSON.stringify(games));
    calculateStats();
  }, [games]);

  const calculateStats = () => {
    const newStats = {
      Danielle: { wins: 0, losses: 0, totalPoints: 0, gamesPlayed: 0 },
      Frank: { wins: 0, losses: 0, totalPoints: 0, gamesPlayed: 0 }
    };

    games.forEach(game => {
      const winner = game.winner;
      const loser = winner === 'Danielle' ? 'Frank' : 'Danielle';
      const winnerScore = parseInt(game.score);
      const loserScore = parseInt(game.loserScore);

      newStats[winner].wins += 1;
      newStats[winner].totalPoints += winnerScore;
      newStats[winner].gamesPlayed += 1;

      newStats[loser].losses += 1;
      newStats[loser].totalPoints += loserScore;
      newStats[loser].gamesPlayed += 1;
    });

    setStats(newStats);
  };

  const addGame = (game: Game) => {
    setGames(prevGames => [...prevGames, game]);
  };

  const deleteGame = (gameId: string) => {
    setGames(prevGames => prevGames.filter(game => game.id !== gameId));
  };

  const filteredGames = selectedDate
    ? games.filter(game => {
        const gameDate = new Date(game.date);
        return (
          gameDate.getFullYear() === selectedDate.getFullYear() &&
          gameDate.getMonth() === selectedDate.getMonth() &&
          gameDate.getDate() === selectedDate.getDate()
        );
      })
    : [];

  const datesWithGames = games.map(game => new Date(game.date));

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#1976d2' }}>
        Tafeltennis Scorebord
      </Typography>
      
      <Stats stats={stats} />
      
      <Box sx={{ my: 4 }}>
        <GameForm onSubmit={addGame} />
      </Box>

      <Box sx={{ my: 4 }}>
        <Calendar 
          datesWithGames={datesWithGames}
          onDateSelect={setSelectedDate}
          selectedDate={selectedDate}
        />
      </Box>

      {selectedDate && (
        <Box sx={{ my: 4 }}>
          <GameList 
            games={filteredGames} 
            onDelete={deleteGame}
          />
        </Box>
      )}

      <Box sx={{ my: 4 }}>
        <PlayerDetailStats games={games} />
      </Box>
    </Container>
  );
};

export default App; 