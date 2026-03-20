# ANALISI PROGETTO - SITO-CROCE-VERDE

## 1. Scopo del documento

Questo documento descrive l'architettura del progetto `SITO-CROCE-VERDE`, la sua organizzazione interna, i flussi applicativi principali e il pacchetto di tecnologie scelto per implementarlo.

L'obiettivo e fornire una vista tecnica completa del sistema, chiarendo:

- come e organizzato il sistema
- dove vive la logica applicativa
- come dialogano frontend, backend e persistenza
- quali sono i flussi reali principali
- quali tecnologie, framework e tool sono stati adottati
- quali dipendenze servono per farlo girare in locale
- quali limiti operativi e tecnici bisogna conoscere subito

Il documento non si limita quindi a un inventario dei file, ma prova a ricostruire il funzionamento effettivo del progetto dal punto di vista architetturale e applicativo.

Questo documento e basato sulla lettura del repository, della documentazione esistente e dei moduli applicativi principali.

## 2. Executive summary

`SITO-CROCE-VERDE` e un portale web composto da due applicazioni separate:

- `frontend/`: sito pubblico e area admin
- `backend/`: API, autenticazione, persistenza dati e logica di accesso ai materiali formativi

Entrambe le applicazioni sono costruite con Next.js 15, ma hanno responsabilita diverse.

Il frontend:

- gestisce routing, layout, UI e interazione utente
- consuma il backend via HTTP
- usa fallback mock per alcune aree pubbliche

Il backend:

- espone endpoint sotto `/api/*`
- gestisce auth admin via cookie e sessione DB-backed
- applica RBAC e rate limit
- usa Prisma/PostgreSQL come layer dati
- implementa un accesso separato ai materiali formativi tramite grant temporanei

Il progetto e abbastanza leggibile e ben separato, ma oggi ha alcuni limiti importanti:

- il frontend pubblico puo continuare a mostrare dati mock anche con backend spento
- la copertura test e ridotta
- non esiste una strategia di deploy completa nel repository
- il rate limit e in memoria e non distribuito

## 3. Struttura generale del repository

La root del progetto contiene quattro aree principali:

- `frontend/`
- `backend/`
- `infra/`
- `docs/`

### 3.1 Frontend

Responsabilita principali:

- sito pubblico
- area admin
- middleware di accesso admin lato frontend
- adapter API verso il backend
- fallback mock per una parte del contenuto pubblico

Cartelle chiave:

- `frontend/src/app/`
- `frontend/src/components/`
- `frontend/src/lib/api/`
- `frontend/src/content/`
- `frontend/public/`

### 3.2 Backend

Responsabilita principali:

- API HTTP
- autenticazione e sessioni
- autorizzazione a ruoli
- validazione input
- persistenza DB via Prisma
- gestione accesso ai materiali formativi

Cartelle chiave:

- `backend/src/app/api/`
- `backend/src/lib/auth/`
- `backend/src/lib/http/`
- `backend/src/lib/security/`
- `backend/src/lib/validators/`
- `backend/prisma/`
- `backend/scripts/`

### 3.3 Infra

Responsabilita principali:

- servizi locali di supporto allo sviluppo

Cartella chiave:

- `infra/docker/`

Servizi definiti:

- PostgreSQL
- pgAdmin
- MailHog

### 3.4 Documentazione

La documentazione principale di progetto e gia ben impostata.

File da conoscere:

- `README.md`
- `docs/README.md`
- `docs/ONBOARDING.md`
- `docs/ARCHITETTURA.md`
- `docs/SVILUPPO.md`
- `docs/API.md`

## 4. Stack tecnologico

### 4.1 Linguaggi utilizzati

- TypeScript come linguaggio principale sia nel frontend che nel backend
- JavaScript solo in file di configurazione compatibili con l'ecosistema Node dove non era necessario TypeScript
- SQL in modo indiretto tramite schema e migrazioni Prisma
- CSS tramite Tailwind CSS e fogli globali del frontend

