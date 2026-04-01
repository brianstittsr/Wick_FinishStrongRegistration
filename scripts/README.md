# Load Speakers Script

This script loads the 6 conference speakers from `data/registrations.json` into the browser's localStorage so they appear in the admin dashboard.

## The 6 Speakers

1. **Monique Barbour, M.D., MHA** - Visual Health Specialist
2. **Christopher Griffin, M.D.** - Pediatric Care Specialist
3. **Mack Roach III, M.D., Ph.D., FASTRO** - Male Health Specialist
4. **George Saunders, M.D.** - Geriatric Health Specialist
5. **Ericka Griffin, M.D.** - Women's Health Specialist
6. **Timothy Summers, Ph.D., VP, CIO** - Technology & Global Health Policy

## How to Use

### Method 1: Browser Console (Recommended)

1. **Open your conference website** in a browser
2. **Open Developer Console**:
   - Press `F12`, or
   - Right-click anywhere > "Inspect" > "Console" tab
3. **Copy the entire script** from `load-speakers.js`
4. **Paste into the console** and press Enter
5. **Refresh the page** to see the speakers

### Method 2: Admin Dashboard Button

1. Log into the admin dashboard
2. Go to the **"Speakers"** tab (Speaker Management)
3. Click the **"Reload Speakers"** button
4. Speakers will load automatically from the server

## What the Script Does

1. Fetches speaker data from `/api/registrations` endpoint
2. Filters for `registrationType === 'speaker'`
3. Checks for existing registrations in localStorage
4. Adds only speakers that don't already exist (prevents duplicates)
5. Saves to localStorage in Zustand format
6. Shows detailed console output of what was loaded

## Console Output Example

```
🎤 Loading speakers from server...
✅ Found 6 speakers on server
📋 Found 0 existing registrations in localStorage
  ➕ Added: Monique Barbour (M.D., MHA - Visual Health Specialist)
  ➕ Added: Christopher Griffin (M.D. - Pediatric Care Specialist)
  ➕ Added: Mack Roach III (M.D., Ph.D., FASTRO - Male Health Specialist)
  ➕ Added: George Saunders (M.D. - Geriatric Health Specialist)
  ➕ Added: Ericka Griffin (M.D. - Women's Health Specialist)
  ➕ Added: Timothy Summers (Ph.D., VP, CIO - Technology & Global Health Policy)

✨ COMPLETE!
📊 Total speakers loaded: 6
📊 Total registrations: 6

🔄 Please refresh the page to see the speakers in the admin dashboard
```

## Troubleshooting

### Script shows "Failed to fetch"
- Make sure you're on the actual conference website (not a local file)
- Check that the development server is running
- Verify `/api/registrations` endpoint is accessible

### Speakers show as "already exists"
- This is normal if speakers were previously loaded
- The script prevents duplicates automatically
- No action needed

### Speakers don't appear after refresh
- Check browser console for errors
- Try clearing localStorage and running script again:
  ```javascript
  localStorage.clear();
  // Then run load-speakers.js again
  ```

### Need to reload speakers
- Run the script again (it's safe to run multiple times)
- Or use the "Reload Speakers" button in the admin dashboard

## Technical Details

- **Storage**: Browser localStorage (key: `conference-registrations`)
- **Format**: Zustand store format with state wrapper
- **Duplicate Prevention**: Checks registration IDs before adding
- **Data Source**: `data/registrations.json` via `/api/registrations` endpoint
- **Persistence**: Data persists across page refreshes until localStorage is cleared
