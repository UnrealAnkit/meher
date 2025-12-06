import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';
import { supabase, CREATE_ORDER_FUNCTION_URL, VERIFY_PAYMENT_FUNCTION_URL, CREATE_BOOKING_FUNCTION_URL } from '../../lib/supabase';
import { RAZORPAY_KEY_ID } from '../../config/razorpay';

// Supabase anon key for Edge Function authentication
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

interface SoundHealingBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoundHealingBookingModal: React.FC<SoundHealingBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Pricing - Sound Healing Level 1
  const programFee = 13000;
  const gstRate = 0.18; // 18% GST
  const gstAmount = programFee * gstRate;
  const totalWithGST = programFee + gstAmount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: '', text: '' });

    // Validate dates
    if (!checkInDate || !checkOutDate) {
      setMessage({ type: 'error', text: 'Please select check-in and check-out dates' });
      setSubmitting(false);
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setMessage({ type: 'error', text: 'Check-out date must be after check-in date' });
      setSubmitting(false);
      return;
    }

    try {
      const priceString = `₹${Math.round(totalWithGST).toLocaleString('en-IN')} (Including GST)`;
      const programTitle = 'Sound Healing Training Workshop (3 Levels) - Level 1: Sounds for Self';
      
      // Save booking to Supabase
      const { error } = await supabase.from('bookings').insert([
        {
          event_id: null,
          event_title: programTitle,
          event_date: checkInDate,
          selected_slot: 'Level 1: Sounds for Self',
          price: priceString,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phoneNumber,
          status: 'pending',
          notes: `Check-in: ${checkInDate}, Check-out: ${checkOutDate}, Subtotal: ₹${programFee.toLocaleString('en-IN')}, GST (18%): ₹${Math.round(gstAmount).toLocaleString('en-IN')}, Total: ₹${Math.round(totalWithGST).toLocaleString('en-IN')}`,
        },
      ]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Booking submitted successfully! We will contact you soon.' });
      
      // Reset form and close modal after 2 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', phoneNumber: '' });
        setCheckInDate('');
        setCheckOutDate('');
        setSubmitting(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error submitting booking:', err);
      setMessage({ type: 'error', text: 'Failed to submit booking. Please try again.' });
      setSubmitting(false);
    }
  };

  const handlePayNow = async () => {
    // Validate form fields
    if (!formData.name || !formData.email || !formData.phoneNumber) {
      setMessage({ type: 'error', text: 'Please fill in all fields before proceeding to payment.' });
      return;
    }

    // Validate dates
    if (!checkInDate || !checkOutDate) {
      setMessage({ type: 'error', text: 'Please select check-in and check-out dates' });
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setMessage({ type: 'error', text: 'Check-out date must be after check-in date' });
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

      // Convert amount to paise (GST already calculated above)
      const amountInPaise = Math.round(totalWithGST * 100);

      if (amountInPaise <= 0) {
        setMessage({ type: 'error', text: 'Invalid amount. Please check your selection.' });
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
      const programTitle = 'Sound Healing Training Workshop (3 Levels) - Level 1: Sounds for Self';
      const description = `${programTitle} - Level 1: Sounds for Self`;
      
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "MEHR Sound Healing Training",
        description: description,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            if (response.error) {
              setMessage({ 
                type: 'error', 
                text: `Payment failed: ${response.error.description || 'Unknown error'}. Please try again.` 
              });
              setSubmitting(false);
              return;
            }

            if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
              setMessage({ 
                type: 'error', 
                text: 'Payment response is incomplete. Please contact support.' 
              });
              setSubmitting(false);
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
              setMessage({ 
                type: 'error', 
                text: `Payment verification failed: ${verifyError.error || 'Unknown error'}. Please contact support with Payment ID: ${response.razorpay_payment_id}`
              });
              setSubmitting(false);
              return;
            }

            const verifyResult = await verifyResponse.json();
            
            if (!verifyResult.success && !verifyResult.verified) {
              setMessage({ 
                type: 'error', 
                text: `Payment verification failed: ${verifyResult.error || 'Invalid signature'}. Please contact support.`
              });
              setSubmitting(false);
              return;
            }

            // Step 5: Save booking to database
            const priceString = `₹${Math.round(totalWithGST).toLocaleString('en-IN')} (Including GST)`;
            const bookingData = {
              event_id: null,
              event_title: programTitle,
              event_date: '2026-01-03',
              selected_slot: 'Level 1: Sounds for Self',
              price: priceString,
              customer_name: formData.name,
              customer_email: formData.email,
              customer_phone: formData.phoneNumber,
              status: 'confirmed',
              notes: `Subtotal: ₹${programFee.toLocaleString('en-IN')}, GST (18%): ₹${Math.round(gstAmount).toLocaleString('en-IN')}, Total: ₹${Math.round(totalWithGST).toLocaleString('en-IN')}, Payment ID: ${response.razorpay_payment_id}`,
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

            // Redirect to payment success page
            const successParams = new URLSearchParams({
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              event_name: programTitle,
              event_date: '2026-01-03',
              amount: Math.round(totalWithGST).toString(),
              fee: '0',
              total: Math.round(totalWithGST).toString(),
              customer_name: formData.name,
              payment_method: 'Razorpay',
            });
            
            onClose();
            navigate(`/payment/success?${successParams.toString()}`);

          } catch (error: any) {
            console.error('Payment processing error:', error);
            setMessage({ 
              type: 'error', 
              text: error.message || 'An error occurred during payment processing. Please contact support.' 
            });
            setSubmitting(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formatPhoneNumber(formData.phoneNumber),
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
        const programTitle = 'Sound Healing Training Workshop (3 Levels) - Level 1: Sounds for Self';
        const failedParams = new URLSearchParams({
          transaction_no: order.id || 'N/A',
          error: response.error?.description || response.error?.reason || 'Payment failed. Please try again.',
          event_name: programTitle,
          event_date: '2026-01-03',
          amount: Math.round(totalWithGST).toString(),
          payment_page: '/sound-healing',
        });
        
        onClose();
        navigate(`/payment/failed?${failedParams.toString()}`);
        setSubmitting(false);
      });

    } catch (error: any) {
      console.error('Payment initialization error:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to initialize payment. Please try again.' 
      });
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#A0522D] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold uppercase">BOOK SOUND HEALING TRAINING</h2>
          </div>
          <button
            onClick={onClose}
            className="hover:opacity-80 transition-opacity"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Program Details */}
          <div className="bg-[#FFF8F0] rounded-lg p-6 mb-6">
            <h3 className="text-[#A0522D] text-2xl font-bold mb-2">
              Sound Healing Training Workshop (3 Levels)
            </h3>
            <p className="text-[#1E1E1E] text-base mb-6">
              Level 1: Sounds for Self - 3rd & 4th January 2026
            </p>

            {/* Fees Breakdown */}
            <div className="border-t border-gray-300 pt-4 space-y-2">
              <div className="flex justify-between text-[#1E1E1E]">
                <span>Sound Healing Training Program Fee</span>
                <span>₹{programFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#1E1E1E]">
                <span>GST (18%)</span>
                <span>₹{Math.round(gstAmount).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Total Price */}
            <div className="border-t-2 border-[#A0522D] mt-4 pt-4 flex justify-between items-center">
              <span className="text-[#A0522D] font-bold text-lg">TOTAL PRICE (Including GST)</span>
              <span className="text-[#A0522D] font-bold text-2xl">₹{Math.round(totalWithGST).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Message */}
          {message.text && (
            <div
              className={`mb-4 p-3 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 border-l-4 border-green-500 text-green-700'
                  : 'bg-red-50 border-l-4 border-red-500 text-red-700'
              } [font-family:'Poppins'] text-sm`}
            >
              {message.text}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#1E1E1E] text-sm font-medium mb-2 [font-family:'Poppins']">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter Your Name"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg border-2 border-transparent focus:border-[#A0522D] focus:outline-none [font-family:'Poppins']"
              />
            </div>

            <div>
              <label className="block text-[#1E1E1E] text-sm font-medium mb-2 [font-family:'Poppins']">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter Your Email"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg border-2 border-transparent focus:border-[#A0522D] focus:outline-none [font-family:'Poppins']"
              />
            </div>

            <div>
              <label className="block text-[#1E1E1E] text-sm font-medium mb-2 [font-family:'Poppins']">
                Mobile Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="Enter Your Mobile Number"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg border-2 border-transparent focus:border-[#A0522D] focus:outline-none [font-family:'Poppins']"
              />
            </div>

            <div>
              <label className="block text-[#1E1E1E] text-sm font-medium mb-2 [font-family:'Poppins']">
                Check-in Date
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-gray-100 rounded-lg border-2 border-transparent focus:border-[#A0522D] focus:outline-none [font-family:'Poppins']"
              />
            </div>

            <div>
              <label className="block text-[#1E1E1E] text-sm font-medium mb-2 [font-family:'Poppins']">
                Check-out Date
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                required
                min={checkInDate || new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-gray-100 rounded-lg border-2 border-transparent focus:border-[#A0522D] focus:outline-none [font-family:'Poppins']"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#A0522D] hover:bg-[#8b3a1f] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold uppercase [font-family:'Poppins'] transition-colors"
              >
                {submitting ? 'Submitting...' : 'SUBMIT BOOKING'}
              </button>
              <button
                type="button"
                onClick={handlePayNow}
                disabled={submitting}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold uppercase [font-family:'Poppins'] transition-colors"
              >
                {submitting ? 'Processing...' : 'PAY NOW'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};



