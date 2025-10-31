import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface EventCardProps {
  title: string;
  description: string;
  tag: string;
  dateTime: string;
  image: string;
  expandedDescription?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  tag,
  dateTime,
  image,
  expandedDescription
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Parse dateTime string to extract price, duration, and time slots
  // Format: "Rs 500.00 | 60 Minutes | Pick a slot: 10:00 AM, 11:00 AM"
  const parts = dateTime.split('|').map(part => part.trim());
  const price = parts[0] || '';
  const duration = parts[1] || '';
  const slotsText = parts[2] || '';
  const timeSlots = slotsText.replace('Pick a slot:', '').trim();

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

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-100 mb-4 flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${
        isExpanded ? 'h-auto' : 'h-[260px]'
      }`}
    >
      <div className="flex h-[260px]">
        {/* Left Section - Image */}
        <div className="w-48 flex-shrink-0 rounded-l-lg overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right Section - Event Details */}
        <div className="flex-1 flex flex-col justify-between p-4 relative">
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

          <div>
            {/* Title */}
            <h3 className="[font-family:'Poppins',Helvetica] font-bold text-[#24312e] text-lg mb-2 leading-tight">
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
            <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-sm mb-2">
              <span className="font-semibold">Facilitator:</span> {description.replace('Facilitator:', '').trim()}
            </p>

            {/* Price and Duration in rounded boxes */}
            <div className="flex items-center gap-2 mb-2">
              <span className="[font-family:'Poppins',Helvetica] border-2 border-[#ab4b28] text-[#24312e] px-3 py-1 rounded-full text-sm font-normal">
                {price}
              </span>
              <span className="[font-family:'Poppins',Helvetica] border-2 border-[#ab4b28] text-[#24312e] px-3 py-1 rounded-full text-sm font-normal">
                {duration}
              </span>
            </div>

            {/* Pick a slot - only show when NOT expanded */}
            {!isExpanded && (
              <div className="[font-family:'Poppins',Helvetica] text-sm mb-2">
                <span className="text-[#24312e] font-normal">Pick a slot: </span>
                <span className="text-[#ab4b28] font-normal">{timeSlots}</span>
              </div>
            )}
          </div>

          {/* Book This Experience Button - only show when NOT expanded */}
          {!isExpanded && (
            <button className="w-full bg-[#ab4b28] hover:bg-[#8b3a1f] text-white py-3 rounded-full [font-family:'Poppins',Helvetica] text-base font-semibold uppercase transition-colors mt-2">
              BOOK THIS EXPERIENCE
            </button>
          )}
        </div>
      </div>

      {/* Expanded Section */}
      {isExpanded && (
        <div className="p-6 pt-0 animate-fadeIn">
          <div className="flex gap-6">
            {/* Left Side - Pick a slot */}
            <div className="w-48 flex-shrink-0">
              <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-base font-semibold mb-3">
                Pick a slot:
              </p>
              <div className="flex flex-col gap-2">
                {timeSlots.split(',').map((slot, index) => (
                  <span 
                    key={index}
                    className="[font-family:'Poppins',Helvetica] text-[#ab4b28] text-base font-normal"
                  >
                    {slot.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Side - Description */}
            <div className="flex-1">
              <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-base leading-relaxed mb-4">
                {expandedDescription}
              </p>
            </div>
          </div>

          {/* Book Now Button */}
          <button className="w-full bg-[#ab4b28] hover:bg-[#8b3a1f] text-white py-3 rounded-full [font-family:'Poppins',Helvetica] text-base font-semibold uppercase transition-colors mt-4">
            BOOK NOW
          </button>
        </div>
      )}
    </div>
  );
};
