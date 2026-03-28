import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { withBasePath } from "@/config/env";
import { CallToActionBand } from "@/components/blocks/CallToActionBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { OrganiSocialiChart } from "@/components/transparency/OrganiSocialiChart";
import { siteConfig } from "@/config/site";
import { fetchTransparencyItemBySlug, getStaticTransparencyItems } from "@/lib/api/transparency";
import type { ApiTransparencyDocument, ApiTransparencyItem } from "@/lib/api/types";

type TransparencyDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticTransparencyItems().map((item) => ({ slug: item.slug }));
}

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

function getLatestRelevantDate(item: ApiTransparencyItem): string | null {
  return formatDate(item.referenceDate) ?? formatDate(item.publishedAt) ?? formatDate(item.updatedAt);
}

function isOrgChartItem(item: ApiTransparencyItem): boolean {
  return item.slug === "organi-sociali-2026";
}

function getDetailDescription(item: ApiTransparencyItem): string {
  if (isOrgChartItem(item)) {
    return "Pagina dedicata alla governance 2026 con uno schema grafico leggibile e un accesso diretto al documento ufficiale pubblicato in Trasparenza.";
  }

  return item.summary;
}

export async function generateMetadata({ params }: TransparencyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchTransparencyItemBySlug(slug);

  if (!item) {
    return {
      title: "Documento non trovato",
    };
  }

  return {
    title: `${item.title} | Trasparenza`,
    description: getDetailDescription(item),
    alternates: {
      canonical: `${siteConfig.siteUrl}/trasparenza/${slug}`,
    },
  };
}

export default async function TransparencyDetailPage({ params }: TransparencyDetailPageProps) {
  const { slug } = await params;
  const item = await fetchTransparencyItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const primaryDocument = getPrimaryDocument(item);
  const itemDate = getLatestRelevantDate(item);
  const orgChartPage = isOrgChartItem(item);

  return (
    <div className="space-y-8">
      <PageHeader
        title={item.title}
        description={getDetailDescription(item)}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Trasparenza", href: "/trasparenza" },
          { label: item.title },
        ]}
      />

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="mesh-surface rounded-[2rem] border border-emerald-100 p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">{item.category.title}</p>
          <h2 className="mt-3 text-3xl font-semibold text-site-ink">
            {orgChartPage ? "Governance istituzionale rappresentata in forma visiva." : "Scheda pubblica del documento istituzionale."}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-site-muted">{item.content ?? item.summary}</p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-site-muted">
            {item.referenceYear ? <span className="rounded-full bg-white px-3 py-1">Anno {item.referenceYear}</span> : null}
            <span className="rounded-full bg-white px-3 py-1">{item.documentFormat}</span>
            {itemDate ? <span className="rounded-full bg-white px-3 py-1">Aggiornato {itemDate}</span> : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {primaryDocument ? (
              <a
                href={withBasePath(primaryDocument.publicUrl)}
                className="link-focus inline-flex rounded-full bg-site-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Apri documento ufficiale
              </a>
            ) : null}
            <Link
              href="/trasparenza"
              className="link-focus inline-flex rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-semibold text-site-accent transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              Torna all'archivio
            </Link>
          </div>
        </article>

        <aside className="rounded-[2rem] border border-emerald-100 bg-emerald-950 p-6 text-emerald-50 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">Stato documento</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-800 bg-white/5 p-4">
              <p className="text-sm text-emerald-200">Categoria</p>
              <p className="mt-2 text-lg font-semibold">{item.category.title}</p>
            </div>
            <div className="rounded-2xl border border-emerald-800 bg-white/5 p-4">
              <p className="text-sm text-emerald-200">File collegati</p>
              <p className="mt-2 text-lg font-semibold">{item.documents.length}</p>
            </div>
            <div className="rounded-2xl border border-emerald-800 bg-white/5 p-4">
              <p className="text-sm text-emerald-200">Formato</p>
              <p className="mt-2 text-lg font-semibold">{item.documentFormat}</p>
            </div>
            <div className="rounded-2xl border border-emerald-800 bg-white/5 p-4">
              <p className="text-sm text-emerald-200">Riferimento</p>
              <p className="mt-2 text-sm font-semibold">{itemDate ?? "Disponibile"}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-800 bg-white/5 p-4">
            <p className="text-sm leading-6 text-emerald-50">
              {orgChartPage
                ? "La rappresentazione grafica e volutamente schematica: evidenzia le funzioni istituzionali pubblicate, mentre nominativi ed eventuali aggiornamenti formali restano nel documento ufficiale."
                : "Questa pagina raccoglie metadati essenziali, contesto sintetico e accesso ai file pubblicati nella sezione Trasparenza."}
            </p>
          </div>
        </aside>
      </section>

      {orgChartPage ? (
        <>
          <OrganiSocialiChart />

          <section className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Presidio associativo</p>
              <h2 className="mt-3 text-xl font-semibold text-site-ink">Linea di guida</h2>
              <p className="mt-3 text-sm leading-6 text-site-muted">
                Presidenza e vicepresidenza formano l'asse di continuita: rappresentanza esterna, coordinamento interno e presidio delle
                decisioni che riguardano l'ente.
              </p>
            </article>

            <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Controllo e conformita</p>
              <h2 className="mt-3 text-xl font-semibold text-site-ink">Equilibrio organizzativo</h2>
              <p className="mt-3 text-sm leading-6 text-site-muted">
                Organo di controllo e revisore legale rendono leggibile la parte di vigilanza e verifica, rafforzando affidabilita e
                trasparenza documentale.
              </p>
            </article>

            <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Documento sorgente</p>
              <h2 className="mt-3 text-xl font-semibold text-site-ink">Fonte ufficiale da consultare</h2>
              <p className="mt-3 text-sm leading-6 text-site-muted">
                Lo schema facilita lettura e orientamento, ma la fonte da considerare per riferimenti formali resta il documento pubblicato
                nell'archivio Trasparenza.
              </p>
            </article>
          </section>
        </>
      ) : null}

      <section className="rounded-[2rem] border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">File pubblicati</p>
            <h2 className="mt-2 text-2xl font-semibold text-site-ink">Documenti collegati alla scheda</h2>
          </div>
          <p className="max-w-2xl text-sm text-site-muted">
            Accesso diretto ai file resi pubblici nella sezione Trasparenza, con metadati minimi uniformi e struttura pronta ad ampliarsi.
          </p>
        </div>

        <ul className="mt-5 grid gap-4 lg:grid-cols-2">
          {item.documents.map((document) => (
            <li key={document.id} className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
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
                  Apri file
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <CallToActionBand
        title="Serve un chiarimento istituzionale?"
        description="Usa i contatti ufficiali per richiedere informazioni aggiuntive, riferimenti formali o conferme sui documenti pubblicati."
        actionLabel="Vai ai contatti"
        actionHref="/sedi-contatti#contatti"
      />
    </div>
  );
}
