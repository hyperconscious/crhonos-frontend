import { useState } from 'react';
import {
    Bell,
    Zap,
    BarChart3,
    Users,
    MessageSquare,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

function Dashboard() {
    const { isDark } = useTheme();
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'New message from Team', time: '5m ago', unread: true },
        { id: 2, text: 'Project status updated', time: '15m ago', unread: true },
        { id: 3, text: 'Meeting reminder', time: '1h ago', unread: false },
    ]);

    const events = [
        { id: 1, name: 'Team Standup', time: '10:30', attendees: 8, category: 'Meeting' },
        { id: 2, name: 'Project Review', time: '13:00', attendees: 5, category: 'Review' },
        { id: 3, name: 'Client Call', time: '15:30', attendees: 3, category: 'Call' },
        { id: 4, name: 'Team Building', time: '17:00', attendees: 12, category: 'Event' },
    ];

    const stats = [
        { label: 'Tasks Done', value: '24', icon: <Zap className="w-5 h-5" /> },
        { label: 'Projects', value: '7', icon: <BarChart3 className="w-5 h-5" /> },
        { label: 'Team Members', value: '12', icon: <Users className="w-5 h-5" /> },
        { label: 'Messages', value: '18', icon: <MessageSquare className="w-5 h-5" /> },
    ];

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, unread: false } : notif
        ));
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <div className="ml-20 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">

                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
                            <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
                            <p className="opacity-90">You have 3 tasks due today</p>
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
                            <h2 className="text-xl font-semibold mb-4 dark:text-white">Upcoming Events</h2>
                            <div className="space-y-4">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-md transition-all duration-200"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-medium dark:text-white">{event.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {event.time} • {event.attendees} attendees
                                            </p>
                                        </div>
                                        <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                            {event.category}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm h-fit transition-colors duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold dark:text-white">Notifications</h2>
                            <div className="relative">
                                <Bell className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {notifications.filter(n => n.unread).length}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    onClick={() => markAsRead(notification.id)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${notification.unread
                                        ? 'bg-blue-50 dark:bg-blue-900/20'
                                        : 'bg-gray-50 dark:bg-gray-700/50'
                                        }`}
                                >
                                    <p className={`text-sm ${notification.unread ? 'font-medium' : ''} dark:text-white`}>
                                        {notification.text}
                                    </p>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;