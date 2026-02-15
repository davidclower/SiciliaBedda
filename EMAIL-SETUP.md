# Email setup: Google Workspace + Contact form → info@siciliabedda.com

---

## ✅ What’s already done (no action needed)

- Contact API code is ready for **Vercel** (`api/contact.js`, `api/contact-core.js`, `vercel.json`).
- The Contact Us form is set to use **https://siciliabedda-contact.vercel.app** in production.
- Default recipient is **info@siciliabedda.com**; SMTP is configured to use Google.

---

## What I need from you (only 2 things)

Because these use your accounts and secrets, only you can do them:

**1. Create a Google App Password for info@siciliabedda.com**  
- Log in at **mail.google.com** as **info@siciliabedda.com**.  
- Go to **https://myaccount.google.com/apppasswords** (turn on 2-Step Verification first if needed).  
- Create an App password (e.g. “Sicilia Bedda contact”), copy the **16-character password**.

**2. Deploy on Vercel and add env vars**  
- Go to **https://vercel.com** → **Add New** → **Project** → import your **GitHub** repo.  
- Project name: **siciliabedda-contact**.  
- Before deploying, add **Environment Variables** (Production) — see the table in **Part 2, Step 2** below.  
- Set **SMTP_PASS** to the 16-character App Password from step 1.  
- Click **Deploy**.

After that, the Contact form will send to **info@siciliabedda.com**. If you use a different Vercel project name, tell me and I’ll update the URL in `contact.html`.

---

## Start here: what to do (in order)

**Phase A — Get the two email addresses working**

1. Sign up for **Google Workspace** at https://workspace.google.com (paid; use domain **siciliabedda.com**).
2. When Google asks, create your first user as **dclower@siciliabedda.com**.
3. In Google’s Admin console, **verify** you own siciliabedda.com (add the TXT record they give you at NameBright, then click Verify).
4. In Admin console → **Directory** → **Users**, click **Add new user** and create **info@siciliabedda.com**.

After Phase A you can send and receive at **dclower@siciliabedda.com** and **info@siciliabedda.com**.

---

**Phase B — Make the Contact Us form send to info@**

5. **Host the contact API** somewhere (e.g. Vercel, Netlify, or your own server). GitHub Pages cannot run it.
6. In that host’s **environment variables**, set:  
   `CONTACT_EMAIL=info@siciliabedda.com`, `EMAIL_SERVICE=smtp`, and the SMTP settings below (using **info@siciliabedda.com** and a Google App Password).
7. If the form lives on a different URL than the API, set the form’s **API endpoint** in **contact.html** to point to that API URL.

After Phase B, when someone submits the Contact form, the message is emailed to **info@siciliabedda.com**.

---

Details for each step are in **Part 1** (Phase A) and **Part 2** (Phase B) below.

---

## Part 1: Google Workspace (dclower@ and info@)

You need **Google Workspace** (paid) to use your own domain with Gmail. Google’s free Gmail does not support @siciliabedda.com.

### 1. Sign up for Google Workspace

1. Go to **https://workspace.google.com** and click **Get started**.
2. Enter your business details. When asked for domain, enter **siciliabedda.com**.
3. Create your first user — this can be **dclower@siciliabedda.com** (you’ll add info@ next).
4. Complete sign-up and payment. Google will send you to an **Admin console**.

### 2. Verify you own siciliabedda.com (Add Verification Code)

Google proves you own **siciliabedda.com** by having you add a **TXT record** at your domain’s DNS. Do this:

**In Google (where it says “Add Verification Code”):**

1. Note exactly what Google shows you. You’ll see something like:
   - **Record type:** TXT  
   - **Host / Name:** `@` or `siciliabedda.com` (or leave blank — depends on the provider)  
   - **Value / Content:** a long string like `google-site-verification=AbCdEf123...`
2. Leave the Google tab open (or copy that value somewhere).

**At your domain DNS (HugeDomains, NameBright, or wherever siciliabedda.com is managed):**

