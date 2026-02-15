# Vercel Environment Variables - Copy & Paste These

**Important Note:** The password `Isnello_2025?` doesn't match the typical Google App Password format. Google App Passwords are usually 16 characters (like `abcd efgh ijkl mnop`). Please verify you're using the App Password, not your regular Google password.

If you haven't created an App Password yet:
1. Go to https://myaccount.google.com/apppasswords
2. Sign in as info@siciliabedda.com
3. Create a new App Password for "Mail"
4. Copy the 16-character password (remove spaces)

---

## Environment Variables to Set in Vercel

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these **8 variables** (make sure **Production** is checked for each):

### Variable 1:
- **Key:** `CONTACT_EMAIL`
- **Value:** `info@siciliabedda.com`
- **Environment:** ✅ Production

### Variable 2:
- **Key:** `EMAIL_SERVICE`
- **Value:** `smtp`
- **Environment:** ✅ Production

### Variable 3:
- **Key:** `SMTP_HOST`
- **Value:** `smtp.gmail.com`
- **Environment:** ✅ Production

### Variable 4:
- **Key:** `SMTP_PORT`
- **Value:** `587`
- **Environment:** ✅ Production

### Variable 5:
- **Key:** `SMTP_SECURE`
- **Value:** `false`
- **Environment:** ✅ Production

### Variable 6:
- **Key:** `SMTP_USER`
- **Value:** `info@siciliabedda.com`
- **Environment:** ✅ Production

### Variable 7:
- **Key:** `SMTP_PASS`
- **Value:** `Isnello_2025?`
- **Environment:** ✅ Production

**⚠️ IMPORTANT:** If `Isnello_2025?` is your regular password (not an App Password), this will NOT work. You MUST use a Google App Password. Regular passwords don't work with SMTP.

### Variable 8:
- **Key:** `SMTP_FROM`
- **Value:** `"Sicilia Bedda Contact" <info@siciliabedda.com>`
- **Environment:** ✅ Production

---

## After Setting Variables:

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes

---

## How to Verify It's Working:

1. Go to https://www.siciliabedda.com/contact.html
2. Submit a test form
3. Check info@siciliabedda.com inbox
4. If no email arrives, check Vercel logs:
   - **Functions** tab → Click `/api/contact` → **View logs**
   - Look for SMTP errors

---

## If You Get SMTP Errors:

The most common error is "Invalid login" which means:
- You're using your regular password instead of App Password
- The App Password is incorrect
- 2-Step Verification isn't enabled

**Solution:** Create a proper Google App Password at https://myaccount.google.com/apppasswords
