import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { Calendar, X } from "lucide-react";
import { CREATE_ORDER_FUNCTION_URL, VERIFY_PAYMENT_FUNCTION_URL, CREATE_BOOKING_FUNCTION_URL } from "../lib/supabase";
import { RAZORPAY_KEY_ID } from "../config/razorpay";

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplam1nYmtpemFzbmt4aXZvYnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTEzODksImV4cCI6MjA3NzAyNzM4OX0.yoJE8kMx6Dn8db5RjtmBMeDc_BXsfUNnG_OTl4NMrhQ';

// Load Razorpay script dynamically
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

// Declare Razorpay type
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const BookYourStayPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("2025-09-29");
  const [checkOut, setCheckOut] = useState("2025-09-30");
  const [adults, setAdults] = useState("1");
  const [promoCode, setPromoCode] = useState("");
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  // Price per night (in rupees)
  const pricePerNight = 3420;
  const nights = calculateNights();
  const totalAmount = pricePerNight * nights * parseInt(adults);

  const handleBookNow = () => {
    // Validate dates
    if (!checkIn || !checkOut) {
      setMessage({ type: 'error', text: 'Please select check-in and check-out dates' });
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setMessage({ type: 'error', text: 'Check-out date must be after check-in date' });
      return;
    }

    // Show customer info modal
    setShowCustomerModal(true);
  };

  const handlePayment = async () => {
    // Validate customer data
    if (!customerData.name || !customerData.email || !customerData.phone) {
      setMessage({ type: 'error', text: 'Please fill in all customer details' });
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      // Load Razorpay script
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        setMessage({ type: 'error', text: 'Failed to load payment gateway. Please refresh the page.' });
        setSubmitting(false);
        return;
      }

      // Convert amount to paise
      const amountInPaise = Math.round(totalAmount * 100);

      if (amountInPaise <= 0) {
        setMessage({ type: 'error', text: 'Invalid amount. Please check your dates and number of guests.' });
        setSubmitting(false);
        return;
      }

      // Step 1: Create Razorpay order
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

      // Step 2: Format phone number
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

      // Step 3: Initialize Razorpay checkout
      const description = `Stay Booking - ${nights} night(s) for ${adults} adult(s)`;
      
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
                event_name: 'MEHR Stay Booking',
                event_date: checkIn,
                amount: totalAmount.toString(),
                fee: '0',
                total: totalAmount.toString(),
                customer_name: customerData.name,
                payment_method: 'Razorpay',
                payment_page: '/book-your-stay',
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
                event_name: 'MEHR Stay Booking',
                event_date: checkIn,
                amount: totalAmount.toString(),
                fee: '0',
                total: totalAmount.toString(),
                customer_name: customerData.name,
                payment_method: 'Razorpay',
                payment_page: '/book-your-stay',
              });
              setSubmitting(false);
              navigate(`/payment/failed?${failedParams.toString()}`);
              return;
            }

            // Step 4: Verify payment signature
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
                event_name: 'MEHR Stay Booking',
                event_date: checkIn,
                amount: totalAmount.toString(),
                fee: '0',
                total: totalAmount.toString(),
                customer_name: customerData.name,
                payment_method: 'Razorpay',
                payment_page: '/book-your-stay',
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
                event_name: 'MEHR Stay Booking',
                event_date: checkIn,
                amount: totalAmount.toString(),
                fee: '0',
                total: totalAmount.toString(),
                customer_name: customerData.name,
                payment_method: 'Razorpay',
                payment_page: '/book-your-stay',
              });
              setSubmitting(false);
              navigate(`/payment/failed?${failedParams.toString()}`);
              return;
            }

            // Step 5: Save booking to database
            const bookingData = {
              event_id: null,
              event_title: 'MEHR Stay Booking',
              event_date: checkIn,
              selected_slot: `${nights} night(s) - ${adults} adult(s)`,
              price: `₹${totalAmount.toLocaleString('en-IN')} (${nights} night(s) × ${adults} adult(s))`,
              customer_name: customerData.name,
              customer_email: customerData.email,
              customer_phone: customerData.phone,
              status: 'confirmed',
              notes: `Check-in: ${checkIn}, Check-out: ${checkOut}, Nights: ${nights}, Adults: ${adults}${promoCode ? `, Promo Code: ${promoCode}` : ''}`,
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

            // Redirect to payment success page with all details
            const successParams = new URLSearchParams({
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              event_name: 'MEHR Stay Booking',
              event_date: checkIn,
              amount: totalAmount.toString(),
              fee: '0',
              total: totalAmount.toString(),
              customer_name: customerData.name,
              payment_method: 'Razorpay',
            });
            
            navigate(`/payment/success?${successParams.toString()}`);

          } catch (error: any) {
            console.error('Payment processing error:', error);
            const failedParams = new URLSearchParams({
              order_id: order.id || 'N/A',
              payment_id: 'N/A',
              error: error.message || 'An error occurred during payment processing. Please contact support.',
              event_name: 'MEHR Stay Booking',
              event_date: checkIn,
              amount: totalAmount.toString(),
              fee: '0',
              total: totalAmount.toString(),
              customer_name: customerData.name,
              payment_method: 'Razorpay',
              payment_page: '/book-your-stay',
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
          color: "#ab4b28"
        },
        modal: {
          ondismiss: function() {
            setSubmitting(false);
            setMessage({ type: '', text: '' });
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      razorpay.on('payment.failed', function (response: any) {
        // Redirect to payment failed page
        const failedParams = new URLSearchParams({
          order_id: order.id || 'N/A',
          payment_id: response.razorpay_payment_id || 'N/A',
          error: response.error?.description || response.error?.reason || 'Payment failed. Please try again.',
          event_name: 'MEHR Stay Booking',
          event_date: checkIn,
          amount: totalAmount.toString(),
          fee: '0',
          total: totalAmount.toString(),
          customer_name: customerData.name,
          payment_method: 'Razorpay',
          payment_page: '/book-your-stay',
        });
        
        navigate(`/payment/failed?${failedParams.toString()}`);
        setSubmitting(false);
      });

    } catch (error: any) {
      console.error('Payment initialization error:', error);
      const failedParams = new URLSearchParams({
        order_id: 'N/A',
        payment_id: 'N/A',
        error: error.message || 'Failed to initialize payment. Please try again.',
        event_name: 'MEHR Stay Booking',
        event_date: checkIn,
        amount: totalAmount.toString(),
        fee: '0',
        total: totalAmount.toString(),
        customer_name: customerData.name,
        payment_method: 'Razorpay',
        payment_page: '/book-your-stay',
      });
      setSubmitting(false);
      navigate(`/payment/failed?${failedParams.toString()}`);
    }
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
          <div className="flex-1 bg-[#FFDAB9] flex items-center justify-center lg:justify-start px-4 sm:px-6 lg:pl-16 pt-8 sm:pt-12 lg:pt-0 pb-8 lg:py-0">
            <div className="w-full lg:max-w-[570px] text-left">
              <h1 className="text-[#A0522D] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] font-normal leading-tight [font-family:'Poppins']">
                BOOK YOUR<br />STAY
              </h1>
            </div>
          </div>
          <div className="flex-1 w-full">
            <img 
              src="https://meher.b-cdn.net/DSC00893%20copy.jpg"
              alt="Book Your Stay" 
              className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Booking Form Section - Dark Transparent */}
      <div className="w-full flex justify-center -mt-8 lg:-mt-12 relative z-10 px-4 sm:px-6">
        <div className="w-full max-w-[1000px] bg-black/70 backdrop-blur-sm rounded-lg p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-3 lg:gap-4">
            {/* Check In */}
            <div className="flex-1 w-full lg:w-auto min-w-[140px]">
              <label className="block text-white text-xs sm:text-sm font-medium mb-1.5 [font-family:'Poppins',Helvetica]">
                Check In
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3 py-3 pr-9 bg-white rounded-lg text-[#24312e] text-sm [font-family:'Poppins',Helvetica] focus:outline-none focus:ring-2 focus:ring-[#ab4b28] [color-scheme:light] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
                <Calendar className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex-1 w-full lg:w-auto min-w-[140px]">
              <label className="block text-white text-xs sm:text-sm font-medium mb-1.5 [font-family:'Poppins',Helvetica]">
                Check Out
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn}
                  className="w-full px-3 py-3 pr-9 bg-white rounded-lg text-[#24312e] text-sm [font-family:'Poppins',Helvetica] focus:outline-none focus:ring-2 focus:ring-[#ab4b28] [color-scheme:light] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
                <Calendar className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Adults */}
            <div className="flex-1 w-full lg:w-auto min-w-[100px]">
              <label className="block text-white text-xs sm:text-sm font-medium mb-1.5 [font-family:'Poppins',Helvetica]">
                Adults
              </label>
              <div className="relative">
                <select
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  className="w-full px-3 py-3 pr-9 bg-white rounded-lg text-[#24312e] text-sm [font-family:'Poppins',Helvetica] focus:outline-none focus:ring-2 focus:ring-[#ab4b28] appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num.toString()}>
                      {num}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Promo Code */}
            <div className="flex-1 w-full lg:w-auto min-w-[140px]">
              <label className="block text-white text-xs sm:text-sm font-medium mb-1.5 [font-family:'Poppins',Helvetica]">
                Promo Code
              </label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="w-full px-3 py-3 bg-white rounded-lg text-[#24312e] text-sm [font-family:'Poppins',Helvetica] focus:outline-none focus:ring-2 focus:ring-[#ab4b28]"
              />
            </div>

            {/* Price and Book Now Button */}
            <div className="flex flex-col items-start lg:items-end gap-2 w-full lg:w-auto lg:min-w-[180px]">
              <div className="text-white text-xs sm:text-sm [font-family:'Poppins',Helvetica]">
                {totalAmount > 0 ? `₹${totalAmount.toLocaleString('en-IN')} (${nights} night${nights > 1 ? 's' : ''})` : 'From 3420 Rs/Night'}
              </div>
              <button
                onClick={handleBookNow}
                disabled={submitting}
                className="w-full lg:w-auto px-6 lg:px-8 py-2.5 lg:py-3 bg-[#ab4b28] hover:bg-[#8b3a1f] disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg text-sm lg:text-base font-semibold [font-family:'Poppins',Helvetica] transition-colors duration-200"
              >
                {submitting ? 'Processing...' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-white w-full overflow-x-hidden pt-8 lg:pt-16">
        {/* Accommodation Options Section */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
          <h2 className="text-left [font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-[24px] sm:text-[32px] lg:text-[40px] tracking-[0] leading-tight mb-6 lg:mb-8">
            OUR ACCOMMODATION OPTIONS
          </h2>
          <p className="text-left [font-family:'Poppins',Helvetica] font-light text-[#555555] text-[16px] sm:text-[18px] lg:text-[20px] leading-[24px] sm:leading-[28px] lg:leading-[32px] w-full">
            Spread across three beautifully appointed hotel-style residences - Lhasa Inn & Kathmandu - Menla's elegant deluxe private rooms and suites with en suite bathrooms can accommodate one to four guests each. All rooms feature queen and/or twin beds, made up with high thread count organic linens, as well as air conditioning (May through September), comfy chairs, writing desk, dresser, telephone, free high-speed wifi, original artwork, and Tibetan accents.
          </p>
        </div>

        {/* Accommodation Option - Classic Room */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
          <h2 className="text-left [font-family:'Poppins',Helvetica] font-bold text-[#ab4b28] text-[24px] sm:text-[32px] lg:text-[40px] mb-8">
            Classic Room
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Classic Room: Earth & Clay */}
            <Link to="/book-stay/earth-and-clay" className="flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="overflow-hidden rounded-lg mb-6">
                <img 
                  src="https://meher.b-cdn.net/Experience%20Menla%20Retreat%20and%20Dewa%20Spa%20in%20Phoenicia%2C%20New%20York%20(2).png"
                  alt="Earth & Clay Classic Room"
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-[#ab4b28] font-bold text-xl sm:text-2xl mb-2 [font-family:'Poppins',Helvetica] uppercase text-center">
                EARTH & CLAY
              </h3>
              <p className="text-[#ab4b28] font-normal text-lg mb-4 [font-family:'Poppins',Helvetica] text-center">
                At Rs. 3200
              </p>
              <p className="text-[#1E1E1E] font-light text-sm sm:text-base leading-relaxed mb-6 [font-family:'Poppins',Helvetica] text-center">
                Warm, grounding, and nurturing — this space embraces the calm strength of terracotta and soft clay tones. Mud-textured walls, linen drapes, and jute details create a cocoon of warmth and stillness — a gentle return to your roots.
              </p>
              <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-[#ab4b28]"></div>
              </div>
            </Link>
          </div>
        </div>

        {/* Deluxe Room Section */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
          <h2 className="text-left [font-family:'Poppins',Helvetica] font-bold text-[#ab4b28] text-[24px] sm:text-[32px] lg:text-[40px] mb-8">
            Deluxe Room
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Room 1: Bloom and Herbs */}
            <Link to="/book-stay/bloom-and-herbs" className="flex flex-col md:border-r md:border-gray-300 md:pr-8 lg:pr-12 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer" style={{ borderRightWidth: '1px', borderRightColor: 'rgba(0, 0, 0, 0.1)' }}>
              <div className="overflow-hidden rounded-lg mb-6">
                <img 
                  src="https://meher.b-cdn.net/DSC00941.jpg"
                  alt="Bloom and Herbs Room"
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-[#ab4b28] font-bold text-xl sm:text-2xl mb-2 [font-family:'Poppins',Helvetica] uppercase text-center">
                BLOOM AND HERBS
              </h3>
              <p className="text-[#ab4b28] font-normal text-lg mb-4 [font-family:'Poppins',Helvetica] text-center">
                At Rs. 3200
              </p>
              <p className="text-[#1E1E1E] font-light text-sm sm:text-base leading-relaxed mb-6 [font-family:'Poppins',Helvetica] text-center">
                Soft, feminine, and therapeutic — where the scent of lavender meets the calm of sage. Blush and cream tones with herbal accents awaken gentle rejuvenation — a reminder that healing can be tender.
              </p>
              <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-[#ab4b28]"></div>
              </div>
            </Link>

            {/* Room 2: Stone and Fog */}
            <Link to="/book-stay/stone-and-fog" className="flex flex-col md:border-r md:border-gray-300 md:pr-8 lg:pr-12 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer" style={{ borderRightWidth: '1px', borderRightColor: 'rgba(0, 0, 0, 0.1)' }}>
              <div className="overflow-hidden rounded-lg mb-6">
                <img 
                  src="https://meher.b-cdn.net/DSC00969.jpg"
                  alt="Stone and Fog Room"
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-[#ab4b28] font-bold text-xl sm:text-2xl mb-2 [font-family:'Poppins',Helvetica] uppercase text-center">
                STONE AND FOG
              </h3>
              <p className="text-[#ab4b28] font-normal text-lg mb-4 [font-family:'Poppins',Helvetica] text-center">
                At Rs. 2500
              </p>
              <p className="text-[#1E1E1E] font-light text-sm sm:text-base leading-relaxed mb-6 [font-family:'Poppins',Helvetica] text-center">
                Masculine, meditative, and minimal — inspired by mountain stillness and misty mornings. Charcoal hues, stone textures, and simple linen bring quiet clarity — perfect for contemplation and grounding energy.
              </p>
              <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-[#ab4b28]"></div>
              </div>
            </Link>

            {/* Room 3: Golden Grasslands */}
            <div className="flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="overflow-hidden rounded-lg mb-6">
                <img 
                  src="https://meher.b-cdn.net/DSC00890%20copy.jpg"
                  alt="Golden Grasslands Room"
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-[#ab4b28] font-bold text-xl sm:text-2xl mb-2 [font-family:'Poppins',Helvetica] uppercase text-center">
                GOLDEN GRASSLANDS
              </h3>
              <p className="text-[#ab4b28] font-normal text-lg mb-4 [font-family:'Poppins',Helvetica] text-center">
                At Rs. 3200
              </p>
              <p className="text-[#1E1E1E] font-light text-sm sm:text-base leading-relaxed mb-6 [font-family:'Poppins',Helvetica] text-center">
                Cheerful, rustic, and abundant — a celebration of sunlight and simplicity. Ochre, wheat, and leaf-green accents bring warmth and openness, echoing the energy of harvest and gratitude.
              </p>
              <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-[#ab4b28]"></div>
              </div>
            </div>
          </div>

          {/* Horizontal line below rooms */}
          <div className="w-full mt-8 lg:mt-12" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}></div>

          {/* Next Row: Forest Bathing and Water and Sky */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-8 lg:mt-12">
            {/* Room 4: Forest Bathing */}
            <div className="flex flex-col md:border-r md:border-gray-300 md:pr-8 lg:pr-12 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer" style={{ borderRightWidth: '1px', borderRightColor: 'rgba(0, 0, 0, 0.1)' }}>
              <div className="overflow-hidden rounded-lg mb-6">
                <img 
                  src="https://meher.b-cdn.net/DSC00829.jpg"
                  alt="Forest Bathing Room"
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-[#ab4b28] font-bold text-xl sm:text-2xl mb-2 [font-family:'Poppins',Helvetica] uppercase text-center">
                FOREST BATHING
              </h3>
              <p className="text-[#ab4b28] font-normal text-lg mb-4 [font-family:'Poppins',Helvetica] text-center">
                At Rs. 3200
              </p>
              <p className="text-[#1E1E1E] font-light text-sm sm:text-base leading-relaxed mb-6 [font-family:'Poppins',Helvetica] text-center">
                Calm, reflective, and immersive – inspired by the serenity of the woods. Shades of moss, fern, and bark brown bring the forest indoors, inviting you to slow down, breathe deeper, and reconnect with nature's rhythm.
              </p>
              <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-[#ab4b28]"></div>
              </div>
            </div>

            {/* Room 5: Water and Sky */}
            <div className="flex flex-col md:border-r md:border-gray-300 md:pr-8 lg:pr-12 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer" style={{ borderRightWidth: '1px', borderRightColor: 'rgba(0, 0, 0, 0.1)' }}>
              <div className="overflow-hidden rounded-lg mb-6">
                <img 
                  src="https://meher.b-cdn.net/DSC00893%20copy.jpg"
                  alt="Water and Sky Room"
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-[#ab4b28] font-bold text-xl sm:text-2xl mb-2 [font-family:'Poppins',Helvetica] uppercase text-center">
                WATER AND SKY
              </h3>
              <p className="text-[#ab4b28] font-normal text-lg mb-4 [font-family:'Poppins',Helvetica] text-center">
                At Rs. 3200
              </p>
              <p className="text-[#1E1E1E] font-light text-sm sm:text-base leading-relaxed mb-6 [font-family:'Poppins',Helvetica] text-center">
                Cool, serene, and fluid – this room mirrors the clarity of open skies and flowing rivers. Indigo and mist tones with light blue drapes create a space that soothes the mind, balances emotions, and restores inner flow.
              </p>
              <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-[#ab4b28]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Info Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6 relative">
            <button
              onClick={() => {
                setShowCustomerModal(false);
                setMessage({ type: '', text: '' });
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-[#24312e] mb-6 [font-family:'Poppins',Helvetica]">
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
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Nights:</span>
                  <span className="font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">{nights}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Adults:</span>
                  <span className="font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">{adults}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                  <span className="text-base font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">Total Amount:</span>
                  <span className="text-xl font-bold text-[#ab4b28] [font-family:'Poppins',Helvetica]">₹{totalAmount.toLocaleString('en-IN')}</span>
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

