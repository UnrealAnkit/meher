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

      {/* Our Approach Section */}
      <div className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Navigation Tabs */}
          <div className="flex gap-8 mb-16">
            <div className="px-6 py-3 bg-[#A0522D] rounded-lg">
              <span className="text-white [font-family:'Poppins'] font-normal text-lg">Our approach</span>
            </div>
            <div className="px-6 py-3">
              <span className="text-[#1E1E1E] [font-family:'Poppins'] font-normal text-lg">Why choose us?</span>
            </div>
            <div className="px-6 py-3">
              <span className="text-[#1E1E1E] [font-family:'Poppins'] font-normal text-lg">Key reasons to choose US.</span>
            </div>
            <div className="px-6 py-3">
              <span className="text-[#1E1E1E] [font-family:'Poppins'] font-normal text-lg">Mission and Vision</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex gap-16">
            {/* Left Column - Title */}
            <div className="w-1/3">
              <h2 className="text-[#A0522D] [font-family:'Poppins'] text-[48px] font-semibold leading-tight">
                OUR<br />APPROACH
              </h2>
            </div>

            {/* Right Column - Text Content */}
            <div className="w-2/3">
              <div className="space-y-8">
                <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px]">
                  "Knowing" today is easy - with access to information, everyone can KNOW everything. But, DOING is where magic lies. And DOING can get tiresome, lonely, monotonous or strenuous. At MEHR, our endeavour is to create experiences where learning and doing becomes fun, pleasurable and hence consistent.
                </p>
                <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px]">
                  Since every individual is unique, we begin with a consulting call over the phone where our experts understand you, your needs and recommend appropriate programs or journeys for you. It can be as simple as a weekend reset or a deep healing journey or a learning journey. Everything is based on your needs, time availability and logistics because sustainable solutions are the only long term solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};
