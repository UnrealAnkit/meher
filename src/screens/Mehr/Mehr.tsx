import React, { useRef, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { FooterSection } from "./sections/FooterSection";
import { GallerySection } from "./sections/GallerySection";
import { LaunchSection } from "./sections/LaunchSection";
import { NavbarSection } from "./sections/NavbarSection";
import { ServicesSection } from "./sections/ServicesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import TherapiesSection from "./sections/TherapiesSection/index";

const statsData = [
  {
    number: "100+",
    targetNumber: 100,
    label: "programs",
  },
  {
    number: "45+",
    targetNumber: 45,
    label: "doctors",
  },
  {
    number: "17+",
    targetNumber: 17,
    label: "skilled experts",
  },
  {
    number: "67+",
    targetNumber: 67,
    label: "happy clients",
  },
];

const launchCategories = ["CORPORATE", "GROUPS", "FESTIVALS", "INTERNATIONAL"];

export const Mehr = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [animatedNumbers, setAnimatedNumbers] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

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
    
    // Handle video time to exclude last 10 seconds
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 10) {
        video.currentTime = 0; // Restart from beginning
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    
    // Initial check
    handleScroll();

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Counting animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            statsData.forEach((stat, index) => {
              const duration = 2000; // 2 seconds
              const steps = 60; // 60 steps for smooth animation
              const stepDuration = duration / steps;
              const increment = stat.targetNumber / steps;
              
              let currentStep = 0;
              const timer = setInterval(() => {
                currentStep++;
                const currentValue = Math.min(
                  Math.floor(increment * currentStep),
                  stat.targetNumber
                );
                
                setAnimatedNumbers(prev => {
                  const newNumbers = [...prev];
                  newNumbers[index] = currentValue;
                  return newNumbers;
                });
                
                if (currentStep >= steps) {
                  clearInterval(timer);
                }
              }, stepDuration);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.querySelector('[data-stats-section]');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
    };
  }, [hasAnimated]);

  return (
    <div className="bg-white overflow-hidden w-full relative">
      <NavbarSection />

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

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] sm:max-w-[95vw] text-center px-4">
          <h1 className="[font-family:'Poppins',Helvetica] font-light text-white text-[45px] lg:text-[45px] md:text-[40px] sm:text-[22px] tracking-[2px] md:tracking-[1px] sm:tracking-[0.5px] leading-[55px] md:leading-[50px] sm:leading-[30px] drop-shadow-2xl text-shadow-lg lg:whitespace-nowrap md:whitespace-normal">
            Stay. Heal. Rejuvenate. Celebrate.
          </h1>
        </div>

      </section>

      <section className="relative w-full flex justify-center mt-[94px] mb-[72px] bg-white">
        <div className="w-[1340px] shadow-[0px_4px_4px_#00000040] bg-[#f9d2a3] py-[58px] px-[220px]">
          <p className="[font-family:'Poppins',Helvetica] font-semibold text-[#24312e] text-xl text-center tracking-[0] leading-10">
            MEHR (Mandala Estate for Healing & Rejuvenation) is a living ecosystem of healing estates and rejuvenation experiences! Be it short breaks from daily routine at our 'in city' retreats or our 'in nature' estates, or our deep healing journeys, we provide a one-stop solution to your needs.
          </p>
        </div>
      </section>

      {/* Buttons Section - Outside the description card */}
      <section className="relative w-full flex justify-center -mt-8 mb-[72px] bg-white">
        <div className="flex justify-center gap-6">
          <Button 
            className="[font-family:'Poppins',Helvetica] bg-white border-2 border-[#ab4b28] text-[#ab4b28] hover:bg-[#ab4b28] hover:text-white px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 shadow-lg"
          >
            BOOK YOUR STAY
          </Button>
          <Button 
            className="[font-family:'Poppins',Helvetica] bg-white border-2 border-[#ab4b28] text-[#ab4b28] hover:bg-[#ab4b28] hover:text-white px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 shadow-lg"
          >
            EXPLORE THERAPIES
          </Button>
          <Button 
            className="[font-family:'Poppins',Helvetica] bg-white border-2 border-[#ab4b28] text-[#ab4b28] hover:bg-[#ab4b28] hover:text-white px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 shadow-lg"
          >
            EXPLORE EVENTS
          </Button>
        </div>
      </section>

      {/* Not Just a Stay Section */}
      <section className="relative w-full flex justify-center bg-white">
        <div className="relative w-[1340px] h-[500px] -mt-[50px] overflow-hidden rounded-lg">
          {/* Base Image */}
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              alt="Not just a stay"
              src="/not just a stay.png"
            />
          </div>
          
          {/* First Gradient Image Overlay */}
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              alt="Gradient overlay 1"
              src="/not just a stay gradient.png"
              style={{
                opacity: 0.7,
                mixBlendMode: 'overlay'
              }}
            />
          </div>
          
          {/* Second Gradient Image Overlay */}
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              alt="Gradient overlay 2"
              src="/not just a stay gradient.png"
              style={{
                opacity: 0.5,
                mixBlendMode: 'multiply'
              }}
            />
          </div>
          
          {/* Third Gradient Image Overlay */}
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              alt="Gradient overlay 3"
              src="/not just a stay gradient.png"
              style={{
                opacity: 0.4,
                mixBlendMode: 'soft-light'
              }}
            />
          </div>
          
          {/* Fourth Gradient Image Overlay */}
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              alt="Gradient overlay 4"
              src="/not just a stay gradient.png"
              style={{
                opacity: 0.3,
                mixBlendMode: 'color-burn'
              }}
            />
          </div>
          
          {/* Fifth Gradient Image Overlay */}
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              alt="Gradient overlay 5"
              src="/not just a stay gradient.png"
              style={{
                opacity: 0.25,
                mixBlendMode: 'hard-light'
              }}
            />
          </div>
          
          {/* Sixth Gradient Image Overlay */}
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              alt="Gradient overlay 6"
              src="/not just a stay gradient.png"
              style={{
                opacity: 0.2,
                mixBlendMode: 'darken'
              }}
            />
          </div>
          
          {/* Seventh Gradient Image Overlay */}
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              alt="Gradient overlay 7"
              src="/not just a stay gradient.png"
              style={{
                opacity: 0.18,
                mixBlendMode: 'screen'
              }}
            />
          </div>
          
          {/* Eighth Gradient Image Overlay */}
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              alt="Gradient overlay 8"
              src="/not just a stay gradient.png"
              style={{
                opacity: 0.15,
                mixBlendMode: 'color-dodge'
              }}
            />
          </div>
          
          {/* Ninth Gradient Image Overlay */}
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              alt="Gradient overlay 9"
              src="/not just a stay gradient.png"
              style={{
                opacity: 0.12,
                mixBlendMode: 'exclusion'
              }}
            />
          </div>
          
          {/* Text Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 py-12">
            <div className="max-w-4xl">
              {/* ABOUT US */}
              <div className="mb-4">
                <h3 className="[font-family:'Poppins',Helvetica] font-bold text-white text-lg tracking-[2px] uppercase drop-shadow-lg">
                  ABOUT US
                </h3>
              </div>
              
              {/* Main Title */}
              <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-4xl md:text-5xl tracking-[1px] leading-tight mb-8 drop-shadow-2xl">
                Not just a stay.<br />
                <span className="block mt-2">A bridge to wholeness.</span>
              </h2>
              
              {/* Description */}
              <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-lg md:text-xl leading-relaxed drop-shadow-lg">
                At MEHR, every guest is invited to begin an inward journey. Whether
                you are a patient needing long-term care, a wellness seeker looking
                for detox, or simply someone wishing to pause for a night, MEHR
                offers a space of peace, dignity, and belonging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* White background section to eliminate pink strip */}
      <section className="relative w-full bg-white h-[100px]"></section>

      <section className="relative w-full bg-[#ab4b28] py-[37px] mt-[100px]" data-stats-section>
        <div className="flex justify-center items-center gap-[20px] sm:gap-[40px] md:gap-[60px] lg:gap-[80px] xl:gap-[120px] max-w-[1200px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24">
          {statsData.map((stat, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div className="[font-family:'Poppins',Helvetica] font-normal text-[60px] sm:text-[70px] lg:text-[76px] text-center leading-[70px] sm:leading-[80px] lg:leading-[91px] text-white tracking-[0] whitespace-nowrap">
                  {hasAnimated ? `${animatedNumbers[index]}+` : "0+"}
                </div>
                <div className="[font-family:'Poppins',Helvetica] font-light text-[20px] sm:text-[24px] lg:text-[28px] tracking-[0] leading-8 sm:leading-9 lg:leading-10 text-white text-center whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
              {index < statsData.length - 1 && (
                <div className="w-px h-[80px] sm:h-[90px] lg:h-[109px] bg-white flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* What makes MEHR unique section */}
      <section className="relative w-full py-10 bg-white">
        <div className="max-w-7xl mx-auto pl-6 pr-0">
          <div className="bg-[#f9d2a3] rounded-[18px] shadow-[0px_4px_3.3px_#00000040] pt-0 pb-0 pl-10 pr-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="pr-4">
                <h2 className="[font-family:'Poppins'] font-light text-black text-3xl mb-8 leading-tight">
                  What makes MEHR unique:
                </h2>
                
                <ul className="space-y-6">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#ab4b28] rounded-full mr-4 flex-shrink-0"></div>
                    <p className="[font-family:'Poppins'] font-medium text-[#ab4b28] text-lg leading-[27px] whitespace-nowrap">
                      Located on the riverbanks in Koregaon Park – peace within the city.
                    </p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#ab4b28] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <p className="[font-family:'Poppins'] font-medium text-[#ab4b28] text-lg leading-[27px]">
                      Connected to CH2 World Foundation – access to 50+ therapies, expert doctors, and emotional wellness<br />
                      programs.
                    </p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#ab4b28] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <p className="[font-family:'Poppins'] font-medium text-[#ab4b28] text-lg leading-[27px]">
                      Integrated with Raha – soulful evenings of music, dance, meditation, and art.
                    </p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#ab4b28] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <p className="[font-family:'Poppins'] font-medium text-[#ab4b28] text-lg leading-[27px]">
                      Not an escape from life, but an integration with yourself and your community.
                    </p>
                  </li>
                </ul>
              </div>
              
              {/* Wellness Session Image */}
              <div className="relative flex justify-end">
                <img
                  className="w-3/5 h-[400px] object-cover rounded-[12px] shadow-lg"
                  alt="Wellness Session"
                  src="/rectangle-3.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES section */}
      <section className="relative w-full py-20 bg-white">
        <h2 className="text-center [font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-[40px] tracking-[0] leading-5 mb-12">
          OUR SERVICES
        </h2>
        <ServicesSection />
      </section>

      {/* THERAPIES & PROGRAMS section */}
      <TherapiesSection />

      {/* MOMENTS OF HEALING section */}
      <section className="relative w-full py-10 bg-white">
        <GallerySection />
      </section>

      {/* PLAN YOUR RETREAT section */}
      <section className="relative w-full pt-5 pb-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          {/* Descriptive paragraph */}
          <div className="text-center mb-6">
            <p className="[font-family:'Poppins',Helvetica] font-medium text-[#7a574f] text-2xl tracking-[0] leading-[27px] max-w-[887px] mx-auto">
              MEHR Curates Soulful Experiences — From Intimate Family Retreats To Corporate Offsites And Wellness Festivals.
            </p>
          </div>

          {/* Four-column section */}
          <div className="bg-[#ab4b28] rounded-[20px] p-16 mb-12">
            <div className="flex flex-col lg:flex-row gap-0">
              {/* CORPORATE */}
              <div className="flex-1 flex flex-col px-6 py-4">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-3xl tracking-[0] leading-8 mb-4">
                  CORPORATE
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-lg tracking-[0] leading-7">
                  Leadership Workshops, Stress Management, And Creativity Retreats Designed For Teams.
                </p>
              </div>

              {/* Vertical separator */}
              <div className="w-0.5 bg-white flex-shrink-0"></div>

              {/* GROUPS */}
              <div className="flex-1 flex flex-col px-6 py-4">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-3xl tracking-[0] leading-8 mb-4">
                  GROUPS
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-lg tracking-[0] leading-7">
                  Intimate Retreats For Families, Communities, And Small Circles.
                </p>
              </div>

              {/* Vertical separator */}
              <div className="w-0.5 bg-white flex-shrink-0"></div>

              {/* FESTIVALS */}
              <div className="flex-1 flex flex-col px-6 py-4">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-3xl tracking-[0] leading-8 mb-4">
                  FESTIVALS
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-lg tracking-[0] leading-7">
                  Immersive Wellness Festivals Blending Art, Music, Meditation, Therapies, And Soulful Food.
                </p>
              </div>

              {/* Vertical separator */}
              <div className="w-0.5 bg-white flex-shrink-0"></div>

              {/* INTERNATIONAL */}
              <div className="flex-1 flex flex-col px-6 py-4">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-3xl tracking-[0] leading-8 mb-4">
                  INTERNATIONAL
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-lg tracking-[0] leading-7">
                  Curated Retreats Abroad — Starting In Thailand, Expanding Globally.
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="w-[369px] h-11 rounded-[60px] border border-solid border-[#24312e] bg-white hover:bg-gray-50 h-auto"
            >
              <span className="[font-family:'Raleway',Helvetica] font-extrabold text-[#181818] text-sm text-center tracking-[0] leading-5">
                PLAN YOUR RETREAT WITH US
              </span>
            </Button>
          </div>
        </div>
      </section>


      <TestimonialsSection />

      <FooterSection />
    </div>
  );
};
