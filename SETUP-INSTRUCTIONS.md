# Website Setup Instructions

## Current Issue
The website requires Node.js to run the development server, but Node.js is not currently installed on your system.

## Quick Fix: View HTML Files Directly

You can open HTML files directly in your browser:
1. Navigate to the project folder
2. Double-click any `.html` file (e.g., `support-cause.html`, `index.html`)
3. The page will open in your default browser

**Note:** Some features won't work without a server:
- API calls (contact form, Stripe checkout)
- Shopping cart may have limited functionality
- Some JavaScript features may not work

## Full Setup: Install Node.js and Run Server

### Step 1: Install Node.js

1. Go to https://nodejs.org/
2. Download the **LTS (Long Term Support)** version for Windows
3. Run the installer
4. Follow the installation wizard (accept defaults)
5. **Restart your terminal/command prompt** after installation

### Step 2: Verify Installation

Open PowerShell or Command Prompt and run:
```powershell
node --version
npm --version
```

You should see version numbers (e.g., `v20.10.0` and `10.2.3`)

### Step 3: Install Dependencies

Navigate to your project folder and run:
```powershell
cd "c:\Users\DavidClower\iCloudDrive\Desert Cove Ventures, LLC\Dev\Cursor Website Test"
npm install
```

This will install all required packages (Express, Stripe, etc.)

### Step 4: Start the Server

```powershell
npm run dev
```

You should see:
```
Contact API server running on http://localhost:3000
```

### Step 5: Open the Website

Open your browser and go to:
- **Homepage**: http://localhost:3000
- **Support Page**: http://localhost:3000/support-cause.html

## Troubleshooting

### "node is not recognized"
- Node.js is not installed or not in your PATH
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

### "Port 3000 already in use"
- Another process is using port 3000
- Stop the other process or change the port in `server.js`

### "Cannot find module"
- Run `npm install` to install dependencies
- Make sure you're in the correct directory

### Shopping Cart Not Working
- Make sure the server is running (`npm run dev`)
- Check browser console (F12) for JavaScript errors
- Verify `shopping-cart.js` is loading correctly

## Alternative: Use a Simple HTTP Server

If you don't want to install Node.js, you can use Python's built-in server:

```powershell
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

**Note:** This won't support API endpoints (contact form, Stripe), but will serve static files.
