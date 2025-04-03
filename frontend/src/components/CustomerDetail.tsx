import React from 'react';

interface Device {
  id: number;
  name: string;
  status: string;
  batteryLevel?: number;
  signalStrength?: number;
}

interface Ticket {
  id: number;
  subject: string;
  status: string;
  createdAt: string;
  priority: string;
}

interface Communication {
  type: string;
  date: string;
  duration?: string;
  content?: string;
}

interface AccountInfo {
  id: number;
  plan: string;
  warrantyExpiration?: string;
  customerSince: string;
}

interface CustomerDetailProps {
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  onClose: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer, onClose }) => {
  // Mock data - in a real app this would come from API calls
  const devices: Device[] = [
    { id: 1, name: 'Pro Doorbell', status: 'online', batteryLevel: 85, signalStrength: 90 },
    { id: 2, name: 'Indoor Cam', status: 'online', signalStrength: 85 },
    { id: 3, name: 'Smart Thermostat', status: 'offline', batteryLevel: 15 }
  ];
  
  const recentTickets: Ticket[] = [
    { 
      id: 1, 
      subject: 'Setup assistance', 
      status: 'resolved', 
      createdAt: '10/03/2024', 
      priority: 'medium' 
    },
    { 
      id: 2, 
      subject: 'Connectivity issue', 
      status: 'open', 
      createdAt: '02/04/2024', 
      priority: 'high' 
    }
  ];
  
  const communications: Communication[] = [
    { type: 'call', date: '2 days ago', duration: '4m 30s' },
    { type: 'email', date: 'Yesterday', content: 'Support follow-up' }
  ];
  
  const accountInfo: AccountInfo = {
    id: customer.id,
    plan: 'Premium Security Bundle',
    warrantyExpiration: 'Dec 2024',
    customerSince: 'Jan 2024'
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg m-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-brand-accent rounded-full flex items-center justify-center text-white text-xl font-semibold mr-4">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
                <p className="text-gray-600">{customer.email}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex mb-4 border-b border-gray-200">
            <button className="px-4 py-2 text-brand-accent font-medium border-b-2 border-brand-accent">
              Customer Information
            </button>
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
              Support Requests
            </button>
            <button className="px-4 py-2 ml-auto bg-brand-accent text-white rounded-md hover:bg-opacity-90">
              Verify Customer Identity
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Devices Section */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Devices</h3>
              <div className="space-y-4">
                {devices.map(device => (
                  <div key={device.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{device.name}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeClass(device.status)}`}>
                        {device.status}
                      </span>
                    </div>
                    {device.batteryLevel !== undefined && (
                      <div className="flex items-center mb-1">
                        <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${device.batteryLevel}%` }}></div>
                        </div>
                        <span className="ml-2 text-xs text-gray-600">{device.batteryLevel}%</span>
                      </div>
                    )}
                    {device.signalStrength !== undefined && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        </svg>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${device.signalStrength}%` }}></div>
                        </div>
                        <span className="ml-2 text-xs text-gray-600">{device.signalStrength}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm text-brand-accent hover:underline">Run Diagnostics</button>
            </div>
            
            {/* Recent Tickets Section */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tickets</h3>
              {recentTickets.length > 0 ? (
                <div className="space-y-4">
                  {recentTickets.map(ticket => (
                    <div key={ticket.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{ticket.subject}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeClass(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Created: {ticket.createdAt}</span>
                        <span className={`px-2 py-0.5 rounded-full ${getStatusBadgeClass(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No recent tickets found.</p>
              )}
              <button className="mt-4 text-sm text-brand-accent hover:underline">View All Tickets</button>
            </div>
            
            {/* Communication History */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication History</h3>
              {communications.length > 0 ? (
                <div className="space-y-4">
                  {communications.map((comm, idx) => (
                    <div key={idx} className="flex items-start pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      {comm.type === 'call' ? (
                        <svg className="w-5 h-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-sm">{comm.type === 'call' ? 'Last call' : 'Email sent'}</span>
                          <span className="ml-2 text-xs text-gray-500">{comm.date}</span>
                        </div>
                        {comm.duration && <p className="text-xs text-gray-600">Duration: {comm.duration}</p>}
                        {comm.content && <p className="text-xs text-gray-600">{comm.content}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No communication history found.</p>
              )}
              <div className="mt-4 flex space-x-2">
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat
                </button>
              </div>
            </div>
            
            {/* Account Information */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <span className="text-sm text-gray-600">Premium Security Bundle</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="text-sm text-gray-600">Active Warranty until Dec 2024</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <span className="text-sm text-gray-600">Customer since Jan 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
