import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { FAQCategoryNav } from "@/components/faq/FAQCategoryNav";
import { FAQList } from "@/components/faq/FAQList";
import { faqQuickLinks } from "@/content/faqs";
import { fetchFaqSections } from "@/lib/api/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Risposte rapide su servizi, sedi, volontariato, donazioni e limiti del canale digitale.",
};

export default async function FaqPage() {
  const faqSections = await fetchFaqSections();

  return (
    <div className="space-y-8">
      <PageHeader
        title="FAQ"
        description="Risposte sintetiche e pratiche, organizzate per percorso. Se non trovi quello che cerchi, passa dalla pagina corretta invece di cercare a caso."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Risposte veloci</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Una sola pagina per capire dove andare, cosa preparare e quale canale usare</h2>
          <p className="mt-4 max-w-3xl text-sm text-site-muted">
            Questa pagina raccoglie le domande piu frequenti in modo essenziale: servizi, contatti, volontariato, donazioni e uso corretto del sito.
            Le risposte rimandano sempre a percorsi reali del sito, cosi puoi passare subito dall'informazione all'azione.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/prenota-servizi"
              className="link-focus inline-flex items-center justify-center rounded-full bg-site-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Prenota servizi
            </Link>
            <Link
              href="/sedi-contatti"
              className="link-focus inline-flex items-center justify-center rounded-full border border-emerald-200 px-5 py-3 text-sm font-semibold text-site-ink transition hover:bg-emerald-50"
            >
              Sedi e contatti
            </Link>
            <Link
              href="/donazioni"
              className="link-focus inline-flex items-center justify-center rounded-full border border-emerald-200 px-5 py-3 text-sm font-semibold text-site-ink transition hover:bg-emerald-50"
            >
              Dona ora
            </Link>
          </div>
        </article>

        <aside className="mesh-surface rounded-2xl border border-emerald-100 p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Percorsi utili</p>
          <h2 className="mt-2 text-2xl font-semibold">Vai direttamente alla pagina giusta</h2>
          <ul className="mt-5 grid gap-3">
            {faqQuickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-focus card-lift flex items-center justify-between gap-4 rounded-xl border border-emerald-100 bg-white/80 px-4 py-3 text-sm font-semibold text-site-ink"
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true" className="text-site-accent">
                    -&gt;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <FAQCategoryNav sections={faqSections} />

        <div className="space-y-6">
          {faqSections.map((section) => (
            <FAQList key={section.id} section={section} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Servizi</p>
          <h3 className="mt-2 text-xl font-semibold">Hai gia capito cosa ti serve?</h3>
          <p className="mt-3 text-sm text-site-muted">Vai direttamente alla prenotazione o controlla il catalogo dei servizi.</p>
          <Link href="/servizi" className="link-focus mt-4 inline-flex text-sm font-semibold text-site-accent">
            Apri servizi
          </Link>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Volontariato</p>
          <h3 className="mt-2 text-xl font-semibold">Vuoi entrare come volontario?</h3>
          <p className="mt-3 text-sm text-site-muted">Leggi il percorso di ingresso e i passaggi formativi iniziali.</p>
          <Link href="/volontariato-formazione" className="link-focus mt-4 inline-flex text-sm font-semibold text-site-accent">
            Scopri il percorso
          </Link>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Contatti</p>
          <h3 className="mt-2 text-xl font-semibold">Serve una sede o un recapito?</h3>
          <p className="mt-3 text-sm text-site-muted">Usa i riferimenti istituzionali o trova la sede piu adatta al tuo territorio.</p>
          <Link href="/sedi-contatti" className="link-focus mt-4 inline-flex text-sm font-semibold text-site-accent">
            Apri contatti
          </Link>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Sostegno</p>
          <h3 className="mt-2 text-xl font-semibold">Vuoi contribuire alle attivita?</h3>
          <p className="mt-3 text-sm text-site-muted">Donazioni, 5x1000 e altri modi per sostenere i progetti locali.</p>
          <Link href="/donazioni" className="link-focus mt-4 inline-flex text-sm font-semibold text-site-accent">
            Vai alle donazioni
          </Link>
        </article>
      </section>
    </div>
  );
}
