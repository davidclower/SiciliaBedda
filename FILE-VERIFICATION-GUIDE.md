# Website File Verification Guide

## Problem
Files sometimes disappear from the repository, causing the website to fail loading. This guide helps prevent and fix this issue.

## Solution
We've created automated scripts to verify and restore missing files.

## Quick Start

### Before Every Commit
**Always run this before committing:**
```powershell
.\pre-commit-check.ps1
```

If files are missing, it will tell you. Then run:
```powershell
.\restore-missing-files.ps1
```

Then verify again:
```powershell
.\verify-website-files.ps1
```

## Scripts Explained

### 1. `verify-website-files.ps1`
**Purpose:** Checks that all critical files exist.

**When to use:**
- Before committing changes
- After pulling from git
- When the website isn't loading

**What it checks:**
- All main HTML pages (index.html, support-cause.html, etc.)
- JavaScript files (language.js, shopping-cart.js, translations.js)
- CSS files (styles.css)
- API files (create-checkout-session.js, contact.js)
- Critical images (SiciliaBedda_Logo.PNG)

**Output:**
- ✅ Green = File exists
- ❌ Red = Critical file missing (must fix)
- ⚠️ Yellow = Warning (file missing but may not break site)

### 2. `restore-missing-files.ps1`
**Purpose:** Automatically restores missing files from numbered backups.

**When to use:**
- When `verify-website-files.ps1` reports missing files
- After git operations that cause files to disappear

**What it does:**
- Checks if main files exist
- If missing, finds the latest numbered backup (e.g., `support-cause 48.html`)
- Copies the backup to the main file name (e.g., `support-cause.html`)

**Files it can restore:**
- `index.html` → from `index 3.html` or `index 2.html`
- `support-cause.html` → from `support-cause 48.html` (or earlier backups)
- `about.html` → from `about 2.html`
- `contact.html` → from `contact 2.html`
- `language.js` → from `language 2.js`
- `translations(1).js` → from `translations(1) 44.js` (or earlier backups)
- And more...

### 3. `pre-commit-check.ps1`
**Purpose:** Wrapper script that runs verification before commits.

**When to use:**
- Run manually before `git commit`
- Can be integrated into git hooks (see below)

## Workflow

### Normal Workflow
```powershell
# 1. Make your changes
# ... edit files ...

# 2. Verify files before committing
.\pre-commit-check.ps1

# 3. If verification passes, commit
git add -A
git commit -m "Your message"
git push
```

### If Files Are Missing
```powershell
# 1. Check what's missing
.\verify-website-files.ps1

# 2. Restore missing files
.\restore-missing-files.ps1

# 3. Verify again
.\verify-website-files.ps1

# 4. Now commit
git add -A
git commit -m "Your message"
git push
```

## Git Hook Setup (Optional)

To automatically check files before every commit, you can set up a git hook:

### Windows PowerShell Hook
The `.git\hooks\pre-commit` file is already created. However, git hooks on Windows may need special handling.

**Manual check before commit (recommended):**
Just run `.\pre-commit-check.ps1` before committing.

## Troubleshooting

### "File disappeared after commit"
1. Run `.\restore-missing-files.ps1`
2. Run `.\verify-website-files.ps1` to confirm
3. Commit the restored files

### "Website shows 404 errors"
1. Run `.\verify-website-files.ps1` to see what's missing
2. Run `.\restore-missing-files.ps1` to restore
3. Test locally: `python -m http.server 8000`
4. Visit `http://localhost:8000` to verify

### "Restore script can't find backup"
- Check if numbered backup files exist (e.g., `support-cause 48.html`)
- If backups are missing, check git history: `git log --all --full-history -- support-cause.html`
- Restore from git: `git checkout HEAD -- support-cause.html`

## Prevention Tips

1. **Always verify before committing:**
   ```powershell
   .\pre-commit-check.ps1
   ```

2. **Check after pulling:**
   ```powershell
   git pull
   .\verify-website-files.ps1
   ```

3. **If files disappear, restore immediately:**
   ```powershell
   .\restore-missing-files.ps1
   ```

## Files That Must Always Exist

### HTML Pages
- `index.html` - Homepage
- `about.html` - About page
- `contact.html` - Contact page
- `support-cause.html` - Support page (most critical)
- `castelbuono.html`, `collesano.html`, `isnello.html`
- `parco-madonie.html`, `sicily.html`
- `current-restoration 12.html`

### JavaScript
- `language.js` - Language switching
- `translations.js` - Translation data
- `translations(1).js` - Referenced in HTML files
- `shopping-cart.js` - Shopping cart functionality

### CSS
- `styles.css` - Main stylesheet

### API
- `api/create-checkout-session.js` - Stripe checkout
- `api/contact.js` - Contact form handler

### Images
- `SiciliaBedda_Logo.PNG` - Logo

## Summary

**Before every commit:**
1. Run `.\pre-commit-check.ps1`
2. If files are missing, run `.\restore-missing-files.ps1`
3. Verify again with `.\verify-website-files.ps1`
4. Then commit and push

This will prevent the website from breaking due to missing files!
