export type NavItem = {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
};

export const publicNav: NavItem[] = [
  {
    label: "Chi siamo",
    href: "/chi-siamo",
    children: [
      { label: "Missione & storia", href: "/chi-siamo#missione" },
      { label: "Cosa facciamo", href: "/chi-siamo#cosa-facciamo" },
      { label: "Trasparenza", href: "/trasparenza" },
    ],
  },
  {
    label: "Servizi",
    href: "/servizi",
    children: [
      { label: "Aree di intervento", href: "/servizi#settori" },
      { label: "Prenota servizi", href: "/prenota-servizi" },
      { label: "Dona ora", href: "/donazioni" },
    ],
  },
  {
    label: "Sedi & Contatti",
    href: "/sedi-contatti",
    children: [
      { label: "Sedi territoriali", href: "/sedi-contatti#sedi" },
      { label: "Recapiti", href: "/sedi-contatti#contatti" },
    ],
  },
  {
    label: "Comunità",
    href: "/comunita",
    children: [
      { label: "Donatori sangue", href: "/donatori-sangue" },
      { label: "Protezione civile", href: "/protezione-civile" },
    ],
  },
  {
    label: "Volontariato & Formazione",
    href: "/volontariato-formazione",
  },
  {
    label: "News & Eventi",
    href: "/news-eventi",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Area Riservata (demo)",
    href: "/area-riservata",
  },
];

export const legalNav = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookie policy", href: "/cookie-policy" },
];
