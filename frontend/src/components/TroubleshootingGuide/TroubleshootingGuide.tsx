import React, { useState } from 'react';

// Mock troubleshooting flows
const flows = {
  'device-offline': {
    title: 'Device Offline Troubleshooting',
    steps: [
      { id: 1, text: 'Ask customer to check if the device is plugged in and powered on.' },
      { id: 2, text: 'Verify the device appears in the Google Home app. If not, guide re-linking.' },
      { id: 3, text: 'Check Wi-Fi status. Ask customer to restart their router.' },
      { id: 4, text: 'Attempt to restart the smart device itself (unplug/replug).' },
      { id: 5, text: 'If still offline, check for outages or guide a factory reset (link KB article).' },
    ],
  },
  'wifi-issue': {
    title: 'Wi-Fi Connectivity Issues',
    steps: [
        { id: 1, text: 'Confirm customer\'s Wi-Fi network is operational for other devices.' },
        { id: 2, text: 'Check distance between device and router. Suggest moving closer if possible.' },
        { id: 3, text: 'Restart the router and the smart device.' },
        { id: 4, text: 'Verify Wi-Fi password hasn\'t changed. Re-enter if necessary.' },
        { id: 5, text: 'Check for network interference (microwaves, other devices). Guide changing Wi-Fi channel if applicable.' },
    ],
  },
  'google-assistant-voice': {
    title: 'Google Assistant Voice Recognition Issues',
    steps: [
      { id: 1, text: 'Ask customer to check if the microphone on the device is physically blocked or muted.' },
      { id: 2, text: 'Verify the Google Home/Nest device has power and is connected to Wi-Fi.' },
      { id: 3, text: 'Check if the Google Assistant language matches the language the customer is speaking.' },
      { id: 4, text: 'Guide the customer to retrain the voice model in the Google Home app (Settings -> Google Assistant -> Voice Match).' },
      { id: 5, text: 'Ask the customer to speak clearly and ensure there isn\'t excessive background noise.' },
      { id: 6, text: 'Suggest restarting the Google Home/Nest device.' },
    ],
  },
};

type FlowKey = keyof typeof flows;

const TroubleshootingGuide: React.FC = () => {
  const [selectedFlowKey, setSelectedFlowKey] = useState<FlowKey | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleSelectFlow = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.value as FlowKey;
    setSelectedFlowKey(key);
    setCurrentStepIndex(0); // Reset to first step
  };

  const handleNextStep = () => {
    if (selectedFlowKey && currentStepIndex < flows[selectedFlowKey].steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (selectedFlowKey && currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleResolve = () => {
    // Placeholder: Logic to mark issue as resolved, potentially update ticket
    alert('Issue marked as resolved (Placeholder Action)');
    setSelectedFlowKey(null); // Reset guide
  };

  const handleEscalate = () => {
    // Placeholder: Logic to escalate ticket
    alert('Issue escalated (Placeholder Action)');
    setSelectedFlowKey(null); // Reset guide
  };

  const currentFlow = selectedFlowKey ? flows[selectedFlowKey] : null;
  const currentStep = currentFlow ? currentFlow.steps[currentStepIndex] : null;

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">Guided Troubleshooting</h3>

      <div className="mb-4">
        <label htmlFor="issueSelect" className="block text-sm font-medium text-blue-700 mb-1">
          Select Issue:
        </label>
        <select 
          id="issueSelect"
          value={selectedFlowKey ?? ''} 
          onChange={handleSelectFlow} 
          className="block w-full p-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select an issue...</option>
          <option value="device-offline">Device Offline</option>
          <option value="wifi-issue">Wi-Fi Connectivity Issues</option>
          <option value="google-assistant-voice">Google Assistant Voice Recognition Issues</option>
          {/* Add more common issues here */}
        </select>
      </div>

      {currentFlow && currentStep && (
        <div className="mt-4 p-3 bg-white border border-blue-200 rounded">
          <h4 className="font-semibold text-blue-700 mb-2">{currentFlow.title} - Step {currentStep.id}</h4>
          <p className="text-blue-900">{currentStep.text}</p>
          
          <div className="mt-4 flex justify-between items-center space-x-2">
            <button 
              onClick={handlePreviousStep} 
              disabled={currentStepIndex === 0}
              className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              Previous
            </button>
            <button 
              onClick={handleNextStep} 
              disabled={currentStepIndex === currentFlow.steps.length - 1}
              className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              Next Step
            </button>
          </div>
          <div className="mt-3 flex justify-end space-x-2">
             <button 
              onClick={handleResolve} 
              className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
            >
              Resolved
            </button>
             <button 
              onClick={handleEscalate} 
              className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
            >
              Escalate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TroubleshootingGuide;
