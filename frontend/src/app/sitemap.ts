import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { fetchPublishedPosts } from "@/lib/api/posts";

const staticRoutes = [
  "",
  "/chi-siamo",
  "/servizi",
  "/prenota-servizi",
  "/sedi-contatti",
  "/protezione-civile",
  "/volontariato-formazione",
  "/donazioni",
  "/donatori-sangue",
  "/comunita",
  "/news-eventi",
  "/area-riservata",
  "/privacy",
  "/cookie-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const posts = await fetchPublishedPosts();

  const staticEntries = staticRoutes.map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified,
  }));

  const postEntries = posts.map((post) => ({
    url: `${siteConfig.siteUrl}/news-eventi/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [...staticEntries, ...postEntries];
}
