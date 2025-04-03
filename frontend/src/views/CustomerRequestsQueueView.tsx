import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CustomerRequest {
  id: number;
  customerName: string;
  customerId: number;
  requestType: string;
  channel: string;
  status: string;
  priority: string;
  createdAt: string;
  description: string;
  customerEmail?: string;
  customerPhone?: string;
}

const CustomerRequestsQueueView = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for customer requests queue
  const customerRequests: CustomerRequest[] = [
    {
      id: 1,
      customerId: 4,
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.johnson@example.com',
      customerPhone: '+1 (555) 876-5432',
      requestType: 'Technical Support',
      channel: 'Chat',
      status: 'New',
      priority: 'High',
      createdAt: '2025-04-02 09:30 AM',
      description: 'Unable to connect Smart Doorbell to WiFi network'
    },
    {
      id: 2,
      customerId: 1,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      customerPhone: '+1 (555) 123-4567',
      requestType: 'Installation Help',
      channel: 'Phone',
      status: 'In Progress',
      priority: 'Medium',
      createdAt: '2025-04-02 08:45 AM',
      description: 'Needs assistance with installing new camera system'
    },
    {
      id: 3,
      customerId: 2,
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@example.com',
      customerPhone: '+1 (555) 987-6543',
      requestType: 'Billing',
      channel: 'Email',
      status: 'Pending',
      priority: 'Low',
      createdAt: '2025-04-01 04:15 PM',
      description: 'Question about recent charge on account'
    },
    {
      id: 4,
      customerId: 5,
      customerName: 'Michael Wong',
      customerEmail: 'michael.wong@example.com',
      customerPhone: '+1 (555) 345-6789',
      requestType: 'Device Activation',
      channel: 'Chat',
      status: 'New',
      priority: 'Medium',
      createdAt: '2025-04-02 10:10 AM',
      description: 'Unable to activate new security system'
    },
    {
      id: 5,
      customerId: 3,
      customerName: 'Robert Chen',
      customerEmail: 'robert.chen@example.com',
      customerPhone: '+1 (555) 234-5678',
      requestType: 'Warranty Claim',
      channel: 'Phone',
      status: 'Escalated',
      priority: 'High',
      createdAt: '2025-04-01 02:30 PM',
      description: 'Device malfunctioning within warranty period'
    },
    {
      id: 6,
      customerId: 7,
      customerName: 'David Kim',
      customerEmail: 'david.kim@example.com',
      customerPhone: '+1 (555) 456-7890',
      requestType: 'Account Access',
      channel: 'Email',
      status: 'New',
      priority: 'Medium',
      createdAt: '2025-04-02 07:20 AM',
      description: 'Can\'t login to account after password reset'
    },
    {
      id: 7,
      customerId: 6,
      customerName: 'Lisa Garcia',
      customerEmail: 'lisa.garcia@example.com',
      customerPhone: '+1 (555) 765-4321',
      requestType: 'Subscription',
      channel: 'Chat',
      status: 'Pending',
      priority: 'Low',
      createdAt: '2025-04-01 03:40 PM',
      description: 'Looking to upgrade current subscription plan'
    }
  ];

  // Filter and search functionality
  const filteredRequests = customerRequests.filter(request => {
    // Filter by status
    if (filter !== 'all' && request.status.toLowerCase() !== filter.toLowerCase()) {
      return false;
    }
    
    // Search by customer name, request type, or description
    if (searchQuery !== '') {
      const query = searchQuery.toLowerCase();
      return (
        request.customerName.toLowerCase().includes(query) ||
        request.requestType.toLowerCase().includes(query) ||
        request.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const handleSelectRequest = (request: CustomerRequest, viewType: 'profile' | 'devices' | 'support' = 'support') => {
    // Store customer data with view type and request information
    const customerData = {
      id: request.customerId,
      name: request.customerName,
      email: request.customerEmail,
      phone: request.customerPhone,
      requestId: request.id,
      requestType: request.requestType,
      requestDescription: request.description,
      channel: request.channel,
      viewType: viewType  // Specify which tab to show in the profile view
    };
    
    // Store in verifiedCustomer for the verification component
    localStorage.setItem('verifiedCustomer', JSON.stringify(customerData));
    
    // Navigate to customer verification page
    navigate(`/customer-verification/${request.customerId}`);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-purple-100 text-purple-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'chat':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'phone':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'email':
        return (
          <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        );
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customer Request Queue</h1>
        <div className="text-sm text-gray-600">
          <span className="font-semibold">{filteredRequests.length}</span> requests in queue
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm ${filter === 'all' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('new')}
              className={`px-3 py-1 rounded-md text-sm ${filter === 'new' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              New
            </button>
            <button 
              onClick={() => setFilter('in progress')}
              className={`px-3 py-1 rounded-md text-sm ${filter === 'in progress' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              In Progress
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-md text-sm ${filter === 'pending' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter('escalated')}
              className={`px-3 py-1 rounded-md text-sm ${filter === 'escalated' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Escalated
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search requests..."
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-brand-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Requests table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map(request => (
                <tr 
                  key={request.id} 
                  className="hover:bg-gray-50 cursor-pointer" 
                  onClick={() => handleSelectRequest(request, 'support')}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand-accent bg-opacity-10 flex items-center justify-center text-brand-accent font-medium">
                        {request.customerName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.customerName}</div>
                        <div className="text-sm text-gray-500">{request.customerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{request.requestType}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{request.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getChannelIcon(request.channel)}
                      <span className="ml-1.5 text-sm text-gray-900">{request.channel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadgeClass(request.priority)}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from triggering
                          handleSelectRequest(request, 'profile');
                        }}
                        className="text-brand-accent hover:text-opacity-80 focus:outline-none focus:underline bg-white px-2 py-1 rounded-md border border-brand-accent text-xs"
                      >
                        Profile
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from triggering
                          handleSelectRequest(request, 'devices');
                        }}
                        className="text-brand-accent hover:text-opacity-80 focus:outline-none focus:underline bg-white px-2 py-1 rounded-md border border-brand-accent text-xs"
                      >
                        Devices
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from triggering
                          handleSelectRequest(request, 'support');
                        }}
                        className="text-brand-accent hover:text-opacity-80 focus:outline-none focus:underline bg-white px-2 py-1 rounded-md border border-brand-accent text-xs"
                      >
                        Support
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No requests found</h3>
            <p className="mt-1 text-sm text-gray-500">Try changing your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerRequestsQueueView;
