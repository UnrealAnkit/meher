import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";

const moreLinks = [
  { text: "About us", path: "/about" },
  { text: "Contact us", path: "/contact" },
];

const mediaLinks = [
  { text: "Gallery", path: "/gallery" },
];

const expertiseLinks = [
  { text: "Rejuvenation Program", path: "/rejuvenation" },
  { text: "Educational Program", path: "/learning" },
  { text: "Book a Stay", path: "/programs" },
  { text: "Calendar", path: "/calendar" },
];

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="relative w-full bg-transparent">
      <div className="relative w-full bg-[#ab4b28]">
        <div className="container mx-auto px-[22px] py-[51px]">
          <div className="grid grid-cols-1 lg:grid-cols-[387px_1fr_343px] gap-8 lg:gap-[115px]">
            <div className="flex justify-start">
              <img
                className="w-full max-w-[387px] h-auto object-cover"
                alt="MEHER Logo"
                src="https://meher.b-cdn.net/image%205.png"
              />
            </div>

            <div className="flex flex-col gap-[60px]">
              <div className="flex flex-col gap-2.5">
                <div className="[font-family:'Raleway',Helvetica] font-bold text-white text-sm tracking-[0] leading-4 whitespace-nowrap">
                  More
                </div>
                {moreLinks.map((link, index) => (
                  <Link
                    key={`more-${index}`}
                    to={link.path}
                    className="[font-family:'Raleway',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-4 whitespace-nowrap hover:text-white transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="[font-family:'Raleway',Helvetica] font-bold text-white text-sm tracking-[0] leading-4 whitespace-nowrap">
                  Media
                </div>
                {mediaLinks.map((link, index) => (
                  <Link
                    key={`media-${index}`}
                    to={link.path}
                    className="[font-family:'Raleway',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-4 whitespace-nowrap hover:text-white transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="[font-family:'Raleway',Helvetica] font-bold text-white text-sm tracking-[0] leading-4 whitespace-nowrap">
                  Our expertise
                </div>
                {expertiseLinks.map((link, index) => (
                  <Link
                    key={`expertise-${index}`}
                    to={link.path}
                    className="[font-family:'Raleway',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-4 whitespace-nowrap hover:text-white transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[42px]">
              <div className="flex flex-col gap-[22px]">
                <div className="[font-family:'Raleway',Helvetica] font-bold text-white text-sm tracking-[0] leading-4 whitespace-nowrap">
                  JOIN US ON OUR BELONGING PROJECT
                </div>
                <Button className="w-[233px] h-[38px] rounded-[50px] shadow-[0px_4px_4px_#00000040] bg-[#f9d2a3] hover:bg-[#f4c894] [font-family:'Arial-Bold',Helvetica] font-bold text-[#ab4b28] text-[17.5px] tracking-[0] leading-6">
                  BOOK YOUR STAY
                </Button>
              </div>

              <div className="flex flex-col gap-[14px]">
                <div className="[font-family:'Raleway',Helvetica] font-bold text-white text-sm tracking-[0] leading-4 whitespace-nowrap">
                  Contact us at
                </div>
                <a 
                  href="mailto:contact@ch2.world" 
                  className="[font-family:'Raleway',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-4 hover:text-white transition-colors underline"
                >
                  contact@ch2.world
                </a>
              </div>

              <div className="flex flex-col gap-[14px]">
                <div className="[font-family:'Raleway',Helvetica] font-bold text-white text-sm tracking-[0] leading-4 whitespace-nowrap">
                  Find us on
                </div>
                <img
                  className="w-full max-w-[343px] h-9"
                  alt="Container unordered"
                  src="/container---unordered-list.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-14 bg-[#f9d2a3]">
        <div className="container mx-auto px-[83px] h-full flex items-center justify-between">
          <div className="[font-family:'Raleway',Helvetica] font-normal text-[#355149] text-sm tracking-[0] leading-5 whitespace-nowrap">
            © 2025 Ch2. All rights reserved.
          </div>

          <div className="flex items-center gap-[9.5px]">
            <Link
              to="/privacy-policy"
              className="[font-family:'Raleway',Helvetica] font-normal text-[#355149] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-[#ab4b28] transition-colors"
            >
              Privacy Policy
            </Link>
            <Separator orientation="vertical" className="h-4 w-px bg-[#355149]" />
            <Link
              to="/terms-and-conditions"
              className="[font-family:'Raleway',Helvetica] font-normal text-[#355149] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-[#ab4b28] transition-colors"
            >
              Terms & Conditions
            </Link>
            <Separator orientation="vertical" className="h-4 w-px bg-[#355149]" />
            <Link
              to="/refund-policy"
              className="[font-family:'Raleway',Helvetica] font-normal text-[#355149] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-[#ab4b28] transition-colors"
            >
              Refund Policy
            </Link>
            <Separator orientation="vertical" className="h-4 w-px bg-[#355149]" />
            <Link
              to="/contact"
              className="[font-family:'Raleway',Helvetica] font-normal text-[#355149] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-[#ab4b28] transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="[font-family:'Raleway',Helvetica] font-normal text-[#355149] text-sm tracking-[0] leading-5 whitespace-nowrap">
            Powered by
          </div>
        </div>
      </div>
    </footer>
  );
};
