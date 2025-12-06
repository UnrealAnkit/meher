import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';
import { supabase, CREATE_ORDER_FUNCTION_URL, VERIFY_PAYMENT_FUNCTION_URL } from '../../lib/supabase';
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

interface RejuvenationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RejuvenationBookingModal: React.FC<RejuvenationBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [occupancyType, setOccupancyType] = useState<'double' | 'single'>('double');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Pricing breakdown
  const retreatFee = 16250;
  const stayDouble = 5000; // ₹2,500 per night x 2
  const staySingle = 7000; // ₹3,500 per night x 2
  const totalDouble = retreatFee + stayDouble; // ₹21,250
  const totalSingle = retreatFee + staySingle; // ₹23,250

  const selectedTotal = occupancyType === 'double' ? totalDouble : totalSingle;
  const selectedStay = occupancyType === 'double' ? stayDouble : staySingle;

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
      // Format price string with occupancy info
      const priceString = `₹${selectedTotal.toLocaleString('en-IN')} (${occupancyType === 'double' ? 'Double' : 'Single'} Occupancy)`;
      const selectedSlot = `${occupancyType === 'double' ? 'Double' : 'Single'} Occupancy - 3 Days / 2 Nights`;
      
      // Save booking to Supabase
      const { error } = await supabase.from('bookings').insert([
        {
          event_id: null, // No event_id for package bookings
          event_title: 'MEHR Rejuvenation Retreat - 3 Day Package',
          event_date: checkInDate, // Use check-in date
          selected_slot: selectedSlot,
          price: priceString,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phoneNumber,
          status: 'pending',
          notes: `Occupancy Type: ${occupancyType === 'double' ? 'Double' : 'Single'}, Check-in: ${checkInDate}, Check-out: ${checkOutDate}`,
        },
      ]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Booking submitted successfully! We will contact you soon.' });
      
      // Reset form and close modal after 2 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', phoneNumber: '' });
        setOccupancyType('double');
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

      // Validate amount before sending
      if (!selectedTotal || selectedTotal <= 0 || isNaN(selectedTotal)) {
        setMessage({ type: 'error', text: 'Invalid amount. Please select a valid package.' });
        setSubmitting(false);
        return;
      }

      // Convert amount to paise (multiply by 100)
      const amountInPaise = Math.round(selectedTotal * 100);

      // Validate converted amount
      if (amountInPaise <= 0 || !isFinite(amountInPaise) || !Number.isInteger(amountInPaise)) {
        setMessage({ type: 'error', text: 'Invalid amount. Please try again.' });
        setSubmitting(false);
        return;
      }

      // Prepare request body - ensure it's always valid
      const requestBody = {
        amount: amountInPaise, // Amount in paise (integer)
        currency: "INR"
      };

      // Double-check the body is valid before stringifying
      if (!requestBody.amount || typeof requestBody.amount !== 'number' || requestBody.amount <= 0) {
        console.error('Invalid request body prepared:', requestBody);
        setMessage({ type: 'error', text: 'Invalid payment amount. Please contact support.' });
        setSubmitting(false);
        return;
      }

      // Log request body for debugging (remove in production if sensitive)
      console.log('Creating Razorpay order with:', {
        amount: requestBody.amount,
        currency: requestBody.currency,
        amountType: typeof requestBody.amount,
        isInteger: Number.isInteger(requestBody.amount)
      });

      // Step 1: Create order from Supabase function (SERVER-SIDE)
      // ✅ CORS Safe: Orders API is called server-side via Edge Function, not from client
      // This prevents "Blocked by CORS policy" errors
      const response = await fetch(CREATE_ORDER_FUNCTION_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(requestBody), // Ensure body is always JSON.stringified
      });

      // Check if response is OK
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        if (response.status === 401) {
          setMessage({ type: 'error', text: 'Authentication failed. Please contact support.' });
        } else {
          setMessage({ type: 'error', text: errorData.error || 'Failed to create Razorpay order. Please try again.' });
        }
        setSubmitting(false);
        return;
      }

      const order = await response.json();

      // Validate order response
      if (!order.id) {
        setMessage({ type: 'error', text: 'Failed to create Razorpay order. Please try again.' });
        setSubmitting(false);
        return;
      }

      // Validate that order was created successfully with proper structure
      if (!order.amount || !order.currency) {
        console.error('Invalid order response:', order);
        setMessage({ type: 'error', text: 'Invalid order response from server. Please contact support.' });
        setSubmitting(false);
        return;
      }

      // Step 2: Format booking details for saving after payment
      const priceString = `₹${selectedTotal.toLocaleString('en-IN')} (${occupancyType === 'double' ? 'Double' : 'Single'} Occupancy)`;
      const selectedSlot = `${occupancyType === 'double' ? 'Double' : 'Single'} Occupancy - 3 Days / 2 Nights`;

      // Step 3: Initialize Razorpay with enhanced options (following Razorpay best practices)
      // Format phone number with country code for better conversion rates
      const formatPhoneNumber = (phone: string): string => {
        // Remove all non-digit characters
        const digits = phone.replace(/\D/g, '');
        // If number doesn't start with country code, assume +91 (India)
        if (digits.length === 10) {
          return `+91${digits}`;
        } else if (digits.length > 10 && !digits.startsWith('91')) {
          return `+91${digits.slice(-10)}`;
        } else if (digits.startsWith('91')) {
          return `+${digits}`;
        }
        return phone.startsWith('+') ? phone : `+91${digits}`;
      };

      // ✅ Key ID is imported from config to ensure consistency
      // ⚠️ CRITICAL: This MUST match RAZORPAY_KEY_ID in Supabase Edge Function
      // Error "The id provided does not exist" occurs when keys don't match

      const description = `3-Day Rejuvenation Retreat - ${occupancyType === 'double' ? 'Double' : 'Single'} Occupancy`;

      const options = {
        key: RAZORPAY_KEY_ID, // Razorpay Key ID (mandatory) - MUST match server-side key
        amount: order.amount, // Integer in smallest currency subunit (mandatory) - already in paise
        currency: order.currency || "INR", // Currency code (mandatory)
        name: "MEHR Rejuvenation Retreat", // Business name (mandatory)
        description: description, // Transaction description (optional)
        image: window.location.origin + "/image-5-1.png", // Business logo (optional)
        order_id: order.id, // Order ID from server (mandatory)
        handler: async function (response: any) {
          try {
            // Check if payment failed (Razorpay may pass error in response)
            if (response.error) {
              console.error('Payment failed in handler:', response.error);
              setMessage({ 
                type: 'error', 
                text: `Payment failed: ${response.error.description || response.error.reason || 'Unknown error'}. Please try again.` 
              });
              setSubmitting(false);
              return;
            }

            // Validate payment response structure for successful payments
            if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
              console.error('Invalid payment response:', response);
              setMessage({ 
                type: 'error', 
                text: 'Payment response is incomplete. Please contact support.' 
              });
              setSubmitting(false);
              return;
            }

            console.log('Payment successful - Full response:', response);
            console.log('Payment successful - Extracted values:', {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature ? response.razorpay_signature.substring(0, 20) + '...' : 'MISSING'
            });

            // ✅ STEP 1.5: Verify Payment Signature (MANDATORY SECURITY STEP)
            // This confirms the payment response authenticity and prevents fraud
            const verificationPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            };

            console.log('Sending verification request:', {
              ...verificationPayload,
              razorpay_signature: verificationPayload.razorpay_signature ? verificationPayload.razorpay_signature.substring(0, 20) + '...' : 'MISSING'
            });

            const verifyResponse = await fetch(VERIFY_PAYMENT_FUNCTION_URL, {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
              },
              body: JSON.stringify(verificationPayload)
            });

            if (!verifyResponse.ok) {
              const verifyError = await verifyResponse.json().catch(() => ({ error: 'Verification failed' }));
              console.error('Error from verify-payment:', verifyError);
              console.error('Response status:', verifyResponse.status);
              console.error('Response statusText:', verifyResponse.statusText);
              setMessage({ 
                type: 'error', 
                text: `Payment verification failed: ${verifyError.error || verifyError.message || 'Unknown error'}. Please contact support with Payment ID: ${response.razorpay_payment_id}`
              });
              setSubmitting(false);
              return;
            }

            const verifyResult = await verifyResponse.json();
            
            // Check for success field (new format) or verified field (old format) for compatibility
            if (!verifyResult.success && !verifyResult.verified) {
              console.error('Payment signature is invalid:', verifyResult);
              setMessage({ 
                type: 'error', 
                text: `Payment verification failed: ${verifyResult.error || 'Invalid signature'}. Please contact support.`
              });
              setSubmitting(false);
              return;
            }

            console.log('Payment signature verified successfully');

            // ✅ STEP 1.6: Payment verified - Now save booking to Supabase
            const bookingData = {
              event_id: null,
              event_title: 'MEHR Rejuvenation Retreat - 3 Day Package',
              event_date: checkInDate || new Date().toISOString().split('T')[0],
              selected_slot: selectedSlot,
              price: priceString,
              customer_name: formData.name,
              customer_email: formData.email,
              customer_phone: formData.phoneNumber,
              status: 'confirmed', // Payment successful, so confirmed
              notes: `Occupancy Type: ${occupancyType === 'double' ? 'Double' : 'Single'}, Check-in: ${checkInDate}, Check-out: ${checkOutDate}. Signature Verified: Yes`,
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
            };

            console.log('Saving booking to Supabase:', bookingData);

            // Use Edge Function to create booking (bypasses RLS using service_role)
            // This is the most reliable permanent solution
            const CREATE_BOOKING_FUNCTION_URL = "https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-booking";
            
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
              console.error('Booking save error:', {
                status: bookingResponse.status,
                error: bookingResponseData,
                bookingData: bookingData
              });
              throw new Error(`Database error: ${errorMessage}`);
            }

            const bookingResult = [bookingResponseData.data];
            console.log('Booking saved successfully via Edge Function:', bookingResult[0]);

            if (!bookingResult || bookingResult.length === 0) {
              throw new Error('Booking was inserted but no data was returned. Please check admin panel.');
            }

            // Redirect to payment success page with all details
            const successParams = new URLSearchParams({
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              event_name: 'MEHR Rejuvenation Retreat - 3 Day Package',
              event_date: new Date().toISOString().split('T')[0],
              amount: selectedTotal.toString(),
              fee: '0',
              total: selectedTotal.toString(),
              customer_name: formData.name,
              payment_method: 'Razorpay',
            });
            
            onClose();
            navigate(`/payment/success?${successParams.toString()}`);
          } catch (err) {
            console.error('Error saving booking after payment:', err);
            
            // Get detailed error message
            let errorMessage = 'Payment successful but failed to save booking.';
            if (err instanceof Error) {
              errorMessage = err.message;
            }
            
            // Store payment details for manual recovery
            const paymentInfo = {
              payment_id: response?.razorpay_payment_id || 'N/A',
              order_id: response?.razorpay_order_id || 'N/A',
              customer_name: formData.name,
              customer_email: formData.email,
              customer_phone: formData.phoneNumber,
              amount: selectedTotal,
              occupancy: occupancyType,
              error: errorMessage,
              timestamp: new Date().toISOString()
            };
            
            console.error('Payment info for manual recovery:', paymentInfo);
            
            setMessage({ 
              type: 'error', 
              text: `${errorMessage} Payment ID: ${response?.razorpay_payment_id || 'N/A'}. Your payment was successful - please contact support with this Payment ID to complete your booking.`
            });
            setSubmitting(false);
          }
        },
        prefill: {
          // Prefill customer details to boost conversions and minimize drop-offs
          name: formData.name || undefined,
          email: formData.email || undefined,
          contact: formData.phoneNumber ? formatPhoneNumber(formData.phoneNumber) : undefined, // Format: +(country code)(phone number)
        },
        notes: {
          // Additional payment information (max 15 key-value pairs, 256 chars each)
          booking_type: 'rejuvenation_retreat',
          occupancy: occupancyType,
          package: '3_day_2_night',
          customer_name: formData.name,
          customer_email: formData.email,
          order_value: selectedTotal.toString(),
        },
        theme: {
          color: "#A0522D", // Match MEHR brand color
        },
        modal: {
          ondismiss: function() {
            // User closed the payment modal without completing payment
            setSubmitting(false);
            setMessage({ 
              type: 'error', 
              text: 'Payment was cancelled. Please try again when ready.' 
            });
            console.log('Payment modal dismissed by user');
          }
        },
        timeout: 900, // 15 minutes timeout (optional) - prevents checkout from staying open indefinitely
        // Note: Some browsers may pause timers in power saver mode, so timeout may not be exact
        // Note: Using handler function instead of callback_url
        // Handler function: Customer stays on your page, better UX for modals
        // Callback URL: Customer redirects to success/failure page (alternative approach)
        // For this modal-based flow, handler function is preferred
      };

      const rzp = new window.Razorpay(options);
      
      // Enhanced error handling for Razorpay checkout
      // Note: payment.failed event is handled automatically by Razorpay and will trigger handler with error
      // We also handle errors in the catch block and modal.ondismiss

      // Log checkout opening with key verification
      console.log('Opening Razorpay checkout:', {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: RAZORPAY_KEY_ID.substring(0, 8) + '...' // Log partial key for debugging
      });

      // ⚠️ Error Prevention:
      // 1. "The id provided does not exist" - Prevented by using same key_id in server (Edge Function) and client (checkout)
      // 2. "Blocked by CORS policy" - Prevented by making Orders API calls server-side only (via Edge Function)

      rzp.open();
      
      // Handle payment failed event
      rzp.on('payment.failed', function (response: any) {
        const failedParams = new URLSearchParams({
          transaction_no: order.id || 'N/A',
          error: response.error?.description || response.error?.reason || 'Payment failed. Please try again.',
          event_name: 'MEHR Rejuvenation Retreat - 3 Day Package',
          event_date: new Date().toISOString().split('T')[0],
          amount: selectedTotal.toString(),
          payment_page: '/rejuvenation/package',
        });
        
        onClose();
        navigate(`/payment/failed?${failedParams.toString()}`);
        setSubmitting(false);
      });
      
      // Don't set submitting to false here - let the handler do it
    } catch (err) {
      console.error('Error during payment setup:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      
      // Redirect to failed page for critical errors
      const failedParams = new URLSearchParams({
        transaction_no: 'N/A',
        error: errorMessage,
        event_name: 'MEHR Rejuvenation Retreat - 3 Day Package',
        event_date: new Date().toISOString().split('T')[0],
        amount: selectedTotal.toString(),
        payment_page: '/rejuvenation/package',
      });
      
      onClose();
      navigate(`/payment/failed?${failedParams.toString()}`);
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg w-full max-w-md my-4 sm:my-8 shadow-2xl relative flex flex-col max-h-[95vh]">
        {/* Header - Sticky */}
        <div className="bg-[#A0522D] px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-10 rounded-t-lg flex-shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[#FFDAB9] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="[font-family:'Poppins',Helvetica] font-medium text-sm sm:text-base">GO BACK</span>
          </button>
          <h2 className="[font-family:'Poppins',Helvetica] font-bold text-white text-base sm:text-lg uppercase">
            BOOK RETREAT
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-[#FFDAB9] transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-300 flex-shrink-0"></div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
          {/* Message */}
          {message.text && (
            <div
              className={`p-3 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              } [font-family:'Poppins',Helvetica] text-xs`}
            >
              {message.text}
            </div>
          )}

          {/* Package Info */}
          <div className="bg-gradient-to-br from-[#FFF8F0] to-[#FFDAB9] p-4 rounded-xl border-2 border-[#A0522D]/20 shadow-sm">
            <div className="mb-3 pb-3 border-b border-[#A0522D]/30">
              <h3 className="[font-family:'Poppins',Helvetica] text-lg font-bold text-[#A0522D] mb-0.5">
                MEHR Rejuvenation Retreat
              </h3>
              <p className="[font-family:'Poppins',Helvetica] text-[10px] text-gray-600 uppercase tracking-wide">
                3 Days / 2 Nights Package
              </p>
            </div>

            {/* Occupancy Selection */}
            <div className="mb-3">
              <label className="block [font-family:'Poppins',Helvetica] text-xs font-semibold text-[#A0522D] mb-1.5 uppercase">
                Select Occupancy Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOccupancyType('double')}
                  className={`py-2 px-2.5 rounded-lg border-2 transition-all ${
                    occupancyType === 'double'
                      ? 'border-[#A0522D] bg-[#A0522D] text-white shadow-sm'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#A0522D]/50'
                  } [font-family:'Poppins',Helvetica]`}
                >
                  <div className="font-semibold text-[11px] mb-0.5">Double</div>
                  <div className="text-[9px] opacity-90">₹2,500/night</div>
                </button>
                <button
                  type="button"
                  onClick={() => setOccupancyType('single')}
                  className={`py-2 px-2.5 rounded-lg border-2 transition-all ${
                    occupancyType === 'single'
                      ? 'border-[#A0522D] bg-[#A0522D] text-white shadow-sm'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#A0522D]/50'
                  } [font-family:'Poppins',Helvetica]`}
                >
                  <div className="font-semibold text-[11px] mb-0.5">Single</div>
                  <div className="text-[9px] opacity-90">₹3,500/night</div>
                </button>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2 pt-2 border-t border-[#A0522D]/20">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="[font-family:'Poppins',Helvetica] text-xs text-gray-700">
                    Retreat Total Fee
                  </span>
                  <span className="[font-family:'Poppins',Helvetica] text-[10px] text-gray-500">
                    (per person - 2 nights)
                  </span>
                </div>
                <span className="[font-family:'Poppins',Helvetica] text-xs font-medium text-[#A0522D]">
                  ₹{retreatFee.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="[font-family:'Poppins',Helvetica] text-xs text-gray-700">
                    Stay
                  </span>
                  <span className="[font-family:'Poppins',Helvetica] text-[10px] text-gray-500">
                    {occupancyType === 'double' ? '₹2,500/night (2 nights)' : '₹3,500/night (2 nights)'}
                  </span>
                </div>
                <span className="[font-family:'Poppins',Helvetica] text-xs font-medium text-[#A0522D]">
                  ₹{selectedStay.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t-2 border-[#A0522D]/30">
                <span className="[font-family:'Poppins',Helvetica] font-bold text-sm text-[#A0522D]">
                  Total Price
                </span>
                <span className="[font-family:'Poppins',Helvetica] font-bold text-base text-[#A0522D]">
                  ₹{selectedTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-bold text-[#1E1E1E] text-xs mb-1.5 uppercase">
              NAME
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 rounded-lg bg-gray-100 border-2 border-transparent focus:bg-gray-50 focus:border-[#A0522D] focus:outline-none [font-family:'Poppins',Helvetica] text-sm text-[#1E1E1E] transition-all"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-bold text-[#1E1E1E] text-xs mb-1.5 uppercase">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 rounded-lg bg-gray-100 border-2 border-transparent focus:bg-gray-50 focus:border-[#A0522D] focus:outline-none [font-family:'Poppins',Helvetica] text-sm text-[#1E1E1E] transition-all"
              placeholder="Enter your email"
            />
          </div>

          {/* Mobile Field */}
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-bold text-[#1E1E1E] text-xs mb-1.5 uppercase">
              MOBILE
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 rounded-lg bg-gray-100 border-2 border-transparent focus:bg-gray-50 focus:border-[#A0522D] focus:outline-none [font-family:'Poppins',Helvetica] text-sm text-[#1E1E1E] transition-all"
              placeholder="Enter your mobile number"
            />
          </div>

          {/* Check-in Date Field */}
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-bold text-[#1E1E1E] text-xs mb-1.5 uppercase">
              CHECK-IN DATE
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2.5 rounded-lg bg-gray-100 border-2 border-transparent focus:bg-gray-50 focus:border-[#A0522D] focus:outline-none [font-family:'Poppins',Helvetica] text-sm text-[#1E1E1E] transition-all"
            />
          </div>

          {/* Check-out Date Field */}
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-bold text-[#1E1E1E] text-xs mb-1.5 uppercase">
              CHECK-OUT DATE
            </label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              required
              min={checkInDate || new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2.5 rounded-lg bg-gray-100 border-2 border-transparent focus:bg-gray-50 focus:border-[#A0522D] focus:outline-none [font-family:'Poppins',Helvetica] text-sm text-[#1E1E1E] transition-all"
            />
          </div>
          </div>

          {/* Sticky Footer with Buttons */}
          <div className="border-t border-gray-200 bg-white p-4 sm:p-5 flex-shrink-0 rounded-b-lg">
            <div className="flex gap-2.5 sm:gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#A0522D] hover:bg-[#8b3a1f] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2.5 sm:py-3 rounded-lg [font-family:'Poppins',Helvetica] font-bold text-xs sm:text-sm uppercase transition-colors shadow-sm"
              >
                {submitting ? 'SUBMITTING...' : 'SUBMIT BOOKING'}
              </button>
              <button
                type="button"
                onClick={handlePayNow}
                disabled={submitting}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2.5 sm:py-3 rounded-lg [font-family:'Poppins',Helvetica] font-bold text-xs sm:text-sm uppercase transition-colors shadow-sm"
              >
                PAY NOW
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

