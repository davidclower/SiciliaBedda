# Deploy Sicilia Bedda Website to Vercel

## Quick Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to https://vercel.com** and sign in (or create account)

2. **Click "Add New Project"**

3. **Import your GitHub repository:**
   - Select `davidclower/SiciliaBedda`
   - Vercel will auto-detect settings

4. **Configure Project Settings:**
   - **Framework Preset:** Other (or leave as auto-detected)
   - **Root Directory:** `./` (root)
   - **Build Command:** Leave empty (static site)
   - **Output Directory:** Leave empty (serves from root)

5. **Environment Variables** (Click "Environment Variables" and add):
   ```
   STRIPE_SECRET_KEY=sk_live_your_live_stripe_key_here
   SITE_URL=https://www.siciliabedda.com
   EUR_TO_USD_RATE=1.08
   CONTACT_EMAIL=info@siciliabedda.com
   EMAIL_SERVICE=smtp
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=info@siciliabedda.com
   SMTP_PASS=your_google_app_password
   SMTP_FROM="Sicilia Bedda Contact Form" <info@siciliabedda.com>
   ```

6. **Click "Deploy"**

7. **After deployment, add custom domain:**
   - Go to Project Settings → Domains
   - Add `www.siciliabedda.com`
   - Follow DNS setup instructions

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```powershell
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```powershell
   vercel login
   ```

3. **Deploy:**
   ```powershell
   cd "c:\Users\DavidClower\iCloudDrive\Desert Cove Ventures, LLC\Dev\Cursor Website Test"
   vercel
   ```

4. **Follow prompts:**
   - Link to existing project or create new
   - Set environment variables when prompted

5. **For production deployment:**
   ```powershell
   vercel --prod
   ```

## What Gets Deployed

✅ All HTML files (index.html, support-cause.html, etc.)
✅ All JavaScript files (language.js, shopping-cart.js, translations(1).js)
✅ All CSS and images
✅ API endpoints:
   - `/api/contact` - Contact form handler
   - `/api/create-checkout-session` - Stripe checkout

## Post-Deployment Checklist

- [ ] Verify homepage loads: https://www.siciliabedda.com
- [ ] Test navigation links work
- [ ] Test shopping cart functionality
- [ ] Test language switching
- [ ] Verify contact form works (check email)
- [ ] Test Stripe checkout (use test mode first)
- [ ] Check mobile responsiveness
- [ ] Verify all images load correctly

## Troubleshooting

### Site shows "404 Not Found"
- Check that `index.html` exists in root
- Verify Vercel project root directory is set correctly

### API endpoints return 500 errors
- Check environment variables are set in Vercel dashboard
- Verify `STRIPE_SECRET_KEY` is set (use `sk_live_...` for production)
- Check Vercel function logs: Project → Functions → View Logs

### Links don't work
- Ensure all HTML files are in the root directory
- Check that file names match exactly (case-sensitive)

### Stripe checkout fails
- Verify `STRIPE_SECRET_KEY` environment variable is set
- Check Stripe dashboard for API errors
- Ensure you're using live keys (not test keys) for production

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Stripe secret key (live) | `sk_live_...` |
| `SITE_URL` | Your live site URL | `https://www.siciliabedda.com` |
| `EUR_TO_USD_RATE` | Exchange rate (optional) | `1.08` |
| `CONTACT_EMAIL` | Email for contact form | `info@siciliabedda.com` |
| `EMAIL_SERVICE` | Email service type | `smtp` |
| `SMTP_HOST` | SMTP server | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username | `info@siciliabedda.com` |
| `SMTP_PASS` | SMTP password (App Password) | `your_app_password` |

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Check deployment logs in Vercel dashboard
