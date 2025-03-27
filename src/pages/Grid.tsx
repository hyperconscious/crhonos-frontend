import { CalendarIcon, Clock, Star, Users } from 'lucide-react';
import MainCalendar from '../components/Calendar/MainCalendar.tsx';
import MiniCalendar from '../components/Sidebar/MiniCalendar.tsx';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext.tsx';

const Grid = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs()); // Default is current date
    const { isDark } = useTheme();

    const handleDateChange = (value: dayjs.Dayjs | null) => {
        if (value) {
            setSelectedDate(value);
        }
    };

    const stats = [
        {
            label: 'My Calendars',
            value: 2,
            icon: <CalendarIcon className="w-5 h-5" />,
        },
        {
            label: 'Events Today',
            value: 2,
            // value: events.filter(e => dayjs(e.start).isSame(dayjs(), 'day')).length,
            icon: <Star className="w-5 h-5" />,
        },
        {
            label: 'Shared',
            value: '5',
            icon: <Users className="w-5 h-5" />,
        },
        {
            label: 'Upcoming',
            value: '12',
            icon: <Clock className="w-5 h-5" />,
        },
    ];

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <div className="p-8">
                <div className="grid grid-cols-1 gap-8">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold mb-2">My Calendar</h1>
                        </div>
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat, i) => (
                                <div
                                    key={i}
                                    className="bg-white/10 backdrop-blur-lg rounded-xl p-4 transform hover:scale-105 transition-transform duration-200"
                                >
                                    <div className="flex items-center space-x-2 mb-2">
                                        {stat.icon}
                                        <span className="text-sm opacity-90">{stat.label}</span>
                                    </div>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm transition-colors duration-300">
                        <MainCalendar selectedDate={selectedDate} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Grid;