export type FaqCategoryId =
  | "servizi-e-prenotazioni"
  | "sedi-e-contatti"
  | "volontariato-e-formazione"
  | "donazioni-e-5x1000"
  | "emergenze-e-sito";

export type FaqLink = {
  label: string;
  href: string;
};

export type FaqCategory = {
  id: FaqCategoryId;
  title: string;
  description: string;
  eyebrow: string;
};

export type FaqItem = {
  id: string;
  slug: string;
  category: FaqCategoryId;
  question: string;
  answer: string[];
  links?: FaqLink[];
  featured?: boolean;
};

export type FaqSection = FaqCategory & {
  items: FaqItem[];
};

export const faqCategories = [
  {
    id: "servizi-e-prenotazioni",
    title: "Servizi e prenotazioni",
    eyebrow: "Percorso operativo",
    description: "Come capire quale servizio usare, cosa preparare e dove andare per una richiesta corretta.",
  },
  {
    id: "sedi-e-contatti",
    title: "Sedi e contatti",
    eyebrow: "Riferimenti utili",
    description: "A chi scrivere o telefonare quando serve orientamento, supporto o un contatto territoriale.",
  },
  {
    id: "volontariato-e-formazione",
    title: "Volontariato e formazione",
    eyebrow: "Ingresso e crescita",
    description: "Indicazioni per entrare come volontario e per capire i percorsi formativi disponibili.",
  },
  {
    id: "donazioni-e-5x1000",
    title: "Donazioni e 5x1000",
    eyebrow: "Sostegno",
    description: "Come sostenere le attivita con una donazione, con il 5x1000 o con altri contributi.",
  },
  {
    id: "emergenze-e-sito",
    title: "Emergenze e sito",
    eyebrow: "Limiti del canale digitale",
    description: "Quando il sito basta e quando invece serve un canale urgente o un contatto diretto.",
  },
] as const satisfies readonly FaqCategory[];

