import React from "react";

export const HeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Hero Video */}
      <video
        src="https://meher.b-cdn.net/Meher%20Spaces%20Walk%20Through%20Vid.MP4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-black/60"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 [font-family:'Poppins',Helvetica]">Welcome to Meher Spaces</h1>
        <p className="text-lg md:text-2xl max-w-xl [font-family:'Poppins',Helvetica]">
          Experience healing and wellness in Marbella
        </p>
      </div>
    </section>
  );
};
