import React from 'react';

const CustomerProfilePanel: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Customer Profile</h2>
      
      <div className="mb-4">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
        <p><strong>Contact:</strong> +1234567890</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Plan Details</h3>
        <p><strong>Plan:</strong> SmartHome Secure Pro</p>
        <p><strong>Status:</strong> Active</p>
        <p><strong>Installation Date:</strong> 2024-11-01</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Contact History Summary</h3>
        <ul className="list-disc pl-5 text-sm">
          <li>Call: 2025-04-01 - Connectivity Issue</li>
          <li>Chat: 2025-03-30 - Setup Question</li>
          <li>Email: 2025-03-15 - Billing Inquiry</li>
        </ul>
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">Device Status Overview</h3>
        <ul className="list-disc pl-5 text-sm">
          <li>Doorbell Camera: Online</li>
          <li>Indoor Camera 1: Offline</li>
          <li>Outdoor Camera: Online</li>
        </ul>
      </div>

    </div>
  );
};

export default CustomerProfilePanel;
