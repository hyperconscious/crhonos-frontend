import { Link, useLocation } from 'react-router-dom';
import {
  Calendar,
  CalendarPlus2,
  ClipboardList,
  CircleEllipsis as Ellipsis,
  FolderOpenDot,
  Mouse as House,
  Moon,
  Settings,
  Sun,
  ChevronRight,
  Bell,
  User
} from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    {
      to: '/dashboard',
      icon: <House className="w-5 h-5" />,
      label: 'Dashboard',
      key: 'dashboard',
    },
    {
      to: '/projects',
      icon: <FolderOpenDot className="w-5 h-5" />,
      label: 'Projects',
      key: 'projects',
    },
    {
      to: '/calendar',
      icon: <Calendar className="w-5 h-5" />,
      label: 'Calendar',
      key: 'calendar',
    },
    {
      to: '/notifications',
      icon: <Bell className="w-5 h-5" />,
      label: 'Notifications',
      key: 'notifications',
    },
    {
      to: '/profile',
      icon: <User className="w-5 h-5" />,
      label: 'Profile',
      key: 'profile',
    },
    {
      to: '/settings',
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
      key: 'settings',
    },
  ];

  const quickActions = [
    {
      to: '/new-event',
      icon: <CalendarPlus2 className="w-5 h-5" />,
      label: 'New Event',
      color: 'bg-blue-500/10 text-blue-500',
      key: 'new-event',
    },
    {
      to: '/tasks',
      icon: <ClipboardList className="w-5 h-5" />,
      label: 'My Tasks',
      color: 'bg-purple-500/10 text-purple-500',
      key: 'tasks',
    },
    {
      to: '/more',
      icon: <Ellipsis className="w-5 h-5" />,
      label: 'More',
      color: 'bg-gray-500/10 text-gray-500',
      key: 'more',
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-20'} z-50`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">

        <div className="h-20 flex items-center px-4 relative border-b border-gray-200 dark:border-gray-800">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className={`ml-4 overflow-hidden transition-all duration-300 ${isExpanded ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
              Chronos
            </h1>
          </div>
        </div>

        <div className="flex-1 py-6 px-4 space-y-6">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
                  ${location.pathname === item.to
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <span className={`transition-all duration-300 whitespace-nowrap ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {isExpanded && (
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
              <h2 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold mb-4 px-3">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.key}
                    to={action.to}
                    className={`flex flex-col items-center p-3 rounded-lg ${action.color} transition-all duration-200 hover:opacity-80`}
                  >
                    {action.icon}
                    <span className="text-xs mt-2 whitespace-nowrap">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-20 border-t border-gray-200 dark:border-gray-800 flex items-center px-4">
          <button
            onClick={toggleTheme}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
              text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 w-full`}
          >
            <div className="flex-shrink-0">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </div>
            <span className={`transition-all duration-300 whitespace-nowrap ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>

        <button
          className={`absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white dark:bg-gray-900
            rounded-full shadow-md flex items-center justify-center transition-transform duration-300
            border border-gray-200 dark:border-gray-800 ${isExpanded ? 'rotate-180' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;