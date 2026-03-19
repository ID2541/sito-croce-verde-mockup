import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { siteConfig } from "@/config/site";
import { placeholderImages } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Donatori sangue",
  description: "Requisiti essenziali, informazioni pratiche e contatti per chi vuole donare sangue.",
};

const steps = [
  "Verifica i requisiti di base e l'idoneita alla donazione.",
  "Contatta la sede o il referente del gruppo donatori per orientamento.",
  "Prenota il colloquio o la sessione utile secondo calendario e disponibilita.",
];

export default function DonatoriSanguePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Donatori sangue"
        description="Una pagina pratica, sintetica e piu ordinata del vecchio sito per accompagnare chi vuole iniziare o riprendere il percorso di donazione."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Donatori sangue" }]}
      />

      <SectionImage src={placeholderImages.newsDetail} alt="Iniziative per donatori sangue" ratioClassName="aspect-[21/8]" />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">Come orientarsi</h2>
          <p className="mt-3 text-site-muted">
            La sezione raccoglie le informazioni minime che non possono mancare: requisiti, riferimenti, calendario orientativo e
            contatti per il primo accesso o per aggiornare la propria disponibilita.
          </p>

          <ol className="mt-6 grid gap-4 text-sm text-site-muted">
            {steps.map((step, index) => (
              <li key={step} className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                <span className="block text-xs font-semibold uppercase tracking-wide text-site-accent">Passaggio {index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </article>

        <aside className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Contatti utili</h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-site-accent">Telefono</dt>
              <dd className="mt-1 text-site-ink">{siteConfig.contactPhone}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-site-accent">Email</dt>
              <dd className="mt-1 text-site-ink">{siteConfig.contactEmail}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-site-accent">Sedi</dt>
              <dd className="mt-1 text-site-muted">Consulta la pagina sedi e contatti per i riferimenti aggiornati del territorio.</dd>
            </div>
          </dl>

          <div className="mt-6 grid gap-3">
            <Link href="/sedi-contatti" className="rounded-xl bg-site-accent px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
              Vai a sedi e contatti
            </Link>
            <Link href="/comunita" className="rounded-xl border border-emerald-200 px-4 py-3 text-sm font-semibold text-site-ink hover:bg-site-accent-soft">
              Scopri le iniziative
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
