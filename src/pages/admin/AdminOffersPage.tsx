import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit2, Trash2, AlertCircle, Check, Eye, X, Plus, Tag, Calendar, Users, DollarSign } from 'lucide-react';

interface PromoCode {
  id: string;
  code: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_amount: number;
  max_discount: number | null;
  usage_limit: number | null;
  used_count: number;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface BookingWithPromo {
  id: string;
  customer_name: string;
  customer_email: string;
  event_title: string;
  event_date: string;
  price: string;
  discount_amount: number | null;
  original_amount: number | null;
  created_at: string;
  status: string;
}

export const AdminOffersPage: React.FC = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoCode | null>(null);
  const [viewingPromo, setViewingPromo] = useState<PromoCode | null>(null);
  const [bookingsForPromo, setBookingsForPromo] = useState<BookingWithPromo[]>([]);
  const [activeTab, setActiveTab] = useState<'current' | 'past'>('current');
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discount_type: 'percentage' as 'percentage' | 'fixed',
    discount_value: '',
    min_amount: '',
    max_discount: '',
    usage_limit: '',
    valid_from: '',
    valid_until: '',
    is_active: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchPromoCodes();
  }, [activeTab]);

  const fetchPromoCodes = async () => {
    try {
      setLoading(true);
      const now = new Date().toISOString();
      
      let query = supabase
        .from('promo_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (activeTab === 'current') {
        query = query
          .eq('is_active', true)
          .gte('valid_until', now);
      } else {
        query = query.or(`is_active.eq.false,valid_until.lt.${now}`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPromoCodes(data || []);
    } catch (err) {
      console.error('Error fetching promo codes:', err);
      showNotification('error', 'Failed to fetch promo codes');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingsForPromo = async (promoId: string) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('id, customer_name, customer_email, event_title, event_date, price, discount_amount, original_amount, created_at, status')
        .eq('promo_code_id', promoId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookingsForPromo(data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      showNotification('error', 'Failed to fetch bookings');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const promoData = {
        code: formData.code.toUpperCase().trim(),
        description: formData.description || null,
        discount_type: formData.discount_type,
        discount_value: parseFloat(formData.discount_value),
        min_amount: parseFloat(formData.min_amount) || 0,
        max_discount: formData.max_discount ? parseFloat(formData.max_discount) : null,
        usage_limit: formData.usage_limit ? parseInt(formData.usage_limit) : null,
        valid_from: formData.valid_from || new Date().toISOString(),
        valid_until: formData.valid_until,
        is_active: formData.is_active,
      };

      if (editingPromo) {
        const { error } = await supabase
          .from('promo_codes')
          .update(promoData)
          .eq('id', editingPromo.id);

        if (error) throw error;
        showNotification('success', 'Promo code updated successfully');
      } else {
        const { error } = await supabase
          .from('promo_codes')
          .insert([promoData]);

        if (error) throw error;
        showNotification('success', 'Promo code created successfully');
      }

      resetForm();
      fetchPromoCodes();
    } catch (err: any) {
      console.error('Error saving promo code:', err);
      showNotification('error', err.message || 'Failed to save promo code');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this promo code?')) return;

    try {
      const { error } = await supabase
        .from('promo_codes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showNotification('success', 'Promo code deleted successfully');
      fetchPromoCodes();
    } catch (err) {
      console.error('Error deleting promo code:', err);
      showNotification('error', 'Failed to delete promo code');
    }
  };

  const handleEdit = (promo: PromoCode) => {
    setEditingPromo(promo);
    setFormData({
      code: promo.code,
      description: promo.description || '',
      discount_type: promo.discount_type,
      discount_value: promo.discount_value.toString(),
      min_amount: promo.min_amount.toString(),
      max_discount: promo.max_discount?.toString() || '',
      usage_limit: promo.usage_limit?.toString() || '',
      valid_from: promo.valid_from.split('T')[0],
      valid_until: promo.valid_until.split('T')[0],
      is_active: promo.is_active,
    });
    setShowForm(true);
  };

  const handleView = async (promo: PromoCode) => {
    setViewingPromo(promo);
    await fetchBookingsForPromo(promo.id);
  };

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      discount_type: 'percentage',
      discount_value: '',
      min_amount: '',
      max_discount: '',
      usage_limit: '',
      valid_from: '',
      valid_until: '',
      is_active: true,
    });
    setEditingPromo(null);
    setShowForm(false);
  };

  const showNotification = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const isExpired = (validUntil: string) => {
    return new Date(validUntil) < new Date();
  };

  const isActive = (promo: PromoCode) => {
    const now = new Date();
    return promo.is_active && 
           new Date(promo.valid_from) <= now && 
           new Date(promo.valid_until) >= now;
  };

  const calculateDiscount = (amount: number, promo: PromoCode): number => {
    if (amount < promo.min_amount) return 0;
    
    let discount = 0;
    if (promo.discount_type === 'percentage') {
      discount = (amount * promo.discount_value) / 100;
      if (promo.max_discount) {
        discount = Math.min(discount, promo.max_discount);
      }
    } else {
      discount = promo.discount_value;
    }
    
    return Math.round(discount * 100) / 100;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#24312e] mb-8 [font-family:'Poppins',Helvetica]">
        Promo Codes & Offers
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

      {/* Tabs */}
      <div className="mb-6 flex gap-4 border-b-2 border-[#f9d2a3]">
        <button
          onClick={() => setActiveTab('current')}
          className={`px-6 py-3 font-semibold [font-family:'Poppins',Helvetica] transition-colors ${
            activeTab === 'current'
              ? 'text-[#ab4b28] border-b-2 border-[#ab4b28]'
              : 'text-gray-600 hover:text-[#ab4b28]'
          }`}
        >
          Current Offers
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-6 py-3 font-semibold [font-family:'Poppins',Helvetica] transition-colors ${
            activeTab === 'past'
              ? 'text-[#ab4b28] border-b-2 border-[#ab4b28]'
              : 'text-gray-600 hover:text-[#ab4b28]'
          }`}
        >
          Past Offers
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-[#f9d2a3]">
          <h2 className="text-2xl font-bold text-[#24312e] mb-6 [font-family:'Poppins',Helvetica]">
            {editingPromo ? 'Edit Promo Code' : 'Create New Promo Code'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Code * (will be converted to uppercase)
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="e.g., SUMMER20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Discount Type *
                </label>
                <select
                  required
                  value={formData.discount_type}
                  onChange={(e) => setFormData({ ...formData, discount_type: e.target.value as 'percentage' | 'fixed' })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Discount Value * {formData.discount_type === 'percentage' ? '(%)' : '(₹)'}
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step={formData.discount_type === 'percentage' ? '0.01' : '1'}
                  value={formData.discount_value}
                  onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder={formData.discount_type === 'percentage' ? 'e.g., 20' : 'e.g., 500'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Minimum Amount (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.min_amount}
                  onChange={(e) => setFormData({ ...formData, min_amount: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="e.g., 1000"
                />
              </div>

              {formData.discount_type === 'percentage' && (
                <div>
                  <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                    Maximum Discount (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.max_discount}
                    onChange={(e) => setFormData({ ...formData, max_discount: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                    placeholder="e.g., 1000"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Usage Limit
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.usage_limit}
                  onChange={(e) => setFormData({ ...formData, usage_limit: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="Leave empty for unlimited"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Valid From *
                </label>
                <input
                  type="date"
                  required
                  value={formData.valid_from}
                  onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Valid Until *
                </label>
                <input
                  type="date"
                  required
                  value={formData.valid_until}
                  onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica] h-32"
                  placeholder="Optional description for this promo code"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-3 [font-family:'Poppins',Helvetica]">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium text-[#24312e]">Active</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#ab4b28] hover:bg-[#8b3a1f] disabled:bg-[#cccccc] text-white py-3 rounded-lg font-semibold transition-colors [font-family:'Poppins',Helvetica] uppercase"
              >
                {submitting ? 'Saving...' : editingPromo ? 'Update Promo Code' : 'Create Promo Code'}
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
            {activeTab === 'current' ? 'Current Offers' : 'Past Offers'} ({promoCodes.length})
          </h2>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="flex items-center gap-2 bg-[#ab4b28] hover:bg-[#8b3a1f] text-white px-4 py-2 rounded-lg transition-colors [font-family:'Poppins',Helvetica] font-semibold text-sm"
          >
            <Plus className="w-4 h-4" />
            {showForm ? 'Hide Form' : 'New Promo Code'}
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <p className="text-[#24312e] [font-family:'Poppins',Helvetica]">Loading promo codes...</p>
          </div>
        ) : promoCodes.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[#24312e] [font-family:'Poppins',Helvetica]">
              No {activeTab === 'current' ? 'current' : 'past'} promo codes yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9f5f0] border-b-2 border-[#f9d2a3]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Discount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Usage
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Validity
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
                {promoCodes.map((promo, index) => (
                  <tr
                    key={promo.id}
                    className={`border-b border-[#f9d2a3] ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#faf7f3]'
                    } hover:bg-[#f9f5f0] transition-colors`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#ab4b28] [font-family:'Poppins',Helvetica]">
                        {promo.code}
                      </div>
                      {promo.description && (
                        <div className="text-xs text-gray-600 [font-family:'Poppins',Helvetica] mt-1">
                          {promo.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                      <div>
                        {promo.discount_type === 'percentage' ? (
                          <span className="font-semibold">{promo.discount_value}%</span>
                        ) : (
                          <span className="font-semibold">₹{promo.discount_value}</span>
                        )}
                        {promo.min_amount > 0 && (
                          <div className="text-xs text-gray-600">Min: ₹{promo.min_amount}</div>
                        )}
                        {promo.max_discount && (
                          <div className="text-xs text-gray-600">Max: ₹{promo.max_discount}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                      <div>
                        <span className="font-semibold">{promo.used_count}</span>
                        {promo.usage_limit ? (
                          <span className="text-gray-600"> / {promo.usage_limit}</span>
                        ) : (
                          <span className="text-gray-600"> / ∞</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                      <div className="text-xs">
                        <div>From: {new Date(promo.valid_from).toLocaleDateString()}</div>
                        <div>Until: {new Date(promo.valid_until).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded text-xs font-semibold [font-family:'Poppins',Helvetica] uppercase ${
                          isActive(promo)
                            ? 'bg-green-500 text-white'
                            : isExpired(promo.valid_until)
                            ? 'bg-gray-500 text-white'
                            : 'bg-yellow-500 text-white'
                        }`}
                      >
                        {isActive(promo) ? 'Active' : isExpired(promo.valid_until) ? 'Expired' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleView(promo)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="View Bookings"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(promo)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Promo Code"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Promo Code"
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

      {viewingPromo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="bg-[#ab4b28] px-6 py-4 flex items-center justify-between sticky top-0">
              <h2 className="text-2xl font-bold text-white [font-family:'Poppins',Helvetica]">
                Promo Code: {viewingPromo.code}
              </h2>
              <button
                onClick={() => setViewingPromo(null)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-[#f9f5f0] p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#24312e] mb-4 [font-family:'Poppins',Helvetica]">
                  Promo Code Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Discount</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {viewingPromo.discount_type === 'percentage' ? (
                        <>{viewingPromo.discount_value}%</>
                      ) : (
                        <>₹{viewingPromo.discount_value}</>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Usage</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {viewingPromo.used_count} / {viewingPromo.usage_limit || '∞'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Valid From</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {new Date(viewingPromo.valid_from).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 [font-family:'Poppins',Helvetica]">Valid Until</p>
                    <p className="text-base font-medium text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {new Date(viewingPromo.valid_until).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#f9f5f0] p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#24312e] mb-4 [font-family:'Poppins',Helvetica]">
                  Bookings Using This Code ({bookingsForPromo.length})
                </h3>
                {bookingsForPromo.length === 0 ? (
                  <p className="text-gray-600 [font-family:'Poppins',Helvetica]">No bookings found for this promo code.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white border-b-2 border-[#f9d2a3]">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                            Customer
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                            Event
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                            Amount
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingsForPromo.map((booking) => (
                          <tr key={booking.id} className="border-b border-[#f9d2a3]">
                            <td className="px-4 py-2 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                              <div className="font-medium">{booking.customer_name}</div>
                              <div className="text-xs text-gray-600">{booking.customer_email}</div>
                            </td>
                            <td className="px-4 py-2 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                              {booking.event_title}
                            </td>
                            <td className="px-4 py-2 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                              {booking.original_amount && booking.discount_amount ? (
                                <div>
                                  <div className="line-through text-gray-500">₹{booking.original_amount}</div>
                                  <div className="font-semibold text-[#ab4b28]">
                                    ₹{(booking.original_amount - booking.discount_amount).toFixed(2)}
                                  </div>
                                  <div className="text-xs text-green-600">Saved: ₹{booking.discount_amount}</div>
                                </div>
                              ) : (
                                <div>{booking.price}</div>
                              )}
                            </td>
                            <td className="px-4 py-2 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                              {new Date(booking.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-300">
                <button
                  onClick={() => {
                    setViewingPromo(null);
                    handleEdit(viewingPromo);
                  }}
                  className="flex-1 bg-[#ab4b28] hover:bg-[#8b3a1f] text-white py-3 rounded-lg font-semibold transition-colors [font-family:'Poppins',Helvetica]"
                >
                  Edit Promo Code
                </button>
                <button
                  onClick={() => setViewingPromo(null)}
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



