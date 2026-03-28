import type { Metadata } from "next";
import Link from "next/link";
import { withBasePath } from "@/config/env";
import { CallToActionBand } from "@/components/blocks/CallToActionBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { fetchTransparencyHub } from "@/lib/api/transparency";
import type { ApiTransparencyCategory, ApiTransparencyDocument, ApiTransparencyItem } from "@/lib/api/types";

export const metadata: Metadata = {
  title: "Trasparenza",
  description: "Area pubblica con documenti istituzionali, bilanci, governance, dati RUNTS e regolamenti.",
};

function formatDate(dateValue: string | null | undefined): string | null {
  if (!dateValue) {
    return null;
  }

  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
}

function formatFileSize(fileSizeBytes: number | null | undefined): string | null {
  if (!fileSizeBytes || fileSizeBytes <= 0) {
    return null;
  }

  if (fileSizeBytes < 1024 * 1024) {
    return `${Math.round(fileSizeBytes / 102.4) / 10} KB`;
  }

  return `${Math.round(fileSizeBytes / 104857.6) / 10} MB`;
}

function getPrimaryDocument(item: ApiTransparencyItem): ApiTransparencyDocument | null {
  return item.documents.find((document) => document.isPrimary) ?? item.documents[0] ?? null;
}

function getReferenceLabel(item: ApiTransparencyItem): string {
  if (item.referenceYear) {
    return `Anno ${item.referenceYear}`;
  }

  const publishedAt = formatDate(item.publishedAt);
  if (publishedAt) {
    return `Pubblicato ${publishedAt}`;
  }

  return "Consultazione pubblica";
}

function getLatestRelevantDate(item: ApiTransparencyItem): string | null {
  return formatDate(item.referenceDate) ?? formatDate(item.publishedAt) ?? formatDate(item.updatedAt);
}

function getTransparencyDetailHref(item: ApiTransparencyItem): string {
  return `/trasparenza/${item.slug}`;
}

function groupItemsByCategory(categories: ApiTransparencyCategory[], items: ApiTransparencyItem[]) {
  return categories
    .map((category) => ({
      ...category,
      resolvedDescription:
        category.description ?? "Documentazione istituzionale disponibile per la consultazione pubblica.",
      items: items.filter((item) => item.category.slug === category.slug),
    }))
    .filter((category) => category.items.length > 0 || category.publishedItemCount > 0);
}

