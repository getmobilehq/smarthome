import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import KnowledgeBase from '../components/KnowledgeBase/KnowledgeBase';
import EmotionalIntelligenceAssistant from '../components/EmotionalIntelligenceAssistant/EmotionalIntelligenceAssistant';
import TroubleshootingGuide from '../components/TroubleshootingGuide/TroubleshootingGuide';

interface Ticket {
  id: string;
  subject: string;
  customer: string;
  status: string;
  priority: string;
  channel: string;
  lastUpdate: string;
  description?: string;
  assignedAgent?: string;
  createdAt?: string;
  category?: string;
}

const TicketDetailView = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [escalationReason, setEscalationReason] = useState('');
  const [escalationAgent, setEscalationAgent] = useState('');
  
  // Mock data - would come from API in real application
  const agents = [
    { id: 1, name: 'Sam Batman', specialty: 'Technical', availability: 'Available' },
    { id: 2, name: 'Jane Foster', specialty: 'Billing', availability: 'Busy' },
    { id: 3, name: 'Mike Richards', specialty: 'Installation', availability: 'Available' },
    { id: 4, name: 'Sarah Connor', specialty: 'Technical', availability: 'Away' }
  ];

  useEffect(() => {
    // In a real app, fetch ticket details from API
    // For now, use mock data
    const mockTickets = [
      { 
        id: 'TCKT-001', 
        subject: 'Camera Offline', 
        customer: 'John Doe',
        customerId: 1, 
        status: 'Open', 
        priority: 'High', 
        channel: 'Email', 
        lastUpdate: '1 hour ago',
        description: 'Customer reports that their outdoor camera has been offline for the past 24 hours. They have already tried power cycling the device without success.',
        assignedAgent: 'Sam Batman',
        createdAt: '2025-04-01 14:30',
        category: 'Connectivity'
      },
      { 
        id: 'TCKT-002', 
        subject: 'Smart Lock Battery Low', 
        customer: 'Jane Smith',
        customerId: 2, 
        status: 'In Progress', 
        priority: 'Medium', 
        channel: 'Chat', 
        lastUpdate: '3 hours ago',
        description: 'Smart lock showing low battery warning. Customer needs assistance with battery replacement procedure.',
        assignedAgent: 'Sam Batman',
        createdAt: '2025-04-01 12:15',
        category: 'Maintenance'
      },
      { 
        id: 'TCKT-003', 
        subject: 'Hub Connection Issue', 
        customer: 'Robert Chen',
        customerId: 3, 
        status: 'Open', 
        priority: 'High', 
        channel: 'Call', 
        lastUpdate: '5 hours ago',
        description: 'Customer cannot connect any devices after power outage. Hub shows solid red light.',
        assignedAgent: 'Sam Batman',
        createdAt: '2025-04-01 10:45',
        category: 'Connectivity'
      },
      { 
        id: 'TCKT-004', 
        subject: 'Motion Sensor False Alarms', 
        customer: 'Sarah Johnson',
        customerId: 4, 
        status: 'Pending', 
        priority: 'Medium', 
        channel: 'Email', 
        lastUpdate: '1 day ago',
        description: 'Customer reports getting false motion alerts during the night. Camera recordings show no actual motion.',
        assignedAgent: 'Sam Batman',
        createdAt: '2025-04-01 09:20',
        category: 'Configuration'
      },
      { 
        id: 'TCKT-005', 
        subject: 'Smoke Detector Beeping', 
        customer: 'Michael Wong',
        customerId: 5, 
        status: 'Open', 
        priority: 'Urgent', 
        channel: 'Social', 
        lastUpdate: '2 hours ago',
        description: 'Smart smoke detector beeping every 30 seconds. Customer already replaced batteries.',
        assignedAgent: 'Sam Batman',
        createdAt: '2025-04-01 08:05',
        category: 'Hardware'
      },
    ];
    
    const foundTicket = mockTickets.find(t => t.id === ticketId);
    
    if (foundTicket) {
      setTicket(foundTicket);
    }
    
    setLoading(false);
  }, [ticketId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-purple-100 text-purple-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleEscalateTicket = () => {
    if (!escalationReason || !escalationAgent) {
      alert('Please provide a reason and select an agent for escalation');
      return;
    }
    
    // In a real app, you would make an API call here
    console.log(`Escalating ticket ${ticketId} to ${escalationAgent}. Reason: ${escalationReason}`);
    
    // Update the ticket status locally for demo
    if (ticket) {
      const updatedTicket = { ...ticket, status: 'Escalated', assignedAgent: escalationAgent };
      setTicket(updatedTicket);
    }
    
    setShowEscalateModal(false);
    setEscalationReason('');
    setEscalationAgent('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Ticket not found</h3>
          <p className="mt-2 text-gray-500">The ticket you're looking for doesn't exist or has been removed.</p>
          <div className="mt-6">
            <button 
              onClick={() => navigate('/tickets')}
              className="bg-brand-accent text-white px-4 py-2 rounded-md"
            >
              Back to Tickets
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto"> 
      <EmotionalIntelligenceAssistant />

      {/* Back button and ticket ID */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/tickets')}
          className="flex items-center text-brand-accent hover:underline mr-4"
        >
          <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Tickets
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Ticket Details: {ticket.id}</h1>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Ticket Details & Interaction */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Ticket Information Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Created</h3>
                <p className="text-sm text-gray-900">{ticket.createdAt}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
                <p className="text-sm text-gray-900">{ticket.lastUpdate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Channel</h3>
                <p className="text-sm text-gray-900">{ticket.channel}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Assigned Agent</h3>
                <p className="text-sm text-gray-900">{ticket.assignedAgent}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                <p className={`text-sm text-gray-900 ${getStatusColor(ticket.status)}`}>{ticket.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Priority</h3>
                <p className={`text-sm text-gray-900 ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
              <p className="text-gray-900">{ticket.description}</p>
            </div>
            
            {/* Communication timeline */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-4">Communication History</h3>
              
              <div className="space-y-6">
                <div className="relative pl-8 pb-6 border-l-2 border-gray-200">
                  <div className="absolute top-0 left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-accent"></div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">Agent: {ticket.assignedAgent}</span>
                      <span className="text-xs text-gray-500">Today, 10:30 AM</span>
                    </div>
                    <p className="text-gray-700 text-sm">I've reviewed your issue with the camera. Could you please check if the Wi-Fi network is working properly? Also, is the camera showing any lights?</p>
                  </div>
                </div>
                
                <div className="relative pl-8 pb-6 border-l-2 border-gray-200">
                  <div className="absolute top-0 left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-300"></div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">Customer: {ticket.customer}</span>
                      <span className="text-xs text-gray-500">Today, 9:45 AM</span>
                    </div>
                    <p className="text-gray-700 text-sm">The camera has a solid blue light but doesn't appear in my app. I've checked my WiFi and it's working fine for other devices.</p>
                  </div>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute top-0 left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-300"></div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">System</span>
                      <span className="text-xs text-gray-500">Today, 9:30 AM</span>
                    </div>
                    <p className="text-gray-700 text-sm">Ticket created via Email</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reply section */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Add Response</h3>
              <textarea 
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                placeholder="Type your response here..."
                rows={4}
              ></textarea>
              <div className="flex justify-between mt-3">
                <div>
                  <button className="inline-flex items-center text-gray-700 hover:text-gray-900">
                    <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    Attach File
                  </button>
                </div>
                <div className="space-x-2">
                  <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-accent">
                    <option value="reply">Reply</option>
                    <option value="note">Internal Note</option>
                  </select>
                  <button className="bg-brand-accent text-white px-4 py-2 rounded-md hover:bg-opacity-90">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tools */}
        <div className="md:col-span-1 relative"> 
          
          {/* In-flow Tools */}
          <div className="space-y-6">
             {/* Moved Troubleshooting Guide to top */}
            <TroubleshootingGuide />
            <KnowledgeBase />
            {/* Removed EI Assistant from here */}
          </div>
        </div>

      </div>

      {/* Escalate Modal */}
      {showEscalateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">Escalate Ticket</h3>
              <button 
                onClick={() => setShowEscalateModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Agent to Escalate To
                </label>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={escalationAgent}
                  onChange={(e) => setEscalationAgent(e.target.value)}
                >
                  <option value="">Select an agent...</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.name} disabled={agent.availability !== 'Available'}>
                      {agent.name} - {agent.specialty} ({agent.availability})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Escalation
                </label>
                <textarea 
                  className="w-full border border-gray-300 rounded-md p-2"
                  rows={4}
                  placeholder="Explain why this ticket needs to be escalated..."
                  value={escalationReason}
                  onChange={(e) => setEscalationReason(e.target.value)}
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowEscalateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleEscalateTicket}
                className="px-4 py-2 bg-brand-accent text-white rounded-md hover:bg-opacity-90"
              >
                Escalate Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetailView;
