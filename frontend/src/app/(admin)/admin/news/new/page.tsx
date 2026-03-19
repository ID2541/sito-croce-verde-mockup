"use client";

import { useRouter } from "next/navigation";
import { PostEditorForm } from "@/components/admin/PostEditorForm";
import { createPost, type UpsertPostPayload } from "@/lib/api/posts";
import { ApiClientError } from "@/lib/api/client";

export default function AdminNewsNewPage() {
  const router = useRouter();

  async function handleCreate(payload: UpsertPostPayload) {
    try {
      const created = await createPost(payload);
      router.replace(`/admin/news/${created.id}/edit`);
    } catch (createError) {
      if (createError instanceof ApiClientError && createError.status === 401) {
        router.replace("/admin/login");
        return;
      }

      throw createError;
    }
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-white">Nuova news</h1>
      <PostEditorForm submitLabel="Crea articolo" onSubmit={handleCreate} />
    </section>
  );
}