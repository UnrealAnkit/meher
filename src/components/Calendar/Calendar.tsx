import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  initialDate?: Date;
}

export const Calendar: React.FC<CalendarProps> = ({ onDateSelect, initialDate }) => {
  const initDate = initialDate || new Date();
  const [currentDate, setCurrentDate] = useState(new Date(initDate.getFullYear(), initDate.getMonth(), 1));
  const [view, setView] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedDate, setSelectedDate] = useState<Date | null>(initDate);

  useEffect(() => {
    if (initialDate && onDateSelect) {
      onDateSelect(initialDate);
    }
    
  }, []);

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startingDayIndex = firstDayOfMonth.getDay();

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const currentMonthStr = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selectedDate);
    if (onDateSelect) {
      onDateSelect(selectedDate);
    }
  };

  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < startingDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8 sm:w-9 sm:h-9" />);
    }

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
            className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-xs sm:text-sm [font-family:'Poppins',Helvetica] touch-manipulation
              ${isToday ? 'bg-[#ab4b28] text-white' : ''}
              ${isSelected ? 'bg-[#ab4b28] text-white' : 'hover:bg-[#ab4b28] hover:text-white active:bg-[#ab4b28] active:text-white'}
              transition-colors duration-200`}
          >
            {day}
          </button>
        );
      }

    return days;
  };

  return (
    <div className="w-full max-w-[300px] lg:max-w-[300px] mx-auto lg:ml-0 lg:rounded-l-none bg-[#f9d2a3] py-3 sm:py-4 px-3 sm:px-4 rounded-lg">
      
      <div className="flex gap-2 mb-3 sm:mb-4 justify-center">
        <button
          onClick={() => setView('upcoming')}
          className={`py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors [font-family:'Poppins',Helvetica] min-w-[80px] sm:min-w-[100px] text-center
            ${view === 'upcoming' ? 'bg-[#ab4b28] text-white' : 'bg-white text-[#ab4b28] border border-[#ab4b28]'}`}
        >
          UPCOMING
        </button>
        <button
          onClick={() => setView('past')}
          className={`py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors [font-family:'Poppins',Helvetica] min-w-[80px] sm:min-w-[100px] text-center
            ${view === 'past' ? 'bg-[#ab4b28] text-white' : 'bg-white text-[#ab4b28] border border-[#ab4b28]'}`}
        >
          PAST
        </button>
      </div>

      <div className="w-full h-px bg-black mb-3 sm:mb-4"></div>

      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <button onClick={prevMonth} className="p-1 sm:p-2 touch-manipulation">
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#ab4b28]" />
        </button>
        <span className="font-medium text-[#ab4b28] [font-family:'Poppins',Helvetica] text-xs sm:text-sm md:text-base">
          {currentMonthStr} {currentYear}
        </span>
        <button onClick={nextMonth} className="p-1 sm:p-2 touch-manipulation">
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#ab4b28]" />
        </button>
      </div>

      <div className="mb-3 sm:mb-4">
        
        <div className="grid grid-cols-7 mb-2 justify-items-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs sm:text-sm font-medium text-[#ab4b28] [font-family:'Poppins',Helvetica]">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 justify-items-center">
          {generateCalendarDays()}
        </div>
      </div>

      <div className="mb-3 sm:mb-4">
        <div className="text-xs sm:text-sm font-medium text-[#ab4b28] mb-2 [font-family:'Poppins',Helvetica]">Search</div>
        <div className="flex gap-2 w-full">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 min-w-0 px-2 py-1.5 sm:py-2 rounded-md border border-[#ab4b28] focus:outline-none focus:ring-2 focus:ring-[#ab4b28] [font-family:'Poppins',Helvetica] text-xs sm:text-sm"
          />
          <Button
            variant="outline"
            className="flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-[#ab4b28] border-[#ab4b28] hover:bg-[#f9d2a3] [font-family:'Poppins',Helvetica] text-xs sm:text-sm touch-manipulation"
          >
            GO
          </Button>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
        <div>
          <div className="text-xs sm:text-sm font-medium text-[#ab4b28] mb-2 [font-family:'Poppins',Helvetica]">Filter By Time</div>
          <select className="w-full px-2 py-1.5 sm:py-2 rounded-md border border-[#ab4b28] focus:outline-none focus:ring-2 focus:ring-[#ab4b28] [font-family:'Poppins',Helvetica] text-xs sm:text-sm">
            <option value="">- Select Time -</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        <div>
          <div className="text-xs sm:text-sm font-medium text-[#ab4b28] mb-2 [font-family:'Poppins',Helvetica]">Filter By Type</div>
          <select className="w-full px-2 py-1.5 sm:py-2 rounded-md border border-[#ab4b28] focus:outline-none focus:ring-2 focus:ring-[#ab4b28] [font-family:'Poppins',Helvetica] text-xs sm:text-sm">
            <option value="">- Select Type -</option>
            <option value="therapy">Therapy</option>
            <option value="workshop">Workshop</option>
            <option value="retreat">Retreat</option>
          </select>
        </div>
      </div>

      <div className="text-left">
        <h3 className="text-[#24312e] text-sm sm:text-base md:text-lg font-medium mb-2 sm:mb-3 [font-family:'Poppins',Helvetica]">
          Host your Retreat at the MEHR
        </h3>
        <Link to="/contact">
          <Button
            variant="outline"
            className="w-full bg-white text-[#ab4b28] border-[#ab4b28] hover:bg-[#ab4b28] hover:text-white transition-colors [font-family:'Poppins',Helvetica] text-xs sm:text-sm py-2 touch-manipulation"
          >
            HOST YOUR EVENT
          </Button>
        </Link>
      </div>
    </div>
  );
};
