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
  'routine-not-working': {
    title: 'Home Automation Routine Not Working',
    steps: [
      { id: 1, text: 'Ask customer to describe the routine: What should trigger it? What actions should happen?' },
      { id: 2, text: 'Verify the trigger: If voice, check exact phrasing. If time, check device time zone. If device state, check the triggering device.' },
      { id: 3, text: 'Check if the routine is enabled in the Google Home app (Automations tab).' },
      { id: 4, text: 'Test the actions individually: Ask customer to manually control the devices/services involved in the routine.' },
      { id: 5, text: 'Ensure all devices involved in actions are online and connected to the same Google Home structure.' },
      { id: 6, text: 'If using Personal Routines, ensure the correct account (Voice Match) is triggering it.' },
      { id: 7, text: 'Suggest simplifying the routine (fewer actions/triggers) for testing, then rebuild.' },
      { id: 8, text: 'Restart the Google Home devices involved and the router.' },
    ],
  },
  'firmware-update-issue': {
    title: 'Firmware Update Issues',
    steps: [
      { id: 1, text: 'Ask customer: Is the update failing to start, getting stuck, or showing an error message?' },
      { id: 2, text: 'Verify the device has a stable internet connection (check Wi-Fi signal strength if possible).' },
      { id: 3, text: 'Ensure the device is plugged in or has sufficient battery charge for the update duration.' },
      { id: 4, text: 'Guide customer to restart the smart device.' },
      { id: 5, text: 'Guide customer to restart their Wi-Fi router.' },
      { id: 6, text: 'Suggest moving the device closer to the router temporarily during the update.' },
      { id: 7, text: 'Check the manufacturer\'s official website or status page for known firmware issues or outages.' },
      { id: 8, text: 'If the update still fails, advise customer a factory reset might be needed (warn about data loss and reconfiguration required). Consult KB article KB-043 for details.' },
    ],
  },
  // Added Hub Setup/Connectivity Flow (Req #26)
  'hub-setup-issue': {
    title: 'Hub Setup/Connectivity Issue',
    steps: [
      { id: 1, text: 'Confirm Hub is plugged in and showing power lights/screen activity.' },
      { id: 2, text: 'Is the customer\'s phone/tablet connected to the same Wi-Fi network they intend to connect the hub to?' },
      { id: 3, text: 'Verify Bluetooth is enabled on the phone/tablet (often used for initial discovery).' },
      { id: 4, text: 'Is the Hub appearing for setup in the correct app (e.g., Google Home, Alexa)? If not, try restarting the hub and the app.' },
      { id: 5, text: 'Check for Wi-Fi password typos during setup.' },
      { id: 6, text: 'Ensure the customer is logged into the correct account within the app.' },
      { id: 7, text: 'If connecting devices to the hub fails: Verify device compatibility with the hub (check KB-046).' },
      { id: 8, text: 'Restart the hub, the device being connected, and the router.' },
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
          <option value="routine-not-working">Home Automation Routine Not Working</option>
          <option value="firmware-update-issue">Firmware Update Issue</option>
          <option value="hub-setup-issue">Hub Setup/Connectivity Issue</option>
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
