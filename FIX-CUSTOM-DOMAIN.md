# Fix: www.siciliabedda.com not loading

Your site **does** work at: **https://davidclower.github.io/SiciliaBedda/**  
DNS is correct (www → davidclower.github.io). The problem is getting the custom domain to work with GitHub Pages.

---

## Check first (current repo)

1. **https://github.com/davidclower/SiciliaBedda** → **Settings** → **Pages**
2. Confirm **Build and deployment**: Source = **Deploy from a branch**, Branch = **master**, Folder = **/ (root)**.
3. Under **Custom domain**, confirm **www.siciliabedda.com** is set and click **Save** if you change anything.
4. If you see "Certificate is being generated," wait 15–20 minutes, then try again in a **private/incognito** window.
5. Try with **Enforce HTTPS** **unchecked** once (then open http://www.siciliabedda.com). If that loads, turn Enforce HTTPS back on and wait for the certificate.

---

## Plan B: Use a user site (often fixes custom domain)

GitHub serves **user sites** (repo name **username.github.io**) at the root. Custom domains often work more reliably with that setup. Your CNAME already points to **davidclower.github.io**, so a user-site repo will be what that hostname serves.

**Steps:**

1. **Create a new repo** on GitHub named **exactly**: **davidclower.github.io**  
   (GitHub → New repository → Repository name: `davidclower.github.io` → Create)

2. **Push this project into that repo** (same content as SiciliaBedda). From your project folder:
   - `git remote add user-site https://github.com/davidclower/davidclower.github.io.git`
   - `git push user-site master`
   (If the new repo has a README, you may need to force push: `git push user-site master --force`)

3. In the **davidclower.github.io** repo: **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **master**, Folder: **/ (root)**
   - Custom domain: **www.siciliabedda.com** → **Save**

4. Wait a few minutes. Your **CNAME** (www → davidclower.github.io) is already correct, so **https://www.siciliabedda.com** should start serving the site.

5. (Optional) Keep **SiciliaBedda** as a backup or delete it later. The live site will be from **davidclower.github.io**.

---

## Direct link (works now)

**https://davidclower.github.io/SiciliaBedda/**
