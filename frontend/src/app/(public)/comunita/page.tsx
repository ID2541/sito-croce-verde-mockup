import type { Metadata } from "next";
import Link from "next/link";
import { CallToActionBand } from "@/components/blocks/CallToActionBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { placeholderImages } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Comunita",
  description: "Partecipazione, volontariato, donazioni e relazioni con il territorio raccontate in un unico spazio.",
};

const communityAreas = [
  {
    title: "Volontariato",
    text: "Percorsi di ingresso, affiancamento e formazione per chi vuole contribuire con tempo e competenze.",
  },
  {
    title: "Donatori",
    text: "Informazioni essenziali per sostenere il territorio in modo continuativo e organizzato.",
  },
  {
    title: "Scuole e associazioni",
    text: "Iniziative educative, incontri informativi e progetti condivisi con la rete locale.",
  },
  {
    title: "Eventi e campagne",
    text: "Attivita pubbliche, giornate tematiche e occasioni per far conoscere i servizi alla cittadinanza.",
  },
];

const participationSteps = [
  "Scopri le aree di intervento e individua quella piu vicina al tuo interesse.",
  "Contatta la sede o la segreteria per ricevere indicazioni sul percorso piu adatto.",
  "Partecipa agli incontri introduttivi e alle attivita di affiancamento.",
];

export default function ComunitaPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Comunita"
        description="Uno spazio editoriale e istituzionale che mette in relazione volontari, cittadini, donatori e partner territoriali."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Comunita" }]}
      />

      <SectionImage
        src={placeholderImages.newsHeader}
        alt="Persone della comunita riunite in un incontro pubblico"
        ratioClassName="aspect-[21/8]"
        priority
      />

      <section className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Partecipazione</p>
          <h2 className="mt-2 text-2xl font-semibold">La comunita come infrastruttura sociale</h2>
          <p className="mt-3 text-site-muted">
            La comunita non e una sezione accessoria: e il luogo in cui si intrecciano cura, prossimita, informazione e fiducia.
            Questa pagina valorizza chi partecipa, chi sostiene e chi si avvicina per la prima volta all'associazione.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {communityAreas.map((area) => (
              <div key={area.title} className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                <h3 className="text-sm font-semibold text-site-ink">{area.title}</h3>
                <p className="mt-2 text-sm text-site-muted">{area.text}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-4 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <SectionImage
            src={placeholderImages.infoOperational}
            alt="Volontari e cittadini durante un incontro di orientamento"
            ratioClassName="aspect-[4/3]"
            className="border-emerald-200"
          />
          <div>
            <h2 className="text-xl font-semibold">Come partecipare</h2>
            <ul className="mt-4 space-y-3 text-sm text-site-muted">
              {participationSteps.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-site-accent text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Donazioni</p>
          <h3 className="mt-2 text-xl font-semibold">Sostegno concreto</h3>
          <p className="mt-3 text-sm text-site-muted">
            Contributi e iniziative di raccolta aiutano a sostenere mezzi, attrezzature, attivita sociali e formazione.
          </p>
        </article>
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Informazione</p>
          <h3 className="mt-2 text-xl font-semibold">Eventi e aggiornamenti</h3>
          <p className="mt-3 text-sm text-site-muted">
            La comunicazione editoriale raccoglie novita, campagne e appuntamenti che riguardano la vita associativa.
          </p>
        </article>
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Rete</p>
          <h3 className="mt-2 text-xl font-semibold">Collaborazioni territoriali</h3>
          <p className="mt-3 text-sm text-site-muted">
            Progetti condivisi con scuole, imprese sociali e istituzioni rafforzano il presidio sul territorio.
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Accesso rapido</p>
            <h2 className="mt-2 text-2xl font-semibold">Se sei gia volontario, entra nell'area riservata</h2>
            <p className="mt-3 max-w-2xl text-sm text-site-muted">
              Comunicazioni interne, materiali operativi e documenti di servizio vengono raccolti in uno spazio dedicato ai membri autorizzati.
            </p>
          </div>
          <Link
            href="/area-riservata"
            className="link-focus inline-flex items-center justify-center rounded-full bg-site-accent px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            Vai all'area riservata
          </Link>
        </div>
      </section>

      <CallToActionBand
        title="Vuoi conoscere i servizi attivi?"
        description="La sezione servizi raccoglie le informazioni utili per orientarti tra trasporti, supporto e prenotazioni."
        actionLabel="Scopri i servizi"
        actionHref="/servizi"
      />
    </div>
  );
}
