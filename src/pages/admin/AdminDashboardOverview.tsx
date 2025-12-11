import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Calendar, Users, BookOpen, ClipboardList } from 'lucide-react';

export const AdminDashboardOverview: React.FC = () => {
  const [stats, setStats] = useState({
    events: 0,
    classes: 0,
    users: 0,
    bookings: 0,
    blogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const [events, classes, bookingsResult, blogs] = await Promise.all([
        supabase.from('calendar_events').select('id', { count: 'exact', head: true }),
        supabase.from('classes').select('id', { count: 'exact', head: true }),
        supabase.from('bookings').select('customer_email'),
        supabase.from('blogs').select('id', { count: 'exact', head: true }),
      ]);

      const uniqueUsers = new Set(
        (bookingsResult.data || []).map((booking: any) => booking.customer_email)
      ).size;

      setStats({
        events: events.count || 0,
        classes: classes.count || 0,
        users: uniqueUsers,
        bookings: bookingsResult.data?.length || 0,
        blogs: blogs.count || 0,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Events',
      value: stats.events,
      icon: Calendar,
      color: 'bg-[#ab4b28]',
      href: '/admin/events',
    },
    {
      label: 'Classes',
      value: stats.classes,
      icon: BookOpen,
      color: 'bg-blue-500',
      href: '/admin/classes',
    },
    {
      label: 'Users',
      value: stats.users,
      icon: Users,
      color: 'bg-green-500',
      href: '/admin/users',
    },
    {
      label: 'Bookings',
      value: stats.bookings,
      icon: ClipboardList,
      color: 'bg-purple-500',
      href: '/admin/bookings',
    },
    {
      label: 'Blogs',
      value: stats.blogs,
      icon: BookOpen,
      color: 'bg-orange-500',
      href: '/admin/blogs',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#24312e] [font-family:'Poppins',Helvetica]">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#24312e] mb-8 [font-family:'Poppins',Helvetica]">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-lg shadow-md p-6 border-2 border-[#f9d2a3] hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => (window.location.href = card.href)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#24312e] [font-family:'Poppins',Helvetica] mb-2">
                    {card.label}
                  </p>
                  <p className="text-3xl font-bold text-[#24312e] [font-family:'Poppins',Helvetica]">
                    {card.value}
                  </p>
                </div>
                <div className={`${card.color} p-4 rounded-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 border-2 border-[#f9d2a3]">
        <h2 className="text-xl font-bold text-[#24312e] mb-4 [font-family:'Poppins',Helvetica]">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/events"
            className="p-4 bg-[#f9d2a3] hover:bg-[#fce8d3] rounded-lg transition-colors [font-family:'Poppins',Helvetica] text-center font-medium text-[#24312e]"
          >
            Manage Events
          </a>
          <a
            href="/admin/classes"
            className="p-4 bg-[#f9d2a3] hover:bg-[#fce8d3] rounded-lg transition-colors [font-family:'Poppins',Helvetica] text-center font-medium text-[#24312e]"
          >
            Manage Classes
          </a>
          <a
            href="/admin/users"
            className="p-4 bg-[#f9d2a3] hover:bg-[#fce8d3] rounded-lg transition-colors [font-family:'Poppins',Helvetica] text-center font-medium text-[#24312e]"
          >
            Manage Users
          </a>
          <a
            href="/admin/bookings"
            className="p-4 bg-[#f9d2a3] hover:bg-[#fce8d3] rounded-lg transition-colors [font-family:'Poppins',Helvetica] text-center font-medium text-[#24312e]"
          >
            View Bookings
          </a>
          <a
            href="/admin/blogs"
            className="p-4 bg-[#f9d2a3] hover:bg-[#fce8d3] rounded-lg transition-colors [font-family:'Poppins',Helvetica] text-center font-medium text-[#24312e]"
          >
            Manage Blogs
          </a>
        </div>
      </div>
    </div>
  );
};

