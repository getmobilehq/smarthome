import React from 'react';

const LiveDeviceDiagnosticsPanel: React.FC = () => {
  // Placeholder for selected device logic
  const selectedDevice = {
    name: 'Doorbell Camera',
    status: 'Online',
    wifiStrength: 'Excellent (-45 dBm)',
    lastActivity: '2 mins ago',
    motionLogs: [
      'Motion detected: 2025-04-02 01:58:10',
      'Motion detected: 2025-04-02 01:55:30',
    ],
    batteryState: 'Charging (95%)',
    firmwareVersion: '1.2.3'
  };

  return (
    <div className="bg-white shadow-md rounded p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Live Device Diagnostics</h2>
      
      {selectedDevice ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">{selectedDevice.name}</h3>
          <p><strong>Status:</strong> <span className={selectedDevice.status === 'Online' ? 'text-green-600' : 'text-red-600'}>{selectedDevice.status}</span></p>
          <p><strong>WiFi Strength:</strong> {selectedDevice.wifiStrength}</p>
          <p><strong>Last Activity:</strong> {selectedDevice.lastActivity}</p>
          <p><strong>Battery/Power:</strong> {selectedDevice.batteryState}</p>
          <p><strong>Firmware:</strong> {selectedDevice.firmwareVersion}</p>

          <div className="my-4">
            <h4 className="font-semibold mb-1">Recent Motion Logs:</h4>
            <ul className="list-disc pl-5 text-sm max-h-24 overflow-y-auto bg-gray-50 p-2 rounded">
              {selectedDevice.motionLogs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          </div>

          <div className="mt-auto border-t pt-4 flex space-x-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded">Trigger Reboot</button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 px-3 rounded">Push Update</button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm py-1 px-3 rounded">View Last Frame</button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Select a device to view diagnostics.</p>
      )}
    </div>
  );
};

export default LiveDeviceDiagnosticsPanel;
