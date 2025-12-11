import React from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

export const PrivacyPolicyPage = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="w-full">
        <NavbarSection />
      </div>

      <div className="h-16"></div>

      <div className="mx-auto w-full max-w-[1440px] px-4 py-8">
        <div className="flex items-center justify-start">
          <h1 className="text-[#A0522D] text-[64px] font-normal leading-tight [font-family:'Poppins']">
            Privacy Policy
          </h1>
        </div>
      </div>

      <div className="flex-grow bg-[#FFF3E4]">
        <div className="max-w-[1200px] mx-auto px-4 py-16">
          <div className="space-y-8 [font-family:'Poppins'] text-[#1E1E1E]">

            <div className="mb-6">
              <p className="text-lg font-semibold text-[#A0522D]">
                Effective Date: 1st November
              </p>
            </div>

            <section>
              <p className="text-lg leading-relaxed mb-4">
                Welcome to MEHER ("we", "our", or "us"). This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you visit or make a booking via our website <a href="https://mehr.world" target="_blank" rel="noopener noreferrer" className="text-[#A0522D] hover:underline">mehr.world</a> ("Site") and engage with our services (including rooms for stay, therapeutic experiences, retreats, trainings, aerial-yoga teacher training, and related programs).
              </p>
              <p className="text-lg leading-relaxed">
                By using our Site or submitting your personal information, you agree to the terms outlined in this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">Information We Collect</h2>
              <p className="text-lg leading-relaxed mb-4">
                We collect the following types of personal information when you voluntarily provide it:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Your specific interests (type of therapy session, rejuvenation program, training or retreat booking)</li>
                <li>Payment transaction details processed by our payment partner (we do not store full payment card details)</li>
                <li>Any other information you provide in booking or enquiry forms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">How We Use Your Information</h2>
              <p className="text-lg leading-relaxed mb-4">
                We use your personal information to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>Process and confirm your bookings and reservations</li>
                <li>Provide the services, programs and experiences you request</li>
                <li>Communicate with you about program schedules, updates, changes, or important information</li>
                <li>Send you information about upcoming retreats, training, or wellness offerings (only if you have consented to receive such communications)</li>
                <li>Improve our services and offerings based on your feedback and interests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">Payment Processing</h2>
              <p className="text-lg leading-relaxed">
                Payments made via our website are processed through our third-party payment partner (e.g., Razorpay). We do not store your full card number or payment credentials. Your payment partner's privacy and security policies govern those transactions.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">Disclosure of Information</h2>
              <p className="text-lg leading-relaxed mb-4">
                We do not sell, rent or trade your personal information. We may disclose your information only in the following limited cases:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>With our trusted service providers who assist us in delivering our services (such as booking & support systems) under confidentiality obligations</li>
                <li>When required by law, legal process, governmental request or to protect our rights, property or safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">Data Retention</h2>
              <p className="text-lg leading-relaxed">
                We will retain your personal information no longer than is necessary to fulfil the purposes for which we collected it (including for legal, tax or regulatory obligations).
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">Your Rights</h2>
              <p className="text-lg leading-relaxed mb-4">
                Depending on your jurisdiction, you may have rights including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>Accessing the data we hold about you</li>
                <li>Requesting correction or deletion of your data</li>
                <li>Withdrawing consent for marketing communications</li>
              </ul>
              <p className="text-lg leading-relaxed mt-4">
                To exercise any of these rights, please contact us at: <a href="mailto:mehrraaha@gmail.com" className="text-[#A0522D] hover:underline">mehrraaha@gmail.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">Security</h2>
              <p className="text-lg leading-relaxed">
                We adopt reasonable administrative, technical and organisational measures to protect your personal information from unauthorized access, disclosure or destruction. However, no online transmission or storage can be guaranteed to be 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">Changes to This Privacy Policy</h2>
              <p className="text-lg leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements or services. We will publish the updated version on this Site with a new "Effective Date". Your continued use of the Site or our services after the update constitutes your acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">Contact Us</h2>
              <div className="bg-[#f9f5f0] p-6 rounded-lg">
                <p className="text-lg leading-relaxed mb-2">
                  If you have any questions or concerns about this Privacy Policy or our handling of your personal information, please contact us at:
                </p>
                <p className="text-lg leading-relaxed">
                  Email: <a href="mailto:mehrraaha@gmail.com" className="text-[#A0522D] hover:underline">mehrraaha@gmail.com</a>
                </p>
              </div>
            </section>

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

