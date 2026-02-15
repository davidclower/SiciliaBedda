# GitHub Pages – Make the site load (one-time fix)

The site was not loading because **GitHub Pages was building from a branch that did not have the JS and image files**. The full site is now on **both** `master` and `main`.

## Option A – Automatic (if you have a GitHub token)

In PowerShell, from this folder:

```powershell
$env:GITHUB_TOKEN = "your_github_personal_access_token"
.\Set-GitHubPagesMain.ps1
```

Use a token with **repo** scope (or fine-grained with **Pages** write). The script sets the Pages source to **main** and requests a build.

## Option B – Manual (one-time in the browser)

1. Open: **https://github.com/davidclower/SiciliaBedda/settings/pages**
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
3. Under **Branch**, select **`main`** (or **`master`**), and **`/ (root)`**.
4. Click **Save**.
5. Wait **1–2 minutes**, then visit **https://siciliabedda.com** and do a **hard refresh** (Ctrl+Shift+R or Cmd+Shift+R).

After this, the site should load with language switching, images, and all pages.
