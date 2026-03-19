import { getServicePlaceholder } from "@/lib/placeholders";
import type { Service } from "./types";

export const mockServices: Service[] = [
  {
    id: "srv-trasporto-sanitario",
    slug: "trasporto-sanitario",
    title: "Trasporto sanitario assistito",
    summary: "Trasferimenti programmati e continuativi con personale qualificato.",
    description:
      "Servizio dedicato a visite, terapie e dimissioni, con pianificazione anticipata e coordinamento con le strutture sanitarie.",
    category: "trasporto",
    prenotabile: true,
    image: getServicePlaceholder("trasporto-sanitario"),
  },
  {
    id: "srv-ambulatori",
    slug: "ambulatori-e-prevenzione",
    title: "Ambulatori e prevenzione",
    summary: "Prestazioni di base e campagne periodiche di controllo.",
    description:
      "Attivita ambulatoriali con professionisti e giornate informative dedicate alla prevenzione e alla salute territoriale.",
    category: "sanitario",
    prenotabile: true,
    image: getServicePlaceholder("ambulatori-e-prevenzione"),
  },
  {
    id: "srv-supporto-sociale",
    slug: "supporto-sociale",
    title: "Supporto sociale",
    summary: "Interventi di prossimita per persone e famiglie in fragilita.",
    description:
      "Azioni coordinate con rete locale, volontari e operatori per favorire accompagnamento, ascolto e accesso ai servizi.",
    category: "sociale",
    prenotabile: false,
    image: getServicePlaceholder("supporto-sociale"),
  },
  {
    id: "srv-formazione",
    slug: "formazione-primo-soccorso",
    title: "Formazione primo soccorso",
    summary: "Corsi introduttivi e avanzati per cittadini, scuole e aziende.",
    description:
      "Programmi formativi modulati per livello e destinatari, con sessioni pratiche e rilascio attestato ove previsto.",
    category: "formazione",
    prenotabile: true,
    image: getServicePlaceholder("formazione-primo-soccorso"),
  },
  {
    id: "srv-protezione-civile",
    slug: "supporto-protezione-civile",
    title: "Supporto alla protezione civile",
    summary: "Attivita operative in emergenze meteo, logistiche e territoriali.",
    description:
      "Squadre e mezzi per interventi coordinati su piani comunali e intercomunali in collaborazione con gli enti preposti.",
    category: "sociale",
    prenotabile: false,
    image: getServicePlaceholder("supporto-protezione-civile"),
  },
  {
    id: "srv-trasporto-sociale",
    slug: "trasporto-sociale",
    title: "Trasporto sociale",
    summary: "Accompagnamento verso servizi essenziali e appuntamenti non sanitari.",
    description:
      "Servizio orientato all'inclusione e all'autonomia, con programmazione settimanale e criteri di priorita.",
    category: "trasporto",
    prenotabile: true,
    image: getServicePlaceholder("trasporto-sociale"),
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return mockServices.find((service) => service.slug === slug);
}
