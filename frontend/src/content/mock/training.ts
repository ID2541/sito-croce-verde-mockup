export type TrainingMaterial = {
  id: string;
  title: string;
  lesson: string;
  format: "PDF" | "DOCX" | "PPTX" | "XLSX" | "TXT";
  updatedAt: string;
  size: string;
};

export type TrainingSection = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  audience: string;
  materials: TrainingMaterial[];
};

export const trainingSections: TrainingSection[] = [
  {
    id: "basic-first-aid",
    slug: "primo-soccorso-base",
    title: "Primo Soccorso Base",
    summary: "Fondamenti per interventi iniziali in attesa dei soccorsi avanzati.",
    audience: "Nuovi volontari",
    materials: [
      {
        id: "mat-psb-01",
        title: "Lezione 1 - Catena del soccorso",
        lesson: "Lezione 1",
        format: "TXT",
        updatedAt: "2026-03-01",
        size: "18 KB",
      },
      {
        id: "mat-psb-02",
        title: "Lezione 2 - Valutazione primaria",
        lesson: "Lezione 2",
        format: "TXT",
        updatedAt: "2026-03-01",
        size: "21 KB",
      },
    ],
  },
  {
    id: "blsd",
    slug: "blsd",
    title: "BLSD e Defibrillatore",
    summary: "Procedure BLSD adulto e pediatrico con linee guida aggiornate.",
    audience: "Volontari operativi",
    materials: [
      {
        id: "mat-blsd-01",
        title: "Lezione 1 - Protocollo BLSD",
        lesson: "Lezione 1",
        format: "TXT",
        updatedAt: "2026-02-26",
        size: "16 KB",
      },
      {
        id: "mat-blsd-02",
        title: "Lezione 2 - Esercitazioni guidate",
        lesson: "Lezione 2",
        format: "TXT",
        updatedAt: "2026-02-26",
        size: "19 KB",
      },
    ],
  },
  {
    id: "logistics",
    slug: "logistica-e-comunicazioni",
    title: "Logistica e Comunicazioni",
    summary: "Uso mezzi, procedure radio e coordinamento con centrale operativa.",
    audience: "Volontari trasporto e supporto",
    materials: [
      {
        id: "mat-log-01",
        title: "Lezione 1 - Check mezzi e attrezzature",
        lesson: "Lezione 1",
        format: "TXT",
        updatedAt: "2026-02-20",
        size: "14 KB",
      },
      {
        id: "mat-log-02",
        title: "Lezione 2 - Comunicazioni operative",
        lesson: "Lezione 2",
        format: "TXT",
        updatedAt: "2026-02-20",
        size: "17 KB",
      },
    ],
  },
];
