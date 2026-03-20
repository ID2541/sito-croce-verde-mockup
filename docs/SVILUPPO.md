# Sviluppo Locale

## Prerequisiti

Assicurati di avere:

- Node.js `22.13.1`
- Corepack abilitato
- Docker disponibile
- una porta libera per `3000`, `3001`, `5432`, `5050`, `8025`

## 1. Preparazione ambiente

Usa il file root come sorgente di riferimento:

```powershell
Copy-Item .env.example .env
Copy-Item .env.example backend/.env
Copy-Item .env.example frontend/.env.local
```

Interpretazione corretta dei file:

- `.env` root: riferimento centrale e supporto a Docker Compose
- `backend/.env`: file realmente letto dal backend e dagli script custom
- `frontend/.env.local`: file realmente letto dal frontend

Variabili importanti:

### Backend

- `DATABASE_URL`
- `FRONTEND_ORIGIN`
- `TRAINING_ACCESS_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`

### Frontend

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ORGANIZATION_NAME`
- `NEXT_PUBLIC_ORGANIZATION_DESCRIPTION`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_CONTACT_ADDRESS`
- `NEXT_PUBLIC_PEC_EMAIL`
- `NEXT_PUBLIC_SERVED_AREA`

Nota:

- il backend legge principalmente `DATABASE_URL`
- il frontend usa `NEXT_PUBLIC_API_BASE_URL` e ha fallback su `http://localhost:3001`
- gli script custom del backend leggono `.env.local` oppure `.env` nella working directory `backend/`

## 2. Avvio servizi locali

```powershell
docker compose -f infra/docker/docker-compose.yml up -d
```

Servizi:

- PostgreSQL: `localhost:5432`
- pgAdmin: `http://localhost:5050`
- MailHog: `http://localhost:8025`

Per fermarli:

```powershell
docker compose -f infra/docker/docker-compose.yml down
```

## 3. Setup backend

```powershell
Set-Location backend
corepack pnpm install
corepack pnpm prisma migrate dev
corepack pnpm prisma:seed
corepack pnpm dev
```

Backend disponibile su `http://localhost:3001`.

### Creazione account admin

Il seed non crea automaticamente un admin a meno che non siano valorizzate le variabili dedicate.

Per creare o aggiornare un account:

```powershell
corepack pnpm admin:bootstrap -- admin@example.it una-password-sicura
```

Assicurati di avere `backend/.env` valorizzato prima di lanciare questo script.

Per creare un editor:

```powershell
corepack pnpm admin:bootstrap -- editor@example.it una-password-sicura editor
```

## 4. Setup frontend

In una seconda shell:

```powershell
Set-Location frontend
corepack pnpm install
corepack pnpm dev
```

Frontend disponibile su `http://localhost:3000`.

## 5. Verifica manuale minima

Controlli consigliati dopo il bootstrap:

1. Apri la home pubblica
2. Verifica che servizi, sedi e news si carichino
3. Esegui login su `/admin/login`
4. Apri `/admin/news`
5. Crea o modifica una news
6. Verifica `GET /api/health`

## Comandi utili

## Frontend

```powershell
corepack pnpm dev
corepack pnpm build
corepack pnpm typecheck
corepack pnpm ci:check
```

## Backend

```powershell
corepack pnpm dev
corepack pnpm build
corepack pnpm test
corepack pnpm typecheck
corepack pnpm prisma:generate
corepack pnpm prisma:studio
corepack pnpm prisma:seed
corepack pnpm ci:check
```

## Workflow dati e contenuti

### Dati reali

Vengono dal backend via Prisma/PostgreSQL:

- news
- servizi
- pagine
- sedi
- utenti e sessioni
- grant formazione

### Fallback mock

Il frontend ha fallback mock per:

- posts
- services
- locations

Questo significa che alcune pagine possono apparire funzionanti anche se il backend e irraggiungibile.

Conseguenza pratica:

- per sviluppo UI va bene
- per verifiche end-to-end bisogna sempre controllare anche il backend

## Gestione materiali formazione

Per generare un codice di accesso:

```powershell
Set-Location backend
corepack pnpm training:grant -- volontari-2026
```

Con scadenza esplicita:

```powershell
corepack pnpm training:grant -- volontari-2026 2026-12-31T23:59:59.000Z
```

Il comando stampa:

- label
- grant id
- data di scadenza
- codice di accesso in chiaro

Conserva il codice in modo sicuro: il valore in chiaro non viene recuperato dal database.

Nota:

- il grant formazione e separato dall'autenticazione admin
- il cookie usato per i materiali e `cv_training_access`, non `cv_session`

## Troubleshooting rapido

### Il frontend mostra dati ma il backend non e attivo

Probabile causa:

- stai vedendo fallback mock

Controlla:

- `NEXT_PUBLIC_API_BASE_URL`
- log console frontend
- risposta di `http://localhost:3001/api/health`

### Login fallisce sempre

Controlla:

- backend attivo
- `FRONTEND_ORIGIN` coerente con il dominio frontend
- account creato con `admin:bootstrap`
- password di almeno 12 caratteri

### Le API non mantengono la sessione

Controlla:

- cookie abilitati nel browser
- richieste con `credentials: include`
- origine frontend autorizzata dal backend
- presenza del cookie `cv_session` dopo il login

### `prisma migrate dev` fallisce

Controlla:

- Postgres attivo
- `DATABASE_URL` corretta
- porta `5432` libera o coerente con il compose

## CI e qualita

La CI valida `frontend` e `backend` separatamente con:

- install dipendenze
- `pnpm run ci:check`

Stato attuale:

- backend con test minimi
- frontend senza test automatici reali

Per questo motivo la verifica manuale dell'interfaccia resta importante.
