import React from "react";
import { Button } from "../../components/ui/button";
import { AboutUsSection } from "./sections/AboutUsSection";
import { ContactSection } from "./sections/ContactSection";
import { FooterSection } from "./sections/FooterSection";
import { GallerySection } from "./sections/GallerySection";
import { LaunchSection } from "./sections/LaunchSection";
import { NavbarSection } from "./sections/NavbarSection";
import { ServicesSection } from "./sections/ServicesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

const statsData = [
  {
    number: "100+",
    label: "programs",
  },
  {
    number: "45+",
    label: "doctors",
  },
  {
    number: "17+",
    label: "skilled experts",
  },
  {
    number: "67+",
    label: "happy clients",
  },
];

const launchCategories = ["CORPORATE", "GROUPS", "FESTIVALS", "INTERNATIONAL"];

export const Mehr = (): JSX.Element => {
  return (
    <div className="bg-[#f9d2a3] overflow-hidden w-full relative">
      <NavbarSection />

      <section className="relative w-full">
        <img
          className="w-full h-[468px] object-cover"
          alt="Bg video"
          src="/bg-video.png"
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[832px] text-center">
          <h1 className="[font-family:'Poppins',Helvetica] font-normal text-black text-[50px] tracking-[0] leading-[65px] whitespace-nowrap">
            Stay. Heal. Rejuvenate. Celebrate.
          </h1>
        </div>

        <div className="absolute bottom-[-22px] left-1/2 -translate-x-1/2 flex gap-[52px]">
          <Button className="w-[314px] h-11 rounded-[60px] bg-[#ab4b28] hover:bg-[#8d3d20] h-auto">
            <span className="[font-family:'Poppins',Helvetica] font-bold text-white text-xl tracking-[0.50px] leading-[22px]">
              BOOK YOUR STAY
            </span>
          </Button>

          <Button className="w-[321px] h-11 rounded-[60px] bg-[#ab4b28] hover:bg-[#8d3d20] h-auto">
            <span className="[font-family:'Poppins',Helvetica] font-bold text-white text-xl tracking-[0.50px] leading-[22px]">
              EXPLORE THERAPIES
            </span>
          </Button>
        </div>
      </section>

      <section className="relative w-full flex justify-center mt-[94px] mb-[72px]">
        <div className="w-[1340px] shadow-[0px_4px_4px_#00000040] bg-white py-[58px] px-[220px]">
          <p className="[font-family:'Poppins',Helvetica] font-semibold text-[#24312e] text-xl text-center tracking-[0] leading-10">
            At MEHR, every guest is invited to begin an inward journey. Whether
            you are a patient needing long-term care, a wellness seeker looking
            for detox, or simply someone wishing to pause for a night, MEHR
            offers a space of peace, dignity, and belonging.
          </p>
        </div>
      </section>

      <section className="relative w-full bg-[#ab4b28] py-[37px]">
        <div className="flex justify-center items-center gap-[341.2px] max-w-[1440px] mx-auto">
          {statsData.map((stat, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div className="[font-family:'Poppins',Helvetica] font-normal text-[76px] text-center leading-[91px] text-white tracking-[0] whitespace-nowrap">
                  {stat.number}
                </div>
                <div className="[font-family:'Poppins',Helvetica] font-light text-[28px] tracking-[0] leading-10 text-white text-center whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
              {index < statsData.length - 1 && (
                <div className="w-px h-[109px] bg-white" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      <AboutUsSection />

      <section className="relative w-full py-20">
        <h2 className="text-center [font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-[40px] tracking-[0] leading-5 mb-12">
          OUR SERVICES
        </h2>
        <ServicesSection />
      </section>

      <section className="relative w-full py-20 bg-[#ab4b28]">
        <div className="max-w-[887px] mx-auto mb-12">
          <p className="[font-family:'Poppins',Helvetica] font-medium text-[#7a574f] text-2xl text-center tracking-[0] leading-[27px]">
            Mehr Curates Soulful Experiences — From Intimate Family Retreats To
            Corporate Offsites And Wellness Festivals.
          </p>
        </div>

        <div className="flex justify-center items-center gap-[91px] mb-12">
          {launchCategories.map((category, index) => (
            <div
              key={index}
              className="[font-family:'Poppins',Helvetica] font-medium text-white text-4xl text-center tracking-[0] leading-[65px] whitespace-nowrap"
            >
              {category}
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-12">
          <Button
            variant="outline"
            className="w-[369px] h-11 rounded-[60px] border border-solid border-[#24312e] bg-transparent hover:bg-[#24312e]/10 h-auto"
          >
            <span className="[font-family:'Raleway',Helvetica] font-extrabold text-[#181818] text-sm text-center tracking-[0] leading-5">
              PLAN YOUR RETREAT WITH US
            </span>
          </Button>
        </div>

        <LaunchSection />
      </section>

      <section className="relative w-full py-20">
        <h2 className="text-center [font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-[40px] tracking-[0] leading-5 mb-12">
          MOMENTS OF HEALING
        </h2>
        <GallerySection />
      </section>

      <TestimonialsSection />

      <ContactSection />

      <FooterSection />
    </div>
  );
};
