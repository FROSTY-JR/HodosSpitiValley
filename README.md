# Hódos travel website

A photo-led travel website with a cursor-responsive Hampi-inspired hero, Varkala and Spiti trip pages, Originals, and an interactive Varkala photo journal.

## Develop

Use Node.js 22.13 or newer (Node 22 LTS recommended).

```sh
npm ci
npm run dev
```

## Netlify

1. In Netlify choose **Add new project > Import an existing project > GitHub**.
2. Select **FROSTY-JR/HodosSpitiValley** and the branch containing this update.
3. Leave the base directory empty. Build command: `npm run build:netlify`. Publish directory: `dist/client`.
4. Deploy. `netlify.toml` already supplies these settings and Node 22. No API keys or environment secrets are needed.
5. Open the generated Netlify URL. Test `/curated/spiti`, `/curated/varkala`, and `/originals` directly.

For manual Netlify Drop: run `npm run build:netlify`, then upload the contents of `dist/client`. Git import is preferred because it applies the Netlify headers and route configuration automatically.

The Netlify build exports static HTML, CSS, JavaScript and assets. Do not deploy `dist/server` to Netlify or use the standard Sites `npm run build` output there. The static export includes all three dynamic destination slugs through `generateStaticParams`. No backend, payment processing, form storage, private authentication or API keys are required by the website.

## Existing Sites hosting

`npm run build` retains the separate Cloudflare/Sites build. `.openai/hosting.json` contains non-secret site configuration only. Netlify builds skip the Sites and Cloudflare runtime plugins. Existing Sites private access does not transfer to Netlify; choose the Netlify site's access settings in its dashboard.

## Content and contact

- Contact: +91 76763 93083 (`tel:+917676393083`), in footer and enquiry sections.
- Spiti dates and pricing remain unannounced. Verify Varkala dates, availability, villa and departure timing before promoting a departure.
- The Hampi hero is an imagined artwork with WebGL parallax, not a scanned 3D monument. Pointer motion pauses off-screen, in hidden tabs and under reduced-motion preferences.
- Logo: supplied Hódos artwork, trimmed only for transparent padding and resized for the web.
- Asset sources: `SPITI-ASSETS.md` and `VARKALA-VISUALS.md`. External Unsplash images and Google Fonts still require network access. User-supplied itinerary imagery and the supplied journal renderer should have appropriate publishing rights.

## Checks

```sh
npm run typecheck
npm run build:netlify
npm audit --omit=dev
```

Local scratch folders, generated builds, environment files and credentials are excluded from version control. Never put access tokens in source, remote URLs, or frontend environment variables.
