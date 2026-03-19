const GENERATED_BASE = "/images/generated";

export const placeholderImages = {
  homeHero: `${GENERATED_BASE}/ambulanza-hero.png`,
  infoOperational: `${GENERATED_BASE}/centrale-operativa.png`,
  chiSiamo: `${GENERATED_BASE}/volontari-sede.png`,
  serviziHero: `${GENERATED_BASE}/ambulanza-hero.png`,
  servizioDetail: `${GENERATED_BASE}/trasporto-sociale.png`,
  newsHeader: `${GENERATED_BASE}/volontari-sede.png`,
  newsDetail: `${GENERATED_BASE}/raccolta-solidale.png`,
  protezioneCivile: `${GENERATED_BASE}/protezione-fuoristrada.png`,
  contatti: `${GENERATED_BASE}/volontari-sede.png`,
  prenota: `${GENERATED_BASE}/ambulanza-hero.png`,
  sezione: `${GENERATED_BASE}/volontari-sede.png`,
  legal: `${GENERATED_BASE}/volontari-sede.png`,
  serviceCardDefault: `${GENERATED_BASE}/volontari-sede.png`,
  newsCardDefault: `${GENERATED_BASE}/volontari-sede.png`,
} as const;

const serviceBySlug: Record<string, string> = {
  "trasporto-sanitario": `${GENERATED_BASE}/ambulanza-hero.png`,
  "ambulatori-e-prevenzione": `${GENERATED_BASE}/centrale-operativa.png`,
  "supporto-sociale": `${GENERATED_BASE}/raccolta-solidale.png`,
  "formazione-primo-soccorso": `${GENERATED_BASE}/formazione-primo-soccorso.png`,
  "supporto-protezione-civile": `${GENERATED_BASE}/protezione-fuoristrada.png`,
  "trasporto-sociale": `${GENERATED_BASE}/trasporto-sociale.png`,
};

const postBySlug: Record<string, string> = {
  "nuovo-calendario-servizi-territoriali": `${GENERATED_BASE}/ambulanza-hero.png`,
  "giornata-informativa-protezione-civile": `${GENERATED_BASE}/protezione-fuoristrada.png`,
  "attivazione-sportello-volontari": `${GENERATED_BASE}/volontari-sede.png`,
  "aggiornamento-raccolta-solidale": `${GENERATED_BASE}/raccolta-solidale.png`,
};

const locationBySlug: Record<string, string> = {
  "sede-centrale": `${GENERATED_BASE}/volontari-sede.png`,
  "sezione-nord": `${GENERATED_BASE}/trasporto-sociale.png`,
  "sezione-est": `${GENERATED_BASE}/raccolta-solidale.png`,
  "sezione-valle": `${GENERATED_BASE}/protezione-fuoristrada.png`,
};

export function getServicePlaceholder(slug: string): string {
  return serviceBySlug[slug] ?? placeholderImages.serviceCardDefault;
}

export function getPostPlaceholder(slug: string): string {
  return postBySlug[slug] ?? placeholderImages.newsCardDefault;
}

export function getLocationPlaceholder(slug: string): string {
  return locationBySlug[slug] ?? placeholderImages.sezione;
}

export function normalizeImageSrc(src: string | null | undefined, fallback: string): string {
  if (!src) {
    return fallback;
  }

  if (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  return fallback;
}
