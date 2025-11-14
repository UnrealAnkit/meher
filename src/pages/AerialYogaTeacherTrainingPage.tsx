import React, { useState } from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { YogaTeacherTrainingBookingModal } from "../components/YogaTeacherTrainingBookingModal/YogaTeacherTrainingBookingModal";

export const AerialYogaTeacherTrainingPage = (): JSX.Element => {
  const image1 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(12).png";
  const image2 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(13).png";
  const image3 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(14).png";

  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <div className="w-full">
        <NavbarSection />
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-white w-full overflow-x-hidden pt-0 sm:pt-0 lg:pt-12">
        {/* Desktop Images Section - Show at top on desktop only */}
        <div className="hidden lg:flex flex-row flex-nowrap w-full justify-center items-center gap-12 px-16">
          {/* First Image - Larger */}
          <div className="w-[660px] flex-shrink-0 h-[534px] flex items-center justify-center animate-fadeInSlide">
            <div className="w-full h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]">
              <img src={image1} alt="Aerial Yoga Teacher Training Image 1" className="w-full h-full object-contain block m-0 p-0 max-w-full transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
          </div>
          {/* Second Image */}
          <div className="w-[300px] flex-shrink-0 h-[527px] flex items-center justify-center animate-fadeInSlide" style={{ animationDelay: '0.2s' }}>
            <div className="w-full h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]">
              <img src={image2} alt="Aerial Yoga Teacher Training Image 2" className="w-full h-full object-contain block m-0 p-0 max-w-full transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
          </div>
          {/* Third Image */}
          <div className="w-[300px] flex-shrink-0 h-[527px] flex items-center justify-center animate-fadeInSlide" style={{ animationDelay: '0.4s' }}>
            <div className="w-full h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]">
              <img src={image3} alt="Aerial Yoga Teacher Training Image 3" className="w-full h-full object-contain block m-0 p-0 max-w-full transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
          </div>
        </div>

        {/* Text Content Section */}
        <div className="w-full mt-0 px-4 sm:px-6 lg:px-16 py-6 sm:py-8 lg:py-16">
          <div className="text-left">
            <h1 className="[font-family:'Poppins'] font-normal text-[#A0522D] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-tight mb-4">
              Aerial Yoga Teacher Training Program
            </h1>
            
            {/* Pricing Information */}
            <div className="mt-4 mb-8">
              <p className="[font-family:'Poppins'] font-normal text-[#ab4b28] text-[18px] sm:text-[20px] lg:text-[22px]">
                From ₹ 68,000 (per person)
              </p>
            </div>

            {/* Program Overview */}
            <div className="mt-8 lg:mt-12">
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                Over the course of the program, participants will experience the power of suspension-based movement — a practice that enhances body awareness, flexibility, and mental focus while encouraging deep relaxation and playful exploration.
              </p>
            </div>

            {/* Program Certification */}
            <div className="mt-8 lg:mt-12">
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                The Yoga Teacher Training Program is a certified and accredited 200-hour course designed to transform you into a confident and knowledgeable yoga facilitator.
              </p>
            </div>

            {/* Mobile/Tablet Images Section - Show above "What makes MEHR unique" */}
            <div className="lg:hidden mt-8">
              {/* One large image on top */}
              <div className="w-full mb-4">
                <div className="w-full overflow-hidden rounded-xl shadow-lg">
                  <img src={image1} alt="Aerial Yoga Teacher Training Image 1" className="w-full h-auto object-cover" loading="lazy" />
                </div>
              </div>
              {/* Two images side by side below */}
              <div className="flex gap-4">
                <div className="flex-1 overflow-hidden rounded-xl shadow-lg">
                  <img src={image2} alt="Aerial Yoga Teacher Training Image 2" className="w-full h-auto object-cover" loading="lazy" />
                </div>
                <div className="flex-1 overflow-hidden rounded-xl shadow-lg">
                  <img src={image3} alt="Aerial Yoga Teacher Training Image 3" className="w-full h-auto object-cover" loading="lazy" />
                </div>
              </div>
            </div>

            {/* What makes MEHR unique */}
            <div className="mt-6 lg:mt-16">
              <h2 className="[font-family:'Poppins'] font-semibold text-[#1E1E1E] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-6 lg:mb-8">
                What makes MEHR unique
              </h2>
              <div className="space-y-4 [font-family:'Poppins']">
                <p className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  50+ wellness activities
                </p>
                <p className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  15+ Doctors & Experts
                </p>
                <p className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  10+ holistic experiences & learning
                </p>
                <p className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  150+ happy seekers and counting..
                </p>
              </div>
            </div>

            {/* Meet the Instructor Section */}
            <div className="mt-12 lg:mt-16">
              {/* Image and Text Side by Side */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-6 lg:gap-8">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[240px] lg:h-[240px] rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
                    {/* Placeholder for Yoko's image - can be updated with actual image URL */}
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Yoko</span>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 sm:pt-0">
                  <h3 className="[font-family:'Poppins'] font-bold text-[#A0522D] text-[24px] sm:text-[28px] lg:text-[32px] mb-4 lg:mb-5">
                    Yoko - Aerial Yoga, Yin Yoga & Restorative Yoga Expert
                  </h3>
                  <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    Practicing Yoga since 1998 and teaching since 2014, Yoko's approach blends traditional yogic philosophy with modern movement techniques, offering a practice that is both rooted in ancient wisdom and attuned to the needs of contemporary bodies and minds.
                  </p>
                </div>
              </div>
            </div>

            {/* Customised Retreat Experience */}
            <div className="mt-12 lg:mt-16">
              <h2 className="[font-family:'Poppins'] font-semibold text-[#A0522D] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-6 lg:mb-8">
                Customised Retreat Experience
              </h2>
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px] mb-4">
                Every individual's journey is unique. At MEHR, we begin by understanding your personal needs and wellness goals, and then curate a tailored program for you.
              </p>
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px] mb-4">
                Your experience includes:
              </p>
              <ul className="space-y-2 list-disc list-inside [font-family:'Poppins'] mb-6">
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Doctor consultation (where required)
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Expert wellness consultation
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Personalized plan selected from 50+ holistic therapies
                </li>
              </ul>
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px] mb-4">
                This approach ensures a journey designed specifically to help you restore, rebalance, and realign your body, mind, and spirit.
              </p>
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                To explore your personalised retreat, simply reach out — we'll do the rest.
              </p>
            </div>

            {/* Fees BreakDown */}
            <div className="mt-12 lg:mt-16">
              <h2 className="[font-family:'Poppins'] font-semibold text-[#A0522D] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-6 lg:mb-8">
                Fees BreakDown
              </h2>
              <div className="space-y-4 [font-family:'Poppins']">
                <p className="font-light text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Yoga Teacher Training Certification Program: INR 68,000 + GST
                </p>
                <p className="font-light text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Food & Accommodation at MEHR: INR 58,000
                </p>
                <p className="font-light text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Foreign Nationals: € 1200 (All Inclusive)
                </p>
              </div>
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

      {/* Yoga Teacher Training Booking Modal */}
      <YogaTeacherTrainingBookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        programType="aerial"
      />
    </div>
  );
};

