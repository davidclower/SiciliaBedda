# Sicilia Bedda Website Project — Materials & Notes
I want the site to be in English, Italian, and Sicilian (I want the User to be able to select language)
## Project Overview
- **Project Name:** Sicilia Bedda
- **Purpose:** A restrained, trust-forward website that signals seriousness and intent. Not a tourism site, not a real estate site, not a nonprofit site.
- **Target Audience (priority):**
  1) Comune / Sindaco / local community + Isnello property owners
  2) Donors/backers + partners
  3) Future long-stay guests
- **Primary job:** Build trust and communicate intent (no booking engine, no pricing, no fundraising embed yet).
- **Status:** Building v1

---

## Content Ideas & Materials

### Pages/Sections (v1)
- use the websites for inspiration and page structure

### Homepage (These are some of my thoughts, come up with compelling copy for this)
**SICILIA BEDDA**  
*Suli. Ventu. Mari.*

A social enterprise dedicated to restoring historic homes and revitalizing Sicilian village life—starting in Isnello.

#### The Idea
Across Sicily, especially in small inland borghi, historic homes are being lost—not to catastrophe, but to time, depopulation, and neglect. These buildings once held families, trades, and daily life. Today many stand empty, structurally sound but slowly fading.

Sicilia Bedda exists to reverse that quiet loss.

The project restores historic properties with care and restraint, returns them to active use, and reconnects them to the economic and cultural life of their communities. This is not development. It is stewardship.

The work begins in Isnello, a small mountain comune in the Madonie, where Sicilia Bedda already has a living model: a restored home that is inhabited, maintained, and woven into daily village life.

#### Why Isnello
Isnello is not a postcard village. It is real, intact, and deeply rooted.

Its historic center, stone buildings, and proximity to the Madonie Mountains reflect a way of life shaped by agriculture, craftsmanship, and community. Like many borghi, Isnello has lost population over time—but not its identity.

The Comune is actively supportive of responsible restoration, and local leadership recognizes that preservation paired with thoughtful use can help sustain the village’s future.

Starting here is intentional:
- The scale is human
- The relationships are personal
- The impact is visible

Isnello is not a test case. It is home.

---

## What Sicilia Bedda Does (Draft)
Sicilia Bedda focuses on three integrated activities:

### 1) Restoration of Historic Homes
Properties—often abandoned or underutilized—are acquired at modest cost and restored using local labor and traditional techniques wherever possible. Work prioritizes:
- Structural integrity
- Simplicity
- Longevity
- Respect for original materials and form

Restorations are modest, functional, and meant to endure—not impress.

### 2) Living Use, Not Speculation
Restored homes are placed back into use as:
- Long-stay accommodations for visitors seeking connection, not consumption
- Residencies for artists, writers, and craftspeople
- Gathering spaces for small cultural exchanges

Homes are not flipped. They are not short-term commodities. They remain part of the village fabric.

### 3) Community & Craft
Each restoration supports:
- Local tradespeople
- Nearby artisans (including ceramics, food, and craft traditions)
- Neighboring comuni such as Collesano and Castelbuono, strengthening regional ties

The goal is not to isolate Isnello, but to connect it authentically to its surroundings.

---

## Castelbuono, Collesano, and the Madonie (Draft)
Sicilia Bedda recognizes that villages thrive together.

Collesano brings living craft traditions, including ceramics and hands-on workshops.

Castelbuono represents cultural continuity and international visibility, with family enterprises like Fiasconaro demonstrating how tradition can scale without losing integrity.

The Madonie landscape anchors everything—geographically, historically, and emotionally.

Visitors are not “placed” in a village. They are invited into a living region.

---

## Funding the Work (Draft)
Sicilia Bedda is structured as a social enterprise.

Restorations are funded through a combination of:
- Founder capital
- Public crowdfunding (primarily for renovation work)
- Revenue from future stays and programs
- Select partnerships tied to Sicilian products and craftsmanship

