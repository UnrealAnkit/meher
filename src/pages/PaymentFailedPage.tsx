import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { CreditCard, X, ArrowLeft } from "lucide-react";

export const PaymentFailedPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  
  // Get payment details from URL parameters
  const transactionNo = searchParams.get('transaction_no') || searchParams.get('order_id') || '123456789';
  const errorMessage = searchParams.get('error') || 'There was a problem with your payment method. Please try again or change your payment methods.';
  const eventName = searchParams.get('event_name') || 'Booking';
  const eventDate = searchParams.get('event_date') || new Date().toLocaleDateString();
  const amount = searchParams.get('amount') || '0';
  const paymentPage = searchParams.get('payment_page') || '/book-your-stay';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="w-full">
        <NavbarSection />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-[#FFDAB9] rounded-lg p-6 sm:p-8 lg:p-12 relative">
          {/* Go Back Link */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-[#ab4b28] hover:text-[#8b3a1f] mb-6 [font-family:'Poppins',Helvetica] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            GO BACK
          </Link>

          {/* Failed Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CreditCard className="w-20 h-20 sm:w-24 sm:h-24 text-gray-800" strokeWidth={1.5} />
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
                <X className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Failed Message */}
          <div className="text-center mb-8">
            <h1 className="text-[#ab4b28] font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 [font-family:'Poppins',Helvetica] uppercase">
              PAYMENT FAILED
            </h1>
            <p className="text-[#ab4b28] text-base sm:text-lg leading-relaxed [font-family:'Poppins',Helvetica] max-w-xl mx-auto">
              {errorMessage}
            </p>
          </div>

          {/* Transaction Details */}
          <div className="bg-white/50 rounded-lg p-4 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-medium">Transaction No.:</span>
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-semibold">{transactionNo}</span>
              </div>
              {eventName && (
                <div className="flex justify-between items-center">
                  <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-medium">Event Name:</span>
                  <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-semibold">{eventName}</span>
                </div>
              )}
              {eventDate && (
                <div className="flex justify-between items-center">
                  <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-medium">Event Date:</span>
                  <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-semibold">{eventDate}</span>
                </div>
              )}
              {amount && amount !== '0' && (
                <div className="flex justify-between items-center pt-2 border-t border-[#ab4b28]/20">
                  <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-medium">Amount:</span>
                  <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-semibold">₹{parseInt(amount).toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to={paymentPage}
              className="flex-1 bg-[#ab4b28] hover:bg-[#8b3a1f] text-white py-3 rounded-lg font-semibold text-center transition-colors [font-family:'Poppins',Helvetica]"
            >
              Back To Payment Page
            </Link>
            <Link
              to="/"
              className="flex-1 bg-transparent border-2 border-[#ab4b28] text-[#ab4b28] hover:bg-[#ab4b28] hover:text-white py-3 rounded-lg font-semibold text-center transition-colors [font-family:'Poppins',Helvetica]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

