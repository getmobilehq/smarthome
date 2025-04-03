import React, { useState } from 'react';

interface AgentLoginProps {
  onLogin: (agentId: string, pin: string) => void;
}

const AgentLogin: React.FC<AgentLoginProps> = ({ onLogin }) => {
  const [agentId, setAgentId] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agentId || !pin) {
      setError('Please enter both Agent ID and PIN');
      return;
    }
    
    // In a real application, this would validate against a backend service
    // For demo purposes, we'll accept any non-empty values
    setError('');
    onLogin(agentId, pin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-brand-accent py-6 px-8">
          <div className="flex justify-center mb-4">
            <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-white"/>
              <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-center text-2xl font-bold text-white">SmartHome Support</h2>
          <p className="text-center text-white text-opacity-90 mt-1">Agent Portal Login</p>
        </div>
        
        <form onSubmit={handleSubmit} className="py-8 px-8">
          <div className="mb-6">
            <label htmlFor="agentId" className="block text-sm font-medium text-gray-700 mb-1">Agent ID</label>
            <input
              id="agentId"
              type="text"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
              placeholder="Enter your Agent ID"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">PIN</label>
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
              placeholder="Enter your PIN"
            />
          </div>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-brand-accent text-white font-medium rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent"
          >
            Sign In
          </button>
          
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-brand-accent hover:underline">Forgot your PIN?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentLogin;
