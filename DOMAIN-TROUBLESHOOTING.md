# Why siciliabedda.com might not be working

Quick checks to fix the site not loading.

---

## What was checked

- **www.siciliabedda.com** and **siciliabedda.com** — both timed out (often means DNS not set or not pointing to GitHub).
- **https://davidclower.github.io/SiciliaBedda/** — returned a “NameBright Coming Soon” page, not your Sicilia Bedda site. So either the GitHub repo has different content, or the repo name is different.

---

## 1. Confirm the right repo and content on GitHub

Your docs say the repo is **https://github.com/davidclower/SiciliaBedda**.

- Open that URL. Does the repo exist?
- In that repo, do you see **your real site** (e.g. `index.html` with “Sicilia Bedda”, `contact.html`, `CNAME`, etc.)?
- If the repo instead has a “Coming Soon” or placeholder page, the code in this folder (“Cursor Website Test”) may not be pushed there yet. **Fix:** Push this project to that repo (or to the repo you use for the site) so GitHub Pages serves the real site.

**If you use a different repo** (e.g. “Cursor-Website-Test” or “siciliabedda”), update **DOMAIN-SETUP.md** and the steps below to use that repo’s name. The GitHub Pages URL would be `https://davidclower.github.io/<RepoName>/`.

---

## 2. GitHub Pages settings

In the repo that should serve the site:

1. Go to **Settings** → **Pages**.
2. **Source:** “Deploy from a branch”.
3. **Branch:** `master` (or `main`) and **Folder:** `/ (root)`.
4. **Custom domain:** `www.siciliabedda.com` (no `https://`).
5. Save. If GitHub shows “DNS check” or “Verify”, continue to step 3.

---

## 3. DNS at NameBright (or wherever siciliabedda.com is managed)

You said the domain is at **NameBright** (or HugeDomains). DNS must point the domain to GitHub:

| Type  | Host/Name | Value/Points to        |
|-------|-----------|-------------------------|
| CNAME | www       | davidclower.github.io   |

- **Host:** `www` (or whatever NameBright uses for “www subdomain”).
- **Value:** exactly `davidclower.github.io` (no `https://`, no path, no repo name).

After saving, wait **5–30 minutes** (sometimes up to 24–48 hours). Then:

- Open **https://www.siciliabedda.com** in a private/incognito window (to avoid cache).

**If you want siciliabedda.com (no “www”) to work too:**  
Many registrars don’t allow a CNAME on the root. Use **A records** instead:

| Type | Host | Value            |
|------|------|------------------|
| A    | @    | 185.199.108.153  |
| A    | @    | 185.199.109.153  |
| A    | @    | 185.199.110.153  |
| A    | @    | 185.199.111.153  |

(Add all four. Host “@” means the root domain siciliabedda.com.)

---

## 4. CNAME file in the repo

The repo that GitHub Pages uses must have a file named **CNAME** (no extension) at the **root**, with exactly one line:

```
www.siciliabedda.com
```

Your project already has this. After you push, it will be in the repo.

---

## 5. Quick checklist

- [ ] The GitHub repo that Pages uses contains your **real** site (this project), not a “Coming Soon” page.
- [ ] **Settings → Pages:** Deploy from branch `master` (or `main`), root folder; custom domain `www.siciliabedda.com`.
- [ ] At NameBright (or your DNS host): **CNAME** `www` → `davidclower.github.io`.
- [ ] Waited at least a few minutes after changing DNS; tried in incognito.
- [ ] (Optional) **A** records for `@` if you want **siciliabedda.com** (no www) to work.

---

## If it still doesn’t work

- **DNS check:** Use https://dnschecker.org and search for `www.siciliabedda.com`. You should see a CNAME to `davidclower.github.io` (may take time to appear globally).
- **GitHub:** In **Settings → Pages**, see if the custom domain shows as “Verified” or if GitHub reports a DNS problem.
- **Repo name:** If your repo is not `SiciliaBedda`, the default URL changes to `https://davidclower.github.io/YourActualRepoName/`. The CNAME value stays `davidclower.github.io` (no repo name in it).

If you tell me: (1) the exact GitHub repo URL you use for the site, and (2) whether you’ve added the CNAME at NameBright, I can suggest the next precise step.
