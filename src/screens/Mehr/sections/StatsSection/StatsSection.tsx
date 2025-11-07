import React from "react";

export const StatsSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[730px] bg-[linear-gradient(0deg,rgba(73,73,73,0.5)_8%,rgba(73,73,73,0.36)_41%,rgba(248,254,237,0)_92%),linear-gradient(0deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_100%)]">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt="Rectangle"
        src="/rectangle-1.png"
      />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-3 sm:gap-4 md:gap-[19px] bg-[linear-gradient(0deg,rgba(73,73,73,0.5)_8%,rgba(73,73,73,0.36)_41%,rgba(248,254,237,0)_92%),linear-gradient(0deg,rgba(0,0,0,0.46)_0%,rgba(0,0,0,0.46)_100%)]">
        <div className="flex justify-center mt-32 sm:mt-40 md:mt-60 lg:mt-[348px] px-4">
          <div className="w-full max-w-[1299px]">
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-sm sm:text-base md:text-lg lg:text-xl tracking-[0] leading-5 mb-3 sm:mb-4 md:mb-[19px]">
              ABOUT US
            </h2>

            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7">
              <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-[24px] sm:text-[28px] md:text-[34px] lg:text-[42px] tracking-[-0.5px] sm:tracking-[-0.7px] md:tracking-[-0.88px] leading-[30px] sm:leading-[36px] md:leading-[44px] lg:leading-[53px] max-w-full">
                Not just a stay.<br />
                <span className="block mt-1 sm:mt-2">A bridge to wholeness.</span>
              </h3>

              <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-sm sm:text-base md:text-lg lg:text-2xl tracking-[0] leading-[20px] sm:leading-[24px] md:leading-[26px] lg:leading-[27px] max-w-full">
                MEHR (Mandala Estate for Healing & Rejuvenation) is a living ecosystem of healing estates and rejuvenation experiences! Be it short breaks from daily routine at our 'in city' retreats or our 'in nature' estates, or our deep healing journeys, we provide a one-stop solution to your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
