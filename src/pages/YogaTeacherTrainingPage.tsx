import React, { useState } from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { RejuvenationBookingModal } from "../components/RejuvenationBookingModal/RejuvenationBookingModal";

export const YogaTeacherTrainingPage = (): JSX.Element => {
  const image1 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(7).png";
  const image2 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(8).png";
  const image3 = "https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(9).png";

  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <div className="w-full">
        <NavbarSection />
      </div>

      {/* Main Content - Images Section */}
      <div className="flex-grow bg-white w-full overflow-x-hidden pt-8 lg:pt-12">
        {/* Images Grid - All 3 images in one row, with equal spacing */}
        <div className="flex w-full justify-center items-center gap-8 lg:gap-12 px-4 sm:px-6 lg:px-16">
          <div className="w-[660px] h-[534px] flex items-center justify-center">
            <img src={image1} alt="Yoga Teacher Training Image 1" className="w-full h-full object-contain block m-0 p-0" />
          </div>
          <div className="w-[300px] h-[527px] flex items-center justify-center">
            <img src={image2} alt="Yoga Teacher Training Image 2" className="w-full h-full object-contain block m-0 p-0" />
          </div>
          <div className="w-[300px] h-[527px] flex items-center justify-center">
            <img src={image3} alt="Yoga Teacher Training Image 3" className="w-full h-full object-contain block m-0 p-0" />
          </div>
        </div>

        {/* Text Content Section */}
        <div className="w-full mt-12 px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
          <div className="text-left">
            <h1 className="[font-family:'Poppins'] font-normal text-[#A0522D] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-tight mb-4">
              Yoga Teacher Training Certificate Program
            </h1>
            
            {/* Pricing Information */}
            <div className="mt-4 mb-8">
              <p className="[font-family:'Poppins'] font-normal text-[#ab4b28] text-[18px] sm:text-[20px] lg:text-[22px]">
                From ₹ — (per person)
              </p>
            </div>

            {/* Program Overview */}
            <div className="mt-8 lg:mt-12">
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                The Yoga Teacher Training Program is a certified and accredited 200-hour course designed to transform you into a confident and knowledgeable yoga facilitator.
              </p>
            </div>

            {/* Program Inclusions */}
            <div className="mt-8 lg:mt-12">
              <h2 className="[font-family:'Poppins'] font-semibold text-[#1E1E1E] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-4">
                The program includes:
              </h2>
              <ul className="space-y-0 list-disc list-inside [font-family:'Poppins']">
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Classroom sessions led by experts — Dr. Pallavi Kavhane and her team
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Self-practice and teaching assistance sessions
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Self-transformation & holistic wellness practitioner training by CH2 World Foundation
                </li>
              </ul>
            </div>

            {/* Location and Experience */}
            <div className="mt-0">
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                Participants from across the world come together in Pune, one of India's most contemporary spiritual cities, to immerse themselves in this enriching experience.
              </p>
            </div>

            {/* Learning Environment */}
            <div className="mt-0">
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                At MEHR, you'll learn with like-minded individuals, access best-in-class facilities, and undergo personal transformation — the essence of becoming a true yoga teacher.
              </p>
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

