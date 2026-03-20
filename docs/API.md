# API backend

Riferimento unificato delle API usate dal frontend e dei vincoli applicativi principali.

## Base URL

In locale il backend gira su:

```text
http://localhost:3001
```

Tutte le route applicative sono esposte sotto `/api/*`.

## Convenzioni generali

### CORS

Il backend abilita CORS verso:

- `FRONTEND_ORIGIN`
- in sviluppo, anche origini `http://localhost:*`

Helper condivisi:

- `backend/src/lib/http/response.ts`

### Formato errori

Quasi tutte le route API usano questo formato:

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required",
    "details": {}
  }
}
```

Codici piu comuni:

- `VALIDATION_ERROR`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `CONFLICT`
- `RATE_LIMITED`
- `INTERNAL_ERROR`

### Formato successi

I successi seguono principalmente questi pattern:

```json
{
  "data": {}
}
```

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 3,
    "totalPages": 1
  }
}
```

Alcune route operative restituiscono payload dedicati, per esempio:

```json
{
  "user": {
    "id": "uuid",
    "email": "admin@example.it",
    "role": "ADMIN"
  }
}
```

### Paginazione

Le route lista usano tipicamente:

- `page`
- `pageSize`
- `q`

Esempio:

```text
/api/posts?status=PUBLISHED&page=1&pageSize=20
```

## Autenticazione e cookie

## Auth admin

Cookie usato:

- `cv_session`

Flusso:

1. login con email/password
2. verifica password via `scrypt`
3. creazione sessione persistita in DB
4. salvataggio nel DB del solo hash del token
5. emissione cookie `httpOnly`

Semantica attuale:

- al login il backend rimuove le sessioni precedenti dello stesso utente
- di fatto c'e una sola sessione attiva per utente

Ruoli disponibili:

- `ADMIN`
- `EDITOR`
- `STAFF`

Regole oggi effettive:

- `ADMIN` e `EDITOR` possono leggere e modificare i post admin
- solo `ADMIN` puo eliminare un post
- `STAFF` esiste nel modello ma non ha endpoint dedicati

Frontend interessato:

- `frontend/src/lib/api/auth.ts`
- `frontend/src/app/(admin)/admin/login/page.tsx`
- `frontend/src/app/(admin)/admin/page.tsx`

Backend interessato:

- `backend/src/app/api/auth/login/route.ts`
- `backend/src/app/api/auth/logout/route.ts`
- `backend/src/app/api/auth/me/route.ts`
- `backend/src/lib/auth/session.ts`
- `backend/src/lib/auth/password.ts`
- `backend/src/lib/auth/rbac.ts`

## Training access

Cookie usato:

- `cv_training_access`

Questo cookie non rappresenta un utente autenticato: rappresenta un grant temporaneo per scaricare materiali formativi.

Flusso:

1. un operatore genera un grant via CLI
2. il volontario inserisce il codice nel frontend
3. il backend verifica l'hash del codice
4. il backend emette un cookie firmato
5. il download dei materiali richiede quel cookie

Frontend interessato:

- `frontend/src/lib/api/training.ts`
- `frontend/src/components/training/TrainingMaterialsGate.tsx`

Backend interessato:

- `backend/src/app/api/training/access/route.ts`
- `backend/src/app/api/training/materials/[id]/download/route.ts`
- `backend/src/lib/auth/training-access.ts`

## Endpoint

## Health

### `GET /api/health`

Uso:

- smoke check del backend
- verifica connettivita database

Nota:

- questa route e un caso speciale e non usa il wrapper standard `ok/fail/handleError`

Backend:

- `backend/src/app/api/health/route.ts`

## Auth

### `POST /api/auth/login`

Uso:

- login area admin

Body:

```json
{
  "email": "admin@example.it",
  "password": "una-password-sicura"
}
```

Effetti:

- applica rate limit
- verifica credenziali
- crea sessione
- imposta `cv_session`

### `GET /api/auth/me`

Uso:

- verifica sessione admin attuale

Richiede:

- cookie sessione valido

### `POST /api/auth/logout`

Uso:

- distrugge sessione e cookie admin

## Posts

### `GET /api/posts`

Uso:

- pubblico per i post `PUBLISHED`
- admin per liste con contenuti non pubblici

Query supportate:

- `status`
- `q`
- `page`
- `pageSize`

Note:

- se `status` richiede qualcosa di diverso da `PUBLISHED`, serve ruolo `ADMIN` o `EDITOR`
- la ricerca testuale usa `contains`, adatta a dataset piccoli

Frontend:

