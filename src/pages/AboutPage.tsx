import React from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

export const AboutPage = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarSection />

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Hero Section */}
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="flex">
          <div className="flex-1 bg-[#FFDAB9] flex items-center justify-start pl-16">
            <div className="max-w-[570px] text-left">
              <h1 className="text-[#A0522D] text-[64px] font-normal leading-tight [font-family:'Poppins']">
                ABOUT<br />US
              </h1>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="/About us card.png"
              alt="MEHR Wellness Center" 
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Text Content Section */}
      <div className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px] text-center max-w-[1100px] mx-auto">
            Stress is a natural part of life, and while escaping it isn't the solution, taking time to pause, reflect, and reset truly helps. MEHR offers a quick reset space within the city — a peaceful breather without needing to travel far. It's ideal for both short rejuvenating retreats and long-term stays for deep healing. Patients with chronic ailments can heal under expert care through 50+ holistic therapies and a supportive community, making recovery fulfilling. MEHR also hosts 2–7 night retreats focused on body, mind, and soul wellness, along with AYUSH-backed training programs in Yoga, Aerial Yoga, Sound Healing, and Guided Meditation.
          </p>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};
