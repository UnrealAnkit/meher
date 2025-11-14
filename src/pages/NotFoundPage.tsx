import React from "react";
import { Link } from "react-router-dom";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { Home } from "lucide-react";

export const NotFoundPage = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="w-full">
        <NavbarSection />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-4 sm:py-6">
        <div className="w-full max-w-4xl text-center">
          {/* 404 Number */}
          <div className="mb-2">
            <h1 className="[font-family:'Poppins',Helvetica] font-bold text-[#ab4b28] text-5xl sm:text-6xl md:text-7xl leading-none">
              404
            </h1>
          </div>

          {/* Illustration/Image */}
          <div className="mb-3 sm:mb-4 flex justify-center">
            <div 
              className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl h-[250px] sm:h-[300px] md:h-[350px] bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
              }}
            />
          </div>

          {/* Error Message */}
          <div className="mb-3 sm:mb-4">
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#24312e] text-xl sm:text-2xl md:text-3xl mb-2">
              Look like you're lost
            </h2>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#666666] text-sm sm:text-base md:text-lg">
              The page you are looking for is not available!
            </p>
          </div>

          {/* Go to Home Button */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#ab4b28] hover:bg-[#8b3a1f] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full [font-family:'Poppins',Helvetica] font-semibold text-sm sm:text-base transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              Go to Home
            </Link>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

