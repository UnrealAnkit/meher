import React, { useRef, useEffect } from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { Calendar } from "../components/Calendar/Calendar";
import { EventCard } from "../components/EventCard";

export const CalendarPage = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sample event data
  const events = [
    {
      title: "LITURGY & IGNATIAN SPIRITUALITY",
      description: "Mass & Ignatian Reflections in October",
      tag: "IN-PERSON",
      dateTime: "Daytime | October 7, 2025 - October 28, 2025, 8:00am - 8:45am",
      image: "/rectangle-1.png"
    },
    {
      title: "LITURGY & IGNATIAN SPIRITUALITY",
      description: "Mass & Ignatian Reflections in October",
      tag: "IN-PERSON",
      dateTime: "Daytime | October 7, 2025 - October 28, 2025, 8:00am - 8:45am",
      image: "/rectangle-2.png"
    },
    {
      title: "LITURGY & IGNATIAN SPIRITUALITY",
      description: "Mass & Ignatian Reflections in October",
      tag: "IN-PERSON",
      dateTime: "Daytime | October 7, 2025 - October 28, 2025, 8:00am - 8:45am",
      image: "/rectangle-3.png"
    }
  ];

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
          <source src="/meher hero section.mp4" type="video/mp4" />
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
            <Calendar />
          </div>
            
          {/* Content Section - Event Cards */}
          <div className="flex-1 bg-white p-6 lg:mr-8">
            <h2 className="[font-family:'Poppins',Helvetica] text-2xl font-light text-[#24312e] mb-6">October 2025</h2>
            <div className="flex flex-col gap-4">
              {events.map((event, index) => (
                <div className="h-56" key={index}>
                  <EventCard
                    title={event.title}
                    description={event.description}
                    tag={event.tag}
                    dateTime={event.dateTime}
                    image={event.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
};
