# Troubleshooting 404 Errors

## If you're getting 404 errors, check these:

### 1. **Local Development (http://localhost:8000)**
   - Make sure you're running a web server (NOT opening files directly with `file://`)
   - Start the server: `python -m http.server 8000` or `npm run dev`
   - Access: `http://localhost:8000/support-cause.html`

### 2. **Vercel Deployment**
   - Go to your Vercel dashboard
   - Check the latest deployment logs
   - Make sure `support-cause.html` is in the deployment
   - If needed, trigger a new deployment:
     - Go to Project → Deployments
     - Click "Redeploy" on the latest deployment
   - Or push a new commit to trigger auto-deployment

### 3. **File Verification**
   - Check GitHub: https://github.com/davidclower/SiciliaBedda
   - Verify `support-cause.html` exists in the repository
   - If missing, restore from backup: `support-cause 37.html` (or latest)

### 4. **Common Issues**
   - **iCloud sync delay**: Files in iCloudDrive may take time to sync
   - **Case sensitivity**: Make sure links use exact case: `support-cause.html` (lowercase)
   - **Server not running**: Local development requires a web server
   - **Cache**: Clear browser cache and hard refresh (Ctrl+F5)

### 5. **Quick Fix**
   If `support-cause.html` is missing locally:
   ```powershell
   Copy-Item "support-cause 37.html" "support-cause.html" -Force
   ```

### 6. **Verify Links**
   All navigation links should point to: `support-cause.html` (not `support-cause 37.html`)

## Current Status
- ✅ File is committed to GitHub
- ✅ File exists in repository (commit: 84abe00)
- ✅ All 176 files are pushed

If still having issues, check:
1. Are you accessing locally or on Vercel?
2. What exact URL shows the 404?
3. What does the browser console show?
