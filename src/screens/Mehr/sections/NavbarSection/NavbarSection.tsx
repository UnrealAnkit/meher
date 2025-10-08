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
    <nav className="w-full h-20 flex items-center justify-between bg-[#ab4b28] px-[149px]">
      <img
        className="w-[119px] h-20 object-cover"
        alt="Image"
        src="/image-5-1.png"
      />

      <div className="flex items-center gap-[31px]">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`[font-family:'Inter',Helvetica] ${item.weight} text-white text-[15px] tracking-[0.50px] leading-[26px] whitespace-nowrap hover:opacity-80 transition-opacity`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