Crowdfunded resources are directed specifically toward:
- Restoration labor
- Materials
- Preservation work

They are not used for speculative gain or property acquisition.

Transparency and restraint guide every phase.

---

## Why This Matters (Draft)
When a historic home is restored and lived in:
- Local trades are employed
- Nearby businesses gain customers
- Cultural memory is preserved
- A village gains confidence in its future

Small actions compound. One restored home leads to another. A cluster forms. A narrative changes.

This is how villages survive—not by becoming something else, but by remaining themselves.

---

## The Name (Draft)
Sicilia Bedda — Beautiful Sicily — is not a slogan.  
It is a responsibility.

The Trinacria seal reflects movement, balance, and continuity: land, wind, and sea. It is used sparingly, as a mark of intent rather than decoration.

---

## Looking Forward (Draft)
Sicilia Bedda is deliberately slow.

Growth will follow trust, not timelines. Each restoration must justify itself—to the village, to history, and to the future.

If successful, the model can be repeated elsewhere. If not, one village will still have gained something real.

Either outcome is honest.

---

## Design & Branding

### Tone & Language Rules
- Plain language
- Short paragraphs
- No buzzwords
- No “luxury” / no “exclusive”
- Avoid “curated experiences” phrasing (save for later)
- Write like speaking to the Sindaco at lunch
- Restraint = credibility

### Visual Direction
Use:
- Natural light
- Imperfect textures
- Stone, wood, plaster
- Views, not staging

Avoid:
- Stock photos
- Over-filtering
- People posing
- Anything that looks like Airbnb marketing

### Colors (placeholder)
- use the logo to influence the color palette (these are just suggestions)
- Background: warm plaster/stone
- Text: charcoal/ink
- Accent: terra/wax (sparingly)
- Highlight: ochre/gold (sparingly)

### Typography (placeholder)
- Headings: restrained, civic-feeling
- Body: clean and readable

### Logo/Assets
- The Logo is the PNG file in this directory (Use this to help determine a color scheme)

---

## Resources & Links (Inspiration)
- FAI (Fondo Ambiente Italiano): https://fondoambiente.it/
- Sextantio: https://www.sextantio.it/
- Alberghi Diffusi (ADI): https://www.alberghidiffusi.it/?lang=en

---

## Technical Notes
- Platform: (choose) Squarespace or Webflow
- Email: simple mailing list (Mailchimp or ConvertKit)
- Domain: siciliabedda.com
- No custom build yet. No booking engine yet. No GoFundMe embed yet.

---

## To-Do List
- [ ] Decide homepage hero tagline format
- [ ] Choose initial photo set (natural light, textures, views)
- [ ] Create v1 pages from draft copy
- [ ] Add email capture
- [ ] Add “Support a Restoration” page (principles only)
- [ ] create a blog section for subscribers to contribute
---

## Heritage Collection card images (Support page)

When adding or updating images for the Heritage Collection cards (Table, Village, Artisan), use this approach so the full image is visible and key details (e.g. branding on product) aren’t cropped:

1. **Use a dedicated image** for each collection (e.g. `Heritage Collection_Table.png` for Table Collection).
2. **Show the full image** with `object-fit: contain` (not `cover`) so nothing is cropped—bottle top, dish, recipe cards, etc. all visible.
3. **Align to top** with `object-position: top center` so if there’s letterboxing, the image sits at the top.
4. **Match letterboxing to the page** with `background: #faf8f5` so any empty space blends in.

In `support.html`: give the image a class like `collection-image-table` (or `collection-image-village`, `collection-image-artisan`) and in CSS add:

```css
.collection-image-table { object-fit: contain; object-position: top center; background: #faf8f5; }
```

Apply the same pattern for Village and Artisan when you add their dedicated images.

---

## Notes
- Primary trust beliefs: stewardship (not speculation), respectful restoration (not altered), proper and transparent (Comune not being used).
- Seal usage: like a notary stamp—header small, footer, occasional dividers. Not wallpaper.
