import React, { useState } from 'react';

// Define channel types
type Channel = 'Chat' | 'Email' | 'Call' | 'Social';

const TicketChatInterface: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<Channel>('Chat');

  const renderChannelContent = () => {
    switch (activeChannel) {
      case 'Email':
        return (
          <div>
            <input type="text" placeholder="To: customer@example.com" className="bg-gray-100 p-2 rounded w-full mb-2 focus:outline-none" disabled />
            <input type="text" placeholder="Subject: Regarding Ticket #12345" className="bg-gray-100 p-2 rounded w-full mb-2 focus:outline-none" />
            <textarea placeholder="Compose email..." className="bg-gray-100 p-2 rounded w-full h-24 mb-2 focus:outline-none"></textarea>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">Send Email</button>
          </div>
        );
      case 'Call':
        return (
          <div className="text-center">
            <p className="mb-2">Call with +1234567890</p>
            <p className="text-lg font-semibold mb-4">Status: Connected (02:35)</p>
            <div className="flex justify-center space-x-2">
              <button className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded">Mute</button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded">Hold</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">Transfer</button>
              <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">End Call</button>
            </div>
          </div>
        );
      case 'Social':
        return (
          <div>
            <p className="text-gray-500">Social Media (e.g., WhatsApp) conversation view placeholder.</p>
            {/* Placeholder for social media messages */}
            <div className="bg-gray-100 p-2 rounded mb-2">Customer (WhatsApp): My camera is offline.</div>
            <input type="text" placeholder="Reply via WhatsApp..." className="bg-gray-200 p-2 rounded w-full focus:outline-none" />
          </div>
        );
      case 'Chat': // Default to Chat
      default:
        return (
          <div>
            <div className="h-48 overflow-y-auto bg-gray-50 p-2 rounded mb-2 border">
              {/* Placeholder chat history */}
              <div className="text-sm mb-1"><span className="font-semibold">Agent:</span> Hello, how can I help you?</div>
              <div className="text-sm mb-1"><span className="font-semibold">Customer:</span> My doorbell camera isn't recording.</div>
              <div className="text-sm mb-1"><span className="font-semibold">Agent:</span> Okay, let me check the diagnostics.</div>
            </div>
            <input type="text" placeholder="Type a message..." className="bg-gray-200 p-2 rounded w-full focus:outline-none" />
            <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mt-2">Send Message</button>
          </div>
        );
    }
  };

  const renderChannelTabs = () => {
    const channels: Channel[] = ['Chat', 'Email', 'Call', 'Social'];
    return (
      <div className="flex border-b mb-4">
        {channels.map(channel => (
          <button
            key={channel}
            onClick={() => setActiveChannel(channel)}
            className={`py-2 px-4 ${activeChannel === channel ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}
          >
            {channel}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white shadow-md rounded p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-2 border-b pb-2">Ticket #12345: Doorbell Not Recording</h2>
      
      {/* Ticket Details Area */}
      <div className="mb-4 text-sm">
        <p><strong>Status:</strong> Open</p>
        <p><strong>Priority:</strong> High</p>
        <p><strong>Assigned Agent:</strong> You</p>
        <p><strong>Issue Type:</strong> Video Quality</p>
      </div>

      {/* Channel Tabs */}
      {renderChannelTabs()}

      {/* Channel-Specific Content Area */}
      <div className="flex-grow">
        {renderChannelContent()}
      </div>

      {/* Common Actions Area (Example) */}
      <div className="border-t pt-4 mt-4 flex justify-between items-center">
        <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm py-1 px-3 rounded">Escalate Issue</button>
        <div>
          <label htmlFor="ticket-status" className="text-sm mr-2">Status:</label>
          <select id="ticket-status" className="p-1 border rounded text-sm">
            <option>Open</option>
            <option>Pending</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TicketChatInterface;
