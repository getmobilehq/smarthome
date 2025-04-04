import React, { useState } from 'react';

interface Message {
  id: number;
  channel: 'email' | 'sms' | 'chat' | 'call' | 'social';
  direction: 'incoming' | 'outgoing';
  content: string;
  date: string;
  from: string;
  to: string;
  attachments?: string[];
  read: boolean;
  tags?: string[];
}

const MessageHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'email' | 'sms' | 'chat' | 'call' | 'social'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  // Mock message data
  const messages: Message[] = [
    {
      id: 1,
      channel: 'email',
      direction: 'incoming',
      content: 'Hello, I\'m having trouble with my doorbell camera. It keeps going offline every few hours. I\'ve already tried resetting it but the issue persists. Is there anything else I can try?',
      date: '2025-04-03T14:30:00',
      from: 'john.doe@example.com',
      to: 'support@smarthome.com',
      read: true,
      tags: ['connectivity']
    },
    {
      id: 2,
      channel: 'email',
      direction: 'outgoing',
      content: 'Hello John, Thank you for contacting SmartHome Support. I\'m sorry to hear about the issues with your doorbell camera. Let\'s try a few troubleshooting steps. First, please check if your WiFi signal is strong near the doorbell location. You can use your smartphone\'s WiFi analyzer. Second, try power cycling your home router. Please let me know if either of these steps help. Best regards, Mike Johnson, SmartHome Support',
      date: '2025-04-03T15:45:00',
      from: 'support@smarthome.com',
      to: 'john.doe@example.com',
      read: true,
      tags: ['troubleshooting']
    },
    {
      id: 3,
      channel: 'chat',
      direction: 'incoming',
      content: 'I checked the wifi signal and it\'s strong (4 bars). Also restarted the router but it\'s still happening.',
      date: '2025-04-03T16:30:00',
      from: 'John Doe',
      to: 'Agent',
      read: true
    },
    {
      id: 4,
      channel: 'chat',
      direction: 'outgoing',
      content: 'Thank you for trying those steps. Let\'s try a factory reset of the doorbell camera. You can do this by pressing and holding the setup button for 15 seconds until the light turns red. Would you like to try this now?',
      date: '2025-04-03T16:35:00',
      from: 'Agent',
      to: 'John Doe',
      read: true
    },
    {
      id: 5,
      channel: 'chat',
      direction: 'incoming',
      content: 'I\'ll try that now. Give me a few minutes.',
      date: '2025-04-03T16:38:00',
      from: 'John Doe',
      to: 'Agent',
      read: true
    },
    {
      id: 6,
      channel: 'sms',
      direction: 'outgoing',
      content: 'SmartHome: Your doorbell camera has been offline for more than 24 hours. Please check your WiFi connection or contact support if you need assistance.',
      date: '2025-04-02T10:15:00',
      from: 'SmartHome',
      to: '+1 (555) 123-4567',
      read: true,
      tags: ['automated', 'alert']
    },
    {
      id: 7,
      channel: 'call',
      direction: 'incoming',
      content: 'Call regarding doorbell camera connectivity issues. Customer reports device goes offline intermittently. Troubleshooting steps provided: check WiFi signal, power cycle router, factory reset device.',
      date: '2025-04-01T14:30:00',
      from: '+1 (555) 123-4567',
      to: 'Support',
      read: true,
      tags: ['connectivity']
    },
    {
      id: 8,
      channel: 'email',
      direction: 'incoming',
      content: 'I\'m interested in upgrading to the Premium Security Bundle. Can you tell me what\'s included and how much it costs?',
      date: '2025-03-28T10:15:00',
      from: 'john.doe@example.com',
      to: 'sales@smarthome.com',
      read: true,
      tags: ['sales', 'upgrade']
    },
    {
      id: 9,
      channel: 'social',
      direction: 'incoming',
      content: '@SmartHome Just installed my new security system and I\'m loving it! The app is really intuitive. #SmartHomeSecurity',
      date: '2025-03-15T09:45:00',
      from: '@johndoe',
      to: '@SmartHome',
      read: false,
      tags: ['positive']
    },
    {
      id: 10,
      channel: 'sms',
      direction: 'incoming',
      content: 'Is there a way to adjust motion sensitivity on the doorbell camera?',
      date: '2025-04-04T08:30:00',
      from: '+1 (555) 123-4567',
      to: 'SmartHome',
      read: false
    }
  ];
  
  // Filter messages based on tab, search query, and unread filter
  const filteredMessages = messages.filter(message => {
    // Filter by tab
    if (activeTab !== 'all' && message.channel !== activeTab) return false;
    
    // Filter by search query
    if (searchQuery && !message.content.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !message.from.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !message.to.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Filter by read/unread
    if (showOnlyUnread && message.read) return false;
    
    return true;
  });
  
  // Sort messages by date
  const sortedMessages = [...filteredMessages].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });
  
  const handleMessageSelect = (message: Message) => {
    setSelectedMessage(message);
    
    // Mark as read if unread
    if (!message.read) {
      const updatedMessages = messages.map(m => 
        m.id === message.id ? {...m, read: true} : m
      );
      // In a real app, this would update the state in a parent component or context
    }
  };
  
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'sms':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case 'chat':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'call':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'social':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
    }
  };
  
  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'email': return 'text-blue-500';
      case 'sms': return 'text-green-500';
      case 'chat': return 'text-purple-500';
      case 'call': return 'text-red-500';
      case 'social': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="bg-brand-accent text-white px-4 py-3">
        <h2 className="text-lg font-semibold">Message History</h2>
      </div>
      
      <div className="flex flex-col h-[500px]">
        {/* Filter Controls */}
        <div className="p-3 border-b">
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            <button
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${activeTab === 'all' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('all')}
            >
              All Messages
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap flex items-center ${activeTab === 'email' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('email')}
            >
              <span className="text-blue-500 mr-1">{getChannelIcon('email')}</span>
              Email
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap flex items-center ${activeTab === 'sms' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('sms')}
            >
              <span className="text-green-500 mr-1">{getChannelIcon('sms')}</span>
              SMS
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap flex items-center ${activeTab === 'chat' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('chat')}
            >
              <span className="text-purple-500 mr-1">{getChannelIcon('chat')}</span>
              Chat
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap flex items-center ${activeTab === 'call' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('call')}
            >
              <span className="text-red-500 mr-1">{getChannelIcon('call')}</span>
              Call
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap flex items-center ${activeTab === 'social' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('social')}
            >
              <span className="text-yellow-500 mr-1">{getChannelIcon('social')}</span>
              Social
            </button>
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-8 pr-4 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="absolute left-2 top-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex items-center">
              <select 
                className="text-xs border rounded p-1"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showUnread"
                checked={showOnlyUnread}
                onChange={() => setShowOnlyUnread(!showOnlyUnread)}
                className="mr-1"
              />
              <label htmlFor="showUnread" className="text-xs">Unread Only</label>
            </div>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Message List */}
          <div className="w-2/5 border-r overflow-y-auto">
            {sortedMessages.length > 0 ? (
              <ul className="divide-y">
                {sortedMessages.map(message => (
                  <li 
                    key={message.id}
                    className={`p-3 cursor-pointer hover:bg-gray-50 ${!message.read ? 'bg-blue-50' : ''} ${selectedMessage?.id === message.id ? 'bg-gray-100' : ''}`}
                    onClick={() => handleMessageSelect(message)}
                  >
                    <div className="flex items-center mb-1">
                      <div className={`flex-shrink-0 ${getChannelColor(message.channel)}`}>
                        {getChannelIcon(message.channel)}
                      </div>
                      <div className="ml-2 flex-1">
                        <span className="text-sm font-medium">
                          {message.direction === 'incoming' ? message.from : message.to}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {formatDate(message.date)}
                        </span>
                      </div>
                      {!message.read && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {message.content.length > 100 
                        ? message.content.substring(0, 100) + '...' 
                        : message.content}
                    </p>
                    {message.tags && message.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {message.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="text-xs px-1.5 py-0.5 bg-gray-100 rounded-full text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500 p-4">
                No messages match your current filters
              </div>
            )}
          </div>
          
          {/* Message Detail */}
          <div className="w-3/5 flex flex-col overflow-hidden">
            {selectedMessage ? (
              <>
                <div className="p-4 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 ${getChannelColor(selectedMessage.channel)}`}>
                          {getChannelIcon(selectedMessage.channel)}
                        </div>
                        <h3 className="ml-2 text-lg font-medium">
                          {selectedMessage.channel.charAt(0).toUpperCase() + selectedMessage.channel.slice(1)}
                          {' '}
                          {selectedMessage.direction === 'incoming' ? 'from' : 'to'}
                          {' '}
                          {selectedMessage.direction === 'incoming' ? selectedMessage.from : selectedMessage.to}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(selectedMessage.date).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                        <svg className="h-3 w-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Print
                      </button>
                      <button className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                        <svg className="h-3 w-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share
                      </button>
                    </div>
                  </div>
                  
                  {selectedMessage.tags && selectedMessage.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {selectedMessage.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className={`p-4 rounded-lg ${
                    selectedMessage.direction === 'incoming' 
                      ? 'bg-blue-50 border border-blue-100' 
                      : 'bg-green-50 border border-green-100'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{selectedMessage.content}</p>
                    
                    {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                      <div className="mt-3 border-t border-gray-200 pt-3">
                        <h4 className="text-xs font-medium text-gray-700 mb-2">Attachments:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMessage.attachments.map((attachment, index) => (
                            <div 
                              key={index}
                              className="flex items-center p-2 bg-white border rounded-md text-xs"
                            >
                              <svg className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                              {attachment}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-3 border-t bg-gray-50">
                  {selectedMessage.channel !== 'call' && selectedMessage.channel !== 'social' && (
                    <div className="flex">
                      <input
                        type="text"
                        placeholder={`Reply to this ${selectedMessage.channel}...`}
                        className="flex-1 px-3 py-1 text-sm border rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                      />
                      <button className="px-3 py-1 bg-brand-accent text-white text-sm rounded-r-md hover:bg-opacity-90">
                        Send
                      </button>
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-2">
                    <div className="flex space-x-2">
                      <button className="text-xs text-gray-600 hover:underline">Add to Ticket</button>
                      <button className="text-xs text-gray-600 hover:underline">Flag as Important</button>
                    </div>
                    <div>
                      <button className="text-xs text-gray-600 hover:underline">View in Context</button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-gray-500">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No message selected</h3>
                  <p className="mt-1 text-sm text-gray-500">Select a message from the list to view its details.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageHistory;
