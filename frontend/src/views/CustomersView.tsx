import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerVerification from '../components/CustomerVerification';
import CustomerDetail from '../components/CustomerDetail';

const CustomersView = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedViewType, setSelectedViewType] = useState<'profile' | 'devices' | 'support'>('profile');
  const [showVerification, setShowVerification] = useState(false);
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);
  
  // Mock customer data - would come from API in real application
  const customers = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      phone: '+1 (555) 123-4567', 
      plan: 'Premium Security', 
      devices: 8, 
      status: 'Active',
      lastContact: '2025-04-01',
      registrationDate: '2023-11-15'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane.smith@example.com', 
      phone: '+1 (555) 987-6543', 
      plan: 'Basic Security', 
      devices: 3, 
      status: 'Active',
      lastContact: '2025-03-28',
      registrationDate: '2024-01-05'
    },
    { 
      id: 3, 
      name: 'Robert Chen', 
      email: 'robert.chen@example.com', 
      phone: '+1 (555) 234-5678', 
      plan: 'Premium Plus', 
      devices: 12, 
      status: 'Active',
      lastContact: '2025-03-30',
      registrationDate: '2022-06-20'
    },
    { 
      id: 4, 
      name: 'Sarah Johnson', 
      email: 'sarah.johnson@example.com', 
      phone: '+1 (555) 876-5432', 
      plan: 'Basic Security', 
      devices: 4, 
      status: 'Suspended',
      lastContact: '2025-02-15',
      registrationDate: '2023-08-12'
    },
    { 
      id: 5, 
      name: 'Michael Wong', 
      email: 'michael.wong@example.com', 
      phone: '+1 (555) 345-6789', 
      plan: 'Premium Security', 
      devices: 6, 
      status: 'Active',
      lastContact: '2025-04-02',
      registrationDate: '2023-05-18'
    },
    { 
      id: 6, 
      name: 'Lisa Garcia', 
      email: 'lisa.garcia@example.com', 
      phone: '+1 (555) 765-4321', 
      plan: 'Basic Security', 
      devices: 2, 
      status: 'Inactive',
      lastContact: '2025-01-10',
      registrationDate: '2024-02-01'
    },
    { 
      id: 7, 
      name: 'David Kim', 
      email: 'david.kim@example.com', 
      phone: '+1 (555) 456-7890', 
      plan: 'Premium Plus', 
      devices: 15, 
      status: 'Active',
      lastContact: '2025-03-25',
      registrationDate: '2022-11-30'
    },
  ];

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => {
    if (searchQuery === '') return true;
    
    const query = searchQuery.toLowerCase();
    return (
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.phone.includes(query) ||
      customer.plan.toLowerCase().includes(query)
    );
  });

  // Helper function for status badge styling
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <button className="bg-brand-accent text-white py-2 px-4 rounded-md hover:bg-opacity-90 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Customer
        </button>
      </div>
      
      {/* Filters and search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2">
            <select className="bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-accent">
              <option>All Plans</option>
              <option>Basic Security</option>
              <option>Premium Security</option>
              <option>Premium Plus</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-accent">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Suspended</option>
            </select>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
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
      
      {/* Customers cards - grid view */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredCustomers.map(customer => (
          <div 
            key={customer.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="border-b border-gray-200 px-6 py-4 cursor-pointer" onClick={() => {
              setSelectedCustomer(customer);
              setSelectedViewType('profile');
              setShowVerification(true);
            }}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                  <p className="text-sm text-gray-500">{customer.phone}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(customer.status)}`}>
                  {customer.status}
                </span>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Plan:</span>
                <span className="text-sm font-medium">{customer.plan}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Devices:</span>
                <span className="text-sm font-medium">{customer.devices}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Last Contact:</span>
                <span className="text-sm font-medium">{customer.lastContact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Customer Since:</span>
                <span className="text-sm font-medium">{customer.registrationDate}</span>
              </div>
            </div>
            
            {/* Action buttons for different views */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-between">
              <button 
                onClick={() => {
                  setSelectedCustomer(customer);
                  setSelectedViewType('devices');
                  setShowVerification(true);
                }}
                className="text-sm text-brand-accent hover:underline flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Devices
              </button>
              <button 
                onClick={() => {
                  setSelectedCustomer(customer);
                  setSelectedViewType('support');
                  setShowVerification(true);
                }}
                className="text-sm text-brand-accent hover:underline flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Support
              </button>
            </div>
            
            {/* We've replaced this with the new buttons in the tab row above */}
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCustomers.length}</span> of <span className="font-medium">{filteredCustomers.length}</span> customers
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

      {/* Customer Verification Modal */}
      {showVerification && selectedCustomer && (
        <CustomerVerification
          customerName={selectedCustomer.name}
          onVerify={(pin) => {
            // In a real app, you would validate the PIN with the backend
            // For demo purposes, we'll accept any PIN
            setShowVerification(false);
            
            // Store verification status and time
            localStorage.setItem('customerVerified', 'true');
            localStorage.setItem('verificationTime', new Date().toISOString());
            
            // Store customer data with the selected view type
            const customerWithViewType = {
              id: selectedCustomer.id,
              name: selectedCustomer.name,
              email: selectedCustomer.email,
              phone: selectedCustomer.phone || '+1 (555) 123-4567',
              viewType: selectedViewType,
              // Add request info if available for support agents
              requestType: 'Technical Support',
              requestDescription: 'Customer is having issues with device connectivity'
            };
            
            // Store in localStorage as verifiedCustomer (used by CustomerProfileView)
            localStorage.setItem('verifiedCustomer', JSON.stringify(customerWithViewType));
            
            console.log(`Customer ${selectedCustomer.name} verified with PIN: ${pin}`);
            
            // Navigate to the customer profile view
            navigate(`/customer-profile/${selectedCustomer.id}`);
          }}
          onCancel={() => {
            setShowVerification(false);
            setSelectedCustomer(null);
          }}
        />
      )}

      {/* Customer Detail View */}
      {showCustomerDetail && selectedCustomer && (
        <CustomerDetail 
          customer={{
            id: selectedCustomer.id,
            name: selectedCustomer.name,
            email: selectedCustomer.email,
            phone: selectedCustomer.phone || '+1 (555) 123-4567'
          }}
          onClose={() => {
            setShowCustomerDetail(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
};

export default CustomersView;
