import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

const therapyCategories = [
  { label: "Medical Consultations" },
  { label: "Diagnostics" },
  { label: "Naturopathy Treatments" },
  { label: "Emotional Wellness" },
  { label: "Creative Therapies" },
];

export const AboutUsSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-white py-[53px]">
      <div className="flex flex-col items-center gap-[22px] mx-auto max-w-[900px] px-4">
        <h2 className="[font-family:'Poppins',Helvetica] font-medium text-[#24312e] text-[40px] text-center tracking-[0] leading-[52px]">
          Therapies &amp; Programs
        </h2>

        <p className="[font-family:'Poppins',Helvetica] font-semibold text-[#445f6f] text-base text-center tracking-[0] leading-6 max-w-[876px]">
          50+ therapies under one roof, through CH2.
        </p>
      </div>

      <div className="relative mt-[44px] mx-auto max-w-[1300px] h-[593px]">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          alt="Therapies and programs background"
          src="/rectangle-2.png"
        />

        <div className="relative h-full grid grid-cols-5">
          {therapyCategories.map((category, index) => (
            <div
              key={index}
              className={`flex items-end justify-center pb-[280px] ${
                index < therapyCategories.length - 1
                  ? "border-r [border-right-style:solid] border-[#eaffe8]"
                  : ""
              }`}
            >
              <div className="w-[212px] [font-family:'Poppins',Helvetica] font-medium text-white text-2xl text-center tracking-[0] leading-[34px] px-4">
                {category.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-[63px]">
        <Link to="/learning">
          <Button
            variant="outline"
            className="h-auto rounded-[60px] border border-solid border-[#24312e] px-[85px] py-3 bg-transparent hover:bg-transparent"
          >
            <span className="[font-family:'Raleway',Helvetica] font-extrabold text-[#181818] text-sm tracking-[0] leading-5">
              EXPLORE PROGRAMS
            </span>
          </Button>
        </Link>
      </div>
    </section>
  );
};
