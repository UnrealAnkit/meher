import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { NavbarSection } from '../screens/Mehr/sections/NavbarSection';
import { FooterSection } from '../screens/Mehr/sections/FooterSection';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full">
        <NavbarSection />
      </div>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Hero Section */}
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="flex">
          <div className="flex-1 bg-[#FFDAB9] flex items-center justify-start pl-16">
            <div className="max-w-[570px] text-left">
              <h1 className="text-[#A0522D] text-[64px] font-normal leading-tight [font-family:'Poppins']">
                CONTACT<br />US
              </h1>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="/Group Yoga class Marbella.png"
              alt="Contact Us" 
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section - Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold text-black mb-4 leading-tight">
                Every journey begins with a<br />
                step — reach out to us, and<br />
                let's walk together towards<br />
                healing, hope, and<br />
                wholeness.
              </h2>
              <p className="text-[#5D5E5E] mb-8 text-xl [font-family:'Poppins'] leading-relaxed">
                Your journey is unique, and we're<br />
                honored to walk it with you.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="[font-family:'Poppins'] font-bold text-[#000000] text-2xl">Reach us at</h3>
              <div className="flex flex-col space-y-2">
                <a 
                  href="mailto:contact@eh2.world" 
                  className="[font-family:'Poppins'] text-[#000000] text-xl font-semibold hover:text-[#A0522D] transition-colors underline"
                >
                  contact@eh2.world
                </a>
                <p className="[font-family:'Poppins'] text-[#000000] font-semibold text-xl underline">
                  +91 96731 92121
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-[#A0522D] rounded-[15px] p-8 max-w-[800px] w-full mx-auto">
            <h3 className="text-white text-4xl font-light mb-8 text-center [font-family:'Poppins']">
              REQUEST A EXPLORATION CALL
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-[#E6B8AF] placeholder-[#666666] text-[#666666] h-12 rounded-[10px] text-base px-6 border-none focus:ring-0"
                />
                <Input
                  placeholder="E-Mail"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#E6B8AF] placeholder-[#666666] text-[#666666] h-12 rounded-[10px] text-base px-6 border-none focus:ring-0"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Mobile Numbers"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="bg-[#E6B8AF] placeholder-[#666666] text-[#666666] h-12 rounded-[10px] text-base px-6 border-none focus:ring-0"
                />
                <Input
                  placeholder="Your City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="bg-[#E6B8AF] placeholder-[#666666] text-[#666666] h-12 rounded-[10px] text-base px-6 border-none focus:ring-0"
                />
              </div>
              <Textarea
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="bg-[#E6B8AF] placeholder-[#666666] text-[#666666] min-h-[180px] rounded-[10px] text-base p-6 border-none focus:ring-0 resize-none"
              />
              <Button
                type="submit"
                className="w-full bg-white text-[#A0522D] hover:bg-gray-50 h-12 rounded-[10px] text-base font-medium mt-4"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};