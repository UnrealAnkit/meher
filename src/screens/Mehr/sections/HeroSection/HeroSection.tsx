import React from "react";

export const HeroSection = (): JSX.Element => {
  return (
    <div className="absolute top-[6269px] left-[calc(50.00%_-_646px)] w-[1293px] h-[608px] [background:url(..//background.png)_50%_50%_/_cover]">
      <div className="h-[608px] justify-center bg-[linear-gradient(0deg,rgba(73,73,73,0.5)_8%,rgba(73,73,73,0.36)_41%,rgba(248,254,237,0)_92%),linear-gradient(0deg,rgba(0,0,0,0.21)_0%,rgba(0,0,0,0.21)_100%)] absolute top-0 left-0 w-[1299px] flex">
        <div className="mt-[531.0px] w-3.5 h-[46px] ml-[-1.0px] flex flex-col gap-2 -rotate-90">
          <div className="h-3.5 rounded-[50px] border border-solid border-white" />

          <div className="ml-[3px] w-2 h-2 bg-white rounded-[50px]" />

          <div className="ml-[3px] w-2 h-2 bg-white rounded-[50px]" />
        </div>
      </div>

      <div className="absolute top-[269px] left-[70px] w-[824px] h-[136px] flex items-center justify-center [font-family:'Poppins',Helvetica] font-bold text-white text-[64px] tracking-[-2.00px] leading-[90px]">
        Launch of MEHR Pune
      </div>

      <div className="absolute top-[337px] left-[70px] w-[189px] h-[39px] flex items-center justify-center [font-family:'Poppins',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[21.6px]">
        OCTOBER 2025
      </div>
    </div>
  );
};
