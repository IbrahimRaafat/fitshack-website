# FitShack SEO Improvement Plan

## Current Status
- Site: `https://www.fitshackegypt.com`
- Framework: Next.js 16 (static export)
- Verified on Google Search Console
- Sitemap & robots.txt submitted

## What's Done
- [x] Metadata: title, description, keywords, Open Graph, Twitter cards
- [x] JSON-LD structured data (Restaurant schema)
- [x] sitemap.xml and robots.txt
- [x] Hidden semantic content for crawlers
- [x] Descriptive image alt text with location keywords
- [x] Favicon and apple-touch-icon

---

## Priority 1: Technical SEO (Week 1-2)

### Page Speed
- [ ] Run Lighthouse audit and fix any issues
- [ ] Convert menu images to WebP format (smaller file size, same quality)
- [ ] Add `loading="lazy"` to below-fold images
- [ ] Enable Vercel Edge caching headers
- [ ] Minify and compress assets (Vercel does this by default)

### Mobile Optimization
- [ ] Test mobile experience on real devices
- [ ] Ensure touch targets are 48px minimum
- [ ] Verify no horizontal scroll on any screen size

### Core Web Vitals
- [ ] Monitor LCP (Largest Contentful Paint) — target < 2.5s
- [ ] Monitor CLS (Cumulative Layout Shift) — target < 0.1
- [ ] Monitor INP (Interaction to Next Paint) — target < 200ms

---

## Priority 2: Content SEO (Week 2-4)

### Landing Content
- [ ] Add an "About" section or page with story, mission, values
- [ ] Add a "Locations" section with full address, map embed, directions
- [ ] Add individual menu item pages with structured data (MenuSection schema)
- [ ] Add a blog section for healthy eating tips (drives organic traffic)

### Keyword Targeting
- [ ] Create content clusters around:
  - "healthy food hurghada"
  - "healthy restaurant sahl hashish"
  - "vegan food hurghada"
  - "keto food hurghada"
  - "fitness food hurghada"
  - "healthy sandwiches egypt"
- [ ] Add FAQ section (can appear as rich snippets)
- [ ] Add customer testimonials/reviews section

### Local SEO
- [ ] Create Google Business Profile (if not done)
- [ ] Add full NAP (Name, Address, Phone) in footer
- [ ] Embed Google Map on location page
- [ ] Encourage customers to leave Google reviews
- [ ] Add LocalBusiness schema with geo-coordinates

---

## Priority 3: Off-Page SEO (Week 4-8)

### Google Business Profile
- [ ] Claim and verify listing on Google Maps
- [ ] Add photos, hours, menu link, website link
- [ ] Post updates regularly (Google rewards active profiles)
- [ ] Respond to all reviews

### Backlinks
- [ ] Submit to local business directories (Egypt, Hurghada)
- [ ] Get listed on food delivery platforms (if applicable)
- [ ] Reach out to local food bloggers for features
- [ ] Partner with hotels in Sahl Hashish for referrals

### Social Signals
- [ ] Keep Instagram active (post 3-5x/week)
- [ ] Cross-post to Facebook
- [ ] Add social share buttons to the site
- [ ] Encourage user-generated content (customers posting meals)

---

## Priority 4: Advanced SEO (Month 2-3)

### Structured Data Expansion
- [ ] Add `Menu` schema with individual `MenuItem` entries
- [ ] Add `AggregateRating` schema (when reviews come in)
- [ ] Add `Event` schema for any special promotions

### International SEO
- [ ] Add `hreflang` tags if targeting Arabic-speaking audience
- [ ] Consider Arabic version of the site (`/ar/`)

### Analytics & Monitoring
- [ ] Connect Google Analytics 4 (GA4)
- [ ] Set up Google Search Console email alerts
- [ ] Track keyword rankings weekly
- [ ] Monitor competitor rankings

### Content Calendar
- [ ] Blog post ideas:
  - "Top 10 Healthy Restaurants in Hurghada"
  - "Best Vegan Food in Sahl Hashish"
  - "Keto-Friendly Meals You Can Find in Hurghada"
  - "Why Healthy Food Tastes Better at FitShack"
  - "A Day of Healthy Eating at FitShack"

---

## Quick Wins (Do This Week)
1. Submit site to Google Business Profile
2. Add `loading="lazy"` to menu images
3. Convert images to WebP
4. Add FAQ section to the homepage
5. Ask 5 happy customers to leave Google reviews

---

## Tracking Checklist
| Metric | Target | Tool |
|--------|--------|------|
| Indexed pages | 1+ | Search Console |
| Organic traffic | 100+/month by month 3 | GA4 |
| Lighthouse score | 90+ | PageSpeed Insights |
| LCP | < 2.5s | PageSpeed Insights |
| CLS | < 0.1 | PageSpeed Insights |
| Google reviews | 10+ by month 2 | Google Business Profile |
| Backlinks | 10+ by month 3 | Ahrefs / SEMrush |