Il progetto e quindi, di fatto, un repository TypeScript full stack con persistenza relazionale.

### 4.2 Framework e librerie applicative principali

Frontend:

- Next.js `15.2`
- React `19`
- App Router di Next.js
- Tailwind CSS `3.4`

Backend:

- Next.js `15.2` usato come runtime API separato
- Prisma `6.4` come ORM e access layer al database
- Zod `3.24` per validazione input e contratti runtime

Librerie/platform capabilities rilevanti usate nel backend:

- `node:crypto` per hashing password, token di sessione, HMAC e confronti timing-safe
- cookie APIs di Next.js per gestione sessioni e grant formativi

### 4.3 Runtime e package management

- Node.js `22.13.1`
- pnpm `9.15.4`
- Corepack per gestione coerente del package manager

Questa scelta e coerente con un repository moderno JavaScript/TypeScript e con la necessita di mantenere frontend e backend allineati su una stessa toolchain.

### 4.4 Database e persistenza

- PostgreSQL `17`
- Prisma schema come source of truth del modello dati
- Prisma Client generato per l'accesso ai dati
- Prisma Migrate per versionare lo schema del database
- Prisma Seed per popolare dati iniziali in sviluppo

### 4.5 Tooling di sviluppo locale

- Docker Compose per l'avvio dei servizi di supporto
- pgAdmin per ispezione del database
- MailHog per intercettazione email in locale
- script pnpm separati per frontend e backend

### 4.6 Tooling di build, controllo e qualita

- `tsc --noEmit` per typecheck
- `next build` per validazione build applicativa
- test backend con `tsx --test`
- GitHub Actions per esecuzione CI su frontend e backend

### 4.7 Tecnologie architetturali adottate

Oltre ai framework e alle librerie, il progetto adotta alcune scelte tecniche precise:

- architettura a due applicazioni separate: frontend e backend
- comunicazione frontend-backend via HTTP/JSON
- autenticazione admin via cookie HTTP-only e sessione persistita in database
- autorizzazione lato backend basata su ruoli
- protezione materiali formativi con grant temporaneo e cookie firmato
- fallback mock lato frontend per alcune aree pubbliche
- validazione centralizzata degli input lato backend

### 4.8 Perche la scelta attuale e importante

Il progetto usa due app Next.js separate invece di una singola applicazione full stack. Questa scelta e utile perche:

- separa chiaramente UI e logica server
- rende piu leggibile il confine tra frontend e backend
- permette build e verifiche separate
- prepara meglio un eventuale deploy separato in futuro

Controindicazione: aumenta un po' il carico di configurazione locale, perche servono due processi applicativi distinti, variabili ambiente coerenti e un backend realmente disponibile per tutte le funzioni non coperte da mock.

### 4.9 Pacchetto tecnologico effettivo del progetto

In sintesi, il progetto si appoggia su questo pacchetto tecnologico:

- linguaggio principale: TypeScript
- framework UI/server: Next.js + React
- styling: Tailwind CSS
- backend validation layer: Zod
- persistenza: PostgreSQL + Prisma
- runtime: Node.js
- package management: pnpm
- sviluppo locale: Docker Compose, pgAdmin, MailHog
- quality gates: typecheck, build, CI GitHub Actions, test backend minimali

## 5. Configurazione e avvio locale

## 5.1 File ambiente

I file ambiente vanno derivati da `.env.example`:

- `.env`
- `backend/.env`
- `frontend/.env.local`

Interpretazione pratica:

- `.env` root: riferimento generale e supporto a Docker Compose
- `backend/.env`: file usato davvero dal backend e dagli script lanciati dentro `backend/`
- `frontend/.env.local`: file usato davvero dal frontend

### 5.2 Variabili minime importanti

Backend:

- `DATABASE_URL`
- `FRONTEND_ORIGIN`
- `TRAINING_ACCESS_SECRET`

