# Fixing Website Links Issue

## Problem
Links aren't working correctly when opening HTML files directly in the browser.

## Root Cause
When you open HTML files directly (double-clicking them), browsers use the `file://` protocol which has security restrictions:
- Relative links may not work correctly
- JavaScript may have CORS issues
- Some features require a web server

## Solution: Use a Web Server

### Option 1: Install Node.js (Recommended)

1. **Install Node.js** from https://nodejs.org/ (LTS version)
2. **Install dependencies:**
   ```powershell
   cd "c:\Users\DavidClower\iCloudDrive\Desert Cove Ventures, LLC\Dev\Cursor Website Test"
   npm install
   ```
3. **Start the server:**
   ```powershell
   npm run dev
   ```
4. **Open in browser:**
   - Homepage: http://localhost:3000
   - Support page: http://localhost:3000/support-cause.html

### Option 2: Use Python's Built-in Server

If Python is installed:
```powershell
cd "c:\Users\DavidClower\iCloudDrive\Desert Cove Ventures, LLC\Dev\Cursor Website Test"
python -m http.server 8000
```

Then open: http://localhost:8000

**Note:** Python server won't support API endpoints (contact form, Stripe), but will serve static files correctly.

### Option 3: Use VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Files Created/Fixed

✅ Created `index.html` (from `index 2.html`)
✅ Created `support-cause.html` (from `support-cause 20.html`)
✅ Created `translations(1).js` (from `translations(1) 43.js`)

All navigation links now point to existing files:
- index.html ✓
- about.html ✓
- contact.html ✓
- sicily.html ✓
- parco-madonie.html ✓
- isnello.html ✓
- collesano.html ✓
- castelbuono.html ✓
- current-restoration 12.html ✓
- support-cause.html ✓

## Testing Links

Once the server is running, test these links:
1. Home → Should go to index.html
2. About dropdown → All sub-pages should work
3. Current Restorations → Should go to current-restoration 12.html
4. Support Our Cause → Should go to support-cause.html
5. Contact Us → Should go to contact.html

## If Links Still Don't Work

1. **Check browser console** (F12) for JavaScript errors
2. **Verify server is running** - you should see "Server running on http://localhost:3000"
3. **Check file paths** - make sure all files are in the same directory
4. **Clear browser cache** - sometimes cached files cause issues
