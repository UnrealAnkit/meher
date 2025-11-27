import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit2, Trash2, AlertCircle, Check, Eye, X, Bed } from 'lucide-react';
import { ROOM_TYPES, type RoomType } from '../../utils/roomAvailability';

interface RoomBooking {
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
  payment_id: string | null;
  order_id: string | null;
  room_type: RoomType | null;
  check_in: string | null;
  check_out: string | null;
  check_out_time: string | null;
  created_at: string;
  updated_at: string;
}

export const AdminRoomBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<RoomBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState<RoomBooking | null>(null);
  const [viewingBooking, setViewingBooking] = useState<RoomBooking | null>(null);
  const [formData, setFormData] = useState({
    event_title: 'MEHR Stay Booking',
    event_date: '',
    selected_slot: '',
    price: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    status: 'pending',
    notes: '',
    room_type: '' as RoomType | '',
    check_in: '',
    check_out: '',
    check_out_time: '15:00:00',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchRoomBookings();
  }, []);

  const fetchRoomBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .not('room_type', 'is', null)
        .order('check_out', { ascending: false })
        .order('check_in', { ascending: false });

      if (error) throw error;
      setBookings((data || []) as RoomBooking[]);
    } catch (err) {
      console.error('Error fetching room bookings:', err);
      showNotification('error', 'Failed to fetch room bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!formData.room_type) {
        showNotification('error', 'Please select a room type');
        setSubmitting(false);
        return;
      }

      const bookingData = {
        event_id: null,
        event_title: formData.event_title,
        event_date: formData.check_in || formData.event_date,
        selected_slot: formData.selected_slot || `${calculateNights()} night(s) - 1 adult(s)`,
        price: formData.price || `₹${ROOM_TYPES[formData.room_type].price * calculateNights()}`,
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        status: formData.status,
        notes: formData.notes || null,
        room_type: formData.room_type,
        check_in: formData.check_in || null,
        check_out: formData.check_out || null,
        check_out_time: formData.check_out_time || '15:00:00',
      };

      if (editingBooking) {
        const { error } = await supabase
          .from('bookings')
          .update(bookingData)
          .eq('id', editingBooking.id);

        if (error) throw error;
        showNotification('success', 'Room booking updated successfully');
      } else {
        const { error } = await supabase
          .from('bookings')
          .insert([bookingData]);

        if (error) throw error;
        showNotification('success', 'Room booking created successfully');
      }

      resetForm();
      fetchRoomBookings();
    } catch (err: any) {
      console.error('Error saving room booking:', err);
      showNotification('error', err.message || 'Failed to save room booking');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateNights = () => {
    if (!formData.check_in || !formData.check_out) return 1;
    const checkIn = new Date(formData.check_in);
    const checkOut = new Date(formData.check_out);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this room booking?')) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showNotification('success', 'Room booking deleted successfully');
      fetchRoomBookings();
    } catch (err) {
      console.error('Error deleting room booking:', err);
      showNotification('error', 'Failed to delete room booking');
    }
  };

  const handleEdit = (booking: RoomBooking) => {
    setEditingBooking(booking);
    setFormData({
      event_title: booking.event_title,
      event_date: booking.event_date,
      selected_slot: booking.selected_slot,
      price: booking.price,
      customer_name: booking.customer_name,
      customer_email: booking.customer_email,
      customer_phone: booking.customer_phone,
      status: booking.status,
      notes: booking.notes || '',
      room_type: booking.room_type || '',
      check_in: booking.check_in || '',
      check_out: booking.check_out || '',
      check_out_time: booking.check_out_time || '15:00:00',
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      event_title: 'MEHR Stay Booking',
      event_date: '',
      selected_slot: '',
      price: '',
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      status: 'pending',
      notes: '',
      room_type: '',
      check_in: '',
      check_out: '',
      check_out_time: '15:00:00',
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

  const getRoomTypeName = (roomType: RoomType | null) => {
    if (!roomType) return 'N/A';
    return ROOM_TYPES[roomType].name;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#24312e] mb-8 [font-family:'Poppins',Helvetica]">
        Room Bookings Management
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
            {editingBooking ? 'Edit Room Booking' : 'Create New Room Booking'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Room Type *
                </label>
                <select
                  required
                  value={formData.room_type}
                  onChange={(e) => setFormData({ ...formData, room_type: e.target.value as RoomType })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                >
                  <option value="">Select Room Type</option>
                  {Object.values(ROOM_TYPES).map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} - ₹{room.price.toLocaleString('en-IN')}/night ({room.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Check-in Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.check_in}
                  onChange={(e) => setFormData({ ...formData, check_in: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Check-out Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.check_out}
                  onChange={(e) => setFormData({ ...formData, check_out: e.target.value })}
                  min={formData.check_in}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Check-out Time *
                </label>
                <input
                  type="time"
                  required
                  value={formData.check_out_time}
                  onChange={(e) => setFormData({ ...formData, check_out_time: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                />
              </div>

              {formData.room_type && formData.check_in && formData.check_out && (
                <div className="md:col-span-2 bg-[#f9f5f0] p-4 rounded-lg">
                  <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica] mb-1">
                    Nights: <span className="font-semibold">{calculateNights()}</span>
                  </p>
                  <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">
                    Estimated Price: <span className="font-semibold text-[#ab4b28]">
                      ₹{(ROOM_TYPES[formData.room_type].price * calculateNights()).toLocaleString('en-IN')}
                    </span>
                  </p>
                </div>
              )}

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
                  placeholder="e.g., ₹9,600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Selected Slot
                </label>
                <input
                  type="text"
                  value={formData.selected_slot}
                  onChange={(e) => setFormData({ ...formData, selected_slot: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="e.g., 2 night(s) - 2 adult(s)"
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
            Room Bookings ({bookings.length})
          </h2>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="flex items-center gap-2 bg-[#ab4b28] hover:bg-[#8b3a1f] text-white px-4 py-2 rounded-lg transition-colors [font-family:'Poppins',Helvetica] font-semibold text-sm"
          >
            <Bed className="w-4 h-4" />
            {showForm ? 'Hide Form' : 'New Room Booking'}
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <p className="text-[#24312e] [font-family:'Poppins',Helvetica]">Loading room bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[#24312e] [font-family:'Poppins',Helvetica]">
              No room bookings yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9f5f0] border-b-2 border-[#f9d2a3]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Room Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Check-in / Check-out
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Payment ID
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
                      <div>{getRoomTypeName(booking.room_type)}</div>
                      {booking.room_type && (
                        <div className="text-xs text-gray-600">
                          ₹{ROOM_TYPES[booking.room_type].price.toLocaleString('en-IN')}/night
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                      <div className="font-medium">
                        {booking.check_in ? new Date(booking.check_in).toLocaleDateString() : 'N/A'}
                      </div>
                      <div className="text-[#ab4b28] text-xs">
                        to {booking.check_out ? new Date(booking.check_out).toLocaleDateString() : 'N/A'}
                        {booking.check_out_time && ` at ${booking.check_out_time.substring(0, 5)}`}
                      </div>
                      {booking.selected_slot && (
                        <div className="text-xs text-gray-600 mt-1">{booking.selected_slot}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                      <div className="font-medium">{booking.customer_name}</div>
                      <div className="text-xs text-gray-600">{booking.customer_email}</div>
                      <div className="text-xs text-gray-600">{booking.customer_phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica] font-medium">
                      {booking.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {booking.payment_id ? (
                        <div>
                          <div className="font-mono text-xs text-[#ab4b28] break-all">{booking.payment_id}</div>
                          {booking.order_id && (
                            <div className="text-xs text-gray-500 mt-1">Order: {booking.order_id.substring(0, 20)}...</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
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
            <div className="bg-[#ab4b28] px-6 py-4 flex items-center justify-between sticky top-0">
              <h2 className="text-2xl font-bold text-white [font-family:'Poppins',Helvetica]">
                Room Booking Details
              </h2>
              <button
                onClick={() => setViewingBooking(null)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-[#f9f5f0] p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#24312e] mb-4 [font-family:'Poppins',Helvetica]">
                  Room Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Room Type</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {getRoomTypeName(viewingBooking.room_type)}
                    </p>
                  </div>
                  {viewingBooking.room_type && (
                    <div>
                      <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Price per Night</p>
                      <p className="text-base font-medium text-[#ab4b28] [font-family:'Poppins',Helvetica]">
                        ₹{ROOM_TYPES[viewingBooking.room_type].price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Check-in</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {viewingBooking.check_in ? new Date(viewingBooking.check_in).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Check-out</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {viewingBooking.check_out ? new Date(viewingBooking.check_out).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) + (viewingBooking.check_out_time ? ` at ${viewingBooking.check_out_time.substring(0, 5)}` : '') : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Price</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {viewingBooking.price}
                    </p>
                  </div>
                </div>
              </div>

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
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Status</p>
                    <span className={`inline-block px-3 py-1 rounded text-sm font-semibold [font-family:'Poppins',Helvetica] uppercase ${getStatusColor(viewingBooking.status)}`}>
                      {viewingBooking.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              {(viewingBooking.payment_id || viewingBooking.order_id) && (
                <div className="bg-[#f9f5f0] p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#24312e] mb-4 [font-family:'Poppins',Helvetica]">
                    Payment Information (Razorpay)
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {viewingBooking.payment_id && (
                      <div>
                        <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Payment ID</p>
                        <p className="text-base font-mono text-xs text-[#ab4b28] break-all [font-family:'Poppins',Helvetica]">
                          {viewingBooking.payment_id}
                        </p>
                        <a
                          href={`https://dashboard.razorpay.com/app/payments/${viewingBooking.payment_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                        >
                          View in Razorpay Dashboard →
                        </a>
                      </div>
                    )}
                    {viewingBooking.order_id && (
                      <div>
                        <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Order ID</p>
                        <p className="text-base font-mono text-xs text-[#ab4b28] break-all [font-family:'Poppins',Helvetica]">
                          {viewingBooking.order_id}
                        </p>
                        <a
                          href={`https://dashboard.razorpay.com/app/orders/${viewingBooking.order_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                        >
                          View in Razorpay Dashboard →
                        </a>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-3 [font-family:'Poppins',Helvetica]">
                    💡 Payment details are stored when booking is created through Razorpay payment flow.
                  </p>
                </div>
              )}

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

