import type { Metadata } from "next";
import Link from "next/link";
import { CallToActionBand } from "@/components/blocks/CallToActionBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { placeholderImages } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Area riservata",
  description: "Anteprima del perimetro funzionale previsto per lo spazio interno dedicato a volontari e collaboratori.",
};

const privateTools = [
  {
    title: "Documenti operativi",
    text: "Procedure, manuali e materiali di servizio che nel progetto finale saranno disponibili solo ad accesso autenticato.",
  },
  {
    title: "Turni e avvisi",
    text: "Comunicazioni interne, pianificazione e aggiornamenti destinati a volontari e staff.",
  },
  {
    title: "Formazione",
    text: "Materiali didattici, promemoria e percorsi di aggiornamento che richiederanno controllo accessi.",
  },
  {
    title: "Contatti interni",
    text: "Riferimenti del coordinamento e canali interni esclusi dalla navigazione pubblica.",
  },
];

const implementationNotes = [
  "Questa pagina nella demo mostra solo struttura e priorita informative.",
  "Login, sessioni, ruoli e download protetti non sono inclusi nel deploy GitHub Pages.",
  "L'applicazione finale dovra collegare questa area a backend, CMS e policy di accesso.",
];

export default function AreaRiservataPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Area riservata"
        description="Anteprima funzionale dello spazio interno: utile per spiegare all'agenzia cosa andra realizzato, senza simulare accessi o strumenti non presenti."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Area riservata" }]}
      />

      <SectionImage
        src={placeholderImages.legal}
        alt="Anteprima del perimetro funzionale dell'area riservata"
        ratioClassName="aspect-[21/8]"
        priority
      />

      <section className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Preview architetturale</p>
          <h2 className="mt-2 text-2xl font-semibold">Perimetro previsto per il futuro spazio interno</h2>
          <p className="mt-3 text-site-muted">
            In questa demo la sezione non e operativa: serve a mostrare funzioni, gerarchie e priorita di progetto. L'obiettivo e dare
            all'agenzia un riferimento chiaro su cosa andra collegato a backend, ruoli e workflow editoriali.
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
            alt="Volontari che consultano informazioni operative"
            ratioClassName="aspect-[4/3]"
            className="border-emerald-200"
          />
          <div>
            <h2 className="text-xl font-semibold">Cosa non e incluso nel mock</h2>
            <ul className="mt-4 space-y-3 text-sm text-site-muted">
              {implementationNotes.map((note) => (
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
            Il prodotto finale dovra distinguere accessi e permessi tra ruoli diversi, senza esporre contenuti interni sul sito pubblico.
          </p>
        </article>
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Controlli</p>
          <h3 className="mt-2 text-xl font-semibold">Sessioni e policy</h3>
          <p className="mt-3 text-sm text-site-muted">
            Login, cookie, sessioni e protezione delle risorse sono esplicitamente rimandati all'implementazione applicativa vera.
          </p>
        </article>
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Handoff</p>
          <h3 className="mt-2 text-xl font-semibold">Specifiche di progetto</h3>
          <p className="mt-3 text-sm text-site-muted">
            Questa pagina puo essere usata come riferimento per definire backlog, UX e dipendenze tecniche della futura area interna.
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Serve contesto?</p>
            <h2 className="mt-2 text-2xl font-semibold">Per contatti operativi o orientamento, il mock rimanda sempre alle sedi</h2>
            <p className="mt-3 max-w-2xl text-sm text-site-muted">
              Il sito demo non simula autenticazione o aperture credenziali. Per mantenere coerenza, i percorsi pubblici restano ancorati a
              servizi e recapiti reali.
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
        title="Vuoi vedere il perimetro pubblico collegato a questa area?"
        description="La sezione volontariato e formazione resta il punto di ingresso pubblico, mentre l'area riservata e solo un riferimento di progetto."
        actionLabel="Scopri volontariato"
        actionHref="/volontariato-formazione"
      />
    </div>
  );
}
