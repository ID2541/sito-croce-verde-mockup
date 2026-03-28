import { env } from "@/config/env";
import { apiFetch } from "./client";
import type { ApiTransparencyCategory, ApiTransparencyItem, ListResponse } from "./types";

const transparencyCategoriesFallback: ApiTransparencyCategory[] = [
  {
    id: "fallback-category-documenti-istituzionali",
    slug: "documenti-istituzionali",
    title: "Documenti istituzionali",
    description: "Statuto, atto costitutivo e documentazione fondativa dell'associazione.",
    parentId: null,
    parent: null,
    sortOrder: 10,
    isActive: true,
    publishedItemCount: 2,
  },
  {
    id: "fallback-category-governance",
    slug: "governance",
    title: "Governance",
    description: "Organi sociali, incarichi e struttura di governo dell'ente.",
    parentId: null,
    parent: null,
    sortOrder: 20,
    isActive: true,
    publishedItemCount: 1,
  },
  {
    id: "fallback-category-runts",
    slug: "runts",
    title: "RUNTS",
    description: "Dati identificativi e riferimenti di iscrizione al Registro Unico.",
    parentId: null,
    parent: null,
    sortOrder: 30,
    isActive: true,
    publishedItemCount: 1,
  },
  {
    id: "fallback-category-bilanci-rendiconti",
    slug: "bilanci-rendiconti",
    title: "Bilanci e rendiconti",
    description: "Bilanci, rendiconti per cassa e documenti economico-finanziari.",
    parentId: null,
    parent: null,
    sortOrder: 40,
    isActive: true,
    publishedItemCount: 1,
  },
  {
    id: "fallback-category-bilancio-sociale",
    slug: "bilancio-sociale",
    title: "Bilancio sociale",
    description: "Rendicontazione sociale e impatto delle attivita associative.",
    parentId: null,
    parent: null,
    sortOrder: 50,
    isActive: true,
    publishedItemCount: 1,
  },
  {
    id: "fallback-category-contributi-pubblici",
    slug: "contributi-pubblici",
    title: "Contributi pubblici e liberalita",
    description: "Contributi pubblici, erogazioni liberali e 5x1000.",
    parentId: null,
    parent: null,
    sortOrder: 60,
    isActive: true,
    publishedItemCount: 1,
  },
  {
    id: "fallback-category-regolamenti",
    slug: "regolamenti",
    title: "Regolamenti",
    description: "Regolamenti interni e documentazione di funzionamento.",
    parentId: null,
    parent: null,
    sortOrder: 70,
    isActive: true,
    publishedItemCount: 1,
  },
  {
    id: "fallback-category-documentazione-istituzionale",
    slug: "documentazione-istituzionale",
    title: "Documentazione istituzionale",
    description: "Ulteriore documentazione istituzionale e materiali informativi ufficiali.",
    parentId: null,
    parent: null,
    sortOrder: 80,
    isActive: true,
    publishedItemCount: 1,
  },
];

