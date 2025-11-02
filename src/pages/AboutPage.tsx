import { useState } from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

type TabType = 'approach' | 'why' | 'reasons' | 'mission';

export const AboutPage = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<TabType>('approach');
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <NavbarSection />

      {/* Spacer */}
      <div className="h-0 lg:h-16"></div>

      {/* Hero Section */}
      <div className="w-full lg:max-w-[1440px] lg:mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 bg-[#FFDAB9] flex items-center justify-center lg:justify-start px-4 sm:px-6 lg:pl-16 pt-0 pb-8 lg:py-0">
            <div className="w-full lg:max-w-[570px] text-left pt-6 sm:pt-8 lg:pt-0">
              <h1 className="text-[#A0522D] text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-normal leading-tight [font-family:'Poppins']">
                ABOUT<br />US
              </h1>
            </div>
          </div>
          <div className="flex-1 w-full">
            <img 
              src="/About us card.png"
              alt="MEHR Wellness Center" 
              className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Text Content Section */}
      <div className="bg-white py-8 sm:py-12 lg:py-16 w-full">
        <div className="w-full lg:max-w-[1200px] lg:mx-auto px-4 sm:px-6 lg:px-4">
          <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[22px] font-light leading-[26px] sm:leading-[32px] lg:leading-[38px] text-center w-full lg:max-w-[1100px] lg:mx-auto">
            Stress is a natural part of life, and while escaping it isn't the solution, taking time to pause, reflect, and reset truly helps. MEHR offers a quick reset space within the city — a peaceful breather without needing to travel far. It's ideal for both short rejuvenating retreats and long-term stays for deep healing. Patients with chronic ailments can heal under expert care through 50+ holistic therapies and a supportive community, making recovery fulfilling. MEHR also hosts 2–7 night retreats focused on body, mind, and soul wellness, along with AYUSH-backed training programs in Yoga, Aerial Yoga, Sound Healing, and Guided Meditation.
          </p>
        </div>
      </div>

      {/* Tabbed Content Section */}
      <div className="bg-white py-8 sm:py-12 lg:py-16 w-full overflow-x-hidden">
        <div className="w-full lg:max-w-[1200px] lg:mx-auto px-4 sm:px-6 lg:px-4 overflow-x-hidden">
          {/* Navigation Tabs */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:flex lg:flex-row gap-2 sm:gap-3 lg:gap-8 mb-4 lg:overflow-visible">
              <button 
                onClick={() => setActiveTab('approach')}
                className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 ease-in-out transform text-center w-full ${activeTab === 'approach' ? 'bg-[#A0522D] text-white scale-105' : 'text-[#1E1E1E] bg-gray-50 hover:bg-gray-100'}`}
              >
                <span className="[font-family:'Poppins'] font-normal text-xs sm:text-sm lg:text-lg">Our approach</span>
              </button>
              <button 
                onClick={() => setActiveTab('why')}
                className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 ease-in-out transform text-center w-full ${activeTab === 'why' ? 'bg-[#A0522D] text-white scale-105' : 'text-[#1E1E1E] bg-gray-50 hover:bg-gray-100'}`}
              >
                <span className="[font-family:'Poppins'] font-normal text-xs sm:text-sm lg:text-lg">Why choose us?</span>
              </button>
              <button 
                onClick={() => setActiveTab('reasons')}
                className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 ease-in-out transform text-center w-full ${activeTab === 'reasons' ? 'bg-[#A0522D] text-white scale-105' : 'text-[#1E1E1E] bg-gray-50 hover:bg-gray-100'}`}
              >
                <span className="[font-family:'Poppins'] font-normal text-xs sm:text-sm lg:text-lg">Key reasons</span>
              </button>
              <button 
                onClick={() => setActiveTab('mission')}
                className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 ease-in-out transform text-center w-full ${activeTab === 'mission' ? 'bg-[#A0522D] text-white scale-105' : 'text-[#1E1E1E] bg-gray-50 hover:bg-gray-100'}`}
              >
                <span className="[font-family:'Poppins'] font-normal text-xs sm:text-sm lg:text-lg">Mission & Vision</span>
              </button>
            </div>
            {/* Horizontal Line */}
            <div className="w-full h-[1px] bg-black mb-8 sm:mb-12 lg:mb-16"></div>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left Column - Title */}
            <div className="w-full lg:w-1/3">
              <h2 key={activeTab} className="text-[#A0522D] [font-family:'Poppins'] text-[32px] sm:text-[40px] lg:text-[48px] font-semibold leading-tight transition-all duration-500 ease-in-out animate-fadeIn">
                {activeTab === 'approach' && <span className="animate-slideIn">OUR<br />APPROACH</span>}
                {activeTab === 'why' && <span className="animate-slideIn">WHY CHOOSE<br />US?</span>}
                {activeTab === 'reasons' && <span className="animate-slideIn">KEY REASONS<br />TO CHOOSE<br />US?</span>}
                {activeTab === 'mission' && <span className="animate-slideIn">MISSION AND<br />VISION</span>}
              </h2>
            </div>

            {/* Right Column - Content */}
            <div className="w-full lg:w-2/3">
              {activeTab === 'approach' && (
                <div key="approach" className="space-y-6 sm:space-y-8 animate-fadeInSlide">
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[22px] font-light leading-[24px] sm:leading-[30px] lg:leading-[38px]">
                    "Knowing" today is easy - with access to information, everyone can KNOW everything. But, DOING is where magic lies. And DOING can get tiresome, lonely, monotonous or strenuous. At MEHR, our endeavour is to create experiences where learning and doing becomes fun, pleasurable and hence consistent.
                  </p>
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[22px] font-light leading-[24px] sm:leading-[30px] lg:leading-[38px]">
                    Since every individual is unique, we begin with a consulting call over the phone where our experts understand you, your needs and recommend appropriate programs or journeys for you. It can be as simple as a weekend reset or a deep healing journey or a learning journey. Everything is based on your needs, time availability and logistics because sustainable solutions are the only long term solutions.
                  </p>
                </div>
              )}

              {activeTab === 'why' && (
                <div key="why" className="space-y-6 sm:space-y-8 animate-fadeInSlide">
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[22px] font-light leading-[24px] sm:leading-[30px] lg:leading-[38px]">
                    Wellness retreats and biohacking have become a raging trend today. It is fabulous to see so many people becoming more aware about the need for wellness. In the end, slowing down and reconnecting with self are the ultimate answers to healing and wellness - which sometimes becomes challenging as we have not been taught how to be with ourselves. At MEHR, our attempt is to create sustainable, holistic wellness spaces with the best of healers, doctors and masters from across the globe to curate experiences using integrative medicine and holistic healing.
                  </p>
                </div>
              )}

              {activeTab === 'reasons' && (
                <div key="reasons" className="space-y-4 sm:space-y-6 animate-fadeInSlide">
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[22px] font-light leading-[24px] sm:leading-[30px] lg:leading-[38px]">
                    1. The spaces - green, sustainably built, thoughtfully designed, functional spaces
                  </p>
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[22px] font-light leading-[24px] sm:leading-[30px] lg:leading-[38px]">
                    2. The experiences - variety of holistic wellness and therapy experiences to choose from based on your needs
                  </p>
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[22px] font-light leading-[24px] sm:leading-[30px] lg:leading-[38px]">
                    3. A community to learn, grow with on your journey within
                  </p>
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[22px] font-light leading-[24px] sm:leading-[30px] lg:leading-[38px]">
                    4. Learning programs from masters of different fields
                  </p>
                  <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[22px] font-light leading-[24px] sm:leading-[30px] lg:leading-[38px]">
                    5. Locations - Whether you need a quick reset within the city or an escape to mountains or beaches or the jungle - MEHR spaces provide a variety of experiences!
                  </p>
                </div>
              )}

              {activeTab === 'mission' && (
                <div key="mission" className="space-y-6 sm:space-y-8 animate-fadeInSlide">
                  <div>
                    <h3 className="[font-family:'Poppins'] text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[24px] font-semibold mb-3 sm:mb-4">Vision -</h3>
                    <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[22px] font-light leading-[24px] sm:leading-[30px] lg:leading-[38px]">
                      To become a global network of conscious healing estates that bridge modern medicine and ancient wisdom — inspiring humanity to live with balance, vitality, and purpose.
                    </p>
                    <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[22px] font-light leading-[24px] sm:leading-[30px] lg:leading-[38px] mt-3 sm:mt-4">
                      MEHR envisions a world where healing is not an escape from life, but a harmonious integration with self, society, and nature.
                    </p>
                  </div>
                  <div>
                    <h3 className="[font-family:'Poppins'] text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[24px] font-semibold mb-3 sm:mb-4">Mission -</h3>
                    <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[22px] font-light leading-[24px] sm:leading-[30px] lg:leading-[38px]">
                      To create living ecosystems of healing and rejuvenation where individuals reconnect with themselves through science, nature, and community.
                    </p>
                    <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[22px] font-light leading-[24px] sm:leading-[30px] lg:leading-[38px] mt-3 sm:mt-4">
                      At MEHR, we design integrative experiences — from short city resets to deep healing retreats — that make wellness joyful, accessible, and sustainable.
                    </p>
                    <p className="[font-family:'Poppins'] text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[22px] font-light leading-[24px] sm:leading-[30px] lg:leading-[38px] mt-3 sm:mt-4">
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
