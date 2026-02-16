# Sicilia Bedda – Site Structure

## Canonical Pages (edit these only)

| File | URL | Description |
|------|-----|-------------|
| `index.html` | `/` | Home |
| `about.html` | `/about` | Our Founder |
| `sicily.html` | `/sicily` | Sicily |
| `parco-madonie.html` | `/parco-madonie` | Parco delle Madonie |
| `isnello.html` | `/isnello` | Isnello |
| `collesano.html` | `/collesano` | Collesano |
| `castelbuono.html` | `/castelbuono` | Castelbuono |
| `current-restoration.html` | `/current-restoration` | Current Restorations |
| `support-cause.html` | `/support` | Support Our Cause |
| `contact.html` | `/contact` | Contact Us |

## Config Files

| File | Purpose |
|------|---------|
| `vercel.json` | Routing for Vercel (production) |
| `server.js` | Local dev server – `npm run dev` |
| `package.json` | Dependencies |

## Scripts

| Script | Purpose |
|--------|---------|
| `language.js` | Language switcher |
| `translations(1).js` | Translation strings |
| `translations-data.js` | Alternative translations (some pages) |

## API (serverless)

- `api/contact.js` – Contact form
- `api/stripe-checkout.js` – Donations/Heritage Collection

## How to Update

1. **Edit content** – Change the canonical `.html` file for that page.
2. **Add a page** – Create `newpage.html`, add to `server.js` and `vercel.json`.
3. **Deploy** – Push to GitHub; Vercel deploys automatically. Or run `.\commit-and-push.ps1` (for iCloud sync issues).

## Do Not

- Create numbered copies (`about 2.html`, `sicily(1).html`).
- Store secrets in repo – use `.env` (gitignored).

# Cleanup

Run `.\CLEANUP-REPO.ps1` to sync current-restoration.html. Use `-RemoveDuplicates` to remove extra vercel*.json files. Duplicate HTML (e.g. `about (1) 2.html`) can be deleted manually once canonical files are confirmed correct.
