import React from "react";

export const TestimonialsSection = (): JSX.Element => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center [font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-[28px] sm:text-[32px] md:text-[40px] tracking-[0] leading-[34px] sm:leading-[38px] md:leading-[48px] mb-8 sm:mb-12 md:mb-16">
          MOMENTS OF HEALING
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* First column - Image 1 (303x303) and Image 5 */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            <div className="w-full md:w-[303px] h-[250px] sm:h-[280px] md:h-[303px] rounded-2xl overflow-hidden mx-auto md:mx-0">
              <img 
                src="https://meher.b-cdn.net/aerial%20yoga.png" 
                alt="Aerial Yoga" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-[303px] aspect-[1/2] md:aspect-auto h-[500px] sm:h-[560px] md:h-auto rounded-2xl overflow-hidden mx-auto md:mx-0">
              <img 
                src="https://meher.b-cdn.net/hanging%20aerial.png" 
                alt="Hanging Aerial" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Middle column - Image 2 (636.3x636.3) */}
          <div className="col-span-1 md:col-span-6 order-3 md:order-2">
            <div className="w-full md:w-[620px] h-[300px] sm:h-[400px] md:h-[636.3px] rounded-2xl overflow-hidden mx-auto md:mx-0">
              <img 
                src="https://meher.b-cdn.net/space%20sound%20healing.png" 
                alt="Space Sound Healing" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Last column - Image 3 (303x303) and Image 4 */}
          <div className="col-span-1 md:col-span-3 space-y-4 order-2 md:order-3">
            <div className="w-full md:w-[303px] h-[250px] sm:h-[280px] md:h-[303px] rounded-2xl overflow-hidden mx-auto md:mx-0">
              <img 
                src="https://meher.b-cdn.net/yoga.png" 
                alt="Yoga" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-[303px] h-[250px] sm:h-[280px] md:h-[303px] rounded-2xl overflow-hidden mx-auto md:mx-0">
              <img 
                src="https://meher.b-cdn.net/wooden%20bed.png" 
                alt="Wooden Bed" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bottom row - Image 6 (303x303) and Image 7 (636.3x303) */}
          <div className="col-span-1 md:col-span-12 flex flex-col md:flex-row gap-4 mt-4 md:-mt-[300px] md:pl-[320px] order-4">
            <div className="w-full md:w-[420px] h-[250px] sm:h-[280px] md:h-[303px] rounded-2xl overflow-hidden">
              <img 
                src="https://meher.b-cdn.net/pregnancy%20yoga.png" 
                alt="Pregnancy Yoga" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-[636px] h-[250px] sm:h-[280px] md:h-[303px] rounded-2xl overflow-hidden">
              <img 
                src="https://meher.b-cdn.net/ice%20bath.png" 
                alt="Ice Bath" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
