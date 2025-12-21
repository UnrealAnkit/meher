import { useState, useCallback, useEffect, useRef } from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { Calendar } from "../components/Calendar/Calendar";
import { EventCard } from "../components/EventCard";
import { supabase, CalendarEvent } from "../lib/supabase";

interface MonthEvent {
  id: string;
  title: string;
  description: string;
  tag: string;
  dateTime: string;
  image: string;
  expandedDescription: string;
  eventDate: Date;
  timeSlots: string[];
}

export const CalendarPage = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); 
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [monthEvents, setMonthEvents] = useState<Map<string, MonthEvent[]>>(new Map());
  const [loadingEvents, setLoadingEvents] = useState(false);
  const eventsContainerRef = useRef<HTMLDivElement>(null);

  const novemberFirstDate = new Date(2025, 10, 1); 
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

  const timeToMinutes = (timeStr: string): number => {
    const trimmed = timeStr.trim().toUpperCase();
    const match = trimmed.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
    if (!match) return Infinity; 
    
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3];
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return hours * 60 + minutes;
  };

  const getEarliestTime = (timeSlots: string[]): number => {
    if (!timeSlots || timeSlots.length === 0) return Infinity;
    const times = timeSlots.map(timeToMinutes);
    return Math.min(...times);
  };

  const convertEvent = useCallback((event: CalendarEvent): MonthEvent => {
    const timeSlotsFormatted = event.time_slots.join(', ');
    const dateTimeString = `${event.price} | ${event.duration} | Pick a slot: ${timeSlotsFormatted}`;

    let expandedDescription = event.expanded_description || '';
    if (expandedDescription) {
      try {
        const parsed = JSON.parse(expandedDescription);
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
      timeSlots: event.time_slots 
    };
  }, []);

  const fetchEventsForMonth = useCallback(async (month: Date) => {
    try {
      setLoadingEvents(true);
      
      const year = month.getFullYear();
      const monthNum = month.getMonth();
      const lastDay = new Date(year, monthNum + 1, 0);
      
      // Format dates as YYYY-MM-DD for Supabase query
      const startDate = `${year}-${String(monthNum + 1).padStart(2, '0')}-01`;
      const endDate = `${year}-${String(monthNum + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`;
      
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .gte('event_date', startDate)
        .lte('event_date', endDate)
        .order('event_date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        setMonthEvents(new Map());
        return;
      }

      const eventsMap = new Map<string, MonthEvent[]>();
      
      (data || []).forEach((event: CalendarEvent) => {
        const convertedEvent = convertEvent(event);
        // Use the event_date directly from the database (should be in YYYY-MM-DD format)
        const dateKey = event.event_date;
        
        if (!eventsMap.has(dateKey)) {
          eventsMap.set(dateKey, []);
        }
        eventsMap.get(dateKey)!.push(convertedEvent);
      });

      // Sort events within each date by time
      eventsMap.forEach((events, dateKey) => {
        events.sort((a, b) => {
          const timeA = getEarliestTime(a.timeSlots || []);
          const timeB = getEarliestTime(b.timeSlots || []);
          return timeA - timeB;
        });
      });

      setMonthEvents(eventsMap);
    } catch (err) {
      console.error('Error fetching Supabase events:', err);
      setMonthEvents(new Map());
    } finally {
      setLoadingEvents(false);
    }
  }, [convertEvent]);

  useEffect(() => {
    fetchEventsForMonth(currentMonth);
  }, [currentMonth, fetchEventsForMonth]);


  const handleDateSelect = useCallback((date: Date) => {
    // If clicking the same date, deselect it (show all month events)
    if (selectedDate && selectedDate.toDateString() === date.toDateString()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  }, [selectedDate]);

  const getSelectedDateEvents = useCallback((): MonthEvent[] => {
    if (!selectedDate) return [];
    
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;
    
    const events = monthEvents.get(dateKey) || [];
    
    // Check for November 1st, 2025 hardcoded events
    const isNovemberFirst = selectedDate.getDate() === 1 && 
                            selectedDate.getMonth() === 10 && 
                            selectedDate.getFullYear() === 2025;
    
    if (isNovemberFirst) {
      return allEvents.map(event => ({
        id: `nov-${event.title}`,
        title: event.title,
        description: event.description,
        tag: event.tag,
        dateTime: event.dateTime,
        image: event.image,
        expandedDescription: event.expandedDescription,
        eventDate: event.eventDate,
        timeSlots: event.dateTime.match(/Pick a slot:\s*(.+)/)?.[1]?.split(',').map(s => s.trim()) || []
      })).sort((a, b) => {
        const extractEarliestTime = (dateTime: string): number => {
          const match = dateTime.match(/Pick a slot:\s*([^,]+)/);
          if (!match) return Infinity;
          return timeToMinutes(match[1].trim());
        };
        const timeA = extractEarliestTime(a.dateTime);
        const timeB = extractEarliestTime(b.dateTime);
        return timeA - timeB;
      });
    }
    
    return events;
  }, [selectedDate, monthEvents]);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  // Get all events for the month, sorted by date
  const getAllMonthEvents = useCallback(() => {
    const allEventsList: Array<{ date: string; events: MonthEvent[] }> = [];
    monthEvents.forEach((events, dateKey) => {
      allEventsList.push({ date: dateKey, events });
    });
    
    // Add November 1st, 2025 hardcoded events if in current month
    if (currentMonth.getMonth() === 10 && currentMonth.getFullYear() === 2025) {
      const novFirstKey = '2025-11-01';
      const novEvents = allEvents.map(event => ({
        id: `nov-${event.title}`,
        title: event.title,
        description: event.description,
        tag: event.tag,
        dateTime: event.dateTime,
        image: event.image,
        expandedDescription: event.expandedDescription,
        eventDate: event.eventDate,
        timeSlots: event.dateTime.match(/Pick a slot:\s*(.+)/)?.[1]?.split(',').map(s => s.trim()) || []
      })).sort((a, b) => {
        const extractEarliestTime = (dateTime: string): number => {
          const match = dateTime.match(/Pick a slot:\s*([^,]+)/);
          if (!match) return Infinity;
          return timeToMinutes(match[1].trim());
        };
        const timeA = extractEarliestTime(a.dateTime);
        const timeB = extractEarliestTime(b.dateTime);
        return timeA - timeB;
      });
      
      const existingIndex = allEventsList.findIndex(e => e.date === novFirstKey);
      if (existingIndex >= 0) {
        allEventsList[existingIndex].events = [...allEventsList[existingIndex].events, ...novEvents].sort((a, b) => {
          const timeA = getEarliestTime(a.timeSlots || []);
          const timeB = getEarliestTime(b.timeSlots || []);
          return timeA - timeB;
        });
      } else {
        allEventsList.push({ date: novFirstKey, events: novEvents });
      }
    }
    
    return allEventsList.sort((a, b) => a.date.localeCompare(b.date));
  }, [monthEvents, currentMonth]);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const suffix = day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th';
    return `${day}${suffix} ${month} ${year}`;
  };

  return (
    <div className="bg-white overflow-hidden w-full relative">
      
      <NavbarSection />

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

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] text-center px-4">
          <h1 className="[font-family:'Poppins',Helvetica] font-light text-white text-lg sm:text-xl md:text-3xl lg:text-[45px] tracking-[1px] sm:tracking-[2px] leading-[28px] sm:leading-[35px] md:leading-[50px] lg:leading-[55px] drop-shadow-2xl text-shadow-lg">
            Book an Experience with us at your convenient day
          </h1>
        </div>
      </section>

      <section className="relative w-full bg-white py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:max-w-none">
          
          <div className="w-full lg:w-[300px] flex-shrink-0 mx-auto lg:mx-0 lg:pl-0">
            <Calendar 
              onDateSelect={handleDateSelect} 
              onMonthChange={handleMonthChange}
              initialDate={new Date()}
              monthEvents={monthEvents}
              currentMonth={currentMonth}
              selectedDate={selectedDate}
            />
          </div>

          <div className="flex-1 bg-white min-w-0">
            {selectedDate ? (
              /* Show only selected date events when a date is clicked */
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="[font-family:'Poppins',Helvetica] text-xl sm:text-2xl font-light text-[#24312e]">
                    {formatDate(selectedDate)}
                  </h2>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="[font-family:'Poppins',Helvetica] text-sm text-[#ab4b28] hover:underline"
                  >
                    ← Back to {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {getSelectedDateEvents().length > 0 ? (
                    getSelectedDateEvents().map((event, index) => (
                      <EventCard
                        key={`selected-${event.id}-${index}`}
                        title={event.title}
                        description={event.description}
                        tag={event.tag}
                        dateTime={event.dateTime}
                        image={event.image}
                        expandedDescription={event.expandedDescription}
                        eventDate={event.eventDate}
                        eventId={event.id}
                      />
                    ))
                  ) : (
                    <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-base">No events scheduled for this date.</p>
                  )}
                </div>
              </div>
            ) : (
              /* Show all month events in scrollable view */
              <div>
                <h2 className="[font-family:'Poppins',Helvetica] text-xl sm:text-2xl font-light text-[#24312e] mb-4 sm:mb-6">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <div 
                  ref={eventsContainerRef}
                  className="max-h-[700px] overflow-y-auto pr-2 space-y-6"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  {loadingEvents ? (
                    <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-base">Loading events...</p>
                  ) : getAllMonthEvents().length > 0 ? (
                    getAllMonthEvents().map(({ date, events }) => {
                      // Parse date string (YYYY-MM-DD) correctly to avoid timezone issues
                      const [year, month, day] = date.split('-').map(Number);
                      const eventDate = new Date(year, month - 1, day);
                      
                      return (
                        <div 
                          key={date} 
                          data-date={date}
                          className="border-l-4 border-gray-200 pl-4 pb-4 transition-colors hover:border-[#ab4b28]"
                        >
                          <h3 className="[font-family:'Poppins',Helvetica] text-lg sm:text-xl font-medium text-[#24312e] mb-3 sticky top-0 bg-white py-2 z-10">
                            {formatDate(eventDate)}
                          </h3>
                          <div className="flex flex-col gap-4">
                            {events.map((event, index) => (
                              <EventCard
                                key={`${date}-${event.id}-${index}`}
                                title={event.title}
                                description={event.description}
                                tag={event.tag}
                                dateTime={event.dateTime}
                                image={event.image}
                                expandedDescription={event.expandedDescription}
                                eventDate={event.eventDate}
                                eventId={event.id}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="[font-family:'Poppins',Helvetica] text-[#24312e] text-base">No events scheduled for this month.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};
