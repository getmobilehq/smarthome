import React, { useState, useEffect } from 'react';

// Define types for device and troubleshooting steps
type DeviceType = { id: string; name: string; category: string };
type TroubleshootingStep = { id: string; description: string; nextSteps?: string[] };
type ChannelType = 'chat' | 'email' | 'phone' | 'sms' | 'video' | 'social';

const RemoteProvisioningView: React.FC = () => {
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>('');
  const [troubleshootingIssue, setTroubleshootingIssue] = useState<string>('');
  const [customerChannel, setCustomerChannel] = useState<ChannelType>('chat');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [troubleshootingPath, setTroubleshootingPath] = useState<TroubleshootingStep[]>([]);

  // Mock data - replace with actual data fetching
  const deviceTypes: DeviceType[] = [
    { id: 'smart-light', name: 'Smart Light Bulb', category: 'lighting' },
    { id: 'smart-plug', name: 'Smart Plug', category: 'power' },
    { id: 'thermostat', name: 'Smart Thermostat', category: 'climate' },
    { id: 'doorbell', name: 'Smart Doorbell', category: 'security' },
    { id: 'camera', name: 'Security Camera', category: 'security' },
    { id: 'lock', name: 'Smart Lock', category: 'security' },
    { id: 'speaker', name: 'Smart Speaker', category: 'entertainment' },
    { id: 'hub', name: 'Smart Hub', category: 'control' },
  ];

  const troubleshootingSteps: Record<string, TroubleshootingStep[]> = {
    'wifi-connect': [
      { id: 'step-1', description: 'Check WiFi connection and password.' },
      { id: 'step-2', description: 'Verify router is functioning properly.' },
      { id: 'step-3', description: 'Check if other devices can connect to WiFi.' },
    ],
    'device-reset': [
      { id: 'step-1', description: 'Factory reset the device.' },
      { id: 'step-2', description: 'Wait 30 seconds after reset.' },
      { id: 'step-3', description: 'Attempt to reconnect device to app.' },
    ],
    'app-reinstall': [
      { id: 'step-1', description: 'Reinstall the SmartHome app.' },
      { id: 'step-2', description: 'Log back in with credentials.' },
      { id: 'step-3', description: 'Re-add device to account.' },
    ],
    'bluetooth-pairing': [
      { id: 'step-1', description: 'Ensure Bluetooth is enabled on the phone.' },
      { id: 'step-2', description: 'Put device in pairing mode.' },
      { id: 'step-3', description: 'Connect through SmartHome app, not phone settings.' },
    ],
    'firmware-update': [
      { id: 'step-1', description: 'Check for available firmware updates.' },
      { id: 'step-2', description: 'Download and install latest firmware.' },
      { id: 'step-3', description: 'Restart device after update completes.' },
    ],
  };

  // Communication channel options
  const channelOptions = [
    { id: 'chat', name: 'Live Chat' },
    { id: 'email', name: 'Email' },
    { id: 'phone', name: 'Phone Call' },
    { id: 'sms', name: 'SMS' },
    { id: 'video', name: 'Video Chat' },
    { id: 'social', name: 'Social Media' },
  ];

  useEffect(() => {
    // Load troubleshooting steps when issue is selected
    if (troubleshootingIssue) {
      setTroubleshootingPath(troubleshootingSteps[troubleshootingIssue] || []);
      setCurrentStep(0);
    }
  }, [troubleshootingIssue]);

  const handleProvisionDevice = () => {
    // Logic to guide agent/customer through provisioning
    alert(`Starting provisioning guide for ${selectedDeviceType || 'selected device'}...`);
  };

  const handleTroubleshoot = () => {
    // Logic to provide troubleshooting steps
    const step = troubleshootingSteps[troubleshootingIssue]?.[0];
    alert(`Starting troubleshooting: ${step ? step.description : 'Select an issue'}`);
  };

  const handleNextStep = () => {
    if (currentStep < troubleshootingPath.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step completed
      alert('Troubleshooting completed. Issue resolved?');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEscalate = () => {
    alert('Escalating issue to specialized support team...');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Remote Provisioning & Troubleshooting</h1>

      {/* Communication Channel Selection */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Customer Communication Channel</h2>
        <div className="flex flex-wrap gap-2">
          {channelOptions.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setCustomerChannel(channel.id as ChannelType)}
              className={`px-4 py-2 rounded-md ${
                customerChannel === channel.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {channel.name}
            </button>
          ))}
        </div>
      </div>

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
                  {device.name} ({device.category})
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
        </div>

        {/* Troubleshooting Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Troubleshoot Device Issues</h2>
          <div className="mb-4">
            <label htmlFor="troubleshootingIssue" className="block text-sm font-medium text-gray-600 mb-1">
              Common Device Issues:
            </label>
            <select
              id="troubleshootingIssue"
              value={troubleshootingIssue}
              onChange={(e) => setTroubleshootingIssue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Select Issue --</option>
              <option value="wifi-connect">WiFi Connection Problems</option>
              <option value="device-reset">Device Not Responding</option>
              <option value="app-reinstall">App Connection Issues</option>
              <option value="bluetooth-pairing">Bluetooth Pairing Problems</option>
              <option value="firmware-update">Firmware Update Required</option>
            </select>
          </div>
          <button
            onClick={handleTroubleshoot}
            disabled={!troubleshootingIssue}
            style={{ backgroundColor: '#0019a5' }}
            className="w-full py-2 px-4 text-white font-semibold rounded-md shadow hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
          >
            Start Troubleshooting
          </button>
        </div>
      </div>

      {/* Troubleshooting Steps Progress - Only shown when a path is selected */}
      {troubleshootingPath.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Troubleshooting Progress</h2>
          
          {/* Step indicator */}
          <div className="flex mb-4">
            {troubleshootingPath.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === currentStep
                      ? 'bg-blue-600 text-white'
                      : index < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {index + 1}
                </div>
                {index < troubleshootingPath.length - 1 && (
                  <div className={`h-1 w-10 ${index < currentStep ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Current step display */}
          <div className="p-4 border border-gray-200 rounded-md mb-4">
            <h3 className="font-semibold mb-2">Step {currentStep + 1}:</h3>
            <p>{troubleshootingPath[currentStep]?.description}</p>
            
            {/* Response options and agent notes could be added here */}
            <div className="mt-4 p-3 bg-gray-100 rounded-md">
              <p className="font-medium text-sm text-gray-700">Agent Notes:</p>
              <textarea 
                className="w-full mt-2 p-2 border border-gray-300 rounded-md" 
                rows={3}
                placeholder="Add notes about customer's response..."
              ></textarea>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Previous Step
            </button>
            <button
              onClick={handleEscalate}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Escalate Issue
            </button>
            <button
              onClick={handleNextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {currentStep === troubleshootingPath.length - 1 ? 'Complete' : 'Next Step'}
            </button>
          </div>
        </div>
      )}
      
      {/* Agent Tools Panel */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Agent Tools</h2>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Knowledge Base
          </button>
          <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Device Dashboard
          </button>
          <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Call Control
          </button>
          <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Ticket Timeline
          </button>
          <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Message History
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoteProvisioningView;
