import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { fetchServices } from "@/lib/api/services";
import { getServicePlaceholder, placeholderImages } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Servizi",
  description: "Aree di intervento, servizi attivi e percorsi rapidi di prenotazione e contatto.",
};

const categoryMeta = {
  sanitario: {
    title: "Sanitario e prevenzione",
    description: "Prestazioni di prossimita, supporto a visite e attivita di prevenzione.",
  },
  trasporto: {
    title: "Trasporti assistiti",
    description: "Accompagnamenti sanitari e sociali con organizzazione programmata.",
  },
  sociale: {
    title: "Supporto sociale e territorio",
    description: "Interventi di rete, prossimita e protezione civile.",
  },
  formazione: {
    title: "Formazione",
    description: "Corsi per cittadini, volontari, scuole e realta del territorio.",
  },
} as const;

export default async function ServiziPage() {
  const services = await fetchServices();
  const groupedServices = Object.entries(categoryMeta)
    .map(([category, meta]) => ({
      category,
      ...meta,
      items: services.filter((service) => service.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Servizi"
        description="Un unico hub per capire cosa facciamo, quali servizi sono attivi e quale percorso seguire per prenotazioni, informazioni o supporto territoriale."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Servizi" }]}
      />

      <SectionImage src={placeholderImages.serviziHero} alt="Servizi territoriali" ratioClassName="aspect-[21/8]" />

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Cosa trovi qui</p>
          <h2 className="mt-2 text-2xl font-semibold">Servizi organizzati per area, non dispersi in decine di pagine</h2>
          <p className="mt-3 text-site-muted">
            Il catalogo raccoglie le principali aree di intervento dell'associazione: trasporti, prevenzione, supporto sociale,
            protezione civile e formazione. Ogni blocco chiarisce a chi si rivolge, quando conviene prenotare e quale canale usare.
          </p>
        </article>

        <aside className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Percorsi rapidi</h2>
          <div className="mt-4 grid gap-3">
            <Link href="/prenota-servizi" className="rounded-xl bg-site-accent px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
              Prenota un servizio
            </Link>
            <Link href="/sedi-contatti" className="rounded-xl border border-emerald-200 px-4 py-3 text-sm font-semibold text-site-ink hover:bg-site-accent-soft">
              Trova sede e contatti
            </Link>
            <Link href="/donazioni" className="rounded-xl border border-emerald-200 px-4 py-3 text-sm font-semibold text-site-ink hover:bg-site-accent-soft">
              Sostieni le attivita
            </Link>
          </div>
        </aside>
      </section>

      {groupedServices.length > 0 ? (
        <>
          <section id="settori" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {groupedServices.map((group) => (
              <Link
                key={group.category}
                href={`#${group.category}`}
                className="card-lift rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">{group.items.length} servizi</p>
                <h2 className="mt-2 text-xl font-semibold">{group.title}</h2>
                <p className="mt-3 text-sm text-site-muted">{group.description}</p>
              </Link>
            ))}
          </section>

          <div className="space-y-6">
            {groupedServices.map((group) => (
              <section
                key={group.category}
                id={group.category}
                className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">{group.title}</p>
                  <h2 className="mt-2 text-2xl font-semibold">{group.description}</h2>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  {group.items.map((service) => (
                    <article key={service.id} id={service.slug} className="overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/40">
                      <SectionImage
                        src={service.image ?? getServicePlaceholder(service.slug)}
                        alt={`Servizio ${service.title}`}
                        ratioClassName="aspect-[16/9]"
                        className="rounded-none border-0 shadow-none"
                      />
                      <div className="p-5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-site-accent">
                            {service.prenotabile ? "Prenotabile" : "Informativo"}
                          </span>
                          <span className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-site-muted">
                            {service.category}
                          </span>
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                        <p className="mt-2 text-sm text-site-muted">{service.summary}</p>
                        <p className="mt-4 text-sm text-site-muted">{service.description}</p>

                        <div className="mt-5 flex flex-wrap gap-3">
                          {service.prenotabile ? (
                            <Link
                              href="/prenota-servizi"
                              className="rounded-full bg-site-accent px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                            >
                              Vai alla prenotazione
                            </Link>
                          ) : (
                            <Link
                              href="/sedi-contatti"
                              className="rounded-full bg-site-accent px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                            >
                              Contatta la sede
                            </Link>
                          )}
                          <Link
                            href="/sedi-contatti"
                            className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-site-ink hover:bg-white"
                          >
                            Recapiti utili
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </>
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-site-muted shadow-sm">
          I servizi non sono disponibili online in questo momento.
        </section>
      )}
    </div>
  );
}
