import React, { useState } from 'react';

// Mock Data (replace with API call later)
const mockArticles = [
  { id: 'kb-001', title: 'How to reset your Google Smart Bulb', content: 'Turn the bulb off and on 5 times rapidly...' },
  { id: 'kb-002', title: 'Troubleshooting Wi-Fi Connection Issues', content: 'Check router placement, restart modem and router...' },
  { id: 'kb-003', title: 'Pairing Google Smart Lock with Hub', content: 'Ensure Bluetooth is enabled, put hub in pairing mode...' },
  { id: 'kb-004', title: 'Google Camera Offline: Common Causes', content: 'Power outage, weak Wi-Fi signal, firmware update needed...' },
  { id: 'kb-005', title: 'Adjusting Google Motion Sensor Sensitivity', content: 'Use the Google Home app settings to reduce sensitivity...' },
  // Added Cross-Platform Articles
  { id: 'kb-006', title: 'Connecting Google Nest Hub to Amazon Alexa', content: 'Enable the Google Nest skill in the Alexa app... Detailed steps: ...' },
  { id: 'kb-007', title: 'Using Google Devices with Apple HomeKit (via Bridge)', content: 'A Homebridge or similar bridge is required... Setup guide: ...' },
  { id: 'kb-008', title: 'Troubleshooting Zigbee device connection on Google Hub', content: 'Ensure Zigbee device is in pairing mode, check range, look for interference...' },
  { id: 'kb-009', title: 'Compatibility Check: Philips Hue with Google Home', content: 'Philips Hue bulbs are directly compatible. Link your Hue account in the Google Home app...' },
  // Added Energy/Security Articles
  { id: 'kb-010', title: 'Energy Saving Tips for Smart Thermostats', content: 'Set schedules, use eco mode, check insulation...' },
  { id: 'kb-011', title: 'Securing Your Smart Home Network', content: 'Use strong Wi-Fi passwords, enable WPA3, segment network with VLANs...' },
  { id: 'kb-012', title: 'Optimizing Smart Plug Usage for Energy Efficiency', content: 'Identify phantom loads, schedule devices off, monitor usage...' },
  { id: 'kb-013', title: 'Best Practices for Smart Camera Security', content: 'Use two-factor authentication, update firmware regularly, place cameras securely...' },
  // Added Product Benefit/Explanation Articles
  { id: 'kb-014', title: 'Explaining Benefits: Google Nest Hub vs. Smart Speaker', content: 'Visual display advantages, video calls, smart home control panel... Script: "A Nest Hub offers everything a smart speaker does, plus a screen..."' },
  { id: 'kb-015', title: 'Feature Script: Google Assistant Routines', content: 'Explain routines for automating multiple actions with one command (e.g., "Good Morning" routine)... Script: "Routines let you trigger several smart home actions at once..."' },
  { id: 'kb-016', title: 'Comparison: Google Nest Thermostat vs. Learning Thermostat', content: 'Learning Thermostat adapts automatically, standard Nest requires manual schedules... Cost difference...' },
  // Added Google Assistant Articles
  { id: 'kb-017', title: 'Setting Up Google Assistant on Your Phone', content: 'Download the Google App, sign in, enable Assistant in settings...' },
  { id: 'kb-018', title: 'Linking Third-Party Devices (e.g., Philips Hue) to Google Assistant', content: 'Open Google Home app > Settings > Works with Google > Find Philips Hue > Link Account...' },
  { id: 'kb-019', title: 'Troubleshooting: Google Assistant Not Responding', content: 'Check microphone mute switch, ensure Wi-Fi connection, restart device, check app permissions...' },
  { id: 'kb-020', title: 'Creating Custom Google Assistant Routines', content: 'Go to Google Home app > Routines > + Add a routine > Define starter and actions...' },
  // Added Firmware/Software Update Articles
  { id: 'kb-021', title: 'How to Check for Firmware Updates (Google Nest Devices)', content: 'Updates usually happen automatically. Check device settings in Google Home app for current version...' },
  { id: 'kb-022', title: 'Troubleshooting Failed Firmware Updates', content: 'Ensure stable Wi-Fi, restart device and router, check for sufficient power, factory reset as last resort...' },
  { id: 'kb-023', title: 'Understanding Automatic Software Updates', content: 'Explain how updates roll out, typical timeframe, and why they are important for security and features...' },
  { id: 'kb-024', title: 'Firmware Rollback Procedures (Limited Availability)', content: 'Rollbacks are typically not user-accessible. Escalate to Tier 2 support if a rollback is suspected necessary...' },
  // Added More Security Articles
  { id: 'kb-025', title: 'Common Smart Home Security Risks', content: 'Weak passwords, unsecured Wi-Fi, outdated firmware, phishing attacks, physical access...' },
  { id: 'kb-026', title: 'Mitigating Risks: Network Segmentation for IoT', content: 'Create a separate VLAN or guest network for smart home devices to isolate them from primary computers/phones...' },
  { id: 'kb-027', title: 'Identifying Phishing Scams Targeting Smart Home Users', content: 'Look for suspicious emails/messages asking for login credentials, urgent warnings about account security...' },
  { id: 'kb-028', title: 'Physical Security for Smart Devices', content: 'Secure cameras from theft/tampering, protect smart locks from physical bypass...' },
  // Added Warranty/Return Policy Articles
  { id: 'kb-029', title: 'How to Check Google Device Warranty Status', content: 'Guide customers to the Google Store order history or device support page. Provide warranty check link...' },
  { id: 'kb-030', title: 'Standard Return Policy (15-Day Window)', content: 'Explain the standard 15-day return window for most devices purchased from Google Store. Conditions apply...' },
  { id: 'kb-031', title: 'Processing a Return or Warranty Claim', content: 'Steps to initiate a return/claim via Google Store support. Required information: order number, serial number...' },
  { id: 'kb-032', title: 'Extended Warranty / Preferred Care Information', content: 'Details on availability and coverage of Preferred Care plans for eligible devices.' },
  // Added Third-Party Device Articles
  { id: 'kb-033', title: 'Troubleshooting Philips Hue Bulbs Not Responding in Google Home', content: 'Check Hue Bridge connection, ensure bulbs powered on, relink Hue account in Google Home app...' },
  { id: 'kb-034', title: 'Integrating Ring Doorbell with Google Assistant', content: 'Requires enabling the Ring skill/action. Note: Live view may not be available on all Google displays...' },
  { id: 'kb-035', title: 'Connecting Ecobee Thermostat to Google Home', content: 'Link Ecobee account via "Works with Google". Check compatibility for specific voice commands...' },
  { id: 'kb-036', title: 'General Tips for Third-Party Device Connectivity', content: 'Ensure device firmware is updated, check manufacturer\'s app first, verify Wi-Fi compatibility (2.4GHz vs 5GHz)...' }
];

