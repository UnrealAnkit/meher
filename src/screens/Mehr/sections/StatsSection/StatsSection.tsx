import React from "react";

export const StatsSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-[730px] bg-[linear-gradient(0deg,rgba(73,73,73,0.5)_8%,rgba(73,73,73,0.36)_41%,rgba(248,254,237,0)_92%),linear-gradient(0deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_100%)]">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt="Rectangle"
        src="/rectangle-1.png"
      />

      <div className="absolute top-0 left-0 w-full h-[730px] flex flex-col gap-[19px] bg-[linear-gradient(0deg,rgba(73,73,73,0.5)_8%,rgba(73,73,73,0.36)_41%,rgba(248,254,237,0)_92%),linear-gradient(0deg,rgba(0,0,0,0.46)_0%,rgba(0,0,0,0.46)_100%)]">
        <div className="flex justify-center mt-[348px]">
          <div className="w-full max-w-[1299px] px-4">
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-xl tracking-[0] leading-5 whitespace-nowrap mb-[19px]">
              ABOUT US
            </h2>

            <div className="flex flex-col gap-7">
              <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-[42px] tracking-[-0.88px] leading-[53px] max-w-[983px]">
                Not just a stay.<br />
                <span className="block mt-2">A bridge to wholeness.</span>
              </h3>

              <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-2xl tracking-[0] leading-[27px] max-w-[927px]">
                MEHR (Mandala Estate for Healing & Rejuvenation) is a living ecosystem of healing estates and rejuvenation experiences! Be it short breaks from daily routine at our 'in city' retreats or our 'in nature' estates, or our deep healing journeys, we provide a one-stop solution to your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
