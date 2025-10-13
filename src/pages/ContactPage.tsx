import React from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

export const ContactPage = (): JSX.Element => {
  return (
    <div className="bg-[#f9d2a3] min-h-screen">
      <NavbarSection />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="[font-family:'Poppins',Helvetica] font-bold text-[#ab4b28] text-5xl mb-8">
            Contact Us
          </h1>
          
          <div className="bg-white rounded-[18px] shadow-[0px_4px_3.3px_#00000040] p-12">
            <div className="mb-8">
              <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-3xl mb-6">
                Coming Soon
              </h2>
              <p className="[font-family:'Poppins',Helvetica] font-medium text-[#24312e] text-xl leading-8">
                We're creating a comprehensive contact page with detailed information about our location, 
                contact details, and an enhanced contact form. In the meantime, you can reach out to us 
                through the contact form on our homepage.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-[#f9d2a3] rounded-[15px] p-8">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-xl mb-4">
                  Location
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-medium text-[#24312e] text-base">
                  Located on the riverbanks in Koregaon Park – peace within the city.
                </p>
              </div>
              
              <div className="bg-[#f9d2a3] rounded-[15px] p-8">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-xl mb-4">
                  Get In Touch
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-medium text-[#24312e] text-base">
                  Ready to begin your wellness journey? Contact us for more information.
                </p>
              </div>
            </div>
            
            <div className="bg-[#ab4b28] rounded-[15px] p-8">
              <p className="[font-family:'Poppins',Helvetica] font-medium text-white text-lg mb-4">
                For immediate assistance, please use the contact form on our homepage.
              </p>
              <a 
                href="/" 
                className="inline-block bg-white text-[#ab4b28] px-8 py-3 rounded-[15px] [font-family:'Poppins',Helvetica] font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Go to Homepage
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
};
