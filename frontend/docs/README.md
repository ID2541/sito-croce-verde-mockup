# Frontend docs

## File disponibili
- `site-audit.json`: audit IA del sito di riferimento (crawl Playwright, max 45 pagine)
- `lovable-search-results.json`: risultati query Lovable usate in fase di ricerca
- `lovable-template-snapshots.json`: riferimenti template selezionati + screenshot
- `lovable-references.md`: pattern UI scelti e adattamento per Croce Verde
- `sitemap.md`: piano route e struttura informativa implementata

## Avvio locale frontend
1. `cd frontend`
2. `pnpm install`
3. `pnpm dev`
4. Apri `http://localhost:3000`

## Variabili ambiente frontend
- `NEXT_PUBLIC_API_BASE_URL` (default fallback: `http://localhost:3001`)

## Dove modificare contenuti mock
- `src/content/mock/posts.ts`
- `src/content/mock/services.ts`
- `src/content/mock/locations.ts`
