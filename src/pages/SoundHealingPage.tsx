import React, { useState } from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { SoundHealingBookingModal } from "../components/SoundHealingBookingModal/SoundHealingBookingModal";

export const SoundHealingPage = (): JSX.Element => {
  const image1 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(39).png";
  const image2 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(40).png";
  const image3 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(41).png";

  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      
      <div className="w-full">
        <NavbarSection />
      </div>

      <div className="flex-grow bg-white w-full overflow-x-hidden pt-0 sm:pt-0 lg:pt-12">
        
        <div className="hidden lg:flex flex-row flex-nowrap w-full justify-center items-center gap-12 px-16">
          
          <div className="w-[660px] flex-shrink-0 h-[534px] flex items-center justify-center animate-fadeInSlide">
            <div className="w-full h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]">
              <img src={image1} alt="Sound Healing Training Image 1" className="w-full h-full object-contain block m-0 p-0 max-w-full transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
          </div>
          
          <div className="w-[300px] flex-shrink-0 h-[527px] flex items-center justify-center animate-fadeInSlide" style={{ animationDelay: '0.2s' }}>
            <div className="w-full h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]">
              <img src={image2} alt="Sound Healing Training Image 2" className="w-full h-full object-contain block m-0 p-0 max-w-full transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
          </div>
          
          <div className="w-[300px] flex-shrink-0 h-[527px] flex items-center justify-center animate-fadeInSlide" style={{ animationDelay: '0.4s' }}>
            <div className="w-full h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]">
              <img src={image3} alt="Sound Healing Training Image 3" className="w-full h-full object-contain block m-0 p-0 max-w-full transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
          </div>
        </div>

        <div className="w-full mt-0 px-4 sm:px-6 lg:px-16 py-6 sm:py-8 lg:py-16">
          <div className="text-left">
            <h1 className="[font-family:'Poppins'] font-normal text-[#A0522D] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-tight mb-4">
              Sound Healing Training Workshop (3 Levels)
            </h1>

            <div className="mt-4 mb-8">
              <p className="[font-family:'Poppins'] font-normal text-[#ab4b28] text-[18px] sm:text-[20px] lg:text-[22px]">
                From ₹ 13,000 (per person)
              </p>
            </div>

            <div className="mt-8 lg:mt-12">
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                Your Sound Healing Training is an immersive foundational experience designed to introduce you to the transformative world of vibration and frequency. This multi-level program is designed for anyone seeking to deepen their understanding of sound as medicine – whether for personal healing, spiritual exploration, or beginning a professional journey as a sound practitioner.
              </p>
            </div>

            <div className="mt-8 lg:mt-12">
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                Over the years, MEHR has witnessed countless students evolve step-by-step through this practice, discovering the power of sound to restore balance, clarity, and emotional release.
              </p>
            </div>

            <div className="mt-12 lg:mt-16">
              <h2 className="[font-family:'Poppins'] font-semibold text-[#A0522D] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-6 lg:mb-8">
                About Janie
              </h2>
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                
                <div className="flex-shrink-0 w-full lg:w-[300px]">
                  <img 
                    src="https://meher.b-cdn.net/janie.png" 
                    alt="Janie Everett" 
                    className="w-full lg:w-[300px] h-auto rounded-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px] mb-4">
                    <span className="font-semibold text-[#A0522D]">Janie Everett</span> — Sound Practitioner | Reiki Master | Frequency Medicine Expert
                  </p>
                  <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Janie Everett is an internationally recognised healer known for her neuroscience-informed, deeply immersive sound journeys. Her work is shaped by her personal healing – recovering from a brain tumour and severe burnout, which guided her into the world of frequency medicine and trauma-informed healing. A classically trained musician and intuitive channel, she integrates sound therapy, biofield tuning, meditation, Reiki, yoga, breathwork, and astrology to support personal evolution and trauma healing. Based in South Goa, she is expanding her sound shala into a wellness resort while leading global retreats and workshops. Her book The Healing Power of Sound (2024) builds on her work presented at international festivals such as Wanderlust and Lost Village.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:hidden mt-8">
              
              <div className="w-full mb-4">
                <div className="w-full overflow-hidden rounded-xl shadow-lg">
                  <img src={image1} alt="Sound Healing Training Image 1" className="w-full h-auto object-cover" loading="lazy" />
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1 overflow-hidden rounded-xl shadow-lg">
                  <img src={image2} alt="Sound Healing Training Image 2" className="w-full h-auto object-cover" loading="lazy" />
                </div>
                <div className="flex-1 overflow-hidden rounded-xl shadow-lg">
                  <img src={image3} alt="Sound Healing Training Image 3" className="w-full h-auto object-cover" loading="lazy" />
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-16">
              <h2 className="[font-family:'Poppins'] font-semibold text-[#1E1E1E] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-6 lg:mb-8">
                What makes this program unique
              </h2>
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px] mb-4">
                Your Sound Healing Training is an immersive foundational experience designed to introduce you to the transformative world of vibration and frequency.
              </p>
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px] mb-4">
                During Level 1: Sounds for Self, you will receive:
              </p>
              <ul className="space-y-2 list-disc list-inside [font-family:'Poppins'] mb-6">
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Introduction to Sound Therapy — understanding vibration, frequency, and the science behind healing
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Fundamentals of Nada Yoga — exploring sound as a path to awareness and inner stillness
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  History & Evolution of Singing Bowls — origins, traditions, and cultural significance
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Hands-on Training with Singing Bowls — how to hold, strike, play, and create healing sound fields
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Voice Work & Toning Practices — learning how your voice acts as a healing instrument
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Techniques for Self-Healing — grounding, cleansing, balancing, and emotional release
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Guided Meditations & Sound Journeys
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Practice Sessions — supervised, experiential learning to build confidence
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Reflections & Group Sharing Circles
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Level 1 Certification upon completion of the workshop
                </li>
              </ul>
            </div>

            <div className="mt-12 lg:mt-16">
              <h2 className="[font-family:'Poppins'] font-semibold text-[#A0522D] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-6 lg:mb-8">
                Customised Retreat Experience
              </h2>
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px] mb-4">
                At MEHR, every training is an immersive blend of ancient wisdom and modern science, taught through experiential learning, intimate group settings, and personalised guidance.
              </p>
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                Each workshop is curated to help you reconnect with your natural rhythm while cultivating a deeper understanding of wellness, balance, and self-transformation.
              </p>
            </div>

            <div className="mt-12 lg:mt-16">
              <h2 className="[font-family:'Poppins'] font-semibold text-[#A0522D] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-6 lg:mb-8">
                Fees BreakDown
              </h2>
              <div className="space-y-4 [font-family:'Poppins']">
                <p className="font-light text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Dates: 3rd & 4th January 2026
                </p>
                <p className="font-light text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Fees: INR 13,000
                </p>
                <p className="font-light text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Official registration will be announced shortly on our Website and Instagram page.
                </p>
              </div>
            </div>

            <div className="mt-12 lg:mt-16 text-center">
              <button
                onClick={() => setShowBookingModal(true)}
                className="bg-[#A0522D] hover:bg-[#8b3a1f] active:bg-[#8b3a1f] text-white py-4 px-8 sm:px-12 rounded-full [font-family:'Poppins'] text-base sm:text-lg font-semibold uppercase transition-colors"
              >
                BOOK THIS EXPERIENCE
              </button>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />

      <SoundHealingBookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  );
};

