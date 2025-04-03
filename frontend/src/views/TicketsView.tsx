import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicketsView = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock ticket data - would typically be fetched from API
  const tickets = [
    { id: 'TCKT-001', subject: 'Camera Offline', customer: 'John Doe', status: 'Open', priority: 'High', channel: 'Email', lastUpdate: '1 hour ago' },
    { id: 'TCKT-002', subject: 'Smart Lock Battery Low', customer: 'Jane Smith', status: 'In Progress', priority: 'Medium', channel: 'Chat', lastUpdate: '3 hours ago' },
    { id: 'TCKT-003', subject: 'Hub Connection Issue', customer: 'Robert Chen', status: 'Open', priority: 'High', channel: 'Call', lastUpdate: '5 hours ago' },
    { id: 'TCKT-004', subject: 'Motion Sensor False Alarms', customer: 'Sarah Johnson', status: 'Pending', priority: 'Medium', channel: 'Email', lastUpdate: '1 day ago' },
    { id: 'TCKT-005', subject: 'Smoke Detector Beeping', customer: 'Michael Wong', status: 'Open', priority: 'Urgent', channel: 'Social', lastUpdate: '2 hours ago' },
    { id: 'TCKT-006', subject: 'Setup Assistance', customer: 'Lisa Garcia', status: 'Closed', priority: 'Low', channel: 'Chat', lastUpdate: '2 days ago' },
    { id: 'TCKT-007', subject: 'Mobile App Login Issue', customer: 'David Kim', status: 'In Progress', priority: 'Medium', channel: 'Email', lastUpdate: '6 hours ago' },
  ];

  // Filter options
  const filterOptions = ['All', 'Open', 'In Progress', 'Pending', 'Closed'];
  const priorities = ['All Priorities', 'Urgent', 'High', 'Medium', 'Low'];

  // Apply filters and search
  const filteredTickets = tickets.filter(ticket => {
    // Apply status filter
    if (selectedFilter !== 'All' && ticket.status !== selectedFilter) {
      return false;
    }
    
    // Apply search query
    if (searchQuery && !ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !ticket.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Helper function for status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-purple-100 text-purple-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Ticket Management</h1>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedFilter === filter 
                    ? 'bg-brand-accent text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <select className="bg-white border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-brand-accent">
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search tickets..."
                className="bg-white border border-gray-300 rounded-md py-1 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="h-5 w-5 text-gray-400 absolute right-3 top-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <button className="bg-brand-accent text-white py-1 px-4 rounded-md hover:bg-opacity-90">
              New Ticket
            </button>
          </div>
        </div>
      </div>
      
      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTickets.map((ticket) => (
              <tr 
                key={ticket.id} 
                className="hover:bg-gray-50 cursor-pointer" 
                onClick={() => navigate(`/ticket/${ticket.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-accent">{ticket.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.channel}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.lastUpdate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      navigate(`/ticket/${ticket.id}`);
                    }}
                    className="text-brand-accent hover:text-indigo-900 mr-3"
                  >
                    View
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      // Would open edit form in real app
                      alert(`Edit ticket ${ticket.id}`);
                    }}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTickets.length}</span> of <span className="font-medium">{filteredTickets.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-brand-accent hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsView;
