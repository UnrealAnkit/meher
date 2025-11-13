import React from "react";

export const GallerySection = (): JSX.Element => {
  return (
    <section className="w-full flex flex-col py-2.5 px-4">
      <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#7a574f] text-base sm:text-lg md:text-xl lg:text-2xl text-center tracking-[2px] sm:tracking-[3px] md:tracking-[4px] lg:tracking-[5px] leading-[20px] sm:leading-[24px] md:leading-[28px] mb-2">
        HEALING IN COMMUNITY
      </h2>

      <p className="[font-family:'Poppins',Helvetica] font-medium text-[#7a574f4c] text-sm sm:text-base md:text-2xl lg:text-3xl xl:text-[42px] text-center tracking-[0] leading-[18px] sm:leading-[22px] md:leading-[32px] lg:leading-[42px] xl:leading-[50px] break-words">
        CORPORATE – GROUPS – FESTIVALS – INTERNATIONAL
      </p>
    </section>
  );
};
