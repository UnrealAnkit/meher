import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const therapyCategories = [
  { label: "Medical Consultations" },
  { label: "Diagnostics" },
  { label: "Naturopathy Treatments" },
  { label: "Emotional Wellness" },
  { label: "Creative Therapies" },
];

const cardsData = [
  {
    title: "STAY OPTIONS",
    description:
      "Whether it's a one-night city escape, a weekend retreat, a week-long journey, or a month of doctor-guided care — choose the stay that best supports your path to healing and renewal.",
    image: "/rectangle.png",
    imageClasses: "rounded-t-[15px] object-cover",
  },
  {
    title: "Rejuvenation Experiences",
    description:
      "Rejuvenation Experiences — unwind with sauna & steam, mud baths, therapeutic massages, yoga, sound healing, and meditation for complete mind-body renewal.",
    image: "/rectangle-4.png",
    imageClasses: "rounded-t-[15px]",
  },
];

export const ServicesSection = (): JSX.Element => {
  return (
    <div className="w-full">
      {/* Service Cards Section */}
      <section className="w-full px-4">
        <div className="flex items-center justify-center gap-[47px] w-full">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              className="w-full max-w-[565px] h-[702px] bg-[#f9d2a3] rounded-[15px] shadow-[0px_0px_4px_#00000040] overflow-hidden"
            >
              <CardContent className="p-0 h-full flex flex-col">
                <img
                  className={`w-full h-[395px] ${card.imageClasses}`}
                  alt={card.title}
                  src={card.image}
                />

                <div className="flex-1 flex flex-col items-center px-4 pt-[18px]">
                  <h3 className="[font-family:'Poppins',Helvetica] font-bold text-[#ab4b28] text-[32px] tracking-[0] leading-8 text-center whitespace-nowrap">
                    {card.title}
                  </h3>

                  <p className="mt-[13px] w-full max-w-[522px] [font-family:'Poppins',Helvetica] font-medium text-[#606060] text-xl text-center tracking-[0] leading-[29px]">
                    {card.description}
                  </p>
                </div>

                <div className="flex justify-center pb-[40px]">
                  <Button className="w-[314px] h-11 bg-[#ab4b28] hover:bg-[#8f3e21] rounded-[60px] [font-family:'Poppins',Helvetica] font-bold text-white text-xl tracking-[0.50px] leading-[22px]">
                    EXPLORE
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Therapies & Programs Section */}
      <section className="relative w-full bg-white py-[53px] mt-20">
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
          <Button
            variant="outline"
            className="h-auto rounded-[60px] border border-solid border-[#24312e] px-[85px] py-3 bg-transparent hover:bg-transparent"
          >
            <span className="[font-family:'Raleway',Helvetica] font-extrabold text-[#181818] text-sm tracking-[0] leading-5">
              EXPLORE PROGRAMS
            </span>
          </Button>
        </div>
      </section>
    </div>
  );
};
