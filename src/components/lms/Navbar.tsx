import React, { useState } from 'react';
import { SearchIcon, BellIcon, MenuIcon, XIcon, GraduationIcon, BookIcon, DashboardIcon, HomeIcon } from './Icons';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, searchQuery, onSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const notifications = [
    { id: 1, text: 'New lesson available in Web Development', time: '2h ago', unread: true },
    { id: 2, text: 'You earned a completion badge!', time: '5h ago', unread: true },
    { id: 3, text: 'Assignment deadline tomorrow', time: '1d ago', unread: false },
    { id: 4, text: 'New course recommendation for you', time: '2d ago', unread: false },
  ];

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'catalog', label: 'Courses', icon: BookIcon },
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <GraduationIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Learn<span className="text-blue-600">Hub</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <div className="hidden lg:flex items-center relative">
              <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                onFocus={() => onNavigate('catalog')}
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BellIcon className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                            n.unread ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {n.unread && <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>}
                            <div className={n.unread ? '' : 'ml-5'}>
                              <p className="text-sm text-gray-700">{n.text}</p>
                              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center border-t border-gray-100">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all notifications</button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile */}
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-sm hover:shadow-md transition-shadow"
            >
              JD
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="lg:hidden pb-3">
            <div className="relative">
              <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                onFocus={() => onNavigate('catalog')}
                className="pl-10 pr-4 py-2.5 w-full bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  currentView === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
