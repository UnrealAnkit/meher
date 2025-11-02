import React from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

export const RejuvenationPackagePage = (): JSX.Element => {
  const image1 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(1).png";
  const image2 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(2).png";
  const image3 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(3).png";

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <div className="w-full">
        <NavbarSection />
      </div>

      {/* Main Content - Images Section */}
      <div className="flex-grow bg-white w-full overflow-x-hidden">
        <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
          {/* Images Grid - Figma Layout: 2-Column with Left Full Height, Right Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - Full Height Image 1 */}
            <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
              <img
                src={image1}
                alt="Rejuvenation Package Image 1"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Right Column - Split into 2 Rows */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
              {/* Top Right - Image 2 */}
              <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
                <img
                  src={image2}
                  alt="Rejuvenation Package Image 2"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>

              {/* Bottom Right - Two Image 3s Side by Side */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={image3}
                    alt="Rejuvenation Package Image 3"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={image3}
                    alt="Rejuvenation Package Image 4"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content Section */}
          <div className="w-full mt-12">
            <div className="text-left px-4 sm:px-6 lg:px-0">
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
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

