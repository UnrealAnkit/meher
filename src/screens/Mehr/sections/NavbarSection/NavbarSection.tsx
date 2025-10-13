import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "ABOUT US", path: "/about" },
  { label: "PROGRAMS", path: "/programs" },
  { label: "BLOGS", path: "/blogs" },
  { label: "CONTACT US", path: "/contact" },
];

export const NavbarSection = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full h-24 flex items-center justify-between bg-[#ab4b28] px-4 lg:px-[149px] relative">
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center">
        <Link to="/" className="block hover:opacity-80 transition-opacity">
          <img
            className="w-[130px] h-17 object-contain"
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
            className="[font-family:'Poppins',Helvetica] font-light text-white text-[18px] tracking-[2px] leading-[26px] whitespace-nowrap hover:opacity-80 transition-opacity drop-shadow-lg"
          >
            {item.label}
          </Link>
        ))}
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
        <div className="absolute top-full left-0 right-0 bg-[#ab4b28] shadow-lg lg:hidden z-50">
          <div className="flex flex-col py-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="[font-family:'Poppins',Helvetica] font-light text-white text-[18px] tracking-[2px] leading-[26px] px-4 py-3 hover:bg-[#8d3d20] transition-colors text-left drop-shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
