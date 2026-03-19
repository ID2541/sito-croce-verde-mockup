import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { siteConfig } from "@/config/site";
import { placeholderImages } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Prenota servizi",
  description: "Percorso guidato per richiedere un servizio, preparare i dati utili e scegliere il canale corretto.",
};

const bookingAreas = [
  {
    title: "Trasporto sanitario",
    description: "Visite, terapie, dimissioni e trasferimenti programmati con presa in carico anticipata.",
    requirement: "Data, orario, luogo di partenza, destinazione, eventuali esigenze assistenziali.",
  },
  {
    title: "Trasporto sociale",
    description: "Accompagnamenti verso servizi essenziali, pratiche o attivita di inclusione territoriale.",
    requirement: "Motivo dell'accompagnamento, frequenza, eventuale priorita sociale.",
  },
  {
    title: "Prevenzione e ambulatori",
    description: "Informazioni su disponibilita, giornate attive e campagne rivolte alla cittadinanza.",
    requirement: "Prestazione richiesta, fascia oraria desiderata, recapito per richiamo.",
  },
];

export default function PrenotaServiziPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Prenota servizi"
        description="Richiedi un servizio attraverso i canali attualmente attivi e prepara le informazioni necessarie per la presa in carico."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Prenota servizi" }]}
      />

      <SectionImage src={placeholderImages.prenota} alt="Prenotazione servizi" ratioClassName="aspect-[21/8]" />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">Come richiedere il servizio</h2>
          <p className="mt-3 text-site-muted">
            La prenotazione online diretta non sostituisce ancora il contatto umano: il sito ti guida nella raccolta delle informazioni e
            ti indirizza verso il canale corretto per una presa in carico rapida e ordinata.
          </p>

          <ol className="mt-6 grid gap-4 text-sm text-site-muted">
            <li className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
              <span className="block text-xs font-semibold uppercase tracking-wide text-site-accent">1. Contatta la sede</span>
              Comunica il servizio richiesto, la data orientativa e il contesto della richiesta usando i recapiti ufficiali.
            </li>
            <li className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
              <span className="block text-xs font-semibold uppercase tracking-wide text-site-accent">2. Prepara i dati utili</span>
              Tieni pronti nominativo, contatto, data preferita, destinazione e informazioni operative rilevanti.
            </li>
            <li className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
              <span className="block text-xs font-semibold uppercase tracking-wide text-site-accent">3. Attendi conferma</span>
              La disponibilita viene verificata dal team, che ti ricontattera per conferma o per eventuali integrazioni.
            </li>
          </ol>

          <div className="mt-8 grid gap-4">
            {bookingAreas.map((area) => (
              <article key={area.title} className="rounded-xl border border-emerald-100 bg-white p-4">
                <h3 className="text-lg font-semibold">{area.title}</h3>
                <p className="mt-2 text-sm text-site-muted">{area.description}</p>
                <p className="mt-3 text-sm text-site-muted">
                  <span className="font-semibold text-site-ink">Da preparare:</span> {area.requirement}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Canali attivi</h2>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-site-accent">Telefono</dt>
              <dd className="mt-1 text-sm text-site-ink">{siteConfig.contactPhone}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-site-accent">Email</dt>
              <dd className="mt-1 text-sm text-site-ink">{siteConfig.contactEmail}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-site-accent">Orario servizio</dt>
              <dd className="mt-1 text-sm text-site-ink">{siteConfig.serviceHours}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-site-accent">Privacy</dt>
              <dd className="mt-1 text-sm text-site-muted">
                Prima dell'invio di dati personali, consulta l'informativa disponibile nella sezione privacy del sito.
              </dd>
            </div>
          </dl>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Per urgenze o esigenze non programmabili non usare questo percorso: fai sempre riferimento ai canali istituzionali previsti per
            le emergenze.
          </div>
        </aside>
      </section>
    </div>
  );
}