- `frontend/src/lib/api/posts.ts`
- `frontend/src/app/(public)/news-eventi/page.tsx`
- `frontend/src/app/(public)/news-eventi/[slug]/page.tsx`
- `frontend/src/app/(admin)/admin/news/page.tsx`

Backend:

- `backend/src/app/api/posts/route.ts`

### `POST /api/posts`

Uso:

- crea un post

Ruoli:

- `ADMIN`
- `EDITOR`

Backend:

- `backend/src/app/api/posts/route.ts`

### `GET /api/posts/:id`

Uso:

- dettaglio post per area admin

Ruoli:

- `ADMIN`
- `EDITOR`

Backend:

- `backend/src/app/api/posts/[id]/route.ts`

### `PATCH /api/posts/:id`

Uso:

- aggiorna un post

Ruoli:

- `ADMIN`
- `EDITOR`

Backend:

- `backend/src/app/api/posts/[id]/route.ts`

### `DELETE /api/posts/:id`

Uso:

- elimina un post

Ruoli:

- solo `ADMIN`

Backend:

- `backend/src/app/api/posts/[id]/route.ts`

### `GET /api/posts/by-slug/:slug`

Uso:

- dettaglio pubblico di news/evento

Backend:

- `backend/src/app/api/posts/by-slug/[slug]/route.ts`

## Services

### `GET /api/services`

Uso:

- lista servizi pubblica

Nota:

- oggi `Service` e read-only via API

### `GET /api/services/by-slug/:slug`

Uso:

- dettaglio servizio pubblico

Frontend:

- `frontend/src/lib/api/services.ts`

Backend:

- `backend/src/app/api/services/route.ts`
- `backend/src/app/api/services/by-slug/[slug]/route.ts`

## Locations

### `GET /api/locations`

Uso:

- lista sedi pubblica

Nota:

- oggi `Location` e read-only via API

### `GET /api/locations/by-slug/:slug`

Uso:

- dettaglio sede pubblico

Frontend:

- `frontend/src/lib/api/locations.ts`

Backend:

- `backend/src/app/api/locations/route.ts`
- `backend/src/app/api/locations/by-slug/[slug]/route.ts`

## Pages

### `GET /api/pages`

Uso:

- lista pagine istituzionali

Nota:

- oggi `Page` e read-only via API

### `GET /api/pages/by-slug/:slug`

Uso:

- dettaglio pagina istituzionale

Nota frontend:

- il client `pages` non ha fallback mock equivalente a `posts/services/locations`

Frontend:

- `frontend/src/lib/api/pages.ts`

Backend:

- `backend/src/app/api/pages/route.ts`
- `backend/src/app/api/pages/by-slug/[slug]/route.ts`

## Training access

### `GET /api/training/access`

Uso:

- legge lo stato del grant attivo nel browser

Risposta tipica:

```json
{
  "access": {
    "granted": true,
    "grantId": "uuid",
    "grantLabel": "volontari-2026",
    "validUntil": "2026-12-31T23:59:59.000Z"
  }
}
```

### `POST /api/training/access`

Uso:

- sblocca i materiali via codice grant

Body:

```json
{
  "code": "AB12CD34EF56GH78"
}
```

Effetti:

- valida codice
- applica rate limit
- aggiorna `lastUsedAt`
- imposta cookie `cv_training_access`

### `DELETE /api/training/access`

Uso:

- revoca accesso locale ai materiali

### `GET /api/training/materials/:id/download`

Uso:

- download effettivo del file materiale

Richiede:

- cookie `cv_training_access` valido

## Script backend correlati

### Bootstrap admin

```powershell
cd backend
corepack pnpm admin:bootstrap -- <email> <password> [admin|editor]
```

Script:

- `backend/scripts/bootstrap-admin.ts`

### Creazione grant materiali

```powershell
cd backend
corepack pnpm training:grant -- <label> [expiresAtISO]
```

Script:

- `backend/scripts/create-training-access-grant.ts`

## Note operative per chi integra il frontend

- le chiamate autenticate devono usare `credentials: include`
- il sito pubblico puo degradare su mock per `posts`, `services` e `locations`
- auth admin, training access e CRUD admin richiedono backend reale
- il middleware frontend protegge la UX admin, ma il controllo autorizzativo reale resta lato backend

## Limiti attuali

- nessuna specifica OpenAPI generata automaticamente
- nessun versioning esplicito
- rate limit in memoria, quindi non distribuito
- materiali formazione attualmente serviti da contenuti demo/in-memory
- alcune route usano payload dedicati invece di un envelope perfettamente uniforme
