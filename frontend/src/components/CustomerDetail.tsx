import React, { useState } from 'react';

interface Device {
  id: number;
  name: string;
  status: string;
  batteryLevel?: number;
  signalStrength?: number;
  location?: string;
  type: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  lastActive?: string;
  firmwareVersion?: string;
  issues?: string[];
}

interface Ticket {
  id: number;
  subject: string;
  status: string;
  createdAt: string;
  closedAt?: string;
  priority: string;
  description?: string;
  assignedTo?: string;
  category?: string;
}

interface Communication {
  id: number;
  type: string;
  date: string;
  duration?: string;
  content?: string;
  agentName?: string;
  channel?: string;
}

interface AccountInfo {
  id: number;
  plan: string;
  planDetails: string;
  planPrice: string;
  billingCycle: string;
  nextBillingDate: string;
  paymentMethod: string;
  warrantyExpiration?: string;
  customerSince: string;
  accountStatus: string;
  preferredContactMethod: string;
}

interface PaymentHistory {
  id: number;
  date: string;
  amount: string;
  method: string;
  status: string;
  invoiceNumber: string;
}

interface SecurityDetail {
  verificationMethod: string;
  lastVerified: string;
  securityQuestions: number;
  twoFactorEnabled: boolean;
  securityLevel: string;
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
  // State for active tabs in the component
  const [activeSection, setActiveSection] = useState('details'); // details, billing, security
  
  // Mock data - in a real app this would come from API calls
  const devices: Device[] = [
    { 
      id: 1, 
      name: 'Pro Doorbell', 
      status: 'online', 
      batteryLevel: 85, 
      signalStrength: 90,
      location: 'Front Door',
      type: 'Doorbell',
      model: 'SmartHome Pro Doorbell v2',
      serialNumber: 'DB2349857',
      purchaseDate: '01/15/2024',
      lastActive: '04/03/2025 15:42',
      firmwareVersion: '2.1.4',
      issues: []
    },
    { 
      id: 2, 
      name: 'Indoor Cam', 
      status: 'online', 
      signalStrength: 85,
      location: 'Living Room',
      type: 'Camera',
      model: 'SmartHome Indoor Cam',
      serialNumber: 'CAM6782341',
      purchaseDate: '01/15/2024',
      lastActive: '04/03/2025 16:20',
      firmwareVersion: '1.3.2',
      issues: []
    },
    { 
      id: 3, 
      name: 'Smart Thermostat', 
      status: 'offline', 
      batteryLevel: 15,
      location: 'Main Floor',
      type: 'Thermostat',
      model: 'SmartHome Thermostat Plus',
      serialNumber: 'TH8762140',
      purchaseDate: '01/30/2024',
      lastActive: '04/02/2025 08:15',
      firmwareVersion: '3.0.1',
      issues: ['Low battery warning', 'Connectivity issues']
    },
    { 
      id: 4, 
      name: 'Motion Sensor', 
      status: 'online', 
      batteryLevel: 67,
      location: 'Kitchen',
      type: 'Sensor',
      model: 'SmartHome Motion Detector',
      serialNumber: 'MS4523789',
      purchaseDate: '02/10/2024',
      lastActive: '04/03/2025 14:30',
      firmwareVersion: '1.1.5',
      issues: []
    }
  ];
  
  const recentTickets: Ticket[] = [
    { 
      id: 1, 
      subject: 'Setup assistance', 
      status: 'resolved', 
      createdAt: '03/10/2025', 
      closedAt: '03/10/2025',
      priority: 'medium',
      description: 'Customer needed help connecting the Pro Doorbell to their WiFi network',
      assignedTo: 'Sarah Chen',
      category: 'Installation'
    },
    { 
      id: 2, 
      subject: 'Connectivity issue', 
      status: 'open', 
      createdAt: '04/02/2025', 
      priority: 'high',
      description: 'Smart Thermostat keeps going offline. Customer reports low battery notifications.',
      assignedTo: 'Mike Johnson',
      category: 'Connectivity'
    },
    { 
      id: 3, 
      subject: 'Billing inquiry', 
      status: 'resolved', 
      createdAt: '03/15/2025',
      closedAt: '03/16/2025', 
      priority: 'low',
      description: 'Customer asked about changing their subscription plan',
      assignedTo: 'Taylor Swift',
      category: 'Billing'
    }
  ];
  
  const communications: Communication[] = [
    { id: 1, type: 'call', date: '2 days ago', duration: '4m 30s', agentName: 'Mike Johnson', channel: 'Support' },
    { id: 2, type: 'email', date: 'Yesterday', content: 'Battery replacement instructions for Smart Thermostat', agentName: 'Support Team', channel: 'Automated' },
    { id: 3, type: 'chat', date: '3 days ago', duration: '10m 15s', content: 'Troubleshooting doorbell connectivity issues', agentName: 'Sarah Chen', channel: 'Live Chat' },
    { id: 4, type: 'sms', date: '1 week ago', content: 'Appointment confirmation for device installation', agentName: 'Scheduling Team', channel: 'Automated' }
  ];
  
