import React, { useState } from 'react';

interface Article {
  id: number;
  title: string;
  category: string;
  content: string;
  tags: string[];
  lastUpdated: string;
}

const KnowledgeBaseTools: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Mock data for knowledge base articles
  const knowledgeBaseArticles: Article[] = [
    {
      id: 1,
      title: 'Doorbell Camera Connectivity Troubleshooting',
      category: 'Connectivity',
      content: `
        <h3>Doorbell Camera Connectivity Issues</h3>
        <p>Follow these steps to solve common connectivity problems:</p>
        <ol>
          <li>Verify the WiFi signal strength at the doorbell location</li>
          <li>Ensure the doorbell is within range of your router (no more than 30 feet with walls)</li>
          <li>Check if the doorbell firmware is up-to-date via the app</li>
          <li>Restart your home router and wait 2 minutes</li>
          <li>Power cycle the doorbell by removing it from the mount for 30 seconds</li>
          <li>Reconnect the doorbell to WiFi using the app's setup process</li>
        </ol>
        <p>If issues persist, try resetting to factory settings or contact support for further assistance.</p>
      `,
      tags: ['doorbell', 'connectivity', 'wifi', 'troubleshooting'],
      lastUpdated: '2025-03-15'
    },
    {
      id: 2,
      title: 'Smart Thermostat Battery Replacement',
      category: 'Maintenance',
      content: `
        <h3>Replacing Batteries in Your Smart Thermostat</h3>
        <p>The Smart Thermostat uses 2 AA alkaline batteries that typically last 6-12 months.</p>
        <h4>Replacement Steps:</h4>
        <ol>
          <li>Pull the thermostat gently from the wall mount</li>
          <li>Remove the back cover to access the battery compartment</li>
          <li>Remove the old batteries and insert new AA alkaline batteries</li>
          <li>Ensure proper polarity (+/-) alignment</li>
          <li>Replace the back cover</li>
          <li>Attach the thermostat back to the wall mount</li>
        </ol>
        <p><strong>Note:</strong> After battery replacement, the thermostat may take up to 1 minute to reconnect to the system.</p>
      `,
      tags: ['thermostat', 'battery', 'maintenance'],
      lastUpdated: '2025-02-20'
    },
    {
      id: 3,
      title: 'Indoor Camera Privacy Settings',
      category: 'Privacy',
      content: `
        <h3>Managing Privacy Settings for Indoor Cameras</h3>
        <p>Your privacy is important. Here's how to manage your indoor camera settings:</p>
        <h4>Key Privacy Features:</h4>
        <ul>
          <li><strong>Privacy Mode:</strong> Physically covers the camera lens when activated</li>
          <li><strong>Scheduling:</strong> Set times when the camera automatically enters Privacy Mode</li>
          <li><strong>Geofencing:</strong> Camera can automatically turn on/off based on your location</li>
          <li><strong>Activity Zones:</strong> Define specific areas for motion detection</li>
          <li><strong>Two-Factor Authentication:</strong> Adds extra security to your account</li>
        </ul>
        <p>To access these settings, open the SmartHome app, select your camera, tap the gear icon, and select "Privacy Settings".</p>
      `,
      tags: ['camera', 'privacy', 'settings', 'security'],
      lastUpdated: '2025-03-30'
    },
    {
      id: 4,
      title: 'Account Billing Cycle Changes',
      category: 'Billing',
      content: `
        <h3>How to Change Your Billing Cycle</h3>
        <p>Customers can switch between monthly and annual billing cycles at any time.</p>
        <h4>To Change Your Billing Cycle:</h4>
        <ol>
          <li>Log in to your account at account.smarthome.com</li>
          <li>Navigate to "Billing & Payments"</li>
          <li>Select "Change Plan or Billing Cycle"</li>
          <li>Choose your preferred billing cycle (Monthly/Annual)</li>
          <li>Review the changes, including any prorated charges or credits</li>
          <li>Confirm your selection</li>
        </ol>
        <p><strong>Note:</strong> Annual billing includes a 15% discount compared to monthly billing.</p>
        <p>Changes take effect on your next billing date. If switching from monthly to annual, you'll be charged the annual rate minus any remaining days in your current monthly cycle.</p>
      `,
      tags: ['account', 'billing', 'payment', 'subscription'],
      lastUpdated: '2025-01-10'
    },
    {
      id: 5,
      title: 'Motion Sensor Setup and Placement',
      category: 'Installation',
      content: `
        <h3>Optimal Motion Sensor Setup and Placement</h3>
        <p>Proper placement is crucial for effective motion detection.</p>
        <h4>Recommended Placement Guidelines:</h4>
        <ul>
          <li>Install 6-8 feet above the floor</li>
          <li>Place in corners for maximum room coverage</li>
          <li>Avoid direct sunlight and heating/cooling vents</li>
          <li>Keep away from curtains or items that move with air currents</li>
          <li>For hallways, place at the end for lengthwise coverage</li>
        </ul>
        <h4>Setup Process:</h4>
        <ol>
          <li>Insert the battery (CR123A)</li>
          <li>Follow the app's pairing instructions</li>
          <li>Mount the sensor bracket using provided screws or adhesive</li>
          <li>Attach the sensor to the bracket</li>
          <li>Test the motion detection using the app's test mode</li>
        </ol>
        <p>For pet-friendly homes, use the pet immunity setting and adjust the sensor height appropriately.</p>
      `,
      tags: ['sensor', 'motion', 'installation', 'setup'],
      lastUpdated: '2025-02-05'
    }
  ];
  
  // Categories for filtering
  const categories = ['all', 'Connectivity', 'Maintenance', 'Privacy', 'Billing', 'Installation'];
  
  // Filter articles based on search and category
  const filteredArticles = knowledgeBaseArticles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-brand-accent text-white px-4 py-3">
        <h2 className="text-lg font-semibold">Knowledge Base</h2>
      </div>
      
      {/* Search and Filters */}
      <div className="p-4 border-b">
        <div className="flex flex-col space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search knowledge base..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedCategory === category 
                    ? 'bg-brand-accent text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex h-[500px]">
        {/* Article List */}
        <div className="w-1/3 border-r overflow-y-auto">
          {filteredArticles.length > 0 ? (
            <ul className="divide-y">
              {filteredArticles.map(article => (
                <li 
                  key={article.id}
                  className={`p-3 cursor-pointer hover:bg-gray-50 ${
                    selectedArticle?.id === article.id ? 'bg-blue-50 border-l-4 border-brand-accent' : ''
                  }`}
                  onClick={() => handleArticleSelect(article)}
                >
                  <h3 className="font-medium text-sm">{article.title}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600 mr-2">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      Updated: {article.lastUpdated}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No articles found matching your search.
            </div>
          )}
        </div>
        
        {/* Article Content */}
        <div className="w-2/3 p-4 overflow-y-auto">
          {selectedArticle ? (
            <div>
              <h2 className="text-xl font-bold mb-2">{selectedArticle.title}</h2>
              <div className="flex items-center mb-4">
                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600 mr-2">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-gray-500">
                  Last updated: {selectedArticle.lastUpdated}
                </span>
              </div>
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex flex-wrap gap-1">
                  {selectedArticle.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                      onClick={() => setSearchQuery(tag)}
                      style={{ cursor: 'pointer' }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between mt-4">
                  <button className="text-sm text-brand-accent hover:underline">Copy to Clipboard</button>
                  <button className="text-sm text-brand-accent hover:underline">Share with Customer</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p>Select an article to view its content</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Actions Footer */}
      <div className="p-3 bg-gray-50 border-t flex justify-between items-center">
        <div>
          <span className="text-xs text-gray-500">Articles available: {knowledgeBaseArticles.length}</span>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
            Suggest Article
          </button>
          <button className="px-3 py-1 text-xs bg-brand-accent text-white rounded hover:bg-opacity-90">
            Create New Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseTools;
