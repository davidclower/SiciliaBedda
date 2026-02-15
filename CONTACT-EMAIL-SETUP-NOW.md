# Contact Us Email Setup - Step by Step

Your Contact Us form is ready to work! Follow these steps to enable email sending.

## What You Need

1. **Google App Password** for `info@siciliabedda.com` (16-character password)
2. **Access to your Vercel dashboard** where your site is deployed

---

## Step 1: Create Google App Password

1. Go to **https://mail.google.com** and sign in as **info@siciliabedda.com**
2. Go to **https://myaccount.google.com/apppasswords**
3. If 2-Step Verification isn't enabled, turn it on first (required for App Passwords)
4. Click **"Select app"** → Choose **"Mail"**
5. Click **"Select device"** → Choose **"Other (Custom name)"**
6. Enter name: **"Sicilia Bedda Contact Form"**
7. Click **"Generate"**
8. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)
   - Remove any spaces - you'll need just the characters
   - **Save this password** - you'll need it in Step 2

---

## Step 2: Set Environment Variables in Vercel

1. Go to **https://vercel.com** and sign in
2. Find your project (the one hosting **www.siciliabedda.com**)
3. Click on your project → Go to **Settings** → **Environment Variables**
4. Add these **7 environment variables** (for **Production** environment):

   | Variable Name | Value |
   |---------------|-------|
   | `CONTACT_EMAIL` | `info@siciliabedda.com` |
   | `EMAIL_SERVICE` | `smtp` |
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `587` |
   | `SMTP_SECURE` | `false` |
   | `SMTP_USER` | `info@siciliabedda.com` |
   | `SMTP_PASS` | *Paste your 16-character App Password from Step 1* |
   | `SMTP_FROM` | `"Sicilia Bedda Contact" <info@siciliabedda.com>` |

5. **Important:** Make sure each variable is set for **Production** (check the checkbox)
6. Click **"Save"** for each variable

---

## Step 3: Redeploy Your Site

After adding the environment variables:

1. Go to **Deployments** tab in Vercel
2. Click the **"..."** menu on your latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to finish (usually 1-2 minutes)

---

## Step 4: Test the Contact Form

1. Go to **https://www.siciliabedda.com/contact.html**
2. Fill out the form:
   - Name: Your name
   - Email: Your email
   - Country: Select your country
   - Message: "Test message"
3. Click **"Send Message"**
4. You should see a success message
5. Check **info@siciliabedda.com** inbox (and spam folder) - you should receive the email within a few seconds

---

## Troubleshooting

**Form shows "Error connecting to the server"**
- Make sure you redeployed after adding environment variables
- Check that all 8 environment variables are set correctly
- Verify `SMTP_PASS` is the App Password (not your regular password)

**Form submits successfully but no email arrives**
- Check spam folder in info@siciliabedda.com
- Verify the App Password is correct (no spaces, all 16 characters)
- Check Vercel function logs:
  - Go to Vercel dashboard → Your project → **Functions** tab
  - Click on `/api/contact` → View logs
  - Look for any error messages

**Still not working?**
- Double-check that `EMAIL_SERVICE` is set to `smtp` (not `log`)
- Make sure 2-Step Verification is enabled on your Google account
- Verify the App Password was created for the correct Google account (info@siciliabedda.com)

---

## What Happens When Someone Submits the Form?

1. Form data is sent to `/api/contact` on your Vercel site
2. The API uses your Google App Password to send an email via SMTP
3. Email is sent **from:** `info@siciliabedda.com`
4. Email is sent **to:** `info@siciliabedda.com`
5. The email includes:
   - Name, Email, Phone, Country, Message
   - Timestamp
   - Reply-To is set to the submitter's email (so you can reply directly)

---

**Once you've completed these steps, the Contact Us form will be fully functional!**
