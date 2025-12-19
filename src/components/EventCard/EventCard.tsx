import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BookingModal } from '../BookingModal/BookingModal';

interface EventCardProps {
  title: string;
  description: string;
  tag: string;
  dateTime: string;
  image: string;
  expandedDescription?: string;
  eventDate?: Date;
  eventId?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  tag,
  dateTime,
  image,
  expandedDescription,
  eventDate,
  eventId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const parts = dateTime.split('|').map(part => part.trim());
  const price = parts[0] || '';
  const duration = parts[1] || '';
  const slotsText = parts[2] || '';
  const timeSlotsStr = slotsText.replace('Pick a slot:', '').trim();
  const timeSlots = timeSlotsStr.split(',').map(slot => slot.trim()).filter(slot => slot);

  const getCategoryTag = (title: string) => {
    if (title.includes('YOGA') && !title.includes('ANTENATAL')) return 'YOGA';
    if (title.includes('ANTENATAL')) return 'YOGA';
    if (title.includes('HEALING')) return 'SOUND HEALING';
    if (title.includes('MEDITATION')) return 'MEDITATION';
    if (title.includes('PRANAYAMA') || title.includes('BREATHWORK')) return 'BREATHWORK';
    return 'WELLNESS';
  };

  const categoryTag = getCategoryTag(title);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleBookNow = () => {
    if (!selectedSlot && timeSlots.length > 0) {
      
      setSelectedSlot(timeSlots[0]);
    }
    setShowBookingModal(true);
  };

  const formatDateForBooking = (): string => {
    if (eventDate) {
      
      const year = eventDate.getFullYear();
      const month = String(eventDate.getMonth() + 1).padStart(2, '0');
      const day = String(eventDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-100 mb-4 flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-full ${
        isExpanded ? 'h-auto' : 'h-auto'
      }`}
    >
      <div className="flex flex-row w-full min-h-[200px] sm:min-h-[280px]">
        
        <div className={`w-32 sm:w-48 flex-shrink-0 flex flex-col ${isExpanded ? '' : ''}`}>
          
          <div className={`rounded-l-lg overflow-hidden transition-all duration-500 ${isExpanded ? 'h-[180px] sm:h-[180px]' : 'h-full sm:h-[280px] min-h-[200px]'}`}>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {isExpanded && (
            <div className="p-2 sm:p-4 pt-3 animate-fadeIn w-full">
              <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-xs sm:text-base font-semibold mb-2">
                Pick a slot:
              </p>
              <div className="flex flex-col gap-2">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlotSelect(slot)}
                    className={`[font-family:'Poppins',Helvetica] text-xs sm:text-base font-normal px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-left transition-colors touch-manipulation ${
                      selectedSlot === slot
                        ? 'bg-[#ab4b28] text-white'
                        : 'bg-gray-100 text-[#ab4b28] hover:bg-gray-200 active:bg-gray-200'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col p-2 sm:p-4 relative min-h-0 min-w-0 overflow-hidden">
          
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex flex-col items-end gap-1">
            {!isExpanded && expandedDescription && (
              <span className="[font-family:'Poppins',Helvetica] text-[8px] sm:text-[10px] text-[#ab4b28] font-medium">
                Know more
              </span>
            )}
            <button 
              onClick={toggleExpand}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#ab4b28] flex items-center justify-center hover:bg-[#ab4b28] active:bg-[#ab4b28] transition-all duration-300 group touch-manipulation bg-white"
              aria-label={isExpanded ? "Show less" : "Know more"}
            >
              <ChevronDown 
                className={`w-4 h-4 sm:w-5 sm:h-5 text-[#ab4b28] group-hover:text-white transition-all duration-300 ${
                  isExpanded ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
          </div>

          <div className="flex-1 min-h-0 min-w-0 overflow-y-auto">
            
            <h3 className="[font-family:'Poppins',Helvetica] font-bold text-[#24312e] text-sm sm:text-lg mb-1 sm:mb-2 leading-tight pr-8 sm:pr-12 truncate">
              {title}
            </h3>

            <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 flex-wrap">
              <span className="[font-family:'Poppins',Helvetica] bg-[#ab4b28] text-white px-1.5 sm:px-3 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs font-medium uppercase">
                {tag}
              </span>
              <span className="[font-family:'Poppins',Helvetica] bg-[#ab4b28] text-white px-1.5 sm:px-3 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs font-medium uppercase">
                {categoryTag}
              </span>
            </div>

            <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-[10px] sm:text-sm mb-1 sm:mb-3">
              <span className="font-semibold">Facilitator:</span> {description.replace('Facilitator:', '').trim()}
            </p>

            <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-3 flex-wrap">
              <span className="[font-family:'Poppins',Helvetica] border-2 border-[#ab4b28] text-[#24312e] px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-sm font-normal">
                {price}
              </span>
              <span className="[font-family:'Poppins',Helvetica] border-2 border-[#ab4b28] text-[#24312e] px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-sm font-normal">
                {duration}
              </span>
            </div>

            {isExpanded && expandedDescription && (
              <div className="[font-family:'Poppins',Helvetica] text-[#24312e] text-base leading-relaxed mb-4 animate-fadeIn whitespace-pre-line">
                {expandedDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className={index > 0 ? 'mt-3' : ''}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {!isExpanded && (
              <div className="[font-family:'Poppins',Helvetica] text-[10px] sm:text-sm mb-1 sm:mb-2">
                <span className="text-[#24312e] font-normal">Pick a slot: </span>
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-0.5">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlotSelect(slot)}
                      className={`text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transition-colors touch-manipulation ${
                        selectedSlot === slot
                          ? 'bg-[#ab4b28] text-white'
                          : 'bg-gray-100 text-[#ab4b28] hover:bg-gray-200 active:bg-gray-200'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!isExpanded && (
            <div className="mt-auto pt-2">
              <button 
                onClick={handleBookNow}
                className="w-full bg-[#ab4b28] hover:bg-[#8b3a1f] active:bg-[#8b3a1f] text-white py-2 sm:py-3 rounded-full [font-family:'Poppins',Helvetica] text-xs sm:text-base font-semibold uppercase transition-colors touch-manipulation"
              >
                BOOK THIS EXPERIENCE
              </button>
            </div>
          )}

          {isExpanded && (
            <div className="mt-auto pt-2">
              <button 
                onClick={handleBookNow}
                className="w-full bg-[#ab4b28] hover:bg-[#8b3a1f] active:bg-[#8b3a1f] text-white py-2 sm:py-3 rounded-full [font-family:'Poppins',Helvetica] text-xs sm:text-base font-semibold uppercase transition-colors animate-fadeIn touch-manipulation"
              >
                BOOK NOW
              </button>
            </div>
          )}
        </div>
      </div>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          setSelectedSlot('');
        }}
        eventTitle={title}
        eventDate={formatDateForBooking()}
        selectedSlot={selectedSlot || (timeSlots.length > 0 ? timeSlots[0] : '')}
        price={price}
        eventId={eventId}
      />
    </div>
  );
};
