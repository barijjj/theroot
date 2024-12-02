import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar } from 'lucide-react';

interface HeaderProps {
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onAddBooking: () => void;
  currentDate: Date;
  view: 'week' | 'day';
  onViewChange: (view: 'week' | 'day') => void;
}

const Header = ({ 
  onPreviousWeek, 
  onNextWeek, 
  onAddBooking, 
  currentDate,
  view,
  onViewChange
}: HeaderProps) => {
  const startOfWeek = new Date(currentDate);
  const endOfWeek = new Date(currentDate);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  const formatDateRange = () => {
    if (view === 'day') {
      return currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }

    if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
      return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${startOfWeek.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      })}`;
    } else if (startOfWeek.getFullYear() === endOfWeek.getFullYear()) {
      return `${startOfWeek.toLocaleDateString('en-US', { month: 'short' })} ${startOfWeek.getDate()} - ${endOfWeek.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })}`;
    } else {
      return `${startOfWeek.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })} - ${endOfWeek.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })}`;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onPreviousWeek}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={onNextWeek}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {formatDateRange()}
          </h2>
          <div className="ml-4 flex rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => onViewChange('week')}
              className={`px-3 py-1 text-sm ${
                view === 'week'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => onViewChange('day')}
              className={`px-3 py-1 text-sm ${
                view === 'day'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Day
            </button>
          </div>
        </div>
        <button
          onClick={onAddBooking}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Booking</span>
        </button>
      </div>
    </div>
  );
};

export default Header;