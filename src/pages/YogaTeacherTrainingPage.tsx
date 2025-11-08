import React, { useState } from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { YogaTeacherTrainingBookingModal } from "../components/YogaTeacherTrainingBookingModal/YogaTeacherTrainingBookingModal";

export const YogaTeacherTrainingPage = (): JSX.Element => {
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

      {/* Main Content - Images Section */}
      <div className="flex-grow bg-white w-full overflow-x-hidden pt-4 sm:pt-6 lg:pt-12">
        {/* Images Grid - Responsive: 1 column on mobile, 3 columns on desktop */}
        <div className="flex flex-col md:flex-row flex-nowrap w-full justify-center items-center gap-4 sm:gap-6 lg:gap-12 px-4 sm:px-6 lg:px-16">
          {/* First Image - Larger */}
          <div className="w-full md:w-[660px] flex-shrink-0 max-w-full h-auto md:h-[534px] flex items-center justify-center animate-fadeInSlide">
            <div className="w-full h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]">
              <img src={image1} alt="Yoga Teacher Training Image 1" className="w-full h-auto md:h-full object-contain block m-0 p-0 max-w-full transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
          </div>
          {/* Second Image */}
          <div className="w-full md:w-[300px] flex-shrink-0 max-w-full h-auto md:h-[527px] flex items-center justify-center animate-fadeInSlide" style={{ animationDelay: '0.2s' }}>
            <div className="w-full h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]">
              <img src={image2} alt="Yoga Teacher Training Image 2" className="w-full h-auto md:h-full object-contain block m-0 p-0 max-w-full transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
          </div>
          {/* Third Image */}
          <div className="w-full md:w-[300px] flex-shrink-0 max-w-full h-auto md:h-[527px] flex items-center justify-center animate-fadeInSlide" style={{ animationDelay: '0.4s' }}>
            <div className="w-full h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]">
              <img src={image3} alt="Yoga Teacher Training Image 3" className="w-full h-auto md:h-full object-contain block m-0 p-0 max-w-full transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
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
                From ₹96,760 (Including GST) per person
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

            {/* Meet the Instructor Section */}
            <div className="mt-12 lg:mt-16">
              {/* Image and Text Side by Side */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-6 lg:gap-8">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[240px] lg:h-[240px] rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src="https://meher.b-cdn.net/janie.png"
                      alt="Dr. Pallavi Kavhane"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 sm:pt-0">
                  <h3 className="[font-family:'Poppins'] font-bold text-[#A0522D] text-[24px] sm:text-[28px] lg:text-[32px] mb-4 lg:mb-5">
                    Dr. Pallavi Kavhane, Ph.D. in Yoga
                  </h3>
                  <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                    A World Yogasana Champion and Global Ambassador of Yoga, Dr. Kavhane has represented India internationally, winning gold medals in Spain, Portugal, and Argentina. With a D.Litt., Ph.D., and Masters in Yoga & Physical Education, she has conducted over 3,000 sessions worldwide, training 5,000+ students and completing more than 5,00,000 hours of yoga teaching.
                  </p>
                </div>
              </div>
            </div>

            {/* What makes this program unique */}
            <div className="mt-12 lg:mt-16">
              <h2 className="[font-family:'Poppins'] font-semibold text-[#1E1E1E] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-6 lg:mb-8">
                What makes this program unique
              </h2>
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px] mb-4">
                This training goes beyond yogic practices – it integrates the fundamentals of Health and Wellness through:
              </p>
              <ul className="space-y-2 list-disc list-inside [font-family:'Poppins'] mb-6">
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Yoga
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Ayurveda
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Naturopathy
                </li>
                <li className="font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Psychology
                </li>
              </ul>
              <p className="[font-family:'Poppins'] font-extralight text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                Learning at MEHR also offers a unique advantage: being located in the heart of the city yet surrounded by serene nature at the riverbanks. Your stay in Pune will be memorable, with access to landmarks like the Dagdusheth Temple, city museums, and the Osho Ashram (just 650 m away).
              </p>
            </div>

            {/* Fees BreakDown */}
            <div className="mt-12 lg:mt-16">
              <h2 className="[font-family:'Poppins'] font-semibold text-[#A0522D] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight mb-6 lg:mb-8">
                Fees BreakDown
              </h2>
              <div className="space-y-4 [font-family:'Poppins']">
                <p className="font-light text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Yoga Teacher Training Certification Program: ₹82,000 + GST (₹96,760 including GST)
                </p>
                <p className="font-light text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Food & Accommodation at MEHR: ₹68,000
                </p>
                <p className="font-light text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Total (With Food & Accommodation): ₹1,50,000 + GST (₹1,77,000 including GST)
                </p>
                <p className="font-light text-[#1E1E1E] text-[18px] sm:text-[20px] lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px]">
                  Foreign Nationals: € 1400 (All Inclusive)
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
      />
    </div>
  );
};

