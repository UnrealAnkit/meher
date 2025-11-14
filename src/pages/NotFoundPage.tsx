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
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl text-center">
          {/* 404 Number */}
          <div className="mb-6">
            <h1 className="[font-family:'Poppins',Helvetica] font-bold text-[#ab4b28] text-8xl sm:text-9xl md:text-[180px] leading-none">
              404
            </h1>
          </div>

          {/* Illustration/Image */}
          <div className="mb-8 flex justify-center">
            <div 
              className="w-full max-w-md h-[300px] sm:h-[400px] bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
              }}
            />
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#24312e] text-2xl sm:text-3xl md:text-4xl mb-4">
              Look like you're lost
            </h2>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#666666] text-base sm:text-lg md:text-xl">
              The page you are looking for is not available!
            </p>
          </div>

          {/* Go to Home Button */}
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#ab4b28] hover:bg-[#8b3a1f] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full [font-family:'Poppins',Helvetica] font-semibold text-base sm:text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </Link>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

