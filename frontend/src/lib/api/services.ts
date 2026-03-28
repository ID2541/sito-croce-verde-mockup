import { env } from "@/config/env";
import type { Service } from "@/content/mock/types";
import { getServiceBySlug as getMockServiceBySlug, mockServices } from "@/content/mock/services";
import { getServicePlaceholder, normalizeImageSrc } from "@/lib/placeholders";
import { apiFetch } from "./client";
import type { ApiService, ItemResponse, ListResponse } from "./types";

function normalizeServiceCategory(category: string): Service["category"] {
  switch (category) {
    case "sanitario":
    case "sociale":
    case "trasporto":
    case "formazione":
      return category;
    default:
      return "sociale";
  }
}

function toUiService(service: ApiService): Service {
  return {
    id: service.id,
    slug: service.slug,
    title: service.title,
    summary: service.summary,
    description: service.content,
    category: normalizeServiceCategory(service.category),
    prenotabile: service.prenotabile,
    image: normalizeImageSrc(service.icon, getServicePlaceholder(service.slug)),
  };
}

export async function fetchServices(): Promise<Service[]> {
  if (env.staticDemo) {
    return mockServices;
  }

  try {
    const response = await apiFetch<ListResponse<ApiService>>("/api/services?page=1&pageSize=50", {
      next: { revalidate: 300 },
    });

    return response.data.map(toUiService);
  } catch (error) {
    console.error("Unable to fetch services", error);
    return mockServices;
  }
}

export async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  if (env.staticDemo) {
    return getMockServiceBySlug(slug) ?? null;
  }

  try {
    const response = await apiFetch<ItemResponse<ApiService>>(`/api/services/by-slug/${slug}`, {
      next: { revalidate: 300 },
    });

    return toUiService(response.data);
  } catch (error) {
    console.error(`Unable to fetch service by slug: ${slug}`, error);
    return getMockServiceBySlug(slug) ?? null;
  }
}
