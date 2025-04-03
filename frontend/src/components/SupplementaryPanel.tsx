import React, { FunctionComponent } from 'react';

const SupplementaryPanel: FunctionComponent = () => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-4">Product Purchase History</h2>
      <ul className="list-disc pl-5">
        <li>Smart Bulb - Purchased on 2025-01-15</li>
        <li>Smart Thermostat - Purchased on 2024-12-10</li>
      </ul>
      <h3 className="text-lg font-semibold mt-4">Key Metrics</h3>
      <p>Customer Satisfaction: 95%</p>
      <p>Average Response Time: 3 mins</p>
    </div>
  );
};

export default SupplementaryPanel;
