import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { placeholderImages } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Donazioni",
  description: "Sostieni progetti, servizi territoriali e attivita associative con donazioni e 5x1000.",
};

const donationWays = [
  {
    title: "Donazione libera",
    description: "Contributi spontanei a sostegno di servizi, mezzi, attivita di prossimita e progetti speciali.",
  },
  {
    title: "5x1000",
    description: "Indicazioni semplici per destinare il 5x1000 all'associazione nella dichiarazione dei redditi.",
  },
  {
    title: "Sostegno aziendale",
    description: "Collaborazioni con imprese, realta locali e partner che vogliono contribuire ai progetti territoriali.",
  },
];

export default function DonazioniPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Donazioni"
        description="Un'unica pagina per orientare cittadini, famiglie e aziende nelle modalita di sostegno piu immediate."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Donazioni" }]}
      />

      <SectionImage src={placeholderImages.homeHero} alt="Sostegno all'associazione" ratioClassName="aspect-[21/8]" />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Perche sostenere</p>
          <h2 className="mt-2 text-2xl font-semibold">Le donazioni tengono in piedi servizi reali, non solo il sito</h2>
          <p className="mt-3 text-site-muted">
            Mezzi, attrezzature, attivita territoriali, iniziative sociali e percorsi di supporto dipendono anche dal contributo di chi
            sceglie di sostenere l'associazione. La pagina raccoglie in modo chiaro le modalita essenziali, senza dispersione.
          </p>

          <div className="mt-6 grid gap-4">
            {donationWays.map((way) => (
              <article key={way.title} className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                <h3 className="text-lg font-semibold">{way.title}</h3>
                <p className="mt-2 text-sm text-site-muted">{way.description}</p>
              </article>
            ))}
          </div>
        </article>

        <aside className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Call to action principali</h2>
          <div className="mt-4 grid gap-3">
            <a href="mailto:segreteria@croceverde.local" className="rounded-xl bg-site-accent px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
              Contatta la segreteria
            </a>
            <Link href="/sedi-contatti" className="rounded-xl border border-emerald-200 px-4 py-3 text-sm font-semibold text-site-ink hover:bg-site-accent-soft">
              Vai a sedi e contatti
            </Link>
            <Link href="/comunita" className="rounded-xl border border-emerald-200 px-4 py-3 text-sm font-semibold text-site-ink hover:bg-site-accent-soft">
              Scopri i progetti
            </Link>
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Prima della pubblicazione definitiva inserire IBAN, causali, istruzioni 5x1000 e riferimenti amministrativi reali.
          </div>
        </aside>
      </section>
    </div>
  );
}
