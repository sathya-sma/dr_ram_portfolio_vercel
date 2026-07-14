# Dr. T. Ramkumar — Consultant Gastrointestinal Surgeon

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

The form posts to [`api/book-appointment.ts`](api/book-appointment.ts), a Vercel
serverless function that emails the clinic via [Resend](https://resend.com). Nothing
email-related runs in the browser — the API key never reaches the client.

1. Create a free Resend account and API key.
2. Copy `.env.example` to `.env` and set `RESEND_API_KEY` and `CLINIC_NOTIFY_EMAIL`
   (the inbox that should receive appointment requests).
3. Set the same two variables in the Vercel project's Environment Variables and redeploy.
4. Optional: verify a sending domain in Resend and set `RESEND_FROM_EMAIL` — until
   then, mail sends from Resend's shared sandbox address (works immediately, weaker
   deliverability/branding than a verified domain).

Locally, `npm run dev` (plain Vite) does not run the `/api` function — use
`vercel dev` instead if you need to exercise the real email path before deploying.

### Going live on a custom domain

Replace `https://dr-ram-portfolio-vercel.vercel.app` in:

- `SITE_URL` in `src/lib/site.ts`
- the canonical/OG/Twitter/JSON-LD URLs in `index.html`
- `public/sitemap.xml` and `public/robots.txt`

then add the domain in Vercel and let the old `*.vercel.app` host redirect to it.

## Deployment

Deployed on Vercel. Security headers, caching and SPA rewrites are configured in
[`vercel.json`](vercel.json). Analytics is provided by `@vercel/analytics`
(pageviews plus `call_click`, `whatsapp_click` and `appointment_request` events).