export const faqItems = [
  {
    id: "come-prenotare-un-servizio",
    slug: "come-prenotare-un-servizio",
    category: "servizi-e-prenotazioni",
    question: "Come prenoto un servizio?",
    answer: [
      "La via piu rapida e partire dalla pagina Prenota servizi, dove trovi il percorso operativo e i riferimenti per avviare la richiesta.",
      "Se non sai ancora quale servizio ti serve, parti prima da Servizi per capire l'area corretta e poi torna alla prenotazione.",
    ],
    links: [{ label: "Prenota un servizio", href: "/prenota-servizi" }],
    featured: true,
  },
  {
    id: "cosa-preparare-prima-di-contattare",
    slug: "cosa-preparare-prima-di-contattare",
    category: "servizi-e-prenotazioni",
    question: "Cosa devo preparare prima di contattarvi?",
    answer: [
      "Tieni a portata di mano il motivo della richiesta, il luogo di partenza e arrivo, un recapito telefonico e, se serve, eventuali indicazioni utili per l'accompagnamento.",
      "Questo riduce passaggi inutili e aiuta lo sportello a indirizzarti subito al canale corretto.",
    ],
    links: [{ label: "Vai ai servizi", href: "/servizi" }],
  },
  {
    id: "serve-prima-un-contatto-o-una-prenotazione",
    slug: "serve-prima-un-contatto-o-una-prenotazione",
    category: "servizi-e-prenotazioni",
    question: "Prima devo scrivere o posso prenotare subito?",
    answer: [
      "Per i servizi programmati conviene passare dalla prenotazione. Se invece hai un dubbio sul tipo di prestazione o sul punto di accesso, usa prima i contatti territoriali.",
      "La pagina Servizi e la pagina Sedi e contatti sono pensate proprio per ridurre i passaggi a vuoto.",
    ],
    links: [
      { label: "Sedi e contatti", href: "/sedi-contatti" },
      { label: "Prenota servizi", href: "/prenota-servizi" },
    ],
  },
  {
    id: "quale-sede-devo-usare",
    slug: "quale-sede-devo-usare",
    category: "sedi-e-contatti",
    question: "Come capisco quale sede devo usare?",
    answer: [
      "Usa la sede centrale per informazioni generali e i punti territoriali quando la tua richiesta riguarda una zona precisa del territorio servito.",
      "Se hai un dubbio, la segreteria resta il primo riferimento per l'orientamento.",
    ],
    links: [{ label: "Apri la pagina sedi e contatti", href: "/sedi-contatti" }],
    featured: true,
  },
  {
    id: "quali-contatti-devo-usare",
    slug: "quali-contatti-devo-usare",
    category: "sedi-e-contatti",
    question: "A chi scrivo per un'informazione rapida?",
    answer: [
      "Per informazioni generali usa i recapiti istituzionali. Per esigenze operative usa la pagina Servizi o il contatto della sede di riferimento.",
      "Questo evita che una richiesta amministrativa finisca su un canale pensato per i servizi.",
    ],
    links: [{ label: "Vedi i recapiti", href: "/sedi-contatti#contatti" }],
  },
  {
    id: "come-diventare-volontario",
    slug: "come-diventare-volontario",
    category: "volontariato-e-formazione",
    question: "Come posso diventare volontario?",
    answer: [
      "Parti dalla pagina Volontariato e formazione, dove trovi il percorso di ingresso, il primo orientamento e le informazioni base per candidarti.",
      "Dopo il primo contatto, il team ti indica l'area piu adatta e i passi successivi.",
    ],
    links: [{ label: "Volontariato e formazione", href: "/volontariato-formazione" }],
    featured: true,
  },
  {
    id: "serve-una-formazione-iniziale",
    slug: "serve-una-formazione-iniziale",
    category: "volontariato-e-formazione",
    question: "Serve una formazione prima di iniziare?",
    answer: [
      "Si. Il percorso prevede orientamento e formazione iniziale, cosi da capire ruoli, responsabilita e attivita disponibili.",
      "Le informazioni aggiornate sui percorsi formativi sono raccolte nella sezione dedicata al volontariato.",
    ],
    links: [{ label: "Scopri la formazione", href: "/volontariato-formazione" }],
  },
  {
    id: "come-sostenere-con-donazione",
    slug: "come-sostenere-con-donazione",
    category: "donazioni-e-5x1000",
    question: "Come posso sostenere l'associazione?",
    answer: [
      "Puoi contribuire con una donazione diretta, con il 5x1000 oppure seguendo le iniziative dedicate al sostegno delle attivita territoriali.",
      "La pagina Donazioni raccoglie i percorsi piu semplici da usare per cittadini e aziende.",
    ],
    links: [{ label: "Dona ora", href: "/donazioni" }],
    featured: true,
  },
  {
    id: "a-cosa-serve-il-5x1000",
    slug: "a-cosa-serve-il-5x1000",
    category: "donazioni-e-5x1000",
    question: "A cosa serve il 5x1000?",
    answer: [
      "Il 5x1000 aiuta a sostenere mezzi, attrezzature, formazione e attivita di prossimita senza costi aggiuntivi per il contribuente.",
      "Se vuoi capire come destinare il tuo contributo, consulta la pagina Donazioni.",
    ],
    links: [{ label: "Info donazioni", href: "/donazioni" }],
  },
  {
    id: "emergenza-come-devo-usare-il-sito",
    slug: "emergenza-come-devo-usare-il-sito",
    category: "emergenze-e-sito",
    question: "Posso usare il sito per un'emergenza?",
    answer: [
      "No. Il sito e pensato per orientamento, informazione e prenotazioni, non per gestire situazioni urgenti in tempo reale.",
      "In caso di emergenza usa il canale di soccorso appropriato e i numeri di emergenza del territorio.",
    ],
    links: [{ label: "Vai ai contatti utili", href: "/sedi-contatti" }],
  },
  {
    id: "dove-trovo-news-e-eventi",
    slug: "dove-trovo-news-e-eventi",
    category: "emergenze-e-sito",
    question: "Dove trovo gli aggiornamenti e gli eventi?",
    answer: [
      "Le novita editoriali, le campagne e gli appuntamenti della comunita sono raccolti nella pagina News & Eventi.",
      "E il posto giusto per seguire iniziative pubbliche e aggiornamenti di servizio.",
    ],
    links: [{ label: "News e eventi", href: "/news-eventi" }],
  },
] as const satisfies readonly FaqItem[];

export const faqSections: FaqSection[] = faqCategories.map((category) => ({
  ...category,
  items: faqItems.filter((item) => item.category === category.id),
}));

export const faqMetadataBySlug = Object.fromEntries(faqItems.map((item) => [item.slug, item])) as Record<string, FaqItem>;

export const faqQuickLinks = [
  { label: "Prenota servizi", href: "/prenota-servizi" },
  { label: "Sedi e contatti", href: "/sedi-contatti" },
  { label: "Volontariato e formazione", href: "/volontariato-formazione" },
  { label: "Dona ora", href: "/donazioni" },
  { label: "Area riservata", href: "/area-riservata" },
] as const;
