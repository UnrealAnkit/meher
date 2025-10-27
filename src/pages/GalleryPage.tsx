import React from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

export const GalleryPage = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarSection />

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Hero Section */}
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="flex">
          <div className="flex-1 bg-[#FFDAB9] flex items-center justify-start pl-16">
            <div className="max-w-[570px] text-left">
              <h1 className="text-[#A0522D] text-[64px] font-normal leading-tight [font-family:'Poppins']">
                GALLERY
              </h1>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="/About us card.png"
              alt="MEHR Gallery" 
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Gallery Content Section */}
      <div className="flex flex-col gap-8 py-16">
        {/* First Row */}
        <div className="flex justify-center gap-8">
          <img src="https://meher.b-cdn.net/Frame%2013.png" alt="MEHR Gallery Image 1" />
          <img src="https://meher.b-cdn.net/Frame%2021.png" alt="MEHR Gallery Image 2" />
          <img src="https://meher.b-cdn.net/Frame%2022.png" alt="MEHR Gallery Image 3" />
        </div>
        {/* Second Row */}
        <div className="flex justify-center gap-8">
          <img src="https://meher.b-cdn.net/Frame%2017.png" alt="MEHR Gallery Image 4" />
          <img src="https://meher.b-cdn.net/Frame%2018.png" alt="MEHR Gallery Image 5" />
          <img src="https://meher.b-cdn.net/Frame%2019.png" alt="MEHR Gallery Image 6" />
          <img src="https://meher.b-cdn.net/Frame%2020.png" alt="MEHR Gallery Image 7" />
        </div>
        {/* Third Row */}
        <div className="flex justify-center gap-8">
          <img src="https://meher.b-cdn.net/Frame%2013%20(1).png" alt="MEHR Gallery Image 8" />
          <img src="https://meher.b-cdn.net/Frame%2021%20(1).png" alt="MEHR Gallery Image 9" />
          <img src="https://meher.b-cdn.net/Frame%2022%20(1).png" alt="MEHR Gallery Image 10" />
        </div>
      </div>

      <FooterSection />
    </div>
  );
};
