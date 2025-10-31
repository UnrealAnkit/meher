import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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
      // Save booking to Supabase
      const { error } = await supabase.from('bookings').insert([
        {
          event_id: eventId || null,
          event_title: eventTitle,
          event_date: eventDate,
          selected_slot: selectedSlot,
          price: price,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phoneNumber,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Booking submitted successfully! We will contact you soon.' });
      
      // Reset form and close modal after 2 seconds
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-[#ab4b28] px-6 py-4 flex items-center justify-between">
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

        {/* Divider */}
        <div className="h-px bg-gray-300"></div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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

          {/* Event Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="[font-family:'Poppins',Helvetica] text-sm text-gray-600 mb-1">
              <strong>Event:</strong> {eventTitle}
            </p>
            <p className="[font-family:'Poppins',Helvetica] text-sm text-gray-600 mb-1">
              <strong>Date:</strong> {new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="[font-family:'Poppins',Helvetica] text-sm text-gray-600 mb-1">
              <strong>Time Slot:</strong> {selectedSlot}
            </p>
            <p className="[font-family:'Poppins',Helvetica] text-sm text-gray-600">
              <strong>Price:</strong> {price}
            </p>
          </div>

          {/* Name Field */}
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

          {/* Email Field */}
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

          {/* Phone Number Field */}
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-bold text-[#24312e] text-sm mb-2 uppercase">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none focus:bg-gray-200 focus:outline-none [font-family:'Poppins',Helvetica] text-[#24312e] transition-colors"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#ab4b28] hover:bg-[#8b3a1f] disabled:bg-gray-400 text-white py-3 rounded-lg [font-family:'Poppins',Helvetica] font-bold uppercase transition-colors"
          >
            {submitting ? 'SUBMITTING...' : 'SUBMIT'}
          </button>
        </form>
      </div>
    </div>
  );
};