interface Article {
  id: string;
  title: string;
  content: string;
}

const KnowledgeBase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(mockArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredArticles(mockArticles); // Show all if search is empty
    } else {
      const lowerCaseTerm = term.toLowerCase();
      const filtered = mockArticles.filter(article => 
        article.title.toLowerCase().includes(lowerCaseTerm) ||
        article.content.toLowerCase().includes(lowerCaseTerm) // Optional: search content too
      );
      setFilteredArticles(filtered);
    }
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleBackClick = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Knowledge Base</h2>

      {selectedArticle ? (
        // Detail View
        <div className="flex-grow flex flex-col">
          <button 
            onClick={handleBackClick} 
            className="flex items-center text-brand-accent hover:underline mb-3 self-start"
          >
             <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to search
          </button>
          <h3 className="text-lg font-semibold mb-3">{selectedArticle.title}</h3>
          <div className="overflow-y-auto flex-grow">
             <p className="text-gray-700 whitespace-pre-wrap">{selectedArticle.content}</p>
          </div>
        </div>
      ) : (
        // Search/List View
        <div className="flex-grow flex flex-col">
          {/* Search bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search articles, guides, FAQs..."
              className="w-full p-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {/* Results/content */}
          <div className="overflow-y-auto flex-grow">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <article key={article.id} className="mb-2 p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer" onClick={() => handleArticleClick(article)}>
                  <h3 className="font-medium text-brand-accent">{article.title}</h3>
                  {/* Optionally show snippet or full content on click */}
                  {/* <p className="text-sm text-gray-600 mt-1">{article.content.substring(0, 100)}...</p> */}
                </article>
              ))
            ) : (
              <p className="text-gray-500">No articles found matching "{searchTerm}".</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;
