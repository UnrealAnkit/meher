import React from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

export const AboutPage = (): JSX.Element => {
  return (
    <div className="bg-[#f9d2a3] min-h-screen">
      <NavbarSection />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="[font-family:'Poppins',Helvetica] font-bold text-[#ab4b28] text-5xl mb-8">
            About Us
          </h1>
          
          <div className="bg-white rounded-[18px] shadow-[0px_4px_3.3px_#00000040] p-12">
            <div className="mb-8">
              <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-3xl mb-6">
                Coming Soon
              </h2>
              <p className="[font-family:'Poppins',Helvetica] font-medium text-[#24312e] text-xl leading-8">
                We're working on creating an amazing About Us page that will tell you all about MEHR's story, 
                our mission, and the incredible team behind our wellness retreat. Stay tuned for updates!
              </p>
            </div>
            
            <div className="bg-[#f9d2a3] rounded-[15px] p-8">
              <p className="[font-family:'Poppins',Helvetica] font-medium text-[#ab4b28] text-lg">
                In the meantime, explore our programs and services to discover how MEHR can support your wellness journey.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
};
