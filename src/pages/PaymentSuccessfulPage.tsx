import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { CheckCircle, FileText, ArrowLeft } from "lucide-react";

export const PaymentSuccessfulPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();

  const paymentId = searchParams.get('payment_id') || 'N/A';
  const orderId = searchParams.get('order_id') || 'N/A';
  const eventName = searchParams.get('event_name') || 'Booking';
  const eventDate = searchParams.get('event_date') || new Date().toLocaleDateString();
  const amount = searchParams.get('amount') || '0';
  const fee = searchParams.get('fee') || '0';
  const total = searchParams.get('total') || amount;
  const customerName = searchParams.get('customer_name') || '';
  const paymentMethod = searchParams.get('payment_method') || 'Online Payment';

  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
  const formattedTime = now.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  }).replace(':', '.');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      <div className="w-full">
        <NavbarSection />
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-[#FFDAB9] rounded-lg p-6 sm:p-8 lg:p-12 relative">
          
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-[#ab4b28] hover:text-[#8b3a1f] mb-6 [font-family:'Poppins',Helvetica] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            GO BACK
          </Link>

          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 text-green-500" strokeWidth={2} />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-[#ab4b28] font-bold text-2xl sm:text-3xl lg:text-4xl mb-3 [font-family:'Poppins',Helvetica] uppercase">
              PAYMENT SUCCESSFUL
            </h1>
            <p className="text-[#ab4b28] text-lg sm:text-xl [font-family:'Poppins',Helvetica]">
              Thank You For Your Order!
            </p>
          </div>

          <div className="bg-[#f9d2a3] border-2 border-[#ab4b28] rounded-lg p-4 mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#ab4b28] flex-shrink-0" />
            <span className="text-[#ab4b28] font-semibold [font-family:'Poppins',Helvetica]">
              #{paymentId.substring(paymentId.length - 12) || orderId.substring(orderId.length - 12)}
            </span>
          </div>

          <div className="space-y-4 mb-6">
            <div className="border-b border-[#ab4b28]/20 pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-medium">Event Name:</span>
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-semibold">{eventName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-medium">Event Date:</span>
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-semibold">{eventDate}</span>
              </div>
            </div>

            <div className="border-b border-[#ab4b28]/20 pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-medium">Time/ Date:</span>
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-semibold">
                  {formattedDate}, {formattedTime}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-medium">Ref Number:</span>
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-semibold">{orderId}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-medium">Payment Method:</span>
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-semibold">{paymentMethod}</span>
              </div>
              {customerName && (
                <div className="flex justify-between items-center">
                  <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-medium">Sender Name:</span>
                  <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-semibold">{customerName}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-medium">Amount:</span>
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-semibold">₹{parseInt(amount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-medium">Fee:</span>
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-semibold">₹{parseInt(fee).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t-2 border-[#ab4b28]">
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-bold text-lg">Total:</span>
                <span className="text-[#ab4b28] [font-family:'Poppins',Helvetica] font-bold text-lg">₹{parseInt(total).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/"
              className="flex-1 bg-[#ab4b28] hover:bg-[#8b3a1f] text-white py-3 rounded-lg font-semibold text-center transition-colors [font-family:'Poppins',Helvetica]"
            >
              Back to Home
            </Link>
            <Link
              to="/calendar"
              className="flex-1 bg-transparent border-2 border-[#ab4b28] text-[#ab4b28] hover:bg-[#ab4b28] hover:text-white py-3 rounded-lg font-semibold text-center transition-colors [font-family:'Poppins',Helvetica]"
            >
              View Calendar
            </Link>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

