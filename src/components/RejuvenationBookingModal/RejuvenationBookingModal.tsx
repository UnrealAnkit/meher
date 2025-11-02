import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface RejuvenationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RejuvenationBookingModal: React.FC<RejuvenationBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [occupancyType, setOccupancyType] = useState<'double' | 'single'>('double');
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

    try {
      // Format price string with occupancy info
      const priceString = `₹${selectedTotal.toLocaleString('en-IN')} (${occupancyType === 'double' ? 'Double' : 'Single'} Occupancy)`;
      const selectedSlot = `${occupancyType === 'double' ? 'Double' : 'Single'} Occupancy - 3 Days / 2 Nights`;
      
      // Save booking to Supabase
      const { error } = await supabase.from('bookings').insert([
        {
          event_id: null, // No event_id for package bookings
          event_title: 'MEHR Rejuvenation Retreat - 3 Day Package',
          event_date: new Date().toISOString().split('T')[0], // Today's date
          selected_slot: selectedSlot,
          price: priceString,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phoneNumber,
          status: 'pending',
          notes: `Occupancy Type: ${occupancyType === 'double' ? 'Double' : 'Single'}`,
        },
      ]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Booking submitted successfully! We will contact you soon.' });
      
      // Reset form and close modal after 2 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', phoneNumber: '' });
        setOccupancyType('double');
        setSubmitting(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error submitting booking:', err);
      setMessage({ type: 'error', text: 'Failed to submit booking. Please try again.' });
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg w-full max-w-md my-8 shadow-2xl relative">
        {/* Header */}
        <div className="bg-[#A0522D] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-10 rounded-t-lg">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[#FFDAB9] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="[font-family:'Poppins',Helvetica] font-medium">GO BACK</span>
          </button>
          <h2 className="[font-family:'Poppins',Helvetica] font-bold text-white text-lg uppercase">
            BOOK RETREAT
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-[#FFDAB9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-300"></div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[calc(90vh-80px)] overflow-y-auto">
          {/* Message */}
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

          {/* Package Info */}
          <div className="bg-gradient-to-br from-[#FFF8F0] to-[#FFDAB9] p-5 rounded-xl border-2 border-[#A0522D]/20 shadow-sm">
            <div className="mb-4 pb-4 border-b border-[#A0522D]/30">
              <h3 className="[font-family:'Poppins',Helvetica] text-xl font-bold text-[#A0522D] mb-1">
                MEHR Rejuvenation Retreat
              </h3>
              <p className="[font-family:'Poppins',Helvetica] text-xs text-gray-600 uppercase tracking-wide">
                3 Days / 2 Nights Package
              </p>
            </div>

            {/* Occupancy Selection */}
            <div className="mb-4">
              <label className="block [font-family:'Poppins',Helvetica] text-sm font-semibold text-[#A0522D] mb-2 uppercase">
                Select Occupancy Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOccupancyType('double')}
                  className={`py-2 px-3 rounded-lg border-2 transition-all ${
                    occupancyType === 'double'
                      ? 'border-[#A0522D] bg-[#A0522D] text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#A0522D]/50'
                  } [font-family:'Poppins',Helvetica]`}
                >
                  <div className="font-semibold text-xs mb-0.5">Double Occupancy</div>
                  <div className="text-[10px] opacity-90">₹2,500 per night</div>
                </button>
                <button
                  type="button"
                  onClick={() => setOccupancyType('single')}
                  className={`py-2 px-3 rounded-lg border-2 transition-all ${
                    occupancyType === 'single'
                      ? 'border-[#A0522D] bg-[#A0522D] text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#A0522D]/50'
                  } [font-family:'Poppins',Helvetica]`}
                >
                  <div className="font-semibold text-xs mb-0.5">Single Occupancy</div>
                  <div className="text-[10px] opacity-90">₹3,500 per night</div>
                </button>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3 pt-3 border-t border-[#A0522D]/20">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="[font-family:'Poppins',Helvetica] text-sm text-gray-700">
                    Retreat Total Fee
                  </span>
                  <span className="[font-family:'Poppins',Helvetica] text-xs text-gray-500">
                    (per person - 2 nights)
                  </span>
                </div>
                <span className="[font-family:'Poppins',Helvetica] text-sm font-medium text-[#A0522D]">
                  ₹{retreatFee.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="[font-family:'Poppins',Helvetica] text-sm text-gray-700">
                    Stay
                  </span>
                  <span className="[font-family:'Poppins',Helvetica] text-xs text-gray-500">
                    {occupancyType === 'double' ? '₹2,500 per night - double occupancy' : '₹3,500 per night - single occupancy'}
                    <br />
                    (2 nights)
                  </span>
                </div>
                <span className="[font-family:'Poppins',Helvetica] text-sm font-medium text-[#A0522D]">
                  ₹{selectedStay.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t-2 border-[#A0522D]/30">
                <span className="[font-family:'Poppins',Helvetica] font-bold text-base text-[#A0522D]">
                  Total Price
                </span>
                <span className="[font-family:'Poppins',Helvetica] font-bold text-lg text-[#A0522D]">
                  ₹{selectedTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-bold text-[#1E1E1E] text-sm mb-2 uppercase">
              NAME
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none focus:bg-gray-200 focus:outline-none [font-family:'Poppins',Helvetica] text-[#1E1E1E] transition-colors"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-bold text-[#1E1E1E] text-sm mb-2 uppercase">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none focus:bg-gray-200 focus:outline-none [font-family:'Poppins',Helvetica] text-[#1E1E1E] transition-colors"
              placeholder="Enter your email"
            />
          </div>

          {/* Mobile Field */}
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-bold text-[#1E1E1E] text-sm mb-2 uppercase">
              MOBILE
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none focus:bg-gray-200 focus:outline-none [font-family:'Poppins',Helvetica] text-[#1E1E1E] transition-colors"
              placeholder="Enter your mobile number"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#A0522D] hover:bg-[#8b3a1f] disabled:bg-gray-400 text-white py-3 rounded-lg [font-family:'Poppins',Helvetica] font-bold uppercase transition-colors"
          >
            {submitting ? 'SUBMITTING...' : 'SUBMIT BOOKING'}
          </button>
        </form>
      </div>
    </div>
  );
};

