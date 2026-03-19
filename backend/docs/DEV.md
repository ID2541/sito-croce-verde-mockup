# Backend DEV

## Prerequisiti
- PostgreSQL attivo su `localhost:5432`
- `DATABASE_URL` impostata
- `TRAINING_ACCESS_SECRET` impostata

## Comandi principali
1. `cd backend`
2. `corepack pnpm install`
3. `corepack pnpm prisma migrate dev`
4. `corepack pnpm prisma:seed`
5. `corepack pnpm admin:bootstrap -- admin@example.it una-password-sicura`
6. `corepack pnpm training:grant -- volontari-2026`
7. `corepack pnpm dev`

Backend disponibile su `http://localhost:3001`.

## Endpoint principali
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET|POST /api/posts`
- `GET|PATCH|DELETE /api/posts/:id`
- `GET /api/posts/by-slug/:slug`
- `GET /api/services` + `GET /api/services/by-slug/:slug`
- `GET /api/pages` + `GET /api/pages/by-slug/:slug`
- `GET /api/locations` + `GET /api/locations/by-slug/:slug`
- `GET|POST|DELETE /api/training/access`

## Bootstrap account
- Nessun account admin viene creato di default dal seed.
- Usa `pnpm admin:bootstrap` per creare o aggiornare un account `ADMIN` o `EDITOR`.

## Accesso formazione
- I download non usano piu una password semestrale condivisa.
- Usa `pnpm training:grant -- <label> [expiresAtISO]` per generare un grant revocabile con codice univoco.
