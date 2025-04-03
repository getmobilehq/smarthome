import React, { useState } from 'react';

const ReportsView = () => {
  const [activeTab, setActiveTab] = useState('performance');
  
  // Helper functions to render chart/graph placeholders
  const renderPerformanceMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Average Resolution Time</h3>
        <div className="text-3xl font-bold text-brand-accent">4h 12m</div>
        <div className="text-sm text-green-600 mt-1 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          12% from last week
        </div>
        <div className="mt-4 h-24 bg-gray-100 rounded flex items-center justify-center">
          [Line chart placeholder]
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Tickets Resolved</h3>
        <div className="text-3xl font-bold text-brand-accent">156</div>
        <div className="text-sm text-green-600 mt-1 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          8% from last week
        </div>
        <div className="mt-4 h-24 bg-gray-100 rounded flex items-center justify-center">
          [Bar chart placeholder]
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Satisfaction</h3>
        <div className="text-3xl font-bold text-brand-accent">94%</div>
        <div className="text-sm text-red-600 mt-1 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          2% from last week
        </div>
        <div className="mt-4 h-24 bg-gray-100 rounded flex items-center justify-center">
          [Gauge chart placeholder]
        </div>
      </div>
    </div>
  );
  
  const renderTicketAnalytics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Tickets by Category</h3>
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          [Pie chart placeholder]
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm">Installation: 32%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Connectivity: 28%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm">Hardware: 24%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm">Software: 16%</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Tickets by Device Type</h3>
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          [Horizontal bar chart placeholder]
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Security Cameras</span>
            <span className="text-sm font-medium">34%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Smart Locks</span>
            <span className="text-sm font-medium">22%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Sensors</span>
            <span className="text-sm font-medium">18%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Hubs</span>
            <span className="text-sm font-medium">16%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Others</span>
            <span className="text-sm font-medium">10%</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderAgentStats = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Agent Performance</h3>
      </div>
      <div className="p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets Resolved</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Resolution Time</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Rating</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8">
                    <img className="h-8 w-8 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Sam Batman</div>
                    <div className="text-xs text-gray-500">Lead Support Agent</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">45</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">3h 25m</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm text-gray-900">4.9/5.0</div>
                  <div className="ml-1 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className={`h-4 w-4 ${star <= 4 ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '93%' }}></div>
                </div>
                <span className="text-xs text-gray-500">93%</span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8">
                    <img className="h-8 w-8 rounded-full" src="https://randomuser.me/api/portraits/women/44.jpg" alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Jessica Parker</div>
                    <div className="text-xs text-gray-500">Support Agent</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">38</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">4h 10m</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm text-gray-900">4.7/5.0</div>
                  <div className="ml-1 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className={`h-4 w-4 ${star <= 4 ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <span className="text-xs text-gray-500">87%</span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8">
                    <img className="h-8 w-8 rounded-full" src="https://randomuser.me/api/portraits/men/75.jpg" alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Marcus Johnson</div>
                    <div className="text-xs text-gray-500">Support Agent</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">32</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">5h 05m</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm text-gray-900">4.5/5.0</div>
                  <div className="ml-1 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className={`h-4 w-4 ${star <= 4 ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <span className="text-xs text-gray-500">78%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        
        <div className="flex space-x-2">
          <select className="bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-accent">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Custom Range</option>
          </select>
          
          <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export
          </button>
        </div>
      </div>
      
      {/* Report tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab('performance')}
            className={`py-4 px-6 focus:outline-none ${activeTab === 'performance' ? 'border-b-2 border-brand-accent font-medium text-brand-accent' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Performance Metrics
          </button>
          <button 
            onClick={() => setActiveTab('tickets')}
            className={`py-4 px-6 focus:outline-none ${activeTab === 'tickets' ? 'border-b-2 border-brand-accent font-medium text-brand-accent' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Ticket Analytics
          </button>
          <button 
            onClick={() => setActiveTab('agents')}
            className={`py-4 px-6 focus:outline-none ${activeTab === 'agents' ? 'border-b-2 border-brand-accent font-medium text-brand-accent' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Agent Stats
          </button>
        </div>
      </div>
      
      {/* Report content based on active tab */}
      <div className="pb-6">
        {activeTab === 'performance' && renderPerformanceMetrics()}
        {activeTab === 'tickets' && renderTicketAnalytics()}
        {activeTab === 'agents' && renderAgentStats()}
      </div>
      
      {/* Recent activity section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="flow-root">
            <ul className="-mb-8">
              <li>
                <div className="relative pb-8">
                  <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-white">
                        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Report Generated</div>
                        <p className="mt-0.5 text-sm text-gray-500">Monthly Performance Report</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>Generated by Sam Batman</p>
                      </div>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <time dateTime="2025-04-02T01:30:00">1 hour ago</time>
                    </div>
                  </div>
                </div>
              </li>
              
              <li>
                <div className="relative pb-8">
                  <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-white">
                        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Target Reached</div>
                        <p className="mt-0.5 text-sm text-gray-500">Customer Satisfaction Target</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>Reached 90% customer satisfaction goal</p>
                      </div>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <time dateTime="2025-04-01T14:00:00">Yesterday</time>
                    </div>
                  </div>
                </div>
              </li>
              
              <li>
                <div className="relative">
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-white">
                        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Weekly Report Email</div>
                        <p className="mt-0.5 text-sm text-gray-500">Sent to Management</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>Weekly performance report emailed to management team</p>
                      </div>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <time dateTime="2025-04-01T09:00:00">Yesterday</time>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
