# SITO-CROCE-VERDE

Portale web per Croce Verde con:

- sito pubblico
- area admin editoriale
- backend API separato
- accesso controllato ai materiali formativi

Il repository contiene due applicazioni Next.js indipendenti:

- `frontend/`: UI pubblica e admin su `http://localhost:3000`
- `backend/`: API, auth, Prisma/Postgres e download su `http://localhost:3001`

## Documentazione

La documentazione principale del progetto e tutta in italiano:

- [docs/README.md](docs/README.md): indice della documentazione
- [docs/ONBOARDING.md](docs/ONBOARDING.md): presa in carico rapida e handoff
- [docs/ARCHITETTURA.md](docs/ARCHITETTURA.md): architettura, flussi e decisioni chiave
- [docs/SVILUPPO.md](docs/SVILUPPO.md): setup locale, env, comandi e troubleshooting
- [docs/API.md](docs/API.md): riferimento endpoint backend e contratti usati dal frontend

Documentazione locale di supporto:

- [frontend/docs/DEV.md](frontend/docs/DEV.md)
- [frontend/docs/README.md](frontend/docs/README.md)
- [backend/docs/DEV.md](backend/docs/DEV.md)

## Struttura repository

```text
.
|-- backend/
|   |-- prisma/              # schema, migration, seed
|   |-- scripts/             # bootstrap admin e grant materiali
|   |-- src/app/api/         # route handlers HTTP
|   |-- src/lib/             # auth, response helpers, validators, db
|   `-- tests/               # test Node built-in
|-- frontend/
|   |-- docs/                # audit, sitemap, report implementativo
|   |-- public/images/       # asset generated e placeholder
|   |-- src/app/             # route App Router pubbliche e admin
|   |-- src/components/      # blocchi UI, layout, admin, training
|   |-- src/content/mock/    # fallback mock per contenuti pubblici
|   `-- src/lib/api/         # client HTTP verso backend
|-- infra/docker/
|   `-- docker-compose.yml   # Postgres, pgAdmin, MailHog
|-- docs/
`-- .github/workflows/ci.yml
```

## Stack

- Node.js `22.13.1`
- pnpm `9.15.4`
- Next.js `15.2`
- React `19`
- TypeScript `5.8`
- Prisma `6.4`
- PostgreSQL `17` in locale via Docker Compose
- MailHog per test email locali

## Come funziona il sistema

### Frontend

- espone le route pubbliche e le route admin in App Router
- consuma il backend via `NEXT_PUBLIC_API_BASE_URL`
- per `posts`, `services` e `locations` usa fallback automatico ai mock locali se il backend non risponde
- per auth admin e materiali formazione dipende dal backend reale

### Backend

- gestisce contenuti, sessioni e grant materiali
- usa cookie HTTP-only per sessione admin (`cv_session`) e accesso formazione (`cv_training_access`)
- applica RBAC lato API e rate limit su login e sblocco materiali

### Infra locale

- `postgres`: database applicativo
- `pgadmin`: ispezione DB
- `mailhog`: SMTP/UI per test locali

## Avvio rapido

### Prerequisiti

- Node.js `22.13.1`
- Corepack abilitato
- Docker Desktop o equivalente

### 1. Prepara i file ambiente

```powershell
Copy-Item .env.example .env
Copy-Item .env.example backend/.env
Copy-Item .env.example frontend/.env.local
```

Variabili minime da valorizzare:

- `DATABASE_URL`
- `FRONTEND_ORIGIN`
- `TRAINING_ACCESS_SECRET`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SITE_URL`

Nota:

- `backend/.env` e il file realmente letto dal backend e dagli script custom lanciati da `backend/`
- `frontend/.env.local` e il file realmente letto dal frontend
- `.env` root resta utile come riferimento generale e per Docker Compose

### 2. Avvia i servizi locali

```powershell
docker compose -f infra/docker/docker-compose.yml up -d
```

Servizi disponibili:

- PostgreSQL: `localhost:5432`
- pgAdmin: `http://localhost:5050`
- MailHog: `http://localhost:8025`

### 3. Avvia il backend

```powershell
Set-Location backend
corepack pnpm install
corepack pnpm prisma migrate dev
corepack pnpm prisma:seed
corepack pnpm admin:bootstrap -- admin@example.it una-password-sicura
corepack pnpm dev
```

### 4. Avvia il frontend

In una seconda shell:

```powershell
Set-Location frontend
corepack pnpm install
corepack pnpm dev
```

## Comandi principali

### Frontend

```powershell
corepack pnpm dev
corepack pnpm build
corepack pnpm typecheck
corepack pnpm ci:check
```

### Backend

```powershell
corepack pnpm dev
corepack pnpm build
corepack pnpm test
corepack pnpm prisma migrate dev
corepack pnpm prisma:seed
corepack pnpm admin:bootstrap -- <email> <password> [admin|editor]
corepack pnpm training:grant -- <label> [expiresAtISO]
corepack pnpm ci:check
```

## CI e stato qualita

La pipeline in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) esegue, per `frontend` e `backend`:

- install dipendenze
- `pnpm run ci:check`

Stato attuale:

- backend con typecheck, test minimi e build
- frontend con typecheck e build, ma senza test automatici reali

## Limiti attuali

- nessun deploy applicativo completo documentato nel repo
- `infra/` copre solo i servizi di supporto locali
- il frontend pubblico puo degradare su mock e quindi apparire sano anche con backend giu
- la copertura test frontend e assente

## Dove andare adesso

- Per prendere in carico il progetto: [docs/ONBOARDING.md](docs/ONBOARDING.md)
- Per capire il sistema: [docs/ARCHITETTURA.md](docs/ARCHITETTURA.md)
- Per setup e troubleshooting: [docs/SVILUPPO.md](docs/SVILUPPO.md)
- Per endpoint e contratti: [docs/API.md](docs/API.md)
