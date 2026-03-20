# Onboarding e handoff

## A chi serve

Questo documento e pensato per:

- chi deve avviare il progetto da zero
- chi prende in carico frontend o backend
- chi deve fare handoff operativo senza contesto storico

## In 10 minuti: cosa devi sapere

1. Non esiste una app unica: `frontend` e `backend` vanno avviati separatamente.
2. Il frontend pubblico puo funzionare in fallback mock anche se il backend e spento.
3. L'admin e i materiali formazione richiedono backend, DB e cookie funzionanti.
4. La base dati si prepara dal `backend` con Prisma.
5. I servizi locali dipendono da Docker Compose in `infra/docker`.

## Lettura minima consigliata

### Percorso rapido

1. [../README.md](../README.md)
2. [ARCHITETTURA.md](ARCHITETTURA.md)
3. [SVILUPPO.md](SVILUPPO.md)
4. [API.md](API.md)
5. [../frontend/docs/sitemap.md](../frontend/docs/sitemap.md)

### Se lavori soprattutto sul frontend

1. `frontend/src/app`
2. `frontend/src/lib/api`
3. `frontend/src/content/mock`
4. `frontend/src/components`

### Se lavori soprattutto sul backend

1. `backend/prisma/schema.prisma`
2. `backend/src/app/api`
3. `backend/src/lib/auth`
4. `backend/src/lib/validators`

## Setup passo-passo

### 1. Prepara runtime e servizi

```powershell
corepack enable
docker compose -f infra/docker/docker-compose.yml up -d
```

### 2. Configura i file ambiente

```powershell
Copy-Item .env.example .env
Copy-Item .env.example backend/.env
Copy-Item .env.example frontend/.env.local
```

Compila almeno:

- `DATABASE_URL`
- `FRONTEND_ORIGIN`
- `TRAINING_ACCESS_SECRET`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SITE_URL`

### 3. Installa dipendenze

```powershell
Set-Location backend
corepack pnpm install

Set-Location ..\\frontend
corepack pnpm install
```

### 4. Migra e popola il database

```powershell
Set-Location ..\\backend
corepack pnpm prisma migrate dev
corepack pnpm prisma:seed
```

### 5. Crea un utente admin

```powershell
corepack pnpm admin:bootstrap -- admin@example.it una-password-sicura admin
```

### 6. Avvia le due app

Terminale A:

```powershell
Set-Location backend
corepack pnpm dev
```

Terminale B:

```powershell
Set-Location frontend
corepack pnpm dev
```

## Checklist di verifica iniziale

- `http://localhost:3000` apre la home
- `http://localhost:3001/api/health` risponde
- `http://localhost:3000/admin/login` apre il login
- dopo login, `/admin` mostra il profilo utente
- `/admin/news` carica la tabella news

## Dove si interviene: mappa pratica

### Layout e identita visiva

- `frontend/src/app/layout.tsx`
- `frontend/src/app/globals.css`
- `frontend/src/components/layout/Navbar.tsx`
- `frontend/src/components/layout/Footer.tsx`

### Informazioni istituzionali e navigazione

- `frontend/src/content/site.ts`
- `frontend/src/lib/navigation.ts`
- `frontend/src/config/site.ts`

### Contenuti mock

- `frontend/src/content/mock/posts.ts`
- `frontend/src/content/mock/services.ts`
- `frontend/src/content/mock/locations.ts`
- `frontend/src/content/mock/training.ts`

### Area admin

- `frontend/src/app/(admin)/admin/page.tsx`
- `frontend/src/app/(admin)/admin/login/page.tsx`
- `frontend/src/app/(admin)/admin/news/page.tsx`
- `frontend/src/components/admin/PostEditorForm.tsx`

### API backend

- `backend/src/app/api/auth`
- `backend/src/app/api/posts`
- `backend/src/app/api/training`
- `backend/prisma/schema.prisma`

## Pattern da conoscere subito

### Pattern 1: fetch pubblico con fallback

Se modifichi il layer pubblico, controlla sempre se la funzione:

- usa il backend
- ha fallback mock
- logga errori ma non blocca la UI

File tipici:

- `frontend/src/lib/api/posts.ts`
- `frontend/src/lib/api/services.ts`
- `frontend/src/lib/api/locations.ts`

### Pattern 2: auth admin a cookie

- il frontend deve usare `withCredentials: true`
- il backend imposta cookie HTTP-only
- il middleware admin nel frontend non sostituisce il controllo ruolo lato backend

### Pattern 3: formazione con dati statici e accesso dinamico

- elenco materiali gestito dal frontend mock
- autorizzazione e download gestiti dal backend

## Pitfall ricorrenti

- Avvii solo il frontend e pensi che tutto sia funzionante: le pagine pubbliche possono andare in mock.
- Dimentichi `withCredentials` nelle chiamate admin o training e i cookie non passano.
- Configuri il backend su una porta diversa ma lasci `NEXT_PUBLIC_API_BASE_URL` a `3001`.
- Modifichi `Page` nel backend e ti aspetti fallback nel frontend: oggi il client `pages` non ha mock locale.
- Lavori dalla root e cerchi script `pnpm dev` globali: non esistono.

## Come fare handoff pulito

Quando consegni il lavoro, includi sempre:

1. Cosa hai toccato
2. Quali route sono impattate
3. Se serve backend reale o basta fallback mock
4. Variabili ambiente nuove o cambiate
5. Comandi di verifica eseguiti
6. Debito aperto o rischi residui

Template sintetico:

```text
Scope:
- ...

Impatti:
- frontend pubblico | admin | backend | db | docs

Verifiche:
- ...

Rischi aperti:
- ...
```

## Cosa manca ancora

Le priorita residue di documentazione sono:

- una strategia di deploy production completa
- una test strategy frontend piu solida
- una specifica API generata automaticamente
