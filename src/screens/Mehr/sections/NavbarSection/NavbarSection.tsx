import React from "react";

const navItems = [
  { label: "HOME", weight: "font-medium" },
  { label: "ABOUT US", weight: "font-semibold" },
  { label: "PROGRAMS", weight: "font-semibold" },
  { label: "BLOGS", weight: "font-semibold" },
  { label: "CONTACT US", weight: "font-semibold" },
];

export const NavbarSection = (): JSX.Element => {
  return (
    <nav className="w-full h-24 flex items-center justify-between bg-[#ab4b28] px-4 lg:px-[149px]">
      <div className="flex-shrink-0 flex items-center">
          <img
            className="w-[130px] h-17 object-contain"
            alt="MEHR Logo"
            src="/image-5-1.png"
          />
      </div>

      <div className="flex items-center gap-[31px]">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="[font-family:'Poppins',Helvetica] font-light text-white text-[18px] tracking-[2px] leading-[26px] whitespace-nowrap hover:opacity-80 transition-opacity drop-shadow-lg"
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
