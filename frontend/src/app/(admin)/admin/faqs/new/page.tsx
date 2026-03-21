"use client";

import { useRouter } from "next/navigation";
import { FaqEditorForm } from "@/components/admin/FaqEditorForm";
import { createFaq, type UpsertFaqPayload } from "@/lib/api/faqs";
import { ApiClientError } from "@/lib/api/client";

export default function AdminFaqsNewPage() {
  const router = useRouter();

  async function handleCreate(payload: UpsertFaqPayload) {
    try {
      const created = await createFaq(payload);
      router.replace(`/admin/faqs/${created.id}/edit`);
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
      <h1 className="text-3xl font-semibold text-white">Nuova FAQ</h1>
      <FaqEditorForm submitLabel="Crea FAQ" onSubmit={handleCreate} />
    </section>
  );
}
