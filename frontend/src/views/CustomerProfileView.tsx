import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomerDetail from '../components/CustomerDetail';

interface CustomerProfileData {
  id: number;
  name: string;
  email: string;
  phone: string;
  requestType?: string;
  requestDescription?: string;
  viewType?: 'profile' | 'devices' | 'support';
}

const CustomerProfileView = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState<CustomerProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [verificationTime, setVerificationTime] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'devices' | 'support'>('profile');

  useEffect(() => {
    // Check if customer was verified
    const verified = localStorage.getItem('customerVerified') === 'true';
    setVerificationStatus(verified);
    
    // Get verification time
    const verifiedTime = localStorage.getItem('verificationTime');
    if (verifiedTime) {
      setVerificationTime(verifiedTime);
    }
    
    if (!verified) {
      // If not verified, redirect to verification
      navigate(`/customer-verification/${customerId}`);
      return;
    }
    
    // In a real app, fetch customer data from API
    // For demo, we'll use localStorage
    const storedCustomer = localStorage.getItem('selectedCustomer');
    
    if (storedCustomer) {
      const parsedCustomer = JSON.parse(storedCustomer);
      if (parsedCustomer.id.toString() === customerId) {
        setCustomerData(parsedCustomer);
        // Set active tab based on the view type in customer data
        if (parsedCustomer.viewType) {
          setActiveTab(parsedCustomer.viewType);
        }
      }
    }
    
    setLoading(false);
  }, [customerId, navigate]);

  const handleBackToQueue = () => {
    // Clear verified status
    localStorage.removeItem('customerVerified');
    // Navigate back to queue
    navigate('/customer-requests');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (!verificationStatus) {
    return null; // This will redirect in the useEffect
  }

  if (!customerData) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">Customer information not found</h3>
          <p className="mt-1 text-sm text-gray-500">Please go back and select a customer from the queue.</p>
          <button
            onClick={handleBackToQueue}
            className="mt-4 px-4 py-2 bg-brand-accent text-white rounded-md hover:bg-opacity-90"
          >
            Back to Queue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center">
        <button 
          onClick={handleBackToQueue}
          className="flex items-center text-brand-accent hover:underline"
        >
          <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Queue
        </button>
        
        <div className="ml-auto flex items-center space-x-2">
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Verified Customer
          </span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            Active Session
          </span>
          {verificationTime && (
            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
              Verified at: {new Date(verificationTime).toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile' 
              ? 'border-brand-accent text-brand-accent' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Customer Profile
          </button>
          <button
            onClick={() => setActiveTab('devices')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'devices' 
              ? 'border-brand-accent text-brand-accent' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Devices
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'support' 
              ? 'border-brand-accent text-brand-accent' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Support History
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'profile' && (
        <>
          <CustomerDetail
            customer={{
              id: customerData.id,
              name: customerData.name,
              email: customerData.email,
              phone: customerData.phone
            }}
            onClose={handleBackToQueue}
          />
          
          {/* Show request info that led to this customer profile */}
          {customerData?.requestType && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h3 className="text-sm font-medium text-yellow-800">Current Request Information</h3>
              <p className="mt-1 text-sm text-yellow-700"><strong>Type:</strong> {customerData.requestType}</p>
              {customerData.requestDescription && (
                <p className="mt-1 text-sm text-yellow-700"><strong>Description:</strong> {customerData.requestDescription}</p>
              )}
            </div>
          )}
        </>
      )}
      
      {/* Devices Tab Content */}
      {activeTab === 'devices' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Device Management</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Device 1 */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">Pro Doorbell</h3>
                  <p className="text-sm text-gray-500">Front door</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Online</span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Battery</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Signal</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button className="text-sm text-brand-accent hover:underline">Live View</button>
                <button className="text-sm text-brand-accent hover:underline">Diagnostics</button>
              </div>
            </div>
            
            {/* Device 2 */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">Indoor Cam</h3>
                  <p className="text-sm text-gray-500">Living room</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Online</span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Signal</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button className="text-sm text-brand-accent hover:underline">Live View</button>
                <button className="text-sm text-brand-accent hover:underline">Diagnostics</button>
              </div>
            </div>
            
            {/* Device 3 */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">Smart Thermostat</h3>
                  <p className="text-sm text-gray-500">Main floor</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Offline</span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Battery</span>
                    <span>15%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-red-500 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button className="text-sm text-gray-400 cursor-not-allowed">Live View</button>
                <button className="text-sm text-brand-accent hover:underline">Diagnostics</button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="bg-brand-accent text-white px-4 py-2 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-colors">
              Run Remote Diagnostics
            </button>
          </div>
        </div>
      )}
      
      {/* Support Tab Content */}
      {activeTab === 'support' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Support History</h2>
          
          <div className="space-y-6">
            {/* Support Ticket 1 */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">Setup assistance</h3>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Resolved</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Customer needed help connecting the Pro Doorbell to their WiFi network.</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Ticket #T-10234</span>
                <span>Created: 10/03/2024</span>
                <span>Resolved: 10/03/2024</span>
              </div>
            </div>
            
            {/* Support Ticket 2 */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">Connectivity issue</h3>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Open</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Smart Thermostat keeps going offline. Customer reports low battery notifications.</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Ticket #T-10283</span>
                <span>Created: 02/04/2025</span>
                <span>Agent: Sam Batman</span>
              </div>
            </div>
            
            {/* Communication Log */}
            <div className="mt-8">
              <h3 className="font-medium text-gray-900 mb-4">Recent Communications</h3>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm">Chat</span>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">4 minute conversation about thermostat battery replacement options.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm">Phone Call</span>
                      <span className="text-xs text-gray-500">3 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Customer called about doorbell installation. Call duration: 6m 12s.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm">Email</span>
                      <span className="text-xs text-gray-500">Yesterday</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Follow-up email sent with battery replacement instructions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* This is normally hidden as the CustomerDetail component renders it inline */}
      <style jsx>{`
        .fixed { position: static !important; }
        .inset-0 { position: static !important; }
        .bg-black.bg-opacity-30 { background: transparent !important; }
      `}</style>
    </div>
  );
};

export default CustomerProfileView;
