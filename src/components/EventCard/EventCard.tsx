import React from 'react';
import { ChevronRight } from 'lucide-react';

interface EventCardProps {
  title: string;
  description: string;
  tag: string;
  dateTime: string;
  image: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  tag,
  dateTime,
  image
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-4 flex overflow-hidden h-full">
      {/* Left Section - Image */}
      <div className="w-64 flex-shrink-0 rounded-l-lg overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Right Section - Event Details */}
      <div className="flex-1 flex flex-col justify-between p-4">
        <div>
          <h3 className="[font-family:'Poppins',Helvetica] font-bold text-[#24312e] text-lg mb-2 leading-tight">
            {title}
          </h3>
          <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-sm mb-3">
            {description}
          </p>
          <div className="flex items-center gap-3 mb-3">
            <span className="[font-family:'Poppins',Helvetica] bg-[#ab4b28] text-white px-3 py-1 rounded text-xs font-medium">
              {tag}
            </span>
          </div>
          <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-sm">
            {dateTime}
          </p>
        </div>
        
        {/* Right Arrow */}
          <div className="flex justify-end mt-4">
            <button className="w-10 h-10 rounded-full border border-[#ab4b28] flex items-center justify-center hover:bg-[#ab4b28] hover:text-white transition-colors group">
              <ChevronRight className="w-5 h-5 text-[#ab4b28] group-hover:text-white" />
            </button>
          </div>
      </div>
    </div>
  );
};
