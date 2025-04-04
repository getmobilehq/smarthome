import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Types for issue categorization based on the agent journey
type IssueCategory = 'connectivity' | 'account' | 'delivery' | 'device';
type ChannelType = 'chat' | 'email' | 'phone' | 'sms' | 'video' | 'social';

interface CustomerRequest {
  id: number;
  customerName: string;
  customerId: number;
  requestType: string;
  category: IssueCategory;
  channel: ChannelType;
  status: string;
  priority: string;
  createdAt: string;
  waitTime: string; // Added for wait time display
  description: string;
  customerEmail?: string;
  customerPhone?: string;
}

const CustomerRequestsQueueView = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'waitTime' | 'priority' | 'createdAt'>('waitTime');

  // Mock data for customer requests queue with updated fields
  const customerRequests: CustomerRequest[] = [
    {
      id: 1,
      customerId: 4,
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.johnson@example.com',
      customerPhone: '+1 (555) 876-5432',
      requestType: 'WiFi Connection',
      category: 'connectivity',
      channel: 'chat',
      status: 'New',
      priority: 'High',
      createdAt: '2025-04-02 09:30 AM',
      waitTime: '10 mins',
      description: 'Unable to connect Smart Doorbell to WiFi network'
    },
    {
      id: 2,
      customerId: 1,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      customerPhone: '+1 (555) 123-4567',
      requestType: 'Installation Help',
      category: 'device',
      channel: 'phone',
      status: 'In Progress',
      priority: 'Medium',
      createdAt: '2025-04-02 08:45 AM',
      waitTime: '25 mins',
      description: 'Needs assistance with installing new camera system'
    },
    {
      id: 3,
      customerId: 2,
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@example.com',
      customerPhone: '+1 (555) 987-6543',
      requestType: 'Billing Inquiry',
      category: 'account',
      channel: 'email',
      status: 'Pending',
      priority: 'Low',
      createdAt: '2025-04-01 04:15 PM',
      waitTime: '18 hrs',
      description: 'Question about recent charge on account'
    },
    {
      id: 4,
      customerId: 5,
      customerName: 'Michael Wong',
      customerEmail: 'michael.wong@example.com',
      customerPhone: '+1 (555) 345-6789',
      requestType: 'Device Activation',
      category: 'device',
      channel: 'chat',
      status: 'New',
      priority: 'Medium',
      createdAt: '2025-04-02 10:10 AM',
      waitTime: '5 mins',
      description: 'Unable to activate new security system'
    },
    {
      id: 5,
      customerId: 3,
      customerName: 'Robert Chen',
      customerEmail: 'robert.chen@example.com',
      customerPhone: '+1 (555) 234-5678',
      requestType: 'Device Malfunction',
      category: 'device',
      channel: 'phone',
      status: 'Escalated',
      priority: 'High',
      createdAt: '2025-04-01 02:30 PM',
      waitTime: '20 hrs',
      description: 'Device malfunctioning within warranty period'
    },
    {
      id: 6,
      customerId: 7,
      customerName: 'David Kim',
      customerEmail: 'david.kim@example.com',
      customerPhone: '+1 (555) 456-7890',
      requestType: 'Login Issues',
      category: 'account',
      channel: 'email',
      status: 'New',
      priority: 'Medium',
      createdAt: '2025-04-02 07:20 AM',
      waitTime: '2.5 hrs',
      description: 'Can\'t login to account after password reset'
    },
    {
      id: 7,
      customerId: 6,
      customerName: 'Lisa Garcia',
      customerEmail: 'lisa.garcia@example.com',
      customerPhone: '+1 (555) 765-4321',
      requestType: 'Subscription Change',
      category: 'account',
      channel: 'chat',
      status: 'Pending',
      priority: 'Low',
      createdAt: '2025-04-01 03:40 PM',
      waitTime: '19 hrs',
      description: 'Looking to upgrade current subscription plan'
    },
    {
      id: 8,
      customerId: 8,
      customerName: 'Emma Thompson',
      customerEmail: 'emma.thompson@example.com',
      customerPhone: '+1 (555) 222-3333',
      requestType: 'Late Delivery',
      category: 'delivery',
      channel: 'sms',
      status: 'New',
      priority: 'High',
      createdAt: '2025-04-02 11:20 AM',
      waitTime: '1.5 hrs',
      description: 'Package was supposed to arrive yesterday but still not delivered'
    },
    {
      id: 9,
      customerId: 9,
      customerName: 'Marcus Johnson',
      customerEmail: 'marcus.j@example.com',
      customerPhone: '+1 (555) 444-5555',
      requestType: 'Network Outage',
      category: 'connectivity',
      channel: 'video',
      status: 'New',
      priority: 'High',
      createdAt: '2025-04-02 10:45 AM',
      waitTime: '3 mins',
      description: 'All smart devices disconnected after power outage'
    },
    {
      id: 10,
      customerId: 10,
      customerName: 'Sophia Lee',
      customerEmail: 'sophia.lee@example.com',
      customerPhone: '+1 (555) 666-7777',
      requestType: 'Installation Complaint',
      category: 'delivery',
      channel: 'social',
      status: 'Escalated',
      priority: 'High',
      createdAt: '2025-04-02 09:15 AM',
      waitTime: '45 mins',
      description: 'Technician was unprofessional and left without completing installation'
    }
  ];

  // Enhanced filter and search functionality
  const filteredRequests = customerRequests.filter(request => {
    // Filter by status
    if (statusFilter !== 'all' && request.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    
    // Filter by channel
    if (channelFilter !== 'all' && request.channel !== channelFilter) {
      return false;
    }
    
    // Filter by category
    if (categoryFilter !== 'all' && request.category !== categoryFilter) {
      return false;
    }
    
    // Filter by priority
    if (priorityFilter !== 'all' && request.priority.toLowerCase() !== priorityFilter.toLowerCase()) {
      return false;
    }
    
    // Search by customer name, request type, or description
    if (searchQuery !== '') {
      const query = searchQuery.toLowerCase();
      return (
        request.customerName.toLowerCase().includes(query) ||
        request.requestType.toLowerCase().includes(query) ||
        request.description.toLowerCase().includes(query) ||
        request.customerEmail?.toLowerCase().includes(query) ||
        request.customerPhone?.includes(query)
      );
    }
    
    return true;
  });
  
  // Sort the filtered requests based on selected sort criteria
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortBy === 'priority') {
      // Sort by priority (High > Medium > Low)
      const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    } else if (sortBy === 'waitTime') {
      // For demo purposes, we're not parsing the wait time strings properly
      // In a real app, you'd convert these to comparable values
      // For now, we'll just rely on the ID (lower ID = been waiting longer)
      return a.id - b.id;
    } else {
      // Sort by created date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
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
      case 'sms':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'video':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'social':
        return (
          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
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
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'connectivity':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        );
      case 'account':
        return (
          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'delivery':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      case 'device':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
        <div className="flex flex-wrap gap-4">
          {/* Status Filters */}
          <div className="w-full">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-md text-sm ${statusFilter === 'all' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                All Status
              </button>
              <button 
                onClick={() => setStatusFilter('new')}
                className={`px-3 py-1 rounded-md text-sm ${statusFilter === 'new' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                New
              </button>
              <button 
                onClick={() => setStatusFilter('in progress')}
                className={`px-3 py-1 rounded-md text-sm ${statusFilter === 'in progress' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                In Progress
              </button>
              <button 
                onClick={() => setStatusFilter('pending')}
                className={`px-3 py-1 rounded-md text-sm ${statusFilter === 'pending' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Pending
              </button>
              <button 
                onClick={() => setStatusFilter('escalated')}
                className={`px-3 py-1 rounded-md text-sm ${statusFilter === 'escalated' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Escalated
              </button>
            </div>
          </div>

          {/* Channel Filters */}
          <div className="w-full">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Channel</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setChannelFilter('all')}
                className={`px-3 py-1 rounded-md text-sm ${channelFilter === 'all' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                All Channels
              </button>
              <button 
                onClick={() => setChannelFilter('chat')}
                className={`px-3 py-1 rounded-md text-sm ${channelFilter === 'chat' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Live Chat
              </button>
              <button 
                onClick={() => setChannelFilter('phone')}
                className={`px-3 py-1 rounded-md text-sm ${channelFilter === 'phone' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Phone
              </button>
              <button 
                onClick={() => setChannelFilter('email')}
                className={`px-3 py-1 rounded-md text-sm ${channelFilter === 'email' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Email
              </button>
              <button 
                onClick={() => setChannelFilter('sms')}
                className={`px-3 py-1 rounded-md text-sm ${channelFilter === 'sms' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                SMS
              </button>
              <button 
                onClick={() => setChannelFilter('video')}
                className={`px-3 py-1 rounded-md text-sm ${channelFilter === 'video' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Video
              </button>
              <button 
                onClick={() => setChannelFilter('social')}
                className={`px-3 py-1 rounded-md text-sm ${channelFilter === 'social' ? 'bg-blue-400 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Social Media
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="w-full">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Issue Category</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setCategoryFilter('all')}
                className={`px-3 py-1 rounded-md text-sm ${categoryFilter === 'all' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                All Categories
              </button>
              <button 
                onClick={() => setCategoryFilter('connectivity')}
                className={`px-3 py-1 rounded-md text-sm ${categoryFilter === 'connectivity' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Connectivity
              </button>
              <button 
                onClick={() => setCategoryFilter('account')}
                className={`px-3 py-1 rounded-md text-sm ${categoryFilter === 'account' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Account
              </button>
              <button 
                onClick={() => setCategoryFilter('delivery')}
                className={`px-3 py-1 rounded-md text-sm ${categoryFilter === 'delivery' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Delivery/Complaints
              </button>
              <button 
                onClick={() => setCategoryFilter('device')}
                className={`px-3 py-1 rounded-md text-sm ${categoryFilter === 'device' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Device Issues
              </button>
            </div>
          </div>

          {/* Priority and Sorting */}
          <div className="w-full flex justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Priority</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setPriorityFilter('all')}
                  className={`px-3 py-1 rounded-md text-sm ${priorityFilter === 'all' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setPriorityFilter('high')}
                  className={`px-3 py-1 rounded-md text-sm ${priorityFilter === 'high' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'}`}
                >
                  High
                </button>
                <button 
                  onClick={() => setPriorityFilter('medium')}
                  className={`px-3 py-1 rounded-md text-sm ${priorityFilter === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}
                >
                  Medium
                </button>
                <button 
                  onClick={() => setPriorityFilter('low')}
                  className={`px-3 py-1 rounded-md text-sm ${priorityFilter === 'low' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}
                >
                  Low
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSortBy('waitTime')}
                  className={`px-3 py-1 rounded-md text-sm ${sortBy === 'waitTime' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Wait Time
                </button>
                <button 
                  onClick={() => setSortBy('priority')}
                  className={`px-3 py-1 rounded-md text-sm ${sortBy === 'priority' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Priority
                </button>
                <button 
                  onClick={() => setSortBy('createdAt')}
                  className={`px-3 py-1 rounded-md text-sm ${sortBy === 'createdAt' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Created Time
                </button>
              </div>
            </div>
          </div>
          
          {/* Search */}
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search by name, phone, email, issue description..."
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-brand-accent"
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wait Time</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedRequests.map(request => (
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
                      {getCategoryIcon(request.category)}
                      <span className="ml-1.5 text-sm text-gray-900 capitalize">{request.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getChannelIcon(request.channel)}
                      <span className="ml-1.5 text-sm text-gray-900 capitalize">{request.channel}</span>
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
                    {request.waitTime}
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
        
        {sortedRequests.length === 0 && (
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
