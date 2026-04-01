/**
 * Load Speakers Script
 * 
 * This script loads the 6 conference speakers from data/registrations.json
 * into the browser's localStorage so they appear in the admin dashboard.
 * 
 * HOW TO USE:
 * 1. Open your website in a browser
 * 2. Open the browser's Developer Console (F12 or right-click > Inspect > Console)
 * 3. Copy and paste this entire script into the console
 * 4. Press Enter to run it
 * 5. Refresh the page to see the speakers in the admin dashboard
 */

(async function loadSpeakers() {
  console.log('🎤 Loading speakers from server...');
  
  try {
    // Fetch speakers from the API
    const response = await fetch('/api/registrations');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    
    const { data } = await response.json();
    
    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid data format received from server');
    }
    
    // Filter for speakers only
    const speakers = data.filter(reg => reg.registrationType === 'speaker');
    
    console.log(`✅ Found ${speakers.length} speakers on server`);
    
    // Get existing registrations from localStorage
    const existingData = localStorage.getItem('conference-registrations');
    let existingRegistrations = [];
    
    if (existingData) {
      try {
        const parsed = JSON.parse(existingData);
        existingRegistrations = parsed.state?.registrations || [];
        console.log(`📋 Found ${existingRegistrations.length} existing registrations in localStorage`);
      } catch (e) {
        console.warn('Could not parse existing localStorage data');
      }
    }
    
    // Create a Set of existing IDs to avoid duplicates
    const existingIds = new Set(existingRegistrations.map(r => r.id));
    
    // Add speakers that don't already exist
    let addedCount = 0;
    speakers.forEach(speaker => {
      if (!existingIds.has(speaker.id)) {
        existingRegistrations.push(speaker);
        addedCount++;
        console.log(`  ➕ Added: ${speaker.fname} ${speaker.lname} (${speaker.jobtitle})`);
      } else {
        console.log(`  ⏭️  Skipped: ${speaker.fname} ${speaker.lname} (already exists)`);
      }
    });
    
    // Save back to localStorage in Zustand format
    const zustandData = {
      state: {
        registrations: existingRegistrations
      },
      version: 0
    };
    
    localStorage.setItem('conference-registrations', JSON.stringify(zustandData));
    
    console.log('');
    console.log('✨ COMPLETE!');
    console.log(`📊 Total speakers loaded: ${addedCount}`);
    console.log(`📊 Total registrations: ${existingRegistrations.length}`);
    console.log('');
    console.log('🔄 Please refresh the page to see the speakers in the admin dashboard');
    
  } catch (error) {
    console.error('❌ Error loading speakers:', error);
    console.error('');
    console.error('Troubleshooting:');
    console.error('1. Make sure you are on the conference website');
    console.error('2. Check that /api/registrations endpoint is working');
    console.error('3. Verify data/registrations.json file exists and contains speakers');
  }
})();
