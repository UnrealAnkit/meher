import React, { useState } from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { RejuvenationBookingModal } from "../components/RejuvenationBookingModal/RejuvenationBookingModal";

export const RejuvenationPackagePage = (): JSX.Element => {
  const image1 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(4).png";
  const image2 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(5).png";
  const image3 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(6).png";

  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <div className="w-full">
        <NavbarSection />
      </div>

      {/* Main Content - Images Section */}
      <div className="flex-grow bg-white w-full overflow-x-hidden pt-4 sm:pt-6 lg:pt-12">
        {/* Images Grid - Responsive: 1 column on mobile, 3 columns on desktop */}
        <div className="flex flex-col md:flex-row flex-nowrap w-full justify-center items-center gap-4 sm:gap-6 lg:gap-12 px-4 sm:px-6 lg:px-16">
          {/* First Image - Larger */}
          <div className="w-full md:w-[660px] flex-shrink-0 max-w-full h-auto md:h-[534px] flex items-center justify-center animate-fadeInSlide">
            <div className="w-full h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]">
              <img src={image1} alt="Rejuvenation Package Image 1" className="w-full h-auto md:h-full object-contain block m-0 p-0 max-w-full transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
          </div>
          {/* Second Image */}
          <div className="w-full md:w-[300px] flex-shrink-0 max-w-full h-auto md:h-[527px] flex items-center justify-center animate-fadeInSlide" style={{ animationDelay: '0.2s' }}>
            <div className="w-full h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]">
              <img src={image2} alt="Rejuvenation Package Image 2" className="w-full h-auto md:h-full object-contain block m-0 p-0 max-w-full transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
          </div>
          {/* Third Image */}
          <div className="w-full md:w-[300px] flex-shrink-0 max-w-full h-auto md:h-[527px] flex items-center justify-center animate-fadeInSlide" style={{ animationDelay: '0.4s' }}>
            <div className="w-full h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]">
              <img src={image3} alt="Rejuvenation Package Image 3" className="w-full h-auto md:h-full object-contain block m-0 p-0 max-w-full transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
          </div>
        </div>

        {/* Text Content Section */}
        <div className="w-full mt-12 px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
            <div className="text-left">
              <h2 className="[font-family:'Poppins'] font-normal text-[#A0522D] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[32px] sm:leading-[38px] lg:leading-[44px] mb-4">
                Rejuvenation Package: A 3-Day Journey To Reset Your Body,<br />
                Reconnect With Your Mind, And Renew Your Spirit.
              </h2>
              
              {/* Pricing Table */}
              <div className="mt-8 lg:mt-12">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse [font-family:'Poppins']">
                    <thead>
                      <tr className="bg-[#FFDAB9]">
                        <th className="text-left px-4 py-3 sm:px-6 sm:py-4 text-[#A0522D] font-semibold text-[14px] sm:text-[16px] lg:text-[18px] border-b-2 border-[#A0522D]">
                          Item
                        </th>
                        <th className="text-center px-4 py-3 sm:px-6 sm:py-4 text-[#A0522D] font-semibold text-[14px] sm:text-[16px] lg:text-[18px] border-b-2 border-[#A0522D]">
                          Double Occupancy
                        </th>
                        <th className="text-center px-4 py-3 sm:px-6 sm:py-4 text-[#A0522D] font-semibold text-[14px] sm:text-[16px] lg:text-[18px] border-b-2 border-[#A0522D]">
                          Single Occupancy
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-[#1E1E1E] font-normal text-[14px] sm:text-[16px]">
                          Retreat Total Fee<br />
                          <span className="text-[12px] sm:text-[14px] text-gray-600">(per person - 2 nights)</span>
                        </td>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-center text-[#1E1E1E] font-medium text-[14px] sm:text-[16px]">
                          ₹16,250
                        </td>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-center text-[#1E1E1E] font-medium text-[14px] sm:text-[16px]">
                          ₹16,250
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-[#1E1E1E] font-normal text-[14px] sm:text-[16px]">
                          Stay<br />
                          <span className="text-[12px] sm:text-[14px] text-gray-600">
                            (₹2,500 per night - double occupancy)<br />
                            (₹3,500 per night - single occupancy)
                          </span>
                        </td>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-center text-[#1E1E1E] font-medium text-[14px] sm:text-[16px]">
                          ₹5,000
                        </td>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-center text-[#1E1E1E] font-medium text-[14px] sm:text-[16px]">
                          ₹7,000
                        </td>
                      </tr>
                      <tr className="bg-[#FFF8F0] border-b-2 border-[#A0522D]">
                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-[#A0522D] font-bold text-[16px] sm:text-[18px] lg:text-[20px]">
                          Total Price
                        </td>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-center text-[#A0522D] font-bold text-[16px] sm:text-[18px] lg:text-[20px]">
                          ₹21,250
                        </td>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-center text-[#A0522D] font-bold text-[16px] sm:text-[18px] lg:text-[20px]">
                          ₹23,250
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MEHR Rejuvenation Retreat Description */}
              <div className="mt-12 lg:mt-16">
                <h3 className="[font-family:'Poppins'] font-semibold text-[#1E1E1E] text-[32px] leading-tight mb-6 lg:mb-8">
                  MEHR Rejuvenation Retreat
                </h3>
                
                <div className="space-y-4 lg:space-y-5">
                  <p className="[font-family:'Poppins'] font-extralight text-[#666666] text-[24px] leading-[32px]">
                    Are you ready to pause, breathe, and begin again? Nestled in the heart of the city yet cocooned in nature's calm, the MEHR Rejuvenation Retreat is your sanctuary for renewal.
                  </p>
                  
                  <p className="[font-family:'Poppins'] font-extralight text-[#666666] text-[24px] leading-[32px]">
                    Over three transformative days, you'll experience gentle movement, mindful nourishment, creativity, and deep relaxation — all designed to restore your body, reset your mind, and reconnect you with your inner rhythm.
                  </p>
                  
                  <p className="[font-family:'Poppins'] font-extralight text-[#666666] text-[24px] leading-[32px]">
                    Through yoga, art therapy, sound healing, and nourishing meals prepared from organic whole foods, this retreat invites you to release fatigue, realign your energy, and rediscover balance and joy within.
                  </p>
                </div>
              </div>

              {/* Meet the Instructors Section */}
              <div className="mt-16 lg:mt-20">
                <h2 className="[font-family:'Poppins'] font-semibold text-[#1E1E1E] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-8 lg:mb-10">
                  Meet the Instructors
                </h2>
                
                {/* Images and Text Side by Side */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-6 lg:gap-8">
                  {/* Profile Images */}
                  <div className="flex items-center -space-x-4 sm:-space-x-6 lg:-space-x-8 flex-shrink-0">
                    <div className="relative z-30 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px] rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src="https://meher.b-cdn.net/janie.png"
                        alt="Janie"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="relative z-20 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px] rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src="https://meher.b-cdn.net/viineeta.png"
                        alt="Viineeta"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="relative z-10 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px] rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src="https://meher.b-cdn.net/DR.%20SACHIN%20MAHAJAN.png"
                        alt="Dr. Sachin Mahajan"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 sm:pt-0">
                    <h3 className="[font-family:'Poppins'] font-semibold text-[#A0522D] text-[20px] sm:text-[22px] lg:text-[24px] mb-4 lg:mb-5">
                      MEHR Wellness Team
                    </h3>
                    <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                      A collective of experienced yoga facilitators, holistic nutritionists, and creative wellness guides dedicated to curating personalized experiences for renewal and inner harmony.
                    </p>
                  </div>
                </div>
              </div>

              {/* Highlights Section */}
              <div className="mt-16 lg:mt-20">
                <h2 className="[font-family:'Poppins'] font-semibold text-[#1E1E1E] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-6 lg:mb-8">
                  Highlights
                </h2>
                <ul className="space-y-3 lg:space-y-4 list-disc list-inside [font-family:'Poppins']">
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Guided morning nature walks and mindful movement sessions
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Gut-reset organic meals designed to restore your digestive balance
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Art, journaling, and vision board workshops to awaken creativity
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Sound healing, pranayama, and yoga nidra for deep relaxation
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    One-on-one coaching on rhythm, flow, and sustainable well-being
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Balanced gourmet detox dinners and mindful hydration rituals
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Personalized wellness consultation on arrival
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    A curated take-home plan to continue your rejuvenation journey
                  </li>
                </ul>
              </div>

              {/* Your-Day-to-Day Journey Section */}
              <div className="mt-16 lg:mt-20">
                <h2 className="[font-family:'Poppins'] font-semibold text-[#1E1E1E] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-8 lg:mb-10">
                  Your-Day-to-Day Journey
                </h2>
                
                <div className="space-y-8 lg:space-y-10">
                  {/* Day 1 */}
                  <div>
                    <h3 className="[font-family:'Poppins'] font-bold text-[#A0522D] text-[20px] sm:text-[22px] lg:text-[24px] mb-4 lg:mb-5">
                      Day 1 – Arrival & Gentle Reset
                    </h3>
                    <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                      Begin your journey with a personalized wellness consultation, cold-pressed detox juice, and grounding yoga. A soothing sound bath follows, ending the day with a clean, organic dinner and guided meditation.
                    </p>
                  </div>

                  {/* Day 2 */}
                  <div>
                    <h3 className="[font-family:'Poppins'] font-bold text-[#A0522D] text-[20px] sm:text-[22px] lg:text-[24px] mb-4 lg:mb-5">
                      Day 2 – Deep Cleanse, Creativity & Flow
                    </h3>
                    <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                      Start the day with a refreshing walk and gut-reset breakfast. Afternoon brings art therapy, music and dance sessions, restorative yoga, and sound healing. Nourish your body with a refined detox meal.
                    </p>
                  </div>

                  {/* Day 3 */}
                  <div>
                    <h3 className="[font-family:'Poppins'] font-bold text-[#A0522D] text-[20px] sm:text-[22px] lg:text-[24px] mb-4 lg:mb-5">
                      Day 3 – Integration & Renewal
                    </h3>
                    <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                      A dynamic yoga flow, meditation, and coaching session on healthy rhythms close your retreat. You'll leave feeling rejuvenated, with tools to sustain your renewed energy and inspiration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Facilities Section */}
              <div className="mt-16 lg:mt-20">
                <h2 className="[font-family:'Poppins'] font-semibold text-[#1E1E1E] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-6 lg:mb-8">
                  Facilities
                </h2>
                <ul className="space-y-3 lg:space-y-4 list-disc list-inside [font-family:'Poppins']">
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Spa & Sound-healing studio
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Garden & Meditation areas
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Organic café & Gourmet dining space
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Lounge & Resting zones
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Air-conditioned rooms
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Eco-friendly interiors
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Special dietary meal requests
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Wi-Fi & mindful workspace
                  </li>
                </ul>
                
                {/* Eco-inspired spaces description */}
                <p className="mt-6 lg:mt-8 [font-family:'Poppins'] font-extralight text-[#666666] text-[24px] leading-[32px]">
                  Experience serene, eco-inspired spaces featuring terracotta walls, over 9,600 indoor plants, and expansive natural ventilation maintaining an air-quality index below 50. Each room is curated to enhance rest and reflection.
                </p>
              </div>

              {/* What's Included Section */}
              <div className="mt-16 lg:mt-20">
                <h2 className="[font-family:'Poppins'] font-semibold text-[#1E1E1E] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-6 lg:mb-8">
                  What's Included
                </h2>
                <ul className="space-y-3 lg:space-y-4 list-disc list-inside [font-family:'Poppins']">
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    3 days / 2 nights accommodation
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    All wellness meals, juices, and herbal hydration
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Yoga, meditation, and sound-healing sessions
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Art therapy & journaling workshops
                  </li>
                  <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Personalized consultation and follow-up plan
                  </li>
                </ul>
              </div>

              {/* Book This Experience Button */}
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

      {/* Rejuvenation Booking Modal */}
      <RejuvenationBookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  );
};

