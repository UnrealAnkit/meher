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

  // Parse dateTime string to extract price, duration, and time slots
  // Format: "Rs 500.00 | 60 Minutes | Pick a slot: 10:00 AM, 11:00 AM"
  const parts = dateTime.split('|').map(part => part.trim());
  const price = parts[0] || '';
  const duration = parts[1] || '';
  const slotsText = parts[2] || '';
  const timeSlotsStr = slotsText.replace('Pick a slot:', '').trim();
  const timeSlots = timeSlotsStr.split(',').map(slot => slot.trim()).filter(slot => slot);

  // Determine category tag based on title
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
      // If no slot selected, select first one by default
      setSelectedSlot(timeSlots[0]);
    }
    setShowBookingModal(true);
  };

  const formatDateForBooking = (): string => {
    if (eventDate) {
      // Format as YYYY-MM-DD
      const year = eventDate.getFullYear();
      const month = String(eventDate.getMonth() + 1).padStart(2, '0');
      const day = String(eventDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-100 mb-4 flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${
        isExpanded ? 'h-auto' : 'h-[260px]'
      }`}
    >
      <div className="flex">
        {/* Left Section - Image and Pick a slot */}
        <div className={`w-48 flex-shrink-0 flex flex-col ${isExpanded ? '' : 'h-[260px]'}`}>
          {/* Image */}
          <div className={`rounded-l-lg overflow-hidden transition-all duration-500 ${isExpanded ? 'h-[180px]' : 'h-[260px]'}`}>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Pick a slot - shown when expanded, below image */}
          {isExpanded && (
            <div className="p-4 pt-3 animate-fadeIn">
              <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-base font-semibold mb-2">
                Pick a slot:
              </p>
              <div className="flex flex-col gap-2">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlotSelect(slot)}
                    className={`[font-family:'Poppins',Helvetica] text-base font-normal px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedSlot === slot
                        ? 'bg-[#ab4b28] text-white'
                        : 'bg-gray-100 text-[#ab4b28] hover:bg-gray-200'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Section - Event Details */}
        <div className="flex-1 flex flex-col p-4 relative">
          {/* Arrow Button - Top Right */}
          <div className="absolute top-3 right-3">
            <button 
              onClick={toggleExpand}
              className="w-10 h-10 rounded-full border-2 border-[#ab4b28] flex items-center justify-center hover:bg-[#ab4b28] transition-all duration-300 group"
            >
              <ChevronDown 
                className={`w-5 h-5 text-[#ab4b28] group-hover:text-white transition-all duration-300 ${
                  isExpanded ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
          </div>

          <div className="flex-1">
            {/* Title */}
            <h3 className="[font-family:'Poppins',Helvetica] font-bold text-[#24312e] text-lg mb-2 leading-tight pr-12">
              {title}
            </h3>

            {/* Tags */}
            <div className="flex items-center gap-2 mb-2">
              <span className="[font-family:'Poppins',Helvetica] bg-[#ab4b28] text-white px-3 py-1 rounded text-xs font-medium uppercase">
                {tag}
              </span>
              <span className="[font-family:'Poppins',Helvetica] bg-[#ab4b28] text-white px-3 py-1 rounded text-xs font-medium uppercase">
                {categoryTag}
              </span>
            </div>

            {/* Facilitator */}
            <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-sm mb-3">
              <span className="font-semibold">Facilitator:</span> {description.replace('Facilitator:', '').trim()}
            </p>

            {/* Price and Duration in rounded boxes */}
            <div className="flex items-center gap-2 mb-3">
              <span className="[font-family:'Poppins',Helvetica] border-2 border-[#ab4b28] text-[#24312e] px-3 py-1 rounded-full text-sm font-normal">
                {price}
              </span>
              <span className="[font-family:'Poppins',Helvetica] border-2 border-[#ab4b28] text-[#24312e] px-3 py-1 rounded-full text-sm font-normal">
                {duration}
              </span>
            </div>

            {/* Description - shown when expanded */}
            {isExpanded && expandedDescription && (
              <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-base leading-relaxed mb-4 animate-fadeIn">
                {expandedDescription}
              </p>
            )}

            {/* Pick a slot - only show when NOT expanded */}
            {!isExpanded && (
              <div className="[font-family:'Poppins',Helvetica] text-sm mb-2">
                <span className="text-[#24312e] font-normal">Pick a slot: </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlotSelect(slot)}
                      className={`text-xs px-2 py-1 rounded transition-colors ${
                        selectedSlot === slot
                          ? 'bg-[#ab4b28] text-white'
                          : 'bg-gray-100 text-[#ab4b28] hover:bg-gray-200'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Book This Experience Button - only show when NOT expanded */}
          {!isExpanded && (
            <button 
              onClick={handleBookNow}
              className="w-full bg-[#ab4b28] hover:bg-[#8b3a1f] text-white py-3 rounded-full [font-family:'Poppins',Helvetica] text-base font-semibold uppercase transition-colors mt-2"
            >
              BOOK THIS EXPERIENCE
            </button>
          )}

          {/* Book Now Button - only show when expanded */}
          {isExpanded && (
            <button 
              onClick={handleBookNow}
              className="w-full bg-[#ab4b28] hover:bg-[#8b3a1f] text-white py-3 rounded-full [font-family:'Poppins',Helvetica] text-base font-semibold uppercase transition-colors mt-2 animate-fadeIn"
            >
              BOOK NOW
            </button>
          )}
        </div>
      </div>

      {/* Booking Modal */}
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
