import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format, isSameDay, parseISO, parse, compareAsc } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Game } from '../types';
import { PickersDayProps } from '@mui/x-date-pickers/PickersDay';

interface CalendarProps {
  games: Game[];
  onDateSelect: (date: Date | null) => void;
}

const Calendar: React.FC<CalendarProps> = ({ games, onDateSelect }) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const getGamesForDate = (date: Date) => {
    return games.filter(game => isSameDay(parseISO(game.date), date));
  };

  const getMonthsWithGames = () => {
    const months = new Set<string>();
    const monthDates = new Map<string, Date>();
    
    games.forEach(game => {
      const date = parseISO(game.date);
      const monthString = format(date, 'MMMM yyyy', { locale: nl });
      months.add(monthString);
      monthDates.set(monthString, date);
    });

    return Array.from(months).sort((a, b) => {
      const dateA = monthDates.get(a) || new Date();
      const dateB = monthDates.get(b) || new Date();
      return compareAsc(dateA, dateB);
    });
  };

  const handleMonthSelect = (monthString: string) => {
    try {
      const date = parse(monthString, 'MMMM yyyy', new Date(), { locale: nl });
      setSelectedMonth(date);
      onDateSelect(null); // Reset selected date when changing month
    } catch (error) {
      console.error('Error parsing date:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)', color: 'white' }}>
      <Typography variant="h6" gutterBottom align="center">
        Kalender
      </Typography>
      <DateCalendar
        value={selectedMonth}
        onChange={onDateSelect}
        showDaysOutsideCurrentMonth
        sx={{
          width: '100%',
          '& .MuiPickersCalendarHeader-root': {
            color: 'white',
            '& .MuiPickersArrowSwitcher-root': {
              color: 'white',
              '& .MuiSvgIcon-root': {
                color: 'white',
              },
            },
            '& .MuiPickersCalendarHeader-label': {
              color: 'white',
            },
          },
          '& .MuiDayCalendar-weekDayLabel': {
            display: 'none',
          },
          '& .MuiPickersDay-root': {
            color: 'white',
            width: '36px',
            height: '36px',
            margin: '0 2px',
            '&.Mui-selected': {
              backgroundColor: '#1a237e',
              '&:hover': {
                backgroundColor: '#0d47a1',
              },
            },
          },
        }}
        slots={{
          day: (props: PickersDayProps<Date>) => {
            const date = props.day;
            const gamesOnDay = getGamesForDate(date);
            const hasGames = gamesOnDay.length > 0;

            return (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  cursor: hasGames ? 'pointer' : 'default',
                  '&:hover': {
                    backgroundColor: hasGames ? 'rgba(26, 35, 126, 0.1)' : 'transparent',
                  },
                }}
                onClick={() => hasGames && onDateSelect(date)}
              >
                <Typography>{format(date, 'd')}</Typography>
                {hasGames && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      border: '2px solid #4caf50',
                      borderRadius: '50%',
                      pointerEvents: 'none',
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': {
                          boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.4)',
                        },
                        '70%': {
                          boxShadow: '0 0 0 6px rgba(76, 175, 80, 0)',
                        },
                        '100%': {
                          boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
                        },
                      },
                    }}
                  />
                )}
              </Box>
            );
          }
        }}
      />
      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
        <Typography variant="subtitle2" gutterBottom align="center">
          Gespeelde maanden:
        </Typography>
        <Grid container spacing={1} justifyContent="center">
          {getMonthsWithGames().map((month) => (
            <Grid item key={month}>
              <Paper
                sx={{
                  px: 2,
                  py: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
                onClick={() => handleMonthSelect(month)}
              >
                <Typography variant="body2" align="center">
                  {month}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default Calendar; 