const transparencyItemsFallback: ApiTransparencyItem[] = [
  {
    id: "fallback-item-statuto-vigente",
    slug: "statuto-vigente",
    title: "Statuto vigente",
    summary: "Versione vigente dello statuto associativo.",
    content: "Documento dimostrativo per la sezione Trasparenza. Sostituire con il file ufficiale approvato dall'ente.",
    referenceYear: 2025,
    referenceDate: "2025-05-20T00:00:00.000Z",
    publishedAt: "2026-03-21T08:30:00.000Z",
    updatedAt: "2026-03-21T08:30:00.000Z",
    featured: true,
    documentFormat: "TXT",
    sortOrder: 0,
    category: {
      id: "fallback-category-documenti-istituzionali",
      slug: "documenti-istituzionali",
      title: "Documenti istituzionali",
    },
    documents: [
      {
        id: "fallback-doc-statuto-vigente",
        label: "Scarica statuto vigente",
        fileName: "statuto-vigente.txt",
        publicUrl: "/documents/transparency/statuto-vigente.txt",
        mimeType: "text/plain",
        fileSizeBytes: null,
        isPrimary: true,
      },
    ],
  },
  {
    id: "fallback-item-atto-costitutivo",
    slug: "atto-costitutivo",
    title: "Atto costitutivo",
    summary: "Atto costitutivo dell'associazione.",
    content: "Documento dimostrativo per la sezione Trasparenza. Sostituire con l'atto costitutivo ufficiale.",
    referenceYear: 1986,
    referenceDate: "1986-04-12T00:00:00.000Z",
    publishedAt: "2026-03-21T08:35:00.000Z",
    updatedAt: "2026-03-21T08:35:00.000Z",
    featured: false,
    documentFormat: "TXT",
    sortOrder: 0,
    category: {
      id: "fallback-category-documenti-istituzionali",
      slug: "documenti-istituzionali",
      title: "Documenti istituzionali",
    },
    documents: [
      {
        id: "fallback-doc-atto-costitutivo",
        label: "Scarica atto costitutivo",
        fileName: "atto-costitutivo.txt",
        publicUrl: "/documents/transparency/atto-costitutivo.txt",
        mimeType: "text/plain",
        fileSizeBytes: null,
        isPrimary: true,
      },
    ],
  },
  {
    id: "fallback-item-organi-sociali-2026",
    slug: "organi-sociali-2026",
    title: "Organi sociali 2026",
    summary: "Composizione aggiornata degli organi sociali e dei principali incarichi.",
    content: "Elenco dimostrativo delle cariche associative aggiornate all'anno di riferimento.",
    referenceYear: 2026,
    referenceDate: "2026-01-15T00:00:00.000Z",
    publishedAt: "2026-03-21T08:40:00.000Z",
    updatedAt: "2026-03-21T08:40:00.000Z",
    featured: true,
    documentFormat: "TXT",
    sortOrder: 0,
    category: {
      id: "fallback-category-governance",
      slug: "governance",
      title: "Governance",
    },
    documents: [
      {
        id: "fallback-doc-organi-sociali-2026",
        label: "Scarica organi sociali 2026",
        fileName: "organi-sociali-2026.txt",
        publicUrl: "/documents/transparency/organi-sociali-2026.txt",
        mimeType: "text/plain",
        fileSizeBytes: null,
        isPrimary: true,
      },
    ],
  },
  {
    id: "fallback-item-dati-runts",
    slug: "dati-runts",
    title: "Dati RUNTS",
    summary: "Riferimenti di iscrizione e dati identificativi essenziali.",
    content: "Scheda dimostrativa dei dati pubblicati nella sezione RUNTS.",
    referenceYear: 2026,
    referenceDate: "2026-02-01T00:00:00.000Z",
    publishedAt: "2026-03-21T08:45:00.000Z",
    updatedAt: "2026-03-21T08:45:00.000Z",
    featured: false,
    documentFormat: "TXT",
    sortOrder: 0,
    category: {
      id: "fallback-category-runts",
      slug: "runts",
      title: "RUNTS",
    },
    documents: [
      {
        id: "fallback-doc-dati-runts",
        label: "Scarica scheda RUNTS",
        fileName: "dati-runts.txt",
        publicUrl: "/documents/transparency/dati-runts.txt",
        mimeType: "text/plain",
        fileSizeBytes: null,
        isPrimary: true,
      },
    ],
  },
  {
    id: "fallback-item-bilancio-2025",
    slug: "bilancio-2025",
    title: "Bilancio d'esercizio 2025",
    summary: "Bilancio d'esercizio con note introduttive e riferimenti di approvazione.",
    content: "Documento dimostrativo per la consultazione del bilancio annuale.",
    referenceYear: 2025,
    referenceDate: "2025-12-31T00:00:00.000Z",
    publishedAt: "2026-03-21T08:50:00.000Z",
    updatedAt: "2026-03-21T08:50:00.000Z",
    featured: true,
    documentFormat: "TXT",
    sortOrder: 0,
    category: {
      id: "fallback-category-bilanci-rendiconti",
      slug: "bilanci-rendiconti",
      title: "Bilanci e rendiconti",
    },
    documents: [
      {
        id: "fallback-doc-bilancio-2025",
        label: "Scarica bilancio 2025",
        fileName: "bilancio-2025.txt",
        publicUrl: "/documents/transparency/bilancio-2025.txt",
        mimeType: "text/plain",
        fileSizeBytes: null,
        isPrimary: true,
      },
    ],
  },
  {
    id: "fallback-item-bilancio-sociale-2025",
    slug: "bilancio-sociale-2025",
    title: "Bilancio sociale 2025",
    summary: "Sintesi dell'impatto sociale e delle principali attivita svolte.",
    content: "Documento dimostrativo per il bilancio sociale.",
    referenceYear: 2025,
    referenceDate: "2025-12-31T00:00:00.000Z",
    publishedAt: "2026-03-21T08:55:00.000Z",
    updatedAt: "2026-03-21T08:55:00.000Z",
    featured: false,
    documentFormat: "TXT",
    sortOrder: 0,
    category: {
      id: "fallback-category-bilancio-sociale",
      slug: "bilancio-sociale",
      title: "Bilancio sociale",
    },
    documents: [
      {
        id: "fallback-doc-bilancio-sociale-2025",
        label: "Scarica bilancio sociale 2025",
        fileName: "bilancio-sociale-2025.txt",
        publicUrl: "/documents/transparency/bilancio-sociale-2025.txt",
        mimeType: "text/plain",
        fileSizeBytes: null,
        isPrimary: true,
      },
    ],
  },
  {
    id: "fallback-item-contributi-pubblici-2025",
    slug: "contributi-pubblici-2025",
    title: "Contributi pubblici e liberalita 2025",
    summary: "Quadro riepilogativo dei contributi pubblici e delle principali liberalita ricevute.",
    content: "Scheda dimostrativa per contributi pubblici, liberalita e 5x1000.",
    referenceYear: 2025,
    referenceDate: "2025-12-31T00:00:00.000Z",
    publishedAt: "2026-03-21T09:00:00.000Z",
    updatedAt: "2026-03-21T09:00:00.000Z",
    featured: false,
    documentFormat: "TXT",
    sortOrder: 0,
    category: {
      id: "fallback-category-contributi-pubblici",
      slug: "contributi-pubblici",
      title: "Contributi pubblici e liberalita",
    },
    documents: [
      {
        id: "fallback-doc-contributi-pubblici-2025",
        label: "Scarica contributi pubblici 2025",
        fileName: "contributi-pubblici-2025.txt",
        publicUrl: "/documents/transparency/contributi-pubblici-2025.txt",
        mimeType: "text/plain",
        fileSizeBytes: null,
        isPrimary: true,
      },
    ],
  },
  {
    id: "fallback-item-regolamento-volontari",
    slug: "regolamento-volontari",
    title: "Regolamento volontari",
    summary: "Regole organizzative e linee di comportamento per l'attivita volontaria.",
    content: "Documento dimostrativo del regolamento interno dedicato ai volontari.",
    referenceYear: 2026,
    referenceDate: "2026-01-10T00:00:00.000Z",
    publishedAt: "2026-03-21T09:05:00.000Z",
    updatedAt: "2026-03-21T09:05:00.000Z",
    featured: false,
    documentFormat: "TXT",
    sortOrder: 0,
    category: {
      id: "fallback-category-regolamenti",
      slug: "regolamenti",
      title: "Regolamenti",
    },
    documents: [
      {
        id: "fallback-doc-regolamento-volontari",
        label: "Scarica regolamento volontari",
        fileName: "regolamento-volontari.txt",
        publicUrl: "/documents/transparency/regolamento-volontari.txt",
        mimeType: "text/plain",
        fileSizeBytes: null,
        isPrimary: true,
      },
    ],
  },
  {
    id: "fallback-item-carta-documentazione-istituzionale",
    slug: "carta-documentazione-istituzionale",
    title: "Carta della documentazione istituzionale",
    summary: "Nota introduttiva ai documenti pubblicati e alle modalita di aggiornamento.",
    content: "Documento dimostrativo di accompagnamento alla sezione Trasparenza.",
    referenceYear: 2026,
    referenceDate: "2026-03-01T00:00:00.000Z",
    publishedAt: "2026-03-21T09:10:00.000Z",
    updatedAt: "2026-03-21T09:10:00.000Z",
    featured: false,
    documentFormat: "TXT",
    sortOrder: 0,
    category: {
      id: "fallback-category-documentazione-istituzionale",
      slug: "documentazione-istituzionale",
      title: "Documentazione istituzionale",
    },
    documents: [
      {
        id: "fallback-doc-carta-documentazione-istituzionale",
        label: "Scarica nota introduttiva",
        fileName: "carta-documentazione-istituzionale.txt",
        publicUrl: "/documents/transparency/carta-documentazione-istituzionale.txt",
        mimeType: "text/plain",
        fileSizeBytes: null,
        isPrimary: true,
      },
    ],
  },
];

