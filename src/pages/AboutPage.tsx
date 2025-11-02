import React, { useState } from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

type TabType = 'approach' | 'why' | 'reasons' | 'mission';

export const AboutPage = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<TabType>('approach');
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

      {/* Tabbed Content Section */}
      <div className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Navigation Tabs */}
          <div>
            <div className="flex gap-8 mb-4">
              <button 
                onClick={() => setActiveTab('approach')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform ${activeTab === 'approach' ? 'bg-[#A0522D] text-white scale-105' : 'text-[#1E1E1E] hover:bg-gray-100 hover:scale-105'}`}
              >
                <span className="[font-family:'Poppins'] font-normal text-lg">Our approach</span>
              </button>
              <button 
                onClick={() => setActiveTab('why')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform ${activeTab === 'why' ? 'bg-[#A0522D] text-white scale-105' : 'text-[#1E1E1E] hover:bg-gray-100 hover:scale-105'}`}
              >
                <span className="[font-family:'Poppins'] font-normal text-lg">Why choose us?</span>
              </button>
              <button 
                onClick={() => setActiveTab('reasons')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform ${activeTab === 'reasons' ? 'bg-[#A0522D] text-white scale-105' : 'text-[#1E1E1E] hover:bg-gray-100 hover:scale-105'}`}
              >
                <span className="[font-family:'Poppins'] font-normal text-lg">Key reasons to choose US.</span>
              </button>
              <button 
                onClick={() => setActiveTab('mission')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform ${activeTab === 'mission' ? 'bg-[#A0522D] text-white scale-105' : 'text-[#1E1E1E] hover:bg-gray-100 hover:scale-105'}`}
              >
                <span className="[font-family:'Poppins'] font-normal text-lg">Mission and Vision</span>
              </button>
            </div>
            {/* Horizontal Line */}
            <div className="w-full h-[1px] bg-black mb-16"></div>
          </div>

          {/* Content */}
          <div className="flex gap-16">
            {/* Left Column - Title */}
            <div className="w-1/3">
              <h2 key={activeTab} className="text-[#A0522D] [font-family:'Poppins'] text-[48px] font-semibold leading-tight transition-all duration-500 ease-in-out animate-fadeIn">
                {activeTab === 'approach' && <span className="animate-slideIn">OUR<br />APPROACH</span>}
                {activeTab === 'why' && <span className="animate-slideIn">WHY CHOOSE<br />US?</span>}
                {activeTab === 'reasons' && <span className="animate-slideIn">KEY REASONS<br />TO CHOOSE<br />US?</span>}
                {activeTab === 'mission' && <span className="animate-slideIn">MISSION AND<br />VISION</span>}
              </h2>
            </div>

            {/* Right Column - Content */}
            <div className="w-2/3">
              {activeTab === 'approach' && (
                <div key="approach" className="space-y-8 animate-fadeInSlide">
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px]">
                    "Knowing" today is easy - with access to information, everyone can KNOW everything. But, DOING is where magic lies. And DOING can get tiresome, lonely, monotonous or strenuous. At MEHR, our endeavour is to create experiences where learning and doing becomes fun, pleasurable and hence consistent.
                  </p>
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px]">
                    Since every individual is unique, we begin with a consulting call over the phone where our experts understand you, your needs and recommend appropriate programs or journeys for you. It can be as simple as a weekend reset or a deep healing journey or a learning journey. Everything is based on your needs, time availability and logistics because sustainable solutions are the only long term solutions.
                  </p>
                </div>
              )}

              {activeTab === 'why' && (
                <div key="why" className="space-y-8 animate-fadeInSlide">
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px]">
                    Wellness retreats and biohacking have become a raging trend today. It is fabulous to see so many people becoming more aware about the need for wellness. In the end, slowing down and reconnecting with self are the ultimate answers to healing and wellness - which sometimes becomes challenging as we have not been taught how to be with ourselves. At MEHR, our attempt is to create sustainable, holistic wellness spaces with the best of healers, doctors and masters from across the globe to curate experiences using integrative medicine and holistic healing.
                  </p>
                </div>
              )}

              {activeTab === 'reasons' && (
                <div key="reasons" className="space-y-6 animate-fadeInSlide">
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px]">
                    1. The spaces - green, sustainably built, thoughtfully designed, functional spaces
                  </p>
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px]">
                    2. The experiences - variety of holistic wellness and therapy experiences to choose from based on your needs
                  </p>
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px]">
                    3. A community to learn, grow with on your journey within
                  </p>
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px]">
                    4. Learning programs from masters of different fields
                  </p>
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px]">
                    5. Locations - Whether you need a quick reset within the city or an escape to mountains or beaches or the jungle - MEHR spaces provide a variety of experiences!
                  </p>
                </div>
              )}

              {activeTab === 'mission' && (
                <div key="mission" className="space-y-8 animate-fadeInSlide">
                  <div>
                    <h3 className="[font-family:'Poppins'] text-[#1E1E1E] text-[24px] font-semibold mb-4">Vision -</h3>
                    <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px]">
                      To become a global network of conscious healing estates that bridge modern medicine and ancient wisdom — inspiring humanity to live with balance, vitality, and purpose.
                    </p>
                    <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px] mt-4">
                      MEHR envisions a world where healing is not an escape from life, but a harmonious integration with self, society, and nature.
                    </p>
                  </div>
                  <div>
                    <h3 className="[font-family:'Poppins'] text-[#1E1E1E] text-[24px] font-semibold mb-4">Mission -</h3>
                    <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px]">
                      To create living ecosystems of healing and rejuvenation where individuals reconnect with themselves through science, nature, and community.
                    </p>
                    <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px] mt-4">
                      At MEHR, we design integrative experiences — from short city resets to deep healing retreats — that make wellness joyful, accessible, and sustainable.
                    </p>
                    <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[22px] font-light leading-[38px] mt-4">
                      Every stay is a journey of reflection, learning, and transformation guided by compassion, expertise, and common sense.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};
