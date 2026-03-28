import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { fetchPublishedPosts } from "@/lib/api/posts";
import { fetchTransparencyItems } from "@/lib/api/transparency";

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "/chi-siamo",
  "/trasparenza",
  "/servizi",
  "/faq",
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
  const [posts, transparencyItems] = await Promise.all([fetchPublishedPosts(), fetchTransparencyItems()]);

  const staticEntries = staticRoutes.map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified,
  }));

  const postEntries = posts.map((post) => ({
    url: `${siteConfig.siteUrl}/news-eventi/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  const transparencyEntries = transparencyItems.map((item) => ({
    url: `${siteConfig.siteUrl}/trasparenza/${item.slug}`,
    lastModified: new Date(item.updatedAt),
  }));

  return [...staticEntries, ...postEntries, ...transparencyEntries];
}
