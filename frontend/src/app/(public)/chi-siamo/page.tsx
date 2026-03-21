import type { Metadata } from "next";
import Link from "next/link";
import { CallToActionBand } from "@/components/blocks/CallToActionBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { placeholderImages } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Chi siamo",
  description: "Identita associativa, missione territoriale e modello organizzativo della Croce Verde.",
};

const pillars = [
  {
    title: "Missione",
    description:
      "Portare assistenza sanitaria, supporto sociale e presenza territoriale con un approccio vicino alle persone e ai bisogni quotidiani.",
  },
  {
    title: "Organizzazione",
    description:
      "Una struttura coordinata che unisce volontari, operatori e referenti dedicati per garantire continuita e chiarezza operativa.",
  },
  {
    title: "Territorio",
    description:
      "Presidi e collaborazioni costruiti con enti locali, famiglie, scuole e associazioni per rispondere in modo concreto al contesto locale.",
  },
  {
    title: "Trasparenza",
    description:
      "Informazioni essenziali, canali ufficiali e contenuti di servizio organizzati in modo semplice da consultare.",
    href: "/trasparenza",
    ctaLabel: "Apri la sezione",
  },
];

const milestones = [
  {
    label: "Presenza quotidiana",
    text: "Servizi, accompagnamenti e supporto organizzativo gestiti con continuita e attenzione ai tempi della comunita.",
  },
  {
    label: "Formazione continua",
    text: "Aggiornamento tecnico, addestramento operativo e crescita dei volontari come parte del lavoro ordinario.",
  },
  {
    label: "Rete locale",
    text: "Collaborazione con istituzioni e soggetti del territorio per coordinare le risposte nei diversi ambiti di intervento.",
  },
];

export default function ChiSiamoPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Chi siamo"
        description="Identita associativa, missione territoriale e organizzazione interna in una struttura chiara, moderna e facile da consultare."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Chi siamo" }]}
      />

      <SectionImage
        src={placeholderImages.chiSiamo}
        alt="Volontari e operatori in coordinamento all'interno della sede"
        ratioClassName="aspect-[21/8]"
        priority
      />

      <section id="missione" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pillars.map((pillar) =>
          pillar.href ? (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/40"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">{pillar.title}</p>
              <p className="mt-3 text-sm text-site-muted">{pillar.description}</p>
              <span className="mt-4 inline-flex rounded-full bg-site-accent px-3 py-1 text-xs font-semibold text-white">
                {pillar.ctaLabel}
              </span>
            </Link>
          ) : (
            <article key={pillar.title} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">{pillar.title}</p>
              <p className="mt-3 text-sm text-site-muted">{pillar.description}</p>
            </article>
          ),
        )}
      </section>

      <section id="cosa-facciamo" className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Un presidio civico, prima ancora che un portale</h2>
          <p className="mt-3 text-site-muted">
            La struttura racconta chi siamo con una logica semplice: cosa facciamo, come siamo organizzati e a chi rivolgersi nei diversi casi.
            L'obiettivo e rendere immediato il passaggio dall'informazione all'azione, senza sovraccaricare chi cerca aiuto o orientamento.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {milestones.map((item) => (
              <div key={item.label} className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                <h3 className="text-sm font-semibold text-site-ink">{item.label}</h3>
                <p className="mt-2 text-sm text-site-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-4 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <SectionImage
            src={placeholderImages.infoOperational}
            alt="Coordinamento operativo tra volontari e sala sede"
            ratioClassName="aspect-[4/3]"
            className="border-emerald-200"
          />
          <div>
            <h2 className="text-xl font-semibold">Come lavoriamo</h2>
            <p className="mt-2 text-sm text-site-muted">
              Le attivita quotidiane sono organizzate in aree di responsabilita, con un coordinamento che tiene insieme servizio, turni,
              comunicazione e rapporti con il territorio.
            </p>
          </div>
        </aside>
      </section>

      <CallToActionBand
        title="Vuoi conoscere meglio la rete associativa?"
        description="La sezione comunita raccoglie i percorsi di partecipazione, le iniziative e i canali per contribuire in modo attivo."
        actionLabel="Vai alla comunita"
        actionHref="/comunita"
      />
    </div>
  );
}
