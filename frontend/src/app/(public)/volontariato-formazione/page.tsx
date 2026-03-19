import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { placeholderImages } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Volontariato e formazione",
  description: "Percorsi di ingresso, orientamento e formazione per nuovi volontari e volontari attivi.",
};

const tracks = [
  {
    title: "Primo orientamento",
    description: "Colloquio iniziale, presentazione dell'associazione e chiarimento delle aree di attivita.",
  },
  {
    title: "Formazione di base",
    description: "Percorsi introduttivi su organizzazione, relazione con il territorio e nozioni operative essenziali.",
  },
  {
    title: "Aggiornamento continuo",
    description: "Sessioni periodiche di addestramento, affiancamento e specializzazione.",
  },
];

export default function VolontariatoFormazionePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Volontariato & Formazione"
        description="Una pagina unificata per ingresso, crescita e aggiornamento dei volontari, senza separare artificialmente orientamento e formazione."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Volontariato & Formazione" }]}
      />

      <SectionImage src={placeholderImages.chiSiamo} alt="Volontari in attivita formativa" ratioClassName="aspect-[21/8]" />

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold">Come si entra e come si cresce</h2>
        <p className="mt-3 text-site-muted">
          Il vecchio sito separava molto i contenuti. Qui il percorso e piu semplice: capire se si vuole entrare, conoscere l'impegno
          richiesto, avviare il colloquio e seguire la formazione necessaria per operare con responsabilita.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {tracks.map((track) => (
            <article key={track.title} className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <h3 className="text-lg font-semibold">{track.title}</h3>
              <p className="mt-2 text-sm text-site-muted">{track.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Per chi vuole iniziare</h2>
          <p className="mt-3 text-sm text-site-muted">
            La candidatura deve essere accompagnata da un contatto iniziale, disponibilita orientativa e interesse per una o piu aree di
            attivita. Il sito deve aiutare a capire questo passaggio, non sostituirlo con un form confuso.
          </p>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Per i volontari attivi</h2>
          <p className="mt-3 text-sm text-site-muted">
            Questa sezione puo ospitare in seguito calendari, moduli e materiali, mentre oggi funziona come punto di orientamento verso
            area riservata, aggiornamenti e riferimenti organizzativi.
          </p>
        </article>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/area-riservata" className="rounded-full bg-site-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
          Vai all'area riservata
        </Link>
        <Link href="/sedi-contatti" className="rounded-full border border-emerald-200 px-5 py-2.5 text-sm font-semibold text-site-ink hover:bg-site-accent-soft">
          Contatta la sede
        </Link>
      </div>
    </div>
  );
}
