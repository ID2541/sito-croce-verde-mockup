import Link from "next/link";
import type { Post } from "@/content/mock/types";
import { getPostPlaceholder } from "@/lib/placeholders";
import { SectionImage } from "@/components/media/SectionImage";

type NewsCardProps = {
  post: Post;
  index?: number;
};

export function NewsCard({ post, index = 0 }: NewsCardProps) {
  const categoryLabel = post.category === "eventi" ? "Evento" : "News";

  return (
    <article
      className="card-lift animate-reveal group overflow-hidden rounded-2xl border border-emerald-100 bg-white/90 shadow-sm"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <SectionImage
        src={post.coverImage ?? getPostPlaceholder(post.slug)}
        alt={`Immagine rappresentativa per ${post.title}`}
        ratioClassName="aspect-[16/9]"
        className="rounded-none border-0 shadow-none"
      />
      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-site-accent">{categoryLabel}</p>
        <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
        <p className="mt-2 text-sm text-site-muted">{post.excerpt}</p>
        <p className="mt-3 text-xs text-site-muted">{new Date(post.publishedAt).toLocaleDateString("it-IT")}</p>
        <Link
          href={`/news-eventi/${post.slug}`}
          className="link-focus mt-4 inline-flex items-center gap-2 text-sm font-semibold text-site-accent transition hover:gap-3 hover:text-emerald-700"
        >
          Apri contenuto
          <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </article>
  );
}
