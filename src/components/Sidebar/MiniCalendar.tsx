import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { FC } from 'react';

interface MiniCalendarProps {
    selectedDate: Dayjs;
    handleDateChange: (value: Dayjs | null) => void;
}

const MiniCalendar: FC<MiniCalendarProps> = ({ selectedDate, handleDateChange }) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            defaultValue={dayjs(Date())}
            value={selectedDate}
            onChange={handleDateChange}
            className="!rounded-lg bg-gray-900 text-white"
            sx={{
                '& .MuiDayCalendar-root': {
                    color: 'white',
                },
                '& .MuiButtonBase-root': {
                    color: 'white',
                },
                '& .MuiPickersDay-root': {
                    color: 'white',
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(2,127,254,255)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(2,127,254,255)',
                        }
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(2,127,254,255)',
                    },
                    '&.MuiPickersDay-today': {
                        border: '1px solid white',
                        color: 'white',
                    },
                },
                '& .MuiDayCalendar-weekDayLabel': {
                    color: 'white',
                },
            }}
          />
      </LocalizationProvider>
    );
};

export default MiniCalendar;