import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { siteConfig } from "@/config/site";
import { fetchPostBySlug } from "@/lib/api/posts";
import { getPostPlaceholder, placeholderImages } from "@/lib/placeholders";

type NewsEventiDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: NewsEventiDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  return {
    title: post ? post.title : "News & Eventi",
    description: post?.excerpt,
    alternates: {
      canonical: `/news-eventi/${slug}`,
    },
    openGraph: post
      ? {
          title: post.title,
          description: post.excerpt,
          url: `${siteConfig.siteUrl}/news-eventi/${slug}`,
        }
      : undefined,
  };
}

export default async function NewsEventiDetailPage({ params }: NewsEventiDetailProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const categoryLabel = post.category === "eventi" ? "Evento" : "News";

  return (
    <article className="space-y-8">
      <PageHeader
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News & Eventi", href: "/news-eventi" },
          { label: post.title },
        ]}
      />

      <SectionImage
        src={post.coverImage ?? getPostPlaceholder(slug) ?? placeholderImages.newsDetail}
        alt={post.title}
        ratioClassName="aspect-[21/8]"
      />

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap gap-3 text-sm text-site-muted">
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-site-accent">{categoryLabel}</span>
          <span>Pubblicato il {new Date(post.publishedAt).toLocaleDateString("it-IT")}</span>
          {post.location ? <span>Luogo: {post.location}</span> : null}
          {post.audience ? <span>Destinatari: {post.audience}</span> : null}
        </div>

        <div className="mt-6 space-y-4 text-site-muted">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <Link href="/news-eventi" className="link-focus mt-8 inline-flex text-sm font-semibold text-site-accent hover:text-emerald-700">
          Torna a news e eventi
        </Link>
      </section>
    </article>
  );
}
