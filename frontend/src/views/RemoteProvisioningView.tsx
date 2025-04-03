import React, { useState } from 'react';

// Define types for device and troubleshooting steps (replace with actual types)
type DeviceType = { id: string; name: string };
type TroubleshootingStep = { id: string; description: string };

const RemoteProvisioningView: React.FC = () => {
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>('');
  const [troubleshootingIssue, setTroubleshootingIssue] = useState<string>('');

  // Mock data - replace with actual data fetching
  const deviceTypes: DeviceType[] = [
    { id: 'smart-light', name: 'Smart Light Bulb' },
    { id: 'smart-plug', name: 'Smart Plug' },
    { id: 'thermostat', name: 'Smart Thermostat' },
    { id: 'doorbell', name: 'Smart Doorbell' },
  ];

  const troubleshootingSteps: TroubleshootingStep[] = [
    { id: 'wifi-connect', description: 'Check WiFi connection and password.' },
    { id: 'device-reset', description: 'Factory reset the device.' },
    { id: 'app-reinstall', description: 'Reinstall the SmartHome app.' },
    { id: 'bluetooth-pairing', description: 'Ensure Bluetooth is enabled on the phone.' },
  ];

  const handleProvisionDevice = () => {
    // Logic to guide agent/customer through provisioning
    alert(`Starting provisioning guide for ${selectedDeviceType || 'selected device'}...`);
  };

  const handleTroubleshoot = () => {
    // Logic to provide troubleshooting steps
    const step = troubleshootingSteps.find(s => s.id === troubleshootingIssue);
    alert(`Troubleshooting step: ${step ? step.description : 'Select an issue'}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Remote Provisioning & Troubleshooting</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device Onboarding Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Device Onboarding Assistance</h2>
          <div className="mb-4">
            <label htmlFor="deviceType" className="block text-sm font-medium text-gray-600 mb-1">
              Select Device Type:
            </label>
            <select
              id="deviceType"
              value={selectedDeviceType}
              onChange={(e) => setSelectedDeviceType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Select Device --</option>
              {deviceTypes.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleProvisionDevice}
            disabled={!selectedDeviceType}
            style={{ backgroundColor: '#0019a5' }}
            className="w-full py-2 px-4 text-white font-semibold rounded-md shadow hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
          >
            Start Onboarding Guide
          </button>
          {/* Display onboarding steps or links based on selection here */}
        </div>

        {/* Troubleshooting Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Troubleshoot Pairing Issues</h2>
          <div className="mb-4">
            <label htmlFor="troubleshootingIssue" className="block text-sm font-medium text-gray-600 mb-1">
              Common Pairing Issues:
            </label>
            <select
              id="troubleshootingIssue"
              value={troubleshootingIssue}
              onChange={(e) => setTroubleshootingIssue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Select Issue --</option>
              {troubleshootingSteps.map((step) => (
                <option key={step.id} value={step.id}>
                  {step.description}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleTroubleshoot}
            disabled={!troubleshootingIssue}
            style={{ backgroundColor: '#0019a5' }}
            className="w-full py-2 px-4 text-white font-semibold rounded-md shadow hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
          >
            Get Troubleshooting Step
          </button>
          {/* Display relevant troubleshooting advice here */}
        </div>
      </div>
    </div>
  );
};

export default RemoteProvisioningView;
