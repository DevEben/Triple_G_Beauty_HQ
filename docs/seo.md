# Search visibility

Production URL: https://triplegbeautyhq.vercel.app

`npm run build` creates complete HTML for the homepage, collection and every hairstyle, plus a noindex 404 page. It refreshes public/sitemap.xml and public/robots.txt automatically. Vercel serves these pages with clean URLs using vercel.json.

Titles, descriptions, canonical links, social previews and Organization/WebSite structured data are generated from src/lib/seo.ts. Change src/seo.config.ts when moving to a custom domain, then rebuild and redeploy. Do not add a blanket SPA rewrite: unknown URLs should retain a real 404 response.

After deploying:
1. Add https://triplegbeautyhq.vercel.app as a URL-prefix property in Google Search Console and complete Google's ownership verification.
2. Submit https://triplegbeautyhq.vercel.app/sitemap.xml.
3. Inspect the homepage URL and request indexing.
4. Keep the brand name and website link consistent on TikTok and other real business profiles.

Google decides when to crawl, index and rank pages. These changes improve discoverability; they do not guarantee a search position or immediate appearance. No address, reviews or ratings have been invented. Add verified business location details before considering local-business structured data.

The premium experience update adds the two supplied hairstyle pages (21 indexable URLs total), confirmed Gbagada/Lagos metadata, original logo, secondary contact line and area-served information. The older singular/plural brand names remain supported as aliases.
