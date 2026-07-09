# Dr T Ramkumar — Consultant Gastrointestinal Surgeon

Single-page marketing site for Chennai Speciality Clinic, built with React 19, Vite 6 and Tailwind CSS v4. British English is the copy standard throughout.

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

## Configuration

All clinic contact details (phone, WhatsApp, address, review URL, site URL) live in
[`src/lib/site.ts`](src/lib/site.ts) — update them there, never inside components.

### Appointment form email delivery

The form emails enquiries via [Web3Forms](https://web3forms.com):

1. Create a free access key using the clinic's email address.
2. Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_ACCESS_KEY`.
3. Set the same variable in the Vercel project's Environment Variables and redeploy.

Until the key is configured, the form falls back to opening WhatsApp with the
enquiry pre-filled, so requests still reach the clinic.

### Going live on a custom domain

Replace `https://dr-ramkumar.vercel.app` in:

- `SITE_URL` in `src/lib/site.ts`
- the canonical/OG/Twitter/JSON-LD URLs in `index.html`
- `public/sitemap.xml` and `public/robots.txt`

then add the domain in Vercel and let the old `*.vercel.app` host redirect to it.

## Deployment

Deployed on Vercel. Security headers, caching and SPA rewrites are configured in
[`vercel.json`](vercel.json). Analytics is provided by `@vercel/analytics`
(pageviews plus `call_click`, `whatsapp_click` and `appointment_request` events).
