import type { Metadata } from "next";
import Link from "next/link";
import { CallToActionBand } from "@/components/blocks/CallToActionBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { placeholderImages } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Sedi e contatti",
  description: "Riferimenti, sedi territoriali e canali utili per raggiungere la struttura nel modo corretto.",
};

const contactCards = [
  {
    title: "Segreteria",
    text: "Per informazioni generali, orientamento sui servizi e richieste di primo contatto.",
  },
  {
    title: "Presidio operativo",
    text: "Per coordinamento dei mezzi, disponibilita dei servizi e urgenze organizzative.",
  },
  {
    title: "Supporto volontari",
    text: "Per turni, materiali interni e riferimenti del coordinamento associativo.",
  },
  {
    title: "Area servita",
    text: "Per richieste dal territorio e per indirizzare correttamente la sede di riferimento.",
  },
];

const locations = [
  {
    name: "Sede centrale",
    note: "Centro di coordinamento, segreteria e presidio amministrativo.",
    details: ["Sportello informazioni", "Coordinamento turni", "Riferimento istituzionale"],
  },
  {
    name: "Sezione territoriale nord",
    note: "Presenza di prossimita per i servizi programmati e l'attivita di volontariato.",
    details: ["Servizi territoriali", "Supporto eventi", "Logistica locale"],
  },
  {
    name: "Sezione territoriale est",
    note: "Punto di raccordo per le attivita di comunita e i bisogni di quartiere.",
    details: ["Contatti di area", "Incontri operativi", "Supporto campagne"],
  },
  {
    name: "Punto servizi valle",
    note: "Riferimento per chi proviene dalle zone piu esterne del territorio servito.",
    details: ["Accompagnamenti", "Servizi su prenotazione", "Indicazioni di accesso"],
  },
];

export default function SediContattiPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Sedi e contatti"
        description="Una pagina unica per capire dove rivolgersi, come raggiungere la struttura e quale canale usare nei diversi casi."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sedi e contatti" }]}
      />

      <SectionImage
        src={placeholderImages.contatti}
        alt="Sede con volontari e sportello di accoglienza"
        ratioClassName="aspect-[21/8]"
        priority
      />

      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <article id="contatti" className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Canali da usare in base al bisogno</h2>
          <p className="mt-3 text-sm text-site-muted">
            Il sito separa i contatti istituzionali da quelli operativi per ridurre i tempi di risposta. Se non sai da dove iniziare,
            usa la segreteria o consulta prima l'area servizi.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {contactCards.map((card) => (
              <div key={card.title} className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">{card.title}</p>
                <p className="mt-2 text-sm text-site-muted">{card.text}</p>
              </div>
            ))}
          </div>
        </article>

        <aside id="sedi" className="space-y-4 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <SectionImage
            src={placeholderImages.sezione}
            alt="Mappa stilizzata delle sedi e dei riferimenti territoriali"
            ratioClassName="aspect-[4/3]"
            className="border-emerald-200"
          />
          <div>
            <h2 className="text-xl font-semibold">Sedi territoriali</h2>
            <p className="mt-2 text-sm text-site-muted">
              La distribuzione delle sedi aiuta a indirizzare richieste e servizi sul punto piu vicino al cittadino.
            </p>
          </div>
        </aside>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {locations.map((location) => (
          <article key={location.name} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{location.name}</h2>
            <p className="mt-2 text-sm text-site-muted">{location.note}</p>
            <ul className="mt-4 space-y-2 text-sm text-site-muted">
              {location.details.map((detail) => (
                <li key={detail} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-site-accent" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Accesso rapido</p>
            <h2 className="mt-2 text-2xl font-semibold">Serve una risposta operativa piu veloce?</h2>
            <p className="mt-3 max-w-2xl text-sm text-site-muted">
              Dalla pagina servizi puoi trovare le informazioni essenziali su trasporti, prenotazioni e supporto alla persona.
            </p>
          </div>
          <Link
            href="/servizi"
            className="link-focus inline-flex items-center justify-center rounded-full bg-site-accent px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            Vai ai servizi
          </Link>
        </div>
      </section>

      <CallToActionBand
        title="Devi prenotare un servizio?"
        description="La pagina prenotazioni raccoglie i canali operativi e le informazioni preliminari utili a completare la richiesta."
        actionLabel="Prenota un servizio"
        actionHref="/prenota-servizi"
      />
    </div>
  );
}
