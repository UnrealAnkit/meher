import { Link } from "react-router-dom";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

export const LearningPage = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full">
        <NavbarSection />
      </div>

      {/* Hero Section */}
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 bg-[#FFDAB9] flex items-center justify-start px-6 sm:px-8 md:px-12 lg:pl-16 py-6 sm:py-8 md:py-10">
            <div className="max-w-[570px] text-left">
              <h1 className="text-[#A0522D] text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] font-normal leading-tight [font-family:'Poppins']">
                EXPERIENCE A<br />LEARNING<br />PROGRAMME
              </h1>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(11).png"
              alt="Experience a Learning Programme" 
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-white">
        {/* Learning Programmes Section */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Section Title */}
          <h2 className="text-left [font-family:'Poppins'] font-semibold text-[#ab4b28] text-[28px] sm:text-[32px] lg:text-[40px] tracking-[0] leading-tight mb-8 sm:mb-10 lg:mb-12">
            OUR LEARNING PROGRAMMES
          </h2>

          {/* Programme Card */}
          <div className="max-w-[2000px] mx-auto">
            <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 hover:shadow-[0px_6px_30px_rgba(0,0,0,0.15)]">
              {/* Image Section - Top */}
              <div className="h-[200px] sm:h-[250px] lg:h-[300px]">
                <img 
                  src="https://meher.b-cdn.net/Frame%2026%20(1).png"
                  alt="Yoga Teacher Training"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Section - Bottom */}
              <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-between min-h-[280px]">
                <div>
                  {/* Programme Title */}
                  <h3 className="[font-family:'Poppins'] font-bold text-[#ab4b28] text-[20px] sm:text-[24px] lg:text-[28px] tracking-[0] leading-tight mb-2">
                    YOGA TEACHER TRAINING CERTIFICATE PROGRAM
                  </h3>
                  
                  {/* Batch Information */}
                  <p className="[font-family:'Poppins'] font-light text-[#666666] text-[14px] sm:text-[15px] lg:text-[16px] tracking-[0] leading-6 mb-4">
                    Upcoming Batch | Monday, January 12, 2026 to Friday, Feb 6, 2026
                  </p>
                  
                  {/* Description */}
                  <p className="[font-family:'Poppins'] font-light text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[20px] leading-[26px] sm:leading-[28px] lg:leading-[32px] mb-6">
                    A Globally Accredited 200-Hour Yoga Teacher Training Program Blending Traditional Yogic Wisdom With Modern Wellness Sciences, Led By Dr. Pallavi Kavhane And Experts At MEHR, Offering Transformative Learning, Self-Growth, And Certification In The Heart Of Pune's Serene Natural Setting.
                  </p>
                </div>

                {/* Bottom Section with Price and Button */}
                <div className="flex items-center justify-between">
                  {/* Price */}
                  <div className="[font-family:'Poppins'] font-bold text-[#1E1E1E] text-[16px] sm:text-[17px] lg:text-[18px] tracking-[0] leading-6">
                    From ₹96,760
                  </div>
                  
                  {/* Navigation Button */}
                  <Link
                    to="/yoga-teacher-training"
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

          {/* Second Programme Card - Aerial Yoga */}
          <div className="max-w-[2000px] mx-auto mt-8 sm:mt-10 lg:mt-12">
            <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 hover:shadow-[0px_6px_30px_rgba(0,0,0,0.15)]">
              {/* Image Section - Top */}
              <div className="h-[200px] sm:h-[250px] lg:h-[300px]">
                <img 
                  src="https://meher.b-cdn.net/Frame%2026%20(2).png"
                  alt="Aerial Yoga Teacher Training"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Section - Bottom */}
              <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-between min-h-[280px]">
                <div>
                  {/* Programme Title */}
                  <h3 className="[font-family:'Poppins'] font-bold text-[#ab4b28] text-[20px] sm:text-[24px] lg:text-[28px] tracking-[0] leading-tight mb-2">
                    AERIAL YOGA TEACHER TRAINING PROGRAM
                  </h3>
                  
                  {/* Batch Information */}
                  <p className="[font-family:'Poppins'] font-light text-[#666666] text-[14px] sm:text-[15px] lg:text-[16px] tracking-[0] leading-6 mb-4">
                    Upcoming Batch | Saturday, November 22 to Sunday, November 30, 2025
                  </p>
                  
                  {/* Description */}
                  <p className="[font-family:'Poppins'] font-light text-[#1E1E1E] text-[16px] sm:text-[18px] lg:text-[20px] leading-[26px] sm:leading-[28px] lg:leading-[32px] mb-6">
                    A Transformative Aerial Yoga Teacher Training Led By Yoko, Blending Traditional Yoga With Modern Movement For Balance And Restoration — Ideal For Teachers And Beginners Alike, Offered At MEHR With Personalised Wellness And Therapy Plans For Every Participant.
                  </p>
                </div>

                {/* Bottom Section with Price and Button */}
                <div className="flex items-center justify-between">
                  {/* Price */}
                  <div className="[font-family:'Poppins'] font-bold text-[#1E1E1E] text-[16px] sm:text-[17px] lg:text-[18px] tracking-[0] leading-6">
                    Contact for Pricing
                  </div>
                  
                  {/* Navigation Button */}
                  <Link
                    to="/aerial-yoga-teacher-training"
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
