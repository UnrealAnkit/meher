import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, AlertCircle, Check, Eye, X } from 'lucide-react';

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

interface UserWithBookings {
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  bookings: Booking[];
  total_bookings: number;
  first_booking_date: string;
  last_booking_date: string;
}

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserWithBookings[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingUser, setViewingUser] = useState<UserWithBookings | null>(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Fetch all bookings
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group bookings by customer email
      const userMap = new Map<string, UserWithBookings>();

      (bookings || []).forEach((booking: Booking) => {
        const email = booking.customer_email;
        
        if (!userMap.has(email)) {
          userMap.set(email, {
            customer_email: email,
            customer_name: booking.customer_name,
            customer_phone: booking.customer_phone,
            bookings: [],
            total_bookings: 0,
            first_booking_date: booking.created_at,
            last_booking_date: booking.created_at,
          });
        }

        const user = userMap.get(email)!;
        user.bookings.push(booking);
        user.total_bookings += 1;

        // Update first and last booking dates
        if (new Date(booking.created_at) < new Date(user.first_booking_date)) {
          user.first_booking_date = booking.created_at;
        }
        if (new Date(booking.created_at) > new Date(user.last_booking_date)) {
          user.last_booking_date = booking.created_at;
        }
      });

      // Convert map to array and sort by last booking date
      const usersArray = Array.from(userMap.values()).sort((a, b) => 
        new Date(b.last_booking_date).getTime() - new Date(a.last_booking_date).getTime()
      );

      setUsers(usersArray);
    } catch (err) {
      console.error('Error fetching users:', err);
      showNotification('error', 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      case 'completed':
        return 'bg-blue-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const showNotification = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#24312e] mb-8 [font-family:'Poppins',Helvetica]">
        Users Management
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

      <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#f9d2a3]">
        <div className="px-6 py-4 bg-gradient-to-r from-[#f9d2a3] to-[#fce8d3]">
          <h2 className="text-xl font-bold text-[#24312e] [font-family:'Poppins',Helvetica]">
            Users with Bookings ({users.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <p className="text-[#24312e] [font-family:'Poppins',Helvetica]">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[#24312e] [font-family:'Poppins',Helvetica]">
              No users with bookings yet. Bookings will appear here once customers make reservations.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9f5f0] border-b-2 border-[#f9d2a3]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Total Bookings
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Last Booking
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.customer_email}
                    className={`border-b border-[#f9d2a3] ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#faf7f3]'
                    } hover:bg-[#f9f5f0] transition-colors`}
                  >
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica] font-medium">
                      {user.customer_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                      <a href={`mailto:${user.customer_email}`} className="text-[#ab4b28] hover:underline">
                        {user.customer_email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                      <a href={`tel:${user.customer_phone}`} className="text-[#24312e] hover:text-[#ab4b28]">
                        {user.customer_phone}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica] font-medium">
                      <span className="bg-[#ab4b28] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {user.total_bookings}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {new Date(user.last_booking_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setViewingUser(user)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="View Booking Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Booking Details Modal */}
      {viewingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-[#ab4b28] px-6 py-4 flex items-center justify-between sticky top-0">
              <h2 className="text-2xl font-bold text-white [font-family:'Poppins',Helvetica]">
                {viewingUser.customer_name}'s Bookings
              </h2>
              <button
                onClick={() => setViewingUser(null)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Customer Info */}
              <div className="bg-[#f9f5f0] p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-[#24312e] mb-3 [font-family:'Poppins',Helvetica]">
                  Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Name</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {viewingUser.customer_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Email</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      <a href={`mailto:${viewingUser.customer_email}`} className="text-[#ab4b28] hover:underline">
                        {viewingUser.customer_email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Phone</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      <a href={`tel:${viewingUser.customer_phone}`} className="text-[#ab4b28] hover:underline">
                        {viewingUser.customer_phone}
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Total Bookings</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {viewingUser.total_bookings}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bookings List */}
              <div>
                <h3 className="text-lg font-semibold text-[#24312e] mb-4 [font-family:'Poppins',Helvetica]">
                  All Bookings ({viewingUser.bookings.length})
                </h3>
                <div className="space-y-4">
                  {viewingUser.bookings.map((booking) => (
                    <div key={booking.id} className="bg-[#f9f5f0] p-4 rounded-lg border-l-4 border-[#ab4b28]">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 [font-family:'Poppins',Helvetica] mb-1">Event</p>
                          <p className="text-sm font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                            {booking.event_title}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 [font-family:'Poppins',Helvetica] mb-1">Date & Time</p>
                          <p className="text-sm font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                            {new Date(booking.event_date).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-[#ab4b28] [font-family:'Poppins',Helvetica]">
                            {booking.selected_slot}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 [font-family:'Poppins',Helvetica] mb-1">Price</p>
                          <p className="text-sm font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                            {booking.price}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 [font-family:'Poppins',Helvetica] mb-1">Status</p>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold [font-family:'Poppins',Helvetica] uppercase ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-300">
                        <p className="text-xs text-gray-500 [font-family:'Poppins',Helvetica]">
                          Booked on: {new Date(booking.created_at).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end mt-6 pt-4 border-t border-gray-300">
                <button
                  onClick={() => setViewingUser(null)}
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