  const accountInfo: AccountInfo = {
    id: customer.id,
    plan: 'Premium Security Bundle',
    planDetails: 'Includes 24/7 monitoring, unlimited video storage, and premium support',
    planPrice: '$24.99/month',
    billingCycle: 'Monthly',
    nextBillingDate: '05/01/2025',
    paymentMethod: 'Visa ending in 4242',
    warrantyExpiration: 'December 30, 2025',
    customerSince: 'January 15, 2024',
    accountStatus: 'Active',
    preferredContactMethod: 'Email'
  };
  
  const paymentHistory: PaymentHistory[] = [
    {
      id: 1,
      date: '04/01/2025',
      amount: '$24.99',
      method: 'Visa **** 4242',
      status: 'Completed',
      invoiceNumber: 'INV-20250401-7851'
    },
    {
      id: 2,
      date: '03/01/2025',
      amount: '$24.99',
      method: 'Visa **** 4242',
      status: 'Completed',
      invoiceNumber: 'INV-20250301-6423'
    },
    {
      id: 3,
      date: '02/01/2025',
      amount: '$24.99',
      method: 'Visa **** 4242',
      status: 'Completed',
      invoiceNumber: 'INV-20250201-5190'
    }
  ];
  
  const securityDetails: SecurityDetail = {
    verificationMethod: localStorage.getItem('verificationMethod') || 'pin',
    lastVerified: localStorage.getItem('verificationTime') || new Date().toISOString(),
    securityQuestions: 3,
    twoFactorEnabled: true,
    securityLevel: 'High'
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
      <div className="bg-white rounded-lg shadow-lg m-4 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header with Customer Basic Info */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-brand-accent rounded-full flex items-center justify-center text-white text-xl font-semibold mr-4">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
                <div className="flex space-x-2 items-center">
                  <p className="text-gray-600">{customer.email}</p>
                  <span className="text-gray-400">|</span>
                  <p className="text-gray-600">{customer.phone}</p>
                </div>
                <div className="flex mt-1 space-x-2">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                    {accountInfo.accountStatus}
                  </span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                    {accountInfo.plan}
                  </span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800">
                    Verified: {new Date(securityDetails.lastVerified).toLocaleTimeString()}
                  </span>
                </div>
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
          
          {/* Navigation Tabs */}
          <div className="flex mb-4 border-b border-gray-200">
            <button 
              onClick={() => setActiveSection('details')}
              className={`px-4 py-2 text-sm font-medium ${activeSection === 'details' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Account Details
            </button>
            <button 
              onClick={() => setActiveSection('billing')}
              className={`px-4 py-2 text-sm font-medium ${activeSection === 'billing' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Billing & Payments
            </button>
            <button 
              onClick={() => setActiveSection('security')}
              className={`px-4 py-2 text-sm font-medium ${activeSection === 'security' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Security & Verification
            </button>
            <button className="px-4 py-2 ml-auto bg-brand-accent text-white rounded-md hover:bg-opacity-90 text-sm">
              Contact Customer
            </button>
          </div>
          
          {/* Account Details Section */}
          {activeSection === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Information Section */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
                  <button className="text-xs text-brand-accent hover:underline">Edit</button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <p className="text-xs text-gray-500 mb-1">Account Number</p>
                      <p className="text-sm font-medium">#{accountInfo.id.toString().padStart(8, '0')}</p>
                    </div>
                    <div className="col-span-1">
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <p className="text-sm font-medium">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${accountInfo.accountStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {accountInfo.accountStatus}
                        </span>
                      </p>
                    </div>
                    <div className="col-span-1">
                      <p className="text-xs text-gray-500 mb-1">Customer Since</p>
                      <p className="text-sm font-medium">{accountInfo.customerSince}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500 mb-1">Contact Preferences</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <span className={`h-2 w-2 rounded-full ${accountInfo.preferredContactMethod === 'Email' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        <span className="text-sm">Email</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className={`h-2 w-2 rounded-full ${accountInfo.preferredContactMethod === 'Phone' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        <span className="text-sm">Phone</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className={`h-2 w-2 rounded-full ${accountInfo.preferredContactMethod === 'SMS' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        <span className="text-sm">SMS</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500 mb-1">Plan Information</p>
                    <p className="text-sm font-medium">{accountInfo.plan}</p>
                    <p className="text-xs text-gray-500 mt-1">{accountInfo.planDetails}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <span className="text-sm font-medium">{accountInfo.planPrice}</span>
                        <span className="text-xs text-gray-500 ml-1">({accountInfo.billingCycle})</span>
                      </div>
                      <button className="text-xs text-brand-accent hover:underline">Change Plan</button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500 mb-1">Warranty Information</p>
                    <p className="text-sm">
                      <span className="font-medium">Warranty Expiration:</span> {accountInfo.warrantyExpiration}
                    </p>
                    <button className="text-xs text-brand-accent hover:underline mt-2">View Warranty Details</button>
                  </div>
                </div>
              </div>
              
              {/* Device Inventory Section with Status Indicators */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Device Inventory</h3>
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center text-xs">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                      Online
                    </span>
                    <span className="inline-flex items-center text-xs">
                      <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                      Offline
                    </span>
                    <span className="inline-flex items-center text-xs">
                      <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
                      Warning
                    </span>
                  </div>
                </div>
                
                <div className="overflow-hidden border border-gray-200 rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {devices.map(device => (
                        <tr key={device.id} className="hover:bg-gray-50 cursor-pointer">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                                {device.type === 'Camera' && (
                                  <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                )}
                                {device.type === 'Doorbell' && (
                                  <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                  </svg>
                                )}
                                {device.type === 'Thermostat' && (
                                  <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                  </svg>
                                )}
                                {device.type === 'Sensor' && (
                                  <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                )}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{device.name}</p>
                                <p className="text-xs text-gray-500">{device.model}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <span className={`h-2.5 w-2.5 rounded-full mr-2 ${device.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                              <span className="text-sm">{device.status === 'online' ? 'Online' : 'Offline'}</span>
                              {device.batteryLevel !== undefined && device.batteryLevel < 20 && (
                                <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">Low Battery</span>
                              )}
                            </div>
                            {device.batteryLevel !== undefined && (
                              <div className="flex items-center mt-1">
                                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className={`h-1.5 rounded-full ${device.batteryLevel > 50 ? 'bg-green-500' : device.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                    style={{ width: `${device.batteryLevel}%` }}></div>
                                </div>
                                <span className="ml-1 text-xs text-gray-500">{device.batteryLevel}%</span>
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">{device.location}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{device.lastActive}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <button className="text-xs text-brand-accent hover:underline">View Device Details</button>
                  <button className="text-xs text-brand-accent hover:underline">Run Remote Diagnostics</button>
                </div>
              </div>
              
              {/* Recent Activity Section */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <button className="text-xs text-brand-accent hover:underline">View All Activity</button>
                </div>
                
                <div className="space-y-4">
                  {/* Combine Recent Tickets and Communications */}
                  <div className="overflow-hidden border border-gray-200 rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status/Agent</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* For simplicity, we'll just show tickets here */}
                        {recentTickets.map(ticket => (
                          <tr key={`ticket-${ticket.id}`} className="hover:bg-gray-50 cursor-pointer">
                            <td className="px-4 py-3 text-sm">{ticket.createdAt}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Support</span>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-sm font-medium text-gray-900">{ticket.subject}</p>
                              <p className="text-xs text-gray-500 truncate max-w-xs">{ticket.description}</p>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(ticket.status)}`}>
                                {ticket.status}
                              </span>
                              <p className="text-xs text-gray-500 mt-1">{ticket.assignedTo}</p>
                            </td>
                          </tr>
                        ))}
                        
                        {/* Show some communications too */}
                        {communications.map(comm => (
                          <tr key={`comm-${comm.id}`} className="hover:bg-gray-50 cursor-pointer">
                            <td className="px-4 py-3 text-sm">{comm.date}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">{comm.type}</span>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-sm font-medium text-gray-900">{comm.channel}</p>
                              <p className="text-xs text-gray-500 truncate max-w-xs">{comm.content || `Duration: ${comm.duration}`}</p>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-xs text-gray-500">{comm.agentName}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Billing & Payments Section */}
          {activeSection === 'billing' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Plan Section */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-semibold text-blue-900">{accountInfo.plan}</h4>
                      <p className="text-sm text-blue-800 mt-1">{accountInfo.planDetails}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-900">{accountInfo.planPrice}</p>
                      <p className="text-xs text-blue-800">{accountInfo.billingCycle}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Next billing date</p>
                    <p className="text-sm font-medium">{accountInfo.nextBillingDate}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Payment method</p>
                    <p className="text-sm font-medium">{accountInfo.paymentMethod}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Auto-renewal</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Enabled
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <button className="px-3 py-1.5 border border-gray-300 text-sm text-gray-700 rounded-md hover:bg-gray-50">
                    Change Payment Method
                  </button>
                  <button className="px-3 py-1.5 bg-brand-accent text-white text-sm rounded-md hover:bg-opacity-90">
                    Upgrade Plan
                  </button>
                </div>
              </div>
              
              {/* Billing Summary Section */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Billing Summary</h3>
                  <button className="text-xs text-brand-accent hover:underline">Download Statement</button>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-500">Current Month Charges</p>
                    <p className="text-sm font-medium">$24.99</p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-500">Additional Services</p>
                    <p className="text-sm font-medium">$0.00</p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-500">Taxes & Fees</p>
                    <p className="text-sm font-medium">$2.50</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <p className="text-sm font-medium">Total</p>
                    <p className="text-sm font-bold">$27.49</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <div className="flex">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Your next payment will be processed on {accountInfo.nextBillingDate}</p>
                      <p className="text-xs text-gray-500 mt-1">Using {accountInfo.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment History Section */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
                  <button className="text-xs text-brand-accent hover:underline">Export All</button>
                </div>
                
                <div className="overflow-hidden border border-gray-200 rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paymentHistory.map(payment => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-brand-accent">{payment.invoiceNumber}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{payment.date}</td>
                          <td className="px-4 py-3 text-sm font-medium">{payment.amount}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{payment.method}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{payment.status}</span>
                          </td>
                          <td className="px-4 py-3 text-sm space-x-2">
                            <button className="text-brand-accent hover:underline">View</button>
                            <button className="text-brand-accent hover:underline">Download</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {paymentHistory.length > 3 && (
                  <div className="mt-4 flex justify-center">
                    <button className="text-sm text-brand-accent hover:underline">View More History</button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Security & Verification Section */}
          {activeSection === 'security' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Security Overview Section */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Security Overview</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${securityDetails.securityLevel === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {securityDetails.securityLevel} Protection
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-brand-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">Last Verified</p>
                        <p className="text-xs text-gray-500">{new Date(securityDetails.lastVerified).toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Verified
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-brand-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">Verification Method</p>
                        <p className="text-xs text-gray-500">
                          {securityDetails.verificationMethod === 'pin' && 'PIN Code'}
                          {securityDetails.verificationMethod === 'email' && 'Email Verification'}
                          {securityDetails.verificationMethod === 'phone' && 'Phone Verification'}
                          {securityDetails.verificationMethod === 'security' && 'Security Questions'}
                          {securityDetails.verificationMethod === 'device' && 'Device Verification'}
                        </p>
                      </div>
                    </div>
                    <button className="text-xs text-brand-accent hover:underline">
                      Change
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-brand-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-500">{securityDetails.twoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
                      </div>
                    </div>
                    <button className="text-xs text-brand-accent hover:underline">
                      {securityDetails.twoFactorEnabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-brand-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">Security Questions</p>
                        <p className="text-xs text-gray-500">{securityDetails.securityQuestions} questions set</p>
                      </div>
                    </div>
                    <button className="text-xs text-brand-accent hover:underline">
                      Manage
                    </button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="w-full px-4 py-2 bg-brand-accent text-white rounded-md hover:bg-opacity-90 text-sm font-medium">
                    Verify Identity Now
                  </button>
                </div>
              </div>
              
              {/* Device Authorization Section */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Authorized Devices</h3>
                  <button className="text-xs text-brand-accent hover:underline">Manage All</button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {devices.map(device => (
                    <div key={`auth-${device.id}`} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{device.name}</p>
                            <p className="text-xs text-gray-500">SN: {device.serialNumber}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">Authorized</span>
                          <p className="text-xs text-gray-500 mt-1">Last Active: {device.lastActive}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex">
                    <svg className="w-5 h-5 text-yellow-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Important Security Information</p>
                      <p className="text-xs text-yellow-700 mt-1">
                        For device verification and remote control, we recommend enabling two-factor authentication 
                        and keeping all device firmware up to date.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Verification History Section */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Verification History</h3>
                </div>
                
                <div className="overflow-hidden border border-gray-200 rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{new Date(securityDetails.lastVerified).toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm">
                          {securityDetails.verificationMethod === 'pin' && 'PIN Code'}
                          {securityDetails.verificationMethod === 'email' && 'Email Verification'}
                          {securityDetails.verificationMethod === 'phone' && 'Phone Verification'}
                          {securityDetails.verificationMethod === 'security' && 'Security Questions'}
                          {securityDetails.verificationMethod === 'device' && 'Device Verification'}
                        </td>
                        <td className="px-4 py-3 text-sm">Support Agent</td>
                        <td className="px-4 py-3 text-sm">192.168.1.1</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Successful</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{new Date(new Date(securityDetails.lastVerified).getTime() - 86400000).toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm">PIN Code</td>
                        <td className="px-4 py-3 text-sm">Web Portal</td>
                        <td className="px-4 py-3 text-sm">192.168.1.1</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Successful</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{new Date(new Date(securityDetails.lastVerified).getTime() - 172800000).toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm">Email Verification</td>
                        <td className="px-4 py-3 text-sm">Mobile App</td>
                        <td className="px-4 py-3 text-sm">192.168.1.1</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Failed</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
