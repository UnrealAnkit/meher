import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

export const LearningPage = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full">
        <NavbarSection />
      </div>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Hero Section */}
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="flex">
          <div className="flex-1 bg-[#FFDAB9] flex items-center justify-start pl-16">
            <div className="max-w-[570px] text-left">
              <h1 className="text-[#A0522D] text-[64px] font-normal leading-tight [font-family:'Poppins']">
                EXPERIENCE A<br />LEARNING<br />PROGRAMME
              </h1>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="/Group Yoga class Marbella.png"
              alt="Experience a Learning Programme" 
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-white">
        {/* Learning Programmes Section */}
        <div className="w-full px-4 py-16">
          {/* Section Title */}
          <h2 className="text-left [font-family:'Poppins'] font-semibold text-[#ab4b28] text-[40px] tracking-[0] leading-5 mb-12 ml-8">
            OUR LEARNING PROGRAMMES
          </h2>

          {/* Programme Card */}
          <div className="max-w-[2000px] ml-8 mr-32">
            <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_rgba(0,0,0,0.1)] overflow-hidden">
              {/* Image Section - Top */}
              <div className="h-[300px]">
                <img 
                  src="https://meher.b-cdn.net/Frame%2026%20(1).png"
                  alt="Yoga Teacher Training"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Section - Bottom */}
              <div className="p-8 flex flex-col justify-between min-h-[280px]">
                <div>
                  {/* Programme Title */}
                  <h3 className="[font-family:'Poppins'] font-bold text-[#ab4b28] text-[28px] tracking-[0] leading-tight mb-2">
                    YOGA TEACHER TRAINING CERTIFICATE PROGRAM
                  </h3>
                  
                  {/* Batch Information */}
                  <p className="[font-family:'Poppins'] font-light text-[#666666] text-[16px] tracking-[0] leading-6 mb-4">
                    Upcoming Batch | Monday, January 12, 2026 to Friday, Feb 6, 2026
                  </p>
                  
                  {/* Description */}
                  <p className="[font-family:'Poppins'] font-light text-[#1E1E1E] text-[20px] leading-[32px] mb-6">
                    A Globally Accredited 200-Hour Yoga Teacher Training Program Blending Traditional Yogic Wisdom With Modern Wellness Sciences, Led By Dr. Pallavi Kavhane And Experts At MEHR, Offering Transformative Learning, Self-Growth, And Certification In The Heart Of Pune's Serene Natural Setting.
                  </p>
                </div>

                {/* Bottom Section with Price and Button */}
                <div className="flex items-center justify-between">
                  {/* Price */}
                  <div className="[font-family:'Poppins'] font-bold text-[#1E1E1E] text-[18px] tracking-[0] leading-6">
                    From ₹XX,XXX
                  </div>
                  
                  {/* Navigation Button */}
                  <button className="w-12 h-12 rounded-full border-2 border-[#ab4b28] bg-transparent hover:bg-[#ab4b28] transition-colors duration-300 flex items-center justify-center group">
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
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Second Programme Card - Aerial Yoga */}
          <div className="max-w-[2000px] ml-8 mr-32 mt-12">
            <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_rgba(0,0,0,0.1)] overflow-hidden">
              {/* Image Section - Top */}
              <div className="h-[300px]">
                <img 
                  src="https://meher.b-cdn.net/Frame%2026%20(2).png"
                  alt="Aerial Yoga Teacher Training"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Section - Bottom */}
              <div className="p-8 flex flex-col justify-between min-h-[280px]">
                <div>
                  {/* Programme Title */}
                  <h3 className="[font-family:'Poppins'] font-bold text-[#ab4b28] text-[28px] tracking-[0] leading-tight mb-2">
                    AERIAL YOGA TEACHER TRAINING PROGRAM
                  </h3>
                  
                  {/* Batch Information */}
                  <p className="[font-family:'Poppins'] font-light text-[#666666] text-[16px] tracking-[0] leading-6 mb-4">
                    Upcoming Batch | Saturday, November 22 to Sunday, November 30, 2025
                  </p>
                  
                  {/* Description */}
                  <p className="[font-family:'Poppins'] font-light text-[#1E1E1E] text-[20px] leading-[32px] mb-6">
                    A Transformative Aerial Yoga Teacher Training Led By Yoko, Blending Traditional Yoga With Modern Movement For Balance And Restoration — Ideal For Teachers And Beginners Alike, Offered At MEHR With Personalised Wellness And Therapy Plans For Every Participant.
                  </p>
                </div>

                {/* Bottom Section with Price and Button */}
                <div className="flex items-center justify-between">
                  {/* Price */}
                  <div className="[font-family:'Poppins'] font-bold text-[#1E1E1E] text-[18px] tracking-[0] leading-6">
                    From ₹XX,XXX
                  </div>
                  
                  {/* Navigation Button */}
                  <button className="w-12 h-12 rounded-full border-2 border-[#ab4b28] bg-transparent hover:bg-[#ab4b28] transition-colors duration-300 flex items-center justify-center group">
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
                  </button>
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
