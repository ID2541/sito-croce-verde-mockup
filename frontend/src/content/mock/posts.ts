import { getPostPlaceholder } from "@/lib/placeholders";
import type { Post } from "./types";

export const mockPosts: Post[] = [
  {
    id: "post-1",
    slug: "nuovo-calendario-servizi-territoriali",
    title: "Nuovo calendario servizi territoriali",
    excerpt: "Aggiornata la pianificazione dei servizi territoriali per il prossimo trimestre.",
    content: [
      "Aggiornamento operativo dedicato all'organizzazione dei turni e dei servizi sul territorio.",
      "Le attivita saranno ricalibrate in base alle richieste locali e alla disponibilita delle squadre.",
      "La pagina verra integrata con dati dinamici non appena disponibile il collegamento API.",
    ],
    publishedAt: "2026-02-28",
    category: "news",
    location: "Lucca e territorio limitrofo",
    audience: "Cittadini e famiglie",
    coverImage: getPostPlaceholder("nuovo-calendario-servizi-territoriali"),
  },
  {
    id: "post-2",
    slug: "giornata-informativa-protezione-civile",
    title: "Giornata informativa protezione civile",
    excerpt: "Incontro aperto alla cittadinanza su prevenzione e procedure in emergenza.",
    content: [
      "Programma con sessioni introduttive, dimostrazioni pratiche e spazio domande.",
      "Partecipano operatori e volontari impegnati nelle principali attivita territoriali.",
    ],
    publishedAt: "2026-02-20",
    category: "eventi",
    location: "Sala incontri sede centrale",
    audience: "Cittadinanza e volontari",
    coverImage: getPostPlaceholder("giornata-informativa-protezione-civile"),
  },
  {
    id: "post-3",
    slug: "attivazione-sportello-volontari",
    title: "Attivazione sportello volontari",
    excerpt: "Nuovo punto informativo per orientamento e avvio percorsi di volontariato.",
    content: [
      "Lo sportello supporta i nuovi candidati nella scelta del percorso formativo.",
      "Sono previsti appuntamenti periodici e materiale informativo dedicato.",
    ],
    publishedAt: "2026-02-11",
    category: "news",
    location: "Sede centrale",
    audience: "Nuovi volontari",
    coverImage: getPostPlaceholder("attivazione-sportello-volontari"),
  },
  {
    id: "post-4",
    slug: "aggiornamento-raccolta-solidale",
    title: "Aggiornamento raccolta solidale",
    excerpt: "Riepilogo delle iniziative di raccolta e dei prossimi punti attivi.",
    content: [
      "La rete territoriale ha confermato nuove giornate di raccolta con presidio volontari.",
      "Le informazioni logistiche saranno aggiornate progressivamente nella sezione contatti.",
    ],
    publishedAt: "2026-01-31",
    category: "news",
    location: "Presidi territoriali",
    audience: "Sostenitori e comunita",
    coverImage: getPostPlaceholder("aggiornamento-raccolta-solidale"),
  },
];

export function getLatestPosts(limit = 3): Post[] {
  return [...mockPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getPostBySlug(slug: string): Post | undefined {
  return mockPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: Post["category"]): Post[] {
  return mockPosts.filter((post) => post.category === category);
}
