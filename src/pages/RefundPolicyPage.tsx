import React from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";

export const RefundPolicyPage = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full">
        <NavbarSection />
      </div>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Hero Section */}
      <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:py-6 lg:py-8">
        <div className="flex items-center justify-start">
          <h1 className="text-[#A0522D] text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-normal leading-tight [font-family:'Poppins']">
            CANCELLATION &<br />REFUND POLICY
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-[#FFF3E4]">
        <div className="max-w-[1200px] mx-auto px-4 py-16">
          <div className="space-y-8 [font-family:'Poppins'] text-[#1E1E1E]">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">1. Overview</h2>
              <p className="text-lg leading-relaxed mb-4">
                CH2 World Foundation (a Section 8 Not-for-Profit organization) offers wellness programs, workshops, retreats, therapies, consultations, and memberships through its platforms and partner spaces including CH2, Raaha, and MEHR.
              </p>
              <p className="text-lg leading-relaxed">
                We value your trust and are committed to maintaining transparency and fairness in our payment, cancellation, and refund processes.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">2. Program / Session Bookings</h2>
              <ul className="space-y-3 text-lg leading-relaxed">
                <li>All bookings made via our website, social media links, or payment gateways (including Razorpay) are confirmed upon successful payment.</li>
                <li>Each program or session may have specific terms and conditions, which will be communicated at the time of booking.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">3. Cancellations by Participants</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-[#A0522D] mb-3">Workshops / Group Sessions:</h3>
                  <ul className="space-y-2 text-lg leading-relaxed ml-4">
                    <li>• Cancellations made at least <strong>48 hours prior</strong> to the scheduled time are eligible for a <strong>100% credit</strong> toward any future CH2 program (valid for 60 days).</li>
                    <li>• Cancellations made <strong>within 48 hours</strong> of the event are <strong>non-refundable</strong> but may be transferred to another participant with prior CH2 approval.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-[#A0522D] mb-3">Private / 1-on-1 Sessions:</h3>
                  <ul className="space-y-2 text-lg leading-relaxed ml-4">
                    <li>• Cancellations made at least <strong>24 hours in advance</strong> are eligible for <strong>rescheduling once without charge</strong>.</li>
                    <li>• Cancellations <strong>within 24 hours</strong> or <strong>no-shows</strong> will be <strong>non-refundable</strong>.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-[#A0522D] mb-3">Retreats / Residential Programs:</h3>
                  <ul className="space-y-2 text-lg leading-relaxed ml-4">
                    <li>• Cancellations made at least <strong>7 days in advance</strong> will receive a <strong>50% refund</strong> or <strong>full credit</strong> toward a future retreat (valid for 90 days).</li>
                    <li>• Cancellations made <strong>within 7 days</strong> are <strong>non-refundable</strong>.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">4. Cancellations by CH2</h2>
              <p className="text-lg leading-relaxed mb-4">
                In the rare event that CH2 cancels or reschedules a program due to unforeseen circumstances (facilitator unavailability, health, natural calamity, etc.), participants will be offered:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>A full refund, or</li>
                <li>Transfer to another program / date at no additional cost.</li>
              </ul>
              <p className="text-lg leading-relaxed mt-4">
                <strong>Note:</strong> CH2 is not liable for any travel, accommodation, or incidental expenses incurred by the participant.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">5. Refund Timelines</h2>
              <ul className="space-y-3 text-lg leading-relaxed">
                <li>Approved refunds will be processed within <strong>7–10 working days</strong> through the original payment method (Razorpay or bank transfer).</li>
                <li>In case of delays from payment gateways or banks, CH2 will assist in tracking but cannot be held responsible for external processing timelines.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">6. Non-Refundable Items</h2>
              <p className="text-lg leading-relaxed mb-4">
                The following items are non-refundable:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>Digital downloads, online course content, or partially completed programs.</li>
                <li>Donations made to CH2 World Foundation or its projects (Shakti, Swaraj, Samarpan, etc.).</li>
                <li>Membership fees once activated.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">7. Policy for Gift Vouchers / Credits</h2>
              <ul className="space-y-3 text-lg leading-relaxed">
                <li>Credits or vouchers issued in lieu of cancellations are <strong>non-transferable</strong> and valid for the specified period only.</li>
                <li>They <strong>cannot be exchanged for cash</strong> or extended beyond the validity date.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">8. Dispute Resolution</h2>
              <p className="text-lg leading-relaxed mb-4">
                Any disputes or refund concerns can be raised by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg leading-relaxed">
                <li>Emailing <a href="mailto:mehrraaha@gmail.com" className="text-[#A0522D] hover:underline">mehrraaha@gmail.com</a></li>
                <li>Contacting the CH2 office at Koregaon Park, Pune</li>
              </ul>
              <p className="text-lg leading-relaxed mt-4">
                All matters are subject to <strong>Pune jurisdiction</strong>.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-3xl font-semibold text-[#A0522D] mb-4">9. Contact Information</h2>
              <div className="bg-[#f9f5f0] p-6 rounded-lg">
                <p className="text-lg leading-relaxed mb-2">
                  <strong>CH2 World Foundation</strong>
                </p>
                <p className="text-lg leading-relaxed mb-2">
                  D4, Riverside Sultanat, Lane G, Koregaon Park, Pune, India
                </p>
                <p className="text-lg leading-relaxed mb-2">
                  Email: <a href="mailto:mehrraaha@gmail.com" className="text-[#A0522D] hover:underline">mehrraaha@gmail.com</a>
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




