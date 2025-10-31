import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit2, Trash2, AlertCircle, Check, Eye, X } from 'lucide-react';

interface Booking {
  id: string;
  event_id: string | null;
  event_title: string;
  event_date: string;
  selected_slot: string;
  price: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const AdminBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);
  const [formData, setFormData] = useState({
    event_id: '',
    event_title: '',
    event_date: '',
    selected_slot: '',
    price: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    status: 'pending',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      showNotification('error', 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const bookingData = {
        event_id: formData.event_id || null,
        event_title: formData.event_title,
        event_date: formData.event_date,
        selected_slot: formData.selected_slot,
        price: formData.price,
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        status: formData.status,
        notes: formData.notes || null,
      };

      if (editingBooking) {
        const { error } = await supabase
          .from('bookings')
          .update(bookingData)
          .eq('id', editingBooking.id);

        if (error) throw error;
        showNotification('success', 'Booking updated successfully');
      } else {
        const { error } = await supabase
          .from('bookings')
          .insert([bookingData]);

        if (error) throw error;
        showNotification('success', 'Booking created successfully');
      }

      resetForm();
      fetchBookings();
    } catch (err) {
      console.error('Error saving booking:', err);
      showNotification('error', 'Failed to save booking');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showNotification('success', 'Booking deleted successfully');
      fetchBookings();
    } catch (err) {
      console.error('Error deleting booking:', err);
      showNotification('error', 'Failed to delete booking');
    }
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setFormData({
      event_id: booking.event_id || '',
      event_title: booking.event_title,
      event_date: booking.event_date,
      selected_slot: booking.selected_slot,
      price: booking.price,
      customer_name: booking.customer_name,
      customer_email: booking.customer_email,
      customer_phone: booking.customer_phone,
      status: booking.status,
      notes: booking.notes || '',
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      event_id: '',
      event_title: '',
      event_date: '',
      selected_slot: '',
      price: '',
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      status: 'pending',
      notes: '',
    });
    setEditingBooking(null);
    setShowForm(false);
  };

  const showNotification = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#24312e] mb-8 [font-family:'Poppins',Helvetica]">
        Bookings Management
      </h1>

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-fadeIn ${
            message.type === 'success'
              ? 'bg-green-50 border-l-4 border-green-500'
              : 'bg-red-50 border-l-4 border-red-500'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          <p
            className={`[font-family:'Poppins',Helvetica] ${
              message.type === 'success' ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {message.text}
          </p>
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-[#f9d2a3]">
          <h2 className="text-2xl font-bold text-[#24312e] mb-6 [font-family:'Poppins',Helvetica]">
            {editingBooking ? 'Edit Booking' : 'Create New Booking'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.event_title}
                  onChange={(e) => setFormData({ ...formData, event_title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="e.g., YIN YOGA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Event Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Selected Time Slot *
                </label>
                <input
                  type="text"
                  required
                  value={formData.selected_slot}
                  onChange={(e) => setFormData({ ...formData, selected_slot: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="e.g., 10:00 AM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Price *
                </label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="e.g., Rs 500.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="Customer full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Customer Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="customer@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Customer Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="+91 1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Event ID (Optional)
                </label>
                <input
                  type="text"
                  value={formData.event_id}
                  onChange={(e) => setFormData({ ...formData, event_id: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="Event UUID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica] h-32"
                  placeholder="Additional notes..."
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#ab4b28] hover:bg-[#8b3a1f] disabled:bg-[#cccccc] text-white py-3 rounded-lg font-semibold transition-colors [font-family:'Poppins',Helvetica] uppercase"
              >
                {submitting ? 'Saving...' : editingBooking ? 'Update Booking' : 'Create Booking'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors [font-family:'Poppins',Helvetica]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#f9d2a3]">
        <div className="px-6 py-4 bg-gradient-to-r from-[#f9d2a3] to-[#fce8d3] flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#24312e] [font-family:'Poppins',Helvetica]">
            Bookings ({bookings.length})
          </h2>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="flex items-center gap-2 bg-[#ab4b28] hover:bg-[#8b3a1f] text-white px-4 py-2 rounded-lg transition-colors [font-family:'Poppins',Helvetica] font-semibold text-sm"
          >
            <Eye className="w-4 h-4" />
            {showForm ? 'Hide Form' : 'New Booking'}
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <p className="text-[#24312e] [font-family:'Poppins',Helvetica]">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[#24312e] [font-family:'Poppins',Helvetica]">
              No bookings yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9f5f0] border-b-2 border-[#f9d2a3]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={booking.id}
                    className={`border-b border-[#f9d2a3] ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#faf7f3]'
                    } hover:bg-[#f9f5f0] transition-colors`}
                  >
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica] font-medium">
                      {booking.event_title}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                      <div>{new Date(booking.event_date).toLocaleDateString()}</div>
                      <div className="text-[#ab4b28] text-xs">{booking.selected_slot}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                      <div className="font-medium">{booking.customer_name}</div>
                      <div className="text-xs text-gray-600">{booking.customer_email}</div>
                      <div className="text-xs text-gray-600">{booking.customer_phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica] font-medium">
                      {booking.price}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded text-xs font-semibold [font-family:'Poppins',Helvetica] uppercase ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => setViewingBooking(booking)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(booking)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Booking"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Booking"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {viewingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-[#ab4b28] px-6 py-4 flex items-center justify-between sticky top-0">
              <h2 className="text-2xl font-bold text-white [font-family:'Poppins',Helvetica]">
                Booking Details
              </h2>
              <button
                onClick={() => setViewingBooking(null)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Event Information */}
              <div className="bg-[#f9f5f0] p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#24312e] mb-4 [font-family:'Poppins',Helvetica]">
                  Event Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Event Title</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {viewingBooking.event_title}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Event Date</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {new Date(viewingBooking.event_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Time Slot</p>
                    <p className="text-base font-medium text-[#ab4b28] [font-family:'Poppins',Helvetica]">
                      {viewingBooking.selected_slot}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Price</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {viewingBooking.price}
                    </p>
                  </div>
                  {viewingBooking.event_id && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Event ID</p>
                      <p className="text-base font-mono text-xs text-gray-500 [font-family:'Poppins',Helvetica] break-all">
                        {viewingBooking.event_id}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-[#f9f5f0] p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#24312e] mb-4 [font-family:'Poppins',Helvetica]">
                  Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Name</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {viewingBooking.customer_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Email</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      <a href={`mailto:${viewingBooking.customer_email}`} className="text-[#ab4b28] hover:underline">
                        {viewingBooking.customer_email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Phone</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      <a href={`tel:${viewingBooking.customer_phone}`} className="text-[#ab4b28] hover:underline">
                        {viewingBooking.customer_phone}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Status */}
              <div className="bg-[#f9f5f0] p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#24312e] mb-4 [font-family:'Poppins',Helvetica]">
                  Booking Status
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Status</p>
                    <span className={`inline-block px-3 py-1 rounded text-sm font-semibold [font-family:'Poppins',Helvetica] uppercase ${getStatusColor(viewingBooking.status)}`}>
                      {viewingBooking.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Booking ID</p>
                    <p className="text-base font-mono text-xs text-gray-500 [font-family:'Poppins',Helvetica] break-all">
                      {viewingBooking.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Created At</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {new Date(viewingBooking.created_at).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Last Updated</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {new Date(viewingBooking.updated_at).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {viewingBooking.notes && (
                <div className="bg-[#f9f5f0] p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                    Notes
                  </h3>
                  <p className="text-base text-[#24312e] [font-family:'Poppins',Helvetica] whitespace-pre-wrap">
                    {viewingBooking.notes}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-300">
                <button
                  onClick={() => {
                    setViewingBooking(null);
                    handleEdit(viewingBooking);
                  }}
                  className="flex-1 bg-[#ab4b28] hover:bg-[#8b3a1f] text-white py-3 rounded-lg font-semibold transition-colors [font-family:'Poppins',Helvetica]"
                >
                  Edit Booking
                </button>
                <button
                  onClick={() => setViewingBooking(null)}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors [font-family:'Poppins',Helvetica]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

