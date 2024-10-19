import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, PlusCircle, User, BarChart2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold text-indigo-600 dark:text-indigo-400">
              <Clock className="w-8 h-8 mr-2" />
              TaskMaster
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
              Tasks
            </Link>
            <Link to="/create" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
              <PlusCircle className="w-5 h-5" />
            </Link>
            <Link to="/reports" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
              <BarChart2 className="w-5 h-5" />
            </Link>
            <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={toggleTheme}
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-gray-200 dark:bg-gray-700"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};