# Frontend DEV

## Prerequisiti
- Backend attivo su `http://localhost:3001`
- Variabile `NEXT_PUBLIC_API_BASE_URL` configurata (default fallback: `http://localhost:3001`)

## Comandi principali
1. `cd frontend`
2. `corepack pnpm install`
3. `corepack pnpm dev`

Frontend disponibile su `http://localhost:3000`.

## Flussi admin
- Login: `/admin/login`
- Dashboard: `/admin`
- News list: `/admin/news`
- Nuova news: `/admin/news/new`
- Modifica news: `/admin/news/[id]/edit`

Il middleware protegge le route `/admin/*` verificando il cookie `cv_session`.