import React, { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Calendar, Users, BookOpen, ClipboardList, Home } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/admin/events', icon: Calendar, label: 'Events' },
    { path: '/admin/classes', icon: BookOpen, label: 'Classes' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/bookings', icon: ClipboardList, label: 'Bookings' },
    { path: '/admin/blogs', icon: BookOpen, label: 'Blogs' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#f9f5f0] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r-2 border-[#f9d2a3] shadow-sm flex-shrink-0 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b-2 border-[#f9d2a3]">
          <h1 className="text-2xl font-bold text-[#ab4b28] [font-family:'Poppins',Helvetica]">
            MEHER Admin
          </h1>
        </div>

        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors [font-family:'Poppins',Helvetica] ${
                      active
                        ? 'bg-[#ab4b28] text-white'
                        : 'text-[#24312e] hover:bg-[#f9d2a3]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t-2 border-[#f9d2a3]">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors [font-family:'Poppins',Helvetica]"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

