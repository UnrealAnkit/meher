import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

type DropdownItem = { label: string; path: string };
type NavItem = {
  label: string;
  path?: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
};

const navItems: NavItem[] = [
  { label: "HOME", path: "/" },
  { label: "ABOUT US", path: "/about" },
  { label: "BOOK NOW", hasDropdown: true, dropdownItems: [
    { label: "REJUVENATE", path: "/rejuvenate" },
    { label: "STAY", path: "/book-stay" },
    { label: "LEARNING", path: "/learning" }
  ]},
  { label: "CALENDAR", path: "/calendar" },
  { label: "GALLERY", path: "/gallery" },
  { label: "CONTACT US", path: "/contact" },
];

export const NavbarSection = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  return (
    <nav className="w-full bg-[#ab4b28]">
      <div className="max-w-[1440px] mx-auto h-24 flex items-center justify-between px-4 lg:px-[149px]">
        
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" className="block hover:opacity-80 transition-opacity">
            <img
              className="h-16 w-auto object-contain"
              alt="MEHR Logo"
              src="/image-5-1.png"
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-[31px]">
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              {item.hasDropdown ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setIsDesktopDropdownOpen(true)}
                  onMouseLeave={() => setIsDesktopDropdownOpen(false)}
                >
                  <button
                    className="[font-family:'Poppins'] font-light text-white text-[18px] tracking-[2px] leading-[26px] whitespace-nowrap hover:opacity-80 transition-opacity drop-shadow-lg flex items-center gap-1"
                    aria-haspopup="menu"
                    aria-expanded={isDesktopDropdownOpen}
                  >
                    {item.label}
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${isDesktopDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div 
                    className={`absolute top-full left-0 mt-2 w-56 bg-[#ab4b28] border border-white/20 rounded-lg shadow-xl z-50 transition-all duration-300 ease-out ${
                      isDesktopDropdownOpen 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
                  >
                    <div className="py-1 divide-y divide-white/30">
                      {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          to={dropdownItem.path}
                          className="block px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200 [font-family:'Poppins'] font-light text-[16px] tracking-[1px]"
                          onClick={() => setIsDesktopDropdownOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path!}
                  className="[font-family:'Poppins'] font-light text-white text-[18px] tracking-[2px] leading-[26px] whitespace-nowrap hover:opacity-80 transition-opacity drop-shadow-lg"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <Link
            to="/about"
            className="px-6 py-2 rounded-full bg-transparent border border-white text-white hover:bg-white hover:text-[#ab4b28] transition-colors"
          >
            EXPLORE MORE
          </Link>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-24 left-0 right-0 bg-[#ab4b28] shadow-lg lg:hidden z-50">
            <div className="flex flex-col divide-y divide-white/30">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.hasDropdown ? (
                    <div className="px-4">
                      <button
                        className="w-full flex items-center justify-between [font-family:'Poppins'] font-light text-white text-[18px] tracking-[2px] leading-[26px] drop-shadow-lg py-4"
                        onClick={toggleMobileDropdown}
                        aria-expanded={isMobileDropdownOpen}
                        aria-controls="mobile-booknow-menu"
                      >
                        {item.label}
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${isMobileDropdownOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <div
                        id="mobile-booknow-menu"
                        className={`overflow-hidden transition-all duration-300 ${
                          isMobileDropdownOpen ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <div className="bg-[#ab4b28] divide-y divide-white/30">
                          {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                            <Link
                              key={dropdownIndex}
                              to={dropdownItem.path}
                              className="block [font-family:'Poppins'] font-light text-white text-[16px] tracking-[1px] leading-[24px] px-4 py-3 hover:bg-[#8d3d20] transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.path!}
                      className="block [font-family:'Poppins'] font-light text-white text-[18px] tracking-[2px] leading-[26px] px-4 py-4 hover:bg-[#8d3d20] transition-colors text-left drop-shadow-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-4 py-4">
                <Link
                  to="/about"
                  className="block w-full px-6 py-2 rounded-full bg-transparent border border-white text-white hover:bg-white hover:text-[#ab4b28] transition-colors text-center [font-family:'Poppins']"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  EXPLORE MORE
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};