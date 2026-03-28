import { env } from "@/config/env";
import { apiFetch } from "./client";
import type { ApiPage, ItemResponse, ListResponse } from "./types";

export async function fetchPages(): Promise<ApiPage[]> {
  if (env.staticDemo) {
    return [];
  }

  const response = await apiFetch<ListResponse<ApiPage>>("/api/pages?page=1&pageSize=50", {
    cache: "no-store",
  });

  return response.data;
}

export async function fetchPageBySlug(slug: string): Promise<ApiPage | null> {
  if (env.staticDemo) {
    return null;
  }

  try {
    const response = await apiFetch<ItemResponse<ApiPage>>(`/api/pages/by-slug/${slug}`, {
      next: { revalidate: 300 },
    });

    return response.data;
  } catch (error) {
    console.error(`Unable to fetch page by slug: ${slug}`, error);
    return null;
  }
}
