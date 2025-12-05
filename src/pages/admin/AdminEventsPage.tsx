import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { CalendarEvent } from '../../lib/supabase';
import { Plus, Edit2, Trash2, AlertCircle, Check, Link as LinkIcon } from 'lucide-react';

export const AdminEventsPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '',
    price: '',
    duration: '',
    event_date: '',
    start_date: '',
    end_date: '',
    timeSlots: '',
    image_url: '',
    expanded_description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchEvents();
  }, []);

  // Helper function to convert time string to minutes for sorting (e.g., "10:00 AM" -> 600)
  const timeToMinutes = (timeStr: string): number => {
    const trimmed = timeStr.trim().toUpperCase();
    const match = trimmed.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
    if (!match) return Infinity; // Invalid time format goes to end
    
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3];
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return hours * 60 + minutes;
  };

  // Helper function to get earliest time slot from an event
  const getEarliestTime = (timeSlots: string[]): number => {
    if (!timeSlots || timeSlots.length === 0) return Infinity;
    const times = timeSlots.map(timeToMinutes);
    return Math.min(...times);
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .order('event_date', { ascending: true }); // Sort by date first

      if (error) throw error;
      
      // Sort events by date, then by earliest time slot within each date
      const sortedEvents = (data || []).sort((a, b) => {
        // First sort by date
        const dateA = new Date(a.event_date).getTime();
        const dateB = new Date(b.event_date).getTime();
        if (dateA !== dateB) {
          return dateA - dateB; // Ascending date order
        }
        
        // If same date, sort by earliest time slot
        const timeA = getEarliestTime(a.time_slots || []);
        const timeB = getEarliestTime(b.time_slots || []);
        return timeA - timeB; // Ascending time order
      });
      
      setEvents(sortedEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      showNotification('error', 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('event-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from('event-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (err) {
      console.error('Error uploading image:', err);
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const eventData = {
        title: formData.title,
        description: formData.description,
        tag: formData.tag,
        price: formData.price,
        duration: formData.duration,
        event_date: formData.event_date,
        start_date: formData.start_date || formData.event_date,
        end_date: formData.end_date || formData.event_date,
        time_slots: formData.timeSlots.split(',').map(slot => slot.trim()),
        image_url: imageUrl,
        expanded_description: formData.expanded_description,
      };

      if (editingEvent) {
        const { error } = await supabase
          .from('calendar_events')
          .update(eventData)
          .eq('id', editingEvent.id);

        if (error) throw error;
        showNotification('success', 'Event updated successfully');
      } else {
        const { error } = await supabase
          .from('calendar_events')
          .insert([eventData]);

        if (error) throw error;
        showNotification('success', 'Event created successfully');
      }

      resetForm();
      fetchEvents();
    } catch (err) {
      console.error('Error saving event:', err);
      showNotification('error', 'Failed to save event');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const { error } = await supabase
        .from('calendar_events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showNotification('success', 'Event deleted successfully');
      fetchEvents();
    } catch (err) {
      console.error('Error deleting event:', err);
      showNotification('error', 'Failed to delete event');
    }
  };

  const handleEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      tag: event.tag,
      price: event.price,
      duration: event.duration,
      event_date: event.event_date,
      start_date: event.start_date || event.event_date,
      end_date: event.end_date || event.event_date,
      timeSlots: event.time_slots.join(', '),
      image_url: event.image_url,
      expanded_description: event.expanded_description,
    });
    setImagePreview(event.image_url);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      tag: '',
      price: '',
      duration: '',
      event_date: '',
      start_date: '',
      end_date: '',
      timeSlots: '',
      image_url: '',
      expanded_description: '',
    });
    setImageFile(null);
    setImagePreview('');
    setEditingEvent(null);
    setShowForm(false);
  };

  const showNotification = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const copyShareableLink = (eventId: string) => {
    const baseUrl = window.location.origin;
    const shareableLink = `${baseUrl}/calendar?event=${eventId}`;
    
    navigator.clipboard.writeText(shareableLink).then(() => {
      showNotification('success', 'Link copied to clipboard!');
    }).catch(() => {
      showNotification('error', 'Failed to copy link');
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#24312e] mb-8 [font-family:'Poppins',Helvetica]">
        Events Management
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

      <div className="mb-8">
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 bg-[#ab4b28] hover:bg-[#8b3a1f] text-white px-6 py-3 rounded-lg transition-colors [font-family:'Poppins',Helvetica] font-semibold"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add New Event'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-[#f9d2a3]">
          <h2 className="text-2xl font-bold text-[#24312e] mb-6 [font-family:'Poppins',Helvetica]">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
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
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="e.g., Morning Yoga Session"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Tag *
                </label>
                <select
                  required
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                >
                  <option value="">Select a tag</option>
                  <option value="UPCOMING">UPCOMING</option>
                  <option value="FEATURED">FEATURED</option>
                  <option value="POPULAR">POPULAR</option>
                </select>
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
                  Duration *
                </label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="e.g., 60 Minutes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Event Date * (Display Date)
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
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  End Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Facilitator Description *
                </label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="e.g., Facilitator: Yoga Master"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Time Slots (comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.timeSlots}
                  onChange={(e) => setFormData({ ...formData, timeSlots: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica]"
                  placeholder="e.g., 10:00 AM, 11:00 AM, 2:00 PM"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Detailed Description
                </label>
                <textarea
                  value={formData.expanded_description}
                  onChange={(e) => setFormData({ ...formData, expanded_description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] focus:border-[#ab4b28] focus:outline-none [font-family:'Poppins',Helvetica] h-32"
                  placeholder="Provide additional details about the event..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#24312e] mb-2 [font-family:'Poppins',Helvetica]">
                  Event Image
                </label>
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 rounded-lg border-2 border-[#f9d2a3] [font-family:'Poppins',Helvetica]"
                    />
                    <p className="text-xs text-[#24312e] mt-1 [font-family:'Poppins',Helvetica]">
                      Recommended size: 400x300px
                    </p>
                  </div>
                  {imagePreview && (
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-[#ab4b28]">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#ab4b28] hover:bg-[#8b3a1f] disabled:bg-[#cccccc] text-white py-3 rounded-lg font-semibold transition-colors [font-family:'Poppins',Helvetica] uppercase"
            >
              {submitting ? 'Saving...' : editingEvent ? 'Update Event' : 'Create Event'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#f9d2a3]">
        <div className="px-6 py-4 bg-gradient-to-r from-[#f9d2a3] to-[#fce8d3]">
          <h2 className="text-xl font-bold text-[#24312e] [font-family:'Poppins',Helvetica]">
            Calendar Events ({events.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <p className="text-[#24312e] [font-family:'Poppins',Helvetica]">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[#24312e] [font-family:'Poppins',Helvetica]">
              No events yet. Create one to get started!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9f5f0] border-b-2 border-[#f9d2a3]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Tag
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Link
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr
                    key={event.id}
                    className={`border-b border-[#f9d2a3] ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#faf7f3]'
                    } hover:bg-[#f9f5f0] transition-colors`}
                  >
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica] font-medium">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {new Date(event.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {event.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#24312e] [font-family:'Poppins',Helvetica]">
                      {event.duration}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-[#ab4b28] text-white px-3 py-1 rounded text-xs font-semibold [font-family:'Poppins',Helvetica] uppercase">
                        {event.tag}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => copyShareableLink(event.id)}
                        className="flex items-center gap-1 p-2 text-[#ab4b28] hover:bg-[#f9d2a3] rounded-lg transition-colors group"
                        title="Copy shareable link"
                      >
                        <LinkIcon className="w-4 h-4" />
                        <span className="text-xs font-medium [font-family:'Poppins',Helvetica]">Copy</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
    </div>
  );
};




