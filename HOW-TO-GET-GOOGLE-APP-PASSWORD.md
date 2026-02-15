# How to Get a Google App Password - Step by Step

Follow these steps to create a Google App Password for `info@siciliabedda.com`:

---

## Step 1: Sign in to Google

1. Go to **https://mail.google.com**
2. Sign in with your **info@siciliabedda.com** email address and password

---

## Step 2: Enable 2-Step Verification (Required)

**Important:** You MUST have 2-Step Verification enabled to create App Passwords.

1. Go to **https://myaccount.google.com/security**
2. Look for **"How you sign in to Google"** section
3. Find **"2-Step Verification"**
4. If it says **"Off"** or **"Not set up"**:
   - Click on **"2-Step Verification"**
   - Click **"Get Started"**
   - Follow the prompts to set it up (you'll need your phone)
   - Complete the setup process
5. If it's already **"On"**, you're good to go! Skip to Step 3.

---

## Step 3: Create the App Password

1. Go to **https://myaccount.google.com/apppasswords**
   - (You can also get there by: Google Account → Security → 2-Step Verification → App passwords)

2. You might be asked to sign in again - use your **info@siciliabedda.com** password

3. You'll see a page titled **"App passwords"**

4. At the top, you'll see:
   - **"Select app"** dropdown
   - **"Select device"** dropdown

5. Click **"Select app"** dropdown:
   - Choose **"Mail"**

6. Click **"Select device"** dropdown:
   - Choose **"Other (Custom name)"**
   - A text box will appear
   - Type: **"Sicilia Bedda Contact Form"**
   - Click **"Generate"**

7. **Google will show you a 16-character password** that looks like this:
   ```
   abcd efgh ijkl mnop
   ```
   (It will have spaces between groups of 4 characters)

8. **IMPORTANT:** 
   - **Copy this password immediately** - you won't be able to see it again!
   - **Remove the spaces** when you use it (so it becomes: `abcdefghijklmnop`)
   - Save it somewhere safe temporarily

---

## Step 4: Use the App Password in Vercel

1. Go to your **Vercel dashboard** → Your project → **Settings** → **Environment Variables**

2. Find or create the variable named **`SMTP_PASS`**

3. Paste your App Password (without spaces) as the value

4. Make sure **Production** is checked

5. Click **"Save"**

6. **Redeploy** your site (Deployments → Latest → "..." → Redeploy)

---

## Troubleshooting

**"App passwords" option doesn't appear:**
- Make sure 2-Step Verification is enabled (Step 2)
- Try refreshing the page
- Make sure you're signed in as info@siciliabedda.com

**"2-Step Verification" is grayed out or unavailable:**
- Your Google Workspace admin might need to enable it
- Contact your Google Workspace administrator

**Forgot to copy the password:**
- You'll need to create a new App Password (the old one won't work)
- Go back to https://myaccount.google.com/apppasswords
- Create a new one and copy it immediately

**Password doesn't work in Vercel:**
- Make sure you removed all spaces from the password
- Make sure you're using the App Password, not your regular Google password
- Verify 2-Step Verification is still enabled

---

## What the App Password Looks Like

When Google generates it, it will look like:
```
abcd efgh ijkl mnop
```

But when you use it in Vercel, remove the spaces:
```
abcdefghijklmnop
```

---

## Security Note

- App Passwords are safer than using your regular password
- Each App Password can be used for one specific purpose
- You can revoke App Passwords anytime at https://myaccount.google.com/apppasswords
- If you suspect it's compromised, delete it and create a new one

---

**That's it!** Once you have the App Password, add it to Vercel as `SMTP_PASS` and your Contact Us form will start sending emails.
