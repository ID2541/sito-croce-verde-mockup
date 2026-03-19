import type { Metadata } from "next";
import Link from "next/link";
import { CallToActionBand } from "@/components/blocks/CallToActionBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { placeholderImages } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Area riservata",
  description: "Spazio dedicato a volontari e collaboratori per materiali interni, avvisi e documenti operativi.",
};

const privateTools = [
  {
    title: "Documenti operativi",
    text: "Procedure, materiali di servizio e riferimenti organizzativi aggiornati per il lavoro quotidiano.",
  },
  {
    title: "Turni e avvisi",
    text: "Comunicazioni essenziali per la pianificazione interna e la continuita delle attivita.",
  },
  {
    title: "Formazione",
    text: "Promemoria, materiale didattico e indicazioni per gli aggiornamenti periodici.",
  },
  {
    title: "Contatti interni",
    text: "Riferimenti del coordinamento per le necessita che non devono passare dal canale pubblico.",
  },
];

const accessNotes = [
  "L'accesso e riservato a volontari e collaboratori autorizzati.",
  "Le credenziali vengono abilitate dal coordinamento o dalla segreteria.",
  "I contenuti sensibili non vanno condivisi al di fuori dei canali interni.",
];

export default function AreaRiservataPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Area riservata"
        description="Uno spazio di accesso controllato per chi collabora con l'associazione e ha bisogno di strumenti, avvisi e documenti interni."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Area riservata" }]}
      />

      <SectionImage
        src={placeholderImages.legal}
        alt="Documenti e coordinamento in un ambiente riservato"
        ratioClassName="aspect-[21/8]"
        priority
      />

      <section className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Accesso controllato</p>
          <h2 className="mt-2 text-2xl font-semibold">Materiali interni e canali di servizio</h2>
          <p className="mt-3 text-site-muted">
            Questa pagina funziona come porta di ingresso verso gli strumenti riservati. Non sostituisce i canali pubblici:
            serve a distinguere chiaramente cio che e destinato al pubblico da cio che richiede autorizzazione.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {privateTools.map((tool) => (
              <div key={tool.title} className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                <h3 className="text-sm font-semibold text-site-ink">{tool.title}</h3>
                <p className="mt-2 text-sm text-site-muted">{tool.text}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-4 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <SectionImage
            src={placeholderImages.infoOperational}
            alt="Volontari che consultano materiali operativi in sede"
            ratioClassName="aspect-[4/3]"
            className="border-emerald-200"
          />
          <div>
            <h2 className="text-xl font-semibold">Prima di accedere</h2>
            <ul className="mt-4 space-y-3 text-sm text-site-muted">
              {accessNotes.map((note) => (
                <li key={note} className="flex gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3">
                  <span aria-hidden="true" className="mt-1 h-2 w-2 flex-none rounded-full bg-site-accent" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Utenti</p>
          <h3 className="mt-2 text-xl font-semibold">Volontari e staff</h3>
          <p className="mt-3 text-sm text-site-muted">
            Accesso previsto per chi ha un ruolo attivo nella struttura e necessita di informazioni operative aggiornate.
          </p>
        </article>
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Supporto</p>
          <h3 className="mt-2 text-xl font-semibold">Attivazione credenziali</h3>
          <p className="mt-3 text-sm text-site-muted">
            Se non hai ancora l'accesso, passa dalla pagina sedi e contatti per arrivare al riferimento corretto.
          </p>
        </article>
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Uso corretto</p>
          <h3 className="mt-2 text-xl font-semibold">Canale dedicato</h3>
          <p className="mt-3 text-sm text-site-muted">
            Le comunicazioni interne devono restare nel perimetro riservato per garantire ordine, riservatezza e tracciabilita.
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Serve supporto?</p>
            <h2 className="mt-2 text-2xl font-semibold">Per l'attivazione o per i riferimenti corretti, parti dalle sedi</h2>
            <p className="mt-3 max-w-2xl text-sm text-site-muted">
              La pagina sedi e contatti offre il percorso piu diretto per raggiungere la segreteria e il presidio operativo.
            </p>
          </div>
          <Link
            href="/sedi-contatti"
            className="link-focus inline-flex items-center justify-center rounded-full bg-site-accent px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            Vai a sedi e contatti
          </Link>
        </div>
      </section>

      <CallToActionBand
        title="Ti serve una panoramica pubblica dei servizi?"
        description="La sezione servizi spiega cosa e attivo, come funziona la prenotazione e quali richieste sono gestite dal territorio."
        actionLabel="Scopri i servizi"
        actionHref="/servizi"
      />
    </div>
  );
}
