# DJ ASH — Electric DJ Portfolio & Booking Platform

A premium, cinematic DJ portfolio site: dark neon UI, animated hero, a real music player, video gallery, events, pricing, a booking/contact form, and a full admin CMS behind a login. Built with Next.js 14 (App Router), Tailwind CSS, Framer Motion, and Three.js.

## A note on branding

The original brief asked for Pokémon-themed branding and character art ("Ash," "Pikachu," anime Pokémon-trainer visuals). Pikachu and Ash Ketchum are Nintendo/Pokémon copyrighted characters and trademarks, so this build keeps the artist name **DJ ASH** but replaces the Pokémon-specific elements with an original "Electric Energy" concept: neon-yellow lightning, particle effects, and a 3D energy visual instead of a Pokémon character. The name, tagline, and all copy live in one place (Admin → Settings) so you can make it fully your own.

## What's included

- **Home** — full-screen animated hero (3D energy core, particles, lightning, a tour ticker), featured music/video previews, next-event highlight, pricing, contact
- **Music** — real audio player: play/pause/skip/seek/volume/playlist, plus a live Web Audio equalizer that reacts to the actual track
- **Video & photo gallery** — categorized video grid with fullscreen playback, plus a photo gallery
- **Events** — upcoming/past tabs, calendar-style date stubs, the next event auto-highlighted
- **Pricing** — package cards with a services list and book buttons
- **Contact** — booking form (name, phone, email, event date, event type, message), WhatsApp button, social links
- **Admin panel** (`/admin`) — JWT-secured login, dashboard, and full CRUD for songs, videos, gallery, events, packages, contact messages (read/unread + delete), and site settings (name, tagline, phone, WhatsApp, socials, hero text)

## Tech stack

- Next.js 14 (App Router) + React 18
- Tailwind CSS + Framer Motion
- Three.js / React Three Fiber (hero 3D visual)
- JWT auth via `jose`, password hashing via `bcryptjs`
- Local file storage for uploads (`public/uploads`)
- A lightweight built-in JSON data store — no external database to set up (see below)

## Getting started

```bash
npm install
cp .env.example .env      # then edit .env — see "Environment variables" below
npm run db:seed           # creates your admin login + a couple of sample records
npm run dev                # http://localhost:3000
```

Admin login is at `/admin/login`, using the `ADMIN_EMAIL` / `ADMIN_PASSWORD` that were in `.env` when you ran `db:seed`. There's no hard-coded fallback for either value — if `.env` is missing or incomplete, `npm run db:seed` (and `npm run dev` / `npm run build`, once you actually try to log in) will stop immediately and tell you exactly which variable is missing, rather than quietly using a default password.

For production:

```bash
npm run build
npm run start
```

## About the data layer

This project ships with a small, dependency-free JSON file store (`src/lib/db.js`, writing to `data/db.json`) instead of Postgres/MongoDB. That's deliberate: the whole project runs the moment you `npm install`, with no database server, connection string, or hosting account required first.

`prisma/schema.prisma` is included as a **reference schema** — every model there matches a collection in `db.js` one-to-one, so it documents the intended production data model even though it isn't wired up yet.

### Scaling to a real database

When you're ready for production traffic (or need multiple servers sharing one dataset), swap in Prisma + Postgres:

1. `npm install prisma @prisma/client`
2. `npx prisma init`, then use the schema already in `prisma/schema.prisma` (add a real `DATABASE_URL`)
3. `npx prisma generate && npx prisma db push`
4. Replace the export in `src/lib/db.js` with a Prisma client, keeping the same `db.model.method()` call shape used everywhere — most API route files won't need to change at all.

## Folder structure

```
src/
  app/
    (site)/         public pages (home, music, gallery, events, pricing, contact)
    admin/           admin panel pages
    api/             REST API routes (songs, videos, gallery, events, packages, contact, settings, auth)
  components/        UI components
  lib/               db.js (data layer), auth.js (JWT), config.js (validated env access), upload.js (file handling)
  middleware.js      protects /admin routes
prisma/schema.prisma reference schema for a future Postgres/MySQL upgrade
scripts/
  config.js          validates required env vars for standalone scripts
  seed.js            creates your admin account + sample data
public/uploads/      uploaded mp3/mp4/images land here
```

## Environment variables

None of this project's secrets are hard-coded anywhere in the source — everything sensitive is loaded from `.env`, which is git-ignored and must never be committed. `src/lib/config.js` (app runtime) and `scripts/config.js` (seed script) are the only two places that read these values, and both refuse to run if something required is missing.

**Setup:**
```bash
cp .env.example .env
```
Then open `.env` and replace every placeholder with a real value. To generate a strong `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

| Variable | Required | Purpose |
|---|---|---|
| `JWT_SECRET` | Yes | Signs admin session tokens. The app throws a clear error the moment it's needed (login, or visiting `/admin`) if this isn't set — there's no insecure default. |
| `ADMIN_EMAIL` | Yes | Used only by `npm run db:seed` to create your admin login. |
| `ADMIN_PASSWORD` | Yes | Used only by `npm run db:seed`. Hashed with bcrypt before being stored — the plain password is never written to disk, logged, or returned by any API response. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | **Not a secret** — this is your public contact number, meant to be visible in the browser. Never put a real secret in a `NEXT_PUBLIC_*` variable; anything with that prefix is bundled into client-side JavaScript and visible to anyone. |

**If you've ever committed a real `.env` (or any real password) to GitHub** — removing it from your current files is not enough on its own; it's still readable in that repo's commit history for anyone who clones it. Treat that password as compromised: set a new `ADMIN_PASSWORD` in `.env` and run `npm run db:seed` again to overwrite the stored hash. For a public repo, assume the old one has already leaked and rotate it immediately rather than trying to scrub history.

## Before a real launch

- **Large file uploads**: Next.js Route Handlers have a default body-size ceiling. For large video files at scale, raise it or move to direct-to-cloud-storage uploads (S3/Cloudinary) — `src/lib/upload.js` is the one place to change.
- **Backups**: uploads and data live on local disk (`public/uploads/`, `data/db.json`) — back these up regularly, or move to cloud storage + Postgres as above.
- **Email/SMS alerts**: contact form submissions land in the admin panel but don't currently trigger a notification — wire up a provider like Resend or Twilio in `src/app/api/contact/route.js` if you want instant alerts.
- **Spam protection**: consider adding a CAPTCHA or rate limit to the public contact form.
- **Rotate `ADMIN_PASSWORD`** before any real deployment if you ever used a throwaway value while testing locally — there's no password-reset flow yet, so just update `.env` and re-run `npm run db:seed`.
- Run `npm audit` before launch; it flagged 2 known advisories in transitive dependencies at time of writing, worth reviewing against current versions.

## Design system

- Colors, fonts, and animation tokens live in `tailwind.config.js` (look for `void`, `volt`, `plasma`, `cyanpulse`)
- Fonts: Orbitron for the artist wordmark, Rajdhani for headings/UI, Inter for body text — loaded via Google Fonts in `src/app/layout.js`
