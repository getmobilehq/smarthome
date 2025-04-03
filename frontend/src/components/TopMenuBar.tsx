import React from 'react';
import { useNavigate } from 'react-router-dom';

// Placeholder for routing logic (e.g., using React Router)

interface TopMenuBarProps {
  agentData?: {
    id: string;
    name: string;
    role: string;
  } | null;
  onLogout?: () => void;
}

// Use consistent component syntax
const TopMenuBar: React.FC<TopMenuBarProps> = ({ agentData, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-brand-accent text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with subtle animation on hover */}
          <div className="flex-shrink-0 flex items-center">
            <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-white"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-2xl font-bold tracking-tight hover:text-opacity-90 transition-all cursor-pointer">
              Smarthome Agent
            </span>
          </div>

          {/* Menu Items with interactive hover effects */}
          <div className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => navigate('/customer-requests')} 
              className="px-4 py-2 rounded-md font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all"
            >
              Requests
            </button>
            <button 
              onClick={() => navigate('/dashboard')} 
              className="px-4 py-2 rounded-md font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/tickets')} 
              className="px-4 py-2 rounded-md font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all"
            >
              Tickets
            </button>
            <button 
              onClick={() => navigate('/customers')} 
              className="px-4 py-2 rounded-md font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all"
            >
              Customers
            </button>
            <button 
              onClick={() => navigate('/reports')} 
              className="px-4 py-2 rounded-md font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all"
            >
              Reports
            </button>
            <button 
              onClick={() => navigate('/provisioning')} 
              className="px-4 py-2 rounded-md font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all"
            >
              Remote
            </button>
            <button 
              onClick={() => navigate('/settings')} 
              className="px-4 py-2 rounded-md font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all"
            >
              Settings
            </button>
          </div>

          {/* Right Side items: Notifications & Profile */}
          <div className="flex items-center space-x-4">
            {/* Search box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70 rounded-full py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40"
              />
              <svg className="h-4 w-4 text-white absolute right-2.5 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Notification bell with indicator */}
            <div className="relative">
              <button className="p-1 rounded-full text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {/* Notification indicator */}
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-brand-accent"></span>
              </button>
            </div>

            {/* Agent Profile */}
            <div className="flex items-center space-x-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{agentData?.name || 'Agent'}</p>
                <p className="text-xs text-white text-opacity-80">{agentData?.role || 'Support'}</p>
              </div>
              <div className="relative">
                <button 
                  type="button" 
                  className="flex rounded-full bg-white bg-opacity-10 p-0.5 ring-2 ring-white ring-opacity-30 hover:ring-opacity-60 transition-all"
                  onClick={() => document.getElementById('user-menu')?.classList.toggle('hidden')}
                >
                  <img className="h-8 w-8 rounded-full object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Agent profile" />
                </button>
                
                {/* Dropdown menu */}
                <div id="user-menu" className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <button 
                    onClick={onLogout} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button - shown only on small screens */}
      <div className="md:hidden border-t border-white border-opacity-20 px-4 py-3">
        <button className="flex items-center w-full justify-between text-white">
          <span>Menu</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default TopMenuBar;
