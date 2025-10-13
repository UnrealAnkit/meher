import React from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

export const BlogsPage = (): JSX.Element => {
  return (
    <div className="bg-[#f9d2a3] min-h-screen">
      <NavbarSection />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="[font-family:'Poppins',Helvetica] font-bold text-[#ab4b28] text-5xl mb-8">
            Our Blog
          </h1>
          
          <div className="bg-white rounded-[18px] shadow-[0px_4px_3.3px_#00000040] p-12">
            <div className="mb-8">
              <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-3xl mb-6">
                Coming Soon
              </h2>
              <p className="[font-family:'Poppins',Helvetica] font-medium text-[#24312e] text-xl leading-8">
                We're preparing insightful articles about wellness, healing, mindfulness, and the latest 
                developments in holistic health. Our blog will feature expert insights, guest stories, 
                and practical tips for your wellness journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#f9d2a3] rounded-[15px] p-6">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-lg mb-3">
                  Wellness Tips
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-medium text-[#24312e] text-sm">
                  Daily practices for better health and wellbeing.
                </p>
              </div>
              
              <div className="bg-[#f9d2a3] rounded-[15px] p-6">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-lg mb-3">
                  Healing Stories
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-medium text-[#24312e] text-sm">
                  Inspiring journeys of transformation and recovery.
                </p>
              </div>
              
              <div className="bg-[#f9d2a3] rounded-[15px] p-6">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-lg mb-3">
                  Expert Insights
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-medium text-[#24312e] text-sm">
                  Professional advice from our wellness experts.
                </p>
              </div>
            </div>
            
            <div className="bg-[#ab4b28] rounded-[15px] p-8">
              <p className="[font-family:'Poppins',Helvetica] font-medium text-white text-lg">
                Subscribe to our newsletter to be the first to know when our blog launches!
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
};
