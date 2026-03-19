export const utilityLinks = [
  { label: "Facebook", href: "https://www.facebook.com/", external: true },
  { label: "Area Riservata", href: "/area-riservata" },
] as const;

export const footerInstitutionalLinks = [
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Servizi", href: "/servizi" },
  { label: "Sedi & Contatti", href: "/sedi-contatti" },
  { label: "Protezione Civile", href: "/protezione-civile" },
  { label: "Volontariato & Formazione", href: "/volontariato-formazione" },
  { label: "Comunita", href: "/comunita" },
] as const;

export const footerActionLinks = [
  { label: "Prenota Servizi", href: "/prenota-servizi" },
  { label: "Dona Ora", href: "/donazioni" },
  { label: "Donatori Sangue", href: "/donatori-sangue" },
  { label: "News & Eventi", href: "/news-eventi" },
  { label: "Area Riservata", href: "/area-riservata" },
] as const;

export const homePathways = [
  {
    title: "Richiedi un servizio",
    description: "Prenotazioni guidate, recapiti operativi e informazioni necessarie per la presa in carico.",
    href: "/prenota-servizi",
    badge: "Servizi",
    accent: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "Sostieni l'associazione",
    description: "Donazioni, 5x1000 e modalita con cui cittadini e aziende possono contribuire ai progetti.",
    href: "/donazioni",
    badge: "Sostegno",
    accent: "bg-rose-100 text-rose-800",
  },
  {
    title: "Diventa volontario",
    description: "Percorsi di ingresso, formazione e materiali dedicati ai volontari attivi e ai nuovi candidati.",
    href: "/volontariato-formazione",
    badge: "Volontariato",
    accent: "bg-sky-100 text-sky-800",
  },
  {
    title: "Trova la sede giusta",
    description: "Sedi, contatti, orari e riferimenti territoriali per orientarti rapidamente.",
    href: "/sedi-contatti",
    badge: "Territorio",
    accent: "bg-amber-100 text-amber-800",
  },
] as const;

export const communityHighlights = [
  {
    title: "Donatori Sangue",
    description: "Informazioni pratiche, requisiti, percorsi di adesione e contatti utili per chi vuole donare.",
    href: "/donatori-sangue",
  },
  {
    title: "Comunita & Progetti",
    description: "Biblioteca sociale, iniziative territoriali, campagne stagionali e attivita aperte alla cittadinanza.",
    href: "/comunita",
  },
  {
    title: "Protezione Civile",
    description: "Attivita operative, mezzi, squadre e ambiti di intervento sul territorio.",
    href: "/protezione-civile",
  },
] as const;
