import React, { useRef, useEffect, useState, useCallback } from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { Calendar } from "../components/Calendar/Calendar";
import { EventCard } from "../components/EventCard";

export const CalendarPage = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 10, 1)); // November 1st, 2025

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

  // Handle date selection from calendar (memoized to prevent infinite loops)
  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // Filter events based on selected date
  // Only show events for November 1st, 2025
  const isNovemberFirst = selectedDate.getDate() === 1 && 
                          selectedDate.getMonth() === 10 && 
                          selectedDate.getFullYear() === 2025;
  
  const events = isNovemberFirst 
    ? allEvents 
    : [];

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to play with sound first
    const playVideo = async () => {
      try {
        // First try to play with sound
        video.muted = false;
        await video.play();
        console.log('Video playing with sound');
      } catch (err) {
        console.log('Unmuted autoplay failed, trying muted:', err);
        // If that fails, try muted
        video.muted = true;
        try {
          await video.play();
          console.log('Video playing muted');
        } catch (mutedErr) {
          console.error('Muted autoplay also failed:', mutedErr);
        }
      }
    };

    // Play when loaded
    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', playVideo);
    }

    // Handle scroll-based muting
    const handleScroll = () => {
      const heroSection = video.closest('section');
      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        // Hero section is visible - unmute
        video.muted = false;
      } else {
        // Hero section is not visible - mute
        video.muted = true;
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-white overflow-hidden w-full relative">
      {/* Header Section */}
      <NavbarSection />

      {/* Hero Section with Video */}
      <section className="relative w-full bg-white">
        <video
          ref={videoRef}
          className="w-full h-[600px] object-cover"
          autoPlay
          loop
          playsInline
          preload="auto"
          style={{ backgroundColor: '#ab4b28' }}
        >
          <source src="https://meher.b-cdn.net/Meher%20Spaces%20Walk%20Through%20Vid.MP4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Text Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] sm:max-w-[95vw] text-center px-4">
          <h1 className="[font-family:'Poppins',Helvetica] font-light text-white text-[45px] lg:text-[45px] md:text-[40px] sm:text-[22px] tracking-[2px] md:tracking-[1px] sm:tracking-[0.5px] leading-[55px] md:leading-[50px] sm:leading-[30px] drop-shadow-2xl text-shadow-lg lg:whitespace-nowrap md:whitespace-normal">
            Book an Experience with us at your convenient day
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative w-full bg-white py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Calendar Section */}
          <div className="w-full lg:w-[300px] flex-shrink-0">
            <Calendar onDateSelect={handleDateSelect} initialDate={new Date(2025, 10, 1)} />
          </div>
            
          {/* Content Section - Event Cards */}
          <div className="flex-1 bg-white p-6 lg:mr-8">
            <h2 className="[font-family:'Poppins',Helvetica] text-2xl font-light text-[#24312e] mb-6">
              {isNovemberFirst ? "1st November 2025" : formatDate(selectedDate)}
            </h2>
            <div className="flex flex-col gap-4">
              {events.length > 0 ? (
                events.map((event, index) => (
                  <EventCard
                    key={index}
                    title={event.title}
                    description={event.description}
                    tag={event.tag}
                    dateTime={event.dateTime}
                    image={event.image}
                    expandedDescription={event.expandedDescription}
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