3. Log in to the place where you manage DNS for **siciliabedda.com**.
4. Open **DNS**, **DNS records**, **Manage DNS**, or similar.
5. **Add** a new record:
   - **Type:** TXT  
   - **Host / Name:** Use what Google said. Often it’s `@` or blank for “root” (siciliabedda.com). If the panel says “subdomain,” leave it blank for the main domain.  
   - **Value / Content / TXT value:** Paste the **exact** verification string from Google (the whole `google-site-verification=...` part).
6. **Save** the record.

**Back in Google:**

7. Wait 5–10 minutes (DNS can be slow), then in Google click **Verify** or **Verify domain**.
8. If it says “not found,” wait a bit longer and try again. No need to change the code — it just takes time to propagate.

Once it says “Verified,” you’re done with this step.

### 3. Add the second address (info@)

- In Admin console: **Directory** → **Users**.
- Click **Add new user**.
- Set **First name** / **Last name** (e.g. “Info” / “Sicilia Bedda”) and **Primary email**: **info@siciliabedda.com**.
- Set a secure password (you can share it with whoever should read inquiries, or use it only for forwarding).
- Click **Add new user**.

You’ll then have:

- **dclower@siciliabedda.com**
- **info@siciliabedda.com**

Both are real Google mailboxes; you can log in at mail.google.com with each.

### 4. (Optional) Forward info@ to dclower@

If you want all contact form emails in one inbox:

- Log in as **info@siciliabedda.com** at mail.google.com → **Settings** (gear) → **See all settings** → **Forwarding and POP/IMAP**.
- Add a forwarding address: **dclower@siciliabedda.com** and confirm with the verification email.

---

## Part 2: Contact form → info@ (Vercel + Google SMTP)

The contact API is set up to deploy on **Vercel** and to send email via **Google (SMTP)** to **info@siciliabedda.com**. Do the following.

### Step 1: Create a Google App Password (for info@)

1. Log in at **mail.google.com** as **info@siciliabedda.com**.
2. Open **Google Account** → **Security**: https://myaccount.google.com/security  
3. Under “How you sign in to Google,” turn on **2-Step Verification** if it’s not already on.
4. Go to **App passwords**: https://myaccount.google.com/apppasswords  
5. Create an app password: choose **Mail** and **Other (Custom name)** → name it e.g. “Sicilia Bedda contact form.”
6. Copy the **16-character password** (no spaces). You’ll use it as `SMTP_PASS` in Vercel.

### Step 2: Deploy the API to Vercel

1. Push your repo to **GitHub** (if you haven’t already).
2. Go to **https://vercel.com** and sign in (e.g. with GitHub).
3. Click **Add New** → **Project** and **import** your GitHub repo.
4. Set the **project name** to **siciliabedda-contact** (so the URL is `https://siciliabedda-contact.vercel.app` and matches the form).
5. Before deploying, open **Environment Variables** and add (for **Production**):

   | Name | Value |
   |------|--------|
   | `CONTACT_EMAIL` | `info@siciliabedda.com` |
   | `EMAIL_SERVICE` | `smtp` |
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `587` |
   | `SMTP_SECURE` | `false` |
   | `SMTP_USER` | `info@siciliabedda.com` |
   | `SMTP_PASS` | *the 16-character App Password from Step 1* |
   | `SMTP_FROM` | `"Sicilia Bedda Contact" <info@siciliabedda.com>` |

6. Click **Deploy**. When it’s done, your API will be at **https://siciliabedda-contact.vercel.app/api/contact**.

### Step 3: Confirm the form points to Vercel

In **contact.html** the production API is set to **https://siciliabedda-contact.vercel.app**. If you used a different Vercel project name, change the line:

`window.CONTACT_API_BASE = window.CONTACT_API_BASE || 'https://siciliabedda-contact.vercel.app';`

to your URL (e.g. `https://your-project-name.vercel.app`), then push to GitHub so the live site uses it.

After this, submissions from the Contact Us page will be sent to **info@siciliabedda.com** via Google SMTP.

---

## Summary

| Goal | Action |
|------|--------|
| **dclower@siciliabedda.com** | Create in Google Workspace (Phase A). |
| **info@siciliabedda.com** | Create in Google Workspace (Phase A). |
| **Contact form → info@** | Create App Password for info@ → deploy API to Vercel with env vars above → form already points to Vercel. |
