# How to Get a Google App Password (Step-by-Step)

Use this to get the password needed for the Contact form to send emails.

---

## Step 1: Log in to Google Account

1. Open your web browser
2. Go to **https://mail.google.com**
3. **Sign in** with **info@siciliabedda.com** (not dclower@)
   - If you're already logged in as a different account, click your profile picture (top right) → **Sign out**, then sign in as **info@siciliabedda.com**

**Important:** You must be logged in as **info@siciliabedda.com** to create an App Password for that account.

---

## Step 2: Go to Google Account Settings

1. Click your **profile picture** (top right corner of Gmail)
2. Click **"Manage your Google Account"** (or "Google Account")
3. You'll see a page with tabs like: **Home**, **Personal info**, **Security**, etc.

---

## Step 3: Turn on 2-Step Verification (if not already on)

**You need 2-Step Verification enabled before you can create App Passwords.**

1. In Google Account, click the **"Security"** tab (left sidebar)
2. Scroll down to **"How you sign in to Google"**
3. Look for **"2-Step Verification"**
   - If it says **"Off"** or **"Get started"**: Click it → follow the prompts to set it up (you'll verify with your phone)
   - If it says **"On"**: You're good, skip to Step 4

**Note:** If you just set up 2-Step Verification, wait a minute for it to activate, then continue.

---

## Step 4: Go to App Passwords

1. Still in **Security** tab, scroll down to **"How you sign in to Google"**
2. Find **"App passwords"** (it's usually right below "2-Step Verification")
3. Click **"App passwords"**

**If you don't see "App passwords":**
- Make sure 2-Step Verification is **On** (Step 3)
- Try refreshing the page
- Sometimes it's under "2-Step Verification" → click that → scroll down to find "App passwords"

---

## Step 5: Create the App Password

1. You'll see a page titled **"App passwords"**
2. At the top, there's a dropdown: **"Select app"** → choose **"Mail"**
3. Next dropdown: **"Select device"** → choose **"Other (Custom name)"**
4. A text box appears → type: **"Sicilia Bedda contact form"** (or any name you'll remember)
5. Click **"Generate"** (or "Create")

---

## Step 6: Copy the Password

1. Google will show you a **16-character password** that looks like:
   ```
   abcd efgh ijkl mnop
   ```
   (It has spaces, but you'll remove them)

2. **Copy the entire password** (all 16 characters)
   - Click the **copy icon** next to it, or select all and copy (Ctrl+C)

3. **Important:** You'll only see this password **once**. If you lose it, you'll need to create a new one.

4. Click **"Done"**

---

## Step 7: Save It Somewhere Safe

**You'll need this password for Vercel in the next step.**

- Paste it into a text file or password manager
- **Remove the spaces** - it should be 16 characters with no spaces, like: `abcdefghijklmnop`
- Example: If Google shows `abcd efgh ijkl mnop`, use `abcdefghijklmnop` in Vercel

---

## What to Do With This Password

Use it as the **`SMTP_PASS`** value when setting up environment variables in Vercel (see **CONTACT-FORM-SETUP.md** Step 2).

---

## Troubleshooting

**"App passwords" option doesn't appear:**
- Make sure you're logged in as **info@siciliabedda.com** (not dclower@)
- Make sure **2-Step Verification is ON**
- Try a different browser or incognito mode

**"You need 2-Step Verification enabled":**
- Go back to Step 3 and turn it on first

**"Can't sign in to info@siciliabedda.com":**
- Make sure the email account exists in Google Workspace
- Try resetting the password if needed
- Contact your Google Workspace admin if you're not the admin

**Already created an App Password but lost it:**
- Go back to **App passwords** page
- You'll see a list of your app passwords
- Delete the old one and create a new one (follow Steps 5-6 again)

---

## Quick Checklist

- [ ] Logged in as **info@siciliabedda.com** at mail.google.com
- [ ] Went to Google Account → Security tab
- [ ] Turned on **2-Step Verification** (if needed)
- [ ] Clicked **"App passwords"**
- [ ] Selected **"Mail"** and **"Other (Custom name)"**
- [ ] Named it "Sicilia Bedda contact form"
- [ ] Copied the **16-character password** (without spaces)
- [ ] Saved it somewhere safe for Vercel setup

Once you have the password, you're ready for **CONTACT-FORM-SETUP.md** Step 2 (deploy to Vercel).
