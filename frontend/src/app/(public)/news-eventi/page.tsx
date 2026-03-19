import type { Metadata } from "next";
import Link from "next/link";
import { NewsList } from "@/components/blocks/NewsList";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { fetchPublishedPosts } from "@/lib/api/posts";
import { placeholderImages } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "News e eventi",
  description: "Archivio unificato di aggiornamenti, iniziative e appuntamenti dell'associazione.",
};

export default async function NewsEventiPage() {
  const posts = await fetchPublishedPosts();
  const events = posts.filter((post) => post.category === "eventi");
  const news = posts.filter((post) => post.category === "news");
  const featured = posts[0];

  return (
    <div className="space-y-8">
      <PageHeader
        title="News & Eventi"
        description="Un archivio unico, piu facile da mantenere e piu utile per cittadini, volontari e sostenitori."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News & Eventi" }]}
      />

      <SectionImage src={placeholderImages.newsHeader} alt="Archivio news e iniziative" ratioClassName="aspect-[21/8]" />

      {featured ? (
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">
              {featured.category === "eventi" ? "Evento in evidenza" : "News in evidenza"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{featured.title}</h2>
            <p className="mt-3 text-site-muted">{featured.excerpt}</p>
            <p className="mt-4 text-sm text-site-muted">
              Pubblicato il {new Date(featured.publishedAt).toLocaleDateString("it-IT")}
            </p>
            <Link href={`/news-eventi/${featured.slug}`} className="mt-6 inline-flex rounded-full bg-site-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
              Apri contenuto
            </Link>
          </article>

          <aside className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">In questa sezione</h2>
            <div className="mt-4 grid gap-3 text-sm text-site-muted">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                <span className="font-semibold text-site-ink">{news.length}</span> news pubblicate
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                <span className="font-semibold text-site-ink">{events.length}</span> eventi in archivio
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                Un solo modello editoriale, con distinzione chiara tra aggiornamenti e appuntamenti.
              </div>
            </div>
          </aside>
        </section>
      ) : null}

      {events.length > 0 ? <NewsList title="Eventi" posts={events} /> : null}
      {news.length > 0 ? <NewsList title="News" posts={news} /> : null}

      {posts.length === 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-site-muted shadow-sm">
          Nessun contenuto pubblicato al momento.
        </section>
      ) : null}
    </div>
  );
}