Frontend:

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SITE_URL`

### 5.3 Servizi locali richiesti

Docker Compose in `infra/docker/docker-compose.yml` avvia:

- `postgres`
- `pgadmin`
- `mailhog`

Porte standard:

- Postgres: `5432`
- pgAdmin: `5050`
- MailHog UI: `8025`
- MailHog SMTP: `1025`

### 5.4 Avvio reale del progetto

L'avvio non e centralizzato da root. Il flusso corretto e:

1. avviare Docker Compose
2. installare dipendenze backend
3. eseguire migrazioni Prisma
4. eseguire seed Prisma
5. creare eventualmente un utente admin
6. avviare backend su `3001`
7. avviare frontend su `3000`

Questo e importante perche il progetto non ha un unico comando root che orchestra tutto.

## 6. Architettura logica del sistema

La relazione tra i componenti e questa:

1. il browser chiama il frontend
2. il frontend renderizza UI pubblica e admin
3. il frontend interroga il backend via fetch HTTP
4. il backend interagisce con PostgreSQL via Prisma
5. per alcune aree pubbliche il frontend puo usare fallback mock se il backend non risponde

In termini operativi:

- il frontend e il punto di ingresso utente
- il backend e il sistema di verita per auth, CRUD e accessi protetti
- il database e il source of truth dei contenuti reali

## 7. Frontend: organizzazione e responsabilita

## 7.1 Routing

Il frontend usa App Router.

Le route sono divise in due gruppi principali:

- `(public)` per il sito pubblico
- `(admin)` per l'area di amministrazione

### Route pubbliche principali

- `/`
- `/chi-siamo`
- `/servizi`
- `/prenota-servizi`
- `/sedi-contatti`
- `/protezione-civile`
- `/volontariato-formazione`
- `/donazioni`
- `/donatori-sangue`
- `/comunita`
- `/news-eventi`
- `/news-eventi/[slug]`
- `/area-riservata`
- `/privacy`
- `/cookie-policy`

### Route admin principali

- `/admin/login`
- `/admin`
- `/admin/news`
- `/admin/news/new`
- `/admin/news/[id]/edit`

### Redirect legacy

In `frontend/next.config.ts` sono definiti redirect permanenti da URL storici verso la nuova struttura.

Esempi:

- `/contatti` -> `/sedi-contatti`
- `/formazione` -> `/volontariato-formazione`
- `/news` -> `/news-eventi`

## 7.2 Componenti e layer di presentazione

Il frontend ha una struttura abbastanza chiara:

- `components/layout/` per navbar, footer, page header
- `components/blocks/` per blocchi riusabili di pagina
- `components/admin/` per il form editoriale
- `components/training/` per il gate dei materiali formativi
- `components/media/` per la gestione immagini/sezioni

Questo rende abbastanza semplice individuare:

- layout globale
- blocchi marketing/informativi
- componenti operativi dell'admin
- componenti che dipendono dallo stato di accesso formazione

## 7.3 Home page e caricamento dati

La home page in `frontend/src/app/(public)/page.tsx` esegue in parallelo:

- `fetchPublishedPosts()`
- `fetchServices()`
- `fetchLocations()`

Questa e una delle pagine migliori per capire il progetto perche mostra subito:

- l'approccio a blocchi UI
- il caricamento dati da adapter API
- il fatto che servizi, news e sedi siano considerati i contenuti pubblici centrali

## 7.4 Middleware admin

Il middleware in `frontend/src/middleware.ts` controlla la presenza del cookie `cv_session` e reindirizza a `/admin/login` se il cookie manca.

Punto importante:

- questo middleware non garantisce autorizzazione reale
- fa solo una protezione preliminare lato frontend
- il controllo definitivo dei permessi resta nel backend

Questo va tenuto ben chiaro quando si fanno modifiche ai flussi admin.

## 8. Frontend: layer API e fallback mock

## 8.1 API client condiviso

Il frontend centralizza l'accesso HTTP in `frontend/src/lib/api/client.ts`.

Responsabilita del client:

- usare la base URL da `NEXT_PUBLIC_API_BASE_URL`
- impostare `Content-Type` JSON quando serve
- gestire `credentials: include` per i cookie
- trasformare gli errori HTTP in errori applicativi leggibili

Questo e il punto di ingresso corretto per capire tutte le chiamate backend del frontend.

## 8.2 Adapter API principali

Moduli presenti:

- `auth.ts`
- `posts.ts`
- `services.ts`
- `locations.ts`
- `pages.ts`
- `training.ts`
- `health.ts`

### Cosa fanno

- `auth.ts`: login, logout, sessione corrente admin
- `posts.ts`: lista pubblica, dettaglio news, lista admin, CRUD post
- `services.ts`: elenco e dettaglio servizi
- `locations.ts`: elenco e dettaglio sedi
- `pages.ts`: pagine istituzionali
- `training.ts`: stato accesso formazione, sblocco, revoca, URL download
- `health.ts`: verifica backend

## 8.3 Fallback mock

Esiste fallback mock per:

- `posts`
- `services`
- `locations`

I mock sono in:

- `frontend/src/content/mock/posts.ts`
- `frontend/src/content/mock/services.ts`
- `frontend/src/content/mock/locations.ts`

Questo significa che il sito pubblico puo apparire sano anche se il backend e spento o non raggiungibile.

Implicazioni pratiche:

- ottimo per sviluppo UI o demo iniziali
- rischioso se si valuta superficialmente lo stato reale del sistema
- ogni verifica end-to-end deve includere esplicitamente il backend

Non esiste fallback equivalente per:

- auth admin
- CRUD admin
- training access
- pages

## 9. Backend: organizzazione e responsabilita

## 9.1 Route API

Il backend usa route handlers Next.js in `backend/src/app/api/`.

Le aree principali sono:

- `auth/`
- `posts/`
- `services/`
- `locations/`
- `pages/`
- `training/`
- `health/`

### Endpoint significativi

Auth:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

Posts:

- `GET /api/posts`
- `POST /api/posts`
- `GET /api/posts/[id]`
- `PATCH /api/posts/[id]`
- `DELETE /api/posts/[id]`
- `GET /api/posts/by-slug/[slug]`

Servizi:

- `GET /api/services`
- `GET /api/services/by-slug/[slug]`

Sedi:

- `GET /api/locations`
- `GET /api/locations/by-slug/[slug]`

Pagine:

- `GET /api/pages`
- `GET /api/pages/by-slug/[slug]`

Formazione:

- `GET /api/training/access`
- `POST /api/training/access`
- `DELETE /api/training/access`
- `GET /api/training/materials/[id]/download`

Health:

- `GET /api/health`

## 9.2 Librerie interne del backend

Le aree piu importanti del backend sono:

- `lib/auth/`
- `lib/http/`
- `lib/security/`
- `lib/validators/`
- `lib/db/`

### `lib/auth/`

Contiene:

- gestione sessione admin
- password hashing/verifica
- RBAC
- accesso formazione e firma cookie

### `lib/http/`

Contiene gli helper condivisi per:

- CORS
- risposte di successo
- risposte di errore
- gestione centralizzata delle eccezioni

### `lib/security/`

Contiene il rate limit in memoria.

### `lib/validators/`

Contiene le Zod schema per validare:

- login
- query posts
- create/update posts
- training access
- query comuni

## 10. Modello dati e persistenza

Il database e definito in `backend/prisma/schema.prisma`.

### 10.1 Entita principali

#### User

Campi chiave:

- `id`
- `email`
- `passwordHash`
- `role`

Ruoli previsti:

- `ADMIN`
- `EDITOR`
- `STAFF`

#### Session

Serve per la sessione admin.

Campi chiave:

- `userId`
- `tokenHash`
- `expiresAt`

La sessione non salva il token reale, ma solo il suo hash SHA256.

#### Post

Rappresenta news/eventi editoriali.

Campi chiave:

- `slug`
- `title`
- `excerpt`
- `content`
- `coverImage`
- `category`
- `publishedAt`
- `status`

#### Service

Rappresenta i servizi offerti.

Campi chiave:

- `slug`
- `title`
- `summary`
- `description`
- `content`
- `category`
- `prenotabile`

#### Page

Rappresenta pagine istituzionali generiche.

#### Location

Rappresenta sedi e contatti territoriali.

#### TrainingAccessGrant

Rappresenta un grant temporaneo per l'accesso ai materiali formativi.

Campi chiave:

- `codeHash`
- `label`
- `expiresAt`
- `revokedAt`
- `lastUsedAt`

## 10.2 Ruolo di Prisma

Prisma e il layer di accesso dati unico del backend.

Serve per:

- query CRUD contenuti
- ricerca utente e sessione
- gestione grant formazione
- migrazioni DB
- seed iniziale

## 10.3 Seed e dati iniziali

Il seed Prisma prepara dati di esempio per:

- post
- servizi
- sedi
- pagine
- opzionalmente utente admin, se le env sono configurate

Questo rende l'ambiente di sviluppo relativamente rapido da bootstrap.

## 11. Autenticazione admin

## 11.1 Flusso login

Il login admin e implementato in `backend/src/app/api/auth/login/route.ts`.

Flusso reale:

1. il frontend invia email e password
2. il backend applica rate limit per IP e account
3. il payload viene validato via Zod
4. il backend cerca l'utente in DB
5. la password viene verificata con `scrypt`
6. se valida, viene creata una sessione DB-backed
7. il backend imposta il cookie `cv_session`
8. il frontend reindirizza verso `/admin`

## 11.2 Cookie sessione

Cookie usato:

- `cv_session`

Caratteristiche:

- `httpOnly`
- `sameSite=lax`
- `secure` solo in production
- durata di 7 giorni

Il token reale e nel cookie, ma nel database viene memorizzato solo l'hash del token.

## 11.3 Comportamento sessione

Quando viene creata una nuova sessione:

- il backend elimina le sessioni precedenti dello stesso utente
- elimina anche sessioni scadute

Di fatto il comportamento attuale e quello di una singola sessione attiva per utente.

## 12. Autorizzazione e RBAC

Il controllo ruoli e centralizzato in `backend/src/lib/auth/rbac.ts`.

Ruoli disponibili:

- `ADMIN`
- `EDITOR`
- `STAFF`

Regole attuali importanti:

- `ADMIN` e `EDITOR` possono leggere e modificare i post admin
- solo `ADMIN` puo cancellare i post
- `STAFF` esiste nel modello ma oggi non ha un flusso dedicato rilevante

Questo e importante perche il frontend puo nascondere o mostrare elementi, ma l'enforcement reale e lato backend.

## 13. Accesso ai materiali formativi

Questa parte merita attenzione separata, perche non usa l'autenticazione admin.

## 13.1 Concetto funzionale

L'area formazione non richiede un utente autenticato admin. Usa invece un grant temporaneo distribuito tramite codice.

## 13.2 Flusso completo

1. un operatore genera un grant via CLI
2. il sistema produce un codice casuale
3. il codice viene hashato e salvato nel DB
4. il volontario inserisce il codice nel frontend
5. il backend verifica il codice confrontando l'hash
6. se il grant e valido e non scaduto, il backend imposta `cv_training_access`
7. il browser puo scaricare i materiali tramite endpoint protetto

## 13.3 Cookie formazione

Cookie usato:

- `cv_training_access`

Caratteristiche:

- distinto da `cv_session`
- firmato con HMAC
- dipende da `TRAINING_ACCESS_SECRET`
- `httpOnly`
- `sameSite=lax`

## 13.4 Materiali formativi

I materiali vengono serviti dal backend via download protetto.

Nota operativa importante:

- il gate di accesso e reale
- i contenuti formativi attuali sembrano ancora rappresentativi/demo piu che un sistema contenutistico complesso

Questa distinzione e utile quando si valuta il grado di maturita del modulo formazione.

## 14. Flussi applicativi principali

## 14.1 Flusso pubblico sito

1. l'utente apre il frontend
2. il frontend recupera news, servizi e sedi
3. se il backend risponde, mostra dati reali
4. se il backend fallisce per questi moduli, il frontend puo usare fallback mock

Criticita:

- questo comportamento migliora la resilienza percepita
- ma rende meno evidente un guasto backend

## 14.2 Flusso admin news

1. l'admin apre `/admin/login`
2. inserisce credenziali
3. il backend autentica e imposta il cookie sessione
4. il middleware frontend permette l'ingresso iniziale all'area admin
5. il frontend carica la lista post admin dal backend
6. il form admin crea o modifica post
7. il backend valida via Zod e persiste via Prisma
8. solo `ADMIN` puo eliminare i post

## 14.3 Flusso formazione

1. il volontario apre la pagina formazione
2. il frontend verifica lo stato accesso corrente
3. se non ha accesso, mostra un form per codice
4. il backend verifica il grant
5. se valido, il cookie viene emesso
6. i link download diventano utilizzabili

## 15. Sicurezza gia presente

Misure concrete gia implementate:

- password hashate con `scrypt`
- token sessione randomizzati e hashati nel DB
- cookie `httpOnly`
- RBAC lato backend
- rate limit su login e accesso formazione
- validazione input con Zod
- firma HMAC per cookie formazione
- CORS controllato rispetto all'origine frontend

## 15.1 Limiti di sicurezza da conoscere

- il rate limit e in memoria, quindi non e adatto a piu istanze condivise
- il middleware frontend non e una misura sufficiente di autorizzazione
- la robustezza end-to-end dipende molto dalla corretta configurazione delle env

## 16. CI, test e qualita

## 16.1 CI

La pipeline GitHub Actions in `.github/workflows/ci.yml` esegue per `frontend` e `backend`:

1. checkout
2. setup Node
3. setup pnpm
4. install dipendenze
5. `pnpm run ci:check`

## 16.2 Copertura backend

Il backend ha test, ma pochi.

Il file principale trovato e:

- `backend/tests/auth.test.ts`

Copre:

- hash/verifica password
- comportamento base del rate limit

Non copre in modo serio:

- route API
- sessioni complete
- RBAC end-to-end
- CRUD contenuti
- training access end-to-end

## 16.3 Copertura frontend

Il frontend non ha una suite di test automatica reale integrata nel flusso standard.

Nel `package.json` il comando `test` e di fatto solo un placeholder.

Questo significa che oggi la qualita frontend dipende soprattutto da:

- typecheck
- build
- verifica manuale

## 16.4 Conseguenza pratica

L'architettura e piu matura della strategia di test.

Se il progetto deve crescere o essere mantenuto da piu persone, la priorita futura dovrebbe essere aumentare la copertura soprattutto su:

- route backend
- auth/session lifecycle
- CRUD news
- training access
- smoke test frontend/admin

## 17. Limiti attuali e debiti tecnici

I limiti piu importanti emersi dalla lettura sono questi.

### 17.1 Fallback mock che possono mascherare problemi reali

Il frontend puo restituire contenuti mock per news, servizi e sedi.

Questo e utile per sviluppo e demo, ma puo falsare la percezione di salute del sistema.

### 17.2 Nessun orchestratore root

Non esiste un comando unico da root per installare, avviare e verificare tutto.

### 17.3 Strategia deploy non completa

L'infra di repo copre lo sviluppo locale, non un deploy applicativo completo.

### 17.4 Copertura test insufficiente

Il rischio maggiore oggi non sembra architetturale ma operativo: e piu facile introdurre regressioni non rilevate.

### 17.5 Materiali formazione ancora a maturita intermedia

Il meccanismo di accesso e buono, ma i contenuti sembrano ancora piu demo che un modulo documentale strutturato.

## 18. Dove intervenire per tipo di esigenza

## 18.1 Se devi cambiare UI o navigazione pubblica

Parti da:

- `frontend/src/app/(public)/`
- `frontend/src/components/layout/`
- `frontend/src/components/blocks/`
- `frontend/src/content/site.ts`

## 18.2 Se devi cambiare login/admin/news

Parti da:

- `frontend/src/app/(admin)/admin/login/page.tsx`
- `frontend/src/app/(admin)/admin/news/page.tsx`
- `frontend/src/app/(admin)/admin/news/new/page.tsx`
- `frontend/src/app/(admin)/admin/news/[id]/edit/page.tsx`
- `frontend/src/components/admin/`
- `frontend/src/lib/api/posts.ts`
- `backend/src/app/api/auth/`
- `backend/src/app/api/posts/`

## 18.3 Se devi cambiare permessi o sessioni

Parti da:

- `backend/src/lib/auth/session.ts`
- `backend/src/lib/auth/rbac.ts`
- `backend/src/lib/auth/password.ts`
- `backend/src/app/api/auth/`

## 18.4 Se devi cambiare contenuti e schema dati

Parti da:

- `backend/prisma/schema.prisma`
- `backend/prisma/seed.ts`
- `backend/src/app/api/`
- `frontend/src/lib/api/`

## 18.5 Se devi cambiare area formazione

Parti da:

- `frontend/src/app/(public)/volontariato-formazione/page.tsx`
- `frontend/src/components/training/TrainingMaterialsGate.tsx`
- `frontend/src/lib/api/training.ts`
- `backend/src/lib/auth/training-access.ts`
- `backend/src/app/api/training/access/route.ts`
- `backend/src/app/api/training/materials/[id]/download/route.ts`

## 19. File piu importanti da leggere per onboarding tecnico

Ordine consigliato di lettura:

1. `README.md`
2. `docs/ONBOARDING.md`
3. `docs/ARCHITETTURA.md`
4. `docs/SVILUPPO.md`
5. `docs/API.md`
6. `backend/prisma/schema.prisma`
7. `backend/src/lib/auth/session.ts`
8. `backend/src/lib/auth/training-access.ts`
9. `backend/src/app/api/posts/route.ts`
10. `frontend/src/lib/api/client.ts`
11. `frontend/src/lib/api/posts.ts`
12. `frontend/src/app/(public)/page.tsx`
13. `frontend/src/components/training/TrainingMaterialsGate.tsx`

## 20. Checklist di presa in carico per un nuovo sviluppatore

Se un nuovo sviluppatore deve prendere in carico il progetto, dovrebbe verificare almeno questi punti:

1. capire come sono separati frontend e backend
2. capire quali contenuti hanno fallback mock e quali no
3. verificare localmente `api/health`
4. verificare login admin completo
5. verificare caricamento lista news admin
6. verificare che il seed popoli i dati attesi
7. capire il flusso grant formazione
8. sapere che i test oggi non coprono davvero i flussi principali

## 21. Conclusione

Il progetto e impostato in modo pragmatico e abbastanza solido sul piano della separazione delle responsabilita:

- frontend leggibile
- backend organizzato in moduli sensati
- modello dati semplice ma sufficiente
- auth e accesso formazione implementati con una logica coerente

Il principale punto di attenzione non e tanto la struttura, quanto la maturita operativa complessiva.

In altre parole:

- l'architettura c'e
- i flussi principali ci sono
- la documentazione di base c'e
- ma verifiche automatiche, deploy e robustezza end-to-end vanno ancora rafforzati

Per chi eredita il progetto, la chiave e questa:

- considerare il backend come sistema di verita
- non fidarsi del solo frontend pubblico come indicatore di stato
- partire dalla documentazione root e dai moduli auth/posts/training per capire i flussi critici
