import type { FaqItem, FaqSection } from "@/content/faqs";
import { faqCategories, faqMetadataBySlug, faqSections as fallbackFaqSections } from "@/content/faqs";
import { apiFetch } from "./client";
import type { ApiFaq, ItemResponse, ListResponse } from "./types";

function splitAnswer(answer: string): string[] {
  return answer
    .split(/\n\n+/)
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function toUiFaqItem(faq: ApiFaq): FaqItem | null {
  const category = faqCategories.find((item) => item.id === faq.category);
  if (!category) {
    return null;
  }

  const localMetadata = faqMetadataBySlug[faq.slug];

  return {
    id: faq.id,
    slug: faq.slug,
    category: category.id,
    question: faq.question,
    answer: splitAnswer(faq.answer),
    links: localMetadata?.links,
    featured: faq.isFeatured,
  };
}

export async function fetchFaqSections(): Promise<FaqSection[]> {
  try {
    const response = await apiFetch<ListResponse<ApiFaq>>("/api/faqs?page=1&pageSize=50", {
      next: { revalidate: 300 },
    });

    const items = response.data
      .map(toUiFaqItem)
      .filter((item): item is FaqItem => item !== null)
      .sort((left, right) => Number(right.featured === true) - Number(left.featured === true));

    return faqCategories
      .map((category) => ({
        ...category,
        items: items.filter((item) => item.category === category.id),
      }))
      .filter((section) => section.items.length > 0);
  } catch (error) {
    console.error("Unable to fetch FAQs", error);
    return fallbackFaqSections;
  }
}

export async function fetchFaqBySlug(slug: string): Promise<FaqItem | null> {
  try {
    const response = await apiFetch<ItemResponse<ApiFaq>>(`/api/faqs/by-slug/${slug}`, {
      next: { revalidate: 300 },
    });

    return toUiFaqItem(response.data);
  } catch (error) {
    console.error(`Unable to fetch faq by slug: ${slug}`, error);
    return faqMetadataBySlug[slug] ?? null;
  }
}

export async function fetchAdminFaqs(): Promise<ApiFaq[]> {
  const response = await apiFetch<ListResponse<ApiFaq>>("/api/faqs?page=1&pageSize=50", {
    cache: "no-store",
    withCredentials: true,
  });

  return response.data.sort((left, right) => left.sortOrder - right.sortOrder || left.question.localeCompare(right.question, "it"));
}

export async function fetchFaqById(id: string): Promise<ApiFaq> {
  const response = await apiFetch<ItemResponse<ApiFaq>>(`/api/faqs/${id}`, {
    cache: "no-store",
    withCredentials: true,
  });

  return response.data;
}

export type UpsertFaqPayload = {
  slug: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isFeatured: boolean;
  status: "DRAFT" | "PUBLISHED";
};

export async function createFaq(payload: UpsertFaqPayload): Promise<ApiFaq> {
  const response = await apiFetch<ItemResponse<ApiFaq>>("/api/faqs", {
    method: "POST",
    withCredentials: true,
    body: payload,
  });

  return response.data;
}

export async function updateFaq(id: string, payload: Partial<UpsertFaqPayload>): Promise<ApiFaq> {
  const response = await apiFetch<ItemResponse<ApiFaq>>(`/api/faqs/${id}`, {
    method: "PATCH",
    withCredentials: true,
    body: payload,
  });

  return response.data;
}

export async function deleteFaq(id: string): Promise<void> {
  await apiFetch<{ success: boolean }>(`/api/faqs/${id}`, {
    method: "DELETE",
    withCredentials: true,
  });
}
