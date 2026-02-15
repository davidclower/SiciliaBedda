# Point www.siciliabedda.com to GitHub Pages

Follow these steps so **www.siciliabedda.com** serves your site from this repo.

---

## 1. Turn on GitHub Pages

1. Open your repo: **https://github.com/davidclower/SiciliaBedda**
2. Go to **Settings** → **Pages** (left sidebar).
3. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `master` (or `main`)
   - **Folder:** `/ (root)`
4. Click **Save**. Your site will be at `https://davidclower.github.io/SiciliaBedda/` until the custom domain is set.

---

## 2. Set the custom domain on GitHub

1. Still in **Settings** → **Pages**.
2. Under **Custom domain**, enter: **www.siciliabedda.com**
3. Click **Save**.
4. If GitHub shows a **Verify** or DNS checklist, leave that open; you’ll satisfy it in step 3.

The **CNAME** file in this repo (with `www.siciliabedda.com`) is already correct for this.

---

## 3. Point your domain at GitHub (DNS)

Where you manage DNS for **siciliabedda.com** (e.g. GoDaddy, Namecheap, Cloudflare, Google Domains), add:

| Type  | Name/Host | Value/Points to        |
|-------|------------|-------------------------|
| CNAME | www        | davidclower.github.io  |

- **Name:** `www` (or `www.siciliabedda.com` if the registrar requires the full name).
- **Value:** `davidclower.github.io` (no `https://`, no path).

Optional: if you want **siciliabedda.com** (no www) to work as well, add either:

- **CNAME** for `@` (root) → `davidclower.github.io` (if your provider allows CNAME on the root), or  
- **A** records for `@` to GitHub’s IPs:  
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

---

## 4. Wait and re-check

- DNS can take from a few minutes up to 24–48 hours.
- In **Settings** → **Pages**, the custom domain should eventually show as verified (green check).
- Visit **https://www.siciliabedda.com**; it should load your site. GitHub will serve it over HTTPS once the domain is verified.

---

## Summary

- **CNAME** in the repo: already set to `www.siciliabedda.com`.
- **GitHub:** enable Pages from `master` (root), then set custom domain to `www.siciliabedda.com`.
- **Registrar:** add CNAME `www` → `davidclower.github.io`.

After that, **www.siciliabedda.com** will direct to your GitHub-hosted site.
