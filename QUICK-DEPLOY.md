# 🚀 Quick Deploy to Vercel - URGENT

## Your website is ready to deploy! Follow these steps:

### Step 1: Go to Vercel
1. Open https://vercel.com in your browser
2. Sign in (or create account if needed)

### Step 2: Import Your Project
1. Click **"Add New Project"** or **"Import Project"**
2. Select **"Import Git Repository"**
3. Choose **`davidclower/SiciliaBedda`** from GitHub
4. Click **"Import"**

### Step 3: Configure (IMPORTANT!)
1. **Framework Preset:** Select **"Other"** (or leave auto-detected)
2. **Root Directory:** Leave as `./` (root)
3. **Build Command:** Leave EMPTY (this is a static site)
4. **Output Directory:** Leave EMPTY
5. **Install Command:** Leave as `npm install` (or empty)

### Step 4: Add Environment Variables (CRITICAL!)
Click **"Environment Variables"** and add these:

```
STRIPE_SECRET_KEY = sk_live_your_live_stripe_key
SITE_URL = https://www.siciliabedda.com
EUR_TO_USD_RATE = 1.08
CONTACT_EMAIL = info@siciliabedda.com
EMAIL_SERVICE = smtp
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_SECURE = false
SMTP_USER = info@siciliabedda.com
SMTP_PASS = your_google_app_password_here
SMTP_FROM = "Sicilia Bedda Contact Form" <info@siciliabedda.com>
```

**⚠️ IMPORTANT:** 
- Replace `sk_live_your_live_stripe_key` with your actual Stripe LIVE secret key
- Replace `your_google_app_password_here` with your Google App Password
- Use **LIVE** keys, not test keys for production

### Step 5: Deploy!
1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment
3. Your site will be live at: `https://siciliabedda-xxxxx.vercel.app`

### Step 6: Add Custom Domain
1. After deployment, go to **Project Settings** → **Domains**
2. Add domain: `www.siciliabedda.com`
3. Follow DNS instructions (update your DNS records)

## ✅ What Should Work After Deployment

- ✅ Homepage loads
- ✅ All navigation links work
- ✅ Shopping cart functionality
- ✅ Language switching
- ✅ Contact form (if email configured)
- ✅ Stripe checkout (if Stripe keys configured)

## 🆘 If Something Doesn't Work

1. **Check Vercel Deployment Logs:**
   - Go to your project in Vercel
   - Click on the latest deployment
   - Check "Build Logs" and "Function Logs" for errors

2. **Common Issues:**
   - **404 errors:** Check that `index.html` exists in root
   - **API errors:** Verify environment variables are set correctly
   - **Stripe errors:** Check that `STRIPE_SECRET_KEY` is set and valid

3. **Need Help?**
   - Vercel Support: https://vercel.com/support
   - Check `DEPLOY-TO-VERCEL.md` for detailed troubleshooting

## Your Code is Ready!

All files have been pushed to GitHub and are ready for deployment. The website that works perfectly at `http://localhost:8000` will work the same way on Vercel!