export default async function TrasparenzaPage() {
  const { categories, items } = await fetchTransparencyHub();
  const groupedCategories = groupItemsByCategory(categories, items);
  const latestUpdate = items.length
    ? items.reduce((current, item) =>
        new Date(item.updatedAt).getTime() > new Date(current.updatedAt).getTime() ? item : current,
      )
    : null;
  const featuredItems = items.filter((item) => item.featured).slice(0, 3);
  const archiveYears = [...new Set(items.map((item) => item.referenceYear).filter((year): year is number => year !== null))].sort(
    (left, right) => right - left,
  );
  const itemsByYear = archiveYears.map((year) => ({
    year,
    count: items.filter((item) => item.referenceYear === year).length,
  }));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Trasparenza"
        description="Hub pubblico per documenti istituzionali, bilanci, governance, dati RUNTS e regolamenti con struttura leggibile e pronta ad ampliarsi."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Trasparenza" }]}
      />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Accesso pubblico</p>
          <h2 className="mt-3 text-2xl font-semibold">Documenti organizzati per area, anno e funzione istituzionale.</h2>
          <p className="mt-3 text-site-muted">
            La sezione raccoglie i contenuti tipici di trasparenza per un ente del Terzo Settore: documenti fondativi, governance, RUNTS,
            rendicontazione economica, bilancio sociale, contributi pubblici e regolamenti.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {groupedCategories.slice(0, 4).map((category) => (
              <Link
                key={category.slug}
                href={`#categoria-${category.slug}`}
                className="link-focus rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <h3 className="text-base font-semibold text-site-ink">{category.title}</h3>
                <p className="mt-2 text-sm text-site-muted">{category.resolvedDescription}</p>
              </Link>
            ))}
          </div>
        </article>

        <aside className="rounded-2xl border border-emerald-100 bg-emerald-950 p-6 text-emerald-50 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">Stato archivio</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-800 bg-white/5 p-4">
              <p className="text-sm text-emerald-200">Categorie</p>
              <p className="mt-2 text-2xl font-semibold">{groupedCategories.length}</p>
            </div>
            <div className="rounded-xl border border-emerald-800 bg-white/5 p-4">
              <p className="text-sm text-emerald-200">Documenti</p>
              <p className="mt-2 text-2xl font-semibold">{items.length}</p>
            </div>
            <div className="rounded-xl border border-emerald-800 bg-white/5 p-4">
              <p className="text-sm text-emerald-200">Ultimo aggiornamento</p>
              <p className="mt-2 text-sm font-semibold">{latestUpdate ? formatDate(latestUpdate.updatedAt) : "Nessun dato"}</p>
            </div>
            <div className="rounded-xl border border-emerald-800 bg-white/5 p-4">
              <p className="text-sm text-emerald-200">Archivio annuale</p>
              <p className="mt-2 text-sm font-semibold">{archiveYears.length ? `${archiveYears.length} annualita disponibili` : "In aggiornamento"}</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-emerald-800 bg-white/5 p-4">
            <p className="text-sm text-emerald-100">
              I documenti sono pubblicati con metadati minimi uniformi e la struttura e gia pronta per caricamenti futuri, versioni e filtri
              aggiuntivi.
            </p>
            <Link
              href="/sedi-contatti#contatti"
              className="link-focus mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-site-accent transition hover:bg-emerald-50"
            >
              Vai ai contatti
            </Link>
          </div>
        </aside>
      </section>

      {featuredItems.length ? (
        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Documenti in evidenza</p>
            <h2 className="mt-2 text-2xl font-semibold">I riferimenti istituzionali piu consultati in un colpo d'occhio.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {featuredItems.map((item) => {
              const primaryDocument = getPrimaryDocument(item);

              return (
                <article key={item.slug} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">{item.category.title}</p>
                  <h3 className="mt-3 text-xl font-semibold text-site-ink">{item.title}</h3>
                  <p className="mt-3 text-sm text-site-muted">{item.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-site-muted">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-site-accent">{getReferenceLabel(item)}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">{item.documentFormat}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={getTransparencyDetailHref(item)}
                      className="link-focus inline-flex rounded-full bg-site-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      {item.slug === "organi-sociali-2026" ? "Apri organigramma" : "Apri scheda"}
                    </Link>
                    {primaryDocument ? (
                      <a
                        href={withBasePath(primaryDocument.publicUrl)}
                        className="link-focus inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-site-accent transition hover:border-emerald-300 hover:bg-emerald-50"
                      >
                        Documento
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {groupedCategories.map((category) => (
          <article key={category.slug} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">{category.title}</p>
            <p className="mt-3 text-sm text-site-muted">{category.resolvedDescription}</p>
            <p className="mt-4 text-sm font-semibold text-site-ink">{category.items.length} documenti pubblicati</p>
          </article>
        ))}
      </section>

      <section id="documenti" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Archivio documenti</p>
            <h2 className="mt-2 text-2xl font-semibold">Contenuti organizzati per area e pronti a crescere nel tempo.</h2>
          </div>
          <p className="max-w-2xl text-sm text-site-muted">
            Ogni blocco mostra il documento principale, i metadati essenziali e i file collegati. Il modello e predisposto per archivi annuali,
            versioni future e caricamento documentale gestito da backend.
          </p>
        </div>

        <div className="space-y-4">
          {groupedCategories.map((category) => (
            <section id={`categoria-${category.slug}`} key={category.slug} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  <p className="mt-1 text-sm text-site-muted">{category.resolvedDescription}</p>
                </div>
                <p className="text-sm font-semibold text-site-accent">{category.items.length} documenti</p>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {category.items.map((item) => (
                  <article key={item.slug} className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">{getReferenceLabel(item)}</p>
                        <h4 className="mt-2 text-lg font-semibold text-site-ink">{item.title}</h4>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-site-accent">Pubblicato</span>
                    </div>
                    <p className="mt-3 text-sm text-site-muted">{item.summary}</p>
                    {item.content ? <p className="mt-3 text-sm text-site-muted">{item.content}</p> : null}

                    <dl className="mt-4 grid gap-2 text-sm text-site-muted sm:grid-cols-2">
                      <div>
                        <dt className="font-semibold text-site-ink">Formato</dt>
                        <dd>{item.documentFormat}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-site-ink">Ultimo riferimento</dt>
                        <dd>{getLatestRelevantDate(item) ?? "Disponibile"}</dd>
                      </div>
                    </dl>

                    <ul className="mt-4 space-y-3 text-sm text-site-muted">
                      {item.documents.map((document) => (
                        <li key={document.id} className="rounded-xl border border-white/80 bg-white p-3">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="font-semibold text-site-ink">{document.label}</p>
                              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-site-muted">
                                {document.fileName}
                                {formatFileSize(document.fileSizeBytes) ? ` - ${formatFileSize(document.fileSizeBytes)}` : ""}
                              </p>
                            </div>
                            <a
                              href={withBasePath(document.publicUrl)}
                              className="link-focus inline-flex rounded-full bg-site-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                              Apri
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="text-xs uppercase tracking-[0.18em] text-site-muted">{formatDate(item.updatedAt)}</span>
                      <Link
                        href={getTransparencyDetailHref(item)}
                        className="link-focus inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-site-accent transition hover:border-emerald-300 hover:bg-emerald-50"
                      >
                        {item.slug === "organi-sociali-2026" ? "Vai all'organigramma" : "Vai alla scheda"}
                      </Link>
                      <Link
                        href="/sedi-contatti#contatti"
                        className="link-focus inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-site-accent transition hover:border-emerald-300 hover:bg-emerald-50"
                     >
                        Chiedi chiarimenti
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      {itemsByYear.length ? (
        <section id="archivio-annuale" className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Archivio per anno</p>
            <h2 className="mt-2 text-2xl font-semibold">Un livello in piu per consultare la documentazione nel tempo.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {itemsByYear.map((entry) => (
              <article key={entry.year} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Anno {entry.year}</p>
                <p className="mt-3 text-3xl font-semibold text-site-ink">{entry.count}</p>
                <p className="mt-2 text-sm text-site-muted">{entry.count === 1 ? "documento pubblicato" : "documenti pubblicati"}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <CallToActionBand
        title="Serve un documento specifico?"
        description="Passa dai contatti istituzionali per richieste puntuali, copie conformi o chiarimenti sulla documentazione pubblicata."
        actionLabel="Apri contatti"
        actionHref="/sedi-contatti#contatti"
      />
    </div>
  );
}
