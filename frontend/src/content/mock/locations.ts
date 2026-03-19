import { getLocationPlaceholder } from "@/lib/placeholders";
import type { Location } from "./types";

export const mockLocations: Location[] = [
  {
    id: "loc-centrale",
    slug: "sede-centrale",
    name: "Sede centrale",
    area: "Lucca centro",
    address: "Via principale 1, Lucca",
    phone: "+39 0583 000000",
    hours: "Lun-Sab 08:00-20:00",
    notes: "Punto di coordinamento servizi, centralino e accoglienza utenti.",
    image: getLocationPlaceholder("sede-centrale"),
  },
  {
    id: "loc-nord",
    slug: "sezione-nord",
    name: "Sezione Nord",
    area: "Area nord",
    address: "Via secondaria 25, Lucca",
    phone: "+39 0583 000101",
    hours: "Lun-Ven 09:00-18:00",
    notes: "Supporto servizi sociali e attivita di prossimita.",
    image: getLocationPlaceholder("sezione-nord"),
  },
  {
    id: "loc-est",
    slug: "sezione-est",
    name: "Sezione Est",
    area: "Area est",
    address: "Piazza civica 4, Capannori",
    phone: "+39 0583 000202",
    hours: "Lun-Sab 08:30-19:00",
    notes: "Punto operativo per trasporti programmati e orientamento.",
    image: getLocationPlaceholder("sezione-est"),
  },
  {
    id: "loc-valle",
    slug: "sezione-valle",
    name: "Sezione Valle",
    area: "Media valle",
    address: "Via valle 12, Borgo a Mozzano",
    phone: "+39 0583 000303",
    hours: "Mar-Sab 09:00-17:30",
    notes: "Presidio locale per attivita con volontari e rete associativa.",
    image: getLocationPlaceholder("sezione-valle"),
  },
];
