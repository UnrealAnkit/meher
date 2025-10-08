import React from "react";
import { Separator } from "../../../../components/ui/separator";

const offerings = [
  {
    text: "Leadership Workshops, Stress Management, And Creativity Retreats Designed For Teams.",
  },
  {
    text: "Intimate Retreats For Families, Communities, And Small Circles.",
  },
  {
    text: "Immersive Wellness Festivals Blending Art, Music, Meditation, Therapies, And Soulful Food.",
  },
  {
    text: "Curated Retreats Abroad — Starting In Thailand, Expanding Globally.",
  },
];

export const TestimonialsSection = (): JSX.Element => {
  return (
    <section className="w-full bg-[#ab4b28] rounded-[25px] overflow-hidden py-[43px] px-4">
      <div className="max-w-[619px] mx-auto grid grid-cols-4 gap-0 relative">
        {offerings.map((offering, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center justify-center px-4">
              <p className="[font-family:'Poppins',Helvetica] font-medium text-[#eaffe8] text-xl text-center tracking-[0] leading-[27px]">
                {offering.text}
              </p>
            </div>
            {index < offerings.length - 1 && (
              <Separator
                orientation="vertical"
                className="absolute bg-white h-60 w-px"
                style={{
                  left: `${((index + 1) * 100) / 4}%`,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
