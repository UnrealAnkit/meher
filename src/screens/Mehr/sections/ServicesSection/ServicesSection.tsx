import React from "react";
import { Link } from "react-router-dom";
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
    image: "https://meher.b-cdn.net/Rectangle%20(3).png",
    imageClasses: "rounded-t-[15px] object-cover",
    path: "/book-your-stay",
  },
  {
    title: "Rejuvenation Experiences",
    description:
      "Rejuvenation Experiences — unwind with sauna & steam, mud baths, therapeutic massages, yoga, sound healing, and meditation for complete mind-body renewal.",
    image: "https://meher.b-cdn.net/Rectangle%20(2).png",
    imageClasses: "rounded-t-[15px]",
    path: "/rejuvenation",
  },
];

export const ServicesSection = (): JSX.Element => {
  return (
    <div className="w-full">
      {/* Service Cards Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-[35px] lg:gap-[47px] w-full">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              className="w-full max-w-[565px] h-auto min-h-[500px] sm:min-h-[600px] md:h-[650px] lg:h-[702px] bg-white rounded-[12px] sm:rounded-[13px] md:rounded-[15px] shadow-[0px_0px_4px_#00000040] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <CardContent className="p-0 h-full flex flex-col">
                <div className="overflow-hidden">
                  <img
                    className={`w-full h-[200px] sm:h-[250px] md:h-[320px] lg:h-[395px] ${card.imageClasses} transition-transform duration-500 hover:scale-110`}
                    alt={card.title}
                    src={card.image}
                  />
                </div>

                <div className="flex-1 flex flex-col items-center px-3 sm:px-4 pt-4 sm:pt-[14px] md:pt-[18px]">
                  <h3 className={`[font-family:'Poppins'] font-semibold text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] tracking-[0] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-5 text-center ${
                    card.title === "STAY OPTIONS" || card.title === "Rejuvenation Experiences"
                      ? "text-[#ab4b28]"
                      : "text-black"
                  }`}>
                    {card.title}
                  </h3>

                  <p className="mt-3 sm:mt-[11px] md:mt-[13px] w-full max-w-[522px] [font-family:'Poppins'] font-medium text-[#606060] text-sm sm:text-base md:text-lg lg:text-xl text-center tracking-[0] leading-[20px] sm:leading-[24px] md:leading-[26px] lg:leading-[29px]">
                    {card.description}
                  </p>
                </div>

                <div className="flex justify-center pb-6 sm:pb-8 md:pb-[40px] pt-12 sm:pt-16 md:pt-20 lg:pt-24">
                  <Link to={card.path} className="w-full sm:w-auto">
                    <Button className="w-full sm:w-[280px] md:w-[300px] lg:w-[314px] h-10 sm:h-11 bg-[#ab4b28] hover:bg-[#8f3e21] rounded-[60px] [font-family:'Poppins'] font-bold text-white text-base sm:text-lg md:text-xl tracking-[0.50px] leading-[20px] sm:leading-[22px]">
                      EXPLORE
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
