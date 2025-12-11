import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft, Calendar, Clock, IndianRupee } from 'lucide-react';
import { supabase, CREATE_ORDER_FUNCTION_URL, VERIFY_PAYMENT_FUNCTION_URL, CREATE_BOOKING_FUNCTION_URL } from '../../lib/supabase';
import { RAZORPAY_KEY_ID } from '../../config/razorpay';

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

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDate: string;
  selectedSlot: string;
  price: string;
  eventId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  eventTitle,
  eventDate,
  selectedSlot,
  price,
  eventId,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const extractPrice = (priceStr: string): number => {
    const match = priceStr.match(/[\d,]+\.?\d*/);
    if (match) {
      return parseFloat(match[0].replace(/,/g, ''));
    }
    return 0;
  };

  const amount = extractPrice(price);

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

    try {
      
      const bookingData = {
        event_id: eventId || null,
        event_title: eventTitle,
        event_date: eventDate,
        selected_slot: selectedSlot,
        price: price,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phoneNumber,
        status: 'pending',
      };

      const { error: directInsertError } = await supabase.from('bookings').insert([bookingData]);

      let error = directInsertError;

      if (directInsertError && (directInsertError.code === '42501' || directInsertError.message?.includes('row-level security'))) {
        console.warn('Direct insert failed due to RLS, trying RPC function fallback...');
        
        const { error: rpcError } = await supabase.rpc('insert_booking', {
          p_event_id: bookingData.event_id,
          p_event_title: bookingData.event_title,
          p_event_date: bookingData.event_date,
          p_selected_slot: bookingData.selected_slot,
          p_price: bookingData.price,
          p_customer_name: bookingData.customer_name,
          p_customer_email: bookingData.customer_email,
          p_customer_phone: bookingData.customer_phone,
          p_status: bookingData.status,
          p_notes: null
        });

        error = rpcError;
      }

      if (error) throw error;

      setMessage({ type: 'success', text: 'Booking submitted successfully! We will contact you soon.' });

      setTimeout(() => {
        setFormData({ name: '', email: '', phoneNumber: '' });
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
    
    if (!formData.name || !formData.email || !formData.phoneNumber) {
      setMessage({ type: 'error', text: 'Please fill in all fields before proceeding to payment.' });
      return;
    }

    if (amount <= 0) {
      setMessage({ type: 'error', text: 'Invalid price. Please contact support.' });
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

      const amountInPaise = Math.round(amount * 100);

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

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "MEHR Events",
        description: `${eventTitle} - ${selectedSlot}`,
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

            const bookingData = {
              event_id: eventId || null,
              event_title: eventTitle,
              event_date: eventDate,
              selected_slot: selectedSlot,
              price: price,
              customer_name: formData.name,
              customer_email: formData.email,
              customer_phone: formData.phoneNumber,
              status: 'confirmed',
              notes: `Payment ID: ${response.razorpay_payment_id}`,
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
              event_name: eventTitle,
              event_date: eventDate,
              amount: amount.toString(),
              fee: '0',
              total: amount.toString(),
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
        const failedParams = new URLSearchParams({
          transaction_no: order.id || 'N/A',
          error: response.error?.description || response.error?.reason || 'Payment failed. Please try again.',
          event_name: eventTitle,
          event_date: eventDate,
          amount: amount.toString(),
          payment_page: '/calendar',
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg w-full max-w-md my-8 shadow-2xl relative">
        
        <div className="bg-[#ab4b28] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[#f9d2a3] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="[font-family:'Poppins',Helvetica] font-medium">GO BACK</span>
          </button>
          <h2 className="[font-family:'Poppins',Helvetica] font-bold text-[#24312e] text-lg uppercase">
            CONTACT DETAILS
          </h2>
          <button
            onClick={onClose}
            className="text-[#24312e] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="h-px bg-gray-300"></div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[calc(90vh-80px)] overflow-y-auto">
          
          {message.text && (
            <div
              className={`p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              } [font-family:'Poppins',Helvetica] text-sm`}
            >
              {message.text}
            </div>
          )}

          <div className="bg-gradient-to-br from-[#f9f5f0] to-[#f9d2a3] p-5 rounded-xl border-2 border-[#ab4b28]/20 shadow-sm">
            
            <div className="mb-4 pb-4 border-b border-[#ab4b28]/30">
              <h3 className="[font-family:'Poppins',Helvetica] text-xl font-bold text-[#24312e] mb-1">
                {eventTitle}
              </h3>
              <p className="[font-family:'Poppins',Helvetica] text-xs text-gray-600 uppercase tracking-wide">
                Event Details
              </p>
            </div>

            <div className="space-y-3">
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 bg-[#ab4b28]/10 rounded-lg">
                  <Calendar className="w-4 h-4 text-[#ab4b28]" />
                </div>
                <div className="flex-1">
                  <p className="[font-family:'Poppins',Helvetica] text-xs font-semibold text-gray-600 uppercase tracking-wide mb-0.5">
                    Date
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] text-base font-medium text-[#24312e]">
                    {new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 bg-[#ab4b28]/10 rounded-lg">
                  <Clock className="w-4 h-4 text-[#ab4b28]" />
                </div>
                <div className="flex-1">
                  <p className="[font-family:'Poppins',Helvetica] text-xs font-semibold text-gray-600 uppercase tracking-wide mb-0.5">
                    Time Slot
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] text-base font-medium text-[#24312e]">
                    {selectedSlot}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#ab4b28]/20">
                <div className="mt-0.5 p-1.5 bg-[#ab4b28]/20 rounded-lg">
                  <IndianRupee className="w-4 h-4 text-[#ab4b28]" />
                </div>
                <div className="flex-1">
                  <p className="[font-family:'Poppins',Helvetica] text-xs font-semibold text-gray-600 uppercase tracking-wide mb-0.5">
                    Price
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] text-lg font-bold text-[#ab4b28]">
                    {price}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-bold text-[#24312e] text-sm mb-2 uppercase">
              NAME
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none focus:bg-gray-200 focus:outline-none [font-family:'Poppins',Helvetica] text-[#24312e] transition-colors"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-bold text-[#24312e] text-sm mb-2 uppercase">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none focus:bg-gray-200 focus:outline-none [font-family:'Poppins',Helvetica] text-[#24312e] transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-bold text-[#24312e] text-sm mb-2 uppercase">
              MOBILE
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none focus:bg-gray-200 focus:outline-none [font-family:'Poppins',Helvetica] text-[#24312e] transition-colors"
              placeholder="Enter your mobile number"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-[#ab4b28] hover:bg-[#8b3a1f] disabled:bg-gray-400 text-white py-3 rounded-lg [font-family:'Poppins',Helvetica] font-bold uppercase transition-colors"
            >
              {submitting ? 'SUBMITTING...' : 'SUBMIT BOOKING'}
            </button>
            <button
              type="button"
              onClick={handlePayNow}
              disabled={submitting || amount <= 0}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg [font-family:'Poppins',Helvetica] font-bold uppercase transition-colors"
            >
              {submitting ? 'PROCESSING...' : 'PAY NOW'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

