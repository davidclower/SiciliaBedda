# Add CNAME in NameBright (copy-paste)

Use these **exact values** in NameBright so **www.siciliabedda.com** points to your GitHub Pages site.

---

## Values to enter

| Field        | Enter exactly this        |
|-------------|---------------------------|
| **Type**    | CNAME                     |
| **Host / Custom host name** | `www`  |
| **Target / Redirect domain / Points to** | `davidclower.github.io` |

- Do **not** use `https://` or a path — only `davidclower.github.io`.

---

## Where to add it (NameBright)

**If you're on the new NameBright (beta):**

1. **My Domains** → click **siciliabedda.com**
2. Open **DNS** / **DNS records** / **DNS management**
3. **Add record** (or **Add DNS record**)
4. Type: **CNAME**
5. Host / name: **www**
6. Target / value / points to: **davidclower.github.io**
7. **Save**

**If you're on the old NameBright:**

1. **My Account** → select **siciliabedda.com** → **DNS Records**
2. At the bottom, click **Add a New DNS Record**
3. Type: **CNAME (Canonical name)**
4. Custom host name: **www**
5. Redirect domain / target: **davidclower.github.io**
6. **Add**

---

## After saving

- Wait **5–30 minutes** (up to 24–48 hours in rare cases).
- Try **https://www.siciliabedda.com** in an incognito/private window.
- In your GitHub repo: **Settings → Pages** → custom domain **www.siciliabedda.com** should eventually show as verified.

If a CNAME for **www** already exists (e.g. pointing to a “coming soon” page), **edit** it so the target is **davidclower.github.io**, or delete it and add the new one above.
