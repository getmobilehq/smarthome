import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomerVerification from '../components/CustomerVerification';

interface SelectedCustomer {
  id: number;
  name: string;
  email: string;
  phone: string;
  requestId?: number;
  requestType?: string;
  requestDescription?: string;
  channel?: string;
  viewType?: 'profile' | 'devices' | 'support';
}

const CustomerVerificationView = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<SelectedCustomer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Try to get customer data from verifiedCustomer set by the queue view
    const verifiedCustomerJSON = localStorage.getItem('verifiedCustomer');
    
    let customerData = null;
    
    if (verifiedCustomerJSON) {
      try {
        customerData = JSON.parse(verifiedCustomerJSON);
      } catch (e) {
        console.error("Error parsing verifiedCustomer data:", e);
        setError('Failed to load customer data.');
        setLoading(false);
        return;
      }
    }
    
    // Check if data exists and the ID matches the URL parameter
    if (customerData && customerData.id.toString() === customerId) { 
      setCustomer(customerData);
    } else if (!customerData) {
      setError('Customer data not found in session.'); // More specific error
    } else {
      setError('Customer ID mismatch.'); // More specific error
    }
    
    setLoading(false);
  }, [customerId]);

  const handleVerify = (pin: string) => {
    // In a real application, you would validate the PIN against the backend
    // For demo purposes, we'll accept any PIN
    console.log(`PIN provided for customer ${customer?.name}: ${pin}`);
    
    // Store verification success in session
    localStorage.setItem('customerVerified', 'true');
    
    // Store the verification time
    localStorage.setItem('verificationTime', new Date().toISOString());
    
    // Make sure we preserve the viewType from customer data
    // If there's no customer data in verifiedCustomer already, store it now
    if (customer) {
      // Store or update the customer in verifiedCustomer for the profile view
      localStorage.setItem('verifiedCustomer', JSON.stringify(customer));
    }
    
    // Navigate to customer profile
    navigate(`/customer-profile/${customerId}`);
  };

  const handleCancel = () => {
    navigate('/customer-requests'); // Go back to the queue
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">{error}</h3>
          <p className="mt-1 text-sm text-gray-500">Please go back and select a customer from the queue.</p>
          <button
            onClick={() => navigate('/customer-requests')}
            className="mt-4 px-4 py-2 bg-brand-accent text-white rounded-md hover:bg-opacity-90"
          >
            Back to Queue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-brand-accent text-white p-4">
          <h2 className="text-lg font-semibold">Customer Verification Required</h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="h-12 w-12 rounded-full bg-brand-accent bg-opacity-10 flex items-center justify-center text-brand-accent font-semibold text-lg mr-4">
              {customer?.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{customer?.name}</h3>
              <p className="text-sm text-gray-500">{customer?.email}</p>
              <p className="text-sm text-gray-500">{customer?.phone}</p>
            </div>
          </div>
          
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Request Information:</h4>
            <p className="text-sm text-gray-900 font-medium">{customer?.requestType}</p>
            <p className="text-sm text-gray-600 mt-1">{customer?.requestDescription}</p>
            <div className="flex items-center mt-2">
              <span className="text-xs text-gray-500">Via:</span>
              <span className="ml-1 text-xs font-medium text-gray-700">{customer?.channel}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            For security purposes, you must verify the customer's identity before accessing their full profile and providing support.
          </p>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to Queue
            </button>
            <button
              onClick={() => {
                // Show the CustomerVerification component
                document.getElementById('verification-modal')?.classList.remove('hidden');
              }}
              className="px-4 py-2 bg-brand-accent text-white rounded-md text-sm font-medium hover:bg-opacity-90"
            >
              Verify Customer
            </button>
          </div>
        </div>
      </div>
      
      {/* Hidden verification modal that will be shown when the Verify Customer button is clicked */}
      <div id="verification-modal" className="hidden">
        {customer && (
          <CustomerVerification
            customerName={customer.name}
            onVerify={handleVerify}
            onCancel={() => {
              document.getElementById('verification-modal')?.classList.add('hidden');
            }}
          />
        )}
      </div>
      
      {/* Add this to automatically show verification on page load */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
              document.getElementById('verification-modal')?.classList.remove('hidden');
            }, 500);
          });
        `
      }} />
    </div>
  );
};

export default CustomerVerificationView;
