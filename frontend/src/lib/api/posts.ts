import type { Post } from "@/content/mock/types";
import { getPostBySlug as getMockPostBySlug, mockPosts } from "@/content/mock/posts";
import { getPostPlaceholder, normalizeImageSrc } from "@/lib/placeholders";
import { apiFetch } from "./client";
import type { ApiPost, ItemResponse, ListResponse } from "./types";

function normalizePostCategory(category: string | null | undefined): Post["category"] {
  return category === "eventi" ? "eventi" : "news";
}

function splitContent(content: string): string[] {
  return content
    .split(/\n\n+/)
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function toUiPost(post: ApiPost): Post {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: splitContent(post.content),
    publishedAt: post.publishedAt ?? post.createdAt,
    category: normalizePostCategory(post.category),
    location: undefined,
    audience: undefined,
    coverImage: normalizeImageSrc(post.coverImage, getPostPlaceholder(post.slug)),
  };
}

export async function fetchPublishedPosts(): Promise<Post[]> {
  try {
    const response = await apiFetch<ListResponse<ApiPost>>("/api/posts?status=PUBLISHED&page=1&pageSize=20", {
      next: { revalidate: 300 },
    });

    return response.data
      .map(toUiPost)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (error) {
    console.error("Unable to fetch published posts", error);
    return mockPosts;
  }
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await apiFetch<ItemResponse<ApiPost>>(`/api/posts/by-slug/${slug}`, {
      next: { revalidate: 300 },
    });

    return toUiPost(response.data);
  } catch (error) {
    console.error(`Unable to fetch post by slug: ${slug}`, error);
    return getMockPostBySlug(slug) ?? null;
  }
}

export async function fetchAdminPosts(): Promise<ApiPost[]> {
  const response = await apiFetch<ListResponse<ApiPost>>("/api/posts?page=1&pageSize=50", {
    cache: "no-store",
    withCredentials: true,
  });

  return response.data;
}

export async function fetchPostById(id: string): Promise<ApiPost> {
  const response = await apiFetch<ItemResponse<ApiPost>>(`/api/posts/${id}`, {
    cache: "no-store",
    withCredentials: true,
  });

  return response.data;
}

export type UpsertPostPayload = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: "DRAFT" | "PUBLISHED";
  category?: string | null;
  publishedAt?: string | null;
  coverImage?: string | null;
};

export async function createPost(payload: UpsertPostPayload): Promise<ApiPost> {
  const response = await apiFetch<ItemResponse<ApiPost>>("/api/posts", {
    method: "POST",
    withCredentials: true,
    body: payload,
  });

  return response.data;
}

export async function updatePost(id: string, payload: Partial<UpsertPostPayload>): Promise<ApiPost> {
  const response = await apiFetch<ItemResponse<ApiPost>>(`/api/posts/${id}`, {
    method: "PATCH",
    withCredentials: true,
    body: payload,
  });

  return response.data;
}

export async function deletePost(id: string): Promise<void> {
  await apiFetch<{ success: boolean }>(`/api/posts/${id}`, {
    method: "DELETE",
    withCredentials: true,
  });
}
