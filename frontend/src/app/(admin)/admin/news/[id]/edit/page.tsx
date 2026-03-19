"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PostEditorForm } from "@/components/admin/PostEditorForm";
import { fetchPostById, updatePost, type UpsertPostPayload } from "@/lib/api/posts";
import type { ApiPost } from "@/lib/api/types";
import { ApiClientError } from "@/lib/api/client";

function toFormValue(post: ApiPost): UpsertPostPayload {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    status: post.status,
    category: post.category,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
  };
}

export default function AdminNewsEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = useMemo(() => params.id, [params.id]);
  const [post, setPost] = useState<ApiPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetchPostById(id)
      .then((data) => {
        if (mounted) {
          setPost(data);
        }
      })
      .catch((fetchError) => {
        if (fetchError instanceof ApiClientError && fetchError.status === 401) {
          router.replace("/admin/login");
          return;
        }

        if (mounted) {
          setError(fetchError instanceof Error ? fetchError.message : "Errore caricamento articolo");
        }
      });

    return () => {
      mounted = false;
    };
  }, [id, router]);

  async function handleUpdate(payload: UpsertPostPayload) {
    await updatePost(id, payload);
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-white">Modifica news</h1>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      {post ? (
        <PostEditorForm initialValue={toFormValue(post)} submitLabel="Salva modifiche" onSubmit={handleUpdate} />
      ) : (
        <p className="text-sm text-slate-400">Caricamento articolo...</p>
      )}
    </section>
  );
}