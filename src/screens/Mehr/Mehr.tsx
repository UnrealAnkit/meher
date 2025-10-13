import React, { useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { AboutUsSection } from "./sections/AboutUsSection";
import { ContactSection } from "./sections/ContactSection";
import { FooterSection } from "./sections/FooterSection";
import { GallerySection } from "./sections/GallerySection";
import { LaunchSection } from "./sections/LaunchSection";
import { NavbarSection } from "./sections/NavbarSection";
import { ServicesSection } from "./sections/ServicesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

const statsData = [
  {
    number: "100+",
    label: "programs",
  },
  {
    number: "45+",
    label: "doctors",
  },
  {
    number: "17+",
    label: "skilled experts",
  },
  {
    number: "67+",
    label: "happy clients",
  },
];

const launchCategories = ["CORPORATE", "GROUPS", "FESTIVALS", "INTERNATIONAL"];

export const Mehr = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <div className="bg-[#f9d2a3] overflow-hidden w-full relative">
      <NavbarSection />

      <section className="relative w-full bg-[#ab4b28]">
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

        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 flex gap-[52px]">
          <Button className="w-[314px] h-11 rounded-[60px] bg-[#ab4b28] hover:bg-[#8d3d20] h-auto">
            <span className="[font-family:'Poppins',Helvetica] font-bold text-white text-xl tracking-[0.50px] leading-[22px]">
              BOOK YOUR STAY
            </span>
          </Button>

          <Button className="w-[321px] h-11 rounded-[60px] bg-[#ab4b28] hover:bg-[#8d3d20] h-auto">
            <span className="[font-family:'Poppins',Helvetica] font-bold text-white text-xl tracking-[0.50px] leading-[22px]">
              EXPLORE THERAPIES
            </span>
          </Button>
        </div>
      </section>

      <section className="relative w-full flex justify-center mt-[94px] mb-[72px]">
        <div className="w-[1340px] shadow-[0px_4px_4px_#00000040] bg-white py-[58px] px-[220px]">
          <p className="[font-family:'Poppins',Helvetica] font-semibold text-[#24312e] text-xl text-center tracking-[0] leading-10">
            At MEHR, every guest is invited to begin an inward journey. Whether
            you are a patient needing long-term care, a wellness seeker looking
            for detox, or simply someone wishing to pause for a night, MEHR
            offers a space of peace, dignity, and belonging.
          </p>
        </div>
      </section>

      <section className="relative w-full bg-[#ab4b28] py-[37px]">
        <div className="flex justify-center items-center gap-[341.2px] max-w-[1440px] mx-auto">
          {statsData.map((stat, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div className="[font-family:'Poppins',Helvetica] font-normal text-[76px] text-center leading-[91px] text-white tracking-[0] whitespace-nowrap">
                  {stat.number}
                </div>
                <div className="[font-family:'Poppins',Helvetica] font-light text-[28px] tracking-[0] leading-10 text-white text-center whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
              {index < statsData.length - 1 && (
                <div className="w-px h-[109px] bg-white" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      <AboutUsSection />

      <section className="relative w-full py-20">
        <h2 className="text-center [font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-[40px] tracking-[0] leading-5 mb-12">
          OUR SERVICES
        </h2>
        <ServicesSection />
      </section>

      <section className="relative w-full py-20 bg-[#ab4b28]">
        <div className="max-w-[887px] mx-auto mb-12">
          <p className="[font-family:'Poppins',Helvetica] font-medium text-[#7a574f] text-2xl text-center tracking-[0] leading-[27px]">
            Mehr Curates Soulful Experiences — From Intimate Family Retreats To
            Corporate Offsites And Wellness Festivals.
          </p>
        </div>

        <div className="flex justify-center items-center gap-[91px] mb-12">
          {launchCategories.map((category, index) => (
            <div
              key={index}
              className="[font-family:'Poppins',Helvetica] font-medium text-white text-4xl text-center tracking-[0] leading-[65px] whitespace-nowrap"
            >
              {category}
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-12">
          <Button
            variant="outline"
            className="w-[369px] h-11 rounded-[60px] border border-solid border-[#24312e] bg-transparent hover:bg-[#24312e]/10 h-auto"
          >
            <span className="[font-family:'Raleway',Helvetica] font-extrabold text-[#181818] text-sm text-center tracking-[0] leading-5">
              PLAN YOUR RETREAT WITH US
            </span>
          </Button>
        </div>

        <LaunchSection />
      </section>

      <section className="relative w-full py-20">
        <h2 className="text-center [font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-[40px] tracking-[0] leading-5 mb-12">
          MOMENTS OF HEALING
        </h2>
        <GallerySection />
      </section>

      <TestimonialsSection />

      <ContactSection />

      <FooterSection />
    </div>
  );
};
