import { useState, useCallback, useEffect } from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { Calendar } from "../components/Calendar/Calendar";
import { EventCard } from "../components/EventCard";
import { supabase, CalendarEvent } from "../lib/supabase";

export const CalendarPage = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Current system date
  const [supabaseEvents, setSupabaseEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  // Sample event data - November 1st, 2025
  const novemberFirstDate = new Date(2025, 10, 1); // November 1st, 2025
  const allEvents = [
    {
      title: "AERIAL YOGA",
      description: "Facilitator: Bhagya",
      tag: "IN-PERSON",
      dateTime: "Rs 500.00 | 60 Minutes | Pick a slot: 10:00 AM",
      image: "/rectangle-1.png",
      expandedDescription: "Aerial yoga blends traditional yoga poses with the support of a suspended hammock, enhancing flexibility, balance, and core strength. It offers a playful yet deeply restorative experience, relieving tension and promoting a sense of lightness and freedom.",
      eventDate: novemberFirstDate
    },
    {
      title: "YIN YOGA",
      description: "Facilitator: Ankeet",
      tag: "IN-PERSON",
      dateTime: "Rs 500.00 | 60 Minutes | Pick a slot: 7:30 AM, 9:00 AM, 5:00 PM",
      image: "/rectangle-1.png",
      expandedDescription: "Yin yoga is a slow-paced style that targets deep connective tissues through long-held poses. It promotes flexibility, joint health, and inner calm while balancing the body's energy flow for profound relaxation and mental clarity.",
      eventDate: novemberFirstDate
    },
    {
      title: "ANTENATAL",
      description: "Facilitator: Sunita",
      tag: "IN-PERSON",
      dateTime: "Rs 500.00 | 60 Minutes | Pick a slot: 10:00 AM",
      image: "/rectangle-1.png",
      expandedDescription: "Antenatal yoga is designed specifically for expectant mothers, focusing on gentle poses that strengthen the body, improve flexibility, and prepare for childbirth. It promotes relaxation, reduces pregnancy discomfort, and enhances connection with your baby.",
      eventDate: novemberFirstDate
    },
    {
      title: "SOUND HEALING",
      description: "Facilitator: Ankeet",
      tag: "IN-PERSON",
      dateTime: "Rs 1200.00 | 60 Minutes | Pick a slot: 6:30 AM, 9:30 AM, 6:00 PM",
      image: "/rectangle-1.png",
      expandedDescription: "Sound healing uses therapeutic vibrations from singing bowls, gongs, and other instruments to restore balance and harmony. It deeply relaxes the nervous system, releases stress, and promotes emotional and physical well-being through resonance.",
      eventDate: novemberFirstDate
    },
    {
      title: "SMILING MEDITATION",
      description: "Facilitator: Rishi",
      tag: "IN-PERSON",
      dateTime: "Rs 1200.00 | 60 Minutes | Pick a slot: 7:30 PM",
      image: "/rectangle-1.png",
      expandedDescription: "Smiling meditation cultivates inner joy and peace through gentle awareness of your natural smile. This practice releases tension, elevates mood, and fosters compassion, creating a ripple effect of positivity in body, mind, and heart.",
      eventDate: novemberFirstDate
    },
    {
      title: "HATHA YOGA",
      description: "Facilitator: Bhagya",
      tag: "IN-PERSON",
      dateTime: "Rs 500.00 | 60 Minutes | Pick a slot: 8:00 AM, 11:00 AM",
      image: "/rectangle-1.png",
      expandedDescription: "Hatha yoga combines physical postures, breathing techniques, and meditation to create balance and strength. It's a foundational practice that improves flexibility, builds muscle tone, and calms the mind while connecting body and breath.",
      eventDate: novemberFirstDate
    },
    {
      title: "PRANAYAMA & BREATHWORK",
      description: "Facilitator: Sunita",
      tag: "IN-PERSON",
      dateTime: "Rs 600.00 | 45 Minutes | Pick a slot: 6:00 AM, 4:00 PM",
      image: "/rectangle-1.png",
      expandedDescription: "Pranayama and breathwork harness the power of conscious breathing to enhance vitality and mental clarity. These techniques balance the nervous system, reduce stress, increase energy levels, and deepen your connection to the present moment.",
      eventDate: novemberFirstDate
    },
    {
      title: "RESTORATIVE YOGA",
      description: "Facilitator: Ankeet",
      tag: "IN-PERSON",
      dateTime: "Rs 550.00 | 60 Minutes | Pick a slot: 3:00 PM, 7:00 PM",
      image: "/rectangle-1.png",
      expandedDescription: "Restorative yoga uses supportive props to hold gentle poses for extended periods, allowing deep relaxation and healing. It calms the nervous system, releases chronic tension, and promotes recovery from stress and fatigue.",
      eventDate: novemberFirstDate
    }
  ];

  // Helper function to convert time string to minutes for sorting (e.g., "10:00 AM" -> 600)
  const timeToMinutes = (timeStr: string): number => {
    const trimmed = timeStr.trim().toUpperCase();
    const match = trimmed.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
    if (!match) return Infinity; // Invalid time format goes to end
    
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3];
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return hours * 60 + minutes;
  };

  // Helper function to get earliest time slot from an event
  const getEarliestTime = (timeSlots: string[]): number => {
    if (!timeSlots || timeSlots.length === 0) return Infinity;
    const times = timeSlots.map(timeToMinutes);
    return Math.min(...times);
  };

  // Fetch events from Supabase for any selected date
  const fetchEventsForDate = useCallback(async (date: Date) => {
    try {
      setLoadingEvents(true);
      // Format date as YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .eq('event_date', formattedDate);

      if (error) {
        console.error('Error fetching events:', error);
        return;
      }

      // Convert Supabase events to EventCard format
      const convertedEvents = (data || []).map((event: CalendarEvent) => {
        // Format time slots
        const timeSlotsFormatted = event.time_slots.join(', ');
        // Format dateTime string: "Rs 500.00 | 60 Minutes | Pick a slot: 10:00 AM, 11:00 AM"
        const dateTimeString = `${event.price} | ${event.duration} | Pick a slot: ${timeSlotsFormatted}`;
        
        // Parse expanded_description - handle both JSON and plain text formats
        let expandedDescription = event.expanded_description || '';
        if (expandedDescription) {
          try {
            const parsed = JSON.parse(expandedDescription);
            // Format structured description nicely
            const parts = [];
            if (parsed.objective) {
              parts.push(`Objective- ${parsed.objective}`);
            }
            if (parsed.targetAudience) {
              parts.push(`Who is this for? ${parsed.targetAudience}`);
            }
            if (parsed.detailedDescription) {
              parts.push(parsed.detailedDescription);
            }
            expandedDescription = parts.join('\n\n');
          } catch (e) {
            // If not JSON, use as-is (backward compatibility)
            expandedDescription = event.expanded_description;
          }
        }
        
        return {
          id: event.id,
          title: event.title,
          description: event.description,
          tag: event.tag,
          dateTime: dateTimeString,
          image: event.image_url || '/rectangle-1.png',
          expandedDescription: expandedDescription,
          eventDate: new Date(event.event_date),
          timeSlots: event.time_slots // Keep time slots for sorting
        };
      });

      // Sort events by earliest time slot in ascending order
      const sortedEvents = convertedEvents.sort((a, b) => {
        const timeA = getEarliestTime(a.timeSlots || []);
        const timeB = getEarliestTime(b.timeSlots || []);
        return timeA - timeB; // Ascending order
      });

      setSupabaseEvents(sortedEvents);
    } catch (err) {
      console.error('Error fetching Supabase events:', err);
    } finally {
      setLoadingEvents(false);
    }
  }, []);

  // Fetch events when component mounts or when selected date changes
  useEffect(() => {
    // Always fetch events from Supabase for the selected date
    fetchEventsForDate(selectedDate);
  }, [selectedDate, fetchEventsForDate]);

  // Handle date selection from calendar (memoized to prevent infinite loops)
  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // Filter events based on selected date
  const isNovemberFirst = selectedDate.getDate() === 1 && 
                          selectedDate.getMonth() === 10 && 
                          selectedDate.getFullYear() === 2025;
  
  // Show November 1st events (hardcoded) or fetch events from Supabase for any other date
  let events = isNovemberFirst ? allEvents : supabaseEvents;
  
  // Sort November 1st events by time as well (if they have time slots in dateTime)
  if (isNovemberFirst) {
    events = [...allEvents].sort((a, b) => {
      // Extract time from dateTime string (e.g., "Pick a slot: 10:00 AM, 11:00 AM")
      const extractEarliestTime = (dateTime: string): number => {
        const match = dateTime.match(/Pick a slot:\s*([^,]+)/);
        if (!match) return Infinity;
        return timeToMinutes(match[1].trim());
      };
      const timeA = extractEarliestTime(a.dateTime);
      const timeB = extractEarliestTime(b.dateTime);
      return timeA - timeB; // Ascending order
    });
  }

  // Format date for display
  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const suffix = day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th';
    return `${day}${suffix} ${month} ${year}`;
  };

  return (
    <div className="bg-white overflow-hidden w-full relative">
      {/* Header Section */}
      <NavbarSection />

      {/* Hero Section with Video */}
      <section className="relative w-full bg-white">
        <video
          className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ backgroundColor: '#ab4b28' }}
        >
          <source src="https://meher.b-cdn.net/Meher%20Spaces%20Walk%20Through%20Vid.MP4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Text Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] text-center px-4">
          <h1 className="[font-family:'Poppins',Helvetica] font-light text-white text-lg sm:text-xl md:text-3xl lg:text-[45px] tracking-[1px] sm:tracking-[2px] leading-[28px] sm:leading-[35px] md:leading-[50px] lg:leading-[55px] drop-shadow-2xl text-shadow-lg">
            Book an Experience with us at your convenient day
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative w-full bg-white py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:max-w-none">
          {/* Calendar Section */}
          <div className="w-full lg:w-[300px] flex-shrink-0 mx-auto lg:mx-0 lg:pl-0">
            <Calendar onDateSelect={handleDateSelect} initialDate={new Date()} />
          </div>
            
          {/* Content Section - Event Cards */}
          <div className="flex-1 bg-white min-w-0 lg:pr-8">
            <h2 className="[font-family:'Poppins',Helvetica] text-xl sm:text-2xl font-light text-[#24312e] mb-4 sm:mb-6">
              {formatDate(selectedDate)}
            </h2>
            <div className="flex flex-col gap-4 w-full">
              {loadingEvents ? (
                <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-base">Loading events...</p>
              ) : events.length > 0 ? (
                events.map((event, index) => (
                  <EventCard
                    key={index}
                    title={event.title}
                    description={event.description}
                    tag={event.tag}
                    dateTime={event.dateTime}
                    image={event.image}
                    expandedDescription={event.expandedDescription}
                    eventDate={event.eventDate}
                    eventId={(event as any).id || undefined}
                  />
                ))
              ) : (
                <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-base">No events scheduled.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
};
