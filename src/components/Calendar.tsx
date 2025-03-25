import React from 'react';
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
  const renderDay = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>
  ) => {
    const hasGames = datesWithGames.some(
      gameDate =>
        gameDate.getDate() === date.getDate() &&
        gameDate.getMonth() === date.getMonth() &&
        gameDate.getFullYear() === date.getFullYear()
    );

    return (
      <Badge
        key={date.toString()}
        overlap="circular"
        badgeContent={hasGames ? "🏓" : undefined}
      >
        <PickersDay {...pickersDayProps} />
      </Badge>
    );
  };

  return (
    <DateCalendar
      value={selectedDate}
      onChange={onDateSelect}
      slots={{ day: renderDay }}
      sx={{
        width: '100%',
        maxWidth: 350,
        margin: '0 auto',
        '& .MuiPickersDay-root': {
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }
        }
      }}
    />
  );
};

export default Calendar; 