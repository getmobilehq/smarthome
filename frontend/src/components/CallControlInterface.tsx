import React, { useState, useEffect } from 'react';

interface CallData {
  callId: string;
  customerName: string;
  customerPhone: string;
  startTime: Date;
  duration: number; // in seconds
  status: 'connecting' | 'active' | 'onhold' | 'transferred' | 'ended';
  transferredTo?: string;
  notes: string[];
}

const CallControlInterface: React.FC = () => {
  const [call, setCall] = useState<CallData | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [callVolume, setCallVolume] = useState<number>(80);
  const [micMuted, setMicMuted] = useState<boolean>(false);
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const [noteInput, setNoteInput] = useState<string>('');
  const [recordingActive, setRecordingActive] = useState<boolean>(false);
  const [showTransferOptions, setShowTransferOptions] = useState<boolean>(false);
  
  // Mock call data for demo purposes
  useEffect(() => {
    // Simulate incoming call
    const mockCall: CallData = {
      callId: 'CALL-' + Math.floor(1000000 + Math.random() * 9000000),
      customerName: 'John Doe',
      customerPhone: '+1 (555) 123-4567',
      startTime: new Date(),
      duration: 0,
      status: 'active',
      notes: ['Customer reporting issues with doorbell camera connectivity']
    };
    
    setCall(mockCall);
    
    // Cleanup on component unmount
    return () => {
      // Would handle any cleanup like ending call in a real app
    };
  }, []);
  
  // Timer for call duration
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (call && call.status === 'active') {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [call]);
  
  const formatDuration = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs ? `${hrs}:` : ''}${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleMuteToggle = () => {
    setMicMuted(prev => !prev);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCallVolume(parseInt(e.target.value));
  };
  
  const handleHoldCall = () => {
    if (call) {
      const newStatus = call.status === 'onhold' ? 'active' : 'onhold';
      setCall({...call, status: newStatus});
    }
  };
  
  const handleEndCall = () => {
    if (call) {
      setCall({...call, status: 'ended'});
    }
  };
  
  const handleAddNote = () => {
    if (call && noteInput.trim()) {
      const newNotes = [...call.notes, noteInput.trim()];
      setCall({...call, notes: newNotes});
      setNoteInput('');
      setIsAddingNote(false);
    }
  };
  
  const handleTransferCall = (transferTarget: string) => {
    if (call) {
      setCall({...call, status: 'transferred', transferredTo: transferTarget});
      setShowTransferOptions(false);
    }
  };
  
  const handleRecordingToggle = () => {
    setRecordingActive(prev => !prev);
  };
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className={`${call?.status === 'active' ? 'bg-green-600' : call?.status === 'onhold' ? 'bg-yellow-500' : call?.status === 'ended' ? 'bg-gray-500' : 'bg-blue-600'} text-white px-4 py-3 flex justify-between items-center`}>
        <h2 className="text-lg font-semibold">Call Control</h2>
        {call && (
          <div className="flex items-center">
            <span className={`flex h-3 w-3 relative mr-2 ${call.status === 'active' ? 'bg-green-300' : call.status === 'onhold' ? 'bg-yellow-300' : ''} rounded-full`}>
              {(call.status === 'active' || call.status === 'onhold') && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              )}
            </span>
            <span className="text-sm">
              {call.status === 'active' ? 'In Progress' : 
               call.status === 'onhold' ? 'On Hold' : 
               call.status === 'connecting' ? 'Connecting' :
               call.status === 'transferred' ? 'Transferred' : 'Ended'}
            </span>
          </div>
        )}
      </div>
      
      {call ? (
        <div className="p-4">
          {/* Customer info */}
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">{call.customerName}</h3>
              <p className="text-sm text-gray-600">{call.customerPhone}</p>
              {call.status !== 'ended' && (
                <p className="text-xs mt-1">
                  <span className="font-medium">Duration:</span> {formatDuration(elapsedTime)}
                </p>
              )}
            </div>
          </div>
          
          {call.status === 'transferred' ? (
            <div className="bg-blue-50 p-3 rounded-md border border-blue-200 mb-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-700">Call Transferred</p>
                  <p className="text-xs text-blue-600">Transferred to: {call.transferredTo}</p>
                </div>
              </div>
            </div>
          ) : null}
          
          {call.status === 'ended' ? (
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mb-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-700">Call Ended</p>
                  <p className="text-xs text-gray-600">Duration: {formatDuration(elapsedTime)}</p>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button className="px-3 py-1 text-xs bg-brand-accent text-white rounded hover:bg-opacity-90">
                  Start New Call
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Call controls */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <button 
                  className={`p-2 rounded-md flex flex-col items-center ${micMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200`}
                  onClick={handleMuteToggle}
                >
                  <svg className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={micMuted ? "M19 13l-7 7-7-7m14-8l-7 7-7-7" : "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"} />
                  </svg>
                  <span className="text-xs">{micMuted ? 'Unmute' : 'Mute'}</span>
                </button>
                
                <button 
                  className={`p-2 rounded-md flex flex-col items-center ${call.status === 'onhold' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200`}
                  onClick={handleHoldCall}
                >
                  <svg className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs">{call.status === 'onhold' ? 'Resume' : 'Hold'}</span>
                </button>
                
                <button 
                  className="p-2 rounded-md flex flex-col items-center bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={() => setShowTransferOptions(prev => !prev)}
                >
                  <svg className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  <span className="text-xs">Transfer</span>
                </button>
                
                <button 
                  className={`p-2 rounded-md flex flex-col items-center ${recordingActive ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200`}
                  onClick={handleRecordingToggle}
                >
                  <svg className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={recordingActive ? "M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" : "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"} />
                  </svg>
                  <span className="text-xs">{recordingActive ? 'Stop' : 'Record'}</span>
                </button>
              </div>
              
              {/* Volume control */}
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <span className="text-xs font-medium">Volume: {callVolume}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={callVolume} 
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Transfer options */}
              {showTransferOptions && (
                <div className="mb-4 p-3 border rounded-md bg-gray-50">
                  <h4 className="text-sm font-medium mb-2">Transfer Call To:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      className="text-sm p-2 bg-white border rounded hover:bg-gray-50"
                      onClick={() => handleTransferCall('Technical Support')}
                    >
                      Technical Support
                    </button>
                    <button 
                      className="text-sm p-2 bg-white border rounded hover:bg-gray-50"
                      onClick={() => handleTransferCall('Billing Department')}
                    >
                      Billing Department
                    </button>
                    <button 
                      className="text-sm p-2 bg-white border rounded hover:bg-gray-50"
                      onClick={() => handleTransferCall('Customer Service')}
                    >
                      Customer Service
                    </button>
                    <button 
                      className="text-sm p-2 bg-white border rounded hover:bg-gray-50"
                      onClick={() => handleTransferCall('Senior Agent')}
                    >
                      Senior Agent
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          
          {/* Call notes */}
          <div className="border rounded-md overflow-hidden mb-4">
            <div className="bg-gray-50 px-3 py-2 border-b flex justify-between items-center">
              <h4 className="text-sm font-medium">Call Notes</h4>
              {call.status !== 'ended' && !isAddingNote && (
                <button 
                  className="text-xs text-brand-accent hover:underline"
                  onClick={() => setIsAddingNote(true)}
                >
                  Add Note
                </button>
              )}
            </div>
            
            <div className="p-3 max-h-32 overflow-y-auto">
              {call.notes.length > 0 ? (
                <ul className="space-y-2">
                  {call.notes.map((note, index) => (
                    <li key={index} className="text-sm">
                      <div className="flex">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>{note}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 text-center">No notes yet</p>
              )}
              
              {isAddingNote && (
                <div className="mt-2">
                  <textarea
                    className="w-full border rounded-md p-2 text-sm"
                    rows={2}
                    placeholder="Type note here..."
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end space-x-2 mt-1">
                    <button 
                      className="text-xs px-2 py-1 border rounded text-gray-600 hover:bg-gray-50"
                      onClick={() => setIsAddingNote(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="text-xs px-2 py-1 bg-brand-accent text-white rounded hover:bg-opacity-90"
                      onClick={handleAddNote}
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* End call button */}
          {call.status !== 'ended' && call.status !== 'transferred' && (
            <button 
              className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center"
              onClick={handleEndCall}
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
              </svg>
              End Call
            </button>
          )}
        </div>
      ) : (
        <div className="p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No active call</h3>
          <p className="mt-1 text-sm text-gray-500">Start a new call to assist a customer.</p>
          <div className="mt-4">
            <button className="px-4 py-2 bg-brand-accent text-white rounded-md hover:bg-opacity-90">
              Start New Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallControlInterface;
