import React from 'react';
import { Paper, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { Badge } from '@mui/material';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';

interface CalendarProps {
  datesWithGames: Date[];
  onDateSelect: (date: Date | null) => void;
  selectedDate: Date | null;
}

const Calendar: React.FC<CalendarProps> = ({
  datesWithGames,
  onDateSelect,
  selectedDate
}) => {
  const renderDay = (props: PickersDayProps<Date>) => {
    const { day } = props;
    const hasGames = datesWithGames.some(
      gameDate =>
        gameDate.getDate() === day.getDate() &&
        gameDate.getMonth() === day.getMonth() &&
        gameDate.getFullYear() === day.getFullYear()
    );

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={hasGames ? "🏓" : undefined}
      >
        <PickersDay {...props} />
      </Badge>
    );
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
        Kalender
      </Typography>
      <DateCalendar
        value={selectedDate}
        onChange={onDateSelect}
        slots={{ day: renderDay }}
        sx={{
          width: '100%',
          maxWidth: 350,
          margin: '0 auto',
          bgcolor: '#1a237e',
          color: 'white',
          '& .MuiPickersDay-root': {
            color: 'white',
            '&:hover': {
              backgroundColor: '#3949ab'
            },
            '&.Mui-selected': {
              backgroundColor: '#3f51b5',
              '&:hover': {
                backgroundColor: '#3949ab'
              }
            }
          },
          '& .MuiDayCalendar-weekDayLabel': {
            color: 'white'
          },
          '& .MuiPickersCalendarHeader-label': {
            color: 'white'
          },
          '& .MuiPickersCalendarHeader-switchViewButton': {
            color: 'white'
          },
          '& .MuiPickersArrowSwitcher-button': {
            color: 'white'
          }
        }}
      />
    </Paper>
  );
};

export default Calendar; 