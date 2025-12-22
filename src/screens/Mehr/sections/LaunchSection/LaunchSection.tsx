import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const cardsData = [
  {
    title: "STAY OPTIONS",
    description:
      "Whether it's a one-night city escape, a weekend retreat, a week-long journey, or a month of doctor-guided care — choose the stay that best supports your path to healing and renewal.",
    image: "/rectangle.png",
    imageClasses: "rounded-t-[15px] object-cover",
    path: "/book-your-stay",
  },
  {
    title: "Rejuvenation Experiences",
    description:
      "Rejuvenation Experiences — unwind with sauna & steam, mud baths, therapeutic massages, yoga, sound healing, and meditation for complete mind-body renewal.",
    image: "/rectangle-4.png",
    imageClasses: "rounded-t-[15px]",
    path: "/rejuvenation",
  },
];

export const LaunchSection = (): JSX.Element => {
  return (
    <section className="flex items-center justify-center gap-[47px] w-full px-4">
      {cardsData.map((card, index) => (
        <Card
          key={index}
          className="w-full max-w-[565px] h-[702px] bg-transparent rounded-[15px] shadow-[0px_0px_10px_#00000080] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
        >
          <CardContent className="p-0 h-full flex flex-col">
            <div className="overflow-hidden">
              <img
                className={`w-full h-[395px] ${card.imageClasses} transition-transform duration-500 hover:scale-110`}
                alt={card.title}
                src={card.image}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="flex-1 flex flex-col items-center px-4 pt-[18px]">
              <h3 className="[font-family:'Poppins',Helvetica] font-bold text-[#ab4b28] text-[32px] tracking-[0] leading-8 text-center whitespace-nowrap">
                {card.title}
              </h3>

              <p className="mt-[13px] w-full max-w-[522px] [font-family:'Poppins',Helvetica] font-medium text-[#606060] text-xl text-center tracking-[0] leading-[29px]">
                {card.description}
              </p>
            </div>

            <div className="flex justify-center pb-[40px]">
              <Link to={card.path}>
                <Button className="w-[314px] h-11 bg-[#ab4b28] hover:bg-[#8f3e21] rounded-[60px] [font-family:'Poppins',Helvetica] font-bold text-white text-xl tracking-[0.50px] leading-[22px]">
                  EXPLORE
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
