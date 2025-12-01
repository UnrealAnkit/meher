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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/mzzyrlkw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          city: formData.city,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          mobile: '',
          city: '',
          message: '',
        });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        // Reset error message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="h-0 lg:h-16"></div>

      {/* Hero Section */}
      <div className="w-full lg:max-w-[1440px] lg:mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 bg-[#FFDAB9] flex items-center justify-center lg:justify-start px-4 sm:px-6 lg:pl-16 pt-0 pb-8 lg:py-0">
            <div className="w-full lg:max-w-[570px] text-left pt-6 sm:pt-8 lg:pt-0">
              <h1 className="text-[#A0522D] text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-normal leading-tight [font-family:'Poppins']">
                CONTACT<br />US
              </h1>
            </div>
          </div>
          <div className="flex-1 w-full">
            <img 
              src="https://meher.b-cdn.net/Frame%2013%20(1).png"
              alt="Contact Us" 
              className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-white w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-8 sm:py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Section - Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black mb-4 leading-tight [font-family:'Poppins']">
                Every journey begins with a<br />
                step — reach out to us, and<br />
                let's walk together towards<br />
                healing, hope, and<br />
                wholeness.
              </h2>
              <p className="text-[#5D5E5E] mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl [font-family:'Poppins'] leading-relaxed">
                Your journey is unique, and we're<br />
                honored to walk it with you.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="[font-family:'Poppins'] font-bold text-[#000000] text-xl sm:text-2xl">Reach us at</h3>
              <div className="flex flex-col space-y-2">
                <a 
                  href="mailto:mehrraaha@gmail.com" 
                  className="[font-family:'Poppins'] text-[#000000] text-base sm:text-lg lg:text-xl font-semibold hover:text-[#A0522D] transition-colors underline break-all"
                >
                  mehrraaha@gmail.com
                </a>
                <p className="[font-family:'Poppins'] text-[#000000] font-semibold text-base sm:text-lg lg:text-xl underline">
                  +91 96731 92121
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-[#A0522D] rounded-[15px] p-4 sm:p-6 lg:p-8 max-w-[800px] w-full mx-auto">
            <h3 className="text-white text-xl sm:text-2xl lg:text-4xl font-light mb-6 sm:mb-8 text-center [font-family:'Poppins'] leading-tight">
              REQUEST A EXPLORATION CALL
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-[#E5B8AF] h-12 rounded-[10px] text-lg font-medium px-6 border-none focus:ring-0 [font-family:'Poppins'] focus:bg-[#E5B8AF]"
                />
                <Input
                  placeholder="E-Mail"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#E5B8AF] h-12 rounded-[10px] text-lg font-medium px-6 border-none focus:ring-0 [font-family:'Poppins'] focus:bg-[#E5B8AF]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Mobile Numbers"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="bg-[#E5B8AF] h-12 rounded-[10px] text-lg font-medium px-6 border-none focus:ring-0 [font-family:'Poppins'] focus:bg-[#E5B8AF]"
                />
                <Input
                  placeholder="Your City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="bg-[#E5B8AF] h-12 rounded-[10px] text-lg font-medium px-6 border-none focus:ring-0 [font-family:'Poppins'] focus:bg-[#E5B8AF]"
                />
              </div>
              <Textarea
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="bg-[#E5B8AF] min-h-[180px] rounded-[10px] text-lg font-medium p-6 border-none focus:ring-0 resize-none [font-family:'Poppins'] focus:bg-[#E5B8AF]"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-[#A0522D] hover:bg-gray-50 h-12 rounded-[10px] text-base font-medium mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </Button>
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-[10px] text-center [font-family:'Poppins']">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-[10px] text-center [font-family:'Poppins']">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};