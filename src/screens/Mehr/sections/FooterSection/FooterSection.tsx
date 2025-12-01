import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { Instagram } from "lucide-react";

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
  { text: "Book a Stay", path: "/calendar" },
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
                <Link to="/book-your-stay">
                  <Button className="w-[233px] h-[38px] rounded-[50px] shadow-[0px_4px_4px_#00000040] bg-[#f9d2a3] hover:bg-[#f4c894] [font-family:'Arial-Bold',Helvetica] font-bold text-[#ab4b28] text-[17.5px] tracking-[0] leading-6">
                    BOOK YOUR STAY
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col gap-[14px]">
                <div className="[font-family:'Raleway',Helvetica] font-bold text-white text-sm tracking-[0] leading-4 whitespace-nowrap">
                  Contact us at
                </div>
                <a 
                  href="mailto:mehrraaha@gmail.com" 
                  className="[font-family:'Raleway',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-4 hover:text-white transition-colors underline"
                >
                  mehrraaha@gmail.com
                </a>
              </div>

              <div className="flex flex-col gap-[14px]">
                <div className="[font-family:'Raleway',Helvetica] font-bold text-white text-sm tracking-[0] leading-4 whitespace-nowrap">
                  Find us on
                </div>
                <a
                  href="https://www.instagram.com/mehr.experiences?igsh=Z2w2ejYxODgxZjAw&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 [font-family:'Raleway',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-4 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full min-h-[56px] bg-[#f9d2a3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-[83px] py-3 lg:py-3 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-3 lg:gap-0">
          <div className="[font-family:'Raleway',Helvetica] font-normal text-[#355149] text-xs sm:text-sm tracking-[0] leading-5 text-center lg:text-left">
            © 2025 Ch2. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-[9.5px]">
            <Link
              to="/privacy-policy"
              className="[font-family:'Raleway',Helvetica] font-normal text-[#355149] text-xs sm:text-sm tracking-[0] leading-5 hover:text-[#ab4b28] transition-colors"
            >
              Privacy Policy
            </Link>
            <Separator orientation="vertical" className="h-4 w-px bg-[#355149] hidden sm:block" />
            <Link
              to="/terms-and-conditions"
              className="[font-family:'Raleway',Helvetica] font-normal text-[#355149] text-xs sm:text-sm tracking-[0] leading-5 hover:text-[#ab4b28] transition-colors"
            >
              Terms & Conditions
            </Link>
            <Separator orientation="vertical" className="h-4 w-px bg-[#355149] hidden sm:block" />
            <Link
              to="/refund-policy"
              className="[font-family:'Raleway',Helvetica] font-normal text-[#355149] text-xs sm:text-sm tracking-[0] leading-5 hover:text-[#ab4b28] transition-colors"
            >
              Refund Policy
            </Link>
            <Separator orientation="vertical" className="h-4 w-px bg-[#355149] hidden sm:block" />
            <Link
              to="/contact"
              className="[font-family:'Raleway',Helvetica] font-normal text-[#355149] text-xs sm:text-sm tracking-[0] leading-5 hover:text-[#ab4b28] transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="[font-family:'Raleway',Helvetica] font-normal text-[#355149] text-xs sm:text-sm tracking-[0] leading-5 text-center lg:text-left flex items-center">
            Powered by{" "}
            <a
              href="https://unrealankit.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ab4b28] transition-colors underline"
            >
              unrealankit.tech
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
