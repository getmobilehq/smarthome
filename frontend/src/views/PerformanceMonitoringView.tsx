import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface AgentPerformance {
  id: number;
  name: string;
  role: string;
  ticketsResolved: number;
  averageResolutionTime: string;
  averageNps: number;
  firstContactResolution: number;
}

interface TicketMetrics {
  id: string;
  customer: string;
  subject: string;
  status: string;
  priority: string;
  resolutionTime: string;
  npsScore: number | null;
  agentName: string;
}

const PerformanceMonitoringView = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  
  // Mock data for agent performance
  const agentPerformanceData: AgentPerformance[] = [
    {
      id: 1,
      name: 'Sam Batman',
      role: 'Support Agent',
      ticketsResolved: 54,
      averageResolutionTime: '4h 12m',
      averageNps: 8.7,
      firstContactResolution: 76
    },
    {
      id: 2,
      name: 'Jane Foster',
      role: 'Support Agent',
      ticketsResolved: 42,
      averageResolutionTime: '3h 45m',
      averageNps: 9.2,
      firstContactResolution: 82
    },
    {
      id: 3,
      name: 'Mike Richards',
      role: 'Support Agent',
      ticketsResolved: 38,
      averageResolutionTime: '5h 30m',
      averageNps: 7.8,
      firstContactResolution: 68
    },
    {
      id: 4,
      name: 'Sarah Connor',
      role: 'Support Specialist',
      ticketsResolved: 63,
      averageResolutionTime: '2h 58m',
      averageNps: 9.1,
      firstContactResolution: 85
    }
  ];
  
  // Mock ticket data with resolution metrics
  const ticketMetricsData: TicketMetrics[] = [
    {
      id: 'TCKT-001',
      customer: 'John Doe',
      subject: 'Camera Offline',
      status: 'Resolved',
      priority: 'High',
      resolutionTime: '3h 27m',
      npsScore: 8,
      agentName: 'Sam Batman'
    },
    {
      id: 'TCKT-006',
      customer: 'Lisa Garcia',
      subject: 'Setup Assistance',
      status: 'Resolved',
      priority: 'Low',
      resolutionTime: '1h 45m',
      npsScore: 10,
      agentName: 'Sam Batman'
    },
    {
      id: 'TCKT-008',
      customer: 'Alex Johnson',
      subject: 'Smart Lock Jammed',
      status: 'Resolved',
      priority: 'High',
      resolutionTime: '5h 12m',
      npsScore: 7,
      agentName: 'Jane Foster'
    },
    {
      id: 'TCKT-010',
      customer: 'Emily Chang',
      subject: 'Device Pairing',
      status: 'Resolved',
      priority: 'Medium',
      resolutionTime: '2h 34m',
      npsScore: 9,
      agentName: 'Mike Richards'
    },
    {
      id: 'TCKT-012',
      customer: 'Thomas Wilson',
      subject: 'Firmware Update Failed',
      status: 'Resolved',
      priority: 'Medium',
      resolutionTime: '4h 03m',
      npsScore: 6,
      agentName: 'Sarah Connor'
    },
    {
      id: 'TCKT-015',
      customer: 'Rachel Moore',
      subject: 'Hub Connectivity',
      status: 'Resolved',
      priority: 'Urgent',
      resolutionTime: '1h 58m',
      npsScore: 9,
      agentName: 'Sarah Connor'
    },
    {
      id: 'TCKT-017',
      customer: 'Daniel Smith',
      subject: 'App Login Issue',
      status: 'Resolved',
      priority: 'Low',
      resolutionTime: '2h 12m',
      npsScore: null, // Pending NPS score
      agentName: 'Sam Batman'
    }
  ];
  
  // Filter tickets by selected agent
  const filteredTickets = selectedAgent ? 
    ticketMetricsData.filter(ticket => 
      agentPerformanceData.find(agent => agent.id === selectedAgent)?.name === ticket.agentName
    ) : 
    ticketMetricsData;
  
  const calculateTeamAverages = () => {
    const totalAgents = agentPerformanceData.length;
    
    // Calculate average NPS
    const totalNps = agentPerformanceData.reduce((sum, agent) => sum + agent.averageNps, 0);
    const avgNps = (totalNps / totalAgents).toFixed(1);
    
    // Calculate average resolution time - convert to minutes, average, then format back
    const totalResTime = agentPerformanceData.reduce((sum, agent) => {
      const [hours, minutes] = agent.averageResolutionTime.split('h ');
      return sum + (parseInt(hours) * 60) + parseInt(minutes.replace('m', ''));
    }, 0);
    const avgResTimeMinutes = totalResTime / totalAgents;
    const avgResHours = Math.floor(avgResTimeMinutes / 60);
    const avgResMin = Math.round(avgResTimeMinutes % 60);
    const avgResTime = `${avgResHours}h ${avgResMin}m`;
    
    // Calculate average FCR
    const totalFcr = agentPerformanceData.reduce((sum, agent) => sum + agent.firstContactResolution, 0);
    const avgFcr = Math.round(totalFcr / totalAgents);
    
    return { avgNps, avgResTime, avgFcr };
  };
  
  const teamAverages = calculateTeamAverages();
  
  const getNpsColor = (nps: number) => {
    if (nps >= 9) return 'text-green-600';
    if (nps >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getPerformanceLevel = (agent: AgentPerformance) => {
    // Calculate overall performance score based on metrics
    const npsScore = (agent.averageNps / 10) * 100;
    const fcrScore = agent.firstContactResolution;
    
    // Calculate resolution time score (higher is better)
    const [hours, minutes] = agent.averageResolutionTime.split('h ');
    const totalMinutes = (parseInt(hours) * 60) + parseInt(minutes.replace('m', ''));
    // Scale from 0-100, where 0 minutes = 100 and 600+ minutes (10 hours) = 0
    const resTimeScore = Math.max(0, 100 - (totalMinutes / 6));
    
    // Combined score (weighted)
    const overallScore = (npsScore * 0.4) + (fcrScore * 0.3) + (resTimeScore * 0.3);
    
    if (overallScore >= 85) return 'Excellent';
    if (overallScore >= 70) return 'Good';
    if (overallScore >= 55) return 'Average';
    return 'Needs Improvement';
  };
  
  const getPerformanceLevelColor = (level: string) => {
    switch (level) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Average': return 'bg-yellow-100 text-yellow-800';
      case 'Needs Improvement': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Performance Monitoring</h1>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('day')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'day' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'week' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'month' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            This Month
          </button>
        </div>
      </div>
      
      {/* Overall Performance Metrics */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Team NPS Score</h3>
            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex items-baseline">
            <span className={`text-3xl font-bold ${getNpsColor(parseFloat(teamAverages.avgNps))}`}>{teamAverages.avgNps}</span>
            <span className="ml-2 text-sm text-gray-500">/ 10</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg. Resolution Time</h3>
            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{teamAverages.avgResTime}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">First Contact Resolution</h3>
            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{teamAverages.avgFcr}%</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Tickets Resolved</h3>
            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">
              {agentPerformanceData.reduce((sum, agent) => sum + agent.ticketsResolved, 0)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Agent Performance Table */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Agent Performance</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets Resolved</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Resolution Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NPS Score</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Contact Resolution</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agentPerformanceData.map((agent) => {
                const performanceLevel = getPerformanceLevel(agent);
                return (
                  <tr 
                    key={agent.id} 
                    className={`hover:bg-gray-50 cursor-pointer ${selectedAgent === agent.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand-accent bg-opacity-10 flex items-center justify-center text-brand-accent font-medium">
                          {agent.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                          <div className="text-sm text-gray-500">{agent.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.ticketsResolved}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.averageResolutionTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${getNpsColor(agent.averageNps)}`}>{agent.averageNps}</span>
                        <span className="ml-1 text-sm text-gray-500">/ 10</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.firstContactResolution}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPerformanceLevelColor(performanceLevel)}`}>
                        {performanceLevel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recent Resolved Tickets with Metrics */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            {selectedAgent ? 
              `Tickets Resolved by ${agentPerformanceData.find(agent => agent.id === selectedAgent)?.name}` : 
              'Recently Resolved Tickets'
            }
          </h2>
          {selectedAgent && (
            <button 
              onClick={() => setSelectedAgent(null)}
              className="text-sm text-brand-accent hover:underline"
            >
              Show all tickets
            </button>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NPS Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-accent">
                    <Link to={`/ticket/${ticket.id}`}>{ticket.id}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.agentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.resolutionTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.npsScore !== null ? (
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${getNpsColor(ticket.npsScore)}`}>{ticket.npsScore}</span>
                        <span className="ml-1 text-sm text-gray-500">/ 10</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Performance Charts (simplified for this implementation) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resolution Time Trend</h3>
          <div className="h-64 flex items-center justify-center border-b border-gray-200 pb-4">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">In a real implementation, this would show a line chart of resolution time trends over time.</p>
            </div>
          </div>
          <div className="pt-4">
            <p className="text-sm text-gray-500">Resolution times have improved by 12% compared to last {timeRange}.</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">NPS Distribution</h3>
          <div className="h-64 flex items-center justify-center border-b border-gray-200 pb-4">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">In a real implementation, this would show a pie chart of NPS score distribution.</p>
            </div>
          </div>
          <div className="pt-4">
            <p className="text-sm text-gray-500">72% of customers rated our service as 9 or 10 out of 10.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitoringView;
