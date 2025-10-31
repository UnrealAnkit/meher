import React from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

export const PrivacyPolicyPage = (): JSX.Element => {
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
                PRIVACY<br />POLICY
              </h1>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="/Group Yoga class Marbella.png"
              alt="Privacy Policy" 
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
                CH2 World Foundation (a Section 8 Not-for-Profit organization) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect your information when you use our services, website, or interact with us.
              </p>
              <p className="text-lg leading-relaxed">
                By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#A0522D] mb-2">Personal Information:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-lg leading-relaxed">
                    <li>Name, email address, phone number, and postal address</li>
                    <li>Date of birth and age (for program eligibility)</li>
                    <li>Payment information (processed securely through payment gateways)</li>
                    <li>Emergency contact information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#A0522D] mb-2">Health and Wellness Information:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-lg leading-relaxed">
                    <li>Health conditions and medical history (voluntarily provided)</li>
                    <li>Program preferences and participation history</li>
                    <li>Feedback and testimonials</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#A0522D] mb-2">Technical Information:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-lg leading-relaxed">
                    <li>IP address, browser type, and device information</li>
                    <li>Website usage data and cookies</li>
                    <li>Social media interactions (if you engage with us on social platforms)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">3. How We Use Your Information</h2>
              <p className="text-lg leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>To process bookings, registrations, and payments</li>
                <li>To communicate with you about programs, services, and updates</li>
                <li>To personalize your experience and recommend suitable programs</li>
                <li>To ensure safety and provide appropriate care during programs</li>
                <li>To improve our services and website functionality</li>
                <li>To send newsletters and promotional materials (with your consent)</li>
                <li>To comply with legal obligations and resolve disputes</li>
                <li>To analyze website usage and improve user experience</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-lg leading-relaxed mb-4">
                We do not sell your personal information. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li><strong>Service Providers:</strong> With trusted third-party service providers (payment processors, email services) who assist in our operations, under strict confidentiality agreements.</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulations.</li>
                <li><strong>Safety:</strong> To protect the rights, property, or safety of CH2, our participants, or others.</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information.</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of assets (with notice to participants).</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">5. Data Security</h2>
              <p className="text-lg leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>Encrypted data transmission (SSL/TLS) for sensitive information</li>
                <li>Secure storage systems with access controls</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal data on a need-to-know basis</li>
                <li>Secure payment processing through authorized gateways</li>
              </ul>
              <p className="text-lg leading-relaxed mt-4">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">6. Data Retention</h2>
              <p className="text-lg leading-relaxed mb-4">
                We retain your personal data only for as long as necessary to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>Fulfill the purposes for which it was collected</li>
                <li>Comply with legal, accounting, or reporting requirements</li>
                <li>Resolve disputes and enforce our agreements</li>
              </ul>
              <p className="text-lg leading-relaxed mt-4">
                When data is no longer needed, we will securely delete or anonymize it.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">7. Your Rights</h2>
              <p className="text-lg leading-relaxed mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li><strong>Access:</strong> Request a copy of your personal data we hold</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
                <li><strong>Objection:</strong> Object to processing of your data for certain purposes</li>
                <li><strong>Withdrawal:</strong> Withdraw consent for data processing where applicable</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
              </ul>
              <p className="text-lg leading-relaxed mt-4">
                To exercise these rights, please contact us using the information provided in Section 10.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">8. Cookies and Tracking</h2>
              <p className="text-lg leading-relaxed mb-4">
                Our website uses cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Improve website functionality and user experience</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
              <p className="text-lg leading-relaxed mt-4">
                You can control cookies through your browser settings. However, disabling cookies may limit some website functionality.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">9. Third-Party Links</h2>
              <p className="text-lg leading-relaxed">
                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any information.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">10. Children's Privacy</h2>
              <p className="text-lg leading-relaxed">
                Our services are generally intended for adults. If we collect information from individuals under 18 years of age, we do so with parental consent. If you believe we have collected information from a child without consent, please contact us immediately.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">11. Changes to Privacy Policy</h2>
              <p className="text-lg leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website and updating the "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">12. Contact Information</h2>
              <p className="text-lg leading-relaxed mb-4">
                For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
              </p>
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

