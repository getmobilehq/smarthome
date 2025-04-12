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
  { id: 'kb-036', title: 'General Tips for Third-Party Device Connectivity', content: 'Ensure device firmware is updated, check manufacturer\'s app first, verify Wi-Fi compatibility (2.4GHz vs 5GHz)...' },
  // Added Home Automation / Routine Articles (Req #22)
  { id: 'kb-037', title: 'How to Create Google Home Routines', content: 'Open Google Home app > Automations > Add (+). Choose starters (voice, time, sunrise/sunset, device state) and actions (adjust devices, play media, get info)...' },
  { id: 'kb-038', title: 'Troubleshooting Routine Triggers (Time, Voice, etc.)', content: 'Verify trigger conditions are met. Check voice command phrasing. Ensure device triggering routine is online...' },
  { id: 'kb-039', title: 'Troubleshooting Routine Actions (Devices Not Responding)', content: 'Ensure all devices included in the routine\'s actions are online and correctly linked to Google Home. Test device control individually...' },
  { id: 'kb-040', title: 'Using Household Routines vs Personal Routines', content: 'Household routines run for anyone in the home. Personal routines run only when triggered by your voice/account...' },
  // Added Difficult Customer Handling Guide (Req #24)
  { id: 'kb-041', title: 'Tips for Handling Difficult Customer Interactions', content: '- Stay Calm: Manage your own emotions first. Breathe deeply. \n- Active Listening: Let the customer vent. Acknowledge their frustration (e.g., \"I understand this is frustrating\"). \n- Empathize: Show you understand their perspective (e.g., \"I can see why you\'d be upset\"). \n- Don\'t Take it Personally: Focus on the issue, not the emotion. \n- Apologize Sincerely (if appropriate): Apologize for the inconvenience or experience. \n- Focus on Solutions: Shift the conversation towards resolution. What can be done now? \n- Set Boundaries: Don\'t tolerate abuse. Follow escalation procedures if needed. \n- Know When to Escalate: If you cannot resolve the issue or the customer remains overly aggressive, follow the process to escalate to a supervisor or specialist.' },
  // Added Firmware Update Guides (Req #25)
  { id: 'kb-042', title: 'Checking for Device Firmware Updates', content: 'Most devices update automatically. To check manually: \n1. Open the manufacturer\'s app (e.g., Philips Hue, Nest). Look in device settings or about section. \n2. For Google/Nest devices, open Google Home app > Select Device > Settings (gear icon) > Device Information. Firmware version is listed. Check manufacturer website for latest version notes.' },
  { id: 'kb-043', title: 'Troubleshooting Failed Firmware Updates', content: '1. Ensure device has stable Wi-Fi connection. \n2. Ensure device is adequately powered (plugged in or sufficient battery). \n3. Restart the device and the Wi-Fi router. \n4. Temporarily move device closer to the router. \n5. Check manufacturer\'s status page for outages. \n6. If possible, try initiating update from manufacturer\'s app instead of Google Home. \n7. As a last resort, consider a factory reset (warn customer about data loss).' },
  // Added Hub Setup & Compatibility Guides (Req #26)
  { id: 'kb-044', title: 'Setting Up Your Google Nest Hub', content: '1. Plug in the Nest Hub. \n2. On your phone/tablet, open the Google Home app. \n3. Tap Add (+) > Set up device > New device. \n4. Choose the home, wait for app to find the Hub. \n5. Confirm code shown on Hub matches app. \n6. Follow prompts for Wi-Fi, Google Assistant setup, and linking services.' },
  { id: 'kb-045', title: 'General Smart Home Hub Setup Tips', content: '1. Placement: Place hub centrally, away from interference (microwaves, thick walls). \n2. Network: Ensure strong Wi-Fi signal. Use 2.4GHz band for broader compatibility if needed. \n3. Updates: Allow hub to update firmware fully after initial setup. \n4. Accounts: Use the correct account (Google, Amazon, Apple) consistently for setup and device linking.' },
  { id: 'kb-046', title: 'Smart Hub Device Compatibility Basics', content: '1. Check Protocols: Ensure device uses protocols supported by the hub (Wi-Fi, Zigbee, Z-Wave, Thread, Matter). \n2. Check Hub Specs: Refer to the hub\'s official compatibility list (e.g., Google Home\'s Works with Google Assistant page). \n3. Check Device Specs: Look for \'Works with Google Home / Alexa / Apple HomeKit\' badges on device packaging or website. \n4. Matter Protocol: Devices supporting Matter should work across compatible Matter hubs/controllers, simplifying compatibility.' },
  // Added Multi-Device Setup Guides (Req #29)
  { id: 'kb-047', title: 'Setting Up Multiple Smart Home Devices', content: '1. One at a Time: Add devices individually to avoid confusion. \n2. Naming Convention: Use clear, distinct names (e.g., \'Living Room Lamp\', \'Bedroom Ceiling Fan\'). Avoid similar names. \n3. Room Assignment: Assign each device to the correct room in the app (Google Home, Alexa, etc.) for easier control. \n4. Network Load: Consider Wi-Fi router capacity if adding many Wi-Fi devices. A mesh network or hub (Zigbee/Z-Wave) can help. \n5. Test Each Device: Verify basic functionality after adding each device before moving to the next.' },
  { id: 'kb-048', title: 'Troubleshooting Multi-Device Setups and Groups', content: '1. Individual Control: Check if you can control each device individually. If not, troubleshoot that device first. \n2. Group/Scene Commands: Ensure you\'re using the exact group/scene name recognized by the assistant. \n3. Device Response: If some devices in a group respond but others don\'t, check connectivity/power of the non-responsive ones. \n4. Network Interference: Too many Wi-Fi devices can cause issues. Check router settings or consider Zigbee/Z-Wave devices. \n5. App/Hub Updates: Ensure the control app (Google Home) and any relevant hubs are up-to-date. \n6. Recreate Group/Scene: As a last resort, delete and recreate the group or scene.' },
  { id: 'kb-049', title: 'Tips for Grouping Devices and Creating Scenes', content: '1. Logical Groups: Group devices by room (e.g., \"Kitchen Lights\") or function (e.g., \"Downstairs Thermostats\"). \n2. Clear Naming: Use intuitive names for groups and scenes (e.g., \"Movie Time\", \"Good Morning\"). \n3. Scene vs. Routine: Scenes typically set devices to specific states (lights dim, thermostat to 20C). Routines can include sequences, delays, and non-device actions (play news). Use scenes within routines for complex actions. \n4. Avoid Overlap: Don\'t put the exact same devices in multiple groups if it causes confusion. \n5. Test Thoroughly: Activate groups/scenes to ensure all devices respond as expected.' },
  // Added Cross-Platform Guides (Req #30)
  { id: 'kb-050', title: 'Linking Third-Party Services (Spotify, Hue, etc.) to Google Home', content: '1. Open Google Home App: Go to Settings > Works with Google. \n2. Search for Service: Find the service (e.g., Philips Hue, Spotify, TP-Link Kasa). \n3. Link Account: Follow prompts to sign in to your account for that service and authorize Google. \n4. Device Sync: Google Home should sync devices associated with the linked account. \n5. Note: Similar processes exist in Amazon Alexa (Skills) and Apple HomeKit (App integrations).' },
  { id: 'kb-051', title: 'Troubleshooting Cross-Platform Integration Issues', content: '1. Unlink/Relink: The most common fix is to unlink the service in the Google Home/Alexa/HomeKit app and then link it again. \n2. Check Account: Ensure you are linking the *exact* same third-party account (correct email/username). \n3. Check Permissions: Verify that required permissions were granted during the linking process. \n4. App/Firmware Updates: Make sure both the hub app (Google Home) and the third-party device/app firmware are up-to-date. \n5. Service Outages: Check the status page for the third-party service for any known issues. \n6. Naming Conflicts: Avoid identical device names across platforms if possible.' },
  { id: 'kb-052', title: 'Managing Devices Across Google Home, Alexa, and HomeKit (Basic Concepts)', content: '1. Hub/Controller: Each platform (Google, Amazon, Apple) acts as a controller. Devices connect to one or more controllers. \n2. Compatibility: Devices must be compatible with the specific platform (look for \"Works with...\" badges). \n3. Matter Standard: Matter aims to simplify cross-platform compatibility. Matter-certified devices should work with any Matter-compatible controller. \n4. Linking vs. Direct Connection: Some devices connect directly to Wi-Fi and link via cloud (e.g., smart plugs). Others connect via a hub (e.g., Zigbee bulbs) which then links to the platform. \n5. Multiple Controls: It\'s possible to control the same device (e.g., Hue lights) from Google Home, Alexa, and HomeKit simultaneously if linked to all three.' },
  // Added Communication Tips (Req #33)
  { id: 'kb-053', title: 'Communication Tips for Troubleshooting', content: '1. Simplify Jargon: Instead of \"power cycle the router\", say \"unplug your Wi-Fi router, wait 30 seconds, and plug it back in\". Instead of \"SSID\", say \"Wi-Fi network name\". \n2. Use Analogies: Compare complex ideas to familiar concepts if helpful. \n3. Check Understanding: Ask clarifying questions like \"Does that make sense?\" or \"What do you see on your screen now?\" \n4. One Step at a Time: Guide the customer through one clear instruction before moving to the next. \n5. Confirm Actions: Ask the customer to confirm they have completed the step. \n6. Be Patient: Troubleshooting can be frustrating. Reassure the customer and maintain a calm tone. Refer to KB-041 for handling difficult interactions.' },
  // Added Escalation Protocol Guide (Req #34) / Refined for Req #35
  { id: 'kb-054', title: 'Escalation Process & Consulting Experts', content: 'When to Escalate or Consult Experts: \n- You have exhausted all relevant Troubleshooting Guides and KB articles. \n- The issue requires specialized knowledge you do not possess (e.g., advanced networking, suspected hardware fault needing RMA). *Consider consulting internal expert resources/network if available before formal escalation.* \n- The customer remains highly dissatisfied despite your best efforts (refer to KB-041). \n- The issue involves account security, billing, or sensitive data beyond standard support scope. \nHow to Escalate: \n1. Inform the Customer: Politely explain that you need to consult an expert or transfer them to a specialized team/supervisor better equipped to handle their specific issue. \n2. Document Thoroughly: Ensure the ticket details all troubleshooting steps already taken, the customer\'s issue description, and the reason for consultation/escalation. \n3. Use Escalation Tool/Process: Follow the standard procedure in the ticketing system to escalate (e.g., select escalation queue/reason, add notes) or consult (if a separate mechanism exists). \n4. Provide Context: Briefly summarize the situation for the receiving agent/expert/team.' }
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
