import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get the first day of the month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startingDayIndex = firstDayOfMonth.getDay();

  // Get the number of days in the month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  // Get month and year strings
  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const currentMonthStr = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  // Navigation handlers
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Date selection handler
  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selectedDate);
    if (onDateSelect) {
      onDateSelect(selectedDate);
    }
  };

  // Generate calendar grid
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        today.getDate() === day && 
        today.getMonth() === currentDate.getMonth() && 
        today.getFullYear() === currentDate.getFullYear();

      const isSelected = 
        selectedDate?.getDate() === day && 
        selectedDate?.getMonth() === currentDate.getMonth() && 
        selectedDate?.getFullYear() === currentDate.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
            ${isToday ? 'bg-[#ab4b28] text-white' : ''}
            ${isSelected ? 'bg-[#ab4b28] text-white' : 'hover:bg-[#ab4b28] hover:text-white'}
            transition-colors duration-200`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="w-[300px] bg-[#f9d2a3] p-6 rounded-lg">
      {/* Toggle buttons */}
      <div className="flex mb-6 bg-white rounded-lg p-1">
        <button
          onClick={() => setView('upcoming')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors
            ${view === 'upcoming' ? 'bg-[#ab4b28] text-white' : 'text-[#ab4b28]'}`}
        >
          UPCOMING
        </button>
        <button
          onClick={() => setView('past')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors
            ${view === 'past' ? 'bg-[#ab4b28] text-white' : 'text-[#ab4b28]'}`}
        >
          PAST
        </button>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1">
          <ChevronLeft className="w-5 h-5 text-[#ab4b28]" />
        </button>
        <span className="font-medium text-[#ab4b28]">
          {currentMonthStr} {currentYear}
        </span>
        <button onClick={nextMonth} className="p-1">
          <ChevronRight className="w-5 h-5 text-[#ab4b28]" />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="mb-4">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="w-8 h-8 flex items-center justify-center text-sm font-medium text-[#ab4b28]">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {generateCalendarDays()}
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="text-sm font-medium text-[#ab4b28] mb-2">Search</div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 px-3 py-2 rounded-md border border-[#ab4b28] focus:outline-none focus:ring-2 focus:ring-[#ab4b28]"
          />
          <Button
            variant="outline"
            className="px-4 py-2 bg-[#ab4b28] text-white border-[#ab4b28] hover:bg-[#8d3d20]"
          >
            GO
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="text-sm font-medium text-[#ab4b28] mb-2">Filter By Time</div>
          <select className="w-full px-3 py-2 rounded-md border border-[#ab4b28] focus:outline-none focus:ring-2 focus:ring-[#ab4b28]">
            <option value="">- Select Time -</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        <div>
          <div className="text-sm font-medium text-[#ab4b28] mb-2">Filter By Type</div>
          <select className="w-full px-3 py-2 rounded-md border border-[#ab4b28] focus:outline-none focus:ring-2 focus:ring-[#ab4b28]">
            <option value="">- Select Type -</option>
            <option value="therapy">Therapy</option>
            <option value="workshop">Workshop</option>
            <option value="retreat">Retreat</option>
          </select>
        </div>
      </div>

      {/* Host Event Section */}
      <div className="text-center">
        <h3 className="text-[#24312e] text-lg font-medium mb-3">
          Host your event at the MEHR
        </h3>
        <Button
          variant="outline"
          className="w-full bg-white text-[#ab4b28] border-[#ab4b28] hover:bg-[#ab4b28] hover:text-white transition-colors"
        >
          HOST YOUR EVENT
        </Button>
      </div>
    </div>
  );
};
