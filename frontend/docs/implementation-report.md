# Implementation Report

## Obiettivo

Adeguare il frontend a una versione piu moderna e piu compatta del sito di riferimento, mantenendo un massimo di 15 pagine pubbliche e assorbendo le funzioni non rimovibili del portale storico:

- identita istituzionale
- servizi e prenotazione
- sedi e contatti
- donazioni
- donatori sangue
- protezione civile
- news ed eventi
- area riservata
- trust signals

## Pagine pubbliche finali

1. `/`
2. `/chi-siamo`
3. `/servizi`
4. `/prenota-servizi`
5. `/sedi-contatti`
6. `/protezione-civile`
7. `/volontariato-formazione`
8. `/donazioni`
9. `/donatori-sangue`
10. `/comunita`
11. `/news-eventi`
12. `/news-eventi/[slug]`
13. `/area-riservata`
14. `/privacy`
15. `/cookie-policy`

## Implementato

- Nuova IA pubblica con menu, footer e redirect legacy coerenti.
- Homepage riorganizzata come hub istituzionale con proof bar, percorsi rapidi, servizi, comunita e aggiornamenti.
- Nuove pagine pubbliche: `donazioni`, `donatori-sangue`, `volontariato-formazione`, `news-eventi`, `news-eventi/[slug]`.
- Rifacimento di `servizi` come hub in-page, senza dispersione su dettagli pubblici dedicati.
- Rifacimento di `prenota-servizi` come funnel guidato.
- Rafforzamento di `privacy`, `sedi-contatti`, `chi-siamo`.
- Rimozione delle vecchie pagine pubbliche legacy dal layer App Router:
  - `contatti`
  - `sezioni`
  - `formazione`
  - `news`
  - `news/[slug]`
  - `servizi/[slug]`
- Introduzione di fallback dati pubblici robusti verso i mock anche in caso di backend non disponibile.
- Normalizzazione categorie per post e servizi.
- Sitemap aggiornata con inclusione dei dettagli `news-eventi/[slug]`.

## Verifiche eseguite

### Statiche

- `corepack pnpm run typecheck`
- `corepack pnpm run build`

Entrambe completate con esito positivo.

Nota ambiente:
- presente warning engine Node per `v24.13.1` rispetto al range richiesto `>=22.13.1 <23`
- non ha bloccato ne typecheck ne build

### Runtime smoke test

Verifica su server pulito `next start` in locale su porta `3104`.

Route pubbliche verificate con `200`:

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
- `/news-eventi/nuovo-calendario-servizi-territoriali`
- `/area-riservata`
- `/privacy`
- `/cookie-policy`

Redirect legacy verificati con `308`:

- `/contatti` -> `/sedi-contatti`
- `/sezioni` -> `/sedi-contatti`
- `/formazione` -> `/volontariato-formazione`
- `/news` -> `/news-eventi`
- `/servizi/trasporto-sanitario` -> `/servizi`

### Playwright

Il canale MCP Playwright ha fallito per un conflitto sul profilo Chrome persistente `mcp-chrome`.

Fallback eseguito con Playwright CLI:

- screenshot homepage: `frontend/playwright-home.png`
- screenshot dettaglio news: `frontend/playwright-news-detail.png`

## Residui non bloccanti

- I contenuti legali e i dati amministrativi in `privacy`, `cookie-policy` e `donazioni` sono strutturati ma ancora da completare con dati reali.
- L'errore MCP Playwright va risolto separatamente se vuoi tornare a usare quel canale invece del fallback CLI.

## Esito

Implementazione completata.

Il sito pubblico rispetta il vincolo delle 15 pagine, incorpora le funzioni essenziali del sito storico e passa build, typecheck e smoke test runtime.
