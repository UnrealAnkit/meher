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
      <div className="mx-auto w-full max-w-[1440px] px-4 py-8">
        <div className="flex items-center justify-start">
          <h1 className="text-[#A0522D] text-[64px] font-normal leading-tight [font-family:'Poppins']">
            Terms and Conditions
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-[#FFF3E4]">
        <div className="max-w-[1200px] mx-auto px-4 py-16">
          <div className="space-y-8 [font-family:'Poppins'] text-[#1E1E1E]">
            
            {/* Introduction */}
            <section>
              <p className="text-lg leading-relaxed mb-4">
                Welcome to MEHER ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our website <a href="https://mehr.world" target="_blank" rel="noopener noreferrer" className="text-[#A0522D] hover:underline">https://mehr.world</a> ("Site") and participation in our services, including wellness retreats, stays, therapies, programs, and trainings.
              </p>
              <p className="text-lg leading-relaxed">
                By using this Site, booking an experience, or making a payment, you agree to these Terms. If you do not agree, please do not use the Site or our services.
              </p>
            </section>

            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">1. Services Overview</h2>
              <p className="text-lg leading-relaxed mb-4">
                MEHER provides:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>Wellness stays and rejuvenation programs</li>
                <li>Therapeutic and healing experiences</li>
                <li>Aerial yoga and teacher training certifications</li>
                <li>Retreats and wellness programs in India and internationally</li>
              </ul>
              <p className="text-lg leading-relaxed mt-4">
                All bookings are subject to availability and confirmation by our team.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">2. Booking and Payment</h2>
              <ul className="space-y-3 text-lg leading-relaxed">
                <li>
                  Bookings can be made through our official website or by contacting us directly.
                </li>
                <li>
                  Full or partial payment may be required at the time of booking, as specified for each program or retreat.
                </li>
                <li>
                  Payments are processed through secure gateways like Razorpay or equivalent third-party providers.
                </li>
                <li>
                  You are responsible for ensuring payment details are accurate and authorized.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">3. Cancellation and Refund Policy</h2>
              <ul className="space-y-3 text-lg leading-relaxed">
                <li>
                  Cancellation policies vary by program, stay, or retreat and will be clearly stated at the time of booking.
                </li>
                <li>
                  Refunds, if applicable, will be processed within a reasonable time frame after deduction of any applicable administrative fees.
                </li>
                <li>
                  In case of unavoidable circumstances (natural calamities, government restrictions, pandemics), MEHER reserves the right to postpone, reschedule, or offer credits instead of refunds.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">4. Use of the Website</h2>
              <p className="text-lg leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>Use this Site for any unlawful, fraudulent, or harmful purpose.</li>
                <li>Copy, modify, or distribute any part of the Site's content without prior written permission.</li>
                <li>Attempt to gain unauthorized access to our systems or interfere with Site functionality.</li>
              </ul>
              <p className="text-lg leading-relaxed mt-4">
                We reserve the right to restrict or terminate access if these Terms are violated.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">5. Intellectual Property Rights</h2>
              <p className="text-lg leading-relaxed">
                All materials on this Site — including text, images, logos, videos, and design — are the intellectual property of MEHER, unless otherwise stated. You may not reproduce, distribute, or exploit any content without our prior written consent.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">6. Health and Safety Disclaimer</h2>
              <ul className="space-y-3 text-lg leading-relaxed">
                <li>
                  MEHER's experiences, therapies, and programs are intended for general wellness and education purposes.
                </li>
                <li>
                  They are not substitutes for medical advice, diagnosis, or treatment.
                </li>
                <li>
                  Participants are responsible for ensuring their physical and mental fitness before joining any program.
                </li>
                <li>
                  Please consult your physician before engaging in activities like aerial yoga or intense wellness practices.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">7. Limitation of Liability</h2>
              <p className="text-lg leading-relaxed mb-4">
                While we take great care to deliver safe and enriching experiences, MEHER and its facilitators shall not be held liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>Any injury, loss, or damage resulting from participation in our programs or use of the Site.</li>
                <li>Technical issues, interruptions, or data loss arising from website use.</li>
              </ul>
              <p className="text-lg leading-relaxed mt-4">
                Our liability, if any, shall be limited to the amount paid by you for the specific service.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">8. Third-Party Links and Services</h2>
              <p className="text-lg leading-relaxed">
                Our Site may contain links to external websites or partner platforms. MEHER is not responsible for the content, accuracy, or practices of these external sites. We recommend reviewing their respective Terms and Privacy Policies before engaging with them.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">9. Modifications to Services or Terms</h2>
              <p className="text-lg leading-relaxed">
                We may update our programs, prices, or these Terms at any time without prior notice. The latest version will always be available on this page. Continued use of the Site after changes means you accept the revised Terms.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">10. Governing Law</h2>
              <p className="text-lg leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of India. Any disputes shall fall under the exclusive jurisdiction of the courts in Delhi, India.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">11. Contact Us</h2>
              <div className="bg-[#f9f5f0] p-6 rounded-lg">
                <p className="text-lg leading-relaxed mb-2">
                  For any questions or clarifications regarding these Terms, please contact us at:
                </p>
                <p className="text-lg leading-relaxed">
                  Email: <a href="mailto:mehrraaha@gmail.com" className="text-[#A0522D] hover:underline">mehrraaha@gmail.com</a>
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


