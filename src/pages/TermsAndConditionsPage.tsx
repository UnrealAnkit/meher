import React from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

export const TermsAndConditionsPage = (): JSX.Element => {
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
                TERMS &<br />CONDITIONS
              </h1>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="/Group Yoga class Marbella.png"
              alt="Terms and Conditions" 
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-white">
        <div className="max-w-[1200px] mx-auto px-4 py-16">
          <div className="space-y-8 [font-family:'Poppins'] text-[#1E1E1E]">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">1. Overview</h2>
              <p className="text-lg leading-relaxed mb-4">
                CH2 World Foundation (a Section 8 Not-for-Profit organization) offers wellness programs, workshops, retreats, therapies, consultations, and memberships through its platforms and partner spaces including CH2, Raaha, and MEHR.
              </p>
              <p className="text-lg leading-relaxed">
                By accessing and using our services, you agree to be bound by these Terms and Conditions. Please read them carefully before making any bookings or payments.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">2. Services Offered</h2>
              <p className="text-lg leading-relaxed mb-4">
                CH2 World Foundation provides various wellness services including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>Workshops and group sessions</li>
                <li>Private and one-on-one sessions</li>
                <li>Residential retreats and programs</li>
                <li>Therapy sessions and consultations</li>
                <li>Membership programs</li>
                <li>Educational and training programs</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">3. Booking and Payment</h2>
              <ul className="space-y-3 text-lg leading-relaxed">
                <li>
                  <strong>Bookings:</strong> All bookings are confirmed upon successful payment through our website, social media links, or authorized payment gateways (including Razorpay).
                </li>
                <li>
                  <strong>Payment Terms:</strong> Payment must be made in full at the time of booking unless otherwise specified.
                </li>
                <li>
                  <strong>Program-Specific Terms:</strong> Each program or session may have specific terms and conditions, which will be communicated at the time of booking.
                </li>
                <li>
                  <strong>Pricing:</strong> All prices are subject to change without prior notice. Confirmed bookings will be honored at the price agreed upon at the time of booking.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">4. Participant Responsibilities</h2>
              <ul className="space-y-3 text-lg leading-relaxed">
                <li>Participants must provide accurate and complete information during booking.</li>
                <li>Participants must arrive on time for scheduled sessions and programs.</li>
                <li>Participants must inform CH2 of any health conditions or special requirements that may affect their participation.</li>
                <li>Participants must comply with all safety guidelines and instructions provided by facilitators and staff.</li>
                <li>Participants are responsible for their personal belongings during programs.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">5. Liability and Waiver</h2>
              <ul className="space-y-3 text-lg leading-relaxed">
                <li>
                  Participants acknowledge that participation in wellness activities involves inherent risks and agree to participate at their own risk.
                </li>
                <li>
                  CH2 World Foundation, its partners, facilitators, and staff are not liable for any injuries, accidents, or health issues that may occur during participation in our programs.
                </li>
                <li>
                  CH2 is not liable for any travel, accommodation, or incidental expenses incurred by participants in relation to our programs.
                </li>
                <li>
                  Participants are advised to have appropriate travel and health insurance coverage.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">6. Intellectual Property</h2>
              <p className="text-lg leading-relaxed mb-4">
                All content, materials, programs, and methodologies provided by CH2 World Foundation are protected by intellectual property rights. Participants may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>Reproduce, distribute, or share program content without authorization</li>
                <li>Record sessions or programs without prior written consent</li>
                <li>Use CH2 materials for commercial purposes</li>
                <li>Claim ownership of any CH2 methodologies or content</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">7. Code of Conduct</h2>
              <p className="text-lg leading-relaxed mb-4">
                Participants are expected to maintain respectful and appropriate behavior during all programs. CH2 reserves the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>Refuse service to any individual who violates our code of conduct</li>
                <li>Remove participants from programs without refund if behavior is disruptive or inappropriate</li>
                <li>Take necessary legal action in case of serious misconduct</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">8. Modifications to Terms</h2>
              <p className="text-lg leading-relaxed">
                CH2 World Foundation reserves the right to modify these Terms and Conditions at any time. Updated terms will be posted on our website. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">9. Governing Law and Jurisdiction</h2>
              <p className="text-lg leading-relaxed mb-4">
                These Terms and Conditions are governed by the laws of India. All disputes are subject to the exclusive jurisdiction of courts in Pune, India.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">10. Contact Information</h2>
              <div className="bg-[#f9f5f0] p-6 rounded-lg">
                <p className="text-lg leading-relaxed mb-2">
                  <strong>CH2 World Foundation</strong>
                </p>
                <p className="text-lg leading-relaxed mb-2">
                  D4, Riverside Sultanat, Lane G, Koregaon Park, Pune, India
                </p>
                <p className="text-lg leading-relaxed mb-2">
                  Email: <a href="mailto:contact@ch2.world" className="text-[#A0522D] hover:underline">contact@ch2.world</a>
                </p>
                <p className="text-lg leading-relaxed mb-2">
                  Phone: <a href="tel:9112008008" className="text-[#A0522D] hover:underline">9112008008</a>
                </p>
                <p className="text-lg leading-relaxed">
                  Website: <a href="https://www.ch2.world" target="_blank" rel="noopener noreferrer" className="text-[#A0522D] hover:underline">www.ch2.world</a>
                </p>
              </div>
            </section>

            {/* Last Updated */}
            <div className="mt-12 pt-8 border-t border-gray-300">
              <p className="text-sm text-gray-600 italic">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

