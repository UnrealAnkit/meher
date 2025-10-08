import React from "react";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";

const educationalPrograms = [
  "Lorem Impsum",
  "Lorem Impsum",
  "Lorem Impsum",
  "Lorem Impsum",
  "Lorem Impsum",
];

const popularExperiences = [
  "Lorem Impsum",
  "Lorem Impsum",
  "Lorem Impsum",
  "Lorem Impsum",
];

const footerLinks = [{ text: "Privacy Policy" }, { text: "Contact" }];

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="relative w-full bg-transparent">
      <div className="relative w-full bg-white">
        <div className="container mx-auto px-[22px] py-[51px]">
          <div className="grid grid-cols-1 lg:grid-cols-[387px_1fr_343px] gap-8 lg:gap-[115px]">
            <div className="flex justify-start">
              <img
                className="w-full max-w-[387px] h-auto object-cover"
                alt="Image"
                src="/image-5-1.png"
              />
            </div>

            <div className="flex flex-col gap-[60px]">
              <div className="flex flex-col gap-2.5">
                <div className="[font-family:'Raleway',Helvetica] font-bold text-[#355149] text-sm tracking-[0] leading-4 whitespace-nowrap">
                  Our Educational Programs
                </div>
                {educationalPrograms.map((program, index) => (
                  <div
                    key={`edu-${index}`}
                    className="[font-family:'Raleway',Helvetica] font-normal text-[#355149] text-sm tracking-[0] leading-4 whitespace-nowrap"
                  >
                    {program}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-[10px]">
                <div className="[font-family:'Raleway',Helvetica] font-bold text-[#355149] text-sm tracking-[0] leading-4 whitespace-nowrap">
                  Our Popular Experinces
                </div>
                {popularExperiences.map((experience, index) => (
                  <div
                    key={`exp-${index}`}
                    className="[font-family:'Raleway',Helvetica] font-normal text-[#355149] text-sm tracking-[0] leading-4 whitespace-nowrap"
                  >
                    {experience}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[42px]">
              <div className="flex flex-col gap-[22px]">
                <div className="[font-family:'Raleway',Helvetica] font-bold text-[#445f6f] text-sm tracking-[0] leading-4 whitespace-nowrap">
                  JOIN US ON OUR BELONGING PROJECT
                </div>
                <Button className="w-[233px] h-[38px] rounded-[50px] shadow-[0px_4px_4px_#00000040] bg-[#ab4b28] hover:bg-[#8f3e20] [font-family:'Arial-Bold',Helvetica] font-bold text-white text-[17.5px] tracking-[0] leading-6">
                  BOOK YOUR STAY
                </Button>
              </div>

              <div className="flex flex-col gap-[14px]">
                <div className="[font-family:'Raleway',Helvetica] font-bold text-[#ab4b28] text-sm tracking-[0] leading-4 whitespace-nowrap">
                  Contact us at
                </div>
              </div>

              <div className="flex flex-col gap-[14px]">
                <div className="[font-family:'Raleway',Helvetica] font-bold text-[#ab4b28] text-sm tracking-[0] leading-4 whitespace-nowrap">
                  Find us on
                </div>
                <img
                  className="w-full max-w-[343px] h-9"
                  alt="Container unordered"
                  src="/container---unordered-list.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-14 bg-[#ab4b28]">
        <div className="container mx-auto px-[83px] h-full flex items-center justify-between">
          <div className="[font-family:'Raleway',Helvetica] font-normal text-white text-sm tracking-[0] leading-5 whitespace-nowrap">
            © 2025 Ch2. All rights reserved.
          </div>

          <div className="flex items-center gap-[9.5px]">
            <div className="[font-family:'Raleway',Helvetica] font-normal text-white text-sm tracking-[0] leading-5 whitespace-nowrap">
              Privacy Policy
            </div>
            <Separator orientation="vertical" className="h-4 w-px bg-white" />
            <div className="[font-family:'Raleway',Helvetica] font-normal text-white text-sm tracking-[0] leading-5 whitespace-nowrap">
              Contact
            </div>
          </div>

          <div className="[font-family:'Raleway',Helvetica] font-normal text-white text-sm tracking-[0] leading-5 whitespace-nowrap">
            Powered by
          </div>
        </div>
      </div>
    </footer>
  );
};
