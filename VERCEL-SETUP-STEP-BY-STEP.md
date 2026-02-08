# 🚀 Vercel Setup - Step-by-Step Guide (Follow Exactly)

## ⚡ FASTEST PATH - Do This Now:

### STEP 1: Sign In/Create Account (2 minutes)
1. The Vercel "New Project" page should be open in your browser
2. If not, go to: https://vercel.com/new
3. Click **"Continue with GitHub"** (easiest - uses your existing GitHub account)
4. Authorize Vercel to access your GitHub

### STEP 2: Import Your Repository (1 minute)
1. You should see a list of your GitHub repositories
2. Find **`SiciliaBedda`** or **`davidclower/SiciliaBedda`**
3. Click **"Import"** next to it

### STEP 3: Configure Project (CRITICAL - Don't Skip!)
On the "Configure Project" page:

**Framework Preset:**
- Click the dropdown
- Select **"Other"** (at the bottom of the list)

**Root Directory:**
- Leave as `./` (default is correct)

**Build and Output Settings:**
- **Build Command:** DELETE everything - leave it EMPTY
- **Output Directory:** DELETE everything - leave it EMPTY  
- **Install Command:** Can leave as `npm install` or delete it

**⚠️ IMPORTANT:** This is a static site - NO BUILD STEP NEEDED!

### STEP 4: Add Environment Variables (BEFORE DEPLOYING!)

**Click "Environment Variables" button** (before clicking Deploy!)

Add these ONE BY ONE (click "Add" after each):

1. **Name:** `STRIPE_SECRET_KEY`
   **Value:** `sk_live_your_actual_stripe_live_key_here`
   **Environment:** Select "Production"

2. **Name:** `SITE_URL`
   **Value:** `https://www.siciliabedda.com`
   **Environment:** Select "Production"

3. **Name:** `EUR_TO_USD_RATE`
   **Value:** `1.08`
   **Environment:** Select "Production"

4. **Name:** `CONTACT_EMAIL`
   **Value:** `info@siciliabedda.com`
   **Environment:** Select "Production"

5. **Name:** `EMAIL_SERVICE`
   **Value:** `smtp`
   **Environment:** Select "Production"

6. **Name:** `SMTP_HOST`
   **Value:** `smtp.gmail.com`
   **Environment:** Select "Production"

7. **Name:** `SMTP_PORT`
   **Value:** `587`
   **Environment:** Select "Production"

8. **Name:** `SMTP_SECURE`
   **Value:** `false`
   **Environment:** Select "Production"

9. **Name:** `SMTP_USER`
   **Value:** `info@siciliabedda.com`
   **Environment:** Select "Production"

10. **Name:** `SMTP_PASS`
    **Value:** `your_google_app_password_here`
    **Environment:** Select "Production"

11. **Name:** `SMTP_FROM`
    **Value:** `"Sicilia Bedda Contact Form" <info@siciliabedda.com>`
    **Environment:** Select "Production"

**⚠️ CRITICAL NOTES:**
- Replace `sk_live_your_actual_stripe_live_key_here` with your REAL Stripe LIVE secret key
- Replace `your_google_app_password_here` with your REAL Google App Password
- Make sure to select "Production" for each variable
- You can add "Preview" and "Development" later if needed

### STEP 5: Deploy! (2 minutes)
1. Click the big **"Deploy"** button
2. Wait 1-2 minutes
3. You'll see "Building..." then "Ready"
4. Your site will be live!

### STEP 6: Add Custom Domain (After First Deployment)
1. Go to **Project Settings** (gear icon)
2. Click **"Domains"** tab
3. Enter: `www.siciliabedda.com`
4. Click **"Add"**
5. Follow DNS instructions (you'll need to update DNS records)

## ✅ Verification Checklist

After deployment, check:
- [ ] Homepage loads: https://your-project.vercel.app
- [ ] Navigation links work
- [ ] Shopping cart works
- [ ] Language switching works
- [ ] All pages accessible

## 🆘 If Deployment Fails

1. **Check Build Logs:**
   - Click on the failed deployment
   - Look at "Build Logs" for errors
   - Common issue: Build command should be EMPTY

2. **Check Function Logs:**
   - Go to "Functions" tab
   - Check `/api/contact` and `/api/create-checkout-session`
   - Look for environment variable errors

3. **Common Fixes:**
   - **Build error:** Make sure Build Command is EMPTY
   - **404 errors:** Verify `index.html` exists in root
   - **API 500 errors:** Check environment variables are set correctly

## 📞 Need Immediate Help?

If you get stuck:
1. Take a screenshot of the error
2. Check Vercel dashboard → Project → Deployments → Click latest → View logs
3. Vercel Support: https://vercel.com/support (usually responds quickly)

## Your Code is 100% Ready!

✅ All files pushed to GitHub
✅ Vercel configuration ready (`vercel.json`)
✅ API functions ready (`api/create-checkout-session.js`, `api/contact.js`)
✅ All HTML files ready
✅ Shopping cart ready

You just need to:
1. Import the repo in Vercel
2. Set environment variables
3. Click Deploy

That's it! 🎉
