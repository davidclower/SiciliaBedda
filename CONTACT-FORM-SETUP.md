# Contact Form Setup - Quick Checklist

Get the Contact Us form sending emails to **info@siciliabedda.com** in 3 steps.

---

## Step 1: Get Google App Password (if you haven't)

1. Log in at **mail.google.com** as **info@siciliabedda.com**
2. Go to: **https://myaccount.google.com/apppasswords**
3. If 2-Step Verification isn't on, turn it on first
4. Create an App Password:
   - Select **Mail** → **Other (Custom name)**
   - Name it: "Sicilia Bedda contact form"
   - Copy the **16-character password** (looks like: `abcd efgh ijkl mnop` - remove spaces)

---

## Step 2: Deploy to Vercel

1. Go to **https://vercel.com** and sign in (use GitHub)
2. Click **Add New** → **Project**
3. **Import** your GitHub repo: **davidclower/SiciliaBedda** (or whatever repo has your code)
4. **Project Name:** Set to **siciliabedda-contact** (important - must match the form URL)
5. **Before clicking Deploy**, click **Environment Variables** and add these (for **Production**):

   | Variable Name | Value |
   |---------------|-------|
   | `CONTACT_EMAIL` | `info@siciliabedda.com` |
   | `EMAIL_SERVICE` | `smtp` |
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `587` |
   | `SMTP_SECURE` | `false` |
   | `SMTP_USER` | `info@siciliabedda.com` |
   | `SMTP_PASS` | *paste the 16-character App Password from Step 1* |
   | `SMTP_FROM` | `"Sicilia Bedda Contact" <info@siciliabedda.com>` |

6. Click **Deploy**
7. Wait for deployment to finish (usually 1-2 minutes)

---

## Step 3: Test It

1. Go to **https://www.siciliabedda.com/contact.html** (or your Contact Us page)
2. Fill out the form and submit
3. Check **info@siciliabedda.com** inbox - you should receive the inquiry email

---

## Troubleshooting

**"Error connecting to the server"**
- Make sure Vercel project name is exactly **siciliabedda-contact**
- Check that deployment succeeded in Vercel dashboard
- Verify all environment variables are set (especially `SMTP_PASS`)

**Form submits but no email arrives**
- Check spam folder in info@siciliabedda.com
- Verify `SMTP_PASS` is the App Password (not your regular password)
- Check Vercel function logs: Vercel dashboard → your project → Functions → View logs

**Different Vercel URL?**
- If your Vercel project got a different name (e.g. `sicilia-bedda-xyz123`), update **contact.html** line 239:
  - Change: `window.CONTACT_API_BASE = window.CONTACT_API_BASE || 'https://siciliabedda-contact.vercel.app';`
  - To: `window.CONTACT_API_BASE = window.CONTACT_API_BASE || 'https://your-actual-vercel-url.vercel.app';`
  - Then push to GitHub so the live site uses the correct URL

---

**That's it!** Once deployed with the env vars, the form will send inquiries to **info@siciliabedda.com**.
