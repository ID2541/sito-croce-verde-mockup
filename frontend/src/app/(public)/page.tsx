import Link from "next/link";
import { CallToActionBand } from "@/components/blocks/CallToActionBand";
import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { Hero } from "@/components/blocks/Hero";
import { NewsList } from "@/components/blocks/NewsList";
import { SectionImage } from "@/components/media/SectionImage";
import { communityHighlights, homePathways } from "@/content/site";
import { fetchLocations } from "@/lib/api/locations";
import { fetchPublishedPosts } from "@/lib/api/posts";
import { fetchServices } from "@/lib/api/services";
import { getServicePlaceholder, placeholderImages } from "@/lib/placeholders";

export default async function HomePage() {
  const [posts, services, locations] = await Promise.all([
    fetchPublishedPosts(),
    fetchServices(),
    fetchLocations(),
  ]);

  const featuredPosts = posts.slice(0, 3);
  const proofItems = [
    { label: "Servizi attivi", value: String(services.length || 6) },
    { label: "Sedi presidiate", value: String(locations.length || 4) },
    { label: "Percorsi cittadini", value: "Donazioni, prenotazioni, sangue" },
    { label: "Accessi rapidi", value: "Area riservata & news" },
  ];

  return (
    <div className="space-y-10">
      <Hero
        eyebrow="Pubblica assistenza"
        title="Presidio territoriale, servizi alla persona e comunita in un unico portale"
        description="Un sito pensato per cittadini, volontari e famiglie: orientamento rapido, servizi attivabili, riferimenti territoriali e aggiornamenti utili senza rumore."
        actions={[
          { label: "Prenota un servizio", href: "/prenota-servizi", variant: "secondary" },
          { label: "Dona ora", href: "/donazioni", variant: "warm" },
        ]}
        meta="Servizi, volontariato, protezione civile, donazioni e aggiornamenti di territorio"
        imageSrc={placeholderImages.homeHero}
        imageAlt="Volontari e operatori in coordinamento territoriale"
        imageCaption="Accoglienza, coordinamento operativo e presenza di prossimita sul territorio"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {proofItems.map((item) => (
          <article key={item.label} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">{item.label}</p>
            <p className="mt-3 text-lg font-semibold text-site-ink">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
        {homePathways.map((pathway) => (
          <Link
            key={pathway.href}
            href={pathway.href}
            className="card-lift rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm"
          >
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${pathway.accent}`}>
              {pathway.badge}
            </span>
            <h2 className="mt-4 text-xl font-semibold">{pathway.title}</h2>
            <p className="mt-3 text-sm text-site-muted">{pathway.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-site-accent">
              Apri percorso
              <span aria-hidden="true">-&gt;</span>
            </span>
          </Link>
        ))}
      </section>

      {services.length > 0 ? (
        <FeatureGrid
          title="Aree di intervento"
          items={services.slice(0, 6).map((service) => ({
            title: service.title,
            description: service.summary,
            href: "/servizi",
            badge: service.category,
            imageSrc: service.image ?? getServicePlaceholder(service.slug),
            imageAlt: `Servizio ${service.title}`,
          }))}
        />
      ) : (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          Il catalogo servizi non e disponibile al momento. Consulta comunque la pagina prenotazioni per orientarti.
        </section>
      )}

      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Per cittadini, famiglie e territorio</p>
          <h2 className="mt-2 text-2xl font-semibold">Una struttura piu leggibile del sito storico, senza perdere profondita istituzionale</h2>
          <p className="mt-3 text-site-muted">
            Il portale riorganizza le informazioni fondamentali in pochi percorsi chiari: servizi, prenotazioni, sedi, donazioni,
            protezione civile, volontariato, donatori sangue, comunita e contenuti editoriali.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-site-muted">
            <li className="flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
              <span aria-hidden="true" className="mt-1 h-2 w-2 flex-none rounded-full bg-site-accent" />
              <span>La home indirizza subito verso azioni concrete: prenotare, donare, trovare la sede o diventare volontario.</span>
            </li>
            <li className="flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
              <span aria-hidden="true" className="mt-1 h-2 w-2 flex-none rounded-full bg-site-accent" />
              <span>Le informazioni istituzionali sono raggruppate in modo coerente, con meno dispersione e piu gerarchia.</span>
            </li>
            <li className="flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
              <span aria-hidden="true" className="mt-1 h-2 w-2 flex-none rounded-full bg-site-accent" />
              <span>News ed eventi diventano una sezione editoriale unica, piu utile e piu facile da mantenere.</span>
            </li>
          </ul>
        </article>

        <aside className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <SectionImage
            src={placeholderImages.infoOperational}
            alt="Coordinamento territoriale e servizio di prossimita"
            ratioClassName="aspect-[4/3]"
            className="border-emerald-200"
          />
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Presenza locale</p>
            <h2 className="mt-2 text-xl font-semibold">Sedi, comunita e accessi rapidi</h2>
            <p className="mt-3 text-sm text-site-muted">
              Le sezioni dedicate a sedi, comunita, area riservata e donatori sangue rendono piu leggibile il rapporto tra struttura
              pubblica, rete volontaria e cittadinanza.
            </p>
          </div>
        </aside>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {communityHighlights.map((item) => (
          <Link key={item.href} href={item.href} className="card-lift rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Community</p>
            <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm text-site-muted">{item.description}</p>
          </Link>
        ))}
      </section>

      {featuredPosts.length > 0 ? (
        <NewsList title="Ultimi aggiornamenti" posts={featuredPosts} />
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-site-muted shadow-sm">
          Gli aggiornamenti editoriali non sono disponibili in questo momento.
        </section>
      )}

      <CallToActionBand
        title="Hai bisogno di un riferimento operativo chiaro?"
        description="Parti da prenotazioni, sedi e contatti, oppure consulta l'area servizi per capire quale percorso attivare."
        actionLabel="Vai ai percorsi principali"
        actionHref="/servizi"
      />
    </div>
  );
}