export function getStaticTransparencyItems(): ApiTransparencyItem[] {
  return transparencyItemsFallback;
}

export async function fetchTransparencyCategories(): Promise<ApiTransparencyCategory[]> {
  if (env.staticDemo) {
    return transparencyCategoriesFallback;
  }

  try {
    const response = await apiFetch<ListResponse<ApiTransparencyCategory>>("/api/transparency/categories", {
      next: { revalidate: 300 },
    });

    return response.data.sort((left, right) => left.sortOrder - right.sortOrder || left.title.localeCompare(right.title, "it"));
  } catch (error) {
    console.error("Unable to fetch transparency categories", error);
    return transparencyCategoriesFallback;
  }
}

export async function fetchTransparencyItems(): Promise<ApiTransparencyItem[]> {
  if (env.staticDemo) {
    return getStaticTransparencyItems();
  }

  try {
    const response = await apiFetch<ListResponse<ApiTransparencyItem>>("/api/transparency/items?page=1&pageSize=50", {
      next: { revalidate: 300 },
    });

    return response.data;
  } catch (error) {
    console.error("Unable to fetch transparency items", error);
    return transparencyItemsFallback;
  }
}

export async function fetchTransparencyItemBySlug(slug: string): Promise<ApiTransparencyItem | null> {
  if (env.staticDemo) {
    return getStaticTransparencyItems().find((item) => item.slug === slug) ?? null;
  }

  try {
    const response = await apiFetch<{ data: ApiTransparencyItem }>(`/api/transparency/items/by-slug/${slug}`, {
      next: { revalidate: 300 },
    });

    return response.data;
  } catch (error) {
    console.error(`Unable to fetch transparency item by slug: ${slug}`, error);
    return getStaticTransparencyItems().find((item) => item.slug === slug) ?? null;
  }
}

export async function fetchTransparencyHub(): Promise<{
  categories: ApiTransparencyCategory[];
  items: ApiTransparencyItem[];
}> {
  const [categories, items] = await Promise.all([fetchTransparencyCategories(), fetchTransparencyItems()]);
  return { categories, items };
}
