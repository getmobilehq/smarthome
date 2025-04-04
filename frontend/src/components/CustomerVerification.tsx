import React, { useState } from 'react';

interface SecurityQuestion {
  id: number;
  question: string;
  answer: string;
}

interface CustomerDevice {
  id: number;
  name: string;
  type: string;
  serialNumber: string;
  lastActive: string;
}

interface CustomerVerificationProps {
  customerName: string;
  customerEmail: string;
  customerId: number;
  onVerify: (verificationData: VerificationData) => void;
  onCancel: () => void;
}

interface VerificationData {
  pin?: string;
  verificationMethod: 'pin' | 'email' | 'phone' | 'security' | 'device';
  securityAnswer?: string;
  deviceSerial?: string;
  verificationCode?: string;
}

const CustomerVerification: React.FC<CustomerVerificationProps> = ({ customerName, customerEmail, customerId, onVerify, onCancel }) => {
  const [pin, setPin] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'pin' | 'email' | 'phone' | 'security' | 'device'>('pin');
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [securityQuestionIndex, setSecurityQuestionIndex] = useState(0);
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [deviceSerial, setDeviceSerial] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [deviceSelected, setDeviceSelected] = useState(false);

  // Mock security questions for the customer
  const securityQuestions: SecurityQuestion[] = [
    { id: 1, question: 'What was the name of your first pet?', answer: 'fluffy' },
    { id: 2, question: 'In what city were you born?', answer: 'newyork' },
    { id: 3, question: 'What is your mother\'s maiden name?', answer: 'smith' }
  ];

  // Mock devices owned by the customer
  const ownedDevices: CustomerDevice[] = [
    { id: 1, name: 'Living Room Smart Speaker', type: 'Speaker', serialNumber: 'SP12345', lastActive: '2025-04-03' },
    { id: 2, name: 'Front Door Camera', type: 'Camera', serialNumber: 'CAM67890', lastActive: '2025-04-03' },
    { id: 3, name: 'Kitchen Smart Display', type: 'Display', serialNumber: 'DIS34567', lastActive: '2025-04-02' }
  ];

  const handleSendVerificationCode = () => {
    // In a real application, this would send a verification code to the customer's email or phone
    setVerificationSent(true);
    setError('');
  };

  const handleVerify = () => {
    let isValid = false;
    const verificationData: VerificationData = {
      verificationMethod: verificationMethod
    };

    switch (verificationMethod) {
      case 'pin':
        if (!pin) {
          setError('Please enter the customer verification PIN');
          return;
        }
        verificationData.pin = pin;
        isValid = true; // In a real app, validate against backend
        break;
      
      case 'email':
      case 'phone':
        if (!verificationCode) {
          setError('Please enter the verification code');
          return;
        }
        verificationData.verificationCode = verificationCode;
        isValid = verificationCode.length === 6; // Simple validation for demo
        break;
      
      case 'security':
        if (!securityAnswer) {
          setError('Please answer the security question');
          return;
        }
        verificationData.securityAnswer = securityAnswer;
        // Compare with lowercase, trimmed answer for demo purposes
        isValid = securityAnswer.toLowerCase().trim() === 
                 securityQuestions[securityQuestionIndex].answer;
        break;
      
      case 'device':
        if (!deviceSerial) {
          setError('Please select a device');
          return;
        }
        verificationData.deviceSerial = deviceSerial;
        isValid = ownedDevices.some(device => device.serialNumber === deviceSerial);
        break;
    }

    if (isValid) {
      onVerify(verificationData);
    } else {
      setError('Verification failed. Please try again or use a different method.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex items-center mb-4">
          <svg className="h-6 w-6 text-brand-accent mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">Customer Verification</h3>
          <button 
            onClick={onCancel}
            className="ml-auto text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          For security purposes, please verify <strong>{customerName}'s</strong> identity before viewing their account details.
        </p>

        {/* Verification Method Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Verification Method
          </label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              type="button"
              onClick={() => setVerificationMethod('pin')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                verificationMethod === 'pin'
                  ? 'bg-brand-accent text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              PIN Verification
            </button>
            <button
              type="button"
              onClick={() => setVerificationMethod('email')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                verificationMethod === 'email'
                  ? 'bg-brand-accent text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Email Verification
            </button>
            <button
              type="button"
              onClick={() => setVerificationMethod('phone')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                verificationMethod === 'phone'
                  ? 'bg-brand-accent text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Phone Verification
            </button>
            <button
              type="button"
              onClick={() => setVerificationMethod('security')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                verificationMethod === 'security'
                  ? 'bg-brand-accent text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Security Questions
            </button>
            <button
              type="button"
              onClick={() => setVerificationMethod('device')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                verificationMethod === 'device'
                  ? 'bg-brand-accent text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Device Verification
            </button>
          </div>
        </div>
        
        {/* PIN Verification Form */}
        {verificationMethod === 'pin' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Customer PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="6-digit PIN"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
              maxLength={6}
            />
          </div>
        )}

        {/* Email Verification Form */}
        {verificationMethod === 'email' && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Verification
              </label>
              {!verificationSent && (
                <button
                  type="button"
                  onClick={handleSendVerificationCode}
                  className="text-xs font-medium text-brand-accent hover:text-opacity-80"
                >
                  Send Code
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-2">
              {verificationSent 
                ? `Verification code sent to ${customerEmail}`
                : `Send a verification code to ${customerEmail}`}
            </p>
            {verificationSent && (
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="6-digit verification code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                maxLength={6}
              />
            )}
          </div>
        )}

        {/* Phone Verification Form */}
        {verificationMethod === 'phone' && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Phone Verification
              </label>
              {!verificationSent && (
                <button
                  type="button"
                  onClick={handleSendVerificationCode}
                  className="text-xs font-medium text-brand-accent hover:text-opacity-80"
                >
                  Send Code
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-2">
              {verificationSent 
                ? `Verification code sent via SMS` 
                : `Send a verification code via SMS`}
            </p>
            {verificationSent && (
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="6-digit verification code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                maxLength={6}
              />
            )}
          </div>
        )}

        {/* Security Questions Form */}
        {verificationMethod === 'security' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Security Question
            </label>
            <div className="mb-2">
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                value={securityQuestionIndex}
                onChange={(e) => setSecurityQuestionIndex(parseInt(e.target.value))}
              >
                {securityQuestions.map((q, idx) => (
                  <option key={q.id} value={idx}>
                    {q.question}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              placeholder="Your answer"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
            />
          </div>
        )}

        {/* Device Verification Form */}
        {verificationMethod === 'device' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verify Device Ownership
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Select one of the customer's registered devices to verify ownership.
            </p>
            <div className="border border-gray-200 rounded-md divide-y divide-gray-200 mb-2">
              {ownedDevices.map((device) => (
                <div 
                  key={device.id} 
                  className={`p-3 flex items-center cursor-pointer hover:bg-gray-50 ${
                    deviceSerial === device.serialNumber ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => {
                    setDeviceSerial(device.serialNumber);
                    setDeviceSelected(true);
                  }}
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{device.name}</p>
                    <p className="text-xs text-gray-500">
                      {device.type} | Last active: {device.lastActive}
                    </p>
                  </div>
                  <div className="ml-3">
                    {deviceSerial === device.serialNumber && (
                      <svg className="h-5 w-5 text-brand-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {deviceSelected && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> In a real implementation, this would trigger a notification 
                  on the selected device for the customer to confirm, or require the customer to 
                  provide a device-specific identification code.
                </p>
              </div>
            )}
          </div>
        )}
        
        {error && (
          <p className="mt-1 text-sm text-red-600 mb-4">{error}</p>
        )}
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            className="px-4 py-2 bg-brand-accent text-white rounded-md text-sm font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerVerification;
