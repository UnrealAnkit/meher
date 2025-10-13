import React from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

export const ProgramsPage = (): JSX.Element => {
  return (
    <div className="bg-[#f9d2a3] min-h-screen">
      <NavbarSection />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="[font-family:'Poppins',Helvetica] font-bold text-[#ab4b28] text-5xl mb-8">
            Our Programs
          </h1>
          
          <div className="bg-white rounded-[18px] shadow-[0px_4px_3.3px_#00000040] p-12">
            <div className="mb-8">
              <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-3xl mb-6">
                Coming Soon
              </h2>
              <p className="[font-family:'Poppins',Helvetica] font-medium text-[#24312e] text-xl leading-8">
                We're developing comprehensive program details that will showcase our 50+ therapies, 
                medical consultations, naturopathy treatments, and emotional wellness programs. 
                Get ready to explore our full range of healing experiences!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#f9d2a3] rounded-[15px] p-6">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-xl mb-3">
                  Medical Consultations
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-medium text-[#24312e] text-base">
                  Expert medical guidance and personalized care plans.
                </p>
              </div>
              
              <div className="bg-[#f9d2a3] rounded-[15px] p-6">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-xl mb-3">
                  Wellness Retreats
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-medium text-[#24312e] text-base">
                  Corporate, group, and festival wellness experiences.
                </p>
              </div>
            </div>
            
            <div className="bg-[#ab4b28] rounded-[15px] p-8">
              <p className="[font-family:'Poppins',Helvetica] font-medium text-white text-lg">
                Contact us to learn more about our current programs and book your stay!
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
};
