import React, { useState } from 'react';

interface Device {
  id: number;
  name: string;
  type: string;
  status: string;
  lastActive: string;
  firmware: string;
  batteryLevel?: number;
  signalStrength?: number;
  location?: string;
  serialNumber: string;
  issues: string[];
  macAddress: string;
  ipAddress?: string;
  connected: boolean;
  diagnostics: {
    pingStatus: string;
    uptime: string;
    connectionType: string;
    dataUsage: string;
    temperatureReading?: string;
    lastReboot?: string;
  };
}

const DeviceDashboard: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'diagnostics' | 'actions' | 'history'>('diagnostics');
  const [runningDiagnostic, setRunningDiagnostic] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState<string | null>(null);
  
  // Mock customer devices data
  const devices: Device[] = [
    {
      id: 1,
      name: 'Pro Doorbell',
      type: 'Doorbell',
      status: 'online',
      lastActive: '2025-04-03 15:42',
      firmware: '2.1.4',
      batteryLevel: 85,
      signalStrength: 90,
      location: 'Front Door',
      serialNumber: 'DB2349857',
      issues: [],
      macAddress: '00:1A:2B:3C:4D:5E',
      ipAddress: '192.168.1.120',
      connected: true,
      diagnostics: {
        pingStatus: 'Good (32ms)',
        uptime: '18 days, 7 hours',
        connectionType: 'WiFi (2.4GHz)',
        dataUsage: '42MB sent, 86MB received',
        temperatureReading: '76°F (Normal)',
        lastReboot: '2025-03-16 08:30'
      }
    },
    {
      id: 2,
      name: 'Indoor Cam',
      type: 'Camera',
      status: 'online',
      lastActive: '2025-04-03 16:20',
      firmware: '1.3.2',
      signalStrength: 85,
      location: 'Living Room',
      serialNumber: 'CAM6782341',
      issues: [],
      macAddress: '00:2B:3C:4D:5E:6F',
      ipAddress: '192.168.1.121',
      connected: true,
      diagnostics: {
        pingStatus: 'Good (28ms)',
        uptime: '7 days, 12 hours',
        connectionType: 'WiFi (5GHz)',
        dataUsage: '1.2GB sent, 3.4GB received',
        lastReboot: '2025-03-27 09:15'
      }
    },
    {
      id: 3,
      name: 'Smart Thermostat',
      type: 'Thermostat',
      status: 'offline',
      lastActive: '2025-04-02 08:15',
      firmware: '3.0.1',
      batteryLevel: 15,
      location: 'Main Floor',
      serialNumber: 'TH8762140',
      issues: ['Low battery warning', 'Connectivity issues'],
      macAddress: '00:3C:4D:5E:6F:7G',
      connected: false,
      diagnostics: {
        pingStatus: 'Failed (Timeout)',
        uptime: 'Unknown',
        connectionType: 'WiFi (2.4GHz)',
        dataUsage: 'Unknown',
        temperatureReading: 'Unknown',
        lastReboot: '2025-03-30 18:45'
      }
    },
    {
      id: 4,
      name: 'Motion Sensor',
      type: 'Sensor',
      status: 'online',
      lastActive: '2025-04-03 14:30',
      firmware: '1.1.5',
      batteryLevel: 67,
      location: 'Kitchen',
      serialNumber: 'MS4523789',
      issues: [],
      macAddress: '00:4D:5E:6F:7G:8H',
      connected: true,
      diagnostics: {
        pingStatus: 'Good (45ms)',
        uptime: '12 days, 3 hours',
        connectionType: 'Zigbee',
        dataUsage: '8MB sent, 2MB received',
        lastReboot: '2025-03-22 11:20'
      }
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'idle': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const runDiagnostic = (deviceId: number) => {
    setRunningDiagnostic(true);
    setDiagnosticResults(null);
    
    // Simulate diagnostic process
    setTimeout(() => {
      const device = devices.find(d => d.id === deviceId);
      if (device) {
        if (device.status === 'online') {
          setDiagnosticResults(
            `Diagnostic Complete for ${device.name} (${device.serialNumber})
            
            ✅ Device is online and reachable
            ✅ Firmware is up to date
            ✅ Signal strength is good (${device.signalStrength}%)
            ✅ No packet loss detected
            ✅ Connection is stable
            
            Recommended Actions:
            - None required at this time
            `
          );
        } else {
          setDiagnosticResults(
            `Diagnostic Complete for ${device.name} (${device.serialNumber})
            
            ❌ Device is offline and unreachable
            ❌ Last seen: ${device.lastActive}
            ❌ Battery level is low (${device.batteryLevel}%)
            
            Recommended Actions:
            - Ask customer to charge or replace the batteries
            - Check if the device is within WiFi range
            - Attempt a manual reboot of the device
            `
          );
        }
      }
      setRunningDiagnostic(false);
    }, 3000);
  };
  
  const handleDeviceSelect = (deviceId: number) => {
    setSelectedDevice(deviceId);
    setDiagnosticResults(null);
  };
  
  const currentDevice = devices.find(d => d.id === selectedDevice);
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="bg-brand-accent text-white px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Device Dashboard</h2>
        <div className="flex space-x-2">
          <button className="px-2 py-1 text-xs bg-white bg-opacity-20 rounded hover:bg-opacity-30">Refresh</button>
          <button className="px-2 py-1 text-xs bg-white bg-opacity-20 rounded hover:bg-opacity-30">Export</button>
        </div>
      </div>
      
      <div className="flex h-[500px]">
        {/* Device List Sidebar */}
        <div className="w-64 border-r overflow-y-auto">
          <div className="p-3 bg-gray-50 border-b">
            <h3 className="text-sm font-medium text-gray-700">Customer Devices</h3>
          </div>
          
          <ul className="divide-y">
            {devices.map(device => (
              <li
                key={device.id}
                className={`p-3 cursor-pointer hover:bg-gray-50 ${selectedDevice === device.id ? 'bg-blue-50' : ''}`}
                onClick={() => handleDeviceSelect(device.id)}
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-2 w-2 rounded-full mr-2 ${device.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{device.name}</h4>
                    <p className="text-xs text-gray-500">{device.type} • {device.location}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          {currentDevice ? (
            <>
              {/* Device Header */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">{currentDevice.name}</h3>
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getStatusColor(currentDevice.status)}`}>
                        {currentDevice.status === 'online' ? 'Online' : 'Offline'}
                      </span>
                    </div>
                    
                    <div className="mt-1 text-sm text-gray-500">
                      <span>SN: {currentDevice.serialNumber}</span>
                      <span className="mx-2">•</span>
                      <span>MAC: {currentDevice.macAddress}</span>
                    </div>
                  </div>
                  
                  <div className="text-right text-sm">
                    <div>Firmware: <span className="font-medium">{currentDevice.firmware}</span></div>
                    <div>Last Active: <span className="font-medium">{currentDevice.lastActive}</span></div>
                  </div>
                </div>
                
                {currentDevice.issues.length > 0 && (
                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                    <strong>Issues Detected:</strong> {currentDevice.issues.join(', ')}
                  </div>
                )}
              </div>
              
              {/* Tabs */}
              <div className="flex border-b">
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'diagnostics' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('diagnostics')}
                >
                  Diagnostics
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'actions' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('actions')}
                >
                  Actions
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'history' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('history')}
                >
                  History
                </button>
              </div>
              
              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'diagnostics' && (
                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 rounded p-3 border">
                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Connection</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Status:</span>
                            <span className={`text-sm font-medium ${currentDevice.status === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                              {currentDevice.status === 'online' ? 'Connected' : 'Disconnected'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Ping:</span>
                            <span className="text-sm font-medium">{currentDevice.diagnostics.pingStatus}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Connection Type:</span>
                            <span className="text-sm font-medium">{currentDevice.diagnostics.connectionType}</span>
                          </div>
                          {currentDevice.signalStrength && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Signal Strength:</span>
                              <span className="text-sm font-medium">{currentDevice.signalStrength}%</span>
                            </div>
                          )}
                          {currentDevice.ipAddress && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">IP Address:</span>
                              <span className="text-sm font-medium">{currentDevice.ipAddress}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded p-3 border">
                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Device Info</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Uptime:</span>
                            <span className="text-sm font-medium">{currentDevice.diagnostics.uptime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Last Reboot:</span>
                            <span className="text-sm font-medium">{currentDevice.diagnostics.lastReboot || 'Unknown'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Data Usage:</span>
                            <span className="text-sm font-medium">{currentDevice.diagnostics.dataUsage}</span>
                          </div>
                          {currentDevice.batteryLevel !== undefined && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Battery:</span>
                              <span className={`text-sm font-medium ${currentDevice.batteryLevel < 20 ? 'text-red-600' : 'text-green-600'}`}>
                                {currentDevice.batteryLevel}%
                              </span>
                            </div>
                          )}
                          {currentDevice.diagnostics.temperatureReading && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Temperature:</span>
                              <span className="text-sm font-medium">{currentDevice.diagnostics.temperatureReading}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <button
                        className="w-full px-4 py-2 bg-brand-accent text-white rounded-md hover:bg-opacity-90 flex items-center justify-center"
                        onClick={() => runDiagnostic(currentDevice.id)}
                        disabled={runningDiagnostic}
                      >
                        {runningDiagnostic ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Running Diagnostics...
                          </>
                        ) : 'Run Full Diagnostic'}
                      </button>
                    </div>
                    
                    {diagnosticResults && (
                      <div className="bg-gray-50 p-3 border rounded">
                        <h4 className="text-sm font-medium mb-2">Diagnostic Results</h4>
                        <pre className="text-xs whitespace-pre-wrap font-mono text-gray-700">{diagnosticResults}</pre>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'actions' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border rounded p-4">
                      <h4 className="text-sm font-medium mb-3">Remote Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100">
                          Reboot Device
                        </button>
                        <button className="w-full px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100">
                          Update Firmware
                        </button>
                        <button className="w-full px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100">
                          Factory Reset
                        </button>
                        <button className="w-full px-3 py-2 text-sm bg-yellow-50 text-yellow-700 rounded border border-yellow-200 hover:bg-yellow-100">
                          Troubleshooting Mode
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-white border rounded p-4">
                      <h4 className="text-sm font-medium mb-3">Customer Instructions</h4>
                      <div className="space-y-2">
                        <button className="w-full px-3 py-2 text-sm bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100">
                          Send Reset Instructions
                        </button>
                        <button className="w-full px-3 py-2 text-sm bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100">
                          Send WiFi Reconnection Guide
                        </button>
                        <button className="w-full px-3 py-2 text-sm bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100">
                          Send Battery Replacement Steps
                        </button>
                        <button className="w-full px-3 py-2 text-sm bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100">
                          Send Troubleshooting Checklist
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 bg-white border rounded p-4">
                      <h4 className="text-sm font-medium mb-3">Advanced Options</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded border border-gray-200 hover:bg-gray-100">
                          View Event Logs
                        </button>
                        <button className="px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded border border-gray-200 hover:bg-gray-100">
                          Check Cloud Connection
                        </button>
                        <button className="px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded border border-gray-200 hover:bg-gray-100">
                          Network Diagnostics
                        </button>
                        <button className="px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded border border-gray-200 hover:bg-gray-100">
                          Remote Debug Console
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'history' && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Device Activity History</h4>
                    <div className="border rounded overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-500">2025-04-03 15:42</td>
                            <td className="px-4 py-2 text-sm">Motion Detected</td>
                            <td className="px-4 py-2"><span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">Success</span></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-500">2025-04-03 14:10</td>
                            <td className="px-4 py-2 text-sm">Firmware Update Check</td>
                            <td className="px-4 py-2"><span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">Up to date</span></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-500">2025-04-03 08:32</td>
                            <td className="px-4 py-2 text-sm">Connection Status</td>
                            <td className="px-4 py-2"><span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">Connected</span></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-500">2025-04-02 22:15</td>
                            <td className="px-4 py-2 text-sm">Motion Detected</td>
                            <td className="px-4 py-2"><span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">Success</span></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-500">2025-04-02 18:05</td>
                            <td className="px-4 py-2 text-sm">Battery Status Check</td>
                            <td className="px-4 py-2"><span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">85%</span></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-500">2025-04-02 12:40</td>
                            <td className="px-4 py-2 text-sm">User Access</td>
                            <td className="px-4 py-2"><span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">App View</span></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-500">2025-04-01 10:12</td>
                            <td className="px-4 py-2 text-sm">Settings Modified</td>
                            <td className="px-4 py-2"><span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800">Changed</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button className="text-sm text-brand-accent hover:underline">View Full Event Log</button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-gray-500">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No device selected</h3>
                <p className="mt-1 text-sm text-gray-500">Select a device from the list to view its details and diagnostics.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceDashboard;
