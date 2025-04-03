import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import DashboardLayout from './components/DashboardLayout';
import TopMenuBar from './components/TopMenuBar'; 
import AgentLogin from './components/AgentLogin';

// Import the actual view components
import TicketsView from './views/TicketsView';
import CustomersView from './views/CustomersView';
import ReportsView from './views/ReportsView';
import CustomerRequestsQueueView from './views/CustomerRequestsQueueView';
import CustomerVerificationView from './views/CustomerVerificationView';
import CustomerProfileView from './views/CustomerProfileView';
import TicketDetailView from './views/TicketDetailView';
import PerformanceMonitoringView from './views/PerformanceMonitoringView';
import RemoteProvisioningView from './views/RemoteProvisioningView';

// Main dashboard view just uses the original layout
const DashboardView = () => <DashboardLayout />;

// Settings view (placeholder for now)
const SettingsView = () => (
  <div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
    <div className="bg-white shadow-md rounded-lg p-6">
      <p className="text-gray-600">Settings panel is under development.</p>
    </div>
  </div>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [agentData, setAgentData] = useState<{id: string; name: string; role: string} | null>(null);
  
  // Check if agent is already logged in (from localStorage)
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedAgentData = localStorage.getItem('agentData');
    
    if (storedAuth === 'true' && storedAgentData) {
      setIsAuthenticated(true);
      setAgentData(JSON.parse(storedAgentData));
    }
  }, []);
  
  const handleLogin = (agentId: string, pin: string) => {
    // In a real application, this would validate against a backend service
    // For demo purposes, we'll use hardcoded values
    if (agentId && pin) {
      const mockAgentData = {
        id: agentId,
        name: 'Sam Batman',
        role: 'Support Agent'
      };
      
      setIsAuthenticated(true);
      setAgentData(mockAgentData);
      
      // Store in localStorage for persistence
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('agentData', JSON.stringify(mockAgentData));
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAgentData(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('agentData');
  };
  
  if (!isAuthenticated) {
    return <AgentLogin onLogin={handleLogin} />;
  }
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TopMenuBar agentData={agentData} onLogout={handleLogout} />
      <main className="flex-grow overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/customer-requests" replace />} /> 
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/customer-requests" element={<CustomerRequestsQueueView />} />
          <Route path="/customer-verification/:customerId" element={<CustomerVerificationView />} />
          <Route path="/customer-profile/:customerId" element={<CustomerProfileView />} />
          <Route path="/tickets" element={<TicketsView />} />
          <Route path="/ticket/:ticketId" element={<TicketDetailView />} />
          <Route path="/customers" element={<CustomersView />} />
          <Route path="/reports" element={<ReportsView />} />
          <Route path="/performance" element={<PerformanceMonitoringView />} />
          <Route path="/provisioning" element={<RemoteProvisioningView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="*" element={<Navigate to="/customer-requests" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
