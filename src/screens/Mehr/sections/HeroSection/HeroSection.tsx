import React from "react";

// jsDelivr URL for the video
const heroVideoUrl = "https://cdn.jsdelivr.net/gh/UnrealAnkit/meher@main/public/Meher%20Spaces%20Walk%20Through%20Vid.MP4";

export const HeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        src={heroVideoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(73,73,73,0.5)_8%,rgba(73,73,73,0.36)_41%,rgba(248,254,237,0)_92%),linear-gradient(0deg,rgba(0,0,0,0.21)_0%,rgba(0,0,0,0.21)_100%)] z-[1]" />

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-start justify-center h-full px-[70px]">
        <h1 className="[font-family:'Poppins',Helvetica] font-bold text-white text-[64px] tracking-[-2.00px] leading-[90px] mb-4">
          Launch of MEHR Pune
        </h1>
        <p className="[font-family:'Poppins',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[21.6px]">
          OCTOBER 2025
        </p>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-[30px] left-[30px] flex flex-col gap-2 -rotate-90 z-[2]">
        <div className="h-3.5 rounded-[50px] border border-solid border-white" />
        <div className="ml-[3px] w-2 h-2 bg-white rounded-[50px]" />
        <div className="ml-[3px] w-2 h-2 bg-white rounded-[50px]" />
      </div>
    </section>
  );
};
