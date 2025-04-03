import React from 'react';
import CustomerProfilePanel from './CustomerProfilePanel';
import TicketChatInterface from './TicketChatInterface';
import SupplementaryPanel from './SupplementaryPanel';
import LiveDeviceDiagnosticsPanel from './LiveDeviceDiagnosticsPanel';

// Using consistent component syntax
const DashboardLayout = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1">
        <CustomerProfilePanel />
      </div>

      <div className="md:col-span-1 flex flex-col gap-4">
        <TicketChatInterface />
        <LiveDeviceDiagnosticsPanel />
      </div>

      <div className="md:col-span-1">
        <SupplementaryPanel />
      </div>
    </div>
  );
};

export default DashboardLayout;
