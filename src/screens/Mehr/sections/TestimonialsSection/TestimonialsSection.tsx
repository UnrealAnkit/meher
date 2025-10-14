import React from "react";

export const TestimonialsSection = (): JSX.Element => {
  return (
    <section className="w-full bg-[#f9d2a3] py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center [font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-[40px] tracking-[0] leading-[48px] mb-16">
          MOMENTS OF HEALING
        </h2>

        <div className="grid grid-cols-12 gap-4">
          {/* First column - Image 1 (303x303) and Image 5 */}
          <div className="col-span-3 space-y-4">
            <div className="w-[303px] h-[303px] rounded-2xl overflow-hidden">
              <img 
                src="/Moments of Healing 1.png" 
                alt="Healing moment 1" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[303px] aspect-[1/2] rounded-2xl overflow-hidden">
              <img 
                src="/Moments of Healing 5.png" 
                alt="Healing moment 5" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Middle column - Image 2 (636.3x636.3) */}
          <div className="col-span-6">
            <div className="w-[620px] h-[636.3px] rounded-2xl overflow-hidden">
              <img 
                src="/Moments of Healing 2.png" 
                alt="Healing moment 2" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Last column - Image 3 (303x303) and Image 4 */}
          <div className="col-span-3 space-y-4">
            <div className="w-[303px] h-[303px] rounded-2xl overflow-hidden">
              <img 
                src="/Moments of Healing 3.png" 
                alt="Healing moment 3" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[303px] h-[303px] rounded-2xl overflow-hidden">
              <img 
                src="/Moments of Healing 4.png" 
                alt="Healing moment 4" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bottom row - Image 6 (303x303) and Image 7 (636.3x303) */}
          <div className="col-span-12 flex gap-4 -mt-[300px] pl-[320px]">
            <div className="w-[420px] h-[303px] rounded-2xl overflow-hidden">
              <img 
                src="/Moments of Healing 6.png" 
                alt="Healing moment 6" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[636px] h-[303px] rounded-2xl overflow-hidden">
              <img 
                src="/Moments of Healing 7.png" 
                alt="Healing moment 7" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
