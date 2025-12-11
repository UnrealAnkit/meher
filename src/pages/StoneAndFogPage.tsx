import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { X } from "lucide-react";
import { CREATE_ORDER_FUNCTION_URL, VERIFY_PAYMENT_FUNCTION_URL, CREATE_BOOKING_FUNCTION_URL } from "../lib/supabase";
import { RAZORPAY_KEY_ID } from "../config/razorpay";

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplam1nYmtpemFzbmt4aXZvYnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTEzODksImV4cCI6MjA3NzAyNzM4OX0.yoJE8kMx6Dn8db5RjtmBMeDc_BXsfUNnG_OTl4NMrhQ';

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const StoneAndFogPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const price = 2500;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  async function handlePayment() {
    
    if (!customerData.name || !customerData.email || !customerData.phone) {
      setMessage({ type: 'error', text: 'Please fill in all customer details' });
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        setMessage({ type: 'error', text: 'Failed to load payment gateway. Please refresh the page.' });
        setSubmitting(false);
        return;
      }

      const amountInPaise = Math.round(price * 100);

      if (amountInPaise <= 0) {
        setMessage({ type: 'error', text: 'Invalid amount.' });
        setSubmitting(false);
        return;
      }

      const orderResponse = await fetch(CREATE_ORDER_FUNCTION_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR"
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json().catch(() => ({ error: 'Unknown error' }));
        setMessage({ type: 'error', text: errorData.error || 'Failed to create payment order. Please try again.' });
        setSubmitting(false);
        return;
      }

      const order = await orderResponse.json();

      if (!order.id) {
        setMessage({ type: 'error', text: 'Failed to create payment order. Please try again.' });
        setSubmitting(false);
        return;
      }

      const formatPhoneNumber = (phone: string): string => {
        const digits = phone.replace(/\D/g, '');
        if (digits.length === 10) {
          return `+91${digits}`;
        } else if (digits.length > 10 && !digits.startsWith('91')) {
          return `+91${digits.slice(-10)}`;
        } else if (digits.startsWith('91')) {
          return `+${digits}`;
        }
        return phone.startsWith('+') ? phone : `+91${digits}`;
      };

      const description = `Stone and Fog Room Booking`;
      
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "MEHR Stay",
        description: description,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            if (response.error) {
              const failedParams = new URLSearchParams({
                order_id: order.id || 'N/A',
                payment_id: response.razorpay_payment_id || 'N/A',
                error: response.error.description || response.error.reason || 'Payment failed. Please try again.',
                event_name: 'Stone and Fog Room Booking',
                event_date: new Date().toLocaleDateString(),
                amount: price.toString(),
                fee: '0',
                total: price.toString(),
                customer_name: customerData.name,
                payment_method: 'Razorpay',
                payment_page: '/book-stay/stone-and-fog',
              });
              setSubmitting(false);
              navigate(`/payment/failed?${failedParams.toString()}`);
              return;
            }

            if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
              const failedParams = new URLSearchParams({
                order_id: order.id || 'N/A',
                payment_id: 'N/A',
                error: 'Payment response is incomplete. Please contact support.',
                event_name: 'Stone and Fog Room Booking',
                event_date: new Date().toLocaleDateString(),
                amount: price.toString(),
                fee: '0',
                total: price.toString(),
                customer_name: customerData.name,
                payment_method: 'Razorpay',
                payment_page: '/book-stay/stone-and-fog',
              });
              setSubmitting(false);
              navigate(`/payment/failed?${failedParams.toString()}`);
              return;
            }

            const verifyResponse = await fetch(VERIFY_PAYMENT_FUNCTION_URL, {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            if (!verifyResponse.ok) {
              const verifyError = await verifyResponse.json().catch(() => ({ error: 'Verification failed' }));
              const failedParams = new URLSearchParams({
                order_id: response.razorpay_order_id || order.id || 'N/A',
                payment_id: response.razorpay_payment_id || 'N/A',
                error: `Payment verification failed: ${verifyError.error || 'Unknown error'}. Please contact support.`,
                event_name: 'Stone and Fog Room Booking',
                event_date: new Date().toLocaleDateString(),
                amount: price.toString(),
                fee: '0',
                total: price.toString(),
                customer_name: customerData.name,
                payment_method: 'Razorpay',
                payment_page: '/book-stay/stone-and-fog',
              });
              setSubmitting(false);
              navigate(`/payment/failed?${failedParams.toString()}`);
              return;
            }

            const verifyResult = await verifyResponse.json();
            
            if (!verifyResult.success && !verifyResult.verified) {
              const failedParams = new URLSearchParams({
                order_id: response.razorpay_order_id || order.id || 'N/A',
                payment_id: response.razorpay_payment_id || 'N/A',
                error: `Payment verification failed: ${verifyResult.error || 'Invalid signature'}. Please contact support.`,
                event_name: 'Stone and Fog Room Booking',
                event_date: new Date().toLocaleDateString(),
                amount: price.toString(),
                fee: '0',
                total: price.toString(),
                customer_name: customerData.name,
                payment_method: 'Razorpay',
                payment_page: '/book-stay/stone-and-fog',
              });
              setSubmitting(false);
              navigate(`/payment/failed?${failedParams.toString()}`);
              return;
            }

            const bookingData = {
              event_id: null,
              event_title: 'Stone and Fog Room Booking',
              event_date: new Date().toLocaleDateString(),
              selected_slot: 'Stone and Fog Room',
              price: `₹${price.toLocaleString('en-IN')}`,
              customer_name: customerData.name,
              customer_email: customerData.email,
              customer_phone: customerData.phone,
              status: 'confirmed',
              notes: 'Stone and Fog Room Booking',
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
            };

            const bookingResponse = await fetch(CREATE_BOOKING_FUNCTION_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              },
              body: JSON.stringify(bookingData)
            });

            const bookingResponseData = await bookingResponse.json();

            if (!bookingResponse.ok || !bookingResponseData.success) {
              const errorMessage = bookingResponseData.error || bookingResponseData.details || 'Failed to create booking';
              throw new Error(`Database error: ${errorMessage}`);
            }

            const successParams = new URLSearchParams({
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              event_name: 'Stone and Fog Room Booking',
              event_date: new Date().toLocaleDateString(),
              amount: price.toString(),
              fee: '0',
              total: price.toString(),
              customer_name: customerData.name,
              payment_method: 'Razorpay',
            });

            setSubmitting(false);
            navigate(`/payment/success?${successParams.toString()}`);
          } catch (error: any) {
            console.error('Payment processing error:', error);
            const failedParams = new URLSearchParams({
              order_id: order.id || 'N/A',
              payment_id: 'N/A',
              error: error.message || 'An unexpected error occurred. Please contact support.',
              event_name: 'Stone and Fog Room Booking',
              event_date: new Date().toLocaleDateString(),
              amount: price.toString(),
              fee: '0',
              total: price.toString(),
              customer_name: customerData.name,
              payment_method: 'Razorpay',
              payment_page: '/book-stay/stone-and-fog',
            });
            setSubmitting(false);
            navigate(`/payment/failed?${failedParams.toString()}`);
          }
        },
        prefill: {
          name: customerData.name,
          email: customerData.email,
          contact: formatPhoneNumber(customerData.phone),
        },
        theme: {
          color: "#ab4b28",
        },
        modal: {
          ondismiss: function() {
            setSubmitting(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error('Payment initialization error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to initialize payment. Please try again.' });
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white overflow-hidden w-full relative min-h-screen flex flex-col">
      <NavbarSection />

      <section className="relative w-full bg-white">
        <video
          src="https://meher.b-cdn.net/Bloom%20%26%20Herbs.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover"
        />
      </section>

      <section className="relative w-full flex justify-center py-8 sm:py-12 md:py-16 lg:py-20 bg-white px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-7xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
            <h1 className="[font-family:'Poppins',Helvetica] font-normal text-[#ab4b28] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              STONE AND FOG
            </h1>
            
            <div className="flex-shrink-0">
              <div className="bg-[#f9d2a3] rounded-lg px-4 py-2 border-2 border-[#ab4b28] inline-block">
                <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-lg sm:text-xl">
                  ₹ 2500
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#7a574f] text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed w-full">
              Masculine, meditative, and beautifully minimal — a space inspired by the stillness of mountains and the quiet grace of misty mornings.
            </p>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#7a574f] text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed w-full">
              Charcoal tones, raw stone textures, and soft linen weave together a sense of strength and serenity.
            </p>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#7a574f] text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed w-full">
              It's a refuge of grounded energy — where silence speaks, thoughts settle, and the mind finds clarity in the calm simplicity of nature's design.
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-white px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-7xl mx-auto">
          
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-2xl sm:text-3xl md:text-4xl mb-6 lg:mb-8">
            ROOM VIEW
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:items-stretch">
            
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <img
                src="https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(25).png"
                alt="Stone and Fog Room View 1"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <img
                src="https://meher.b-cdn.net/Group%20Yoga%20class%20Marbella%20(26).png"
                alt="Stone and Fog Room View 2"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-8 sm:py-12 bg-white px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-7xl mx-auto flex justify-center">
          <button 
            onClick={() => setShowCustomerModal(true)}
            className="[font-family:'Poppins',Helvetica] bg-[#ab4b28] hover:bg-[#8b3a1f] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            PAY NOW
          </button>
        </div>
      </section>

      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowCustomerModal(false);
                setMessage({ type: '', text: '' });
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-[#ab4b28] mb-6 [font-family:'Poppins',Helvetica]">
              Customer Information
            </h2>

            {message.text && (
              <div
                className={`mb-4 p-3 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-50 border-l-4 border-green-500 text-green-700'
                    : 'bg-red-50 border-l-4 border-red-500 text-red-700'
                } [font-family:'Poppins',Helvetica] text-sm`}
              >
                {message.text}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerData.name}
                  onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={customerData.email}
                  onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="bg-[#f9f5f0] p-4 rounded-lg">
                <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                  <span className="text-base font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">Total Amount:</span>
                  <span className="text-xl font-bold text-[#ab4b28] [font-family:'Poppins',Helvetica]">₹{price.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={submitting || !customerData.name || !customerData.email || !customerData.phone}
                className="w-full bg-[#ab4b28] hover:bg-[#8b3a1f] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold [font-family:'Poppins',Helvetica] transition-colors duration-200"
              >
                {submitting ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  );
};

