import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "ABOUT US", path: "/about" },
  { label: "BOOK AN EXPERIENCE", path: "/programs" },
  { label: "CALENDAR", path: "/calendar" },
  { label: "GALLERY", path: "/gallery" },
  { label: "CONTACT US", path: "/contact" },
];

export const NavbarSection = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full bg-[#ab4b28]">
      <div className="max-w-[1440px] mx-auto h-24 flex items-center justify-between px-4 lg:px-[149px]">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" className="block hover:opacity-80 transition-opacity">
            <img
              className="h-16 w-auto object-contain"
              alt="MEHR Logo"
              src="/image-5-1.png"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-[31px]">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="[font-family:'Poppins'] font-light text-white text-[18px] tracking-[2px] leading-[26px] whitespace-nowrap hover:opacity-80 transition-opacity drop-shadow-lg"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/explore"
            className="px-6 py-2 rounded-full bg-transparent border border-white text-white hover:bg-white hover:text-[#ab4b28] transition-colors"
          >
            EXPLORE MORE
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-24 left-0 right-0 bg-[#ab4b28] shadow-lg lg:hidden z-50">
            <div className="flex flex-col py-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="[font-family:'Poppins'] font-light text-white text-[18px] tracking-[2px] leading-[26px] px-4 py-3 hover:bg-[#8d3d20] transition-colors text-left drop-shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/explore"
                className="mx-4 mt-2 px-6 py-2 rounded-full bg-transparent border border-white text-white hover:bg-white hover:text-[#ab4b28] transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                EXPLORE MORE
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};