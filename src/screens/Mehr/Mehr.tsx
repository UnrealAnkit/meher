import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { FooterSection } from "./sections/FooterSection";
import { GallerySection } from "./sections/GallerySection";
import { NavbarSection } from "./sections/NavbarSection";
import { ServicesSection } from "./sections/ServicesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import TherapiesSection from "./sections/TherapiesSection/index";

const statsData = [
  {
    number: "50+",
    targetNumber: 50,
    label: "wellness activities",
  },
  {
    number: "15+",
    targetNumber: 15,
    label: "Doctors & Experts",
  },
  {
    number: "10+",
    targetNumber: 10,
    label: "holistic experiences & learning",
  },
  {
    number: "150+",
    targetNumber: 150,
    label: "happy seekers and counting..",
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

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 10) {
        video.currentTime = 0; 
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            statsData.forEach((stat, index) => {
              const duration = 2000; 
              const steps = 60; 
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
          muted
          playsInline
          preload="auto"
          style={{ backgroundColor: '#ab4b28' }}
        >
          <source src="https://meher.b-cdn.net/Meher%20Spaces%20Walk%20Through%20Vid.MP4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] sm:max-w-[95vw] text-center px-4">
          <h1 className="[font-family:'Poppins',Helvetica] font-light text-white text-[45px] lg:text-[45px] md:text-[40px] sm:text-[22px] tracking-[2px] md:tracking-[1px] sm:tracking-[0.5px] leading-[55px] md:leading-[50px] sm:leading-[30px] drop-shadow-2xl text-shadow-lg lg:whitespace-nowrap md:whitespace-normal">
            Stay. Heal. Rejuvenate. Celebrate.
          </h1>
        </div>

      </section>

      <section className="relative w-full flex justify-center mt-8 sm:mt-12 md:mt-16 lg:mt-[94px] mb-8 sm:mb-12 md:mb-16 lg:mb-[72px] bg-white px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-[1340px] shadow-[0px_4px_4px_#00000040] bg-[#f9d2a3] py-6 sm:py-8 md:py-12 lg:py-[58px] px-4 sm:px-6 md:px-12 lg:px-[220px]">
          <p className="[font-family:'Poppins',Helvetica] font-semibold text-[#24312e] text-sm sm:text-base md:text-lg lg:text-xl text-center tracking-[0] leading-6 sm:leading-7 md:leading-8 lg:leading-10">
            MEHR (Mandala Estate for Healing & Rejuvenation) is a living ecosystem of healing estates and rejuvenation experiences! Be it short breaks from daily routine at our 'in city' retreats or our 'in nature' estates, or our deep healing journeys, we provide a one-stop solution to your needs.
          </p>
        </div>
      </section>

      <section className="relative w-full flex justify-center -mt-4 sm:-mt-6 md:-mt-8 mb-8 sm:mb-12 md:mb-16 lg:mb-[72px] bg-white px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-4 md:gap-6 w-full max-w-6xl">
          <Link to="/book-your-stay" className="w-full sm:w-auto">
            <Button 
              className="[font-family:'Poppins',Helvetica] bg-[#ab4b28] border-2 border-[#ab4b28] text-white hover:bg-[#8b3a1f] hover:border-[#8b3a1f] active:bg-[#7a3219] active:border-[#7a3219] px-4 sm:px-6 md:px-8 py-3 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 w-full sm:w-auto"
            >
              BOOK YOUR STAY
            </Button>
          </Link>
          <Link to="/rejuvenation" className="w-full sm:w-auto">
            <Button 
              className="[font-family:'Poppins',Helvetica] bg-[#ab4b28] border-2 border-[#ab4b28] text-white hover:bg-[#8b3a1f] hover:border-[#8b3a1f] active:bg-[#7a3219] active:border-[#7a3219] px-4 sm:px-6 md:px-8 py-3 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 w-full sm:w-auto"
            >
              EXPLORE THERAPIES
            </Button>
          </Link>
          <Link to="/calendar" className="w-full sm:w-auto">
            <Button 
              className="[font-family:'Poppins',Helvetica] bg-[#ab4b28] border-2 border-[#ab4b28] text-white hover:bg-[#8b3a1f] hover:border-[#8b3a1f] active:bg-[#7a3219] active:border-[#7a3219] px-4 sm:px-6 md:px-8 py-3 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 w-full sm:w-auto"
            >
              EXPLORE EVENTS
            </Button>
          </Link>
        </div>
      </section>

      <section className="relative w-full flex justify-center bg-white px-4 sm:px-6 md:px-8 lg:px-0 mt-8 sm:mt-10 md:mt-12 lg:mt-16">
        <div className="relative w-full max-w-[1340px] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[500px] overflow-hidden rounded-lg">
          
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              alt="Not just a stay"
              src="/not just a stay.png"
            />
          </div>

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

          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-10 md:py-12 lg:py-16">
            <div className="max-w-4xl mx-auto w-full">
              
              <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                <h3 className="[font-family:'Poppins',Helvetica] font-bold text-white text-xs sm:text-sm md:text-base lg:text-lg tracking-[1px] sm:tracking-[1.5px] md:tracking-[2px] uppercase drop-shadow-lg">
                  ABOUT US
                </h3>
              </div>

              <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.5px] sm:tracking-[0.75px] md:tracking-[1px] leading-tight sm:leading-tight md:leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-8 drop-shadow-2xl">
                Not just a stay.<br />
                <span className="block mt-1 sm:mt-1.5 md:mt-2">A bridge to wholeness.</span>
              </h2>

              <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed sm:leading-relaxed md:leading-relaxed drop-shadow-lg">
                At MEHR, every guest is invited to begin an inward journey. Whether
                you are a patient needing long-term care, a wellness seeker looking
                for detox, or simply someone wishing to pause for a night, MEHR
                offers a space of peace, dignity, and belonging.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-white h-[40px] sm:h-[50px] md:h-[60px] lg:h-[80px]"></section>

      <section className="relative w-full bg-[#ab4b28] pt-6 sm:pt-8 md:pt-10 lg:pt-[25px] pb-12 sm:pb-16 md:pb-20 lg:pb-[60px] mt-4 sm:mt-6 md:mt-8 lg:mt-[40px]" data-stats-section>
        <div className="flex flex-row justify-center items-center gap-1 sm:gap-2 md:gap-[8px] lg:gap-[15px] xl:gap-[28px] 2xl:gap-[48px] max-w-[1400px] mx-auto px-3 sm:px-4 md:px-5 lg:px-7 xl:px-11">
          {statsData.map((stat, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center flex-1 min-w-0 px-0.5 sm:px-1">
                <div className="[font-family:'Poppins',Helvetica] font-normal text-[22px] sm:text-[32px] md:text-[46px] lg:text-[56px] xl:text-[66px] 2xl:text-[76px] text-center leading-[26px] sm:leading-[38px] md:leading-[54px] lg:leading-[66px] xl:leading-[76px] 2xl:leading-[91px] text-white tracking-[-0.5px] sm:tracking-[0] whitespace-nowrap mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5">
                  {hasAnimated ? `${animatedNumbers[index]}+` : "0+"}
                </div>
                <div className="[font-family:'Poppins',Helvetica] font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] tracking-[-0.1px] sm:tracking-[0] leading-[16px] sm:leading-[17px] md:leading-[18px] lg:leading-[20px] xl:leading-[22px] 2xl:leading-[24px] text-white text-center max-w-[75px] sm:max-w-[85px] md:max-w-[95px] lg:max-w-[110px] xl:max-w-[130px] 2xl:max-w-none">
                  {stat.label}
                </div>
              </div>
              {index < statsData.length - 1 && (
                <div className="w-[0.5px] sm:w-px h-[65px] sm:h-[85px] md:h-[105px] lg:h-[115px] xl:h-[125px] 2xl:h-[140px] bg-white flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="relative w-full py-6 sm:py-8 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:pl-6 md:pr-0">
           <div className="bg-[#f9d2a3] rounded-[12px] sm:rounded-[15px] md:rounded-[18px] shadow-[0px_4px_3.3px_#00000040] pt-6 sm:pt-7 md:pt-8 px-4 sm:px-6 md:px-8 pb-0 overflow-hidden">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 md:gap-8 items-stretch">
               
               <div className="pr-0 sm:pr-2 md:pr-4 pt-2 sm:pt-3 md:pt-4 pb-6 sm:pb-7 md:pb-8">
                  <h2 className="[font-family:'Poppins'] font-light text-black text-xl sm:text-[22px] md:text-2xl mb-4 sm:mb-5 md:mb-6 leading-tight">
                    What makes MEHR unique:
                  </h2>
                
                  <ul className="space-y-3 sm:space-y-3.5 md:space-y-4">
                   <li className="flex items-start">
                     <div className="w-1.5 h-1.5 bg-[#ab4b28] rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                     <p className="[font-family:'Poppins'] font-medium text-black text-sm sm:text-[15px] md:text-base leading-[20px] sm:leading-[22px] md:leading-[24px]">
                       Located on the riverbanks in Koregaon Park, MEHR provides peace within the city.
                      </p>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-[#ab4b28] rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                     <p className="[font-family:'Poppins'] font-medium text-black text-sm sm:text-[15px] md:text-base leading-[20px] sm:leading-[22px] md:leading-[24px]">
                       Connected to CH2 World Foundation, it gives you access to 50+ therapies, expert doctors, and emotional wellness programs.
                      </p>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-[#ab4b28] rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                     <p className="[font-family:'Poppins'] font-medium text-black text-sm sm:text-[15px] md:text-base leading-[20px] sm:leading-[22px] md:leading-[24px]">
                       Integrated with Raaha, which is a community space with soulful experiences of music, dance, meditation, and art.
                      </p>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-[#ab4b28] rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                     <p className="[font-family:'Poppins'] font-medium text-black text-sm sm:text-[15px] md:text-base leading-[20px] sm:leading-[22px] md:leading-[24px]">
                        Not an escape from life, but an integration with yourself and your community.
                      </p>
                    </li>

                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-[#ab4b28] rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                     <p className="[font-family:'Poppins'] font-medium text-black text-sm sm:text-[15px] md:text-base leading-[20px] sm:leading-[22px] md:leading-[24px]">
                        20 mins from Pune International Airport, 3.5 hours (by road) from Mumbai International Airport
                      </p>
                    </li>
                  </ul>
              </div>

                <div className="relative flex justify-center lg:justify-end h-auto lg:h-full -mr-0 lg:-mr-8 -mt-0 lg:-mt-8 order-first lg:order-last">
                  <img
                   className="w-full sm:w-4/5 lg:w-4/5 h-auto lg:h-[120%] max-h-[300px] sm:max-h-[400px] lg:max-h-none object-cover rounded-tl-[12px] rounded-tr-[12px] lg:shadow-lg lg:translate-y-[-8%]"
                    alt="Wellness Session"
                    src="https://meher.b-cdn.net/Rectangle%203.png"
                    style={{ marginBottom: '0' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-10 sm:py-14 md:py-16 lg:py-20 bg-white">
        <h2 className="text-center [font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] tracking-[0] leading-[34px] sm:leading-[38px] md:leading-[42px] lg:leading-5 mb-8 sm:mb-10 md:mb-11 lg:mb-12">
          OUR SERVICES
        </h2>
        <ServicesSection />
      </section>

      <TherapiesSection />

      <section className="relative w-full pt-4 pb-10 bg-white">
        <GallerySection />
      </section>

      <section className="relative w-full pt-5 pb-4 bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          
          <div className="text-center mb-8">
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#7a574f] text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0] leading-[24px] sm:leading-[27px] max-w-[887px] mx-auto">
              MEHR Curates Soulful Experiences — From Intimate Family Retreats To Corporate Offsites And Wellness Festivals.
            </p>
          </div>

          <div className="bg-[#ab4b28] rounded-[20px] p-6 sm:p-8 md:p-12 lg:p-16 mb-12">
            <div className="flex flex-col lg:flex-row gap-0">
              
              <div className="flex-1 flex flex-col px-4 py-6 sm:px-6 sm:py-4">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-xl sm:text-2xl lg:text-3xl tracking-[0] leading-6 sm:leading-7 lg:leading-8 mb-3 sm:mb-4">
                  CORPORATE
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-base sm:text-lg tracking-[0] leading-6 sm:leading-7">
                  Leadership Workshops, Stress Management, And Creativity Retreats Designed For Teams.
                </p>
              </div>

              <div className="h-px w-full lg:h-auto lg:w-0.5 lg:self-stretch bg-white flex-shrink-0 my-4 lg:my-0"></div>

              <div className="flex-1 flex flex-col px-4 py-6 sm:px-6 sm:py-4">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-xl sm:text-2xl lg:text-3xl tracking-[0] leading-6 sm:leading-7 lg:leading-8 mb-3 sm:mb-4">
                  GROUPS
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-base sm:text-lg tracking-[0] leading-6 sm:leading-7">
                  Intimate Retreats For Families, Communities, And Small Circles.
                </p>
              </div>

              <div className="h-px w-full lg:h-auto lg:w-0.5 lg:self-stretch bg-white flex-shrink-0 my-4 lg:my-0"></div>

              <div className="flex-1 flex flex-col px-4 py-6 sm:px-6 sm:py-4">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-xl sm:text-2xl lg:text-3xl tracking-[0] leading-6 sm:leading-7 lg:leading-8 mb-3 sm:mb-4">
                  FESTIVALS
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-base sm:text-lg tracking-[0] leading-6 sm:leading-7">
                  Immersive Wellness Festivals Blending Art, Music, Meditation, Therapies, And Soulful Food.
                </p>
              </div>

              <div className="h-px w-full lg:h-auto lg:w-0.5 lg:self-stretch bg-white flex-shrink-0 my-4 lg:my-0"></div>

              <div className="flex-1 flex flex-col px-4 py-6 sm:px-6 sm:py-4">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-xl sm:text-2xl lg:text-3xl tracking-[0] leading-6 sm:leading-7 lg:leading-8 mb-3 sm:mb-4">
                  INTERNATIONAL
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-base sm:text-lg tracking-[0] leading-6 sm:leading-7">
                  Curated Retreats Abroad — Starting In Thailand, Expanding Globally.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link to="/book-your-stay">
            <Button
                className="w-[369px] h-11 rounded-[60px] bg-[#ab4b28] border-2 border-[#ab4b28] text-white hover:bg-[#8b3a1f] hover:border-[#8b3a1f] active:bg-[#7a3219] active:border-[#7a3219] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100"
            >
                <span className="[font-family:'Poppins',Helvetica] font-bold text-base text-center tracking-[0] leading-5">
                PLAN YOUR RETREAT WITH US
              </span>
            </Button>
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="relative w-full bg-white py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
            
            <div className="absolute inset-0">
              <img
                src="/Background (4).png"
                alt="MEHR Pune Launch"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="absolute inset-0">
              <img
                src="/Pseudo__after+Gradient.png"
                alt="Gradient Overlay"
                className="w-full h-full object-cover opacity-70"
                loading="lazy"
              />
            </div>

            <div className="absolute inset-0 flex flex-col justify-center items-start pl-6 sm:pl-8 md:pl-12 lg:pl-16">
              <h2 className="[font-family:'Poppins',Helvetica] font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-2 sm:mb-3 drop-shadow-lg">
                Launch of MEHR Pune
              </h2>
              <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow-md mb-3 sm:mb-4 md:mb-6">
                OCTOBER 2025
              </p>
              <Link to="/about">
                <Button className="[font-family:'Poppins',Helvetica] bg-white text-[#ab4b28] hover:bg-gray-100 active:bg-gray-200 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100">
                  EXPLORE NOW
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};
