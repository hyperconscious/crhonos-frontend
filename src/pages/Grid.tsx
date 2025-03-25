import MainCalendar from '../components/Calendar/MainCalendar.tsx';
import MiniCalendar from '../components/Sidebar/MiniCalendar.tsx';
import dayjs from 'dayjs';
import { useState } from 'react';

const Grid = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs()); // Default is current date

    const handleDateChange = (value: dayjs.Dayjs | null) => {
        if (value) {
            setSelectedDate(value);
        }
    };

    return (
      <div>
          <div className="flex flex-col items-center space-y-4">
              <h1 className="text-3xl font-semibold">Grid Page</h1>
              <div className="flex flex-row pl-8">
                  <div className="pt-8">
                      <MiniCalendar
                        selectedDate={selectedDate}
                        handleDateChange={handleDateChange}
                      />
                  </div>
                  <MainCalendar selectedDate={selectedDate} />
              </div>
          </div>
      </div>
    );
};

export default Grid;