# Fix DNS: Make siciliabedda.com (no www) work

Right now **www.siciliabedda.com** works, but **siciliabedda.com** (no www) doesn't. Add these DNS records in NameBright.

---

## In NameBright (for siciliabedda.com)

**Add 4 A records** for the root domain (so siciliabedda.com works):

| Type | Host/Name | Value/Points to |
|------|-----------|-----------------|
| A    | @         | 185.199.108.153 |
| A    | @         | 185.199.109.153 |
| A    | @         | 185.199.110.153 |
| A    | @         | 185.199.111.153 |

**Steps:**

1. Log into **NameBright** → **My Domains** → **siciliabedda.com** → **DNS** (or "DNS Records" / "Manage DNS").

2. Click **Add record** (or "Add DNS record").

3. **First A record:**
   - **Type:** A
   - **Host / Name:** `@` (or leave blank if NameBright uses blank for root)
   - **Value / Points to:** `185.199.108.153`
   - **Save**

4. **Repeat 3 more times** with the same Host (`@`) but different Values:
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

5. **Save all 4 records.**

---

## After saving

- Wait **5–30 minutes** (DNS propagation).
- Try **https://siciliabedda.com** (no www) in your browser.
- Both **www.siciliabedda.com** and **siciliabedda.com** should work.

**Note:** In GitHub Pages settings, you can set the custom domain to either **www.siciliabedda.com** or **siciliabedda.com** (or both if GitHub supports it). The CNAME for www is already set, and these A records will make the root domain work.
