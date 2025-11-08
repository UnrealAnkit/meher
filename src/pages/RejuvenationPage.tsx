import React from "react";
import { Link } from "react-router-dom";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

export const RejuvenationPage = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full">
        <NavbarSection />
      </div>

      {/* Spacer */}
      <div className="h-0 lg:h-16"></div>

      {/* Hero Section */}
      <div className="w-full lg:max-w-[1440px] lg:mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 bg-[#FFDAB9] flex items-center justify-center lg:justify-start px-4 sm:px-6 lg:pl-16 pt-0 pb-8 lg:py-0">
            <div className="w-full lg:max-w-[570px] text-left">
              <h1 className="text-[#A0522D] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] font-normal leading-tight [font-family:'Poppins']">
                EXPERIENCE A<br />REJUVENATION
              </h1>
            </div>
          </div>
          <div className="flex-1 w-full">
            <img 
              src="https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(16).png"
              alt="Experience a Rejuvenation" 
              className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-white w-full overflow-x-hidden">
        {/* Rejuvenation Package Section */}
        <div className="w-full px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
          {/* Section Title */}
          <h2 className="text-left [font-family:'Poppins'] font-semibold text-[#ab4b28] text-[24px] sm:text-[32px] lg:text-[40px] tracking-[0] leading-tight mb-8 lg:mb-12">
            OUR REJUVENATION PACKAGE
          </h2>

          {/* Package Card */}
          <div className="w-full max-w-[2000px] mx-auto">
            <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_rgba(0,0,0,0.1)] overflow-hidden">
              {/* Image Section - Top */}
              <div className="h-[250px] sm:h-[300px] lg:h-[300px]">
                <img 
                  src="https://meher.b-cdn.net/Frame%2026%20(3).png"
                  alt="Rejuvenation Package"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Section - Bottom */}
              <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-between min-h-[280px]">
                <div>
                  {/* Package Title */}
                  <h3 className="[font-family:'Poppins'] font-bold text-[#ab4b28] text-[20px] sm:text-[24px] lg:text-[28px] tracking-[0] leading-tight mb-2">
                    REJUVENATION PACKAGE
                  </h3>
                  
                  {/* Duration */}
                  <p className="[font-family:'Poppins'] font-light text-[#666666] text-[14px] sm:text-[16px] tracking-[0] leading-6 mb-4">
                    3 Days Programme
                  </p>
                  
                  {/* Description */}
                  <p className="[font-family:'Poppins'] font-light text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[20px] leading-[24px] sm:leading-[28px] lg:leading-[32px] mb-6">
                    A Transformative 3-Day Urban Wellness Retreat Designed To Reset Your Mind, Body, And Soul Through Mindful Movement, Healing Therapies, Creative Expression, And Nourishing Organic Living — Helping You Pause, Realign, And Return To Life With Renewed Clarity And Energy.
                  </p>
                </div>

                {/* Bottom Section with Price and Button */}
                <div className="flex items-center justify-between mt-4">
                  {/* Price */}
                  <div className="[font-family:'Poppins'] font-bold text-[#1E1E1E] text-[16px] sm:text-[18px] tracking-[0] leading-6">
                    From ₹21,250
                  </div>
                  
                  {/* Navigation Button */}
                  <Link
                    to="/rejuvenation/package"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#ab4b28] bg-transparent hover:bg-[#ab4b28] transition-colors duration-300 flex items-center justify-center group flex-shrink-0"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="text-[#ab4b28] group-hover:text-white transition-colors duration-300"
                    >
                      <path 
                        d="M9 18L15 12L9 6" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
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
