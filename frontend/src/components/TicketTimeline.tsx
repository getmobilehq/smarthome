import React, { useState } from 'react';

interface TicketEvent {
  id: number;
  date: string;
  type: 'created' | 'updated' | 'statusChange' | 'assignmentChange' | 'note' | 'customerMessage' | 'agentMessage' | 'resolution';
  content: string;
  agent?: string;
  status?: string;
  private?: boolean;
}

interface Ticket {
  id: number;
  subject: string;
  description: string;
  status: 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  events: TicketEvent[];
}

const TicketTimeline: React.FC = () => {
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [showPrivateNotes, setShowPrivateNotes] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [newNote, setNewNote] = useState<string>('');
  const [newNotePrivate, setNewNotePrivate] = useState<boolean>(true);
  
  // Mock ticket data
  const tickets: Ticket[] = [
    {
      id: 1001,
      subject: 'Doorbell Camera Connectivity Issue',
      description: 'Customer reports doorbell camera keeps going offline every few hours.',
      status: 'open',
      priority: 'high',
      category: 'Connectivity',
      createdAt: '2025-04-01T14:30:00',
      updatedAt: '2025-04-03T09:15:00',
      assignedTo: 'Mike Johnson',
      customer: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
      },
      events: [
        {
          id: 1,
          date: '2025-04-01T14:30:00',
          type: 'created',
          content: 'Ticket created via phone call',
          agent: 'System'
        },
        {
          id: 2,
          date: '2025-04-01T14:35:00',
          type: 'assignmentChange',
          content: 'Assigned to Mike Johnson',
          agent: 'System'
        },
        {
          id: 3,
          date: '2025-04-01T14:40:00',
          type: 'agentMessage',
          content: 'I\'ve reviewed your issue with the doorbell camera going offline. Let\'s troubleshoot this together.',
          agent: 'Mike Johnson'
        },
        {
          id: 4,
          date: '2025-04-01T15:10:00',
          type: 'note',
          content: 'Customer reports the camera is about 30 feet from the router with 2 walls in between. Signal strength might be an issue.',
          agent: 'Mike Johnson',
          private: true
        },
        {
          id: 5,
          date: '2025-04-01T15:15:00',
          type: 'statusChange',
          content: 'Status changed to Pending',
          status: 'pending',
          agent: 'Mike Johnson'
        },
        {
          id: 6,
          date: '2025-04-02T10:30:00',
          type: 'customerMessage',
          content: 'I tried moving the router closer, but it\'s still going offline every few hours.'
        },
        {
          id: 7,
          date: '2025-04-02T11:45:00',
          type: 'agentMessage',
          content: 'Thank you for trying that. Let\'s try a factory reset of the doorbell camera. I\'ll send you instructions.',
          agent: 'Mike Johnson'
        },
        {
          id: 8,
          date: '2025-04-03T09:15:00',
          type: 'note',
          content: 'Customer hasn\'t responded to reset instructions yet. Will follow up tomorrow if no response.',
          agent: 'Mike Johnson',
          private: true
        }
      ]
    },
    {
      id: 1002,
      subject: 'Billing Inquiry - Premium Plan',
      description: 'Customer wants to know what\'s included in the Premium Security Bundle and how it differs from their current plan.',
      status: 'closed',
      priority: 'low',
      category: 'Billing',
      createdAt: '2025-03-28T10:15:00',
      updatedAt: '2025-03-29T16:40:00',
      assignedTo: 'Taylor Swift',
      customer: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
      },
      events: [
        {
          id: 1,
          date: '2025-03-28T10:15:00',
          type: 'created',
          content: 'Ticket created via email',
          agent: 'System'
        },
        {
          id: 2,
          date: '2025-03-28T10:20:00',
          type: 'assignmentChange',
          content: 'Assigned to Taylor Swift',
          agent: 'System'
        },
        {
          id: 3,
          date: '2025-03-28T11:30:00',
          type: 'agentMessage',
          content: 'I\'d be happy to explain the Premium Security Bundle. It includes 24/7 professional monitoring, unlimited video history for up to 6 cameras, and priority customer support.',
          agent: 'Taylor Swift'
        },
        {
          id: 4,
          date: '2025-03-29T09:45:00',
          type: 'customerMessage',
          content: 'Thank you for the information. How much more is this compared to my current plan?'
        },
        {
          id: 5,
          date: '2025-03-29T10:30:00',
          type: 'agentMessage',
          content: 'You\'re currently on our Basic plan at $9.99/month. The Premium Security Bundle is $24.99/month, so the difference would be $15/month. However, we have a promotion right now that gives you 3 months at 50% off if you upgrade.',
          agent: 'Taylor Swift'
        },
        {
          id: 6,
          date: '2025-03-29T14:20:00',
          type: 'customerMessage',
          content: 'That sounds good. I\'d like to upgrade to the Premium plan please.'
        },
        {
          id: 7,
          date: '2025-03-29T16:30:00',
          type: 'agentMessage',
          content: 'Great! I\'ve upgraded your account to the Premium Security Bundle with the promotional discount. You\'ll receive a confirmation email shortly with all the details. Is there anything else I can help with?',
          agent: 'Taylor Swift'
        },
        {
          id: 8,
          date: '2025-03-29T16:35:00',
          type: 'customerMessage',
          content: 'No, that\'s all. Thank you for your help!'
        },
        {
          id: 9,
          date: '2025-03-29T16:40:00',
          type: 'resolution',
          content: 'Customer successfully upgraded to Premium Security Bundle with 3-month promotional pricing',
          agent: 'Taylor Swift'
        },
        {
          id: 10,
          date: '2025-03-29T16:40:00',
          type: 'statusChange',
          content: 'Status changed to Closed',
          status: 'closed',
          agent: 'Taylor Swift'
        }
      ]
    }
  ];
  
  const handleTicketSelect = (ticket: Ticket) => {
    setActiveTicket(ticket);
  };
  
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'created':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        );
      case 'updated':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        );
      case 'statusChange':
        return (
          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </div>
        );
      case 'assignmentChange':
        return (
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        );
      case 'note':
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        );
      case 'customerMessage':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
      case 'agentMessage':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        );
      case 'resolution':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };
  
  const getEventBgColor = (type: string, isPrivate: boolean = false) => {
    if (isPrivate) return 'bg-gray-50';
    
    switch (type) {
      case 'customerMessage': return 'bg-green-50';
      case 'agentMessage': return 'bg-blue-50';
      case 'resolution': return 'bg-green-50';
      case 'statusChange': return 'bg-yellow-50';
      case 'created': return 'bg-blue-50';
      default: return 'bg-white';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const getPriorityBadgeClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleAddNote = () => {
    if (activeTicket && newNote.trim()) {
      const updatedTicket = {...activeTicket};
      const newEvent: TicketEvent = {
        id: activeTicket.events.length + 1,
        date: new Date().toISOString(),
        type: 'note',
        content: newNote.trim(),
        agent: 'Current Agent', // In a real app, this would be the logged-in agent
        private: newNotePrivate
      };
      
      updatedTicket.events = [...updatedTicket.events, newEvent];
      updatedTicket.updatedAt = new Date().toISOString();
      
      setActiveTicket(updatedTicket);
      setNewNote('');
    }
  };
  
  const filteredEvents = activeTicket?.events.filter(event => {
    if (!showPrivateNotes && event.private) return false;
    if (filterType !== 'all' && event.type !== filterType) return false;
    return true;
  }) || [];
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="bg-brand-accent text-white px-4 py-3">
        <h2 className="text-lg font-semibold">Ticket Timeline</h2>
      </div>
      
      <div className="flex h-[600px]">
        {/* Ticket List */}
        <div className="w-64 border-r overflow-y-auto">
          <div className="p-3 bg-gray-50 border-b">
            <h3 className="text-sm font-medium text-gray-700">Customer Tickets</h3>
          </div>
          
          <ul className="divide-y">
            {tickets.map(ticket => (
              <li
                key={ticket.id}
                className={`p-3 cursor-pointer hover:bg-gray-50 ${activeTicket?.id === ticket.id ? 'bg-blue-50' : ''}`}
                onClick={() => handleTicketSelect(ticket)}
              >
                <div>
                  <h4 className="text-sm font-medium">{ticket.subject}</h4>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadgeClass(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      #{ticket.id}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Updated: {formatDate(ticket.updatedAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Ticket Detail */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeTicket ? (
            <>
              {/* Ticket Header */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{activeTicket.subject}</h3>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadgeClass(activeTicket.status)}`}>
                        {activeTicket.status}
                      </span>
                      <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityBadgeClass(activeTicket.priority)}`}>
                        {activeTicket.priority}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        #{activeTicket.id}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Created: {formatDate(activeTicket.createdAt)} • Category: {activeTicket.category}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="text-gray-500">Assigned to:</span>{' '}
                      <span className="font-medium">{activeTicket.assignedTo || 'Unassigned'}</span>
                    </div>
                    <button className="mt-2 text-xs text-white bg-brand-accent px-2 py-1 rounded hover:bg-opacity-90">
                      Edit Ticket
                    </button>
                  </div>
                </div>
                
                <div className="mt-3 text-sm text-gray-700">
                  <p>{activeTicket.description}</p>
                </div>
              </div>
              
              {/* Filter Controls */}
              <div className="px-4 py-2 border-b flex justify-between items-center bg-white">
                <div className="flex space-x-2">
                  <select
                    className="text-xs border rounded p-1"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Events</option>
                    <option value="customerMessage">Customer Messages</option>
                    <option value="agentMessage">Agent Messages</option>
                    <option value="note">Notes</option>
                    <option value="statusChange">Status Changes</option>
                  </select>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showPrivate"
                      checked={showPrivateNotes}
                      onChange={() => setShowPrivateNotes(!showPrivateNotes)}
                      className="mr-1"
                    />
                    <label htmlFor="showPrivate" className="text-xs">Show Private Notes</label>
                  </div>
                </div>
                
                <div>
                  <button className="text-xs text-brand-accent hover:underline">
                    Print Timeline
                  </button>
                </div>
              </div>
              
              {/* Timeline Events */}
              <div className="flex-1 overflow-y-auto p-4">
                {filteredEvents.length > 0 ? (
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200" aria-hidden="true"></div>
                    
                    <ul className="space-y-4">
                      {filteredEvents.map(event => (
                        <li key={event.id} className="relative">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 relative z-10">
                              {getEventIcon(event.type)}
                            </div>
                            
                            <div className={`ml-3 p-3 ${getEventBgColor(event.type, event.private)} rounded-lg ${event.private ? 'border border-gray-200' : ''} flex-1`}>
                              <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                  <span className="text-sm font-medium">
                                    {event.type === 'customerMessage' ? 'Customer' : event.agent}
                                  </span>
                                  {event.private && (
                                    <span className="ml-2 px-1.5 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">
                                      Private
                                    </span>
                                  )}
                                  {event.status && (
                                    <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${getStatusBadgeClass(event.status)}`}>
                                      {event.status}
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-gray-500">
                                  {formatDate(event.date)}
                                </span>
                              </div>
                              <div className="text-sm">
                                {event.content}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    No events match your current filter settings
                  </div>
                )}
              </div>
              
              {/* Add Note Form */}
              <div className="p-3 border-t bg-gray-50">
                <div className="flex flex-col">
                  <textarea
                    className="w-full border rounded-md p-2 text-sm mb-2"
                    rows={2}
                    placeholder="Add a note to the ticket..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  ></textarea>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="privateNote"
                        checked={newNotePrivate}
                        onChange={() => setNewNotePrivate(!newNotePrivate)}
                        className="mr-1"
                      />
                      <label htmlFor="privateNote" className="text-xs">Private Note</label>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded border hover:bg-gray-200"
                        onClick={() => setNewNote('')}
                      >
                        Cancel
                      </button>
                      <button 
                        className="px-3 py-1 text-xs bg-brand-accent text-white rounded hover:bg-opacity-90"
                        onClick={handleAddNote}
                        disabled={!newNote.trim()}
                      >
                        Add Note
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-gray-500">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No ticket selected</h3>
                <p className="mt-1 text-sm text-gray-500">Select a ticket from the list to view the timeline.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketTimeline;
