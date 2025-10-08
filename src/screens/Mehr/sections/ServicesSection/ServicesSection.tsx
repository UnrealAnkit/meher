import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const features = [
  "Located on the riverbanks in Koregaon Park – peace within the city.",
  "Connected to CH2 World Foundation – access to 50+ therapies, expert doctors, and emotional wellness programs.",
  "Integrated with Raha – soulful evenings of music, dance, meditation, and art.",
  "Not an escape from life, but an integration with yourself and your community.",
];

export const ServicesSection = (): JSX.Element => {
  return (
    <section className="w-full">
      <Card className="rounded-[18px] shadow-[0px_4px_3.3px_#00000040] bg-white">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_416px] gap-0">
            <div className="flex flex-col p-8 lg:p-12">
              <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-4xl text-center tracking-[0] leading-[52px] mb-8">
                What makes MEHR unique:
              </h2>

              <div className="[font-family:'Poppins',Helvetica] font-medium text-[#ab4b28] text-xl tracking-[0] leading-[30px] space-y-4">
                {features.map((feature, index) => (
                  <p key={index}>
                    {feature}
                    {index < features.length - 1 && <br />}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative h-[439px]">
              <img
                className="w-full h-full rounded-r-[18px] object-cover"
                alt="MEHR interior space"
                src="/rectangle-3.png"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
